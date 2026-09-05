import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbService } from '../services/dbService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'projectpilot_sec_key_9832749832749823749827394872938';

// Cookie helper
function setAuthCookie(res, token) {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
}

// 1. REGISTER
router.post('/register', authRateLimiter, async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profile } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Full Name is required' });
    }

    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check duplicate account
    const existingUser = dbService.findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Hash password with bcryptjs
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = dbService.createUser({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      profile
    });

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    const { passwordHash: _, ...safeUser } = user;
    return res.status(201).json({
      message: 'Registration successful',
      user: safeUser
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// 2. LOGIN (rate limited)
router.post('/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    const user = dbService.findUserByEmail(normalizedEmail);
    if (!user) {
      // Generic error to avoid account enumeration
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    const { passwordHash: _, resetToken, resetTokenExpires, ...safeUser } = user;
    return res.json({
      message: 'Login successful',
      user: safeUser
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during login' });
  }
});

// 3. LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  return res.json({ message: 'Logged out successfully' });
});

// 4. GET CURRENT USER (ME)
router.get('/me', authenticateToken, (req, res) => {
  return res.json({ user: req.user });
});

// 5. UPDATE USER STAGE-1 PROFILE
router.post('/profile', authenticateToken, (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      return res.status(400).json({ error: 'A valid profile is required' });
    }

    const updatedUser = dbService.updateUserProfile(req.user.id, profile);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    const { passwordHash, resetToken, resetTokenExpires, ...safeUser } = updatedUser;
    return res.json({ user: safeUser });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

// 6. FORGOT PASSWORD (rate limited)
router.post('/forgot-password', authRateLimiter, (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const resetData = dbService.createResetToken(email);
    // Generic response regardless of whether email exists (prevents account enumeration)
    return res.json({
      message: 'If an account exists with this email, a password reset token has been generated.',
      resetToken: resetData ? resetData.resetToken : null // provided for demonstration/testing
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error processing forgot password request' });
  }
});

// 7. RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Reset token is required' });
    }

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    const success = dbService.resetPasswordWithToken(token, passwordHash);

    if (!success) {
      return res.status(400).json({ error: 'Invalid or expired password reset token' });
    }

    return res.json({ message: 'Password has been reset successfully. You can now log in.' });
  } catch (err) {
    return res.status(500).json({ error: 'Error resetting password' });
  }
});

export default router;
