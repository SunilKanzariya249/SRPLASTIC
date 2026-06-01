const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products (with optional filtering by category & search query)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ pageNumber: 1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/products/categories
// @desc    Get all unique product categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, data: ['All', ...categories] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const id = req.params.id;
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      // Try to match page number if it's a fallback ID (e.g., "p2")
      const match = id.match(/^p(\d+)$/i);
      if (match) {
        const pageNum = parseInt(match[1], 10);
        product = await Product.findOne({ pageNumber: pageNum });
      }
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
