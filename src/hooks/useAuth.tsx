
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: typeof supabase.auth.signInWithPassword;
  logout: typeof supabase.auth.signOut;
  register: typeof supabase.auth.signUp;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile for given Supabase user
  const getProfile = async (supabaseUser: SupabaseUser): Promise<UserProfile | null> => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', supabaseUser.id)
        .single();

      if (error && status !== 406) {
        console.error('Error fetching profile:', error);
        return { id: supabaseUser.id, email: supabaseUser.email };
      }

      if (data) {
        return {
          id: supabaseUser.id,
          email: supabaseUser.email ?? undefined,
          fullName: (data as any).full_name,
          avatarUrl: (data as any).avatar_url,
        };
      }
    } catch (error) {
      console.error('Exception in getProfile:', error);
    }
    return { id: supabaseUser.id, email: supabaseUser.email ?? undefined };
  };

  useEffect(() => {
    // 1) Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession ?? null);

      const supaUser = newSession?.user ?? null;
      if (supaUser) {
        // Defer profile fetch to avoid heavy work inside callback
        setTimeout(async () => {
          const profile = await getProfile(supaUser);
          setUser(profile);
        }, 0);
      } else {
        setUser(null);
        // Redirect to home when signed out
        if (event === 'SIGNED_OUT') {
          window.location.assign('/');
        }
      }
    });

    // 2) Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session ?? null);
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
    login: supabase.auth.signInWithPassword,
    logout: supabase.auth.signOut,
    register: supabase.auth.signUp,
    isAuthenticated: !!session,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
