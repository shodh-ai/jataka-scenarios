const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const { category, search } = req.query;

        // LEVEL 3: Simulate slow DB (no cache, no pagination)
        await new Promise(r => setTimeout(r, 800));

        let query = { isDeleted: false };
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const products = await Product.find(query);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
