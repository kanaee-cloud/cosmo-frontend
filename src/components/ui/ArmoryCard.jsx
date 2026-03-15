import React from 'react';
import { motion } from 'framer-motion';

const ArmoryCard = ({ title, description, topIcon, mainIcon, styles, children }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group relative bg-tertiary p-6 border-2 border-light/15 hover:bg-secondary/50 transition-all duration-300 pixel-corners flex flex-col gap-4 h-full ${styles.wrapperHover}`}
        >
            {/* Top Right Icon */}
            <div className={`absolute -top-3 -right-3 bg-secondary border-2 border-light/15 p-1.5 z-10 transition-colors ${styles.topIconBorderHover}`}>
                <span className={`material-symbols-outlined text-light transition-colors ${styles.topIconTextHover}`}>
                    {topIcon}
                </span>
            </div>
            
            {/* Main Icon */}
            <div className={`size-12 bg-light/5 flex items-center justify-center mb-2 rounded-sm transition-colors border border-light/10 ${styles.mainIconWrapperHover}`}>
                <span className={`material-symbols-outlined text-3xl text-light transition-colors ${styles.mainIconTextHover}`}>
                    {mainIcon}
                </span>
            </div>
            
            {/* Text Content */}
            <h3 className={`text-text text-xl font-bold font-primary tracking-widest transition-colors ${styles.titleTextHover}`}>
                {title}
            </h3>
            <p className="text-text text-sm leading-relaxed font-primary">
                {description}
            </p>
            
            {/* Dynamic Bottom Content (Progress bars, Spinners, etc) */}
            {children}
        </motion.div>
    );
};

export default ArmoryCard;

