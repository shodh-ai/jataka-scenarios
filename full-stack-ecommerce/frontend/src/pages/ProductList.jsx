import React from 'react';
import ProductGrid from '../components/product/ProductGrid';

const allProducts = [
    {
        id: 1,
        name: 'Minimalist leather backpack',
        price: 129.00,
        category: 'Bags',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Ceramic coffee set',
        price: 45.00,
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'Organic cotton tee',
        price: 28.00,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        name: 'Analog chronograph watch',
        price: 249.00,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        name: 'Premium denim jacket',
        price: 89.00,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        name: 'Wireless noise-canceling headphones',
        price: 199.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 7,
        name: 'Linen table cloth',
        price: 35.00,
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1587585579975-f5546255b988?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        name: 'Leather journal',
        price: 24.00,
        category: 'Stationery',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];

const ProductList = () => {
    return (
        <>
            <div style={{ paddingTop: 'var(--spacing-xxl)', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '3rem' }}>Shop All</h1>
            </div>
            <ProductGrid
                title=""
                products={allProducts}
            />
        </>
    );
};

export default ProductList;
