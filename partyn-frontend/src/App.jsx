import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Events from './Events.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Signup from './Signup.jsx';
import AdminPanel from './AdminPanel.jsx';
import './App.css';

const App = () => {
    const [showSignup, setShowSignup] = useState(false);

    const handleLoginClick = () => {
        setShowSignup(true);
    };

    const handleCloseSignup = () => {
        setShowSignup(false);
    };

    // You should manage user roles here, for example, isAdmin can be set based on user authentication state
    const isAdmin = true; // Set this based on your authentication logic

    return (
        <Router>
            <div className="App">
                <Header onLoginClick={handleLoginClick} isAdmin={isAdmin} />
                <Routes>
                    <Route path="/" element={<Events />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
                <Footer />
                {showSignup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="relative w-full max-w-2xl">
                            <button
                                className="absolute top-0 right-0 m-4 text-white text-2xl"
                                onClick={handleCloseSignup}
                            >
                                &times;
                            </button>
                            <Signup />
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
