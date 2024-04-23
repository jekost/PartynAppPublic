import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Hook for redirecting users

    const handleRegister = () => {
        axios.post('http://localhost:8080/auth/register', { username, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                alert('Registration successful. Please log in.');
                navigate('/login');  // Redirect to login page after successful registration
            })
            .catch(error => {
                console.error('Registration failed:', error);
                alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
            });

    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
