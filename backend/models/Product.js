const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { collection: 'products', timestamps: true });

// Create the Product model based on the product schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
