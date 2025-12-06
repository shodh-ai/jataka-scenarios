const Product = require('../models/Product');
const RedisService = require('../services/RedisService'); // You need to create this file

exports.getAllProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const cacheKey = `products:${category}:${search}:${page}:${limit}`;

        // MASTER BUILD: Redis Caching Pattern
        const data = await RedisService.getOrSet(cacheKey, async () => {
            let query = { isDeleted: false };
            if(category) query.category = category;
            if(search) query.name = { $regex: search, $options: 'i' };

            // MASTER BUILD: Pagination
            const products = await Product.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            
            const count = await Product.countDocuments(query);
            
            return {
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            };
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
