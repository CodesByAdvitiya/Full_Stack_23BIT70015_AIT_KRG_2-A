// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');

/**
 * Create product
 * POST /api/products
 */
router.post('/', async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * List products (with optional category, search, pagination)
 * GET /api/products?category=Shirts&search=tee&page=1&limit=10
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = {};
    if (category) query.categories = category;
    if (search) query.$text = { $search: search };

    const products = await Product.find(query)
      .skip((page-1)*limit)
      .limit(parseInt(limit));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get product details with average rating and variant-level stock
 * GET /api/products/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Not found' });

    // compute avgRating and reviewsCount
    const reviews = product.reviews || [];
    const avgRating = reviews.length ? (reviews.reduce((s,r) => s + r.rating, 0) / reviews.length) : null;

    res.json({ product, avgRating, reviewsCount: reviews.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add a review to product (embedded)
 * POST /api/products/:id/reviews
 * body: { name, rating, comment, user }
 */
router.post('/:id/reviews', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    const rev = {
      name: req.body.name || 'Anonymous',
      rating: req.body.rating,
      comment: req.body.comment,
      user: req.body.user
    };
    p.reviews.push(rev);
    await p.save();
    res.status(201).json({ message: 'Review added', review: rev });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Atomic stock decrement for a specific variant
 * POST /api/products/:id/purchase
 * body: { sku, qty }  -> decrement stock if available
 */
router.post('/:id/purchase', async (req, res) => {
  try {
    const { sku, qty = 1 } = req.body;
    const id = req.params.id;

    // Use findOneAndUpdate with positional filter + stock check
    const result = await Product.findOneAndUpdate(
      { _id: id, 'variants.sku': sku, 'variants.stock': { $gte: qty } },
      { $inc: { 'variants.$.stock': -qty } },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({ error: 'Insufficient stock or invalid SKU' });
    }
    res.json({ message: 'Purchase successful', product: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Aggregation: average rating for a product (pipeline)
 * GET /api/products/:id/avg-rating
 */
router.get('/:id/avg-rating', async (req, res) => {
  try {
    const productId = mongoose.Types.ObjectId(req.params.id);
    const pipeline = [
      { $match: { _id: productId } },
      { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
      { $group: {
          _id: "$_id",
          avgRating: { $avg: "$reviews.rating" },
          count: { $sum: { $cond: [{ $ifNull: ["$reviews", false] }, 1, 0] } }
      }}
    ];
    const [result] = await Product.aggregate(pipeline);
    res.json(result || { avgRating: null, count: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Category-wise product count (aggregation)
 * GET /api/products/category-stats
 */
router.get('/analytics/category-stats', async (req, res) => {
  try {
    const pipeline = [
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ];
    const stats = await Product.aggregate(pipeline);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
