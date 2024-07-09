// components/RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer/Footer';
import ScrollToTop from './specialsetups/ScrollToTop';

const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout;
