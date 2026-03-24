import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthenticationPage = () => {
  
  return (
    // Wrapper Halaman Utama (Full Screen)
    <div className="relative min-h-screen bg-[#030305] flex items-center justify-center overflow-hidden font-sans text-gray-200">
      

      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      {/* Aurora Ungu/Pink (Kanan Bawah) */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-sm bg-[#0a0a10]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        
        {/* Ikon Perisai */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl"></div>
          <div className="relative bg-[#050508] border border-emerald-400/50 rounded-full p-4 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
            <ShieldCheck className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Teks Status */}
        <h2 className="text-xl font-bold tracking-[0.2em] text-emerald-400 mb-6 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
          OTENTIKASI<br />BERHASIL
        </h2>

        {/* Garis Pemisah Tipis */}
        <div className="w-16 h-[1px] bg-emerald-800/50 mb-6"></div>

        {/* Pesan Sambutan */}
        <div className="mb-8 space-y-1.5">
          <p className="text-[#a1a1aa] text-sm font-medium">
            Selamat datang kembali, Kapten.
          </p>
          <p className="text-[#71717a] text-xs italic">
            Akses ke Deck Komando telah dibuka.
          </p>
        </div>

        {/* Tombol Aksi (Ungu/Fuchsia) */}
        <Link to="/dashboard/home" 
          
          className="w-full py-3 px-4 bg-[#1a0b26]/50 hover:bg-[#2d1242]/80 border border-fuchsia-500/40 rounded-lg text-white text-xs font-bold tracking-[0.15em] transition-all duration-300 shadow-[0_0_15px_rgba(217,70,239,0.15)] hover:shadow-[0_0_25px_rgba(217,70,239,0.3)] mb-6"
        >
          MASUK KE DECK
        </Link>

        {/* Info Sistem */}
        <div className="w-full flex justify-between items-center text-[9px] text-gray-500 font-mono tracking-widest border-t border-white/5 pt-4">
          <span>SYSTEM: ACTIVE</span>
          <span>SECURE PROTOCOL: V8.4</span>
        </div>
      </div>
      {/* ----------------------- */}

      {/* --- FOOTER KONEKSI TERMINAL --- */}
      <div className="absolute bottom-6 flex gap-8 text-[9px] text-emerald-500/40 font-mono tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span>
          CRYPTO_LINK: ESTABLISHED
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span>
          ENCRYPTION: RSA_4096
        </div>
      </div>
      {/* ------------------------------- */}

    </div>
  );
};

export default AuthenticationPage;