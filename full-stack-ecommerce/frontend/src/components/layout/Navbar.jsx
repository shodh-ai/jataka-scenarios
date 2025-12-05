import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    Jataka
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Shop</Link>
                    <Link to="/about" className="nav-link">Our Story</Link>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn">
                        <Search size={20} />
                    </button>
                    <div className="cart-btn-wrapper">
                        <button className="icon-btn">
                            <ShoppingBag size={20} />
                        </button>
                        <span className="cart-count">0</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
