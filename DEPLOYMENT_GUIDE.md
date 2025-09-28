# Deployment Guide for Perfect Shot App

This guide provides multiple options for deploying your Perfect Shot app with Firebase authentication.

## Option 1: Firebase Hosting (Recommended)

### Prerequisites
1. Firebase project created
2. Firebase configuration updated in `lib/firebase.ts`
3. Authentication enabled in Firebase Console

### Steps

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds: `No` (we'll build manually)

4. **Build your app**:
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

## Option 2: Vercel (Alternative)

### Steps

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - Add your Firebase configuration as environment variables

## Option 3: Netlify

### Steps

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

3. **Configure environment variables** in Netlify dashboard

## Option 4: GitHub Pages

### Steps

1. **Push your code to GitHub**

2. **Enable GitHub Pages** in repository settings

3. **Set source to GitHub Actions**

4. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## Important Notes

### Before Deployment

1. **Update Firebase Configuration**:
   - Replace placeholder values in `lib/firebase.ts` with your actual Firebase project credentials
   - Make sure to enable Authentication in Firebase Console
   - Add your domain to authorized domains in Firebase Console

2. **Environment Variables** (for production):
   - Consider using environment variables for Firebase config
   - Never commit sensitive API keys to version control

3. **Domain Configuration**:
   - Add your deployed domain to Firebase authorized domains
   - Update OAuth consent screen with your domain

### Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication > Settings > Authorized domains
4. Add your deployed domain (e.g., `your-app.web.app`)

### Testing After Deployment

1. Visit your deployed URL
2. Test user registration with email/password
3. Test Google sign-in
4. Test the main app functionality
5. Verify user sessions persist

## Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify Firebase imports are correct

### Authentication Issues
- Check Firebase configuration
- Verify authorized domains
- Check OAuth consent screen configuration

### Deployment Issues
- Check Firebase CLI version: `firebase --version`
- Verify project initialization: `firebase projects:list`
- Check hosting configuration: `firebase hosting:channel:list`
