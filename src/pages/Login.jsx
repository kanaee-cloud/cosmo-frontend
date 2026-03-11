import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const cardClip = "polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)";
const buttonClip = "polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)";

const Login = () => {
    const [pilotId, setPilotId] = useState('');
    const [accessCode, setAccessCode] = useState('');

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=""
        >

            {/* Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-[370px] bg-secondary/95 border border-[#3d2278]/90 shadow-[0_0_40px_rgba(61,34,120,0.5),inset_0_0_30px_rgba(0,0,0,0.3)] p-8"
            >
                <div className="flex justify-center mb-5 bg-light w-12 h-12  mx-auto items-center" >
                     <LockKeyhole className="text-primary" size={30} />
                </div>
                <h1 className="text-center font-primary font-semibold text-light text-md tracking-[0.3em] leading-7 mb-2">
                    SECURITY CLEARANCE<br />REQUIRED
                </h1>

                {/* Subtitle */}
                <p className="text-center font-tertiary text-accent text-xs tracking-[0.15em] mb-8 flex items-center justify-center gap-1">
                    <span>&gt; Awaiting pilot credentials</span>
                    <span className="animate-pulse inline-block w-1.5 h-3 bg-accent align-middle ml-1" />
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Pilot ID */}
                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ PILOT_ID ]
                        </label>
                        <input
                            type="text"
                            placeholder="ENTER ID..."
                            value={pilotId}
                            onChange={(e) => setPilotId(e.target.value)}
                            className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-700 transition-all duration-200"
                        />
                    </div>


                    <div>
                        <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2">
                            [ PASSWORD ]
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-700 transition-all duration-200"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-4 text-accent bg-accent/30 border border-accent hover:text-white font-primary text-[10px] tracking-[0.25em] py-3.5 hover:bg-accent transition-all duration-300 active:scale-[0.98] mt-1"
                    >   
                        <Zap size={16} />
                        <span>INITIALIZE LINK</span>
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-7 space-y-2.5 text-center">
                    <p className="font-primary text-[9px] tracking-wider text-gray-500">
                        Lost transmission?{' '}
                        <Link to="/forgot-password" className="text-accent hover:text-red-300 transition-colors duration-200">
                            (Reset Code)
                        </Link>
                    </p>
                    <p className="font-primary text-[9px] tracking-wider text-gray-500">
                        New recruit?{' '}
                        <Link to="/register" className="text-accent hover:text-red-300 transition-colors duration-200">
                            (Enlist Here)
                        </Link>
                    </p>
                </div>

                {/* Version string */}
                <div className="mt-6 text-center border-t border-[#3d2278]/40 pt-4">
                    <p className="font-secondary text-[8px] tracking-[0.15em] text-gray-700">
                        —— UPDATED 01.11 / 1.0.01A ——
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
