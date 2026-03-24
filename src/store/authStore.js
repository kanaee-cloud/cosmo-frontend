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
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({ profile: data });
    }
    set({ isInitializing: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
    toast.info('Logged Out', 'Session ended successfully');
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        toast.error('Login Failed', error.message);
        throw error;
    }
    toast.success('Welcome Back', 'Access granted to Cosmo Command');
  },

  signUp: async (email, password, username) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { user_name: username }
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
        redirectTo: `${window.location.origin}/success`
      }
    });
    if (error) {
        toast.error('OAuth Error', error.message);
        throw error;
    }
  },
}));