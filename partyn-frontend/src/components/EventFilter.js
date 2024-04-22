import React from 'react';
import '../styles/Events.css';


const EventFilter = ({ filters, setFilters }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Filter by name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
            {/* Will add more filters later */}
        </div>
    );
};

export default EventFilter;
