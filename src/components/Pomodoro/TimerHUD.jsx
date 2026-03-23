import React from 'react';

export default function TimerHUD({ core }) {
  const { 
    currentPhase, isLocked, setIsModalOpen, isRunning, 
    timeLeft, dynamicStatusText, formatTime, allTasksDone
  } = core;

  // Logika warna status label
  const isReviewMode = allTasksDone && isRunning && currentPhase === 'focus';

  return (
    <div className="relative flex flex-col items-center mb-16 mt-8 w-full">
      {/* Tombol SET TIMER */}
      <button 
        onClick={() => setIsModalOpen(true)}
        disabled={isLocked}
        className={`absolute -top-8 right-10 md:right-1/4 z-30 px-3 py-1 border font-secondary tracking-widest text-[10px] uppercase transition-all duration-300 ${
          isLocked 
            ? 'border-tertiary/30 bg-primary/20 text-primary cursor-not-allowed' 
            : 'border-accent/50 bg-primary/50 text-accent hover:bg-accent hover:text-primary shadow-[0_0_10px_rgb(var(--color-accent)_/_0.2)]'
        }`}
      >
        SET TIMER
      </button>

      {/* Crosshair Decor */}
      <div className="absolute top-[-40px] bottom-[-40px] w-[2px] bg-gradient-to-b from-transparent via-accent/50 to-transparent transition-colors duration-500"></div>
      <div className="absolute left-10 right-10 md:left-1/4 md:right-1/4 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-colors duration-500"></div>

      {/* Lingkaran HUD Timer */}
      <div 
        className={`relative w-56 h-56 flex items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-1000 ${
          currentPhase === 'break' 
            ? 'border-light/30 bg-light/5 scale-100' 
            : (isRunning ? 'border-accent/30 bg-accent/10 scale-105' : 'border-accent/30 bg-secondary/30 scale-100')
        }`}
        style={{ boxShadow: `inset 0 0 ${isRunning ? '50px' : '30px'} ${currentPhase === 'break' ? 'rgb(var(--color-light) / 0.1)' : 'rgb(var(--color-accent) / ' + (isRunning ? '0.2' : '0.1') + ')'}` }}
      >
        <div className={`absolute inset-2 border rounded-full transition-all duration-500 ${
          currentPhase === 'break' ? 'border-light/30' : 'border-tertiary'
        } ${isRunning ? 'animate-[spin_10s_linear_infinite] border-accent/50' : 'rotate-45'}`}></div>
        
        <h1 className={`font-primary text-5xl md:text-6xl z-10 transition-colors duration-500 ${currentPhase === 'break' ? 'text-light' : 'text-accent'}`} style={{ textShadow: `0 0 ${isRunning ? '30px' : '20px'} ${currentPhase === 'break' ? 'rgb(var(--color-light) / 0.6)' : 'rgb(var(--color-accent) / 0.8)'}` }}>
          {formatTime(timeLeft)}
        </h1>
      </div>

      {/* Status Label */}
      <div className={`absolute -bottom-4 border px-4 py-1.5 z-20 transition-colors duration-500 shadow-[0_4px_20px_rgb(var(--color-primary))] ${
        isReviewMode ? 'border-green-500/50 bg-green-950/40' : 'border-tertiary bg-secondary'
      }`}>
        <span className={`font-primary text-[9px] md:text-[10px] tracking-[0.2em] transition-colors duration-500 uppercase ${
          isRunning 
            ? (currentPhase === 'break' 
                ? 'text-light' 
                : (isReviewMode ? 'text-green-400' : 'text-accent')) + ' animate-pulse' 
            : 'text-light/70'
        }`}>
          [ STATUS: {dynamicStatusText} ]
        </span>
      </div>
    </div>
  );
}