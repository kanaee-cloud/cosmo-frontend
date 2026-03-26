import React from 'react';
import { 
  Upload, 
  Zap, 
  Bot, 
  BrainCircuit, 
  Cpu, 
  Ghost, 
  Skull, 
  User 
} from 'lucide-react';

// Daftar 6 ikon bertema Cyberpunk/Sci-Fi dari Lucide React
const PRESET_AVATARS = [
  { id: 'bot', Icon: Bot },
  { id: 'brain', Icon: BrainCircuit },
  { id: 'cpu', Icon: Cpu },
  { id: 'ghost', Icon: Ghost },
  { id: 'skull', Icon: Skull },
  { id: 'user', Icon: User }
];

export default function AvatarUploader({ currentAvatar, onSelectAvatar }) {
  
  // Periksa apakah avatar saat ini adalah salah satu dari ID preset
  const isUsingPreset = PRESET_AVATARS.some(avatar => avatar.id === currentAvatar);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      
      {/* SECTION 1: PILIH AVATAR MATRIX (ICONS) */}
      <div className="w-full">
        <h4 className="font-secondary text-[10px] md:text-xs text-light/60 tracking-widest uppercase mb-4 flex items-center gap-2 transition-colors duration-500">
          <Zap size={14} className="text-light transition-colors duration-500" /> AVATAR MATRIX
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {PRESET_AVATARS.map(({ id, Icon }) => {
            const isSelected = currentAvatar === id;
            
            return (
              <button 
                key={id} 
                onClick={() => onSelectAvatar(id)} // Pilih ID ikon
                className={`group w-full aspect-square border-2 flex items-center justify-center transition-all duration-500 relative ${
                  isSelected
                    ? 'border-light bg-light/20 text-light shadow-[0_0_15px_rgb(var(--color-light)_/_0.5)] scale-105 z-10' // Style saat terpilih
                    : 'border-tertiary bg-secondary text-light/70 hover:border-accent hover:text-accent'
                }`}
                title={`SELECT UNIT: ${id.toUpperCase()}`}
              >
                {/* Indikator "ON" kecil di pojok */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-accent text-primary text-[7px] font-press px-1 py-0.5 border border-primary transition-colors duration-500">
                    ON
                  </div>
                )}
                {/* Render komponen Ikon Lucide */}
                <Icon 
                  size={36} 
                  strokeWidth={1.5}
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* KODE SEPARATOR DAN UPLOAD CUSTOM TELAH DIHAPUS SESUAI PERMINTAAN */}

    </div>
  );
}