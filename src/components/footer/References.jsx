import React from 'react';

const references = [
    {
        name: "John Doe",
        title: "Art Critic",
        company: "Art Reviews Inc.",
        email: "john.doe@artreviews.com",
        phone: "(123) 456-7890",
        testimonial: "Josh's work is nothing short of revolutionary. His attention to detail and use of color are unmatched."
    },
    {
        name: "Jane Smith",
        title: "Gallery Owner",
        company: "Smith Gallery",
        email: "jane.smith@smithgallery.com",
        phone: "(234) 567-8901",
        testimonial: "Hosting Josh's exhibition was a highlight for our gallery. His pieces drew in crowds and left a lasting impression."
    },
    {
        name: "Emily Johnson",
        title: "Art Enthusiast",
        company: "Art Lovers Club",
        email: "emily.johnson@artlovers.com",
        phone: "(345) 678-9012",
        testimonial: "I've been following Josh's career for years. His evolution as an artist is inspiring, and his current work is breathtaking."
    },
    {
        name: "Michael Brown",
        title: "Art Collector",
        company: "Private Collection",
        email: "michael.brown@collector.com",
        phone: "(456) 789-0123",
        testimonial: "Josh's pieces are the pride of my collection. Each artwork tells a unique story that captivates everyone who sees it."
    }
];

const References = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            <h1 className="text-4xl font-bold mb-8">References</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 max-w-6xl">
                {references.map((reference, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{reference.name}</h2>
                        <h3 className="text-xl text-gray-600 mb-4">{reference.title} at {reference.company}</h3>
                        <p className="mb-4 italic">"{reference.testimonial}"</p>
                        <p className="text-gray-600"><strong>Email:</strong> {reference.email}</p>
                        <p className="text-gray-600"><strong>Phone:</strong> {reference.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default References;
