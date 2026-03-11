import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardClip = "polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)";
const buttonClip = "polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)";


const Register = () => {
    const [callsign, setCallsign] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center px-4 py-10 min-h-[calc(100vh-88px)]"
        >

            {/* Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-[420px] bg-secondary/95 border border-[#3d2278]/90 shadow-[0_0_40px_rgba(61,34,120,0.5),inset_0_0_30px_rgba(0,0,0,0.3)] p-8"
            >

                {/* Title */}
                <h1 className="text-center font-semibold font-primary text-light text-md tracking-[0.35em] leading-7 mb-2">
                    NEW PILOT INDUCTION
                </h1>

                {/* Subtitle */}
                <p className="text-center font-secondary text-accent text-[9px] tracking-[0.15em] mb-7 flex items-center justify-center gap-1">
                    <span>&gt; Enter credentials to begin mission...</span>
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                    {/* Pilot Callsign */}
                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ PILOT CALLSIGN ]
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="E.G. STARDUST_9"
                                value={callsign}
                                onChange={(e) => setCallsign(e.target.value)}
                                className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 pr-8 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-secondary text-white text-[11px] animate-pulse select-none pointer-events-none">|</span>
                        </div>
                    </div>

                    {/* Secure Comms Frequency */}
                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ SECURE COMMS FREQUENCY ]
                        </label>
                        <input
                            type="email"
                            placeholder="pilot@orbitask.nexus"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200"
                        />
                    </div>

                    {/* Unique Access Code */}
                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ UNIQUE ACCESS CODE ]
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200"
                        />
                    </div>

                    {/* Confirm Access Code */}
                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ CONFIRM ACCESS CODE ]
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-accent/30 border border-accent text-accent hover:text-white font-primary text-[10px] tracking-[0.25em] py-3.5 hover:bg-[#cc0044] transition-all duration-300 active:scale-[0.98] mt-1"
                    >
                        COMMENCE ENLISTMENT
                    </button>
                </form>

                {/* Footer link */}
                <div className="mt-6 text-center">
                    <p className="font-primary text-[9px] tracking-wider text-gray-500">
                        Already have clearance?{' '}
                        <Link to="/login" className="text-accent hover:text-red-300 transition-colors duration-200">
                            (Access Core Here)
                        </Link>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Register;
