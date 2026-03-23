import React from 'react';
import { Plus, Lock, X } from 'lucide-react';

export default function DirectiveFocus({ core }) {
  const { 
    task, setTask, handleKeyPress, isLocked, currentPhase, 
    handleAddTask, tasksList, completeTask, removeTask 
  } = core;

  return (
    <div className="w-full max-w-2xl border border-tertiary bg-secondary p-6 md:p-8 relative transition-colors duration-500 z-10 mb-8 flex flex-col gap-4">
      <div className="absolute top-0 left-0 w-2 h-2 bg-light/50 transition-colors duration-500"></div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-secondary text-[10px] tracking-widest text-light/70 uppercase transition-colors duration-500">
          [ DIREKTIF FOKUS: ]
        </h3>
        {isLocked && (
          <div className="flex items-center gap-2 text-red-400/80 animate-pulse">
            <Lock size={12} />
            <span className="font-secondary text-[8px] tracking-[0.2em] uppercase">SYSTEM LOCKED</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="flex items-end gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLocked}
            placeholder={
              currentPhase === 'break' 
                ? "SYSTEM COOLING. INPUT DIKUNCI." 
                : (isLocked ? "WARP DRIVE AKTIF. INPUT DIKUNCI." : "Masukkan target misi utama...")
            } 
            className={`w-full bg-transparent border-b-2 font-secondary text-sm outline-none transition-colors duration-500 px-2 pb-2 ${
              isLocked 
                ? 'border-tertiary/30 text-tertiary placeholder-tertiary/50 cursor-not-allowed' 
                : 'border-tertiary focus:border-accent text-text placeholder-light/60'
            }`} 
            style={{ caretColor: 'rgb(var(--color-accent))' }}
          />
        </div>
        <button 
          onClick={handleAddTask}
          disabled={isLocked}
          className={`w-10 h-10 border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
            isLocked 
              ? 'border-tertiary/30 bg-primary/20 text-tertiary/50 cursor-not-allowed' 
              : 'border-tertiary bg-primary/50 text-light/70 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgb(var(--color-accent)_/_0.3)]'
          }`}
        >
          {isLocked ? <Lock size={16} /> : <Plus size={18} />}
        </button>
      </div>

      {/* Task List Render */}
      {tasksList.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {tasksList.map((t) => (
            <div 
              key={t.id} 
              className={`flex items-center justify-between p-3 border transition-all duration-300 ${t.done ? 'border-tertiary/30 bg-primary/10 opacity-60' : 'border-accent bg-secondary shadow-[inset_0_0_10px_rgb(var(--color-accent)_/_0.05)]'}`}
            >
              <span className={`font-secondary text-sm tracking-wider flex-1 truncate pr-4 transition-all duration-300 ${t.done ? 'line-through text-light/40' : 'text-text/90'}`}>
                {t.text}
              </span>
              
              {/* Wadah Aksi (Buttons) */}
              <div className="flex-shrink-0 ml-2 flex items-center">
                {!t.done ? (
                  isLocked ? (
                    // Tombol DONE saat sistem aktif
                    <button 
                      onClick={() => completeTask(t.id)}
                      className="font-secondary text-[9px] md:text-[10px] tracking-widest text-accent/80 hover:text-accent transition-colors duration-300 uppercase"
                    >
                      DONE
                    </button>
                  ) : (
                    // Tombol Batal/Hapus saat persiapan (Merah)
                    <button 
                      onClick={() => removeTask(t.id)}
                      className="text-red-500/70 hover:text-red-400 transition-colors duration-300 flex items-center justify-center p-1"
                      title="Abort Target"
                    >
                      <X size={16} />
                    </button>
                  )
                ) : (
                  // Tombol Bersihkan Log untuk tugas yang sudah selesai (Abu-abu redup -> Merah saat dihover)
                  <button 
                    onClick={() => removeTask(t.id)}
                    className="text-light/20 hover:text-red-400 transition-colors duration-300 flex items-center justify-center p-1"
                    title="Clear Log"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}