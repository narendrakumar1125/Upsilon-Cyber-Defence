# Admin Role Setup Guide

This guide explains how to set up admin roles for users in your Firebase Authentication system.

## Prerequisites

1. A user account must be created in Firebase Authentication first
2. Firebase Functions must be deployed
3. You need access to Firebase Console or Firebase CLI

## Method 1: Using Cloud Function (Recommended)

### Step 1: Deploy the Cloud Function

The Cloud Functions for setting admin roles are already included in `functions/index.js`. Deploy them:

```bash
cd cybernexgen-website
firebase deploy --only functions
```

### Step 2: Set Admin Secret

Set a secure secret key for the admin function:

```bash
firebase functions:config:set admin.secret="your-very-secure-secret-key-here"
```

Then redeploy functions:

```bash
firebase deploy --only functions
```

### Step 3: Set Admin Role

#### Option A: Using the Helper Script

1. Install axios (if not already installed):
```bash
cd functions
npm install axios
```

2. Run the script:
```bash
cd ..
node scripts/set-admin-role.js admin@cybernexgen.com your-very-secure-secret-key-here
```

#### Option B: Using cURL

```bash
curl -X POST https://us-central1-cybernexgen-766e5.cloudfunctions.net/setAdminRole \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cybernexgen.com",
    "adminSecret": "your-very-secure-secret-key-here"
  }'
```

#### Option C: Using Firebase Console

1. Go to Firebase Console → Functions
2. Find the `setAdminRole` function
3. Click "Test function"
4. Enter the request body:
```json
{
  "email": "admin@cybernexgen.com",
  "adminSecret": "your-very-secure-secret-key-here"
}
```

### Step 4: User Must Sign Out and Sign In

⚠️ **Important**: After setting the admin role, the user must:
1. Sign out of the application
2. Sign in again

This is because Firebase Auth caches the user's token. The new role will only be available after re-authentication.

## Method 2: Using Firebase Admin SDK (Local Script)

### Step 1: Create a Local Script

Create a file `scripts/set-admin-local.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];

if (!email) {
  console.error('Usage: node set-admin-local.js <email>');
  process.exit(1);
}

admin.auth().getUserByEmail(email)
  .then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
  })
  .then(() => {
    console.log(`✅ Admin role set for ${email}`);
    console.log('⚠️  User must sign out and sign in again for changes to take effect.');
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
```

### Step 2: Run the Script

```bash
node scripts/set-admin-local.js admin@cybernexgen.com
```

## Method 3: Using Firebase Console (Manual)

1. Go to [Firebase Console](https://console.firebase.google.com/project/cybernexgen-766e5)
2. Navigate to **Authentication** → **Users**
3. Find the user you want to make admin
4. Click on the user's email
5. Note the **User UID**

6. Go to **Functions** → **Logs** or use Firebase CLI:
```bash
firebase functions:log
```

7. Use the Firebase Admin SDK in a Cloud Function or local script to set the custom claim.

## Verify Admin Role

After setting the admin role and the user signs in again, you can verify:

1. The user should be able to access `/admin` pages
2. Check the user's token claims in the browser console:
```javascript
// In browser console after login
firebase.auth().currentUser.getIdTokenResult()
  .then(idTokenResult => {
    console.log('Role:', idTokenResult.claims.role);
  });
```

## Remove Admin Role

To remove admin role from a user:

### Using Cloud Function:

```bash
curl -X POST https://us-central1-cybernexgen-766e5.cloudfunctions.net/removeAdminRole \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cybernexgen.com",
    "adminSecret": "your-very-secure-secret-key-here"
  }'
```

### Using Local Script:

Modify the script to set role to 'user' instead of 'admin'.

## Security Notes

1. **Never commit the admin secret** to version control
2. **Use a strong, random secret key** for production
3. **Restrict access** to the Cloud Function endpoints
4. **Monitor function logs** for unauthorized access attempts
5. **Rotate the secret** periodically

## Troubleshooting

### "User not found" error
- Make sure the user exists in Firebase Authentication
- Verify the email address is correct

### "Unauthorized" error
- Check that the `adminSecret` matches the one set in Firebase Functions config
- Verify the function is deployed correctly

### Role not working after setting
- User must sign out and sign in again
- Clear browser cache and cookies
- Check browser console for any errors

### Function not found
- Make sure functions are deployed: `firebase deploy --only functions`
- Check the function URL matches your Firebase project ID

## Quick Reference

```bash
# Set admin secret
firebase functions:config:set admin.secret="your-secret-key"

# Deploy functions
firebase deploy --only functions

# Set admin role (using script)
node scripts/set-admin-role.js user@example.com your-secret-key

# Set admin role (using curl)
curl -X POST https://us-central1-cybernexgen-766e5.cloudfunctions.net/setAdminRole \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","adminSecret":"your-secret-key"}'
```

