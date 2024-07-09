import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import ContactForm from './emailfolder/ContactForm';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

// Directly use the image URL in the src attribute
const contactImageUrl = 'https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600';

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:heartworksfoundation@outlook.com';
    };

    const handlePhoneClick = () => {
        window.location.href = 'tel:+27648468693'
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col items-center justify-between mb-8 px-4">
                <div className="flex items-center mb-4 lg:mb-0 lg:mr-4">
                    <a href="https://www.FaceBook.com/Stoneartcity" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="h-10 w-10 text-blue-500 hover:text-blue-700 wobble" />
                    </a>
                    <a href="https://www.instagram.com/cornerstone_in_th3_spirit/?igsh=anRsOGozcXc3dHp2&utm_source=qr" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="h-10 w-10 text-purple-500 hover:text-purple-700 ml-4 wobble" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@stoneartcity?_t=8no3pt4ShRF&_r=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-teal-700 hover:text-gray-900 wobble"
                    >
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </a>
                </div>

                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-semibold text-white zoom">Contact Us</h1>
                </div>
            </div>

            <div className="flex flex-col items-center mb-8 px-4">
                <img
                    src={contactImageUrl}
                    alt="Contact Us"
                    className="my-4 rounded-full shadow-md h-200 w-200  lg:h-60 lg:w-60 transition duration-300 transform hover:scale-110 "
                />
                <div className="w-full max-w-3xl">
                    <ContactForm />
                </div>
            </div>

            <div className="flex justify-center mb-4 lg:ml-4">
                <FontAwesomeIcon icon={faEnvelope} className="h-12 w-12 text-red-900 wobble hover:text-blue-500 mr-4 cursor-pointer" onClick={handleEmailClick} />
                <FontAwesomeIcon icon={faPhone} className="h-12 w-12 text-blue-900 wobble hover:text-blue-500 cursor-pointer" onClick={handlePhoneClick} />
                <span className="text-gray-700 cursor-pointer mb-5" onClick={handlePhoneClick}></span>
            </div>

            {/* Contact information */}
            <div className="flex justify-center mb-8">
                <div className="w-full max-w-xs bg-black rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-teal-600">Contact Information</h2>
                        <p className="text-white mb-2">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 cursor-pointer" onClick={handleEmailClick} />
                            <span className="cursor-pointer hover:text-teal-500" onClick={handleEmailClick}>Email: heartworksfoundation@outlook.com</span>
                        </p>
                        <p className="text-gray-700 mb-2">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 cursor-pointer hover:text-teal-500" onClick={handlePhoneClick} />
                            <span className="cursor-pointer hover:text-teal-500" onClick={handlePhoneClick}>Phone: 064 8468693</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Banking details */}
            <div className="flex justify-center mb-8">
                <div className="w-full max-w-xs bg-slate-950 rounded-lg shadow-md overflow-hidden hover:bg-teal-700 zoom">
                    <div className="p-4">
                        <h2 className="text-xl font-bold  mb-2 text-center text-teal-600">Banking Details</h2>
                        <p className="text-white mb-2">Bank Name: TymeBank</p>
                        <p className="text-white mb-2">Account Type: EveryDay Account</p>
                        <p className="text-white mb-2">Account Number: 51100254841</p>
                        <p className="text-white mb-2">Branch Code: 678910</p>
                        <p className="text-white mb-2">Account Holder Name: TymBank JDH</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;