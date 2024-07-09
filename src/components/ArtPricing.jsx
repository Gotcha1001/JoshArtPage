import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ArtPricing = () => {
    const muralSizes = [
        { size: 'Small', dimensions: '3m x 4m', price: 'R4500', image: 'https://cdn.pixabay.com/photo/2017/08/31/17/51/graffiti-2701641_1280.jpg' },
        { size: 'Medium', dimensions: '5m x 7m', price: 'R8500', image: 'https://images.pexels.com/photos/2045248/pexels-photo-2045248.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { size: 'Large', dimensions: '8m x 10m', price: 'R15000', image: 'https://images.pexels.com/photos/1766236/pexels-photo-1766236.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { size: 'X-Large', dimensions: '10m x 12m', price: 'R22000', image: 'https://images.pexels.com/photos/5909881/pexels-photo-5909881.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { size: 'XX-Large', dimensions: '12m x 15m', price: 'R30000', image: 'https://cdn.pixabay.com/photo/2017/10/14/23/16/wall-art-2852191_1280.jpg' },
        { size: 'Gigantic', dimensions: '15m x 20m', price: 'R40000', image: 'https://cdn.pixabay.com/photo/2024/02/21/20/38/street-art-8588572_1280.jpg' }
    ];

    const handlePhoneClick = () => {
        window.location.href = 'tel:+27648468693';
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:heartworksfoundation@outlook.com';
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-background2 rounded-full p-3 text-white zoom ">Spray Paint Mural Pricing</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-3/4">
                {muralSizes.map((mural, index) => (
                    <div key={index} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <img src={mural.image} alt={mural.size} className="w-full h-64 object-cover mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-center">{mural.size}</h2>
                            <p className="text-center mb-2">{mural.dimensions}</p>
                            <p className="text-center font-bold text-2xl">{mural.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <h1 className="text-xl md:text-2xl font-bold mb-4 hover:bg-indigo-950 rounded-full p-3 text-white zoom">This is an estimate.</h1>
                <p className="text-lg mb-4 text-black zoom font-bold bg-teal-400 rounded-full p-3">Contact us and we'll make a quote based on your needs and requirements.</p>
                <div className="flex flex-col items-center justify-center gap-4 text-white md:flex-row md:justify-center md:items-center">
                    <p className="text-lg flex items-center hover:text-teal-500 cursor-pointer">
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        <span className="md:inline hidden">064 8468693</span>
                        <span className="md:hidden block" onClick={handlePhoneClick}>064 8468693</span>
                    </p>
                    <p className="text-lg flex items-center hover:text-teal-500 cursor-pointer">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <span className="md:inline hidden">heartworksfoundation@outlook.com</span>
                        <span className="md:hidden block" onClick={handleEmailClick}>heartworksfoundation@outlook.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ArtPricing;
