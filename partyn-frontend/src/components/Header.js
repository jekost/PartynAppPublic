import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';
import logo from '../logo.png';

const Header = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Partyn Logo" className="logo-image"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/" className="nav-link">Events</Link>
                {authUser ? (
                    <>
                        <span className="user-greeting">Welcome, {authUser.username}!</span>
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
