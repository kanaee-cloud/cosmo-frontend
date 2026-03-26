import React from 'react';
import UserAvatar from '../common/UserAvatar';

export default function LeaderboardHero({ top3 }) {
  const podium = [top3[0], top3[1], top3[2]];

  return (
    <div className="flex justify-center items-end gap-2 sm:gap-6 md:gap-12 lg:gap-20 h-[18rem] sm:h-[22rem] md:h-[26rem] font-secondary mb-8 md:mb-12 w-full pt-4 md:pt-8 px-2">
      {podium.map((pilot, index) => {
        if (!pilot) return null;
        
        const isCenter = index === 1; // Rank 1 ada di index tengah (1)
        
        // UKURAN RESPONSIF TINGKAT TINGGI
        const height = isCenter ? 'h-32 sm:h-48 md:h-64' : 'h-20 sm:h-32 md:h-40';
        const width = isCenter ? 'w-28 sm:w-40 md:w-56 lg:w-72' : 'w-[85px] sm:w-28 md:w-40 lg:w-52';
        const avatarSize = isCenter ? 'w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20' : 'w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14';
        const titleText = 'text-[8px] sm:text-[10px] md:text-xs';
        const nameText = 'text-[8px] sm:text-[10px] md:text-xs';
        const rankText = isCenter ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-3xl sm:text-5xl md:text-6xl';
        const xpText = 'text-[8px] sm:text-sm md:text-base';
        
        // Semantic Colors
        const podiumBg = isCenter ? 'bg-accent' : 'bg-tertiary';
        const textColorInside = isCenter ? 'text-primary' : 'text-light';
        const rankColorInside = isCenter ? 'text-primary/70' : 'text-light/50';
        const borderColor = isCenter ? 'border-accent' : 'border-tertiary';

        return (
          <div key={pilot.rank} className="flex flex-col items-center">
            {/* Title Admiral */}
            <div className="h-6 mb-1 md:mb-2 flex items-end">
              {pilot.title && (
                <div className={`text-accent ${titleText} tracking-widest text-center font-press drop-shadow-[0_0_5px_rgb(var(--color-accent)_/_0.5)] transition-colors duration-500`}>
                  {pilot.title}
                </div>
              )}
            </div>
            
            {/* AVATAR BOX */}
            <div className={`${avatarSize} border-2 mb-2 md:mb-4 transition-colors duration-500 ${borderColor} overflow-hidden bg-[#0a0a1a] flex items-center justify-center shadow-[0_0_15px_rgb(var(--color-accent)_/_0.2)] shrink-0`}>
              {pilot.avatar_url ? (
                <UserAvatar avatarId={pilot.avatar_url} className="w-full h-full p-2" />
              ) : (
                <span className={`font-press ${isCenter ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'} ${isCenter ? 'text-accent' : 'text-light/70'}`}>
                  {pilot.username?.charAt(0).toUpperCase() || '?'}
                </span>
              )}
            </div>
            
            {/* Username */}
            <div className={`${nameText} mb-2 md:mb-3 tracking-widest uppercase font-press transition-colors duration-500 text-center truncate w-full px-1 ${isCenter ? 'text-accent' : 'text-text'}`}>
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
              <span className={`${rankText} font-press mt-2 md:mt-4 transition-colors duration-500 ${rankColorInside}`}>
                {pilot.rank}
              </span>
              <span className={`${xpText} mt-1 md:mt-2 font-secondary font-bold tracking-widest transition-colors duration-500 ${textColorInside}`}>
                {pilot.xp} <span className="hidden sm:inline">FC</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}