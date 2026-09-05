import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { conversationService } from '../services/conversationService.js';

const router = express.Router();

/**
 * GET /api/chat/:projectId
 * Retrieve previous conversation history for the authenticated user's selected project.
 */
router.get('/:projectId', authenticateToken, (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const conversation = conversationService.getConversation(userId, projectId);

    if (!conversation) {
      return res.json({
        conversationId: null,
        projectId,
        messages: []
      });
    }

    return res.json({
      conversationId: conversation._id,
      projectId: conversation.projectId,
      messages: conversation.messages || []
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve conversation history' });
  }
});

/**
 * DELETE /api/chat/:projectId
 * Reset conversation history for the project
 */
router.delete('/:projectId', authenticateToken, (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    conversationService.clearConversation(userId, projectId);
    return res.json({ success: true, message: 'Conversation history cleared' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to clear conversation' });
  }
});

/**
 * POST /api/chat
 * Send a message to the AI Project Mentor
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      message,
      projectId,
      projectContext,
      blueprintSummary,
      currentProgress,
      chatMode = 'BUILD'
    } = req.body;

    // Validate inputs
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message exceeds the maximum limit of 2,000 characters' });
    }

    if (!projectId) {
      return res.status(400).json({ error: 'Project information is incomplete. Please generate or select a project first.' });
    }

    // 1. Student profile
    const studentProfile = {
      branch: req.user.profile?.branch || req.body.studentProfile?.branch || 'Engineering',
      skills: req.user.profile?.skills || req.body.studentProfile?.skills || ['Python', 'Web Development'],
      interests: req.user.profile?.interests || req.body.studentProfile?.interests || [],
      teamSize: req.user.profile?.teamSize || req.body.studentProfile?.teamSize || '1',
      timeAvailable: req.user.profile?.timeAvailable || req.body.studentProfile?.timeAvailable || '3–4 months'
    };

    // 2. Project details
    const project = projectContext || {};
    const blueprint = blueprintSummary || {};

    // 3. Save student's message immediately
    const userMsgResult = conversationService.saveMessage(userId, projectId, {
      role: 'user',
      content: message.trim()
    });

    // 4. Retrieve recent conversation history (last 14 messages for conversational context)
    const existingConversation = conversationService.getConversation(userId, projectId);
    const allMessages = existingConversation ? existingConversation.messages : [];
    // Prior messages excluding the current user message just saved
    const priorHistory = allMessages.slice(0, -1).slice(-14);

    // 5. System Instruction & Context
    const systemInstruction = `You are ProjectPilot Mentor, a friendly and intelligent AI mentor helping a final-year student build their project.

You are not a static information bot.

Have a natural conversation with the student.

Listen to what they say, understand their intent, remember the conversation and respond accordingly.

Be supportive, practical and technically accurate.

When the student asks a question:
1. Understand what they actually need.
2. Use the project context and conversation history.
3. Give the appropriate explanation or solution.
4. Ask a relevant follow-up question when it helps continue the task.
5. If the student is ready to proceed, guide them to the next actionable step.

Do not ask unnecessary questions.

Do not repeat information already discussed.

If the student is confused, simplify the explanation.

If the student is stuck, troubleshoot step-by-step.

If the student changes requirements, adapt to the new requirement.

If the student says something like 'yes', 'okay', 'do that', 'why', or 'how', interpret it using the previous conversation.

Keep the conversation focused on helping the student successfully build their selected project.

Use the student's skills, team size, timeline, project blueprint and progress to personalize your guidance.

Prefer practical solutions over long theoretical explanations.

You can explain concepts, discuss architecture, suggest implementation approaches, write code, debug errors, discuss datasets, plan tasks, review decisions and help with documentation.

Never pretend to have performed an action that you did not perform.

Never invent APIs, datasets, statistics or technical facts.

PROJECT CONTEXT:
- Project Title: ${project.title || 'Selected Project'}
- Industry: ${project.selectedIndustry || 'Technology'}
- Problem: ${project.problem || 'Not specified'}
- Proposed Solution: ${project.solution || 'Not specified'}
- Target Users: ${project.targetUsers || 'End users'}
- Tech Stack: ${Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.domains?.join?.(', ') || 'Modern Web Stack')}
- Student Branch: ${studentProfile.branch}
- Student Skills: ${Array.isArray(studentProfile.skills) ? studentProfile.skills.join(', ') : studentProfile.skills}
- Team Size: ${studentProfile.teamSize} member(s)
- Timeline: ${studentProfile.timeAvailable}
- First Milestone: ${blueprint.firstMilestone?.title || 'Phase 1: Project Setup'} (${blueprint.firstMilestone?.oneActionTask || 'Initialize project repository'})
- Current Progress: ${currentProgress?.overall || 20}% completed

CURRENT MENTOR MODE: ${chatMode || 'BUILD'}`;

    const contextPayload = {
      studentProfile,
      selectedProject: {
        id: project.id || projectId,
        title: project.title || 'Selected Final-Year Project',
        industry: project.selectedIndustry || 'General',
        problem: project.problem || 'Not specified',
        solution: project.solution || 'Not specified',
        targetUsers: project.targetUsers || 'End users',
        techStack: project.domains || project.techStack || studentProfile.skills,
        difficulty: project.difficulty || 'Intermediate',
        timeline: project.estimatedTime || studentProfile.timeAvailable
      },
      blueprintHighlights: {
        firstMilestone: blueprint.firstMilestone?.title || 'Phase 1: Project Setup & Baseline',
        firstMilestoneAction: blueprint.firstMilestone?.oneActionTask || 'Initialize repository and install foundational dependencies',
        mvpMustHaves: blueprint.mvpScope?.mustHave?.map(m => m.title) || [],
        techStackSummary: blueprint.techStack ? {
          frontend: blueprint.techStack.frontend?.technology,
          backend: blueprint.techStack.backend?.technology,
          database: blueprint.techStack.database?.technology,
          aiMl: blueprint.techStack.aiMl?.technology
        } : null,
        currentProgress: currentProgress || { overall: 20, stage: 'Phase 1 / Setup' }
      }
    };

    // 6. Generate AI response using Gemini or intelligent multi-turn fallback
    let aiResponseText = '';
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

    if (apiKey && apiKey.trim() && apiKey !== 'your_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction
        });

        // Format prior history for Gemini: must start with 'user' and alternate roles
        const formattedHistory = [];
        for (const m of priorHistory) {
          const role = m.role === 'assistant' ? 'model' : 'user';
          if (formattedHistory.length === 0) {
            if (role === 'user') {
              formattedHistory.push({ role: 'user', parts: [{ text: m.content }] });
            }
          } else {
            const lastRole = formattedHistory[formattedHistory.length - 1].role;
            if (role !== lastRole) {
              formattedHistory.push({ role, parts: [{ text: m.content }] });
            } else {
              formattedHistory[formattedHistory.length - 1].parts[0].text += `\n\n${m.content}`;
            }
          }
        }

        // If history ended on a 'user' message, remove it or handle it so next is user message
        if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === 'user') {
          formattedHistory.pop();
        }

        const chat = model.startChat({
          history: formattedHistory
        });

        const result = await chat.sendMessage(message.trim());
        const response = await result.response;
        aiResponseText = response.text();
      } catch (geminiErr) {
        console.error('Gemini API Error:', geminiErr?.message || geminiErr);
        // Fallback with multi-turn conversation memory
        aiResponseText = generateProjectMentorFallback(message, contextPayload, chatMode, priorHistory);
      }
    } else {
      aiResponseText = generateProjectMentorFallback(message, contextPayload, chatMode, priorHistory);
    }

    if (!aiResponseText || !aiResponseText.trim()) {
      aiResponseText = "I'm right here with you. What specific part of your project should we tackle next?";
    }

    // 7. Save assistant's reply
    const assistantMsgResult = conversationService.saveMessage(userId, projectId, {
      role: 'assistant',
      content: aiResponseText.trim()
    });

    return res.json({
      reply: aiResponseText.trim(),
      conversationId: assistantMsgResult.conversation._id,
      timestamp: assistantMsgResult.message.timestamp
    });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: "I couldn't connect to the mentor right now. Please try again." });
  }
});

/**
 * Intelligent project-specific fallback mentor generator with multi-turn conversation awareness.
 */
function generateProjectMentorFallback(userQuery, context, mode, priorHistory = []) {
  const rawQ = userQuery.trim();
  const q = rawQ.toLowerCase();
  const proj = context.selectedProject;
  const profile = context.studentProfile;
  const blueprint = context.blueprintHighlights;
  const firstM = blueprint.firstMilestone || 'Phase 1: Environment Setup';
  const task = blueprint.firstMilestoneAction || 'Initialize project repository and core dependencies';

  // Check last assistant message from conversation history if available
  const lastAssistantMsg = [...priorHistory].reverse().find(m => m.role === 'assistant')?.content?.toLowerCase() || '';

  // 1. "How should I start my project?" / "Help me start"
  if (q.includes('start') && (q.includes('how') || q.includes('where') || q.includes('project') || q.includes('help'))) {
    return `Let's start with the foundation! For **${proj.title}**, the first step is setting up your project structure and repository so your team of ${profile.teamSize} can collaborate cleanly.

Here is the immediate starting step:
1. **Initialize the Repository:** Set up a monorepo or standard folder structure with \`/client\` (frontend) and \`/server\` (backend).
2. **Environment & Dependencies:** Install your primary runtime (${profile.skills.slice(0, 3).join(', ')}).

Do you want to start by creating the database schema, or would you prefer scaffolding the backend API skeleton first?`;
  }

  // 2. "I already finished the database"
  if (q.includes('finished the database') || q.includes('completed the database') || q.includes('database is done') || (q.includes('database') && (q.includes('done') || q.includes('finished')))) {
    return `Awesome milestone! Having your database schema ready gives your project a solid data backbone.

Since the database is finished, our next priority is building the **backend API controllers** to handle incoming client requests and query your data models.

Would you like to start by writing the first REST endpoint, or do you want to define the JSON request and response models?`;
  }

  // 3. "Okay what next?" / "What should I do next?"
  if (q.includes('what next') || q.includes('what should i do next') || q.includes('what do we do next')) {
    return `Building on our progress, the next step on your roadmap is creating your **Core API Service Layer**.

This service will receive requests from your user interface, run your business logic for **${proj.title}**, and return the result.

Shall we write the starter code for your first API route now, or would you like to review the folder layout first?`;
  }

  // 4. "I don't understand what an API does" / "what is an API"
  if (q.includes('what an api does') || q.includes('what is an api') || q.includes('understand what an api') || q.includes('explain an api')) {
    return `No problem at all! Let's make it super simple.

Think of an API like a **waiter in a restaurant**:
- **You (the Customer):** That's your frontend interface where the user types or clicks.
- **The Kitchen:** That's your backend server and database where the heavy cooking and data processing happen.
- **The Waiter (The API):** Takes your order from the frontend table, delivers it to the kitchen, and brings back your freshly prepared meal (data) to display on screen.

In **${proj.title}**, when a user interacts with the app, the frontend makes an API call to ask the backend to run the prediction or fetch records.

Does this analogy make sense, or would you like to see how an API call looks in code?`;
  }

  // 5. "Okay I understand" / "makes sense" / "got it"
  if (q.includes('i understand') || q.includes('makes sense') || q.includes('got it') || q.includes('understood')) {
    return `Great! Now that we have that concept clear, let's take the next actionable step toward building **${proj.title}**.

Let's implement a simple backend API endpoint to test the flow from client to server.

Are you ready for the starter route code?`;
  }

  // 6. "I got an error" / "I have an error" / debugging request
  if (q.includes('error') || q.includes('issue') || q.includes('bug') || q.includes('failed') || q.includes('crash')) {
    return `Let's troubleshoot it together! Don't worry, errors are just clues pointing to the next fix.

To help you resolve it quickly, could you tell me:
1. What is the exact error message or stack trace printed in your console or terminal?
2. What file or command were you running when it occurred?

Paste the error snippet here, and I'll explain what caused it and give you the exact fix!`;
  }

  // 7. Short affirmative responses: "Yes" / "Okay" / "Sure" / "Let's do that"
  if (['yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'do that', "let's do that", "let's start"].includes(q.replace(/[!.]/g, ''))) {
    if (lastAssistantMsg.includes('route code') || lastAssistantMsg.includes('starter code') || lastAssistantMsg.includes('endpoint')) {
      return `Here is your clean starter API route for **${proj.title}**:

\`\`\`javascript
// routes/projectRoutes.js
import express from 'express';

const router = express.Router();

// Health & Status Check
router.get('/status', (req, res) => {
  res.json({ status: 'ok', service: '${proj.title} API', timestamp: new Date().toISOString() });
});

// Primary MVP Endpoint
router.post('/process', async (req, res) => {
  try {
    const { inputData } = req.body;
    if (!inputData) {
      return res.status(400).json({ error: 'Input data is required' });
    }

    // Process input data according to your project requirements
    const result = {
      message: 'Processed successfully',
      output: inputData
    };

    return res.json(result);
  } catch (err) {
    console.error('Processing error:', err);
    return res.status(500).json({ error: 'Internal server processing error' });
  }
});

export default router;
\`\`\`

Add this to your server and test it with a \`curl\` or Postman request. Once you test this, let me know how it went!`;
    }

    return `Perfect, let's keep moving forward!

Next step: Let's create your primary service module for **${proj.title}** to connect your frontend with your backend logic.

Are you running the server locally right now?`;
  }

  // 8. Explain project
  if (q.includes('explain') && (q.includes('project') || q.includes('simply') || q.includes('idea'))) {
    return `### Project Breakdown: ${proj.title}

**What it solves:**
${proj.problem}

**How it works:**
${proj.solution}

**Target Users:**
${proj.targetUsers}

**Recommended MVP Architecture:**
1. **Frontend:** User interface tailored for ${proj.targetUsers}.
2. **Backend API:** Orchestrates business logic and routes requests.
3. **Database:** Stores user records and project telemetry.

Which part would you like to explore deeper: the system architecture, or the first code milestone?`;
  }

  // 9. Architecture
  if (q.includes('architecture') || q.includes('system design')) {
    return `### System Architecture for ${proj.title}

Here is the clean 3-tier data flow tailored to your skills (${profile.skills.slice(0, 3).join(', ')}):

\`\`\`
[User / Client Interface]
        │
        ▼ (HTTP REST / JSON)
[API Controller Layer]
        │
   ┌────┴────────────────────────┐
   ▼                             ▼
[Database Models]           [AI / Processing Service]
(Data Persistence)          (Core Project Algorithm)
   │                             │
   └─────────────┬───────────────┘
                 ▼
          [JSON Response Engine]
\`\`\`

**Core Principle:** Keep your business logic in separate service functions so your code remains modular and testable for your final-year project evaluation.

Do you have any questions about this architecture, or should we set up the route structure?`;
  }

  // 10. Default contextual answer
  return `I'm here to help you build **${proj.title}**.

Looking at your roadmap and team size (${profile.teamSize}), we should keep our focus on milestone: **${firstM}**.

What would you like to work on right now? We can write starter code, design your database schema, or debug any errors you've hit.`;
}

export default router;

