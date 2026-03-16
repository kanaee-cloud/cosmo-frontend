import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
    const { session, profile, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const buttonClip = "polygon(4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px), 0 4px, 4px 4px)";

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center py-6 px-4 sm:px-6 relative"
        >
            <div className="w-full  max-w-6xl px-4 mx-auto relative z-10">
                <nav className="w-full flex px-16 items-center mx-auto justify-between py-3 bg-[#150B24]/90 backdrop-blur-md rounded-full border border-[#7A40F2] shadow-[0_0_20px_rgba(122,64,242,0.6)] relative z-10">
                    <Link to={session ? "/dashboard" : "/"} className="flex items-center  gap-3 cursor-pointer z-10 group">
                        <div className="text-[#FF0055] flex items-center justify-center transform transition-transform group-hover:-translate-y-1">
                            <Rocket />
                        </div>
                        <span className="text-white font-extrabold font-primary text-2xl tracking-wide flex items-center">
                            Cosmo
                        </span>
                    </Link>

                    <div className="flex items-center gap-8 z-10 font-primary">
                        {!session ? (
                            <>
                                <div className="hidden md:flex items-center gap-6 font-bold text-[11px] tracking-[0.15em] text-white">
                                    <Link 
                                        to="/login" 
                                        style={{ clipPath: buttonClip }}
                                        className="bg-[#FF0055] text-white font-bold text-[12px] tracking-wider py-2.5 px-6 hover:bg-[#D40046] transition-all duration-300 outline-none active:scale-95">
                                        LOGIN
                                    </Link>
                                </div>

                                <Link
                                    to="/register"
                                    className="bg-[#FF0055] text-white font-bold text-[12px] tracking-wider py-2.5 px-6 hover:bg-[#D40046] transition-all duration-300 outline-none active:scale-95"
                                    style={{ clipPath: buttonClip }}
                                >
                                    START MISSION
                                </Link>
                            </>
                        ) : (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-3 bg-[#23153c] border border-[#7A40F2]/50 hover:bg-[#2e1d4e] transition-colors rounded-full py-1.5 px-2 pr-4 shadow-[0_0_10px_rgba(122,64,242,0.3)]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#150B24] flex items-center justify-center overflow-hidden border border-[#FF0055]">
                                        {profile?.avatar_url || session?.user?.user_metadata?.avatar_url ? (
                                            <img src={profile?.avatar_url || session?.user?.user_metadata?.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={16} className="text-[#FF0055]" />
                                        )}
                                    </div>
                                    <span className="text-white text-sm font-bold tracking-wide">
                                        {profile?.user_name || session?.user?.user_metadata?.user_name || session?.user?.email?.split('@')[0] || 'Agent'}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-48 bg-[#150B24] border border-[#7A40F2] rounded-xl overflow-hidden shadow-[0_5px_20px_rgba(122,64,242,0.4)] flex flex-col"
                                        >
                                            <Link 
                                                to="/profile" 
                                                className="px-4 py-3 text-white text-sm hover:bg-[#23153c] transition-colors font-semibold flex items-center gap-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <User size={14} />
                                                Profile
                                            </Link>
                                            <Link 
                                                to="/dashboard" 
                                                className="px-4 py-3 text-white text-sm hover:bg-[#23153c] transition-colors font-semibold"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="px-4 py-3 text-[#FF0055] text-sm hover:bg-[#23153c] transition-colors font-semibold flex items-center justify-between"
                                            >
                                                Logout
                                                <LogOut size={14} />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </motion.div>
    );
};

export default Navbar;