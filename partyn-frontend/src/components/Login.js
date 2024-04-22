import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Using AuthContext to handle login state

    const handleLogin = () => {
        axios.post('http://localhost:8080/auth/login', { username, password })
            .then(response => {
                login(response.data);  // Update auth state with the response data
                console.log('Login successful:', response.data);
            })
            .catch(error => {
                console.error('Login failed:', error.response.data);
                alert('Login failed: ' + error.response.data.message);
            });
    };

    return (
        <div className="login-container">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
