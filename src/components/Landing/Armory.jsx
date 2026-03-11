import ArmoryCard from "../ui/ArmoryCard";
import { motion } from 'framer-motion';

const armoryData = [
    {
        id: 1,
        title: "QUEST LOG",
        description: "Manage daily operations with a tactical list interface. Categorize missions by difficulty and priority.",
        topIcon: "assignment",
        mainIcon: "list_alt",
        styles: {
            wrapperHover: "hover:border-accent hover:shadow-[0_0_15px_rgba(255,0,85,0.3)]",
            topIconBorderHover: "group-hover:border-accent",
            topIconTextHover: "group-hover:text-accent",
            mainIconWrapperHover: "group-hover:bg-accent/10 group-hover:border-accent/30",
            mainIconTextHover: "group-hover:text-accent",
            titleTextHover: "group-hover:text-accent"
        },
        bottomContent: (
            <div className="mt-auto pt-4">
                <div className="w-full bg-secondary h-2 rounded-none overflow-hidden border border-light/10">
                    <div className="bg-accent h-full w-3/4 animate-pulse shadow-[0_0_8px_rgba(255,0,85,0.8)]"></div>
                </div>
                <span className="text-[10px] text-light font-press mt-2 block text-right tracking-widest">SYNC: 75%</span>
            </div>
        )
    },
    {
        id: 2,
        title: "PILOT STATS",
        description: "Track your productivity metrics. Visualize INT (Intellect) and FOC (Focus) growth over time.",
        topIcon: "analytics",
        mainIcon: "monitoring",
        styles: {
            wrapperHover: "hover:border-light hover:shadow-[0_0_15px_rgba(138,109,252,0.3)]",
            topIconBorderHover: "group-hover:border-light",
            topIconTextHover: "", // Asli dari kodemu: Card 2 tidak menggunakan hover text di icon ini
            mainIconWrapperHover: "group-hover:bg-light/10 group-hover:border-light/30",
            mainIconTextHover: "", // Asli dari kodemu: Card 2 tidak menggunakan hover text di icon ini
            titleTextHover: "group-hover:text-light"
        },
        bottomContent: (
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
        )
    },
    {
        id: 3,
        title: "NEURAL LINK",
        description: "Advanced AI companion to optimize your schedule. The brain of your operation.",
        topIcon: "psychology",
        mainIcon: "smart_toy",
        styles: {
            wrapperHover: "hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]",
            topIconBorderHover: "group-hover:border-yellow-400",
            topIconTextHover: "group-hover:text-yellow-400",
            mainIconWrapperHover: "group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30",
            mainIconTextHover: "group-hover:text-yellow-400",
            titleTextHover: "group-hover:text-yellow-400"
        },
        bottomContent: (
            <div className="mt-auto pt-4 flex justify-center">
                <div className="relative size-14 flex items-center justify-center border-2 border-light/15 rounded-full group-hover:border-yellow-400/50 transition-colors">
                    <div className="absolute inset-[-2px] border-t-2 border-transparent group-hover:border-t-yellow-400 rounded-full animate-spin"></div>
                    <span className="material-symbols-outlined text-white text-2xl group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all">memory</span>
                </div>
            </div>
        )
    }
];


const Armory = () => {
    return (
        <section className="px-6 py-20 lg:px-20 relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-[1200px] mx-auto relative z-10 bg-primary/20 backdrop-blur-sm border-2 border-secondary pixel-corners shadow-[0_0_20px_rgba(138,109,252,0.1)]"
            >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138,109,252,0.1) 0%, transparent 70%)' }}></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-light/10 pointer-events-none z-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-light/10 pointer-events-none z-10"></div>

                <div className="p-8 lg:p-12 relative z-20">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <span className="material-symbols-outlined text-accent text-3xl drop-shadow-[0_0_8px_rgba(255,0,85,0.6)]">shield</span>
                        <h2 className="text-white text-2xl lg:text-3xl font-bold font-press tracking-wide text-shadow-neon">THE ARMORY</h2>
                        <div className="h-[2px] bg-gradient-to-r from-light/30 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {armoryData.map((card) => (
                            <ArmoryCard 
                                key={card.id}
                                title={card.title}
                                description={card.description}
                                topIcon={card.topIcon}
                                mainIcon={card.mainIcon}
                                styles={card.styles}
                            >
                                {card.bottomContent}
                            </ArmoryCard>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Armory;