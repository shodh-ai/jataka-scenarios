import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            
            window.location.href = '/products';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container section" style={{maxWidth: '400px'}}>
            <h2>Login</h2>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input 
                    type="email" placeholder="Email" required 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input 
                    type="password" placeholder="Password" required 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
