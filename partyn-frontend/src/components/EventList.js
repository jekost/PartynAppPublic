import React from 'react';
import '../styles/Events.css';

const EventList = ({ events }) => {
    return (
        <div className="event-list-container">
            {events.length > 0 ? events.map((event) => (
                <div key={event.id} className="event-card">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> ${event.ticketPrice}</p>
                    {/* Additional event details  */}
                </div>
            )) : <p>No events found!</p>}
        </div>
    );
};

export default EventList;
