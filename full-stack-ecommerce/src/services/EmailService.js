// src/services/EmailService.js

exports.sendOrderConfirmation = async (userEmail, orderId) => {
    console.log(`[EMAIL] Connecting to SMTP server...`);

    // SIMULATED LATENCY (e.g., slow 3rd party API like SendGrid)
    // This blocks the checkout flow!
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Random Failure (Simulating network jitter)
    if (Math.random() < 0.1) {
        throw new Error("SMTP Timeout");
    }

    console.log(`[EMAIL] Sent to ${userEmail} for Order ${orderId}`);
    return true;
};
