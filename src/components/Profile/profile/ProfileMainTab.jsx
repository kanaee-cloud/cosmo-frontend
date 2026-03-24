import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, X, Edit2, Shield, Rocket, Radar, Crown, Lock } from 'lucide-react';

import { ProfileDetailsCard } from './ProfileDetailsCard';
import { OperatorStatus } from './OperatorStatus';
import { AccessLog } from './AccessLog';
import AvatarUploader from './AvatarUploader';
import Achievements from './Achievements';

// MOCK DATA: Diganti menggunakan komponen Lucide React
const MOCK_BADGES = [
  { id: 1, icon: <Shield size={20} />, name: 'DEFENDER', locked: false },
  { id: 2, icon: <Rocket size={20} />, name: 'SPEEDSTER', locked: false },
  { id: 3, icon: <Radar size={20} />, name: 'UFO HUNTER', locked: false },
  { id: 4, icon: <Crown size={20} />, name: 'SUPREME', locked: false },
  { id: 5, icon: <Lock size={20} className="text-light/30" />, name: 'LOCKED', locked: true },
  { id: 6, icon: <Lock size={20} className="text-light/30" />, name: 'LOCKED', locked: true },
  { id: 7, icon: <Lock size={20} className="text-light/30" />, name: 'LOCKED', locked: true },
  { id: 8, icon: <Lock size={20} className="text-light/30" />, name: 'LOCKED', locked: true },
  { id: 9, icon: <Lock size={20} className="text-light/30" />, name: 'LOCKED', locked: true },
];

export default function ProfileMainTab() {
  const { 
    profile, displayName, setDisplayName, level, currentExp, 
    lastLogin, accountCreated, updateName 
  } = useOutletContext();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);
  const [selectedBadgeIds, setSelectedBadgeIds] = useState([1, 2, 3]);
  const [currentAvatar, setCurrentAvatar] = useState(profile?.avatar_url || 'bot');

  const handleSelectAvatar = (newAvatar) => {
    setCurrentAvatar(newAvatar);
  };

  const displayBadges = MOCK_BADGES.filter(b => selectedBadgeIds.includes(b.id));

  const handleToggleBadge = (badge) => {
    if (badge.locked) return;
    if (selectedBadgeIds.includes(badge.id)) {
      setSelectedBadgeIds(prev => prev.filter(id => id !== badge.id));
    } else {
      setSelectedBadgeIds(prev => {
        if (prev.length >= 3) { return [...prev.slice(1), badge.id]; }
        return [...prev, badge.id];
      });
    }
  };

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
      className="border-2 border-tertiary bg-primary p-4 md:p-5 flex flex-col shadow-[0_0_30px_rgb(var(--color-tertiary)_/_0.15)] h-full min-h-[500px] transition-colors duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full items-stretch">
        
        {/* --- KIRI: LOG KAPTEN DKK --- */}
        <div className="border border-tertiary flex flex-col relative bg-secondary h-full transition-colors duration-500">
          <ProfileDetailsCard
            currentAvatar={currentAvatar} 
            displayName={displayName}
            level={level}
            currentExp={currentExp}
            displayBadges={displayBadges}
          />
          <OperatorStatus currentExp={currentExp} />
          <AccessLog lastLogin={lastLogin} accountCreated={accountCreated} />
        </div>

        {/* --- TENGAH: AVATAR & EDIT NAME --- */}
        <div className="flex flex-col items-center justify-start p-6 border border-tertiary transition-all duration-500 relative h-full">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgb(var(--color-light)_/_0.03)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
          
          <div className="relative z-10 w-full flex flex-col items-center gap-8 flex-1">
            <div className="w-full">
              <h3 className="text-center font-secondary text-light text-sm tracking-widest uppercase mb-5 border-b border-tertiary pb-2 transition-colors duration-500">
                RECONFIGURE VISUALS
              </h3>
              
              <AvatarUploader 
                currentAvatar={currentAvatar} 
                onSelectAvatar={handleSelectAvatar} 
              />
            </div>

            <div className="w-full border-t border-tertiary pt-6 mt-auto transition-colors duration-500">
              <h3 className="text-center font-secondary text-light text-xs tracking-widest uppercase mb-4 transition-colors duration-500">
                RECONFIGURE IDENTITY
              </h3>
              
              {!isEditingName ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="font-press text-xs md:text-sm text-light text-center uppercase break-all transition-colors duration-500">
                    {displayName}
                  </div>
                  <button
                    onClick={handleEditName}
                    className="flex items-center gap-2 px-6 py-2 border border-accent text-accent hover:bg-accent/10 transition-colors duration-500 font-secondary text-[10px] tracking-widest mt-2"
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
                    className="w-full px-3 py-3 border border-light bg-transparent font-press text-xs text-light focus:outline-none text-center uppercase shadow-[0_0_10px_rgb(var(--color-light)_/_0.2)] transition-colors duration-500"
                    placeholder="ENTER ID..."
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSaveName} disabled={updateName?.isPending} className="flex-1 flex justify-center items-center gap-2 py-2 border border-light bg-light/10 text-light hover:bg-light/30 font-secondary text-[10px] transition-colors duration-500">
                      <Check size={14} /> {updateName?.isPending ? 'UPLINK...' : 'CONFIRM'}
                    </button>
                    <button onClick={handleCancelEdit} className="flex-1 flex justify-center items-center gap-2 py-2 border border-accent bg-accent/10 text-accent hover:bg-accent/30 font-secondary text-[10px] transition-colors duration-500">
                      <X size={14} /> CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- KANAN: ACHIEVEMENTS --- */}
        <Achievements 
          badges={MOCK_BADGES} 
          selectedBadgeIds={selectedBadgeIds} 
          onToggleBadge={handleToggleBadge} 
        />

      </div>
    </div>
  );
}