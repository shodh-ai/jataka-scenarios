import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) return;

        fetch(`${API_BASE_URL}/wishlist/${userId}`)
            .then(res => res.json())
            .then(data => setItems(data.products || []));
    }, [userId]);

    return (
        <div className="container section">
            <h2>My Wishlist</h2>
            {items.map(p => {
                const getProductImage = (prod) => {
                    if (prod.images && prod.images.length > 0) return prod.images[0];
                    if (prod.image) return prod.image;
                    if (prod.category === 'apparel') return 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=800';
                    if (prod.category === 'electronics') return 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800';
                    if (prod.category === 'accessories') return 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800';
                    return 'https://via.placeholder.com/600x400?text=Jataka+Collection';
                };

                const imageUrl = getProductImage(p);

                return (
                    <div key={p._id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={imageUrl} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div>
                            <h3>{p.name}</h3>
                            <p>${p.price}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Wishlist;
