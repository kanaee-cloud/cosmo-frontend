import { ArrowLeft, Command } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CyberButton from '../ui/CyberButton';

export default function ProfileSidebar() {
  const getNavClass = ({ isActive }) => 
    `p-4 border border-tertiary font-primary tracking-widest text-xs uppercase transition-all duration-500 block text-center lg:text-left ${
      isActive 
        ? 'bg-accent/20 text-accent border-accent shadow-[0_0_10px_rgb(var(--color-accent)_/_0.2)]' 
        : 'bg-secondary text-light hover:bg-tertiary hover:border-light/50'
    }`;

  return (
    <div className="flex flex-col gap-3">
      <NavLink to="/profile/account" className={getNavClass}>
        [ Setting ]
      </NavLink>
      
      <NavLink to="/profile/privacy" className={getNavClass}>
        [ Privacy ]
      </NavLink>
      
      <NavLink to="/profile/color-presets" className={getNavClass}>
        [ Theme ]
      </NavLink>

      <div className="mt-4 pt-4 border-t border-white/10">
        <CyberButton 
          to="/dashboard/home" 
          text="DASHBOARD" 
          subText="Return to" 
          icon={ArrowLeft}
        />
      </div>
    </div>
  );
}