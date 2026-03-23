import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const CyberButton = ({ 
  to, 
  text = "DASHBOARD", 
  subText = "RETURN TO", 
  icon: Icon = ArrowLeft,
  onClick,
  className = ""
}) => {
  const Content = (
    <motion.div 
      className={`relative p-4 bg-secondary border border-accent/30 flex items-center justify-center gap-3 overflow-hidden group hover:border-accent hover:shadow-[0_0_20px_rgba(var(--color-accent),0.4)] transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
       {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      
      {/* Tech Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex items-center justify-center gap-3 w-full">
        <div className="flex-shrink-0 bg-accent/10 p-1.5 rounded-sm border border-accent/30 group-hover:bg-accent group-hover:text-secondary transition-colors duration-300">
          <Icon size={16} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <div className="flex flex-col text-left">
           {subText && (
             <span className="text-[10px] font-secondary text-accent/70 uppercase tracking-widest leading-none mb-1 group-hover:text-accent">
               {subText}
             </span>
           )}
           <span className="font-primary font-bold text-sm tracking-[0.2em] text-white group-hover:text-accent transition-colors drop-shadow-[0_0_8px_rgba(var(--color-accent),0.5)]">
             {text}
           </span>
        </div>
      </div>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-accent),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-accent),0.1)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="block group relative overflow-hidden no-underline w-full">
        {Content}
      </Link>
    );
  }

  return (
    <div className="block group relative overflow-hidden w-full cursor-pointer">
      {Content}
    </div>
  );
};

export default CyberButton;