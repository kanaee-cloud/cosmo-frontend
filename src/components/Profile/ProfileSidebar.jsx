import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  // Fungsi untuk mengatur gaya tombol berdasarkan status aktif dari URL
  const getNavClass = ({ isActive }) => 
    `p-4 border border-[#3b2b5a] font-secondary tracking-widest text-xs uppercase transition-colors block text-center lg:text-left ${
      isActive 
        ? 'bg-[#ff0055]/20 text-[#ff0055] border-[#ff0055] shadow-[0_0_10px_rgba(255,0,85,0.2)]' 
        : 'bg-[#0a0514] text-[#c9bfe6] hover:bg-[#3b2b5a]/50 hover:border-[#7a5299]'
    }`;

  return (
    <div className="flex flex-col gap-3">
      {/* Mengarah ke /profile/account (ProfileMainTab) */}
      <NavLink to="/profile/account" className={getNavClass}>
        [ Setting ]
      </NavLink>
      
      {/* Mengarah ke /profile/privacy (PrivacyTab) */}
      <NavLink to="/profile/privacy" className={getNavClass}>
        [ Privacy ]
      </NavLink>
      
      {/* Mengarah ke /profile/color-presets (ColorPresets) */}
      <NavLink to="/profile/color-presets" className={getNavClass}>
        [ Theme ]
      </NavLink>
    </div>
  );
}