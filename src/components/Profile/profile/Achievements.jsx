import React from 'react';
import * as Icons from 'lucide-react';

export default function Achievements({ achievements, selectedBadgeIds, onToggleBadge }) {
  
  const IconComponent = ({ name, className }) => {
    const Icon = Icons[name] || Icons.HelpCircle;
    return <Icon className={className} size={24} />;
  };

  return (
    <div className="border border-tertiary p-4 md:p-5 flex flex-col h-full bg-secondary transition-colors duration-500">
      <h3 className="font-secondary text-light text-xs md:text-sm tracking-widest uppercase mb-6 border-b border-tertiary pb-2">
        BADGE LOADOUT
      </h3>

      {/* Bagian Top: Animasi Medal */}
      <div className="flex flex-col items-center justify-center mb-8 flex-1">
        <div className="text-5xl md:text-6xl mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] text-cyan-400">
           <Icons.Medal size={64} />
        </div>
        <div className="font-press text-[9px] md:text-[10px] text-light tracking-widest text-center uppercase leading-relaxed">
          EQUIP YOUR COMMENDATIONS
        </div>
      </div>

      {/* Bagian Grid Lencana */}
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-3">
          <h4 className="font-secondary text-[9px] md:text-[10px] text-light/60 tracking-widest uppercase">
            GALLERY
          </h4>
          <span className="font-secondary text-[8px] text-accent">
            (MAX 3 EQUIP)
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {achievements?.map((badge) => {
            const isSelected = selectedBadgeIds.includes(badge.id);
            
            return (
              <div 
                key={badge.id} 
                onClick={() => onToggleBadge(badge)}
                className={`aspect-square border-2 flex items-center justify-center transition-all duration-500 relative ${
                  badge.isLocked 
                    ? 'border-tertiary/50 bg-transparent text-tertiary cursor-not-allowed' 
                    : isSelected
                      ? 'border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgb(var(--color-accent)_/_0.5)] cursor-pointer scale-105 z-10'
                      : 'border-tertiary bg-tertiary text-text hover:border-accent cursor-pointer'
                }`}
                title={`${badge.name}\n${badge.description}`}
              >
                {/* Indikator Equipped */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-accent text-primary text-[7px] font-press px-1 py-0.5 border border-primary z-20">
                    EQ
                  </div>
                )}
                
                {/* Indikator "Unclaimed" (Titik merah/kuning jika belum diklaim tapi sudah unlock) */}
                {!badge.isLocked && !badge.isClaimed && badge.reward_fc > 0 && (
                   <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping z-20"></div>
                )}
                
                <span className={badge.isLocked ? 'opacity-30' : 'hover:scale-110 transition-transform'}>
                   <IconComponent name={badge.isLocked ? 'Lock' : badge.icon_name} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}