import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container section" style={{maxWidth: '400px'}}>
            <h2>Create Account</h2>
            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input 
                    type="text" placeholder="Username" required 
                    onChange={e => setFormData({...formData, username: e.target.value})}
                />
                <input 
                    type="email" placeholder="Email" required 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input 
                    type="password" placeholder="Password" required 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;
