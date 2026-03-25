import React from 'react';
import * as Icons from 'lucide-react'; // 1. Import seluruh icon Lucide
import { 
  Star, 
  BatteryCharging, 
  Flame,
  Bot, 
  BrainCircuit, 
  Cpu, 
  Ghost, 
  Skull, 
  User 
} from 'lucide-react';

const AVATAR_MAP = {
  bot: Bot,
  brain: BrainCircuit,
  cpu: Cpu,
  ghost: Ghost,
  skull: Skull,
  user: User
};

export const ProfileDetailsCard = ({
  currentAvatar = 'user',
  displayName,
  level = 1,
  currentExp = 0,
  displayBadges = []
}) => {
  const isImageUrl = currentAvatar.startsWith('http');
  const AvatarIcon = AVATAR_MAP[currentAvatar];

  // 2. Fungsi Pembantu: Merender Ikon Dinamis dari String (icon_name)
  const renderBadgeIcon = (iconName) => {
    // Cari ikon di library Lucide berdasarkan namanya. Jika tidak ketemu, pakai HelpCircle
    const IconComponent = Icons[iconName] || Icons.HelpCircle; 
    return <IconComponent size={20} className="text-accent drop-shadow-[0_0_5px_currentColor]" />;
  };

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
            ) : AvatarIcon ? (
              <AvatarIcon 
                size={48} 
                strokeWidth={1.5}
                className="text-light hover:animate-pulse transition-all duration-500 drop-shadow-[0_0_10px_rgb(var(--color-light)_/_0.7)]" 
              />
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
              <Star size={14} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]" fill="currentColor" />
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">LEVEL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-light tracking-wider ml-6 transition-colors duration-500">
              LVL {level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <BatteryCharging size={14} className="text-accent drop-shadow-[0_0_5px_currentColor]" />
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">XP POOL</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-light tracking-wider ml-6 transition-colors duration-500">
              {currentExp.toLocaleString()} XP
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={14} className="text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]" />
              <span className="font-secondary text-light/60 text-[10px] tracking-widest uppercase transition-colors duration-500">WARP STREAK</span>
            </div>
            <div className="font-press text-[10px] md:text-xs text-orange-500 tracking-wider ml-6">
              10 DAYS
            </div>
          </div>
          
          {/* ========================================== */}
          {/* 3. RENDER IKON BADGES (YANG SUDAH DI-EQUIP) */}
          {/* ========================================== */}
          <div className="mt-2 border-t border-tertiary pt-4 transition-colors duration-500">
            <span className="font-secondary text-light/60 text-[9px] tracking-widest uppercase mb-3 block transition-colors duration-500">
              [ ACTIVE COMMENDATIONS ]
            </span>
            <div className="flex gap-3">
              {displayBadges.length > 0 ? (
                displayBadges.map(badge => (
                  <div 
                    key={badge.id} 
                    className="w-10 h-10 border border-accent bg-accent/10 flex items-center justify-center text-lg shadow-[0_0_10px_rgb(var(--color-accent)_/_0.2)] transition-colors duration-500" 
                    title={`${badge.name}\n${badge.description}`}
                  >
                    {/* Memanggil fungsi render ikon dinamis di sini */}
                    {renderBadgeIcon(badge.icon_name)}
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