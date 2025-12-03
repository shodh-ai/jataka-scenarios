const express = require('express');
const authController = require('../controllers/authController');
const cartHelper = require('../utils/cartHelper');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);

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

module.exports = router;
