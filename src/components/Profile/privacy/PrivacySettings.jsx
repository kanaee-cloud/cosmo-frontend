import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function PrivacySettings({ profile }) {
  const [isPublic, setIsPublic] = useState(profile?.public_profile ?? false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-6 md:p-8 border border-tertiary bg-secondary relative shadow-[0_0_20px_rgb(var(--color-tertiary)_/_0.1)] transition-colors duration-500">
      <h3 className="font-secondary text-light text-sm md:text-base tracking-widest uppercase mb-6 border-b border-tertiary pb-3 transition-colors duration-500">
        NETWORK & COMMS SETTINGS
      </h3>

      <div className="flex flex-col gap-6">
        
        {/* Toggle 1 */}
        <label className="flex items-center justify-between cursor-pointer group p-3 border border-transparent hover:border-tertiary bg-secondary transition-colors duration-500">
          <div className="flex flex-col">
            <span className="font-secondary text-xs md:text-sm text-light tracking-widest uppercase group-hover:text-accent transition-colors duration-500">
              PUBLIC PROFILE BROADCAST
            </span>
            <span className="font-secondary text-[8px] md:text-[10px] text-light/60 tracking-widest mt-1 transition-colors duration-500">
              ALLOW OTHER OPERATORS TO VIEW YOUR RIG STATS
            </span>
          </div>
          
          {/* Custom Retro Toggle */}
          <div className="relative flex items-center">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="sr-only peer" />
            <div className="w-12 h-6 border-2 border-tertiary peer-checked:border-accent peer-checked:bg-accent/20 bg-secondary flex items-center p-1 transition-all duration-500">
              <div className="w-3 h-3 bg-light/40 peer-checked:bg-accent peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <span className="absolute -right-12 font-press text-[8px] text-accent opacity-0 peer-checked:opacity-100 transition-all duration-500">ON</span>
          </div>
        </label>

        {/* Toggle 2 */}
        <label className="flex items-center justify-between cursor-pointer group p-3 border border-transparent hover:border-tertiary bg-secondary transition-colors duration-500">
          <div className="flex flex-col">
            <span className="font-secondary text-xs md:text-sm text-light tracking-widest uppercase group-hover:text-accent transition-colors duration-500">
              HQ TRANSMISSIONS (EMAIL)
            </span>
            <span className="font-secondary text-[8px] md:text-[10px] text-light/60 tracking-widest mt-1 transition-colors duration-500">
              RECEIVE MISSION ALERTS AND SYSTEM UPDATES
            </span>
          </div>
          
          {/* Custom Retro Toggle */}
          <div className="relative flex items-center">
            <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="sr-only peer" />
            <div className="w-12 h-6 border-2 border-tertiary peer-checked:border-accent peer-checked:bg-accent/20 bg-secondary flex items-center p-1 transition-all duration-500">
              <div className="w-3 h-3 bg-light/40 peer-checked:bg-accent peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <span className="absolute -right-12 font-press text-[8px] text-accent opacity-0 peer-checked:opacity-100 transition-all duration-500">ON</span>
          </div>
        </label>

        <div className="pt-4">
          <button className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border border-accent bg-accent/10 text-accent hover:bg-accent/30 hover:shadow-[0_0_15px_rgb(var(--color-accent)_/_0.4)] transition-all duration-500 font-secondary text-xs tracking-widest uppercase">
            <Save size={16} /> SAVE CONFIGURATION
          </button>
        </div>
      </div>
    </div>
  );
}