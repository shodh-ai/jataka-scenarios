const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header) throw new Error();

        const token = header.replace('Bearer ', '');
        
        // MASTER BUILD: Actual Verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: decoded._id });
        if (!user) throw new Error();

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access Denied" });
        }
        next();
    }
};

module.exports = { auth, checkRole };
