import express from 'express';
import Product from '../models/Product.mjs';
import { protect, isAdmin } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

/** ////////////////////////////////////
 * GET /api/products
 * Query params (optional):
 *  - limit (number)
 *  - search (string)  : search in name / description
 *  - category (string)
 *  - minPrice / maxPrice (number)
 */////////////////////////////////////
router.get('/', async (req, res) => {
  
  try {
    console.log('==> GET /api/products called from', req.ip, 'headers:', req.headers['user-agent']);
    const { limit, search, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) {
      /////////////// basic search on name/description  ///////////////
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let q = Product.find(query).sort({ createdAt: -1 });

    if (limit) q = q.limit(Number(limit));

    const products = await q.exec();
    return res.json(products); ///// returns an array of products /////
  } catch (err) {
    console.error('GET /api/products error', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
});

/** ////////////////
 * GET /api/products/:id
 */////////////////
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error('GET /api/products/:id error', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
});

/** //////////////////////
 * POST /api/products  (admin)
 *////////////////////////
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const body = req.body;
    const product = await Product.create(body);
    return res.status(201).json(product);
  } catch (err) {
    console.error('POST /api/products error', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
});

/** ///////////////////////////
 * PUT /api/products/:id  (admin)
 */////////////////////////////
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'product not found' });
    return res.json(product);
  } catch (err) {
    console.error('PUT /api/products/:id error', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
});

/** ////////////////////////////
 * DELETE /api/products/:id  (admin)
 */////////////////////////////
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'product not found' });
    return res.json({ message: 'deleted product', productId: req.params.id });
  } catch (err) {
    console.error('DELETE /api/products/:id error', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
});

export default router;
