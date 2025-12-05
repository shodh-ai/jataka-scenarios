const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, index: true }, // Index for performance task
    images: [String],
    isDeleted: { type: Boolean, default: false } // Soft delete pattern
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
