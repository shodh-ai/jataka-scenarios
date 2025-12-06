const express = require('express');
const authController = require('../controllers/authController');
const cartHelper = require('../utils/cartHelper');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Product routes (Master Build)
router.get('/products', productController.getAllProducts);

// Cart routes (Master Build)
router.post('/cart/add', cartController.addToCart);
router.post('/cart/move-to-wishlist', wishlistController.moveToWishlist);
router.get('/cart/:userId', cartController.getCart);

// Cart demo routes (intentionally reflect current buggy behavior)
router.post('/cart/total', (req, res) => {
    const { price, quantity } = req.body;
    const total = cartHelper.calculateTotal(price, quantity);
    res.json({ total });
});

router.post('/cart/discount', (req, res) => {
    const { subtotal, percent } = req.body;
    const discounted = cartHelper.applyPercentageDiscount(subtotal, percent);
    res.json({ discounted });
});

router.post('/cart/free-shipping', (req, res) => {
    const { total, threshold } = req.body;
    const eligible = cartHelper.isEligibleForFreeShipping(total, threshold);
    res.json({ eligible });
});

router.post('/cart/total-with-tax', (req, res) => {
    const { subtotal, shipping, taxRate } = req.body;
    const total = cartHelper.calculateTotalWithTax(subtotal, shipping, taxRate);
    res.json({ total });
});

// Order routes (Master Build)
router.post('/orders', orderController.createOrder);

// Wishlist routes (Master Build)
router.get('/wishlist/:userId', wishlistController.getWishlist);

module.exports = router;
