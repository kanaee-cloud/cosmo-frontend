import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section
           
            className="px-6 py-12 relative min-h-screen flex flex-col items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full relative z-10 bg-secondary/20 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]"
            >
                <div className="p-6 lg:p-12 flex flex-col lg:flex-row gap-12 items-center justify-center relative z-20 w-full">
                    {/* Soft gradient overlay to keep text readable on left, letting image shine on right */}
                    <div className="absolute inset-0 pointer-events-none z-0"></div>

                    {/* Left Content */}
                    <div className="flex flex-col gap-8 max-w-2xl lg:w-3/5 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 bg-accent/10 w-fit rounded-sm shadow-[0_0_10px_rgba(255,0,85,0.2)]">
                            <span className="size-2 bg-accent rounded-full animate-ping shadow-[0_0_5px_rgba(255,0,85,0.8)]"></span>
                            <span className="text-accent text-[9px] tracking-widest uppercase font-press">System Online</span>
                        </div>

                        <h1 className="text-white text-3xl lg:text-6xl font-primary font-bold leading-[1.5] tracking-tight drop-shadow-[0_0_10px_rgba(138,109,252,0.8)]">
                            Level Up Your Reality.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-light to-accent">Conquer the Cosmos.</span>
                        </h1>

                        <p className="text-white text-xl font-primary leading-loose max-w-xl border-l-4 border-light pl-4 bg-gradient-to-r from-light/10 to-transparent py-2">
                            Gamify your tasks. Earn XP for productivity. Become the pilot of your own destiny in a universe built for high-performance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="relative bg-accent px-8 py-3 text-white font-primary text-md tracking-wider hover:scale-105 transition-transform shadow-[0_0_10px_rgba(255,0,85,0.5),0_0_20px_rgba(255,0,85,0.3)] pixel-corners flex items-center justify-center gap-2 group">
                                <span className="material-symbols-outlined group-hover:animate-bounce text-base">stadia_controller</span>
                                START MISSION
                            </button>
                            <button className="relative border-2 border-light px-8 py-3 text-light font-primary text-md tracking-wider hover:bg-light hover:text-white transition-colors pixel-corners flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(138,109,252,0.3)_inset]">
                                <span className="material-symbols-outlined text-base">terminal</span>
                                VIEW DEMO
                            </button>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-white font-primary">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-yellow-400 text-base drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]">star</span>
                                <span>4.9/5 Pilot Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-400 text-base drop-shadow-[0_0_4px_rgba(74,222,128,0.6)]">group</span>
                                <span>10k+ Active Crew</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: 16-bit Cockpit */}
                    <div className="relative w-full lg:w-2/5 flex justify-center items-center z-10">
                        {/* Main Image Container */}
                        <div className="relative w-full aspect-square max-w-[500px] border-4 border-secondary bg-black pixel-corners overflow-hidden shadow-2xl shadow-light/30">
                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-90"
                                aria-label="16-bit pixel art illustration of a spaceship cockpit"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaPoO_q1Bvl8BJfN0ZLnF8UaiETDPrhA9pTB1GfsE2NqbO4IhFQjL-qGHvNMiA6yisRail1t-13D3Lnb-t2KAdPWz17PCOxnV2tlK794oZVdGa9JQ5YUbeprOWHBOIKV6QawOL5IAdeH3Yiak1rkxi9IkRz-pMEiaKRLPkSB64paOJeaPowGd5JwlCQ8Tubt8HGjGJeo2cQLbKFBAQq506N6oWPT1szo3t7_lbWwOxQ9dqCt17cZdYLRlCtROpsDZyBHb6MCFX8jgd')" }}
                            ></div>


                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <div className="size-24 border border-white/30 rounded-full flex items-center justify-center">
                                    <div className="size-1 bg-accent rounded-full drop-shadow-[0_0_4px_rgba(255,0,85,1)]"></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-white/50"></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-2 bg-white/50"></div>
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-0.5 bg-white/50"></div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-0.5 bg-white/50"></div>
                                </div>
                            </div>
                            <div className="absolute top-3 right-3 p-2 border border-light bg-black/80 font-press text-[10px] text-light z-20 pixel-corners shadow-[0_0_8px_rgba(138,109,252,0.4)]">
                                HUD: ACTIVE
                            </div>
                            <div className="absolute bottom-4 left-4 p-2 border border-accent bg-black/80 font-press text-[10px] text-accent z-20 pixel-corners flex items-center gap-2 shadow-[0_0_8px_rgba(255,0,85,0.5)]">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                FUEL LOW
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero