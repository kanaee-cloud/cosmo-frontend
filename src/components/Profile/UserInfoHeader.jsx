export const UserInfoHeader = ({ displayName, level, profile }) => {
  return (
    <div className="border border-tertiary bg-secondary p-4 flex items-center gap-4 shadow-[0_0_15px_rgb(var(--color-tertiary)_/_0.15)] relative overflow-hidden transition-colors duration-500">
      {/* Scanline background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgb(var(--color-light)_/_0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
      
      {/* Mini Avatar */}
      <div className="w-12 h-12 border border-light bg-secondary flex items-center justify-center relative z-10 shadow-[0_0_8px_rgb(var(--color-light)_/_0.3)] transition-colors duration-500">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-90" />
        ) : (
          <span className="font-press text-xl text-light transition-colors duration-500">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h2 className="font-press text-sm text-text uppercase tracking-wider transition-colors duration-500">{displayName}</h2>
        <div className="flex items-center gap-3 mt-2">
          <p className="font-secondary text-light text-[10px] tracking-widest transition-colors duration-500">RANK/LEVEL: {level}</p>
          <span className="text-tertiary transition-colors duration-500">|</span>
          {/* Warna hijau neon untuk pesan akses kita pakai green-400 dari tailwind */}
          <p className="font-secondary text-green-400 text-[10px] tracking-widest">ACCESS: GRANTED</p>
        </div>
      </div>
    </div>
  );
};