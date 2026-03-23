import React from 'react';

export default function LeaderboardHero({ top3 }) {
  const podium = [top3[0], top3[1], top3[2]];

  return (
    <div className="flex justify-center items-end gap-12 md:gap-20 h-[26rem] font-secondary mb-12 w-full pt-8">
      {podium.map((pilot, index) => {
        if (!pilot) return null;
        
        const isCenter = index === 1; // Rank 1 ada di index tengah (1)
        
        const height = isCenter ? 'h-64' : 'h-40';
        const width = isCenter ? 'w-56 md:w-72' : 'w-40 md:w-52';
        
        // Semantic Colors
        const podiumBg = isCenter ? 'bg-accent' : 'bg-tertiary';
        const textColorInside = isCenter ? 'text-primary' : 'text-light';
        const rankColorInside = isCenter ? 'text-primary/70' : 'text-light/50';
        const borderColor = isCenter ? 'border-accent' : 'border-tertiary';
        
        // Ukuran Avatar lebih besar untuk Juara 1
        const avatarSize = isCenter ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14';

        return (
          <div key={pilot.rank} className="flex flex-col items-center">
            {/* Title Admiral */}
            <div className="h-6 mb-2">
              {pilot.title && (
                <div className="text-accent text-[10px] md:text-xs tracking-widest text-center font-press drop-shadow-[0_0_5px_rgb(var(--color-accent)_/_0.5)] transition-colors duration-500">
                  {pilot.title}
                </div>
              )}
            </div>
            
            {/* AVATAR BOX (DULU HOLLOW BOX) */}
            <div className={`${avatarSize} border-2 mb-4 transition-colors duration-500 ${borderColor} overflow-hidden bg-[#0a0a1a] flex items-center justify-center shadow-[0_0_15px_rgb(var(--color-accent)_/_0.2)]`}>
              {pilot.avatar_url ? (
                <img 
                  src={pilot.avatar_url} 
                  alt={pilot.username} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className={`font-press ${isCenter ? 'text-2xl' : 'text-xl'} ${isCenter ? 'text-accent' : 'text-light/70'}`}>
                  {pilot.username?.charAt(0).toUpperCase() || '?'}
                </span>
              )}
            </div>
            
            {/* Username */}
            <div className={`text-xs mb-3 tracking-widest uppercase font-press transition-colors duration-500 ${isCenter ? 'text-accent' : 'text-text'}`}>
              {pilot.username}
            </div>
            
            {/* Podium Base Trapezoid */}
            <div 
              className={`${width} ${height} flex flex-col justify-center items-center relative transition-colors duration-500 ${podiumBg}`}
              style={{ 
                clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
                WebkitClipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)'
              }}
            >
              <span className={`${isCenter ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'} font-press mt-4 transition-colors duration-500 ${rankColorInside}`}>
                {pilot.rank}
              </span>
              <span className={`text-sm md:text-base mt-2 font-secondary font-bold tracking-widest transition-colors duration-500 ${textColorInside}`}>
                {pilot.xp} FC
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}