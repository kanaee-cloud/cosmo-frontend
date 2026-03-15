import React from 'react';
import { motion } from 'framer-motion';

export const RadarPanel = ({ directives, directivesLoading, activeDirective, setActiveDirective }) => {
  return (
    <div className="xl:col-span-7 border border-light/50 bg-primary relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[600px] shadow-[inset_0_0_100px_rgba(61,34,120,0.1)]">
      
      {/* Label Sector */}
      <div className="absolute bottom-4 left-4 font-primary text-cyan-500 text-[8px] tracking-widest z-20 opacity-70">
        SECTOR: QUADRANT-7 // SCANNING...
      </div>

      {/* Garis Crosshair Radar */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-[1px] bg-cyan-500 absolute"></div>
        <div className="h-full w-[1px] bg-cyan-500 absolute"></div>
      </div>

      {/* LINGKARAN RADAR */}
      <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full border border-cyan-900/40 flex items-center justify-center">
        <div className="w-[66%] h-[66%] rounded-full border border-cyan-900/60 flex items-center justify-center">
          <div className="w-[33%] h-[33%] rounded-full border border-cyan-900/80 bg-cyan-900/10 shadow-[0_0_50px_rgba(6,182,212,0.1)]"></div>
        </div>

        {/* Jarum Radar Berputar (Framer Motion) */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[50%] h-[2px] origin-left z-10"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.8) 100%)' }}
        >
          {/* Ekor Cahaya Hijau/Cyan (Sweeper) */}
          <div className="absolute right-0 top-0 w-32 h-[200px] bg-gradient-to-t from-cyan-400/20 to-transparent origin-bottom-right -translate-y-full transform -skew-x-[45deg] blur-md pointer-events-none"></div>
        </motion.div>

        {/* RENDER BLIP (MISI) PADA RADAR */}
        {directivesLoading ? (
          <span className="absolute font-primary text-[10px] text-cyan-500 animate-pulse tracking-widest z-20">CALIBRATING SIGNAL...</span>
        ) : directives?.map((task, index) => {
          
          // Matematika Penyebaran Target pada Radar
          const angle = (index * 137.5) * (Math.PI / 180); 
          const radius = 35 + (index * 25 % 45); 
          
          const topPos = 50 + Math.sin(angle) * radius;
          const leftPos = 50 + Math.cos(angle) * radius;

          // Tentukan Warna Berdasarkan Prioritas
          let blipColor = "bg-cyan-400 shadow-[0_0_10px_#22d3ee]";
          if (task.priority === 'ELEVATED') blipColor = "bg-yellow-500 shadow-[0_0_10px_#eab308]";
          if (task.priority === 'CRITICAL') blipColor = "bg-red-500 shadow-[0_0_10px_#ef4444]";
          
          const isSelected = activeDirective?.id === task.id;

          return (
            <div 
              key={task.id}
              className="absolute z-30 cursor-pointer group flex items-center justify-center w-6 h-6 -ml-3 -mt-3"
              style={{ top: `${topPos}%`, left: `${leftPos}%` }}
              onClick={() => setActiveDirective(task)}
            >
              {/* Bentuk Segitiga Blip */}
              <div className={`w-2.5 h-2.5 ${blipColor} transition-transform duration-300 group-hover:scale-150 ${isSelected ? 'scale-150' : ''}`} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              
              {/* Kotak Pengunci Target (Muncul jika dipilih) */}
              {isSelected && (
                <motion.div initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 border border-yellow-500/80 rounded-sm pointer-events-none flex justify-between items-between">
                  <div className="w-1.5 h-1.5 border-t border-l border-yellow-500 absolute top-0 left-0" />
                  <div className="w-1.5 h-1.5 border-t border-r border-yellow-500 absolute top-0 right-0" />
                  <div className="w-1.5 h-1.5 border-b border-l border-yellow-500 absolute bottom-0 left-0" />
                  <div className="w-1.5 h-1.5 border-b border-r border-yellow-500 absolute bottom-0 right-0" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};