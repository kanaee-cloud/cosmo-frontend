import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const usePomodoro = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user?.id);

  // 1. Log Session (Tracker Waktu)
  const logSession = useMutation({
    mutationFn: async ({ durationMinutes, sessionType }) => {
      const { error } = await supabase
        .from('pomodoro_sessions')
        .insert([{ user_id: userId, duration_minutes: durationMinutes, session_type: sessionType }]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['pomodoroStats', userId])
  });

  // 2. Ambil Statistik Waktu Total
  const usePomodoroStats = () => useQuery({
    queryKey: ['pomodoroStats', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('duration_minutes')
        .eq('user_id', userId)
        .eq('session_type', 'FOCUS');
      
      if (error) throw error;
      const totalMinutes = data.reduce((acc, curr) => acc + curr.duration_minutes, 0);
      return { 
        totalMinutes, 
        totalHours: (totalMinutes / 60).toFixed(1), 
        totalSessions: data.length 
      };
    },
    enabled: !!userId
  });

  // 3. Ambil Daftar Tugas Pomodoro
  const usePomodoroTasks = () => useQuery({
    queryKey: ['pomodoroTasks', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pomodoro_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('is_completed', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // 4. Tambah Tugas Baru
  const addTask = useMutation({
    mutationFn: async (title) => {
      const { error } = await supabase.from('pomodoro_tasks').insert([{ user_id: userId, title }]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['pomodoroTasks', userId])
  });

  // 5. Ceklis / Batal Ceklis Tugas
  const toggleTaskCompletion = useMutation({
    mutationFn: async ({ taskId, isCompleted }) => {
      const { error } = await supabase.from('pomodoro_tasks').update({ is_completed: isCompleted }).eq('id', taskId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['pomodoroTasks', userId])
  });

  // 6. Hapus Tugas
  const deleteTask = useMutation({
    mutationFn: async (taskId) => {
      const { error } = await supabase.from('pomodoro_tasks').delete().eq('id', taskId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['pomodoroTasks', userId])
  });

  return { logSession, usePomodoroStats, usePomodoroTasks, addTask, toggleTaskCompletion, deleteTask };
};