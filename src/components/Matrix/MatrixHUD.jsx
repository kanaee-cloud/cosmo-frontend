import React from 'react';
import { Zap } from 'lucide-react';

export const MatrixHeader = ({ profile, q1Count, isLoading }) => (
  <div className="flex justify-between items-start mb-6 relative z-10 p-4 border border-tertiary/50 bg-secondary/30 shadow-[0_4px_20px_rgb(var(--color-primary))] flex-shrink-0">
    <div className="flex flex-col gap-1 font-secondary text-[10px] tracking-[0.2em] text-light/60 uppercase">
      <p>&gt; PILOT: {profile.display_name || 'UNKNOWN'}</p>
      <p>&gt; RANK LEVEL: {profile.level || 1}</p>
      <p>&gt; MATRIX: {isLoading ? 'SYNCING...' : 'ONLINE'}</p>
    </div>

    <div className="border border-red-500/50 bg-red-950/20 px-4 py-2 flex flex-col items-end shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
      <span className="text-red-400 font-secondary text-[10px] tracking-widest uppercase flex items-center gap-2">
        <Zap size={12} className="animate-pulse" /> CRITICAL ALERT
      </span>
      <span className="text-red-500/70 font-secondary text-[8px] tracking-widest mt-1">
        {q1Count} THREATS DETECTED
      </span>
    </div>
  </div>
);

export const MatrixFooter = ({ totalTasks, currentExp }) => (
  <div className="relative z-10 border border-tertiary bg-secondary px-6 py-3 shadow-[0_4px_20px_rgb(var(--color-primary))] flex justify-between items-center flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${totalTasks > 0 ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-tertiary'}`}></div>
      <div className="flex items-center gap-2">
        <span className="font-secondary text-light/70 text-[9px] tracking-widest uppercase">
          SYSTEM LOG: {totalTasks} TOTAL ACTIVE TASKS
        </span>
      </div>
    </div>
    <div className="flex gap-4">
      <span className="font-secondary text-accent text-[9px] tracking-[0.2em] uppercase">
        XP POOL: {currentExp?.toLocaleString() || 0}
      </span>
    </div>
  </div>
);