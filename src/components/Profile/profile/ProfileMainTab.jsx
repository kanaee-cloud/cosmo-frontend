import { useState } from 'react';
import { Check, X, Edit2 } from 'lucide-react';

import { ProfileDetailsCard } from './ProfileDetailsCard';
import { OperatorStatus } from './OperatorStatus';
import { AccessLog } from './AccessLog';
import AvatarUploader from './AvatarUploader';
import Achievements from './Achievements';

export default function ProfileMainTab({ 
  profile, 
  displayName, 
  setDisplayName, 
  level, 
  currentExp, 
  lastLogin, 
  accountCreated, 
  themeBorder, 
  themeBg, 
  updateName 
}) {
  // State khusus edit nama dipindah ke sini agar komponen induk tetap bersih
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  const handleEditName = () => {
    setTempName(displayName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    const newName = tempName.trim().toUpperCase();
    
    if (newName === displayName) {
      setIsEditingName(false);
      return;
    }

    updateName.mutate(newName, {
      onSuccess: () => {
        setDisplayName(newName);
        setIsEditingName(false);
      },
      onError: (err) => {
        alert(`TRANSMISSION ERROR: ${err.message}`);
      }
    });
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setTempName(displayName);
  };

  return (
    <div 
      className="border-2 p-4 md:p-5 flex flex-col shadow-[0_0_30px_rgba(122,82,153,0.15)] h-full min-h-[500px]"
      style={{ borderColor: themeBorder, backgroundColor: themeBg }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full items-stretch">
        
        {/* --- KIRI: UNIFIED CARD --- */}
        <div 
          className="border flex flex-col relative bg-[#07030e] h-full"
          style={{ borderColor: themeBorder }}
        >
          <ProfileDetailsCard
            profile={profile}
            displayName={displayName}
            level={level}
            currentExp={currentExp}
          />
          <OperatorStatus currentExp={currentExp} />
          <AccessLog lastLogin={lastLogin} accountCreated={accountCreated} />
        </div>

        {/* --- TENGAH: UPLOAD & EDIT NAME --- */}
        <div 
          className="flex flex-col items-center justify-center p-6 border transition-all duration-300 relative h-full"
          style={{ borderColor: themeBorder }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          
          <div className="relative z-10 w-full flex flex-col items-center gap-8">
            <div className="w-full">
              <h3 className="text-center font-secondary text-[#c9bfe6] text-xs tracking-widest uppercase mb-4">
                UPLOAD VISUAL DATA
              </h3>
              <AvatarUploader profile={profile} />
            </div>

            <div className="w-full border-t border-[#3b2b5a] pt-6">
              <h3 className="text-center font-secondary text-[#c9bfe6] text-xs tracking-widest uppercase mb-4">
                RECONFIGURE IDENTITY
              </h3>
              
              {!isEditingName ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="font-press text-xs md:text-sm text-[#00f0ff] text-center uppercase break-all">
                    {displayName}
                  </div>
                  <button
                    onClick={handleEditName}
                    className="flex items-center gap-2 px-6 py-2 border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055]/10 transition-colors font-secondary text-[10px] tracking-widest mt-2"
                  >
                    <Edit2 size={12} /> EDIT ID
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 w-full max-w-[250px] mx-auto">
                  <input
                    type="text" 
                    value={tempName} 
                    onChange={(e) => setTempName(e.target.value.toLowerCase())}
                    maxLength={20} 
                    autoFocus
                    className="w-full px-3 py-3 border border-[#00f0ff] bg-transparent font-press text-xs text-[#00f0ff] focus:outline-none text-center uppercase shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    placeholder="ENTER ID..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName} 
                      disabled={updateName?.isPending}
                      className="flex-1 flex justify-center items-center gap-2 py-2 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/30 font-secondary text-[10px]"
                    >
                      <Check size={14} /> {updateName?.isPending ? 'UPLINK...' : 'CONFIRM'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 flex justify-center items-center gap-2 py-2 border border-[#ff0055] bg-[#ff0055]/10 text-[#ff0055] hover:bg-[#ff0055]/30 font-secondary text-[10px]"
                    >
                      <X size={14} /> CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- KANAN: ACHIEVEMENTS --- */}
        <Achievements themeBorder={themeBorder} />

      </div>
    </div>
  );
}