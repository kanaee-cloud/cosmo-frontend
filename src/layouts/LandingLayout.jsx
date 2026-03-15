import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import bgImage from '../assets/dashboard/bg-image.jpg'
import bgLightImage from '../assets/dashboard/bg-light.png'
import Footer from '../components/Footer'
import { useThemeStore } from '../store/themeStore'

export const LandingLayout = () => {
    const { activeTheme } = useThemeStore();
    const isLightMode = activeTheme === 'zenith';

    const currentBg = isLightMode ? bgLightImage : bgImage;
    const overlay = isLightMode ? 'rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)';

    return (
        <main
            className="bg-primary text-text font-tertiary selection:bg-accent/40 selection:text-white min-h-screen transition-all duration-500"
            style={{
                backgroundImage: `linear-gradient(${overlay}), url(${currentBg})`,
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
