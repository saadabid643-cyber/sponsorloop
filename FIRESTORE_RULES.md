# Firestore Security Rules Setup

## CRITICAL: You need to update your Firestore security rules to fix the infinite loading issue.

### 1. Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/project/sponsorloop-b0321)
2. Click on **Firestore Database**
3. Go to **Rules** tab

### 2. Replace the current rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all authenticated users (for development)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // More specific rules for production (uncomment when ready):
    /*
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
    */
  }
}
```

### 3. Click "Publish" to save the rules

### 4. Test the Application
After updating the rules, your application should work without the infinite loading issue.

## Why This Fixes the Issue:
- The current rules are likely blocking all access
- These rules allow authenticated users to read/write data
- This resolves the Firestore connection timeout

## For Production:
- Use the commented specific rules for better security
- Implement proper user-based access controls
- Test thoroughly before deploying