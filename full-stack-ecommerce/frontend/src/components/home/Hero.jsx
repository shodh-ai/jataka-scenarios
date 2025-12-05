import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Timeless Elegance, Modern Soul</h1>
                <p className="hero-subtitle">Discover our curated collection of responsibly crafted essentials.</p>
                <Link to="/products" className="btn btn-primary">
                    Shop Collection
                </Link>
            </div>
        </div>
    );
};

export default Hero;
