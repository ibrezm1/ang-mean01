// productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming your Product model is defined in a separate file

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (create) a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) an existing product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an existing product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
