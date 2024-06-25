import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Events from './Events.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AdminPanel from './AdminPanel.jsx';
import Locations from './Locations.jsx';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // Check if token has expired
            if (decodedToken.exp < currentTime) {
                handleLogoutClick();
                return;
            }

            setIsAuthenticated(true);
            setUser({
                username: decodedToken.sub,
                authorities: decodedToken.roles.split(' ')
            });
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLoginSuccess = (jwt, user) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('token', jwt);
        setShowLogin(false);
        validateToken(jwt);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleRegisterSuccess = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleLogoutClick = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    const isAdmin = user?.authorities?.includes('ADMIN');
    console.log('isAdmin:', isAdmin);

    return (
        <Router>
            <div className="App">
                <Header
                    onLoginClick={handleLoginClick}
                    onLogoutClick={handleLogoutClick}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isAdmin={isAdmin}
                />
                <Routes>
                    <Route path="/" element={<Events />} />
                    {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onShowRegister={handleRegisterClick} />} />
                    <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} onShowLogin={handleLoginClick} />} />
                </Routes>
                <Footer />
                {showLogin && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="relative w-full max-w-2xl">
                            <button
                                className="absolute top-0 right-0 m-4 text-white text-2xl"
                                onClick={handleCloseLogin}
                            >
                                &times;
                            </button>
                            <Login onLoginSuccess={handleLoginSuccess} onShowRegister={handleRegisterClick} />
                        </div>
                    </div>
                )}
                {showRegister && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="relative w-full max-w-2xl">
                            <button
                                className="absolute top-0 right-0 m-4 text-white text-2xl"
                                onClick={handleCloseLogin}
                            >
                                &times;
                            </button>
                            <Register onRegisterSuccess={handleRegisterSuccess} onShowLogin={handleLoginClick} />
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
