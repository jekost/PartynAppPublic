import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [topPick, setTopPick] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            name,
            dateTime,
            ticketPrice: parseInt(ticketPrice),
            description,
            location,
            topPick,
        };

        try {
            const response = await axios.post('http://localhost:8080/events', eventData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccess('Event posted successfully!');
            setError(null);
            navigate('/');
        } catch (error) {
            setError('Failed to post event');
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Post a New Event</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="dateTime">Date and Time</label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="ticketPrice">Ticket Price</label>
                    <input
                        type="number"
                        id="ticketPrice"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="topPick">Top Pick</label>
                    <input
                        type="checkbox"
                        id="topPick"
                        checked={topPick}
                        onChange={(e) => setTopPick(e.target.checked)}
                        className="mr-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 p-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default AdminPanel;
