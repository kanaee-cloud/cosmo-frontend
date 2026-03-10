import React from 'react';
import Navbar from '../components/navbar';
import bgImagee from '../assets/dashboard/bg-image.jpg'

const Dashboard = () => {
    return (
        <div
            className="bg-[#0d0514] text-slate-100 font-tertiary selection:bg-accent/40 selection:text-white bg-fixed"
            style={{ backgroundImage: `url(${bgImagee})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50 w-full">
                <Navbar />
            </div>

            <main className="w-full relative z-10">
                {/* Hero Section */}
                <section className="px-6 py-12 lg:px-20 relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                    <div className="w-full max-w-[1200px] mx-auto relative z-10 bg-primary/20 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]">
                        <div className="p-6 lg:p-12 flex flex-col lg:flex-row gap-12 items-center justify-center relative z-20 w-full">
                            {/* Soft gradient overlay to keep text readable on left, letting image shine on right */}
                            <div className="absolute inset-0 pointer-events-none z-0"></div>

                            {/* Left Content */}
                            <div className="flex flex-col gap-8 max-w-2xl lg:w-3/5 z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 bg-accent/10 w-fit rounded-sm shadow-[0_0_10px_rgba(255,0,85,0.2)]">
                                    <span className="size-2 bg-accent rounded-full animate-ping shadow-[0_0_5px_rgba(255,0,85,0.8)]"></span>
                                    <span className="text-accent text-[9px] tracking-widest uppercase font-press">System Online</span>
                                </div>

                                <h1 className="text-white text-3xl lg:text-4xl font-press leading-[1.5] tracking-tight drop-shadow-[0_0_10px_rgba(138,109,252,0.8)]">
                                    Level Up Your Reality.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-light to-accent">Conquer the Cosmos.</span>
                                </h1>

                                <p className="text-white text-xl font-tertiary leading-loose max-w-xl border-l-4 border-light pl-4 bg-gradient-to-r from-light/10 to-transparent py-2">
                                    Gamify your tasks. Earn XP for productivity. Become the pilot of your own destiny in a universe built for high-performance.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <button className="relative bg-accent px-8 py-3 text-white font-press text-[9px] tracking-wider hover:scale-105 transition-transform shadow-[0_0_10px_rgba(255,0,85,0.5),0_0_20px_rgba(255,0,85,0.3)] pixel-corners flex items-center justify-center gap-2 group">
                                        <span className="material-symbols-outlined group-hover:animate-bounce text-base">stadia_controller</span>
                                        START MISSION
                                    </button>
                                    <button className="relative border-2 border-light px-8 py-3 text-light font-press text-[9px] tracking-wider hover:bg-light hover:text-white transition-colors pixel-corners flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(138,109,252,0.3)_inset]">
                                        <span className="material-symbols-outlined text-base">terminal</span>
                                        VIEW DEMO
                                    </button>
                                </div>

                                <div className="flex items-center gap-6 text-xl text-white font-tertiary">
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

                                    {/* Overlay Scanlines specific to image */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                                    {/* Central Reticle */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                        <div className="size-24 border border-white/30 rounded-full flex items-center justify-center">
                                            <div className="size-1 bg-accent rounded-full drop-shadow-[0_0_4px_rgba(255,0,85,1)]"></div>
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-white/50"></div>
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-2 bg-white/50"></div>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-0.5 bg-white/50"></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-0.5 bg-white/50"></div>
                                        </div>
                                    </div>

                                    {/* HUD ACTIVE - top right, overlaying the image */}
                                    <div className="absolute top-3 right-3 p-2 border border-light bg-black/80 font-press text-[10px] text-light z-20 pixel-corners shadow-[0_0_8px_rgba(138,109,252,0.4)]">
                                        HUD: ACTIVE
                                    </div>

                                    {/* FUEL LOW - bottom left, overlaying the image */}
                                    <div className="absolute bottom-4 left-4 p-2 border border-accent bg-black/80 font-press text-[10px] text-accent z-20 pixel-corners flex items-center gap-2 shadow-[0_0_8px_rgba(255,0,85,0.5)]">
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                        FUEL LOW
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Briefing (About) */}
                <section
                    className="relative px-6 py-16 lg:px-40"
                >
                    {/* Gradient overlay to keep text readable in center, blending at edges */}
                    <div className="absolute inset-0 pointer-events-none z-0"></div>
                    {/* Add gradient fade at bottom to merge smoothly with Armory */}
                    <div className="absolute inset-x-0 bottom-0 h-40 to-transparent pointer-events-none z-0"></div>

                    {/* Decorative Borders */}
                    <div className="absolute left-10 top-20 bottom-20 w-1 border-l-2 border-dashed border-[#1a0b2e] hidden lg:block z-0"></div>

                    <div className="relative z-10 bg-primary/20 backdrop-blur-sm border-2 border-secondary p-1 lg:p-2 pixel-corners max-w-4xl mx-auto shadow-[0_0_20px_rgba(138,109,252,0.1)]">
                        {/* HUD Header */}
                        <div className="flex justify-between items-center bg-light/10 px-4 py-3 mb-6 border-b border-light/50">
                            <span className="font-press text-[10px] text-light tracking-widest">&gt;&gt; MISSION BRIEFING</span>
                            <div className="flex gap-2">
                                <div className="size-2 bg-light animate-pulse"></div>
                                <div className="size-2 bg-light/50"></div>
                                <div className="size-2 bg-light/20"></div>
                            </div>
                        </div>

                        <div className="px-4 pb-8 lg:px-12 text-center flex flex-col items-center gap-6">
                            <h2 className="text-white text-3xl lg:text-4xl font-press uppercase tracking-wider">
                                Turn Todo Lists into <span className="text-accent drop-shadow-[0_0_8px_rgba(255,0,85,0.6)]">Space Quests</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                            <p className="text-white text-lg leading-relaxed max-w-2xl font-tertiary">
                                Engage with your daily tasks like never before. Complete objectives, earn loot, and upgrade your life stats in a retro-futuristic interface designed for high-performance pilots. The universe is waiting for your command.
                            </p>

                            {/* Loot Icons Decoration */}
                            <div className="flex gap-10 mt-6 justify-center">
                                <div className="flex flex-col items-center gap-3 group">
                                    <span className="material-symbols-outlined text-yellow-400 text-4xl group-hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">monetization_on</span>
                                    <span className="text-[10px] font-press text-yellow-400">XP COIN</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 group">
                                    <span className="material-symbols-outlined text-purple-400 text-4xl group-hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">diamond</span>
                                    <span className="text-[10px] font-press text-purple-400">GEM</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 group">
                                    <span className="material-symbols-outlined text-light text-4xl group-hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(138,109,252,0.5)]">bolt</span>
                                    <span className="text-[10px] font-press text-light">ENERGY</span>
                                </div>
                            </div>
                        </div>

                        {/* HUD Footer */}
                        <div className="flex justify-between items-center px-4 py-2 border-t border-light/30 mt-4 text-[10px] font-tertiary text-light">
                            <span>DATA_PACKET_ID: 99402X</span>
                            <span>ENCRYPTION: NONE</span>
                        </div>
                    </div>
                </section>

                {/* The Armory (Features) */}
                <section className="px-6 py-20 lg:px-20 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto relative z-10 bg-primary/20 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]">
                        {/* Radial glow over the glassmorphism */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138,109,252,0.1) 0%, transparent 70%)' }}></div>
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-light/10 pointer-events-none z-10"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-light/10 pointer-events-none z-10"></div>

                        <div className="p-8 lg:p-12 relative z-20">
                            <div className="flex items-center gap-4 mb-12">
                                <span className="material-symbols-outlined text-accent text-3xl drop-shadow-[0_0_8px_rgba(255,0,85,0.6)]">shield</span>
                                <h2 className="text-white text-2xl lg:text-3xl font-bold font-press tracking-wide text-shadow-neon">THE ARMORY</h2>
                                <div className="h-[2px] bg-gradient-to-r from-light/30 to-transparent flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Card 1 */}
                                <div className="group relative bg-tertiary p-6 border-2 border-light/15 hover:border-accent hover:bg-secondary/50 transition-all duration-300 pixel-corners flex flex-col gap-4 hover:shadow-[0_0_15px_rgba(255,0,85,0.3)] h-full">
                                    <div className="absolute -top-3 -right-3 bg-secondary border-2 border-light/15 group-hover:border-accent p-1.5 z-10 transition-colors">
                                        <span className="material-symbols-outlined text-light group-hover:text-accent transition-colors">assignment</span>
                                    </div>
                                    <div className="size-12 bg-light/5 flex items-center justify-center mb-2 group-hover:bg-accent/10 rounded-sm transition-colors border border-light/10 group-hover:border-accent/30">
                                        <span className="material-symbols-outlined text-3xl text-light group-hover:text-accent transition-colors">list_alt</span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold font-secondary tracking-widest group-hover:text-accent transition-colors">QUEST LOG</h3>
                                    <p className="text-white text-sm leading-relaxed font-tertiary">
                                        Manage daily operations with a tactical list interface. Categorize missions by difficulty and priority.
                                    </p>
                                    <div className="mt-auto pt-4">
                                        <div className="w-full bg-secondary h-2 rounded-none overflow-hidden border border-light/10">
                                            <div className="bg-accent h-full w-3/4 animate-pulse shadow-[0_0_8px_rgba(255,0,85,0.8)]"></div>
                                        </div>
                                        <span className="text-[10px] text-light font-press mt-2 block text-right tracking-widest">SYNC: 75%</span>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="group relative bg-tertiary p-6 border-2 border-light/15 hover:border-light hover:bg-secondary/50 transition-all duration-300 pixel-corners flex flex-col gap-4 hover:shadow-[0_0_15px_rgba(138,109,252,0.3)] h-full">
                                    <div className="absolute -top-3 -right-3 bg-secondary border-2 border-light/15 group-hover:border-light p-1.5 z-10 transition-colors">
                                        <span className="material-symbols-outlined text-light transition-colors">analytics</span>
                                    </div>
                                    <div className="size-12 bg-light/5 flex items-center justify-center mb-2 group-hover:bg-light/10 rounded-sm transition-colors border border-light/10 group-hover:border-light/30">
                                        <span className="material-symbols-outlined text-3xl text-light transition-colors">monitoring</span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold font-secondary tracking-widest group-hover:text-light transition-colors">PILOT STATS</h3>
                                    <p className="text-white text-sm leading-relaxed font-tertiary">
                                        Track your productivity metrics. Visualize INT (Intellect) and FOC (Focus) growth over time.
                                    </p>
                                    <div className="mt-auto pt-4 space-y-3">
                                        <div>
                                            <div className="flex justify-between text-[10px] font-press text-light mb-1">
                                                <span>INT</span>
                                                <span>LVL 4</span>
                                            </div>
                                            <div className="w-full bg-secondary h-2 rounded-none overflow-hidden border border-light/10">
                                                <div className="bg-light h-full w-1/2 shadow-[0_0_8px_rgba(138,109,252,0.8)]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-[10px] font-press text-yellow-400 mb-1">
                                                <span>FOC</span>
                                                <span>LVL 7</span>
                                            </div>
                                            <div className="w-full bg-secondary h-2 rounded-none overflow-hidden border border-light/10">
                                                <div className="bg-yellow-400 h-full w-4/5 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="group relative bg-tertiary p-6 border-2 border-light/15 hover:border-yellow-400 hover:bg-secondary/50 transition-all duration-300 pixel-corners flex flex-col gap-4 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] h-full">
                                    <div className="absolute -top-3 -right-3 bg-secondary border-2 border-light/15 group-hover:border-yellow-400 p-1.5 z-10 transition-colors">
                                        <span className="material-symbols-outlined text-light group-hover:text-yellow-400 transition-colors">psychology</span>
                                    </div>
                                    <div className="size-12 bg-light/5 flex items-center justify-center mb-2 group-hover:bg-yellow-400/10 rounded-sm transition-colors border border-light/10 group-hover:border-yellow-400/30">
                                        <span className="material-symbols-outlined text-3xl text-light group-hover:text-yellow-400 transition-colors">smart_toy</span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold font-secondary tracking-widest group-hover:text-yellow-400 transition-colors">NEURAL LINK</h3>
                                    <p className="text-white text-sm leading-relaxed font-tertiary">
                                        Advanced AI companion to optimize your schedule. The brain of your operation.
                                    </p>
                                    <div className="mt-auto pt-4 flex justify-center">
                                        <div className="relative size-14 flex items-center justify-center border-2 border-light/15 rounded-full group-hover:border-yellow-400/50 transition-colors">
                                            <div className="absolute inset-[-2px] border-t-2 border-transparent group-hover:border-t-yellow-400 rounded-full animate-spin"></div>
                                            <span className="material-symbols-outlined text-white text-2xl group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all">memory</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Banner */}
                <section className="py-20 px-6 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto relative z-10 bg-primary/30 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]">
                        {/* Radial glow over the glassmorphism */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138,109,252,0.15) 0%, transparent 80%)' }}></div>
                        {/* Decorative grid lines */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(138,109,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(138,109,252,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                        <div className="px-8 py-16 lg:px-12 text-center flex flex-col items-center gap-10 relative z-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-press leading-[1.4] tracking-wide drop-shadow-[0_0_20px_rgba(138,109,252,0.5)]">
                                SYSTEM READY.<br />AWAITING INPUT.
                            </h2>
                            <p className="text-light/70 font-tertiary text-lg max-w-md">
                                Your dashboard is configured. Begin your first mission and start earning XP.
                            </p>
                            <button className="relative group overflow-hidden bg-accent px-10 py-5 font-press text-[10px] text-white shadow-[0_0_20px_rgba(255,0,85,0.5)] hover:shadow-[0_0_30px_rgba(255,0,85,0.8)] hover:bg-white hover:text-accent transition-all duration-300 pixel-corners w-full max-w-xs outline-none focus:ring-4 focus:ring-accent/30 active:scale-95">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                    INITIATE LAUNCH
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Command Console Footer */}
            <footer className="relative overflow-hidden border-t-2 border-secondary pt-12 pb-8 px-6 font-tertiary text-sm" style={{ background: 'linear-gradient(180deg, #0d0514 0%, #0a0312 50%, #07020d 100%)' }}>
                {/* CRT Scanlines for footer specifically */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20 pointer-events-none"></div>
                {/* Subtle glow at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-light/40 to-transparent"></div>

                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-20">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6 text-accent">
                            <span className="material-symbols-outlined text-2xl drop-shadow-[0_0_5px_rgba(255,0,85,0.5)]">terminal</span>
                            <h3 className="text-lg font-bold font-press tracking-widest text-shadow-neon mt-1">Console</h3>
                        </div>
                        <div className="bg-[#050210] border-2 border-light/20 p-4 font-tertiary text-xs h-32 overflow-hidden flex flex-col justify-end pixel-corners shadow-[0_0_15px_rgba(0,0,0,0.8)_inset,0_0_4px_rgba(138,109,252,0.15)]">
                            <p className="text-white mb-1">&gt; Loading assets...</p>
                            <p className="text-white mb-1">&gt; Establishing secure link...</p>
                            <p className="text-light mb-1 drop-shadow-[0_0_2px_rgba(138,109,252,0.8)]">[ SYSTEM: ONLINE ]</p>
                            <p className="text-green-500 drop-shadow-[0_0_2px_rgba(34,197,94,0.8)] flex items-center gap-1">
                                [ CONNECTED: 127.0.0.1 ] <span className="animate-pulse w-2 h-4 bg-green-500 inline-block"></span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold mb-3 uppercase border-b-[3px] border-light/50 pb-2 font-press text-[10px] tracking-widest w-fit">Navigation</h4>
                        <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#mission">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> Mission Control
                        </a>
                        <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#armory">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> The Armory
                        </a>
                        <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#logs">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> Flight Logs
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold mb-3 uppercase border-b-[3px] border-light/50 pb-2 font-press text-[10px] tracking-widest w-fit">Protocols</h4>
                        <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#privacy">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Privacy Policy
                        </a>
                        <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#terms">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Terms of Service
                        </a>
                        <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-secondary" href="#contact">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Contact Command
                        </a>
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-secondary text-center relative z-20">
                    <span className="text-white/60 text-[10px] font-press tracking-widest">© 2026 COSMO. ALL RIGHTS RESERVED.</span>
                    <span className="text-accent/40 text-[10px] font-press tracking-widest ml-2 drop-shadow-[0_0_4px_rgba(255,0,85,0.3)]">TRANSMISSION END.</span>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
