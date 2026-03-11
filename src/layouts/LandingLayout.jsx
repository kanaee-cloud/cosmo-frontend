import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import bgImage from '../assets/dashboard/bg-image.jpg'
import Footer from '../components/Footer'

export const LandingLayout = () => {
    return (
        <main
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
            <Outlet />
            <Footer />
        </main>
    )
}

