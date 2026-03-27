import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // 1. Ekstrak data & perbarui state saat OAuth redirect ke rute ini (#access_token=...)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      
      if (event === 'SIGNED_IN' && session) {
        try {
          // 2. Karena user Google OAuth baru mungkin belum ada di tabel `users` (hanya di tabel auth),
          // kita cek dulu apakah profil mereka sudah terbuat. Jika belum, kita insert.
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('id', session.user.id)
            .single();

          if (!existingUser) {
            const userName = session.user.user_metadata?.full_name || session.user.user_metadata?.user_name || session.user.email.split('@')[0];
            const avatarUrl = session.user.user_metadata?.avatar_url || null;

            await supabase.from('users').insert([{
              id: session.user.id,
              username: userName,
              email: session.user.email,
              avatar_url: avatarUrl
            }]);
          }

          // 3. Panggil method initialize dari authStore untuk menarik ulang data Profile terbaru
          await useAuthStore.getState().initialize();
          
          // Selesai memproses
          setIsProcessing(false);
          
          // Auto-redirect setelah 2.5 detik
          setTimeout(() => {
            navigate('/dashboard/home');
          }, 2500);

        } catch (err) {
          console.error("Auth processing error:", err);
          setAuthError(err.message);
          setIsProcessing(false);
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    // Timeout pengaman (jika user kesasar ke /success tanpa token)
    const safetyTimer = setTimeout(() => {
      if (isProcessing) {
        if (!useAuthStore.getState().session) {
          navigate('/login');
        } else {
          setIsProcessing(false);
        }
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, [navigate, isProcessing]);

  return (
    // Wrapper Halaman Utama (Full Screen)
    <div className="relative min-h-screen bg-[#030305] flex items-center justify-center overflow-hidden font-sans text-gray-200">
      
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      {/* Aurora Ungu/Pink (Kanan Bawah) */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-sm bg-[#0a0a10]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        
        {isProcessing ? (
          // --- LOADING STATE ---
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-6" />
            <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-400/80 mb-2">
              DECRYPTING DATA...
            </h2>
            <p className="text-[#71717a] text-xs font-mono">ESTABLISHING SECURE LINK</p>
          </div>
        ) : authError ? (
          // --- ERROR STATE ---
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-red-500/50 bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-red-500 text-xl font-bold">!</span>
            </div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-red-500 mb-2">
              AUTH FAILED
            </h2>
            <p className="text-[#71717a] text-xs mb-6">{authError}</p>
            <Link to="/login" className="w-full py-2 px-4 border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs tracking-widest font-bold">
              RETURN TO LOGIN
            </Link>
          </div>
        ) : (
          // --- SUCCESS STATE (Asli) ---
          <>
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
          </>
        )}

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