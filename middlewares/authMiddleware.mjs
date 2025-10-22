import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    ////////////  Accept "Bearer <token>" or raw token in cookie ///////////////
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
}
