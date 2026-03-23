import React from 'react';

export default function PreFlightCheckModal({ isOpen, onAbort, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm animate-fade-in px-4">
      <div className="border border-accent bg-secondary p-8 w-full max-w-sm text-center shadow-[0_0_40px_rgb(var(--color-accent)_/_0.3)] relative">
        <h2 className="font-primary text-accent text-sm md:text-base mb-4 tracking-widest">PRE-FLIGHT CHECK</h2>
        <p className="font-primary text-light/80 text-[10px] md:text-xs mb-8 tracking-[0.2em] leading-relaxed uppercase">
          Apakah semua target misi telah dimasukkan? <br/><br/>
          <span className="text-red-400">Peringatan: Sistem akan mengunci input tugas selama hitung mundur berjalan!</span>
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onAbort} 
            className="flex-1 border border-tertiary bg-primary/50 text-light/70 hover:text-light hover:border-light/50 py-3 font-secondary text-[10px] tracking-widest uppercase transition-colors"
          >
            ABORT
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-primary py-3 font-secondary text-[10px] tracking-widest uppercase transition-all shadow-[0_0_15px_rgb(var(--color-accent)_/_0.3)]"
          >
            YES, ENGAGE
          </button>
        </div>
      </div>
    </div>
  );
}