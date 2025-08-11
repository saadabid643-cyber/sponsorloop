# 🔥 Firebase Setup Instructions for SponsorLoop

## ⚠️ IMPORTANT: Complete These Steps to Fix Authentication Error

The `auth/configuration-not-found` error means Firebase Authentication is not enabled in your Firebase project. Follow these steps:

## 1. Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/project/sponsorloop-b0321)
2. Click on **Authentication** in the left sidebar
3. Click **Get started** button
4. Go to **Sign-in method** tab
5. Click on **Email/Password**
6. Toggle **Enable** to ON
7. Click **Save**

## 2. Create Firestore Database

1. In Firebase Console, click **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for now)
4. Select your preferred location (choose closest to your users)
5. Click **Done**

## 3. Enable Firebase Storage

1. Click **Storage** in the left sidebar
2. Click **Get started**
3. Choose **Start in test mode**
4. Select the same location as Firestore
5. Click **Done**

## 4. Set Up Security Rules (Important!)

### Firestore Rules:
1. Go to **Firestore Database** → **Rules**
2. Replace the default rules with:

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
      allow read, write: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

### Storage Rules:
1. Go to **Storage** → **Rules**
2. Replace with:

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

## 5. Verify Configuration

After completing the above steps:

1. **Rebuild and redeploy** your application:
   ```bash
   npm run build
   ```

2. **Test registration** with a new account

3. **Check Firebase Console** to see if:
   - User appears in Authentication → Users
   - User profile appears in Firestore → users collection

## 6. Troubleshooting

If you still get errors:

1. **Clear browser cache** and try again
2. **Check browser console** for detailed error messages
3. **Verify all services are enabled** in Firebase Console
4. **Make sure your domain is authorized** in Authentication → Settings → Authorized domains

## 7. Production Checklist

Before going live:
- [ ] Authentication enabled
- [ ] Firestore database created
- [ ] Storage enabled
- [ ] Security rules configured
- [ ] Domain authorized
- [ ] Environment variables set correctly

Your Firebase project should now be fully configured and ready to handle user registration and authentication!