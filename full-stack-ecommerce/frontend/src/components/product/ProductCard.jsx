import React from 'react';
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
                <button className="add-to-cart-btn" aria-label="Add to cart">
                    <ShoppingBag size={18} />
                </button>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default ProductCard;
