import Hero from '../components/Landing/Hero';
import About from '../components/Landing/About';
import Armory from '../components/Landing/Armory';
import Call from '../components/Landing/Call';



const Landing = () => {
    return (
        <main className="w-full relative z-10 flex flex-col">
            <Hero />
            <About />
            <Armory />
            <Call />
        </main>

    );
};

export default Landing;