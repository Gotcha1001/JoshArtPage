import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white  text-center bg-black rounded-full wobble1 p-4 gradient-background1  ">About My Journey</h1>

                {/* Josh's start with art */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto gradient-background2 ">
                    <img src="https://images.pexels.com/photos/1656059/pexels-photo-1656059.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Josh" className="w-full h-64 object-cover object-center" />
                    <div className="p-4">
                        <h2 className="text-xl text-white font-semibold mb-2 hover:bg-slate-900 rounded-full p-3">How Josh Started with Art</h2>
                        <p className="text-gray-300 hover:text-teal-600">
                            Stone@rt is a Durban based professional fine artist specializing in cooperate branding artworks in spaces and places incorporating a wild and abundant amounted of honed in skills to particular mediums Signwriting, signage and fabrication, lighting, Clothing and textiles, fine art / galleries graffiti, street art installations, photography, videography, animation, graphic design, canvases & murals
                        </p>
                    </div>
                </div>

                {/* Josh's training */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto gradient-background2 ">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-white">Training</h2>
                        <p className="text-gray-300 hover:text-teal-500">
                            Self taught and with inspiration of great friends on my journey and path and all the people I have met and been inspired by, I give many thanks and gratitude to those who have given their time and dedication to steching our great art as a global universal collaboration, no tiny idea is a waste, everything is a masterpiece and design of the greatness of all , that is in us all and acknowledgement is needed to all who conciously contribute with great amazing beautiful intentions and collaborations. Every day is a new path to learn something new about our amazing universe and how art is in us all.
                        </p>
                    </div>
                </div>


                {/* Artists who inspire Josh */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto gradient-background2">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-white">Artists Who Inspire Him</h2>
                        <p className="text-gray-300 hover:text-teal-500">
                            Saliador Dali, and community projects and inspirational artists within the community.
                        </p>
                    </div>
                </div>

                {/* Local artists */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto gradient-background2">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-white">Local Artists</h2>
                        <p className="text-gray-300 hover:text-teal-500">
                            I always take my hat off to those artists who continue creating in South Africa even though,  the funding and apraisal is insignificant in this Country, your art means the world to someone out there, that touches their heart and soul, never stop making and producing your creations from your heart, feel the art and let it consume your ability to communicate those emotions to all beings that come across your path in life and leave a footprint of love and divine inspiration to all you conceive.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
