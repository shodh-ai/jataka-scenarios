const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');

exports.moveToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // 1. Remove from Cart
        const cartUpdate = await Cart.updateOne(
            { user: userId },
            { $pull: { items: { productId: productId } } }
        );

        if (cartUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        // 2. Add to Wishlist (Upsert: Create if not exists)
        await Wishlist.updateOne(
            { user: userId },
            { $addToSet: { products: productId } },
            { upsert: true }
        );

        res.status(200).json({ success: true, message: "Moved to Wishlist" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.params.userId })
                                     .populate('products');
        res.json(wishlist || { products: [] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
