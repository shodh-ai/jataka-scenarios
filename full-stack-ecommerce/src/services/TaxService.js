const User = require('../models/User');

exports.calculatePrice = async (userId, basePrice) => {
    const user = await User.findById(userId);
    let taxRate = 0.05; // Default

    if (user && user.shippingAddress) {
        const { state, country } = user.shippingAddress;
        if (country === 'US' && state === 'CA') taxRate = 0.0725;
        if (country === 'UK') taxRate = 0.20;
    }
    
    return basePrice * (1 + taxRate);
};
