import React from 'react';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/product/ProductGrid';

const featuredProducts = [
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
    }
];

const Home = () => {
    return (
        <>
            <Hero />
            <ProductGrid
                title="Featured Collection"
                subtitle="Handpicked essentials for the modern lifestyle."
                products={featuredProducts}
            />
        </>
    );
};

export default Home;
