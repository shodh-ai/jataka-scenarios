import React from 'react';
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
                            <li><a href="#">All Products</a></li>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Accessories</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Pinterest</a></li>
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
