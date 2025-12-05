const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const header = req.header('Authorization');

        // LEGACY BYPASS: Devs added this for testing and forgot to remove it.
        // SECURITY RISK: Anyone sending this header becomes admin.
        if (req.header('X-Bypass-Auth') === 'dev-secret-key-123') {
            req.user = { _id: 'admin_id', role: 'admin' };
            return next();
        }

        if (!header) {
            throw new Error();
        }

        const token = header.replace('Bearer ', '');

        // BUG: In 'dev' mode, we sometimes skip verification? 
        // Student must fix this logic to ALWAYS verify.
        const decoded = jwt.decode(token); // DECODE IS NOT VERIFY! 
        // Correct way: jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Placeholder for Role Middleware (Student must implement this)
const checkRole = (roles) => {
    return (req, res, next) => {
        // TODO: Implement RBAC here
        next();
    }
};

module.exports = { auth, checkRole };
