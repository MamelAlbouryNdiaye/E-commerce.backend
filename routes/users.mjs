// backend/routes/users.mjs
import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.mjs';
import User from '../models/User.mjs';

const router = express.Router();

/** ////////////////////////////
 * GET /api/users
 * Liste all the users (admin)
 */////////////////////////////
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

/** ///////////////////////////////////
 * GET /api/users/:id
 * User details admin or the user imself
 */////////////////////////////////////
router.get('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

/** ///////////////////////////////
 * DELETE /api/users/:id
 * delete a user (admin)
 */////////////////////////////////
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: `User ${req.params.id} deleted` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

export default router;
