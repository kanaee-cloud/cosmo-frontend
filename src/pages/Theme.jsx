// src/pages/Theme.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

const sectors = [
  {
    id: 'null',
    name: 'SECTOR NULL',
    desc1: 'DARK MATTER ZONE',
    desc2: 'VOID INTENSITY: 98%',
    // CSS untuk membuat planet gelap dengan inner shadow
    planetStyle: 'bg-gradient-to-br from-[#4a4a4a] to-[#0a0a0a] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),_0_0_20px_rgba(255,255,255,0.05)]'
  },
  {
    id: 'nexus',
    name: 'SECTOR NEXUS',
    desc1: 'SYSTEM SYNC: OPTIMAL',
    desc2: 'POPULATION: STABLE',
    desc3: 'GRID: CONNECTED',
    // Planet ungu ala synthwave
    planetStyle: 'bg-gradient-to-br from-[#b07bfa] via-[#612ea8] to-[#1d0b38] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.7),_0_0_30px_rgba(122,64,242,0.4)]'
  },
  {
    id: 'zenith',
    name: 'SECTOR ZENITH',
    desc1: 'SOLAR FLUX ZONE',
    desc2: 'LIGHT LEVEL: MAX',
    // Planet cerah kebiruan
    planetStyle: 'bg-gradient-to-br from-[#e0eaf5] via-[#a3b8cc] to-[#597491] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.4),_0_0_25px_rgba(163,184,204,0.6)]'
  }
];

const Theme = () => {
  const navigate = useNavigate();
  const { activeTheme, setTheme } = useThemeStore();
  const [selected, setSelected] = useState(activeTheme);

  const handleLockCoordinates = () => {
    setTheme(selected);
    navigate(-1); // Kembali ke halaman sebelumnya setelah memilih
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden font-tertiary">
      {/* Background scanline effect (opsional) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <h1 className="text-3xl md:text-5xl font-press text-white mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          CHOOSE YOUR HOME SECTOR
        </h1>
        <div className="w-full h-[2px] bg-light mb-4 shadow-[0_0_8px_rgba(138,109,252,0.8)]" />
        <p className="text-light text-xl tracking-widest uppercase">HUD v.4.02 - SYSTEM STANDBY</p>
      </div>

      {/* Sector Cards */}
      <div className="flex flex-col md:flex-row gap-8 items-end z-10 mb-20">
        {sectors.map((sector) => {
          const isSelected = selected === sector.id;
          return (
            <motion.div
              key={sector.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelected(sector.id)}
              className={`relative cursor-pointer w-72 p-6 flex flex-col items-center transition-all duration-300 ${
                isSelected 
                  ? 'border-2 border-dashed border-accent scale-110 shadow-[0_0_30px_rgba(255,0,85,0.2)] bg-secondary/80' 
                  : 'border border-light/30 scale-100 hover:border-light/60 bg-secondary/40'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 text-accent text-sm animate-pulse font-press text-[10px]">TARGETED</span>
              )}
              
              {/* Kode Sector Kecil */}
              <span className="absolute top-4 left-4 text-light/50 text-sm">00{sectors.indexOf(sector) + 1}</span>

              {/* CSS Planet */}
              <div className={`w-32 h-32 rounded-full mb-8 mt-6 ${sector.planetStyle} ${isSelected ? 'ring-4 ring-accent ring-offset-4 ring-offset-primary' : ''}`} />

              {/* Teks Informasi */}
              <h2 className={`text-2xl font-bold mb-4 uppercase ${isSelected ? 'text-accent' : 'text-light/80'}`}>
                {sector.name}
              </h2>
              
              <div className="text-center text-light/70 text-sm tracking-wider flex flex-col gap-1 min-h-[60px]">
                <p>{sector.desc1}</p>
                <p>{sector.desc2}</p>
                {sector.desc3 && <p>{sector.desc3}</p>}
              </div>

              {isSelected && (
                <div className="mt-4 bg-accent text-white px-4 py-1 text-sm font-press text-[10px]">
                  TARGET ACQUIRED
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Lock Button */}
      <button
        onClick={handleLockCoordinates}
        className="z-10 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-press py-4 px-8 text-sm md:text-base tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_40px_rgba(255,0,85,0.8)] active:scale-95"
      >
        LOCK COORDINATES
      </button>
    </div>
  );
};

export default Theme;