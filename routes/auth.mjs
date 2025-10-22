import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport'; //
import dotenv from 'dotenv';
import User from '../models/User.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES = '7d';

////////  Helper: create JWT  //////////////
function createToken(user) {
  const payload = { id: user._id, role: user.role, name: user.name };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
}


 //////////// POST /api/auth/register //////////////
 ///////////// body: { name, email, password } ////////////////
 
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const user = new User({ name, email, password });
    await user.save();

    const token = createToken(user);
    return res.status(201).json({ token: 'Bearer ' + token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server ERROR', error: err.message });
  }
});

/** ///////////////////////////////////////////////
 * POST /api/auth/login
 * body: { email, password }
 *//////////////////////////////////////////////////
router.post('/login', async (req, res, next) => {
  try {
    //// in case i shift to passport local 
    // passport.authenticate('local', { session: false }, (err, user, info) => { ... })(req, res, next);

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'invalid password' });

    const token = createToken(user);
    return res.json({ token: 'Bearer ' + token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server ERROR', error: err.message });
  }
});

/** ///////////////////////////////
 * GET /api/auth/me
 * Protected route to send the current user 
 *///////////////////////////////////
router.get('/me', protect, (req, res) => {
  /////// req.user set by the protect middleware /////////////
  return res.json({ user: req.user });
});

export default router;
