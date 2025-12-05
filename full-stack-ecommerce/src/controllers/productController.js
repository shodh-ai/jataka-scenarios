const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        // TICKET 3.1: Performance optimization needed.
        // Currently, this fetches ALL products. If we have 10,000 items, the server crashes.
        // STUDENT TASK: Implement Pagination (skip/limit) and Redis Caching.

        const { category, search } = req.query;

        let query = { isDeleted: false };
        if (category) query.category = category;

        // BUG: Inefficient Search
        // Using Regex without an index is slow on large datasets.
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // BIGGER BUG: No Limit. Fetches everything.
        const products = await Product.find(query);

        // ARTIFICIAL LATENCY (Simulating a slow DB query for the demo)
        // Student must remove this or fix it via caching
        await new Promise(resolve => setTimeout(resolve, 800));

        res.json({
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
