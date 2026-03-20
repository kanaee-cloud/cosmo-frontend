import React from 'react';
import { Upload, Zap } from 'lucide-react';

// Daftar 6 emoji bertema Cyberpunk/Sci-Fi
const PRESET_EMOTES = ['🤴', '👸', '👩‍⚕️', '👨‍⚕️', '👩‍🎓', '👨‍🎓'];

export default function AvatarUploader({ currentAvatar, onSelectAvatar }) {
  
  // Periksa apakah avatar saat ini adalah salah satu dari emoji preset
  const isUsingEmote = PRESET_EMOTES.includes(currentAvatar);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      
      {/* SECTION 1: PILIH AVATAR MATRIX (EMOTES) */}
      <div className="w-full">
        <h4 className="font-secondary text-[10px] md:text-xs text-light/60 tracking-widest uppercase mb-4 flex items-center gap-2 transition-colors duration-500">
          <Zap size={14} className="text-light transition-colors duration-500" /> AVATAR MATRIX
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {PRESET_EMOTES.map((emote) => {
            const isSelected = currentAvatar === emote;
            
            return (
              <button 
                key={emote} 
                onClick={() => onSelectAvatar(emote)} // Pilih emoji
                className={`w-full aspect-square border-2 flex items-center justify-center text-4xl md:text-5xl transition-all duration-500 relative ${
                  isSelected
                    ? 'border-light bg-light/20 shadow-[0_0_15px_rgb(var(--color-light)_/_0.5)] scale-105 z-10' // Style saat terpilih
                    : 'border-tertiary bg-secondary hover:border-accent'
                }`}
                title="SELECT UNIT"
              >
                {/* Indikator "ON" kecil di pojok */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-accent text-primary text-[7px] font-press px-1 py-0.5 border border-primary transition-colors duration-500">
                    ON
                  </div>
                )}
                <span className="hover:scale-110 transition-transform">{emote}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SEPARATOR 'OR' */}
      <div className="w-full relative flex items-center justify-center my-2">
        <div className="absolute w-full border-t border-tertiary transition-colors duration-500"></div>
        <span className="relative z-10 font-press text-[8px] text-tertiary bg-secondary px-4 transition-colors duration-500">OR</span>
      </div>

      {/* SECTION 3: UNGGAH VISUAL CUSTOM */}
      <div className="w-full">
        <h4 className="font-secondary text-[10px] md:text-xs text-light/60 tracking-widest uppercase mb-4 transition-colors duration-500">
          TRANSMIT CUSTOM DATA
        </h4>
        
        {/* Kotak unggah dirampingkan tingginya agar muat */}
        <div 
          className={`relative w-full h-24 border-2 border-dashed flex items-center justify-center group cursor-pointer hover:bg-accent/10 transition-colors duration-500 ${
            !isUsingEmote && currentAvatar && currentAvatar.startsWith('http')
              ? 'border-accent bg-accent/10' // Style jika ada foto terunggah
              : 'border-tertiary bg-secondary'
          }`}
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent transition-colors duration-500"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-light transition-colors duration-500"></div>

          <div className="flex flex-col items-center gap-2 text-light/60 group-hover:text-accent transition-colors duration-500">
            <Upload size={20} />
            <span className="font-secondary text-[9px] md:text-[10px] tracking-widest">UPLOAD VISUAL</span>
          </div>
          
          <p className="absolute bottom-2 font-secondary text-[7px] text-tertiary tracking-widest transition-colors duration-500">
            JPG, PNG, GIF | MAX 2MB
          </p>
        </div>
      </div>

    </div>
  );
}