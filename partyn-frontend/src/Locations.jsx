import React from 'react';

const hardcodedLocations = [
    { id: 1, name: 'Genialistide Klubi', description: 'A place for creative and cultural events.', imageUrl: './assets/location1.jpg' },
    { id: 2, name: 'Naiiv', description: 'A cozy bar with live music and performances.', imageUrl: './assets/location2.jpg' },
    { id: 3, name: 'Kivi Baar', description: 'A popular spot for drinks and socializing.', imageUrl: './assets/location3.jpg' }
];

const Locations = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-4xl w-full sm:mx-auto px-8">
                <div className="flex items-center justify-center mb-6 text-white">
                    <h1 className="text-3xl font-semibold">Locations</h1>
                </div>
                <div className="space-y-8">
                    {hardcodedLocations.map((location) => (
                        <div key={location.id}
                             className="relative bg-gray-900 shadow-md rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 p-12 group"
                             style={{paddingTop: '4rem'}}>
                            <div className="flex">
                                <div className="flex-shrink-0 w-1/3 relative -ml-12">
                                    <img src={location.imageUrl} alt={location.name}
                                         className="w-full h-full object-cover rounded-l-lg"/>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                                </div>
                                <div className="ml-8 flex-1">
                                    <h2 className="text-2xl font-bold text-white uppercase">{location.name}</h2>
                                    <div className="h-4"></div>
                                    <p className="text-lg text-gray-400">{location.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Locations;
