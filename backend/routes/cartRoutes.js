// cart.routes.js
const express = require('express');
const Cart = require('../models/Cart'); // Assuming your Cart  model is defined in a separate file

const router = express.Router();

// Create a new cart
router.post('/', async (req, res) => {
    try {
      const { userId, products } = req.body;
      const cart = new Cart({ userId, products });
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all carts
  router.get('/', async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get cart by ID
  router.get('/:id', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update cart by ID
  router.put('/:id', async (req, res) => {
    try {
      const { userId, products } = req.body;
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { userId, products }, { new: true });
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete cart by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      if (!deletedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json({ message: 'Cart deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;