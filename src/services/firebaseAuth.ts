import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { UserType } from '../types';

export interface UserProfile {
  uid: string;
  email: string;
  userType: UserType;
  name: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandProfile extends UserProfile {
  userType: 'brand';
  companyName: string;
  industry: string;
  budgetMin: number;
  budgetMax: number;
  targetAudience: string[];
  preferredInfluencerSizes: string[];
  campaigns: number;
  rating: number;
}

export interface InfluencerProfile extends UserProfile {
  userType: 'influencer';
  niche: string[];
  followers: number;
  engagement: number;
  instagramHandle: string;
  twitterHandle?: string;
  linkedinHandle?: string;
  priceRange: {
    post: number;
    story: number;
    reel: number;
  };
  rating: number;
}

class FirebaseAuthService {
  // Register new user
  async register(
    email: string, 
    password: string, 
    userType: UserType, 
    profileData: any
  ): Promise<UserCredential> {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile image if provided
      let avatarUrl = '';
      if (profileData.profileImage) {
        avatarUrl = await this.uploadProfileImage(user.uid, profileData.profileImage);
      }

      // Create user profile document
      const userProfile: Partial<BrandProfile | InfluencerProfile> = {
        uid: user.uid,
        email: user.email!,
        userType,
        name: profileData.name,
        username: profileData.username || email.split('@')[0],
        bio: profileData.bio || '',
        location: profileData.location || '',
        website: profileData.website || '',
        phone: profileData.phone || '',
        avatar: avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add type-specific fields
      if (userType === 'brand') {
        Object.assign(userProfile, {
          companyName: profileData.companyName || profileData.name,
          industry: profileData.industry || '',
          budgetMin: parseInt(profileData.budgetMin) || 1000,
          budgetMax: parseInt(profileData.budgetMax) || 10000,
          targetAudience: profileData.targetAudience?.split(',').map((s: string) => s.trim()) || [],
          preferredInfluencerSizes: ['Micro', 'Mid-tier'],
          campaigns: 0,
          rating: 5.0,
        });
      } else {
        Object.assign(userProfile, {
          niche: profileData.niche || ['Lifestyle'],
          followers: parseInt(profileData.followers) || 0,
          engagement: 3.5,
          instagramHandle: profileData.instagramHandle || '',
          twitterHandle: profileData.twitterHandle || '',
          linkedinHandle: profileData.linkedinHandle || '',
          priceRange: {
            post: Math.floor((parseInt(profileData.followers) || 1000) * 0.01),
            story: Math.floor((parseInt(profileData.followers) || 1000) * 0.005),
            reel: Math.floor((parseInt(profileData.followers) || 1000) * 0.015),
          },
          rating: 5.0,
        });
      }

      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid), userProfile);

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profileData.name,
        photoURL: avatarUrl,
      });

      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(uid: string): Promise<BrandProfile | InfluencerProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as BrandProfile | InfluencerProfile;
      }
      return null;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Upload profile image
  async uploadProfileImage(uid: string, file: File): Promise<string> {
    try {
      const imageRef = ref(storage, `profiles/${uid}/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<BrandProfile | InfluencerProfile>): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const firebaseAuth = new FirebaseAuthService();