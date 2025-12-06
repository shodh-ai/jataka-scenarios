import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { API_BASE_URL } from '../config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => {
                // Handle pagination response structure or raw array
                const items = data.products || data.data || data; 
                setProducts(items);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load products", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container section">Loading Inventory...</div>;

    return (
        <>
            <div style={{ paddingTop: 'var(--spacing-xxl)', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '3rem' }}>Shop All</h1>
            </div>
            <ProductGrid title="" products={products} />
        </>
    );
};

export default ProductList;
