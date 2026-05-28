# Production Deployment Guide

## Quick Deployment Steps

### 1. Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication. Use the email: **cybernexgensolutions@gmail.com**

### 2. Verify Project

```bash
firebase use cybernexgen-766e5
```

### 3. Build the Project

```bash
npm run build
```

This creates the static export in the `out` directory.

### 4. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### 5. Deploy Firebase Functions (if needed)

```bash
firebase deploy --only functions
```

## Full Deployment (Hosting + Functions)

```bash
firebase deploy
```

This deploys both hosting and functions.

## Verify Deployment

After deployment, check:
- Hosting URL: https://cybernexgen-766e5.web.app
- Custom Domain: https://cybernexgen.com (if configured)

## Troubleshooting

### If build fails:
- Check for TypeScript errors: `npm run lint`
- Ensure all dependencies are installed: `npm install`

### If deployment fails:
- Verify Firebase login: `firebase login:list`
- Check project: `firebase projects:list`
- Verify firebase.json configuration

### Rollback (if needed):
```bash
firebase hosting:clone SOURCE_SITE_ID:TARGET_SITE_ID
```

## Pre-Deployment Checklist

- [ ] All changes committed to git
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in development
- [ ] Environment variables configured
- [ ] Firebase Functions updated (if changed)
- [ ] Test payment flow (if applicable)

## Post-Deployment

- [ ] Verify site loads correctly
- [ ] Test key functionality (contact form, enrollment, etc.)
- [ ] Check Firebase Functions logs
- [ ] Monitor for errors in Firebase Console

