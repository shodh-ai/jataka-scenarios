import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`${API_BASE_URL}/cart/${userId}`)
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const moveToWishlist = async (productId) => {
        const res = await fetch(`${API_BASE_URL}/cart/move-to-wishlist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, productId })
        });
        if (res.ok) {
            alert('Moved to Wishlist!');
            window.location.reload(); // Lazy refresh
        }
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="container section">
            <h2>Your Cart</h2>
            {cart.items.map(item => (
                <div key={item._id} className="card" style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <h3>{item.productId.name}</h3>
                        <p>Qty: {item.quantity} | ${item.price}</p>
                    </div>
                    <button onClick={() => moveToWishlist(item.productId._id)}>
                        Save for Later
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
