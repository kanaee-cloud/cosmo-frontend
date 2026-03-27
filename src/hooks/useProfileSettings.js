import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from './useToast'; 

export const useProfileSettings = () => {
  const queryClient = useQueryClient();
  const { session, profile: storeProfile, setProfile } = useAuthStore();
  const { success, error: showError } = useToastStore(); 
  const userId = session?.user?.id;

  // 1. Ambil Data Aktual dari Tabel Users
  const { data: profile, isLoading } = useQuery({
    queryKey: ['captainProfile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
    initialData: storeProfile 
  });

  // 2. Mutasi Update Nama 
  const updateName = useMutation({
    mutationFn: async (newName) => {
      const { error: authError } = await supabase.auth.updateUser({
        data: { username: newName }
      });
      if (authError) throw authError;

      const { data, error: dbError } = await supabase
        .from('users')
        .update({ username: newName })
        .eq('id', userId)
        .select()
        .single();
      
      if (dbError) throw dbError;
      return data;
    },
    onSuccess: (data) => {
      setProfile(data); 
      queryClient.invalidateQueries({ queryKey: ['captainProfile', userId] });
      success('IDENTITY RECONFIGURED', 'Identitas Kapten berhasil diperbarui.');
    },
    onError: (err) => {
      showError('RECONFIGURATION FAILED', err.message);
    }
  });

  // 3. Mutasi Update Password 
  const updatePassword = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Sesi tidak valid. Silakan login ulang.");

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (verifyError) throw new Error("Current Cipher (Password lama) tidak cocok.");

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
      showError('OVERRIDE FAILED', err.message);
    }
  });

  // 4. Mutasi Update Avatar (BARU DITAMBAHKAN)
  const updateAvatar = useMutation({
    mutationFn: async (newAvatar) => {
      await supabase.auth.updateUser({
        data: { avatar_url: newAvatar }
      });

      const { data, error } = await supabase
        .from('users')
        .update({ avatar_url: newAvatar })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setProfile(data); 
      queryClient.invalidateQueries({ queryKey: ['captainProfile', userId] });
    },
    onError: (err) => {
      showError('UPDATE FAILED', err.message);
    }
  });

  const deleteAccount = useMutation({
    mutationFn: async () => {
      // 1. Panggil fungsi penghancur di database
      const { error } = await supabase.rpc('delete_user');
      if (error) throw new Error("Gagal menginisiasi protokol penghancuran: " + error.message);
      
      // 2. Sign out via authStore (handles both signOut + state cleanup)
      await useAuthStore.getState().logout();
    },
    onSuccess: () => {
      setProfile(null);
      success('ACCOUNT TERMINATED', 'Data Kapten telah dihapus permanen dari mainframe.');
      // Catatan: Setelah ini state session menjadi null, dan Navbar/Router akan otomatis melempar Anda ke halaman Login.
    },
    onError: (err) => {
      showError('TERMINATION FAILED', err.message);
    }
  });

  // 5. Kalkulasi Data Dinamis
  const currentExp = profile?.fuel_cells || 0;
  const level = Math.floor(currentExp / 100) + 1;
  const userEmail = session?.user?.email || 'UNKNOWN@COSMO.NET';
  const displayId = userId?.substring(0, 8).toUpperCase() || 'XXXX-XXXX';
  const accountCreated = profile?.created_at ? new Date(profile.created_at).toLocaleString() : 'UNKNOWN';
  const lastLogin = session?.user?.last_sign_in_at ? new Date(session.user.last_sign_in_at).toLocaleString() : 'UNKNOWN';

  return {
    profile,
    isLoading,
    updateName,
    updatePassword,
    deleteAccount,
    updateAvatar, // <-- PASTIKAN DI-RETURN DI SINI
    level,
    currentExp,
    userEmail,
    displayId,
    accountCreated,
    lastLogin
  };
};