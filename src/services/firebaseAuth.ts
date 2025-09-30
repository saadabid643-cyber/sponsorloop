import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
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
  private googleProvider: GoogleAuthProvider;
  private facebookProvider: FacebookAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    this.facebookProvider = new FacebookAuthProvider();
    this.facebookProvider.setCustomParameters({
      display: 'popup'
    });
    this.facebookProvider.addScope('email');
    this.facebookProvider.addScope('public_profile');
  }

  // Register new user
  async register(
    email: string, 
    password: string, 
    userType: UserType, 
    profileData: any
  ): Promise<UserCredential> {
    try {
      console.log('🚀 Starting registration process for Cloud Firestore...');
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (!userType) {
        throw new Error('User type is required');
      }
      
      // Create user account
      console.log('Creating user account with email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User account created successfully:', user.uid);

      // Upload profile image if provided
      let avatarUrl = '';
      if (profileData.profileImage) {
        console.log('Uploading profile image...');
        avatarUrl = await this.uploadProfileImage(user.uid, profileData.profileImage);
        console.log('Profile image uploaded:', avatarUrl);
      }

      // Create user profile document
      console.log('Creating user profile document...');
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
        console.log('Adding brand-specific fields...');
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
        console.log('Adding influencer-specific fields...');
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
      console.log('💾 Saving profile to Cloud Firestore...');
      await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
      console.log('✅ Profile saved to Cloud Firestore successfully');
      
      // Verify the data was saved
      console.log('🔍 Verifying data was saved to Cloud Firestore...');
      const savedDoc = await getDoc(doc(db, 'users', user.uid));
      if (savedDoc.exists()) {
        console.log('✅ Data verification successful - Profile exists in Cloud Firestore');
      } else {
        console.log('❌ Data verification failed - Profile not found in Cloud Firestore');
      }

      // Update Firebase Auth profile
      console.log('Updating Firebase Auth profile...');
      await updateProfile(user, {
        displayName: profileData.name,
        photoURL: avatarUrl,
      });
      console.log('Firebase Auth profile updated successfully');

      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('auth/email-already-in-use')) {
          throw new Error('This email is already registered. Please use a different email or try logging in.');
        } else if (error.message.includes('auth/weak-password')) {
          throw new Error('Password is too weak. Please use at least 6 characters.');
        } else if (error.message.includes('auth/invalid-email')) {
          throw new Error('Please enter a valid email address.');
        } else if (error.message.includes('auth/configuration-not-found')) {
          throw new Error('Firebase Authentication is not properly configured. Please contact support.');
        } else if (error.message.includes('permission-denied')) {
          throw new Error('Permission denied. Please check Firestore security rules.');
        } else if (error.message.includes('unavailable')) {
          throw new Error('Service temporarily unavailable. Please try again.');
        }
      }
      
      throw error;
    }
  }

  // Google Sign In
  async signInWithGoogle(): Promise<UserCredential> {
    try {
      console.log('Starting Google sign-in...');
      const result = await signInWithPopup(auth, this.googleProvider);
      console.log('Google sign-in successful:', result.user.email);
      
      // Check if user profile exists, if not create one
      console.log('Checking for existing profile...');
      const existingProfile = await this.getUserProfile(result.user.uid);
      
      if (!existingProfile) {
        console.log('Creating new profile for Google user...');
        // Create a basic profile for Google users
        const userProfile: Partial<BrandProfile | InfluencerProfile> = {
          uid: result.user.uid,
          email: result.user.email!,
          userType: 'influencer', // Default to influencer, can be changed later
          name: result.user.displayName || 'Google User',
          username: result.user.email?.split('@')[0] || 'user',
          bio: '',
          location: '',
          website: '',
          phone: '',
          avatar: result.user.photoURL || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          // Influencer defaults
          niche: ['Lifestyle'],
          followers: 0,
          engagement: 3.5,
          instagramHandle: '',
          twitterHandle: '',
          linkedinHandle: '',
          priceRange: {
            post: 100,
            story: 50,
            reel: 150,
          },
          rating: 5.0,
        };

        console.log('Saving new Google user profile...');
        await setDoc(doc(db, 'users', result.user.uid), userProfile);
        console.log('Profile saved successfully');
      } else {
        console.log('Existing profile found');
      }
      
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Facebook Sign In
  async signInWithFacebook(): Promise<UserCredential> {
    try {
      console.log('Starting Facebook sign-in...');
      const result = await signInWithPopup(auth, this.facebookProvider);
      console.log('Facebook sign-in successful:', result.user.email);
      
      // Check if user profile exists, if not create one
      console.log('Checking for existing profile...');
      const existingProfile = await this.getUserProfile(result.user.uid);
      
      if (!existingProfile) {
        console.log('Creating new profile for Facebook user...');
        // Create a basic profile for Facebook users
        const userProfile: Partial<BrandProfile | InfluencerProfile> = {
          uid: result.user.uid,
          email: result.user.email!,
          userType: 'influencer', // Default to influencer, can be changed later
          name: result.user.displayName || 'Facebook User',
          username: result.user.email?.split('@')[0] || 'user',
          bio: '',
          location: '',
          website: '',
          phone: '',
          avatar: result.user.photoURL || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          // Influencer defaults
          niche: ['Lifestyle'],
          followers: 0,
          engagement: 3.5,
          instagramHandle: '',
          twitterHandle: '',
          linkedinHandle: '',
          priceRange: {
            post: 100,
            story: 50,
            reel: 150,
          },
          rating: 5.0,
        };

        console.log('Saving new Facebook user profile...');
        await setDoc(doc(db, 'users', result.user.uid), userProfile);
        console.log('Profile saved successfully');
      } else {
        console.log('Existing profile found');
      }
      
      return result;
    } catch (error) {
      console.error('Facebook sign-in error:', error);
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
      console.log('📋 Fetching user profile from Cloud Firestore for:', uid);
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('✅ Profile found in Cloud Firestore');
        const data = docSnap.data();
        console.log('📊 Profile data:', {
          name: data.name,
          userType: data.userType,
          instagramHandle: data.instagramHandle,
          hasInstagram: !!data.instagramHandle
        });
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as BrandProfile | InfluencerProfile;
      }
      console.log('❌ No profile found in Cloud Firestore');
      return null;
    } catch (error) {
      console.error('❌ Get profile error from Cloud Firestore:', error);
      
      // Handle specific Firebase errors
      if (error instanceof Error) {
        if (error.message.includes('Missing or insufficient permissions')) {
          console.error('🚨 FIRESTORE SECURITY RULES ERROR: Please update Firestore rules to allow authenticated access');
          console.error('🔧 Go to Firebase Console → Firestore → Rules and allow authenticated users');
          return null;
        }
        if (error.message.includes('offline')) {
          console.log('📡 Client is offline, returning null profile');
          return null;
        }
      }
      
      // For other errors, still return null to prevent crashes
      console.error('🔄 Returning null profile due to error, but continuing...');
      return null;
    }
  }

  // Create user profile with better error handling
  async createUserProfile(uid: string, profileData: Partial<BrandProfile | InfluencerProfile>): Promise<void> {
    try {
      console.log('💾 Creating user profile in Cloud Firestore...');
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, profileData, { merge: true });
      console.log('✅ Profile created successfully in Cloud Firestore');
      
      // Verify the data was saved
      const savedDoc = await getDoc(docRef);
      if (savedDoc.exists()) {
        console.log('✅ Profile verification successful');
      } else {
        console.log('❌ Profile verification failed');
      }
    } catch (error) {
      console.error('❌ Create profile error:', error);
      
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        console.error('🚨 FIRESTORE SECURITY RULES ERROR: Cannot create profile');
        throw new Error('Database permissions error. Please check Firestore security rules.');
      }
      
      throw error;
    }
  }

  // Update user profile with better error handling
  async updateUserProfile(uid: string, updates: Partial<BrandProfile | InfluencerProfile>): Promise<void> {
    try {
      console.log('🔄 Updating user profile in Cloud Firestore...');
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      }, { merge: true });
      console.log('✅ Profile updated successfully');
    } catch (error) {
      console.error('❌ Update profile error:', error);
      
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        throw new Error('Database permissions error. Please check Firestore security rules.');
      }
      
      throw error;
    }
  }

  // Update Instagram information with better error handling
  async updateInstagramInfo(uid: string, instagramData: { username: string; url: string }): Promise<void> {
    try {
      console.log('📸 Updating Instagram info in Cloud Firestore for user:', uid, instagramData);
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, {
        instagramHandle: instagramData.username,
        instagramUrl: instagramData.url,
        updatedAt: new Date(),
      }, { merge: true });
      
      console.log('✅ Instagram info updated successfully in Cloud Firestore');
      
      // Verify the Instagram data was saved
      console.log('🔍 Verifying Instagram data was saved...');
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        const data = updatedDoc.data();
        console.log('✅ Instagram data verification successful:', {
          instagramHandle: data.instagramHandle,
          instagramUrl: data.instagramUrl
        });
      } else {
        console.log('❌ Instagram data verification failed');
      }
    } catch (error) {
      console.error('❌ Update Instagram info error:', error);
      
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        throw new Error('Database permissions error. Cannot save Instagram info. Please check Firestore security rules.');
      }
      
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

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const firebaseAuth = new FirebaseAuthService();