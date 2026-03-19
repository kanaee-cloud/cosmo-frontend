import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function PrivacySettings({ profile }) {
  const [isPublic, setIsPublic] = useState(profile?.public_profile ?? false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-6 md:p-8 border border-[#7a5299] bg-[#07030e] relative shadow-[0_0_20px_rgba(122,82,153,0.1)]">
      <h3 className="font-secondary text-[#00f0ff] text-sm md:text-base tracking-widest uppercase mb-6 border-b border-[#3b2b5a] pb-3">
        NETWORK & COMMS SETTINGS
      </h3>

      <div className="flex flex-col gap-6">
        
        {/* Toggle 1 */}
        <label className="flex items-center justify-between cursor-pointer group p-3 border border-transparent hover:border-[#3b2b5a] bg-[#0a0514] transition-colors">
          <div className="flex flex-col">
            <span className="font-secondary text-xs md:text-sm text-[#c9bfe6] tracking-widest uppercase group-hover:text-[#00f0ff] transition-colors">
              PUBLIC PROFILE BROADCAST
            </span>
            <span className="font-secondary text-[8px] md:text-[10px] text-[#6a6a9a] tracking-widest mt-1">
              ALLOW OTHER OPERATORS TO VIEW YOUR RIG STATS
            </span>
          </div>
          
          {/* Custom Retro Toggle */}
          <div className="relative flex items-center">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="sr-only peer" />
            <div className="w-12 h-6 border-2 border-[#3b2b5a] peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/20 bg-[#0a0514] flex items-center p-1 transition-all">
              <div className="w-3 h-3 bg-[#6a6a9a] peer-checked:bg-[#00f0ff] peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <span className="absolute -right-12 font-press text-[8px] text-[#00f0ff] opacity-0 peer-checked:opacity-100 transition-opacity">ON</span>
          </div>
        </label>

        {/* Toggle 2 */}
        <label className="flex items-center justify-between cursor-pointer group p-3 border border-transparent hover:border-[#3b2b5a] bg-[#0a0514] transition-colors">
          <div className="flex flex-col">
            <span className="font-secondary text-xs md:text-sm text-[#c9bfe6] tracking-widest uppercase group-hover:text-[#00f0ff] transition-colors">
              HQ TRANSMISSIONS (EMAIL)
            </span>
            <span className="font-secondary text-[8px] md:text-[10px] text-[#6a6a9a] tracking-widest mt-1">
              RECEIVE MISSION ALERTS AND SYSTEM UPDATES
            </span>
          </div>
          
          {/* Custom Retro Toggle */}
          <div className="relative flex items-center">
            <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="sr-only peer" />
            <div className="w-12 h-6 border-2 border-[#3b2b5a] peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/20 bg-[#0a0514] flex items-center p-1 transition-all">
              <div className="w-3 h-3 bg-[#6a6a9a] peer-checked:bg-[#00f0ff] peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <span className="absolute -right-12 font-press text-[8px] text-[#00f0ff] opacity-0 peer-checked:opacity-100 transition-opacity">ON</span>
          </div>
        </label>

        <div className="pt-4">
          <button className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all font-secondary text-xs tracking-widest uppercase">
            <Save size={16} /> SAVE CONFIGURATION
          </button>
        </div>
      </div>
    </div>
  );
}