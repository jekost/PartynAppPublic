import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events');
                const sortedEvents = response.data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
                setEvents(sortedEvents);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = { timeZone: 'Europe/Tallinn', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-4xl w-full sm:mx-auto px-8">
                <div className="flex items-center justify-center mb-6 text-white">
                    <svg className="h-8 w-8 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="mr-4">Tartu, Estonia</span>
                    <h1 className="text-3xl font-semibold">
                        {currentTime.toLocaleTimeString('en-GB', options)}
                    </h1>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="space-y-8">
                    {events.length === 0 && !error ? (
                        <p className="text-center text-gray-400">No events available</p>
                    ) : (
                        events.map((event) => (
                            <div key={event.id}
                                 className="relative bg-gray-900 shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 p-12"
                                 style={{paddingTop: '4rem'}}>
                                {/* Location */}
                                <div className="absolute top-0 right-0 flex items-center text-white z-10"
                                     style={{transform: 'translateY(20%) translateX(-20%)', marginLeft: '1rem'}}>
                                    <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <p className="ml-2">{event.location}</p>
                                </div>
                                <div className="flex">
                                    {/* Date Icon */}
                                    <div
                                        className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-lg font-bold absolute top-4 left-4">
                                        <div className="text-center">
                                            <p>{new Date(event.dateTime).getDate()}</p>
                                            <p>{new Date(event.dateTime).toLocaleString('default', {month: 'short'})}</p>
                                        </div>
                                    </div>

                                    {/* Event Image */}
                                    <div className="flex-shrink-0 w-1/3 relative -ml-12">
                                        <img src={event.imageUrl} alt={event.name}
                                             className="w-full h-full object-cover rounded-l-lg"/>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                                    </div>

                                    {/* Event Details */}
                                    <div className="ml-8 flex-1">
                                        {/* Event Name */}
                                        <h2 className="text-2xl font-bold text-white uppercase">{event.name}</h2>
                                        <div className="h-4"></div>
                                        {/* Event Time */}
                                        <p className="text-lg text-gray-400">{new Date(event.dateTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}</p>
                                        {/* Interested */}
                                        <div className="flex items-center mt-4 space-x-4">
                                            <div
                                                className="flex items-center absolute bottom-4 left-100 text-white space-x-4">
                                                <svg className="h-8 w-8 text-red-500" width="24" height="24"
                                                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                     fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24H24z"/>
                                                    <circle cx="9" cy="7" r="4"/>
                                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
                                                </svg>
                                                <p>{event.interested}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ticket Info and Facebook Link */}
                                    <div className="flex items-center absolute bottom-4 right-4 text-white space-x-4">
                                        <a href={event.facebookLink} target="_blank" rel="noopener noreferrer"
                                           className="text-blue-500 hover:underline">
                                            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path
                                                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                            </svg>
                                        </a>
                                        <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                        </svg>
                                        {event.ticketPrice > 0 ? <p>{event.ticketPrice} €</p> : <p>FREE</p>}
                                    </div>
                                </div>
                                {/* Hover Arrow */}
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.3 12.7l-4.3 4.3c-.39.39-1.02.39-1.41 0l-4.3-4.3c-.63-.63-.18-1.71.71-1.71h2.59V9c0-.55.45-1 1-1s1 .45 1 1v3h2.59c.89 0 1.34 1.08.71 1.71z"/>
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
