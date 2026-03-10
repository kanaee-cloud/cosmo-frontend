import React from 'react';

const Navbar = () => {
    // Clip-path untuk membuat sudut tombol menjadi pixelated/terpotong (dipertahankan)
    const buttonClip = "polygon(4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px), 0 4px, 4px 4px)";

    return (
        <div className="w-full flex justify-center py-6 px-4 sm:px-6 relative">
            <div className="w-full  max-w-6xl px-4 mx-auto relative z-10">
                <nav className="w-full flex px-16 items-center mx-auto justify-between py-2 bg-[#150B24]/90 backdrop-blur-md rounded-full border border-[#7A40F2] shadow-[0_0_20px_rgba(122,64,242,0.6)] relative z-10">
                    <div className="flex items-center  gap-3 cursor-pointer z-10 group">
                        <div className="text-[#FF0055] flex items-center justify-center transform transition-transform group-hover:-translate-y-1">
                            {/* Rocket Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>
                        </div>
                        {/* Text Logo */}
                        <span className="text-white font-extrabold font-primary text-2xl tracking-wide flex items-center">
                            Cosmo
                        </span>
                    </div>

                    <div className="flex items-center gap-8 z-10 font-primary">
                        <div className="hidden md:flex items-center gap-6 font-bold text-[11px] tracking-[0.15em] text-white">
                            <a href="#operations" className="hover:text-gray-300 transition-colors duration-300 relative group">
                                OPERATIONS
                            </a>
                            <a href="#logs" className="hover:text-gray-300 transition-colors duration-300 relative group">
                                LOGS
                            </a>
                            <a href="#login" className="hover:text-gray-300 transition-colors duration-300 relative group">
                                LOGIN
                            </a>
                        </div>

                        {/* Pixelated Button */}
                        <button
                            className="bg-[#FF0055] text-white font-bold text-[12px] tracking-wider py-2.5 px-6 hover:bg-[#D40046] transition-all duration-300 outline-none active:scale-95"
                            style={{ clipPath: buttonClip }}
                        >
                            START MISSION
                        </button>
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default Navbar;