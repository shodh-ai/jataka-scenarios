import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const getProductImage = (p) => {
        if (p.images && p.images.length > 0) return p.images[0];
        if (p.image) return p.image;
        if (p.category === 'apparel') return 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=800';
        if (p.category === 'electronics') return 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800';
        if (p.category === 'accessories') return 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800';
        return 'https://via.placeholder.com/600x400?text=Jataka+Collection';
    };

    const imageUrl = getProductImage(product);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            alert("Please login first!");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    userId,
                    productId: product._id, 
                    quantity: 1 
                })
            });
            
            if (res.ok) {
                alert("Added to cart!");
            } else {
                const err = await res.json();
                alert(`Error: ${err.error}`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={imageUrl} alt={product.name} className="product-image" />
                <button className="add-to-cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
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
