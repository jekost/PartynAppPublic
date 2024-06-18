import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events');
                console.log('Fetched events:', response.data); // Log fetched data
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError(error.message); // Set error message
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-950 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-black to-purple-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
                <div className="relative px-4 py-10 bg-black shadow-lg sm:rounded-lg sm:p-20">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">Upcoming Events</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="space-y-4">
                        {events.length === 0 && !error ? (
                            <p className="text-center text-gray-400">No events available</p>
                        ) : (
                            events.map((event) => (
                                <div key={event.id} className="bg-gray-950 0 00 shadow-md rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold mb-2 text-gray-100">{event.name}</h2>
                                        <p className="text-gray-300 mb-2">{event.description}</p>
                                        <p className="text-gray-400 mb-2">{new Date(event.dateTime).toLocaleString()}</p>
                                        <p className="text-gray-300 font-semibold">${event.ticketPrice}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
