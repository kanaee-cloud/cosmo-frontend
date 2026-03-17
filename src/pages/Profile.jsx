import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProfileSettings } from '../hooks/useProfileSettings';
import { useThemeStore } from '../store/themeStore';
import { ProfileTitle } from '../components/Profile/ProfileTitle';
import { UserInfoHeader } from '../components/Profile/UserInfoHeader';
import { ProfileDetailsCard } from '../components/Profile/ProfileDetailsCard';
import { ColorMatrixSelector } from '../components/Profile/ColorMatrixSelector';
import { OperatorStatus } from '../components/Profile/OperatorStatus';
import { AccessLog } from '../components/Profile/AccessLog';

export default function Profile() {
  
  // Tarik mesin logika dari Hook
  const { 
    profile, updateName, level, currentExp, 
    userEmail, displayId, accountCreated, lastLogin 
  } = useProfileSettings();

  const matrixColor = useThemeStore((state) => state.matrixColor);
  const setMatrixColor = useThemeStore((state) => state.setMatrixColor);

  // State UI
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');
  const [tempName, setTempName] = useState('');

  // Sinkronisasi displayName saat data profil dari DB tiba
  useEffect(() => {
    const name = profile?.username || profile?.user_name || 'UNKNOWN OPERATOR';
    setDisplayName(name);
    setTempName(name);
  }, [profile]);

  const handleEditName = () => {
    setTempName(displayName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    const newName = tempName.trim().toUpperCase(); // Changed to UPPERCASE to match previous behavior
    
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
      className="min-h-screen w-full p-6 md:p-8 overflow-auto transition-all duration-500"
    >
      {/* Background glow effect */}
      <div 
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: matrixColor.hex, filter: `blur(120px)` }}
      />

      {/* Main Container */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <ProfileTitle matrixColor={matrixColor} />

        {/* Header dengan Nama Dinamis */}
        <UserInfoHeader 
          displayName={displayName} 
          level={level} 
          profile={profile} 
          matrixColor={matrixColor} 
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Card */}
          <ProfileDetailsCard
              matrixColor={matrixColor}
              profile={profile}
              displayName={displayName}
              userEmail={userEmail}
              displayId={displayId}
              isEditingName={isEditingName}
              tempName={tempName}
              setTempName={setTempName}
              handleEditName={handleEditName}
              handleSaveName={handleSaveName}
              handleCancelEdit={handleCancelEdit}
              updateName={updateName}
          />

          {/* Right Column - Stats & Colors */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Color Palette */}
            <ColorMatrixSelector 
              matrixColor={matrixColor}
              setMatrixColor={setMatrixColor}
            />

            {/* Stats Panel */}
            <OperatorStatus 
              matrixColor={matrixColor}
              currentExp={currentExp}
            />

            {/* Access Log */}
            <AccessLog 
              matrixColor={matrixColor}
              lastLogin={lastLogin}
              accountCreated={accountCreated}
            />

          </div>
        </div>
      </motion.div>
    </div>
  );
}
