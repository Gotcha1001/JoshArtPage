import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const clickSoundRef = useRef(null);
    const navigate = useNavigate();
    const adminEmail = "admin@example.com";
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const adminDropdownRef = useRef(null);

    useEffect(() => {
        clickSoundRef.current = new Audio("/long.mp3");

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const playClickSound = () => {
        clickSoundRef.current.play();
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Redirect to the home page after logout
        } catch (error) {
            console.error(error);
        }
    };

    const toggleAdminDropdown = () => {
        setIsAdminDropdownOpen(!isAdminDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
                setIsAdminDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold mb-4 md:mb-0 zoom horizontal-spin" onClick={playClickSound}>
                        <img
                            src="/LogoNav.PNG"
                            alt="Joshes Art Logo"
                            className="navbar-logo"
                        />
                    </Link>
                </div>
                <div className="flex items-center md:ml-4">
                    {user && (
                        <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="navbar-element">
                                <NavLink
                                    to="gallery"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    Gallery
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="art-videos"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    Art Videos
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="about"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    About
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="art-pricing"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    Art Pricing
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="promoting-other-artists"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    Promoting Other Artists
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="contact"
                                    onClick={playClickSound}
                                    className={({ isActive }) =>
                                        isActive ? "active-link text-white" : "text-white hover:text-blue-500"
                                    }
                                >
                                    Contact
                                </NavLink>
                            </div>
                            {user.email === adminEmail && (
                                <div className="relative navbar-element" ref={adminDropdownRef}>
                                    <button onClick={toggleAdminDropdown} className="bg-black rounded-md p-2 mb-3 hover:text-blue-500">
                                        Admin Actions
                                    </button>
                                    {isAdminDropdownOpen && (
                                        <ul className="absolute bg-gray-800 text-white rounded mt-2 shadow-lg" onMouseEnter={() => setIsAdminDropdownOpen(true)} onMouseLeave={() => setIsAdminDropdownOpen(false)}>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="gallery-add-item"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Gallery Add Item
                                                </NavLink>
                                            </div>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="gallery-alter-item"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Gallery Alter Item
                                                </NavLink>
                                            </div>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="video-upload-form"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Video Upload
                                                </NavLink>
                                            </div>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="video-update"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Alter Video
                                                </NavLink>
                                            </div>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="upload-inspirations"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Promote Upload
                                                </NavLink>
                                            </div>
                                            <div className="navbar-element">
                                                <NavLink
                                                    to="alter-inspirations"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Promote Alter
                                                </NavLink>
                                            </div>
                                        </ul>
                                    )}
                                </div>
                            )}
                            <div className="flex flex-col items-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                <div className="navbar-element mb-4">
                                    <span className="text-white bg-teal-600 rounded-full p-2 mb-3 md:mb-0">{`Welcome, ${user.email}`}</span>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="navbar-element">
                                        <a href="https://www.FaceBook.com/Stoneartcity" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faFacebook} className="h-10 w-10 text-blue-500 hover:text-blue-700 wobble" />
                                        </a>
                                    </div>
                                    <div className="navbar-element">
                                        <a href="https://www.instagram.com/cornerstone_in_th3_spirit/?igsh=anRsOGozcXc3dHp2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="ml-4">
                                            <FontAwesomeIcon icon={faInstagram} className="h-10 w-10 text-purple-500 hover:text-purple-700 wobble" />
                                        </a>
                                    </div>
                                    <div className="navbar-element">
                                        <a href="https://www.tiktok.com/@stoneartcity?_t=8no3pt4ShRF&_r=1" target="_blank" rel="noopener noreferrer" className="ml-4">
                                            <FontAwesomeIcon icon={faTiktok} size="2x" className="text-teal-700 hover:text-gray-900 wobble" />
                                        </a>
                                    </div>
                                </div>
                                <div className="navbar-element">
                                    <button onClick={logout} className="text-white hover:text-blue-500">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div className="flex flex-col items-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="navbar-element">
                                <NavLink
                                    to="register"
                                    onClick={playClickSound}
                                    className="text-white hover:text-blue-500"
                                    activeClassName="active-link"
                                >
                                    Register
                                </NavLink>
                            </div>
                            <div className="navbar-element">
                                <NavLink
                                    to="login"
                                    onClick={playClickSound}
                                    className="text-white hover:text-blue-500"
                                    activeClassName="active-link"
                                >
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
