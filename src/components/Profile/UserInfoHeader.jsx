export const UserInfoHeader = ({ displayName, level, profile }) => {
  return (
    <div className="border border-[#7a5299] bg-[#0a0514] p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(122,82,153,0.15)] relative overflow-hidden">
      {/* Scanline background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
      
      {/* Mini Avatar */}
      <div className="w-12 h-12 border border-[#00f0ff] bg-[#07030e] flex items-center justify-center relative z-10 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-90" />
        ) : (
          <span className="font-press text-xl text-[#00f0ff]">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h2 className="font-press text-sm text-white uppercase tracking-wider">{displayName}</h2>
        <div className="flex items-center gap-3 mt-2">
          <p className="font-secondary text-[#00f0ff] text-[10px] tracking-widest">RANK/LEVEL: {level}</p>
          <span className="text-[#3b2b5a]">|</span>
          <p className="font-secondary text-[#06FFA5] text-[10px] tracking-widest">ACCESS: GRANTED</p>
        </div>
      </div>
    </div>
  );
};