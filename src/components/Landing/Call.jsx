import { motion } from 'framer-motion'

const Call = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-[1200px] mx-auto relative z-10 bg-primary/30 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]"
            >
                {/* Radial glow over the glassmorphism */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138,109,252,0.15) 0%, transparent 80%)' }}></div>
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(138,109,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(138,109,252,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                <div className="px-8 py-16 lg:px-12 text-center flex flex-col items-center gap-10 relative z-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-press leading-[1.4] tracking-wide drop-shadow-[0_0_20px_rgba(138,109,252,0.5)]">
                        SYSTEM READY.<br />AWAITING INPUT.
                    </h2>
                    <p className="text-light/70 font-primary text-lg max-w-md">
                        Your dashboard is configured. Begin your first mission and start earning XP.
                    </p>
                    <button className="relative group overflow-hidden bg-accent px-10 py-5 font-press text-[10px] text-white shadow-[0_0_20px_rgba(255,0,85,0.5)] hover:shadow-[0_0_30px_rgba(255,0,85,0.8)] hover:bg-white hover:text-accent transition-all duration-300 pixel-corners w-full max-w-xs outline-none focus:ring-4 focus:ring-accent/30 active:scale-95">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            INITIATE LAUNCH_
                        </span>
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

export default Call