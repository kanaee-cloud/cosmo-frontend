import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';

const sectors = [
  {
    id: 'nexus',
    name: 'SECTOR NEXUS',
    desc1: 'SYSTEM SYNC: OPTIMAL',
    desc2: 'POPULATION: STABLE',
    desc3: 'GRID: CONNECTED',
    planetStyle: 'bg-gradient-to-br from-[#b07bfa] via-[#612ea8] to-[#1d0b38] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.7),_0_0_30px_rgba(122,64,242,0.4)]'
  },
  {
    id: 'zenith',
    name: 'SECTOR ZENITH',
    desc1: 'SOLAR FLUX ZONE',
    desc2: 'LIGHT LEVEL: MAX',
    planetStyle: 'bg-gradient-to-br from-[#e0eaf5] via-[#a3b8cc] to-[#597491] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.4),_0_0_25px_rgba(163,184,204,0.6)]'
  }
];

export default function ColorPresets() {
  const { activeTheme, setTheme } = useThemeStore();
  const [selected, setSelected] = useState(activeTheme);

  const handleLockCoordinates = () => {
    setTheme(selected);
    // Intentionally do not navigate from inside profile presets
  };

  return (
    <div className="p-6 md:p-8 border border-[#7a5299] bg-[#07030e] relative shadow-[0_0_20px_rgba(122,82,153,0.1)]">

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]" />

      <h3 className="font-secondary text-[#00f0ff] text-sm md:text-base tracking-widest uppercase mb-6 border-b border-[#3b2b5a] pb-3 flex items-center gap-3">
        <Palette size={18} /> THEME CONFIGURATION
      </h3>

      {/* Embedded Theme selection UI (copied from /pages/Theme) */}
      <div className="w-full">
        <div className="text-center mb-8 z-10">
          <h4 className="text-lg md:text-2xl font-press text-text mb-2 uppercase tracking-widest">
            CHOOSE YOUR HOME SECTOR
          </h4>
          <div className="w-full h-[2px] bg-light mb-3 shadow-[0_0_8px_rgba(138,109,252,0.8)]" />
          <p className="text-light text-sm tracking-widest uppercase">HUD v.4.02 - SYSTEM STANDBY</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end z-10 mb-6">
          {sectors.map((sector) => {
            const isSelected = selected === sector.id;
            return (
              <motion.div
                key={sector.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(sector.id)}
                className={`relative cursor-pointer w-56 p-4 flex flex-col items-center transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-dashed border-accent scale-105 shadow-[0_0_20px_rgba(255,0,85,0.15)] bg-secondary/80'
                    : 'border border-light/30 scale-100 hover:border-light/60 bg-secondary/20'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 text-accent text-xs animate-pulse font-press">TARGETED</span>
                )}

                <span className="absolute top-3 left-3 text-light/50 text-sm">00{sectors.indexOf(sector) + 1}</span>

                <div className={`w-24 h-24 rounded-full mb-4 mt-4 ${sector.planetStyle} ${isSelected ? 'ring-4 ring-accent ring-offset-2 ring-offset-primary' : ''}`} />

                <h5 className={`text-lg font-bold mb-2 uppercase ${isSelected ? 'text-accent' : 'text-light/80'}`}>
                  {sector.name}
                </h5>

                <div className="text-center text-light/70 text-sm tracking-wider flex flex-col gap-1 min-h-[48px]">
                  <p>{sector.desc1}</p>
                  <p>{sector.desc2}</p>
                  {sector.desc3 && <p>{sector.desc3}</p>}
                </div>

                {isSelected && (
                  <div className="mt-3 bg-accent text-white px-3 py-1 text-xs font-press">TARGET ACQUIRED</div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLockCoordinates}
            className="z-10 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-press py-2 px-4 text-xs tracking-[0.1em] transition-all duration-300 shadow-[0_0_10px_rgba(255,0,85,0.2)] active:scale-95"
          >
            LOCK COORDINATES
          </button>
        </div>
      </div>

    </div>
  );
}