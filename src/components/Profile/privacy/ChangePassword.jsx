import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleChange = () => {
    if (newPwd !== confirmPwd) return alert('New password and confirm do not match');
    alert('Password changed (UI-only)');
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
  };

  return (
    <div className="p-6 md:p-8 border border-[#7a5299] bg-[#07030e] relative shadow-[0_0_20px_rgba(122,82,153,0.1)]">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff]"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f0ff]"></div>
      
      <h3 className="font-secondary text-[#00f0ff] text-sm md:text-base tracking-widest uppercase mb-6 border-b border-[#3b2b5a] pb-3">
        SECURITY UPLINK
      </h3>
      
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-[#6a6a9a] tracking-widest uppercase">CURRENT CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={currentPwd} 
            onChange={(e) => setCurrentPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-[#0a0514] border border-[#3b2b5a] text-[#00f0ff] font-press text-xs focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder-[#3b2b5a]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-[#6a6a9a] tracking-widest uppercase">NEW CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={newPwd} 
            onChange={(e) => setNewPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-[#0a0514] border border-[#3b2b5a] text-[#00f0ff] font-press text-xs focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder-[#3b2b5a]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[10px] text-[#6a6a9a] tracking-widest uppercase">CONFIRM NEW CIPHER</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={confirmPwd} 
            onChange={(e) => setConfirmPwd(e.target.value)} 
            className="w-full p-3 md:p-4 bg-[#0a0514] border border-[#3b2b5a] text-[#00f0ff] font-press text-xs focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder-[#3b2b5a]" 
          />
        </div>

        <div className="pt-4">
          <button 
            onClick={handleChange} 
            className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all font-secondary text-xs tracking-widest uppercase"
          >
            <Lock size={16} /> OVERRIDE CIPHER
          </button>
        </div>
      </div>
    </div>
  );
}