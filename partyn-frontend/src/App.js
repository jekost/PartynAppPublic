import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './components/Events';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import './styles/global.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Events />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
