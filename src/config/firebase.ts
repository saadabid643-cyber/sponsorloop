import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBYour_API_Key_Here",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sponsorloop-b0321.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sponsorloop-b0321",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sponsorloop-b0321.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "539533238445",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:539533238445:web:36278c9908d736e96ce624",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V8CK3M9FND"
};

// Facebook App Configuration
export const FACEBOOK_APP_ID = '1306255877566568'; // Your Facebook App ID

console.log('Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  hasApiKey: !!firebaseConfig.apiKey
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable Firestore network and ensure connection to Cloud Firestore
enableNetwork(db).then(() => {
  console.log('✅ Firestore network enabled - Connected to Cloud Firestore');
}).catch((error) => {
  console.error('❌ Failed to enable Firestore network:', error);
});

// Add connection state logging
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
});

// Initialize Analytics only if supported (avoids issues in some environments)
let analytics;
isSupported().then(yes => yes ? analytics = getAnalytics(app) : analytics = null);
export { analytics };

export default app;