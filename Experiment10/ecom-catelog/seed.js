// seed.js
require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecom';

(async () => {
  await connectDB(MONGO_URI);
  await Product.deleteMany({});

  const sample = await Product.create({
    name: 'Classic Tee',
    description: 'Comfortable cotton tee',
    categories: ['Apparel', 'Tshirts'],
    variants: [
      { sku: 'CT-BLK-M', color: 'Black', size: 'M', price: 19.99, stock: 50 },
      { sku: 'CT-WHT-L', color: 'White', size: 'L', price: 19.99, stock: 30 }
    ],
    reviews: [
      { name: 'Alice', rating: 5, comment: 'Great fit!' },
      { name: 'Bob', rating: 4, comment: 'Good quality.' }
    ]
  });

  console.log('Seeded:', sample);
  process.exit(0);
})();
