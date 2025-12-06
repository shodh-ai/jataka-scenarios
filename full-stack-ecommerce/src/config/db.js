// Simple placeholder DB config for the internship demo.
// No real database connection is performed here.

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopflow';

module.exports = {
    connect: async () => {
        // In a real app, this would initialize the database connection.
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        await mongoose.connect(MONGO_URI);
    }
};
