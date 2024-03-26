// cart.model.js
const { count } = require('console');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      count: { type: Number, default: 1 }
    }]
  });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;