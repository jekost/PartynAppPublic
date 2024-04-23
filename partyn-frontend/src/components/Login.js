import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:8080/auth/login', { username, password })
            .then(response => {
                if (response.status === 200 && response.data.jwt) {  // Check if JWT is present
                    login(response.data);  // Successfully logged in
                    navigate('/');
                } else {
                    throw new Error('Login failed');
                }
            })
            .catch(error => {
                console.error('Login failed:', error.response ? error.response.data : error);
                alert('Login failed: ' + (error.response?.data || 'Invalid credentials'));
            });
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
