import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useMatrixData = () => {
  const userId = useAuthStore((state) => state.session?.user?.id);

  // 1. Ambil Data Misi
  const { data: directives = [], isLoading: isDirectivesLoading } = useQuery({
    queryKey: ['directives', 'matrix', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('directives')
        .select('*')
        .neq('status', 'DONE')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // 2. Ambil Data Profil Kapten (Sebagai Pengganti OutletContext)
  const { data: profile = {}, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', 'matrix', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('display_name, level, fuel_cells')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // 3. Klasifikasikan Tugas
  const q1Tasks = directives.filter(d => d.priority === 'CRITICAL');
  const q2Tasks = directives.filter(d => d.priority === 'ELEVATED' || d.priority === 'HIGH');
  const q3Tasks = directives.filter(d => d.priority === 'STANDARD' || d.priority === 'MEDIUM');
  const q4Tasks = directives.filter(d => d.priority === 'LOW' || d.priority === 'TRIVIAL' || !d.priority);

  return {
    directives,
    q1Tasks,
    q2Tasks,
    q3Tasks,
    q4Tasks,
    profile,
    isLoading: isDirectivesLoading || isProfileLoading
  };
};