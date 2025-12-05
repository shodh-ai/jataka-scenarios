// src/models/Wishlist.js
// TICKET 4.1: Implement the Wishlist Schema
// Requirements:
// 1. Link to a specific User (ObjectId)
// 2. Store an array of Product IDs
// 3. Include timestamps

const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    // Student needs to fill this in:
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // products: [{ type: String }] // Store Product IDs as strings for simplicity in this demo
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
