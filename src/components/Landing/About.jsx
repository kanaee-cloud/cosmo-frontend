import { motion } from 'framer-motion'

const About = () => {
    return (
        <section
            className="relative px-6 py-16 lg:px-40"
        >
            {/* Gradient overlay to keep text readable in center, blending at edges */}
            <div className="absolute inset-0 pointer-events-none z-0"></div>
            {/* Add gradient fade at bottom to merge smoothly with Armory */}
            <div className="absolute inset-x-0 bottom-0 h-40 to-transparent pointer-events-none z-0"></div>

            {/* Decorative Borders */}
            <div className="absolute left-10 top-20 bottom-20 w-1 border-l-2 border-dashed border-secondary hidden lg:block z-0"></div>

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 bg-tertiary/90 backdrop-blur-sm border-2 border-secondary p-1 lg:p-2 pixel-corners max-w-4xl mx-auto shadow-[0_0_20px_rgba(138,109,252,0.1)]"
            >
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
                    <h2 className="text-text text-3xl lg:text-4xl font-semibold font-primary uppercase tracking-wider">
                        Turn Todo Lists into <span className="text-accent drop-shadow-[0_0_8px_rgba(255,0,85,0.6)]">Space Quests</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                    <p className="text-text text-lg leading-relaxed max-w-2xl font-primary">
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
            </motion.div>
        </section>
    )
}

export default About