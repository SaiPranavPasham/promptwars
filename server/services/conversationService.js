import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CONVERSATIONS_FILE)) {
  fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}

function readConversations() {
  try {
    const data = fs.readFileSync(CONVERSATIONS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

function writeConversations(conversations) {
  fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2), 'utf8');
}

export const conversationService = {
  /**
   * Find conversation for a given user and project.
   */
  getConversation(userId, projectId) {
    if (!userId || !projectId) return null;
    const conversations = readConversations();
    return conversations.find(
      (c) => c.userId === userId && c.projectId === String(projectId)
    ) || null;
  },

  /**
   * Save a new message (user or assistant) into the conversation.
   * Auto-creates conversation record if it doesn't exist.
   */
  saveMessage(userId, projectId, { role, content }) {
    if (!userId || !projectId || !content) return null;

    const conversations = readConversations();
    let conversation = conversations.find(
      (c) => c.userId === userId && c.projectId === String(projectId)
    );

    const now = new Date().toISOString();
    const messageEntry = {
      role: role === 'assistant' ? 'assistant' : 'user',
      content: String(content).trim(),
      timestamp: now
    };

    if (!conversation) {
      conversation = {
        _id: crypto.randomUUID(),
        userId,
        projectId: String(projectId),
        messages: [messageEntry],
        createdAt: now,
        updatedAt: now
      };
      conversations.push(conversation);
    } else {
      conversation.messages.push(messageEntry);
      conversation.updatedAt = now;
    }

    writeConversations(conversations);
    return { conversation, message: messageEntry };
  },

  /**
   * Clear or reset a user's conversation for a project
   */
  clearConversation(userId, projectId) {
    if (!userId || !projectId) return false;
    let conversations = readConversations();
    const initialLen = conversations.length;
    conversations = conversations.filter(
      (c) => !(c.userId === userId && c.projectId === String(projectId))
    );
    writeConversations(conversations);
    return conversations.length < initialLen;
  }
};
