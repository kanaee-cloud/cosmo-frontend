import React from 'react'

const Footer = () => {
    return (
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
                    <div className="bg-secondary border-2 border-light/20 p-4 font-secondary text-xs h-32 overflow-hidden flex flex-col justify-end pixel-corners shadow-[0_0_15px_rgba(0,0,0,0.8)_inset,0_0_4px_rgba(138,109,252,0.15)]">
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
                    <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#mission">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> Mission Control
                    </a>
                    <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#armory">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> The Armory
                    </a>
                    <a className="text-white hover:text-light transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#logs">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-light">&gt;</span> Flight Logs
                    </a>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-white font-bold mb-3 uppercase border-b-[3px] border-light/50 pb-2 font-press text-[10px] tracking-widest w-fit">Protocols</h4>
                    <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#privacy">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Privacy Policy
                    </a>
                    <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#terms">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Terms of Service
                    </a>
                    <a className="text-white hover:text-accent transition-colors flex items-center gap-2 group text-xs tracking-wider font-primary" href="#contact">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">&gt;</span> Contact Command
                    </a>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-secondary text-center relative z-20">
                <span className="text-white/60 text-[10px] font-press tracking-widest">© 2026 COSMO. ALL RIGHTS RESERVED.</span>
                <span className="text-accent/40 text-[10px] font-press tracking-widest ml-2 drop-shadow-[0_0_4px_rgba(255,0,85,0.3)]">TRANSMISSION END.</span>
            </div>
        </footer>

    )
}

export default Footer