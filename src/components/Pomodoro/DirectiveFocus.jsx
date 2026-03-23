import React from 'react';
import { Plus, Lock, X } from 'lucide-react';

export default function DirectiveFocus({ core }) {
  const { 
    task, setTask, handleKeyPress, isLocked, currentPhase, 
    handleAddTask, tasksList, isTasksLoading, completeTask, removeTask 
  } = core;

  return (
    <div className="w-full max-w-2xl border border-tertiary bg-secondary p-6 md:p-8 relative transition-colors duration-500 z-10 mb-8 flex flex-col gap-4 shadow-[0_0_20px_rgb(var(--color-tertiary)_/_0.2)]">
      <div className="absolute top-0 left-0 w-2 h-2 bg-light/50 transition-colors duration-500"></div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-secondary text-[10px] tracking-widest text-light/70 uppercase transition-colors duration-500">
          [ POMODORO DIRECTIVES: ]
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
                : (isLocked ? "WARP DRIVE AKTIF. INPUT DIKUNCI." : "Masukkan target misi spesifik...")
            } 
            className={`w-full bg-transparent border-b-2 font-secondary text-sm outline-none transition-colors duration-500 px-2 pb-2 ${
              isLocked 
                ? 'border-tertiary/30 text-tertiary placeholder-tertiary/50 cursor-not-allowed' 
                : 'border-tertiary focus:border-accent text-text placeholder-light/60'
            }`} 
          />
        </div>
        <button 
          onClick={handleAddTask}
          disabled={isLocked || task.trim() === ''}
          className={`w-10 h-10 border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
            isLocked || task.trim() === ''
              ? 'border-tertiary/30 bg-primary/20 text-tertiary/50 cursor-not-allowed' 
              : 'border-tertiary bg-primary/50 text-light/70 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgb(var(--color-accent)_/_0.3)]'
          }`}
        >
          {isLocked ? <Lock size={16} /> : <Plus size={18} />}
        </button>
      </div>

      {/* Task List Render */}
      <div className="mt-4 flex flex-col gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
        {isTasksLoading ? (
          <div className="w-full text-center font-secondary text-[10px] text-tertiary tracking-widest py-4 animate-pulse">
            SYNCING DIRECTIVES...
          </div>
        ) : tasksList.length > 0 ? (
          tasksList.map((t) => (
            <div 
              key={t.id} 
              className={`flex items-center justify-between p-3 border transition-all duration-300 ${t.is_completed ? 'border-tertiary/30 bg-primary/10 opacity-60' : 'border-accent bg-secondary shadow-[inset_0_0_10px_rgb(var(--color-accent)_/_0.05)]'}`}
            >
              <span className={`font-secondary text-sm tracking-wider flex-1 truncate pr-4 transition-all duration-300 ${t.is_completed ? 'line-through text-light/40' : 'text-text/90'}`}>
                {t.title}
              </span>
              
              <div className="flex-shrink-0 ml-2 flex items-center">
                {!t.is_completed ? (
                  isLocked ? (
                    // Tombol DONE saat sistem aktif
                    <button 
                      onClick={() => completeTask(t.id, t.is_completed)}
                      className="font-secondary text-[9px] md:text-[10px] tracking-widest text-accent/80 hover:text-accent transition-colors duration-300 uppercase"
                    >
                      DONE
                    </button>
                  ) : (
                    // Tombol Hapus sebelum dimulai
                    <button 
                      onClick={() => removeTask(t.id)}
                      className="text-red-500/70 hover:text-red-400 transition-colors duration-300 p-1"
                    >
                      <X size={16} />
                    </button>
                  )
                ) : (
                  // Tombol Hapus untuk yang sudah selesai
                  <button 
                    onClick={() => removeTask(t.id)}
                    className="text-light/20 hover:text-red-400 transition-colors duration-300 p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
            <div className="w-full text-center font-secondary text-[10px] text-light/30 tracking-widest py-4">
               NO DIRECTIVES ASSIGNED.
            </div>
        )}
      </div>
    </div>
  );
}