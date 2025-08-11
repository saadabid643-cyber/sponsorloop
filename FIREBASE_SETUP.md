# Firebase Setup Guide for SponsorLoop

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `sponsorloop`
4. Enable Google Analytics (optional)
5. Create project

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Disable **Email link (passwordless sign-in)** for now

## 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll add security rules later)
4. Select your preferred location
5. Click **Done**

## 4. Enable Storage

1. Go to **Storage**
2. Click **Get started**
3. Start in **test mode**
4. Choose same location as Firestore
5. Click **Done**

## 5. Get Configuration Keys

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon (`</>`)
4. Register app name: `sponsorloop-web`
5. Copy the configuration object

## 6. Create Environment File

Create `.env` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 7. Firestore Security Rules

Go to **Firestore Database > Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow reading other profiles for discovery
    }
    
    // Collaborations
    match /collaborations/{collabId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.brandId || 
         request.auth.uid == resource.data.influencerId);
      allow create: if request.auth != null;
    }
    
    // Conversations
    match /conversations/{convId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.participantId || 
         request.auth.uid == resource.data.userId);
      allow create: if request.auth != null;
    }
  }
}
```

## 8. Storage Security Rules

Go to **Storage > Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile images
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true; // Public read for profile images
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 9. Initial Data Structure

Your Firestore will have these collections:

### Users Collection
```
users/
  {userId}/
    - uid: string
    - email: string
    - userType: 'brand' | 'influencer'
    - name: string
    - username: string
    - bio: string
    - location: string
    - website: string
    - avatar: string
    - createdAt: timestamp
    - updatedAt: timestamp
    
    // Brand-specific fields
    - companyName: string
    - industry: string
    - budgetMin: number
    - budgetMax: number
    - targetAudience: array
    - preferredInfluencerSizes: array
    - campaigns: number
    - rating: number
    
    // Influencer-specific fields
    - niche: array
    - followers: number
    - engagement: number
    - instagramHandle: string
    - priceRange: object
    - rating: number
```

### Collaborations Collection
```
collaborations/
  {collabId}/
    - brandId: string
    - influencerId: string
    - brandName: string
    - influencerName: string
    - brandLogo: string
    - influencerAvatar: string
    - service: string
    - status: string
    - budget: number
    - startDate: timestamp
    - endDate: timestamp
    - description: string
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Conversations Collection
```
conversations/
  {convId}/
    - participantId: string
    - participantName: string
    - participantAvatar: string
    - lastMessage: string
    - lastMessageTime: timestamp
    - unreadCount: number
    - messages: array
    - createdAt: timestamp
    - updatedAt: timestamp
```

## 10. Test the Setup

1. Start your development server: `npm run dev`
2. Try registering a new account
3. Check Firebase Console to see if user was created
4. Try logging in with the new account
5. Check Firestore to see if user profile was created

## 11. Optional: Add Sample Data

You can add some sample data through Firebase Console to test the app:

1. Go to Firestore Database
2. Create sample brand and influencer profiles
3. Test the search and discovery features

## Troubleshooting

- **CORS Issues**: Make sure your domain is added to Firebase Auth authorized domains
- **Permission Denied**: Check Firestore security rules
- **Environment Variables**: Make sure all VITE_ prefixed variables are set correctly
- **Build Issues**: Restart your dev server after adding environment variables

Your Firebase backend is now ready to replace the mock data system!