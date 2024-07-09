import React from 'react';

const BusinessDetails = () => {
    return (
        <div className="container mx-auto mt-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2 text-yellow-500 hover:bg-black rounded-lg p-3 zoom">Josh Stone</h1>
                <p className="text-lg hover:bg-black rounded-md text-white">Manager Creative Cube Media<br />HeartWorks Joshua Dylan Wade Harman</p>
                <p className="text-lg font-bold hover:bg-black rounded-md text-white">Museum: Property Management Company : Photographer</p>
            </div>

            <div className="flex justify-center mt-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4 text-center">Creative property branding</h2>
                        <ul className="list-disc list-inside">
                            <li>Murals</li>
                            <li>Workshops</li>
                            <li>Street art</li>
                            <li>Graffiti</li>
                            <li>Contracting and Painting</li>
                            <li>Development</li>
                            <li>Turn Key Projects</li>
                            <li>Architecture</li>
                            <li>Blue Prints</li>
                            <li>Building rendering</li>
                            <li>Conveyances</li>
                            <li>Site and construction managers</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <p className="font-bold text-white">JHB/Durban</p>
            </div>

            {/* Image */}
            <div className="flex justify-center mt-8 mb-4">
                <img
                    src="https://images.pexels.com/photos/936089/pexels-photo-936089.jpeg?auto=compress&cs=tinysrgb&w=800"  // Replace with your actual image URL
                    alt="Business Image"
                    className="max-w-full h-auto rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default BusinessDetails;
