import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';

const sectors = [
  {
    id: 'nexus',
    name: 'SECTOR NEXUS',
    desc1: 'DEFAULT MATRIX',
    desc2: 'NEON PINK ACCENT',
    desc3: 'SYSTEM SYNC: OPTIMAL',
    planetStyle: 'bg-gradient-to-br from-[#8A6DFC] via-[#1A0B2E] to-[#0D0514] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.7),_0_0_30px_rgba(138,109,252,0.4)]'
  },
  {
    id: 'abyss',
    name: 'SECTOR ABYSS',
    desc1: 'DEEP BLUE OCEAN',
    desc2: 'NEON CYAN GLOW',
    desc3: 'TEMPERATURE: FREEZING',
    planetStyle: 'bg-gradient-to-br from-[#00E5FF] via-[#0D1E24] to-[#040D12] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.7),_0_0_30px_rgba(0,229,255,0.4)]'
  },
  {
    id: 'mars',
    name: 'SECTOR MARS',
    desc1: 'CRIMSON WASTELAND',
    desc2: 'AMBER LINES',
    desc3: 'WARNING: HEAT HAZARD',
    planetStyle: 'bg-gradient-to-br from-[#FFB000] via-[#D90429] to-[#111111] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.7),_0_0_30px_rgba(217,4,41,0.4)]'
  }
];

export default function ColorPresets() {
  const { activeTheme, setTheme } = useThemeStore();
  const [selected, setSelected] = useState(activeTheme);

  const handleLockCoordinates = () => {
    setTheme(selected);
  };

  return (
    <div className="p-6 md:p-8 border border-tertiary bg-secondary relative transition-colors duration-500 shadow-[0_0_20px_rgb(var(--color-tertiary)_/_0.3)]">

      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-light transition-colors duration-500" />

      <h3 className="font-secondary text-light text-sm md:text-base tracking-widest uppercase mb-6 border-b border-tertiary pb-3 flex items-center gap-3 transition-colors duration-500">
        <Palette size={18} /> THEME CONFIGURATION
      </h3>

      <div className="w-full">
        <div className="text-center mb-8 z-10">
          <h4 className="text-lg md:text-xl font-press text-text mb-4 uppercase tracking-widest transition-colors duration-500">
            CHOOSE YOUR HOME SECTOR
          </h4>
          <div className="w-full h-[1px] bg-light/50 mb-3 transition-colors duration-500" />
          <p className="text-light/70 text-[10px] md:text-xs tracking-widest uppercase transition-colors duration-500">HUD v.4.02 - SYSTEM STANDBY</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-end z-10 mb-10">
          {sectors.map((sector) => {
            const isSelected = selected === sector.id;
            return (
              <motion.div
                key={sector.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(sector.id)}
                className={`relative cursor-pointer w-full lg:w-56 p-4 flex flex-col items-center transition-all duration-500 ${
                  isSelected
                    ? 'border-2 border-dashed border-accent scale-105 bg-primary'
                    : 'border border-tertiary scale-100 hover:border-light bg-primary/50'
                }`}
                style={{
                  boxShadow: isSelected ? '0 0 20px rgb(var(--color-accent) / 0.15)' : 'none'
                }}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 text-accent text-[8px] animate-pulse font-press transition-colors duration-500">TARGETED</span>
                )}

                <span className="absolute top-3 left-3 text-light/50 text-[10px] font-secondary transition-colors duration-500">00{sectors.indexOf(sector) + 1}</span>

                <div className={`w-24 h-24 rounded-full mb-4 mt-6 ${sector.planetStyle} ${isSelected ? 'ring-4 ring-offset-4' : ''} transition-all duration-500`} 
                     style={{ 
                       '--tw-ring-color': 'rgb(var(--color-accent))', 
                       '--tw-ring-offset-color': 'rgb(var(--color-secondary))' 
                     }} 
                />

                <h5 className={`text-sm md:text-base font-press mb-4 text-center leading-relaxed transition-colors duration-500 ${isSelected ? 'text-accent' : 'text-text'}`}>
                  {sector.name}
                </h5>

                <div className="text-center text-light/70 text-[9px] md:text-[10px] font-secondary tracking-widest flex flex-col gap-2 min-h-[50px] transition-colors duration-500">
                  <p>{sector.desc1}</p>
                  <p>{sector.desc2}</p>
                  {sector.desc3 && <p>{sector.desc3}</p>}
                </div>

                {isSelected && (
                  <div className="mt-4 bg-accent text-primary px-3 py-2 text-[8px] font-press w-full text-center transition-colors duration-500">TARGET ACQUIRED</div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLockCoordinates}
            className="z-10 bg-accent/10 border-2 border-accent text-accent hover:bg-accent hover:text-primary font-press py-4 px-8 text-xs md:text-sm tracking-[0.1em] transition-all duration-500 active:scale-95"
            style={{ boxShadow: '0 0 15px rgb(var(--color-accent) / 0.3)' }}
          >
            LOCK COORDINATES
          </button>
        </div>
      </div>

    </div>
  );
}