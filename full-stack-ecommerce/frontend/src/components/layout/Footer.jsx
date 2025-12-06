import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Jataka Scenarios</h3>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                            Crafting premium experiences for the discerning modern individual.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Shop</h4>
                        <ul>
                            <li><Link to="/products">All Products</Link></li>
                            <li><Link to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link to="/accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/shipping-returns">Shipping & Returns</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect</h4>
                        <ul>
                            <li><Link to="/instagram">Instagram</Link></li>
                            <li><Link to="/twitter">Twitter</Link></li>
                            <li><Link to="/pinterest">Pinterest</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Jataka Scenarios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
