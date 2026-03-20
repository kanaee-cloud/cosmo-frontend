import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom'; // IMPOR INI
import { useProfileSettings } from '../hooks/useProfileSettings';
import { useThemeStore } from '../store/themeStore';

import { ProfileTitle } from '../components/Profile/ProfileTitle';
import { UserInfoHeader } from '../components/Profile/UserInfoHeader';
import ProfileSidebar from '../components/Profile/ProfileSidebar';

export default function Profile() {
  const { 
    profile, updateName, level, currentExp, 
    lastLogin, accountCreated 
  } = useProfileSettings();

  const matrixColor = useThemeStore((state) => state.matrixColor);
  const themeBorder = '#7a5299';
  const themeBg = '#0a0514';

  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');

  // Sinkronisasi displayName saat data profil dari DB tiba
  useEffect(() => {
    const name = profile?.username || profile?.user_name || 'UNKNOWN OPERATOR';
    setDisplayName(name);
  }, [profile]);

  return (
    <div className="min-h-screen w-full p-4 md:p-6 flex justify-center items-start bg-primary text-text">
      
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
              <ProfileSidebar />
            </div>

            {/* AREA KONTEN UTAMA */}
            <div className="flex-1 w-full min-w-0 h-full">
              
              {/* OUTLET menggantikan activeTab.
                Komponen akan otomatis dirender berdasarkan URL (cth: /profile/account)
                Kita gunakan 'context' untuk mengirim data ke komponen anak
              */}
              <Outlet context={{
                profile, displayName, setDisplayName, level, currentExp,
                lastLogin, accountCreated, themeBorder, themeBg, updateName
              }} />

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}