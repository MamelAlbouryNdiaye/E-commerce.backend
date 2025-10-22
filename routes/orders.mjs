import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.mjs';
import Product from '../models/Product.mjs';
import Order from '../models/Order.mjs';


const router = express.Router();

/** ///////////////////////////
 * POST /api/orders
 * Create a new order (logged in user)
 *////////////////////////////
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({ user: req.user._id, items: req.body.items, total: req.body.total });
    return res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

/** /////////////////////////////////////
 * GET /api/orders
 * Liste of orders (admin)
 *//////////////////////////////////////
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    return res.json({ message: 'Liste of orders (admin)' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});
 
/** ////////////////////////////////
 * GET /api/orders/my
 * Retrieves the logged in user's orders
 *///////////////////////////////////
router.get('/my', protect, async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id });
    return res.json({ message: 'Logged in user commands' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
