import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useProfileSettings = () => {
  const queryClient = useQueryClient();
  const { session, profile: storeProfile, setProfile } = useAuthStore();
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
    initialData: storeProfile // Gunakan data dari zustand sebagai fallback awal
  });

  // 2. Mutasi Update Nama (Sinkronisasi Auth & Tabel Users)
  const updateName = useMutation({
    mutationFn: async (newName) => {
      // Update di Supabase Auth Metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { username: newName }
      });
      if (authError) throw authError;

      // Update di Tabel Users
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
      setProfile(data); // Update store global
      queryClient.invalidateQueries({ queryKey: ['captainProfile', userId] });
    }
  });

  // 3. Kalkulasi Data Dinamis
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
    level,
    currentExp,
    userEmail,
    displayId,
    accountCreated,
    lastLogin
  };
};