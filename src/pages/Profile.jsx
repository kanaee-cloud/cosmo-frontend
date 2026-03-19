import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProfileSettings } from '../hooks/useProfileSettings';
import { useThemeStore } from '../store/themeStore';

import { ProfileTitle } from '../components/Profile/ProfileTitle';
import { UserInfoHeader } from '../components/Profile/UserInfoHeader';
import ProfileSidebar from '../components/Profile/ProfileSidebar';

import ProfileMainTab from '../components/Profile/profile/ProfileMainTab';
import ChangePassword from '../components/Profile/privacy/ChangePassword';
import DeleteAccount from '../components/Profile/privacy/DeleteAccount';
import ColorPresets from '../components/Profile/presets/ColorPresets';

export default function Profile() {
  const { 
    profile, updateName, level, currentExp, 
    lastLogin, accountCreated 
  } = useProfileSettings();

  const matrixColor = useThemeStore((state) => state.matrixColor);
  const setMatrixColor = useThemeStore((state) => state.setMatrixColor);

  const themeBorder = '#7a5299';
  const themeBg = '#0a0514';

  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');

  // Sinkronisasi displayName saat data profil dari DB tiba
  useEffect(() => {
    const name = profile?.username || profile?.user_name || 'UNKNOWN OPERATOR';
    setDisplayName(name);
  }, [profile]);

  return (
    <div className="min-h-screen w-full p-4 md:p-6 flex justify-center items-start bg-[#05020a] text-gray-200">
      
      <motion.div 
        className="w-full relative z-10"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col gap-6">
          
          <div className="flex flex-col gap-4">
            <ProfileTitle matrixColor={matrixColor} />
            <UserInfoHeader 
              displayName={displayName} 
              level={level} 
              profile={profile} 
              matrixColor={matrixColor} 
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            
            {/* SIDEBAR */}
            <div className="w-full lg:w-[260px] shrink-0">
              <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* AREA KONTEN UTAMA */}
            <div className="flex-1 w-full min-w-0 h-full">
              
              {activeTab === 'profile' && (
                <ProfileMainTab 
                  profile={profile}
                  displayName={displayName}
                  setDisplayName={setDisplayName}
                  level={level}
                  currentExp={currentExp}
                  lastLogin={lastLogin}
                  accountCreated={accountCreated}
                  themeBorder={themeBorder}
                  themeBg={themeBg}
                  updateName={updateName}
                />
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <ChangePassword />
                  <DeleteAccount />
                </div>
              )}

              {activeTab === 'colors' && (
                <ColorPresets 
                  matrixColor={matrixColor} 
                  setMatrixColor={setMatrixColor} 
                />
              )}

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}