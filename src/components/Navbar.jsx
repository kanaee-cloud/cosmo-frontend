import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, LogOut, User, Palette } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import UserAvatar from './common/UserAvatar';

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
            className="w-full flex justify-center py-4 md:py-6 px-4 sm:px-6 relative"
        >
            <div className="w-full max-w-6xl mx-auto relative z-10">
                {/* PERBAIKAN: px-16 diubah menjadi px-5 md:px-16 agar tidak terjepit di mobile */}
                <nav className="w-full flex px-5 md:px-16 items-center mx-auto justify-between py-1 bg-secondary/90 backdrop-blur-md rounded-full border border-light/50 shadow-[0_0_20px_rgba(122,64,242,0.4)] relative z-10">
                    
                    <Link to={session ? "/dashboard" : "/"} className="flex items-center gap-2 md:gap-3 cursor-pointer z-10 group shrink-0">
                        <div className="text-accent flex items-center justify-center transform transition-transform group-hover:-translate-y-1">
                            <img src="/cosmo-icon.png" alt="Cosmo Icon" className='w-12 h-13' />                        </div>
                        <span className="text-text font-extrabold font-primary text-xl md:text-2xl tracking-wide flex items-center">
                            Cosmo
                        </span>
                    </Link>

                    <div className="flex items-center gap-3 md:gap-8 z-10 font-primary">
                        {!session ? (
                            <>
                                <div className="hidden md:flex items-center gap-6 font-bold text-[11px] tracking-[0.15em] text-white">
                                    <Link 
                                        to="/login" 
                                        style={{ clipPath: buttonClip }}
                                        className="bg-accent text-white font-bold text-[12px] tracking-wider py-2.5 px-6 hover:bg-accent/80 transition-all duration-300 outline-none active:scale-95">
                                        LOGIN
                                    </Link>
                                </div>

                                {/* PERBAIKAN: Padding & text disusutkan untuk layar HP */}
                                <Link
                                    to="/register"
                                    className="bg-accent text-white font-bold text-[10px] md:text-[12px] tracking-wider py-2 md:py-2.5 px-4 md:px-6 hover:bg-accent/80 transition-all duration-300 outline-none active:scale-95 whitespace-nowrap"
                                    style={{ clipPath: buttonClip }}
                                >
                                    START MISSION
                                </Link>
                            </>
                        ) : (
                            <div className="relative">
                                {/* PERBAIKAN: Tombol profil dipadatkan di layar kecil */}
                                <button 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 md:gap-3 bg-tertiary border border-light/50 hover:bg-secondary transition-colors rounded-full py-1 md:py-1.5 px-1 md:px-2 md:pr-4 shadow-[0_0_10px_rgba(122,64,242,0.3)]"
                                >
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-accent shrink-0">
                                        {profile?.avatar_url || session?.user?.user_metadata?.avatar_url ? (
                                            <UserAvatar avatarId={profile?.avatar_url || session?.user?.user_metadata?.avatar_url} size={18} />
                                        ) : (
                                            <User size={14} className="text-accent md:w-4 md:h-4" />
                                        )}
                                    </div>
                                    {/* PERBAIKAN: Nama Kapten disembunyikan di layar HP agar navbar tidak berantakan */}
                                    <span className="hidden sm:block text-text text-xs md:text-sm font-bold tracking-wide max-w-[120px] truncate">
                                        {profile?.username || session?.user?.user_metadata?.username || session?.user?.email?.split('@')[0] || 'Agent'}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-48 bg-primary border border-light/80 rounded-xl overflow-hidden shadow-[0_5px_20px_rgba(122,64,242,0.4)] flex flex-col"
                                        >
                                            {/* PERBAIKAN: Karena nama disembunyikan di tombol, kita munculkan namanya di dalam Menu khusus Mobile */}
                                            <div className="sm:hidden px-4 py-3 border-b border-light/20">
                                                <p className="text-text text-[10px] tracking-widest font-bold truncate opacity-60">
                                                    LOGGED IN AS
                                                </p>
                                                <p className="text-accent text-xs font-bold truncate">
                                                    {profile?.user_name || session?.user?.user_metadata?.user_name || session?.user?.email?.split('@')[0] || 'Agent'}
                                                </p>
                                            </div>
                                            
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
                                                className="px-4 py-3 text-text text-sm hover:bg-secondary transition-colors font-semibold"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="px-4 py-3 text-accent text-sm hover:bg-secondary transition-colors font-semibold flex items-center justify-between"
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