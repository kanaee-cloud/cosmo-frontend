import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { toast } from '../../../hooks/useToast';

export default function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleChange = () => {
    if (newPwd !== confirmPwd) return toast.error('ERROR', 'New password and confirm do not match');
    toast.success('SUCCESS', 'Password changed (UI-only)');
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
  };

  return (
    <div className="p-6 md:p-8 border border-tertiary bg-secondary relative shadow-[0_0_20px_rgb(var(--color-tertiary)_/_0.1)] transition-colors duration-500">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent transition-colors duration-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-light transition-colors duration-500"></div>
      
      <h3 className="font-secondary text-light text-sm md:text-base tracking-widest uppercase mb-6 border-b border-tertiary pb-3 transition-colors duration-500">
        SECURITY UPLINK
      </h3>
      
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-light/60 tracking-widest uppercase transition-colors duration-500">CURRENT CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={currentPwd} 
            onChange={(e) => setCurrentPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-secondary border border-tertiary text-text font-press text-xs focus:outline-none focus:border-accent transition-colors duration-500" 
            style={{ boxShadow: currentPwd ? '0 0 15px rgb(var(--color-accent) / 0.1)' : 'none' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-light/60 tracking-widest uppercase transition-colors duration-500">NEW CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={newPwd} 
            onChange={(e) => setNewPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-secondary border border-tertiary text-text font-press text-xs focus:outline-none focus:border-accent transition-colors duration-500" 
            style={{ boxShadow: newPwd ? '0 0 15px rgb(var(--color-accent) / 0.1)' : 'none' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-light/60 tracking-widest uppercase transition-colors duration-500">CONFIRM NEW CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={confirmPwd} 
            onChange={(e) => setConfirmPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-secondary border border-tertiary text-text font-press text-xs focus:outline-none focus:border-accent transition-colors duration-500" 
            style={{ boxShadow: confirmPwd ? '0 0 15px rgb(var(--color-accent) / 0.1)' : 'none' }}
          />
        </div>

        <div className="pt-4">
          <button 
            onClick={handleChange} 
            className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border border-accent bg-accent/10 text-accent hover:bg-accent/30 hover:shadow-[0_0_15px_rgb(var(--color-accent)_/_0.4)] transition-all duration-500 font-secondary text-xs tracking-widest uppercase"
          >
            <Lock size={16} /> OVERRIDE CIPHER
          </button>
        </div>
      </div>
    </div>
  );
}