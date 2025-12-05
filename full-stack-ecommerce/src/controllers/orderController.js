const Order = require('../models/Order'); // (You need an Order model, see below)
const EmailService = require('../services/EmailService');

exports.createOrder = async (req, res) => {
    // ... validation logic ...

    // 1. Create Order
    const order = await Order.create({ ...req.body, status: 'pending' });

    // 2. THE BOTTLENECK
    // The user has to wait 3 seconds just to see "Order Success"
    // STUDENT TASK: Move this to a background job / Event Emitter.
    try {
        await EmailService.sendOrderConfirmation(req.user.email, order._id);
    } catch (e) {
        console.error("Email failed, but order created.");
    }

    res.status(201).json({ success: true, orderId: order._id });
};
