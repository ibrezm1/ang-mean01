// dataLoader.js

const fs = require('fs');
const Product = require('./models/Product'); // Assuming your Product model is defined in a separate file
const User = require('./models/User'); // Assuming your User model is defined in a separate file
const Cart = require('./models/Cart'); // Assuming your Cart model is defined in a separate file
const { count } = require('console');


async function clearAndLoadData() {
  try {
    // Clear existing data
    await Cart.deleteMany();
    await Product.deleteMany();

    // Read data from JSON file
    const jsonData = fs.readFileSync('loadproducts.json', 'utf8');
    const products = JSON.parse(jsonData);

    // Insert data into the database
    await Product.insertMany(products);
    

    // Clear existing users
    await User.deleteMany();

    // Insert sample users
    await User.create([
      { username: 'alice', email: 'test@test.com',password: 'test' },
      { username: 'bob', email: 'aaa@bb.com', password: 'test' },
    ]);

    // Find sample products
    const testProducts = await Product.find().limit(2); // Limiting to 2 sample products

    // Find sample users
    const testUser = await User.find().limit(2); // Limiting to 2 sample users

    // Create sample cart items
    await Cart.create([
      { userId: testUser[0]._id, products: [{ product: testProducts[0]._id, count: 2 }] },
      { userId: testUser[1]._id, products: [{ product: testProducts[1]._id }] }
    ]);


    console.log('Data cleared and loaded successfully');
  } catch (error) {
    console.error('Error clearing and loading data:', error);
  }
}

module.exports = { clearAndLoadData };