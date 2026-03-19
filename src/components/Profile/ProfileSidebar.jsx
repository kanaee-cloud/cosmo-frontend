import React from 'react';
import { User, Lock, Palette } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

// ProfileSidebar supports local tab navigation when used inside Profile page.
// If `setActiveTab` prop is provided, it will call that instead of rendering Links.
const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const matrixColor = useThemeStore((s) => s.matrixColor);

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'colors', label: 'Color Presets', icon: Palette }
  ];

  const getStyle = (id) => {
    const isActive = activeTab ? activeTab === id : false;
    if (isActive) {
      return {
        borderColor: matrixColor.hex,
        backgroundColor: `${matrixColor.hex}1A`,
        color: matrixColor.hex,
        boxShadow: `0 0 12px ${matrixColor.hex}33`
      };
    }
    return {
      borderColor: 'rgba(var(--color-light), 0.5)',
      backgroundColor: 'transparent',
      color: '#9ca3af'
    };
  };

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 flex flex-col gap-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} onClick={() => setActiveTab ? setActiveTab(item.id) : null}>
            <div
              role={setActiveTab ? 'button' : undefined}
              tabIndex={setActiveTab ? 0 : undefined}
              className="flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={getStyle(item.id)}
            >
              <Icon size={18} />
              <span className="font-primary text-[10px] tracking-widest mt-0.5 uppercase">{item.label}</span>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default ProfileSidebar;
