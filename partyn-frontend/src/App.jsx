import { useState } from 'react'

import Events from './Events.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Signup from './Signup.jsx'
import './App.css'

const App = () => {
    const [showSignup, setShowSignup] = useState(false);

    const handleLoginClick = () => {
        setShowSignup(true);
    };

    const handleCloseSignup = () => {
        setShowSignup(false);
    };

    return (
        <div className="App">
            <Header onLoginClick={handleLoginClick} />
            <Events />
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
    );
};

export default App;