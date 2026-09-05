import jwt from 'jsonwebtoken';
import { dbService } from '../services/dbService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'projectpilot_sec_key_9832749832749823749827394872938';

export function authenticateToken(req, res, next) {
  // Read token from HttpOnly cookie or Authorization header
  let token = req.cookies?.auth_token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = dbService.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User account no longer exists' });
    }

    // Attach user without passwordHash
    const { passwordHash, resetToken, resetTokenExpires, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}
