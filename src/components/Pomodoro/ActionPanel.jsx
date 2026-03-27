import React from 'react';
import { Play, Pause, RotateCcw, Snowflake, Battery, Zap } from 'lucide-react';

export default function ActionPanel({ core }) {
  const {
    toggleTimer, currentPhase, isRunning, getMainButtonText,
    isTimerAltered, resetTimer, focusDuration
  } = core;

  return (
    <div className="w-full max-w-2xl flex flex-col md:flex-row gap-6 justify-between items-stretch z-10">

      {/* Main Control Buttons */}
      <div className="flex-1 flex gap-4">
        <button
          onClick={currentPhase === 'break' ? undefined : toggleTimer}
          disabled={currentPhase === 'break'} // TOMBOL DIMATIKAN SAAT COOLING
          className={`flex-1 border-2 font-primary uppercase tracking-widest text-sm md:text-base py-6 transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group ${currentPhase === 'break'
            ? 'border-light/30 bg-light/10 text-light cursor-not-allowed opacity-80' // Visual saat dimatikan
            : 'border-accent bg-accent/5 text-accent hover:bg-accent/20 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgb(var(--color-accent)_/_0.2)]'
            }`}
        >
          {currentPhase === 'break' ? (
            <Snowflake size={20} className="animate-spin" />
          ) : (
            isRunning ? <Pause size={20} /> : <Play size={20} />
          )}

          {/* Teks statis saat break, dinamis saat focus */}
          {currentPhase === 'break' ? 'COOLING IN PROGRESS' : getMainButtonText()}
        </button>

        {/* Reset / Skip Button (Tumpuan Utama Saat Istirahat) */}
        {(isTimerAltered || isRunning || currentPhase === 'break') && (
          <button
            onClick={resetTimer}
            className="w-20 border-2 border-red-500/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            title={currentPhase === 'break' ? "Skip Cooling & Return to Focus" : "Abort / Reset to Focus"}
          >
            <RotateCcw size={20} />
          </button>
        )}
      </div>
    </div>
  );
}