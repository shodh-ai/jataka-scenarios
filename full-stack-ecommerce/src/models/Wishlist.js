// src/models/Wishlist.js
// TICKET 4.1: Implement the Wishlist Schema
// Requirements:
// 1. Link to a specific User (ObjectId)
// 2. Store an array of Product IDs
// 3. Include timestamps

const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
