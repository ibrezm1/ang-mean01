// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataLoader = require('./dataLoader'); // Import the data loader function
const productRoutes = require('./routes/productRoutes'); // Import the product routes
const cartRoutes = require('./routes/cartRoutes'); // Import the cart routes

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// load url from .env file
require('dotenv').config();
// MongoDB connection URI
const uri = process.env.MONGO_URL;
// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB')
        dataLoader.clearAndLoadData();
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Use the product routes
app.use('/products', productRoutes);
app.use('/carts',cartRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});