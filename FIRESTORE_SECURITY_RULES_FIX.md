# 🚨 CRITICAL: Fix Firestore Security Rules

## The Problem
Your Firestore security rules are blocking all access, causing "Missing or insufficient permissions" errors.

## IMMEDIATE FIX REQUIRED:

### 1. Go to Firebase Console
1. Visit: https://console.firebase.google.com/project/sponsorloop-b0321
2. Click **Firestore Database** in left sidebar
3. Click **Rules** tab

### 2. Replace ALL rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all authenticated users to read/write (for development)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Click "Publish" button

### 4. Wait 1-2 minutes for rules to propagate

## Why This Fixes It:
- ✅ Allows all authenticated users to access Firestore
- ✅ Fixes "Missing or insufficient permissions" error
- ✅ Enables Google login to work properly
- ✅ Allows Instagram data to be saved

## Test After Fixing:
1. Refresh your app
2. Try Google login again
3. Should work without permission errors
4. Instagram setup modal should appear
5. Data should save successfully

**This is the most important step - the app won't work until you update these rules!**