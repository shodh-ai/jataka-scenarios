const Order = require('../models/Order');
const EmailService = require('../services/EmailService');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create({ ...req.body, status: 'pending' });

        // MASTER BUILD: Fire and Forget (Async)
        // We do NOT await this. We let it run in background.
        EmailService.sendOrderConfirmation(req.user.email, order._id)
            .catch(err => console.error("Email failed in background:", err));

        res.status(201).json({ success: true, orderId: order._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
