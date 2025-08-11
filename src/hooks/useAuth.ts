import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { firebaseAuth, BrandProfile, InfluencerProfile } from '../services/firebaseAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<BrandProfile | InfluencerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const profile = await firebaseAuth.getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
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
      await firebaseAuth.login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await firebaseAuth.signInWithGoogle();
    } catch (error) {
      throw error;
    }
  };
  const register = async (email: string, password: string, userType: 'brand' | 'influencer', profileData: any) => {
    try {
      await firebaseAuth.register(email, password, userType, profileData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseAuth.logout();
    } catch (error) {
      throw error;
    }
  };

  const updateInstagramInfo = async (instagramData: { username: string; url: string }) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await firebaseAuth.updateInstagramInfo(user.uid, instagramData);
      // Refresh user profile
      const updatedProfile = await firebaseAuth.getUserProfile(user.uid);
      setUserProfile(updatedProfile);
    } catch (error) {
      throw error;
    }
  };
  return {
    user,
    userProfile,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    updateInstagramInfo
  };
};