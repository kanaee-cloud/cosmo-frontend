import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import bgImage from '../assets/dashboard/bg-image.jpg'
import { MapPin } from 'lucide-react'

export const AuthLayout = () => {
    return (
        <main
            className="bg-primary text-slate-100 selection:bg-accent/40 selection:text-white min-h-screen"
        >
            
            <header>
                <div className="absolute border-light border-l-4 top-4 left-4 flex items-center gap-1.5  bg-secondary/90  backdrop-blur-sm px-3 py-1">
                <span className="font-tertiary text-light text-sm tracking-[0.2em]">SYS:STATUS :<span className='text-green-500'> ACTIVE</span></span>
            </div>

            <div className="absolute border-light border-r-4 bg-secondary/90 top-4 right-4 flex items-center gap-2 backdrop-blur-sm px-3 py-1">
                <span className="font-tertiary text-light text-sm tracking-[0.15em]">COORD: 42.69N / 97.62W</span>
                <MapPin className='opacity-70 text-light' size={15} />
            </div>
            </header>
            <section className='flex justify-center items-center min-h-screen'>
                <Outlet />
            </section>
        </main>
    )
}
