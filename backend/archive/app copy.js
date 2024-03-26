const express = require('express');
const mongodb = require('mongodb');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// MongoDB connection URI
// load url from .env file
require('dotenv').config();
const uri = process.env.MONGO_URL;

// Create a new MongoClient
const client = new mongodb.MongoClient(uri);

// Middleware to parse JSON request body
app.use(express.json());
// Use the cors middleware
app.use(cors());

// Connect to MongoDB
client.connect().then(async () => {
  console.log('Connected to MongoDB');

  // Get the database instance
  const db = client.db('mydatabase');

  // Get the collection instance
  const productsCollection = db.collection('products');

  // Delete all documents in the collection
  await productsCollection.deleteMany({});

  // Populate the collection with sample data
  // Read the file contents
  const fileData = JSON.parse(fs.readFileSync('loadproducts.json', 'utf8'));

  // Insert the file data into the collection
  const result = await productsCollection.insertMany(fileData);
  console.log(`${result.insertedCount} documents were inserted`);


    // GET all products
    app.get('/products', async (req, res) => {
        const products = await productsCollection.find().toArray();
        res.json(products);
    });

    // GET all products with pagination
    app.get('/products', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        try {
        const products = await productsCollection.find().skip(skip).limit(limit).toArray();
        res.json(products);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    });

  // GET a single product
  app.get('/products/:id', async (req, res) => {
    const product = await productsCollection.findOne({ id: parseInt(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  // POST (create) a new product
  app.post('/products', async (req, res) => {
    const newProduct = req.body;
    const result = await productsCollection.insertOne(newProduct);
    res.json(result.ops[0]);
  });

  // PUT (update) an existing product
  app.put('/products/:id', async (req, res) => {
    const updatedProduct = req.body;
    const result = await productsCollection.replaceOne(
      { id: parseInt(req.params.id) },
      updatedProduct
    );
    if (result.modifiedCount === 1) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  // DELETE an existing product
  app.delete('/products/:id', async (req, res) => {
    const result = await productsCollection.deleteOne({ id: parseInt(req.params.id) });
    if (result.deletedCount === 1) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
