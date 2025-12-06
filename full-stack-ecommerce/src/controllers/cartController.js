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
const TaxService = require('../services/TaxService'); // You need to create this file

// MASTER BUILD: Atomic add-to-cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // MASTER BUILD: Atomic Stock Check & Update
        // This prevents the Race Condition
        const product = await Product.findOneAndUpdate(
            { _id: productId, stock: { $gte: quantity } },
            { $inc: { stock: -quantity } },
            { new: true }
        );

        if (!product) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // MASTER BUILD: Logic delegated to Service
        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = await Cart.create({ user: userId, items: [] });

        const priceWithTax = await TaxService.calculatePrice(userId, product.price);

        const itemIndex = cart.items.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: priceWithTax });
        }
        
        await cart.save();
        res.status(200).json({ success: true, cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
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

