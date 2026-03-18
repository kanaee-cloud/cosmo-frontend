export default function LeaderboardHero({ top3 }) {
  const podium = [top3[0], top3[1], top3[2]];

  return (
    // 1. Tinggi pembungkus diperbesar (h-[26rem]) dan jarak dijauhkan (gap-12/20)
    <div className="flex justify-center items-end gap-12 md:gap-20 h-[26rem] font-secondary mb-12 w-full pt-8">
      {podium.map((pilot, index) => {
        const isCenter = index === 1;
        
        // 2 & 4. Ukuran tinggi dan lebar podium diperbesar signifikan
        const height = isCenter ? 'h-64' : 'h-40';
        const width = isCenter ? 'w-56 md:w-72' : 'w-40 md:w-52';
        
        const textColorInside = isCenter ? 'text-[#5a4816]' : (index === 0 ? 'text-[#444]' : 'text-[#f5d0b5]');
        const rankColorInside = isCenter ? 'text-[#7a6012]' : 'text-gray-500';

        return (
          <div key={pilot.rank} className="flex flex-col items-center">
            {/* Title Admiral (Only Rank 1) */}
            <div className="h-6 mb-2">
              {pilot.title && (
                <div className="text-[#ffcc00] text-xs tracking-widest text-center font-press">
                  {pilot.title}
                </div>
              )}
            </div>
            
            {/* Hollow Box Avatar diperbesar sedikit */}
            <div 
              className="w-10 h-12 border-[2px] mb-4"
              style={{ borderColor: pilot.color }}
            ></div>
            
            {/* Username diperbesar */}
            <div className="text-gray-200 text-xs mb-3 tracking-widest uppercase font-press">
              {pilot.username}
            </div>
            
            {/* Podium Base Trapezoid */}
            <div 
              className={`${width} ${height} flex flex-col justify-center items-center relative transition-all duration-300`}
              style={{ 
                backgroundColor: pilot.bg,
                clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
                WebkitClipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)'
              }}
            >
              <span className={`${isCenter ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'} font-press mt-4 ${rankColorInside}`}>
                {pilot.rank}
              </span>
              <span className={`text-sm md:text-base mt-2 font-secondary font-bold tracking-widest ${textColorInside}`}>
                {pilot.xp}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}