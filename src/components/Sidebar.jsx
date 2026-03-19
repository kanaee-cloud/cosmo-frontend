import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Skull, User, Crown } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Sidebar = () => {
  const location = useLocation();
  const matrixColor = useThemeStore((state) => state.matrixColor);

  const getNavLinkStyle = (path) => {
    // handle legacy /dashboard/profile and new /profile path
    let isActive = location.pathname === path;
    if (path === '/profile') {
      isActive = isActive || location.pathname === '/dashboard/profile' || location.pathname.startsWith('/profile');
    }
    if (path === '/dashboard/home') {
      isActive = isActive || location.pathname === '/dashboard' || location.pathname === '/dashboard/home';
    }
    if (isActive) {
      return {
        borderColor: matrixColor.hex,
        backgroundColor: `${matrixColor.hex}1A`, // ~10% opacity
        color: matrixColor.hex,
        boxShadow: `0 0 15px ${matrixColor.hex}33`
      };
    }
    return {
      borderColor: 'rgba(var(--color-light), 0.5)',
      backgroundColor: 'rgba(var(--color-primary), 0.5)',
      color: '#6b7280'
    };
  };

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 flex flex-col gap-3">
      <Link to="/dashboard/home">
        <div 
          className="flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125"
          style={getNavLinkStyle('/dashboard/home')}
        >
          <LayoutDashboard size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">COMMAND DECK</span>
        </div>
      </Link>
      
      <Link to="/dashboard/raid-deck">
        <div 
          className="flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125"
          style={getNavLinkStyle('/dashboard/raid-deck')}
        >
          <Skull size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">RAID ARENA</span>
        </div>
      </Link>

      {/* Profile link removed from dashboard sidebar per request */}

      <Link to="/dashboard/leaderboard">
        <div 
          className="flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125"
          style={getNavLinkStyle('/dashboard/leaderboard')}
        >
          <Crown size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">LEADERBOARD</span>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
