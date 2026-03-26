import { Bot, BrainCircuit, Cpu, Ghost, Skull, User } from 'lucide-react';

const PRESET_AVATARS = {
  bot: Bot,
  brain: BrainCircuit,
  cpu: Cpu,
  ghost: Ghost,
  skull: Skull,
  user: User
};

export const UserInfoHeader = ({ displayName, level, profile }) => {
  const savedAvatar = localStorage.getItem('cosmo-user-avatar');
  const avatarId = profile?.avatar_url || savedAvatar || 'bot';
  const AvatarIcon = PRESET_AVATARS[avatarId];
  return (
    <div className="border border-tertiary bg-secondary p-4 flex items-center gap-4 shadow-[0_0_15px_rgb(var(--color-tertiary)_/_0.15)] relative overflow-hidden transition-colors duration-500">
      {/* Scanline background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgb(var(--color-light)_/_0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
      
      {/* Mini Avatar */}
      <div className="w-12 h-12 border border-light bg-secondary flex items-center justify-center relative z-10 shadow-[0_0_8px_rgb(var(--color-light)_/_0.3)] transition-colors duration-500">
        {AvatarIcon ? (
          <AvatarIcon size={24} className="text-light mix-blend-screen opacity-90 transition-colors duration-500" />
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