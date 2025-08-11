# 🚨 URGENT: Fix Firestore Security Rules

## The Problem
Your Firestore security rules are blocking ALL database access, causing "Missing or insufficient permissions" errors.

## STEP-BY-STEP FIX:

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/project/sponsorloop-b0321
2. Click **"Firestore Database"** in the left sidebar
3. Click the **"Rules"** tab at the top

### Step 2: Replace the Rules
You'll see something like this:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**DELETE ALL OF IT** and replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 3: Publish the Rules
1. Click the **"Publish"** button
2. Wait for the green success message
3. Wait 1-2 minutes for rules to propagate globally

### Step 4: Test
1. Refresh your app: https://incandescent-salmiakki-d309de.netlify.app
2. Try Google login again
3. Should work without permission errors

## What This Rule Does:
- ✅ Allows **authenticated users** to read/write data
- ❌ Blocks **unauthenticated users** from accessing data
- 🔒 Secure but functional for your app

## Current Error:
```
FirebaseError: Missing or insufficient permissions
```

## After Fix:
```
✅ Google sign-in successful
✅ Profile saved to Cloud Firestore
✅ Instagram setup modal appears
```

**Your app will NOT work until you update these rules!**