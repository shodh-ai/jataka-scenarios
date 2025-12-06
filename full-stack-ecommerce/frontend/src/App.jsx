import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import NewArrivals from './pages/NewArrivals';
import Accessories from './pages/Accessories';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import Contact from './pages/Contact';
import Instagram from './pages/Instagram';
import Twitter from './pages/Twitter';
import Pinterest from './pages/Pinterest';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/twitter" element={<Twitter />} />
            <Route path="/pinterest" element={<Pinterest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
