const mongoose = require('mongoose');
const Product = require('../src/models/Product');
require('dotenv').config();

async function seed() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/shopflow';

        await mongoose.connect(uri);

        console.log('Connected. Seeding...');

        await Product.deleteMany({});

        const products = [];
        for (let i = 0; i < 500; i++) {
            products.push({
                name: `Premium Item ${i}`,
                description: `This is a high quality item number ${i}`,
                price: Math.floor(Math.random() * 100) + 10,
                stock: 100,
                category: i % 2 === 0 ? 'electronics' : 'apparel',
                isDeleted: false
            });
        }

        await Product.insertMany(products);
        console.log('Seeded 500 products.');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed', err);
        process.exit(1);
    }
}

seed();
