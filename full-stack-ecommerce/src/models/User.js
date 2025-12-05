const mongoose = require('mongoose');

// LEGACY NOTE: We are using a simple string for roles. 
// TODO: Refactor this to a Role schema later - Dev Team 2023
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Basic regex, might need updating
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin', 'support'], // Too many roles, good for testing logic
        default: 'user'
    },
    // The "Legacy" Address Block - should be its own Schema but isn't
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: { type: String, default: 'IN' }
    },
    isActive: { type: Boolean, default: true },
    lastLogin: Date
}, { timestamps: true });

// Simulated method to check password (for Auth module)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return enteredPassword === this.password; // In real app, use bcrypt.compare
};

module.exports = mongoose.model('User', UserSchema);
