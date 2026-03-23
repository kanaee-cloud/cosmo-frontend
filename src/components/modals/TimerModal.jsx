import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TimerModal({ isOpen, onClose, onApplyTime, currentDuration }) {
  const [minutes, setMinutes] = useState(25);

  // Sync state dengan durasi saat ini jika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setMinutes(Math.floor(currentDuration / 60));
    }
  }, [isOpen, currentDuration]);

  if (!isOpen) return null;

  const handleApply = () => {
    // Validasi agar minimal 1 menit
    const validMinutes = Math.max(1, parseInt(minutes) || 1);
    onApplyTime(validMinutes * 60);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm transition-opacity duration-500">
      {/* Modal Box */}
      <div className="border-2 border-accent bg-secondary p-8 w-[90%] max-w-sm relative shadow-[0_0_40px_rgb(var(--color-accent)_/_0.2)] animate-fade-in">
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent"></div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-light/50 hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="font-press text-accent text-sm md:text-base mb-8 text-center tracking-widest uppercase">
          CALIBRATE CORE
        </h2>

        <div className="flex flex-col gap-4 mb-8">
          <div>
            <label className="font-secondary text-[10px] text-light/70 tracking-widest uppercase mb-3 block text-center">
              TARGET DURATION (MINUTES)
            </label>
            <input 
              type="number" 
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full bg-primary/50 border-b-2 border-tertiary focus:border-accent text-text font-press text-3xl p-4 text-center outline-none transition-colors"
              min="1"
              max="120"
              style={{ caretColor: 'rgb(var(--color-accent))' }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 border border-tertiary bg-primary/50 text-light/70 py-3 font-secondary text-xs tracking-widest uppercase hover:text-light transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleApply} 
            className="flex-1 border border-accent bg-accent/20 text-accent py-3 font-secondary text-xs tracking-widest uppercase hover:bg-accent hover:text-primary transition-all duration-300 shadow-[0_0_15px_rgb(var(--color-accent)_/_0.4)]"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}