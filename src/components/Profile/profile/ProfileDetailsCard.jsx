export const ProfileDetailsCard = ({
  currentAvatar = '🤖', 
  displayName,
  level = 1,
  currentExp = 0,
  displayBadges = []
}) => {
  const isImageUrl = currentAvatar.startsWith('http');

  return (
    <div className="p-4 md:p-5 flex flex-col relative border-b border-tertiary transition-colors duration-500">
      <h3 className="font-secondary text-accent text-xs md:text-sm tracking-widest uppercase mb-5 border-b border-tertiary pb-2 transition-colors duration-500">
        LOG KAPTEN
      </h3>

      <div className="flex flex-col gap-5">
        <div>
          {/* Avatar Box */}
          <div 
            className="w-24 h-28 border-2 border-light bg-tertiary relative overflow-hidden flex items-center justify-center mb-2 transition-all duration-500"
            style={{ boxShadow: `0 0 20px rgb(var(--color-light) / ${isImageUrl ? '0.3' : '0.5'})` }}
          >
            {isImageUrl ? (
              <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-90" />
            ) : (
              <span className="font-secondary text-5xl text-light hover:animate-pulse transition-all duration-500 drop-shadow-[0_0_10px_rgb(var(--color-light)_/_0.7)]">
                {currentAvatar}
              </span>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
          </div>
          
          <div className="font-press text-[9px] text-light tracking-widest uppercase break-all w-24 text-center transition-colors duration-500">
            {displayName}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Bintang emas standar, level info */}
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">LEVEL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-light tracking-wider ml-6 transition-colors duration-500">
              LVL {level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-accent text-sm transition-colors duration-500">🛢️</span>
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">XP POOL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-light tracking-wider ml-6 transition-colors duration-500">
              {currentExp.toLocaleString()} XP
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-500 text-sm">🔥</span>
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">WARP STREAK</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-orange-500 tracking-wider ml-6">
              10 DAYS
            </div>
          </div>
          
          <div className="mt-2 border-t border-tertiary pt-4 transition-colors duration-500">
            <span className="font-secondary text-light/60 text-[9px] tracking-widest uppercase mb-3 block transition-colors duration-500">
              [ ACTIVE COMMENDATIONS ]
            </span>
            <div className="flex gap-3">
              {displayBadges.length > 0 ? (
                displayBadges.map(badge => (
                  <div key={badge.id} className="w-10 h-10 border border-light bg-light/10 flex items-center justify-center text-lg shadow-[0_0_10px_rgb(var(--color-light)_/_0.3)] transition-colors duration-500" title={badge.name}>
                    {badge.icon}
                  </div>
                ))
              ) : (
                <span className="font-press text-[8px] text-light/60 transition-colors duration-500">NO BADGES SELECTED</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};