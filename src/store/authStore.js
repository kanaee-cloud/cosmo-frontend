import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { toast } from '../hooks/useToast';

export const useAuthStore = create((set) => ({
  session: null,
  profile: null,
  isInitializing: true,

  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  
  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ session });

    if (session?.user) {
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profileData) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset jam agar hitungan murni berdasarkan hari

        let currentStreak = profileData.warp_streak || 0;
        let shouldUpdateDb = false;

        if (!profileData.last_active_date) {
  
          currentStreak = 1;
          shouldUpdateDb = true;
        } else {
          const lastActive = new Date(profileData.last_active_date);
          lastActive.setHours(0, 0, 0, 0);

          const diffTime = today - lastActive;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            currentStreak += 1;
            shouldUpdateDb = true;
          } else if (diffDays > 1) {
            currentStreak = 1;
            shouldUpdateDb = true;
          }
  
        }


        if (shouldUpdateDb) {
          const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          
          await supabase
            .from('users')
            .update({ 
              warp_streak: currentStreak, 
              last_active_date: todayString 
            })
            .eq('id', session.user.id);
            
          profileData.warp_streak = currentStreak;
          profileData.last_active_date = todayString;
        }
      }

      set({ profile: profileData });
    }
    set({ isInitializing: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    set({ session: null, profile: null });
    toast.info('Logged Out', 'Session ended successfully');
  },

  signIn: async (email, password) => {
    // 1. Ekstrak data dan error dari respon Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        toast.error('Login Failed', error.message);
        throw error;
    }

    // 2. PERBAIKAN: Langsung simpan session ke state global (Zustand)
    if (data?.session) {
        set({ session: data.session });

        // 3. PERBAIKAN: Tarik juga data profile dari tabel users agar UI langsung ter-update
        const { data: profileData } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
        if (profileData) {
            set({ profile: profileData });
        }
    }

    toast.success('Welcome Back', 'Access granted to Cosmo Command');
  },

  signUp: async (email, password, username) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username }
      }
    });
    if (error) {
        toast.error('Registration Failed', error.message);
        throw error;
    }
    toast.success('Registration Complete', 'Verification email sent to your inbox');
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/success`,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    if (error) {
        toast.error('OAuth Error', error.message);
        throw error;
    }
  },
}));