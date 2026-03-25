import React from 'react';
import { 
  Calendar,
  Users,
  Trash2,
  Shield,
  Crosshair,
  RefreshCw,
  Key,
  Code,
  FileText,
  TrendingUp,
  Search,
  MessageSquare,
  GitMerge,
  Mail,
  CreditCard,
  PlayCircle,
  Gamepad2,
  Newspaper,
  Palette
} from 'lucide-react';

export default function Matriks() {
  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col p-4 md:p-6 lg:p-8 relative overflow-hidden bg-primary/10">
      
      {/* --- BACKGROUND AMBIENT GLOW (Cosmo Theme) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"></div>

      {/* --- TOP HUD INFO --- */}
      <div className="flex justify-between items-start mb-6 relative z-10 p-4 border border-tertiary/50 bg-secondary/30 shadow-[0_4px_20px_rgb(var(--color-primary))] flex-shrink-0">
        <div className="flex flex-col gap-1 font-secondary text-[10px] tracking-[0.2em] text-light/60 uppercase">
          <p>&gt; SECTOR: G-42</p>
          <p>&gt; OXYGEN: 94%</p>
          <p>&gt; FUEL: OPTIMAL</p>
        </div>

        <div className="border border-red-500/50 bg-red-950/20 px-4 py-2 flex flex-col items-end shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
          <span className="text-red-400 font-secondary text-[10px] tracking-widest uppercase">HAZARD MARQUEE</span>
          <span className="text-red-500/50 font-secondary text-[8px] tracking-widest line-through mt-1">XP TAG #004</span>
        </div>
      </div>

      {/* --- MATRIX CONTAINER (FULL SIZE) --- */}
      <div className="flex-1 relative z-10 mb-6 w-full max-w-screen-2xl mx-auto flex flex-col">
        
        {/* --- HEADER ROW (URGENT / NOT URGENT) --- */}
        {/* pl-[60px] digunakan untuk mengimbangi lebar sidebar kiri agar tetap sejajar (center) dengan tabel di bawahnya */}
        <div className="hidden md:flex flex-row w-full pl-[60px] gap-4 mb-4">
          <div className="flex-1 flex justify-center items-end pb-2">
            <div className="px-8 py-2 border border-red-500/40 bg-red-950/80 font-primary text-[10px] md:text-[11px] tracking-[0.5em] text-red-400 whitespace-nowrap shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-sm">
              URGENT
            </div>
          </div>
          <div className="flex-1 flex justify-center items-end pb-2">
            <div className="px-8 py-2 border border-purple-500/40 bg-purple-950/80 font-primary text-[10px] md:text-[11px] tracking-[0.5em] text-purple-400 whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.15)] rounded-sm">
              NOT URGENT
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-row gap-4">
          
          {/* --- SIDEBAR COLUMN (IMPORTANT / NOT IMPORTANT) --- */}
          <div className="hidden md:flex flex-col w-[44px] gap-4">
            <div className="flex-1 flex justify-center items-center relative pr-2">
              <div className="absolute -rotate-90 px-8 py-2 border border-red-500/40 bg-red-950/80 font-primary text-[10px] md:text-[11px] tracking-[0.5em] text-red-400 whitespace-nowrap shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-sm">
                IMPORTANT
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center relative pr-2">
              <div className="absolute -rotate-90 px-8 py-2 border border-tertiary/50 bg-secondary/90 font-primary text-[10px] md:text-[11px] tracking-[0.5em] text-light/70 whitespace-nowrap shadow-[0_0_20px_rgba(6,255,165,0.1)] rounded-sm">
                NOT IMPORTANT
              </div>
            </div>
          </div>

          {/* --- 2x2 GRID (TABLE CONTENT) --- */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            
            {/* Q1: M1,1 (LAKUKAN SEKARANG) */}
            <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-red-500 bg-red-950/10">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(239,68,68,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-red-400">[ LAKUKAN SEKARANG ]</span>
                <span className="font-primary text-[14px] text-red-400 font-bold">!</span>
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Shield className="text-red-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">FIX BUG NAVIGASI KEBOCORAN BAHAN BAKAR</span>
                  </div>
                  <div className="w-full h-[3px] bg-red-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Crosshair className="text-red-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">TANGGAPI SERANGAN CYBER 'GLITCH-MORPH'</span>
                  </div>
                  <div className="w-full h-[3px] bg-red-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="text-red-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">SINKRONISASI DATALINK SKRIPSI DENGAN CORE</span>
                  </div>
                  <div className="w-full h-[3px] bg-red-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Key className="text-red-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">CEK KREDENTIAL AKSES ROOT ARMADA</span>
                  </div>
                  <div className="w-full h-[3px] bg-red-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q2: M1,2 (RENCANAKAN) */}
            <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-purple-500 bg-purple-950/10">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(168,85,247,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-purple-400">[ RENCANAKAN ]</span>
                <Calendar className="text-purple-400" size={16} />
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Code className="text-purple-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">PELAJARI REACT HOOKS (USEEFFECT, USECONTEXT)</span>
                  </div>
                  <div className="w-full h-[3px] bg-purple-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <FileText className="text-purple-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">BUAT DOKUMEN ARSITEKTUR 'CORE SYSTEM V2'</span>
                  </div>
                  <div className="w-full h-[3px] bg-purple-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="text-purple-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">REVIEW PROGRESS FITUR 'FLEET COMBAT'</span>
                  </div>
                  <div className="w-full h-[3px] bg-purple-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Search className="text-purple-400" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider">ANALISIS DATAMINE HASIL SCANNING GALAXY</span>
                  </div>
                  <div className="w-full h-[3px] bg-purple-950/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q3: M2,1 (OPER / DELEGASIKAN) */}
            <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-tertiary bg-secondary/20">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,255,165,0.01)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-light/70">[ OPER / DELEGASIKAN ]</span>
                <Users className="text-light/70" size={16} />
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="text-light/50" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/70 uppercase tracking-wider">BALAS CHAT KOMUNITAS GALAXY - FORUM</span>
                  </div>
                  <div className="w-full h-[3px] bg-primary/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-tertiary/50" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <GitMerge className="text-light/50" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/70 uppercase tracking-wider">REVIEW MERGE REQUEST KECIL DELEGASI</span>
                  </div>
                  <div className="w-full h-[3px] bg-primary/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-tertiary/50" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Mail className="text-light/50" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/70 uppercase tracking-wider">JAWAB EMAIL GANGGUAN SENSOR</span>
                  </div>
                  <div className="w-full h-[3px] bg-primary/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-tertiary/50" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-light/50" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/70 uppercase tracking-wider">VERIFIKASI PEMBAYARAN KREDIT GALAXY</span>
                  </div>
                  <div className="w-full h-[3px] bg-primary/50 relative">
                    <div className="absolute top-0 left-0 h-full bg-tertiary/50" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q4: M2,2 (HAPUS / ABAIKAN) */}
            <div className="relative flex flex-col p-6 border border-tertiary/10 border-t-[3px] border-t-tertiary/20 bg-primary/30 opacity-70">
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-light/40">[ HAPUS / ABAIKAN ]</span>
                <Trash2 className="text-light/40" size={16} />
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="text-light/30" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/40 uppercase tracking-wider">NONTON VIDEO KUCING LUAR ANGKASA (TUTORIAL NO-OP)</span>
                  </div>
                  <div className="w-full h-[3px] bg-black/40"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="text-light/30" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/40 uppercase tracking-wider">MAINKAN DEMO GAME 'CHRONO-BREAK' BARU</span>
                  </div>
                  <div className="w-full h-[3px] bg-black/40"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Newspaper className="text-light/30" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/40 uppercase tracking-wider">BACA ARTIKEL GOSIP CELEBRITY GALACTIC</span>
                  </div>
                  <div className="w-full h-[3px] bg-black/40"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Palette className="text-light/30" size={14} />
                    <span className="font-secondary text-[9px] md:text-[10px] text-light/40 uppercase tracking-wider">DEKORASI KAMAR KAPTAIN - GANTI TEMA WARNA</span>
                  </div>
                  <div className="w-full h-[3px] bg-black/40"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- BOTTOM LOG BAR --- */}
      <div className="relative z-10 border border-tertiary bg-secondary px-6 py-3 shadow-[0_4px_20px_rgb(var(--color-primary))] flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          
          <div className="flex items-center gap-2">
            <span className="font-secondary text-light/70 text-[9px] tracking-widest uppercase">
              SYSTEM LOG: ACTIVE TASK IN Q1
            </span>
            <span className="font-secondary text-light/40 text-[9px] tracking-widest uppercase ml-2 hidden lg:inline">
              INIT_TASK_SCAN... OK | CALIBRATING_URGENCY... COMPLETE | MATRIX_RENDERED_V1.0.4
            </span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <span className="font-secondary text-accent text-[9px] tracking-[0.2em] uppercase">
            XP: 14,200
          </span>
          <span className="font-secondary text-light text-[9px] tracking-[0.2em] uppercase">
            CREDITS: 420.69
          </span>
        </div>
      </div>

    </div>
  );
}