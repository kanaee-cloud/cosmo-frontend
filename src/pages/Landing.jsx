import React from 'react';
import Navbar from '../components/Navbar';

import Hero from '../components/Landing/Hero';
import About from '../components/Landing/About';
import Armory from '../components/Landing/Armory';
import Call from '../components/Landing/Call';
import Footer from '../components/Footer';
import bgImage from '../assets/dashboard/bg-image.jpg'

const Landing = () => {
    return (
        <div
            className="bg-[#0d0514] text-slate-100 font-tertiary selection:bg-accent/40 selection:text-white min-h-screen"
            style={{ 
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
                backgroundSize: '100% auto', 
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat' 
            }}
        >
            <div className="sticky top-0 z-50 w-full">
                <Navbar />
            </div>
            
            <main className="w-full relative z-10 flex flex-col">
                <Hero />
                <About />
                <Armory />
                <Call />
            </main>
            
            <Footer />
        </div>
    );
};

export default Landing;