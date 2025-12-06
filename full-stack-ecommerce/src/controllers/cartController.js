/**
 * =================================================================================
 * MODULE: CartController
 * AUTHOR: Dave (Legacy Team)
 * DATE: 2021-08-15
 * DESCRIPTION: Handles all cart operations. 
 * TODO: Refactor tax logic (Ticket #JIRA-402) - PENDING SINCE 2022
 * WARNING: Do not touch the tax calculation lines 140-190 without PM approval.
 * =================================================================================
 */

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// LEVEL 1: Legacy, non-atomic add-to-cart with hardcoded tax and race conditions
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // No atomic stock check, no validation – classic legacy bug
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Hardcoded 20% tax regardless of user/location
        const priceWithTax = product.price * 1.2;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        const existing = cart.items.find(i => String(i.productId) === String(productId));
        if (existing) {
            // Blind increment, no stock check
            existing.quantity = (existing.quantity || 0) + (quantity || 1);
        } else {
            cart.items.push({ productId, quantity: quantity || 1, price: priceWithTax });
        }

        await cart.save();
        res.json({ success: true, cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Master Build: Fetch cart for a user (used by Cart.jsx UI)
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart
            .findOne({ user: req.params.userId })
            .populate('items.productId');
        res.json(cart || { items: [] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

