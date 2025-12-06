const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // LEVEL 1: Broken legacy regex
        const passwordRegex = /^[a-z]+$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                error: "Password must be 8+ chars and include special characters." 
            });
        }

        const user = await User.create({ username, password, email });
        res.status(201).json({ message: "User created", userId: user._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET);
        
        res.json({ user, token, userId: user._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
