import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export default function AvatarUploader({ profile, onSave }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="relative w-32 h-32 md:w-40 md:h-40 border-2 border-dashed border-[#00f0ff] bg-[#00f0ff]/5 flex items-center justify-center group cursor-pointer hover:bg-[#00f0ff]/10 transition-colors">
        
        {/* Animated Bracket Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f0ff]"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f0ff]"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f0ff]"></div>

        <div className="flex flex-col items-center gap-2 text-[#00f0ff]/70 group-hover:text-[#00f0ff] transition-colors">
          <Upload size={24} />
          <span className="font-secondary text-[9px] md:text-[10px] tracking-widest mt-2">TRANSMIT DATA</span>
        </div>
      </div>
      
      <p className="font-secondary text-[9px] text-[#6a6a9a] tracking-widest text-center leading-loose">
        SUPPORTED: JPG, PNG, GIF<br/>MAX FILE SIZE: 2MB
      </p>
    </div>
  );
}