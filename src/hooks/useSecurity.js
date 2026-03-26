import { useMutation } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useToastStore } from './useToast'; // Sesuaikan dengan path toast Anda

export const useSecurity = () => {
  const { success, error } = useToastStore();

  const updatePassword = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      // 1. Dapatkan data kapten yang sedang aktif
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Sesi tidak valid. Silakan login ulang.");

      // 2. Verifikasi 'Current Cipher' dengan mencoba login diam-diam
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (verifyError) {
        throw new Error("Current Cipher (Password lama) tidak cocok.");
      }

      // 3. Jika cocok, jalankan Override (Update Password)
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;
      
      return true;
    },
    onSuccess: () => {
      success('SECURITY OVERRIDE', 'Cipher berhasil diperbarui. Akses aman.');
    },
    onError: (err) => {
      error('OVERRIDE FAILED', err.message);
    }
  });

  return { updatePassword };
};