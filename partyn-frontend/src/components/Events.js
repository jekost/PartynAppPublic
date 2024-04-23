import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './EventList';
import EventFilter from './EventFilter';
import '../styles/Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ name: '', date: '' }); // Initialize filters with default values
    const [layout, setLayout] = useState('list'); // 'grid' or 'list'

    useEffect(() => {
        axios.get('http://localhost:8080/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events', error);
            });
    }, []);

    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(filters.name.toLowerCase()));

    const handleLayoutChange = (layoutType) => {
        setLayout(layoutType);
    };

    const handleFilterTopPick = () => {
        // Handle filtering for top pick events
    };

    return (
        <div className="events-container">
            <div className="toggle-buttons">
                <button className={`button ${layout === 'list' ? 'active' : ''}`} onClick={() => handleLayoutChange('list')}>List View</button>
                <button className={`button ${layout === 'grid' ? 'active' : ''}`} onClick={() => handleLayoutChange('grid')}>Grid View</button>
                <button className="button" onClick={handleFilterTopPick}>Top Pick</button>
            </div>
            <EventFilter filters={filters} setFilters={setFilters} />
            <EventList events={filteredEvents} layout={layout} />
        </div>
    );
};

export default Events;
