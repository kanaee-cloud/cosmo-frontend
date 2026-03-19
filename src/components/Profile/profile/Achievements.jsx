import React from 'react';

const mockBadges = [
  { id: 1, icon: '🛡️', locked: false },
  { id: 2, icon: '🚀', locked: false },
  { id: 3, icon: '🛸', locked: false },
  { id: 4, icon: '?', locked: true },
  { id: 5, icon: '?', locked: true },
  { id: 6, icon: '?', locked: true },
  { id: 7, icon: '?', locked: true },
  { id: 8, icon: '?', locked: true },
  { id: 9, icon: '?', locked: true },
];

export default function Achievements({ themeBorder }) {
  return (
    <div 
      className="border p-4 md:p-5 flex flex-col h-full bg-[#07030e]"
      style={{ borderColor: themeBorder }}
    >
      <h3 className="font-secondary text-[#c9bfe6] text-xs md:text-sm tracking-widest uppercase mb-6 border-b border-[#3b2b5a] pb-2">
        NEW BADGES
      </h3>

      {/* Top Section: Featured New Badge */}
      <div className="flex flex-col items-center justify-center mb-8 flex-1">
        <div className="text-5xl md:text-6xl mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]">🥇</div>
        <div className="font-press text-[9px] md:text-[10px] text-[#00f0ff] tracking-widest text-center uppercase leading-relaxed">
          ACE PILOT COMMENDATION
        </div>
      </div>

      {/* Bottom Section: Gallery Grid */}
      <div className="mt-auto">
        <h4 className="font-secondary text-[9px] md:text-[10px] text-[#6a6a9a] tracking-widest uppercase mb-3">
          GALLERY
        </h4>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {mockBadges.map((badge) => (
            <div 
              key={badge.id} 
              className={`aspect-square border-2 flex items-center justify-center text-2xl md:text-3xl transition-colors ${
                badge.locked 
                  ? 'border-[#2a1b4a] bg-transparent text-[#2a1b4a]' 
                  : 'border-[#3b2b5a] bg-[#1a0f2e] text-white hover:border-[#00f0ff] cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              <span className={badge.locked ? 'opacity-50 font-press text-[10px] md:text-xs' : 'hover:scale-110 transition-transform'}>
                {badge.icon}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}