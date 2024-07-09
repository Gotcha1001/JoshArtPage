import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons'; // Import TikTok icon

const Footer = () => {
    const playClickSound = () => {
        const clickSound = new Audio("/digital.mp3");
        clickSound.play();
    };

    return (
        <footer className="footer bg-gray-200 py-4">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <ul className="footer-links flex flex-wrap sm:flex-row sm:justify-center">
                    <li className="mb-4 sm:mb-0">
                        <NavLink
                            to="/references"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "active-footer-link text-gray-900 block" : "text-gray-700 hover:text-gray-900 block"
                            }
                        >
                            References
                        </NavLink>
                    </li>
                    <li className="mb-4 sm:mb-0">
                        <NavLink
                            to="/business-details"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "active-footer-link text-gray-900 block" : "text-gray-700 hover:text-gray-900 block"
                            }
                        >
                            Business Details
                        </NavLink>
                    </li>
                    <li className="mb-4 sm:mb-0">
                        <NavLink
                            to="/data-protection"
                            onClick={playClickSound}
                            className={({ isActive }) =>
                                isActive ? "active-footer-link text-gray-900 block" : "text-gray-700 hover:text-gray-900 block"
                            }
                        >
                            Data Protection
                        </NavLink>
                    </li>
                    {/* New Link for Stone Art City Blog */}
                    <li className="mb-4 sm:mb-0">
                        <a
                            href="https://stoneartcity.blogspot.com/?m=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 block"
                        >
                            Stone Art City Blog
                        </a>
                    </li>
                </ul>

                {/* Company Logo */}
                <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center">
                    <img
                        src="https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/JoshLogo.JPG?raw=true"
                        alt="Josh's Art Logo"
                        className="h-12 rounded-full m-3 wobble1  "
                    />


                </div>
            </div>
        </footer>
    );
};

export default Footer;
