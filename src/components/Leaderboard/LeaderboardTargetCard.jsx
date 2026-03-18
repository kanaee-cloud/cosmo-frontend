export default function LeaderboardTargetCard({ target }) {
  return (
    // Tambahkan flex-1 di sini agar tinggi card merenggang menyamai sisa tinggi tabel di kiri
    <div className="relative border-2 border-[#ff0055] bg-transparent p-6 flex flex-col items-center justify-center flex-1 min-h-[220px]">
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff0055]"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff0055]"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff0055]"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff0055]"></div>

      {/* Crosshair Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 overflow-hidden">
        <div className="w-full h-[1px] border-t border-dashed border-[#ff0055]"></div>
        <div className="h-full w-[1px] border-l border-dashed border-[#ff0055] absolute"></div>
        <div className="w-56 h-56 rounded-full border border-dashed border-[#ff0055] absolute"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center font-secondary w-full">
        <span className="text-xs text-[#ff0055] mb-6 tracking-[0.2em]">
          [ TARGET DIKUNCI ]
        </span>
        
        <h3 className="text-white text-base md:text-lg tracking-widest mb-6 text-center font-press uppercase">
          {target.name}
        </h3>
        
        <div className="w-full border border-[#ff0055] bg-[#ff0055]/10 py-2 flex justify-center mb-6">
          <span className="text-[#ff0055] text-base md:text-lg tracking-widest font-secondary uppercase font-bold">
            RANK {target.rank}
          </span>
        </div>
        
        <span className="text-xs text-[#7a5299] tracking-widest uppercase">
          {target.xpToNext}
        </span>
      </div>
    </div>
  );
}