import React from 'react';
import { 
  AlertTriangle, 
  Microscope, 
  MessageSquare, 
  PlayCircle,
  Clock,
  Users,
  Trash2
} from 'lucide-react';

export default function Matriks() {
  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col p-4 md:p-6 lg:p-8 relative overflow-hidden bg-primary/10">
      
      {/* --- BACKGROUND AMBIENT GLOW (Cosmo Theme) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"></div>

      {/* --- TOP HUD INFO --- */}
      <div className="flex justify-between items-start mb-6 relative z-10 p-4 border border-tertiary/50 bg-secondary/30 shadow-[0_4px_20px_rgb(var(--color-primary))] flex-shrink-0">
        {/* Left Stats */}
        <div className="flex flex-col gap-1 font-secondary text-[10px] tracking-[0.2em] text-light/60 uppercase">
          <p>&gt; SECTOR: G-42</p>
          <p>&gt; OXYGEN: 94%</p>
          <p>&gt; FUEL: OPTIMAL</p>
        </div>

        {/* Right Hazard Box */}
        <div className="border border-red-500/50 bg-red-950/20 px-4 py-2 flex flex-col items-end shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
          <span className="text-red-400 font-secondary text-[10px] tracking-widest uppercase">HAZARD MARQUEE</span>
          <span className="text-red-500/50 font-secondary text-[8px] tracking-widest line-through mt-1">XP TAG #004</span>
        </div>
      </div>

      {/* --- MATRIX CONTAINER (FULL SIZE) --- */}
      <div className="flex-1 relative z-10 mb-6 w-full max-w-screen-2xl mx-auto flex flex-col">
        {/* 2x2 Grid - Akan mengembang penuh mengisi flex-1 */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
          
          {/* Q1: LAKUKAN SEKARANG */}
          <div className="relative flex flex-col p-6 border transition-all duration-500 h-full border-red-500/50 bg-red-950/10">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(239,68,68,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            <div className="flex justify-between items-center mb-4 relative z-10 bg-red-950/40 p-2 border-b border-red-500/30">
              <span className="font-primary text-[10px] tracking-widest uppercase text-red-400">[LAKUKAN SEKARANG]</span>
              <span className="font-primary text-[12px] text-red-400">!</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10 p-4">
              <AlertTriangle className="text-red-400" size={32} />
              <h3 className="font-secondary text-white text-xs md:text-sm tracking-widest uppercase text-center">
                FIX BUG NAVIGASI - KEBOCORAN BAHAN BAKAR
              </h3>
              <span className="font-secondary text-[9px] tracking-[0.2em] uppercase text-red-400 bg-red-950/50 border border-red-500/30 px-3 py-1">
                PRIORITY: MAXIMUM
              </span>
            </div>
            <div className="absolute bottom-3 right-4 font-secondary text-[9px] text-red-400/50 tracking-widest">
              [00-01]
            </div>
          </div>

          {/* Q2: RENCANAKAN */}
          <div className="relative flex flex-col p-6 border transition-all duration-500 h-full border-purple-500/50 bg-purple-950/10">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(168,85,247,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            <div className="flex justify-between items-center mb-4 relative z-10 bg-purple-950/40 p-2 border-b border-purple-500/30">
              <span className="font-primary text-[10px] tracking-widest uppercase text-purple-400">[RENCANAKAN]</span>
              <Clock className="text-purple-400" size={12} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10 p-4">
              <Microscope className="text-purple-400" size={32} />
              <h3 className="font-secondary text-white text-xs md:text-sm tracking-widest uppercase text-center">
                PELAJARI REACT HOOKS (USEEFFECT)
              </h3>
              <div className="flex gap-1.5 mt-1">
                <div className="w-2.5 h-2.5 bg-purple-400"></div>
                <div className="w-2.5 h-2.5 bg-purple-900/50 border border-purple-500/30"></div>
                <div className="w-2.5 h-2.5 bg-purple-900/50 border border-purple-500/30"></div>
              </div>
            </div>
            <div className="absolute bottom-3 right-4 font-secondary text-[9px] text-purple-400/50 tracking-widest">
              [00-02]
            </div>
          </div>

          {/* Q3: OPER / DELEGASIKAN */}
          <div className="relative flex flex-col p-6 border transition-all duration-500 h-full border-tertiary bg-secondary/30">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,255,165,0.015)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            <div className="flex justify-between items-center mb-4 relative z-10 bg-primary/40 p-2 border-b border-tertiary/50">
              <span className="font-primary text-[10px] tracking-widest uppercase text-accent/80">[OPER/DELEGASIKAN]</span>
              <Users className="text-accent/80" size={12} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10 p-4">
              <MessageSquare className="text-accent/80" size={32} />
              <h3 className="font-secondary text-white text-xs md:text-sm tracking-widest uppercase text-center">
                BALAS CHAT KOMUNITAS GALAXY
              </h3>
            </div>
            <div className="absolute bottom-3 right-4 font-secondary text-[9px] text-light/40 tracking-widest">
              [00-03]
            </div>
          </div>

          {/* Q4: HAPUS / ABAIKAN */}
          <div className="relative flex flex-col p-6 border transition-all duration-500 h-full border-tertiary/20 bg-primary/40 opacity-60">
            <div className="flex justify-between items-center mb-4 relative z-10 bg-black/20 p-2 border-b border-tertiary/20">
              <span className="font-primary text-[10px] tracking-widest uppercase text-light/40">[HAPUS/ABAIKAN]</span>
              <Trash2 className="text-light/40" size={12} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10 p-4">
              <PlayCircle className="text-light/30" size={32} />
              <h3 className="font-secondary text-light/50 text-xs md:text-sm tracking-widest uppercase text-center">
                NONTON VIDEO KUCING LUAR ANGKASA
              </h3>
            </div>
            <div className="absolute bottom-3 right-4 font-secondary text-[9px] text-light/20 tracking-widest">
              [00-04]
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM LOG BAR --- */}
      <div className="relative z-10 border border-tertiary bg-secondary px-6 py-3 shadow-[0_4px_20px_rgb(var(--color-primary))] flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Animated dot */}
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          
          <div className="flex items-center gap-2">
            <span className="font-secondary text-light/70 text-[9px] tracking-widest uppercase">
              SYSTEM LOG: ACTIVE TASK IN Q1
            </span>
            <span className="font-secondary text-light/40 text-[9px] tracking-widest uppercase ml-2 hidden lg:inline">
              INIT_TASK_SCAN... OK | CALIBRATING_URGENCY... COMPLETE | MATRIX_RENDERED_V1.0.4
            </span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <span className="font-secondary text-accent text-[9px] tracking-[0.2em] uppercase">
            XP: 14,200
          </span>
          <span className="font-secondary text-light text-[9px] tracking-[0.2em] uppercase">
            CREDITS: 420.69
          </span>
        </div>
      </div>

    </div>
  );
}