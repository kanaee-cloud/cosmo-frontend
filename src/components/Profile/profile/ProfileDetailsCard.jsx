export const ProfileDetailsCard = ({
  profile,
  displayName,
  level = 1,
  currentExp = 0,
}) => {
  return (
    <div className="p-4 md:p-5 flex flex-col relative border-b border-[#3b2b5a]">
      <h3 className="font-secondary text-[#ff0055] text-xs md:text-sm tracking-widest uppercase mb-5 border-b border-[#3b2b5a] pb-2">
        LOG KAPTEN
      </h3>

      <div className="flex flex-col gap-5">
        <div>
          {/* Avatar Box Dirampingkan */}
          <div className="w-24 h-28 md:w-24 md:h-28 border-2 border-[#00f0ff] bg-[#0a1a2a] relative overflow-hidden flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-90" />
            ) : (
              <span className="font-press text-4xl text-[#00f0ff]">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
          </div>
          <div className="font-press text-[9px] text-[#00f0ff] tracking-widest uppercase break-all w-24 text-center">
            {displayName}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#ffcc00] text-sm">⭐</span>
              <span className="font-secondary text-[#6a6a9a] text-[10px] tracking-widest uppercase">LEVEL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-[#00f0ff] tracking-wider ml-6">
              LVL {level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#ff0055] text-sm">🛢️</span>
              <span className="font-secondary text-[#6a6a9a] text-[10px] tracking-widest uppercase">XP POOL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-[#00f0ff] tracking-wider ml-6">
              {currentExp.toLocaleString()} XP
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#ff5500] text-sm">🔥</span>
              <span className="font-secondary text-[#6a6a9a] text-[10px] tracking-widest uppercase">WARP STREAK</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-[#ff5500] tracking-wider ml-6">
              10 DAYS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};