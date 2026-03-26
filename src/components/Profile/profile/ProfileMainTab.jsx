import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, X, Edit2 } from 'lucide-react';

import { ProfileDetailsCard } from './ProfileDetailsCard';
import { OperatorStatus } from './OperatorStatus';
import { AccessLog } from './AccessLog';
import AvatarUploader from './AvatarUploader';
import Achievements from './Achievements';

import { useAchievements } from '../../../hooks/useAchievements';

export default function ProfileMainTab() {
  const { 
    profile, displayName, setDisplayName, level, currentExp, 
    lastLogin, accountCreated, updateName, updateAvatar // <-- Tarik dari OutletContext
  } = useOutletContext();

  const { useUserAchievements, equipBadges } = useAchievements();
  const { data: allAchievements = [] } = useUserAchievements();
  const badges = allAchievements.filter(a => a.type === 'BADGE');

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);
  const storedAvatar = localStorage.getItem('cosmo-user-avatar');
  const initialAvatar = profile?.avatar_url || storedAvatar || 'bot';
  const [currentAvatar, setCurrentAvatar] = useState(initialAvatar);
  const timeoutRef = useRef(null);
  const [selectedBadgeIds, setSelectedBadgeIds] = useState([]);

  // Sinkronisasi badge yang sedang dipakai
  useEffect(() => {
    if (badges.length > 0) {
      const equipped = badges.filter(b => b.isEquipped).map(b => b.id);
      setSelectedBadgeIds(equipped);
    }
  }, [allAchievements]);

  // SINKRONISASI AVATAR DARI DATABASE KE UI SAAT HALAMAN DIMUAT/DI-REFRESH
  useEffect(() => {
    if (profile?.avatar_url) {
      setCurrentAvatar(profile.avatar_url);
      localStorage.setItem('cosmo-user-avatar', profile.avatar_url);
    }
  }, [profile?.avatar_url]);

  const handleSelectAvatar = (newAvatar) => {
    if (currentAvatar === newAvatar) return; // Cegah klik avatar yang sudah aktif

    setCurrentAvatar(newAvatar); // Ganti gambar di layar secara instan
    localStorage.setItem('cosmo-user-avatar', newAvatar); // Simpan local
    
    // Clear debounce timer sebelumnya jika ada spam klik
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timer baru untuk simpan ke database setelah user diam selama 1 detik
    timeoutRef.current = setTimeout(() => {
      if (updateAvatar) {
        updateAvatar.mutate(newAvatar);
      }
    }, 1000);
  };

  const displayBadges = badges.filter(b => selectedBadgeIds.includes(b.id));

  const handleToggleBadge = (badge) => {
    if (badge.isLocked) return;

    let newSelection;
    if (selectedBadgeIds.includes(badge.id)) {
      newSelection = selectedBadgeIds.filter(id => id !== badge.id);
    } else {
      if (selectedBadgeIds.length >= 3) { 
        newSelection = [...selectedBadgeIds.slice(1), badge.id]; 
      } else {
        newSelection = [...selectedBadgeIds, badge.id];
      }
    }
    
    setSelectedBadgeIds(newSelection); 
    equipBadges.mutate(newSelection);  
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
    <div className="border-2 border-tertiary bg-primary p-4 md:p-5 flex flex-col shadow-[0_0_30px_rgb(var(--color-tertiary)_/_0.15)] h-full min-h-[500px] transition-colors duration-500">
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
            {/* --- VISUALS BLOCK KEMBALI DI ATAS --- */}
            <div className="w-full">
              <h3 className="text-center font-secondary text-light text-sm tracking-widest uppercase mb-4 border-b border-tertiary pb-2 transition-colors duration-500">
                RECONFIGURE VISUALS
              </h3>
              
              <AvatarUploader 
                currentAvatar={currentAvatar} 
                onSelectAvatar={handleSelectAvatar} 
              />
            </div>

            {/* --- IDENTITY BLOCK LEBIH DEKAT (TANPA mt-auto) --- */}
            <div className="w-full border-t border-tertiary pt-6 mt-6 mb-auto transition-colors duration-500">
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
                    <button onClick={handleCancelEdit} className="flex-1 flex justify-center items-center gap-2 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 font-secondary text-[10px] transition-colors duration-500">
                      <X size={14} /> ABORT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- KANAN: ACHIEVEMENTS / BADGES GALLERY --- */}
        <Achievements 
          achievements={badges} 
          selectedBadgeIds={selectedBadgeIds} 
          onToggleBadge={handleToggleBadge} 
        />

      </div>
    </div>
  );
}