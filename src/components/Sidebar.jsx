import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Skull, Crown } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Mengubah dari inline style menjadi semantic Tailwind classes
  const getNavLinkClass = (path) => {
    let isActive = location.pathname === path;
    
    // Logic deteksi rute aktif
    if (path === '/profile') {
      isActive = isActive || location.pathname === '/dashboard/profile' || location.pathname.startsWith('/profile');
    }
    if (path === '/dashboard/home') {
      isActive = isActive || location.pathname === '/dashboard' || location.pathname === '/dashboard/home';
    }

    // Jika aktif: border dan teks menyala terang (Accent) dengan efek shadow
    if (isActive) {
      return `border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgb(var(--color-accent)_/_0.2)]`;
    }
    
    // Jika tidak aktif: warna redup (Tertiary/Light), menyala saat di-hover
    return `border-tertiary bg-secondary/50 text-light/70 hover:border-accent hover:text-accent`;
  };

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 flex flex-col gap-3">
      <Link to="/dashboard/home">
        <div 
          className={`flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125 ${getNavLinkClass('/dashboard/home')}`}
        >
          <LayoutDashboard size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">COMMAND DECK</span>
        </div>
      </Link>
      
      <Link to="/dashboard/raid-deck">
        <div 
          className={`flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125 ${getNavLinkClass('/dashboard/raid-deck')}`}
        >
          <Skull size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">RAID ARENA</span>
        </div>
      </Link>

      <Link to="/dashboard/leaderboard">
        <div 
          className={`flex items-center gap-3 p-4 border transition-all duration-300 hover:brightness-125 ${getNavLinkClass('/dashboard/leaderboard')}`}
        >
          <Crown size={18} />
          <span className="font-primary text-[10px] tracking-widest mt-0.5">LEADERBOARD</span>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;