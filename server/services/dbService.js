import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
}

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

export const dbService = {
  findUserByEmail(email) {
    const users = readUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById(id) {
    const users = readUsers();
    return users.find((u) => u.id === id);
  },

  findUserByResetToken(token) {
    const users = readUsers();
    const user = users.find(
      (u) =>
        u.resetToken === token &&
        u.resetTokenExpires &&
        new Date(u.resetTokenExpires) > new Date()
    );
    return user;
  },

  createUser({ name, email, passwordHash, profile = {} }) {
    const users = readUsers();
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
      profile: {
        branch: profile.branch || '',
        customBranch: profile.customBranch || '',
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        interests: Array.isArray(profile.interests) ? profile.interests : [],
        teamSize: profile.teamSize || '',
        timeAvailable: profile.timeAvailable || '',
        goal: profile.goal || ''
      }
    };
    users.push(newUser);
    writeUsers(users);
    return newUser;
  },

  updateUserProfile(userId, profileData) {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    users[index].profile = {
      ...users[index].profile,
      ...profileData
    };
    writeUsers(users);
    return users[index];
  },

  createResetToken(email) {
    const users = readUsers();
    const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (index === -1) return null;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    users[index].resetToken = resetToken;
    users[index].resetTokenExpires = resetTokenExpires;
    writeUsers(users);

    return { resetToken, expires: resetTokenExpires };
  },

  resetPasswordWithToken(token, newPasswordHash) {
    const users = readUsers();
    const index = users.findIndex(
      (u) =>
        u.resetToken === token &&
        u.resetTokenExpires &&
        new Date(u.resetTokenExpires) > new Date()
    );

    if (index === -1) return false;

    users[index].passwordHash = newPasswordHash;
    delete users[index].resetToken;
    delete users[index].resetTokenExpires;

    writeUsers(users);
    return true;
  }
};
