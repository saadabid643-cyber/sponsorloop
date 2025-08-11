import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { firebaseAuth, BrandProfile, InfluencerProfile } from '../services/firebaseAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<BrandProfile | InfluencerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state change detected:', user?.email || 'No user');
      setUser(user);
      setError(null);
      
      if (user) {
        try {
          console.log('Fetching user profile for:', user.uid);
          const profile = await firebaseAuth.getUserProfile(user.uid);
          console.log('Profile fetched:', profile ? 'Success' : 'No profile found');
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Failed to load user profile');
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('Attempting login for:', email);
      await firebaseAuth.login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      console.log('Attempting Google login...');
      await firebaseAuth.signInWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      setError(error instanceof Error ? error.message : 'Google login failed');
      throw error;
    }
  };
  const register = async (email: string, password: string, userType: 'brand' | 'influencer', profileData: any) => {
    try {
      setError(null);
      console.log('Attempting registration for:', email);
      await firebaseAuth.register(email, password, userType, profileData);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await firebaseAuth.logout();
    } catch (error) {
      console.error('Logout error:', error);
      setError(error instanceof Error ? error.message : 'Logout failed');
      throw error;
    }
  };

  const updateInstagramInfo = async (instagramData: { username: string; url: string }) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      setError(null);
      console.log('Updating Instagram info for:', user.uid);
      await firebaseAuth.updateInstagramInfo(user.uid, instagramData);
      // Refresh user profile
      const updatedProfile = await firebaseAuth.getUserProfile(user.uid);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Instagram update error:', error);
      setError(error instanceof Error ? error.message : 'Failed to update Instagram info');
      throw error;
    }
  };
  return {
    user,
    userProfile,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    updateInstagramInfo
  };
};