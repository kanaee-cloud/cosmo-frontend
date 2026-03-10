import React from 'react';

const Navbar = () => {
    // Definisi clip-path untuk menghasilkan sudut ala pixel (potong sudut)
    const pixelClip = "polygon(6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px), 0 6px, 6px 6px)";
    const buttonClip = "polygon(4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px), 0 4px, 4px 4px)";

    return (
        <div className="w-full flex justify-center py-4 px-4 sm:px-6 relative">
            {/* Outer wrapper for positioning shadow manually, as clip-path cuts CSS box-shadow */}
            <div className="w-full max-w-5xl relative z-10">

                {/* Navbar Shadow Layer (Pixelated) */}
                <div className="absolute top-[4px] left-[4px] right-[-4px] bottom-[-4px] bg-[rgba(138,109,252,0.3)] pointer-events-none z-0" style={{ clipPath: pixelClip }}></div>

                {/* Main Navbar: glassmorphism, pixel border, using clip-path */}
                <nav className="w-full flex items-center justify-between px-4 py-2 bg-primary/40 backdrop-blur-md border-[3px] border-light/50 relative z-10" style={{ clipPath: pixelClip }}>

                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer z-10">
                        <div className="text-accent flex items-center justify-center transform transition-transform hover:-translate-y-1">
                            {/* Rocket Icon (Smaller) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>
                        </div>
                        {/* Text Logo (Smaller) */}
                        <span className="text-white font-press font-extrabold text-base tracking-wide flex items-center mt-1">
                            Cosmo
                        </span>
                    </div>

                    {/* Links & Button Section */}
                    <div className="flex items-center gap-5 z-10">
                        {/* Nav Links (Smaller gap and text) */}
                        <div className="hidden md:flex items-center gap-5 font-press text-[10px] tracking-widest text-white/90">
                            <a href="#operations" className="hover:text-light transition-colors duration-300 relative group">
                                OPERATIONS
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-light transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a href="#logs" className="hover:text-light transition-colors duration-300 relative group">
                                LOGS
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-light transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a href="#login" className="hover:text-light transition-colors duration-300 relative group">
                                LOGIN
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-light transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </div>

                        {/* Action Button: Pixel Look using clipPath without extra borders */}
                        <button className="bg-accent text-white font-press text-[10px] tracking-widest py-2 px-4 hover:bg-[#ff1a66] transition-all duration-300 outline-none focus:ring-2 focus:ring-accent/50 active:scale-95" style={{ clipPath: buttonClip }}>
                            START MISSION
                        </button>
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default Navbar;
