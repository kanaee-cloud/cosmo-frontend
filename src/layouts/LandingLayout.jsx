import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import { useThemeStore } from '../store/themeStore'

import bgNexus from '../assets/dashboard/bg-image.jpg'
import bgAbyss from '../assets/dashboard/bg-blue.png'
import bgMars from '../assets/dashboard/bg-mars.png'

export const LandingLayout = () => {
    const { activeTheme } = useThemeStore();
    const getBackgroundImage = () => {
        switch (activeTheme) {
            case 'abyss':
                return bgAbyss;
            case 'mars':
                return bgMars;
            case 'nexus':
            default:
                return bgNexus;
        }
    };

    const currentBgImage = getBackgroundImage();

    const isLightMode = activeTheme === 'zenith';
    const overlay = isLightMode ? 'rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)';

    return (
        <main
            className="bg-primary text-text font-tertiary selection:bg-accent/40 selection:text-white min-h-screen transition-all duration-500"
            style={{
                backgroundImage: `linear-gradient(${overlay}), url(${currentBgImage})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 0.5s ease-in-out'
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