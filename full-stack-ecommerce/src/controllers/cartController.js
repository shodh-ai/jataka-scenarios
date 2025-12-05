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
const User = require('../models/User');
const mongoose = require('mongoose');

// Logger utility (should be a separate file, but it's here for some reason)
const log = (msg, data) => {
    console.log(`[CART_CONTROLLER] ${new Date().toISOString()} - ${msg}`, data || '');
};

exports.addToCart = async (req, res) => {
    const start = Date.now();
    log("Request received: addToCart", req.body);

    try {
        // ==========================================
        // SECTION 1: MANUAL VALIDATION HELL
        // ==========================================
        // We aren't using 'Joi' or 'Zod', we are doing it manually like it's 2015.
        const { userId, productId, quantity } = req.body;

        if (userId === undefined || userId === null || userId === "") {
            log("Error: Missing userId");
            return res.status(400).json({ status: "FAIL", error: "Missing Parameters: userId is required" });
        }
        if (productId === undefined || productId === null || productId === "") {
            log("Error: Missing productId");
            return res.status(400).json({ status: "FAIL", error: "Missing Parameters: productId is required" });
        }
        if (quantity === undefined || quantity === null) {
            log("Error: Missing quantity");
            return res.status(400).json({ status: "FAIL", error: "Missing Parameters: quantity is required" });
        }

        // Type checking because we don't trust the frontend
        if (typeof quantity !== 'number') {
            log("Error: Quantity is not a number");
            return res.status(400).json({ status: "FAIL", error: "Invalid Type: quantity must be a number" });
        }
        if (quantity <= 0) {
            log("Error: Quantity is negative or zero");
            return res.status(400).json({ status: "FAIL", error: "Logic Error: quantity must be positive" });
        }
        if (quantity > 100) {
            log("Error: Bulk order attempt");
            return res.status(400).json({ status: "FAIL", error: "Policy Error: Cannot order more than 100 items" });
        }

        // ==========================================
        // SECTION 2: DATABASE LOOKUPS (Inefficient)
        // ==========================================
        // Fetch User to check address
        log(`Fetching user ${userId}...`);
        const user = await User.findById(userId);
        if (!user) {
            log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch Product
        log(`Fetching product ${productId}...`);
        const product = await Product.findById(productId);
        if (!product) {
            log("Product not found");
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.isDeleted) {
            log("Attempt to buy deleted product");
            return res.status(400).json({ error: "Product is no longer available" });
        }

        // ==========================================
        // SECTION 3: THE RACE CONDITION BUG
        // ==========================================
        log(`Checking stock. Required: ${quantity}, Available: ${product.stock}`);

        // BUG: We check stock here in memory
        if (product.stock < quantity) {
            log("Insufficient stock");
            return res.status(400).json({ error: `Insufficient stock. Only ${product.stock} left.` });
        }

        // ==========================================
        // SECTION 4: SPAGHETTI PRICING LOGIC
        // ==========================================
        let basePrice = product.price;
        let finalPrice = basePrice;
        let discountApplied = 0;

        // Holiday Logic (Hardcoded dates? Yes.)
        const today = new Date();
        const isChristmas = (today.getMonth() === 11 && today.getDate() > 20);
        const isBlackFriday = (today.getMonth() === 10 && today.getDate() > 20);

        if (isChristmas) {
            discountApplied = 0.10; // 10%
            log("Applying Christmas Discount");
        } else if (isBlackFriday) {
            discountApplied = 0.20; // 20%
            log("Applying BF Discount");
        }

        // VIP Logic
        if (user.role === 'vip' || user.role === 'admin') {
            if (discountApplied < 0.15) {
                discountApplied = 0.15; // VIP gets min 15%
                log("Applying VIP Discount override");
            }
        }

        finalPrice = basePrice - (basePrice * discountApplied);

        // ==========================================
        // SECTION 5: THE HARDCODED TAX NIGHTMARE
        // ==========================================
        // This is what needs to be refactored into TaxService.js
        let taxRate = 0.0;
        let region = "UNKNOWN";

        if (user.shippingAddress) {
            const country = user.shippingAddress.country;
            const state = user.shippingAddress.state;

            log(`Calculating tax for ${country} - ${state}`);

            if (country === 'US') {
                if (state === 'CA') taxRate = 0.0725;
                else if (state === 'NY') taxRate = 0.04;
                else if (state === 'TX') taxRate = 0.0625;
                else taxRate = 0.05; // Default US
                region = "NA_US";
            }
            else if (country === 'IN') {
                // GST Logic - Simplified but verbose
                if (product.category === 'electronics') taxRate = 0.18;
                else if (product.category === 'clothing') taxRate = 0.05;
                else if (product.category === 'books') taxRate = 0.00;
                else taxRate = 0.12;
                region = "APAC_IN";
            }
            else if (country === 'UK') {
                taxRate = 0.20; // VAT
                region = "EU_UK";
            }
            else {
                // International Flat Rate
                taxRate = 0.15;
                region = "INTL";
            }
        }

        const taxAmount = finalPrice * taxRate;
        const grossPrice = finalPrice + taxAmount;

        log(`Price Breakdown: Base=${basePrice}, Discount=${discountApplied}, TaxRate=${taxRate}, Final=${grossPrice}`);

        // ==========================================
        // SECTION 6: CART UPDATE (Blocking)
        // ==========================================
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            log("Creating new cart");
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].price = grossPrice; // Update price to current
            cart.items[existingItemIndex].total = grossPrice * cart.items[existingItemIndex].quantity;
        } else {
            cart.items.push({
                productId: productId,
                quantity: quantity,
                price: grossPrice,
                total: grossPrice * quantity
            });
        }

        // Simulate Slow Database (Artificial Latency to prove Race Condition)
        // This makes the window for the bug larger so students can actually hit it.
        await new Promise(r => setTimeout(r, 1000));

        await cart.save();
        log("Cart saved");

        // ==========================================
        // SECTION 7: STOCK UPDATE (The Bug Location)
        // ==========================================
        // We write the stock AFTER the slow cart save. 
        // During the 1000ms await above, another request could have read the old stock.

        product.stock = product.stock - quantity;

        // Safety check that fails in race conditions
        if (product.stock < 0) {
            log("CRITICAL: Stock went negative!");
            // In a real race condition, this check might even pass if two threads have old data
        }

        await product.save();
        log("Product stock updated");

        /* 
        // OLD CODE - KEEPING FOR REFERENCE (Dead Code)
        // const EmailService = require('../services/Email');
        // EmailService.sendCartUpdate(user.email);
        */

        const end = Date.now();
        log(`Request completed in ${end - start}ms`);

        res.status(200).json({
            success: true,
            data: cart,
            meta: {
                taxApplied: taxAmount,
                discount: discountApplied,
                region: region
            }
        });

    } catch (error) {
        console.error("CRITICAL CONTROLLER ERROR", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error. Please contact support with ID: " + Date.now()
        });
    }
};
