export default function LeaderboardTargetCard({ target }) {
  return (
    <div 
      className="relative border-2 border-accent bg-transparent p-6 flex flex-col items-center justify-center flex-1 min-h-[220px] transition-colors duration-500"
      style={{ boxShadow: 'inset 0 0 30px rgb(var(--color-accent) / 0.1)' }}
    >
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent transition-colors duration-500"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent transition-colors duration-500"></div>

      {/* Crosshair Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 overflow-hidden">
        <div className="w-full h-[1px] border-t border-dashed border-accent transition-colors duration-500"></div>
        <div className="h-full w-[1px] border-l border-dashed border-accent absolute transition-colors duration-500"></div>
        <div className="w-56 h-56 rounded-full border border-dashed border-accent absolute transition-colors duration-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center font-secondary w-full">
        <span className="text-xs text-accent mb-6 tracking-[0.2em] transition-colors duration-500">
          [ TARGET DIKUNCI ]
        </span>
        
        <h3 className="text-text text-base md:text-lg tracking-widest mb-6 text-center font-press uppercase transition-colors duration-500">
          {target.name}
        </h3>
        
        <div className="w-full border border-accent bg-accent/10 py-2 flex justify-center mb-6 transition-colors duration-500">
          <span className="text-accent text-base md:text-lg tracking-widest font-secondary uppercase font-bold transition-colors duration-500">
            RANK {target.rank}
          </span>
        </div>
        
        <span className="text-light/70 text-xs tracking-widest uppercase transition-colors duration-500">
          {target.xpToNext}
        </span>
      </div>
    </div>
  );
}