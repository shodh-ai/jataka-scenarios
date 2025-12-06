import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    Jataka
                </Link>

                <div className="nav-links">
                    <Link to="/products" className="nav-link">Shop</Link>
                    {token ? (
                        <>
                            <Link to="/wishlist" className="nav-link">Wishlist</Link>
                            <Link to="/cart" className="nav-link">Cart</Link>
                            <button onClick={handleLogout} className="nav-link icon-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
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
