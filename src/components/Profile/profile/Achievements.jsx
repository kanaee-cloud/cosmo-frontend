import React from 'react';

export default function Achievements({ badges, selectedBadgeIds, onToggleBadge }) {
  return (
    <div 
      className="border border-tertiary p-4 md:p-5 flex flex-col h-full bg-secondary transition-colors duration-500"
    >
      <h3 className="font-secondary text-light text-xs md:text-sm tracking-widest uppercase mb-6 border-b border-tertiary pb-2 transition-colors duration-500">
        NEW BADGES
      </h3>

      {/* Top Section: Featured New Badge */}
      <div className="flex flex-col items-center justify-center mb-8 flex-1">
        <div className="text-5xl md:text-6xl mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]">🥇</div>
        <div className="font-press text-[9px] md:text-[10px] text-light tracking-widest text-center uppercase leading-relaxed transition-colors duration-500">
          ACE PILOT COMMENDATION
        </div>
      </div>

      {/* Bottom Section: Gallery Grid INTERAKTIF */}
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-3">
          <h4 className="font-secondary text-[9px] md:text-[10px] text-light/60 tracking-widest uppercase transition-colors duration-500">
            GALLERY
          </h4>
          <span className="font-secondary text-[8px] text-accent transition-colors duration-500">
            (MAX 3 EQUIP)
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {badges.map((badge) => {
            const isSelected = selectedBadgeIds.includes(badge.id);
            
            return (
              <div 
                key={badge.id} 
                onClick={() => onToggleBadge(badge)}
                className={`aspect-square border-2 flex items-center justify-center text-2xl md:text-3xl transition-all duration-500 relative ${
                  badge.locked 
                    ? 'border-tertiary/50 bg-transparent text-tertiary cursor-not-allowed' 
                    : isSelected
                      ? 'border-light bg-light/20 text-text shadow-[0_0_15px_rgb(var(--color-light)_/_0.5)] cursor-pointer scale-105 z-10' // Style saat TERPILIH
                      : 'border-tertiary bg-tertiary text-text hover:border-accent cursor-pointer'
                }`}
                title={badge.name}
              >
                {/* Indikator "ON" kecil di pojok untuk lencana yang aktif */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-accent text-primary text-[7px] font-press px-1 py-0.5 border border-primary transition-colors duration-500">
                    EQ
                  </div>
                )}
                
                <span className={badge.locked ? 'opacity-50 font-press text-[10px] md:text-xs' : 'hover:scale-110 transition-transform'}>
                  {badge.icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}