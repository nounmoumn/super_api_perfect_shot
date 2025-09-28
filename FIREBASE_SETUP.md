# Firebase Authentication Setup

This project now includes Firebase Authentication. Follow these steps to set up Firebase for your project:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "perfect-shot-app")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in methods:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it and toggle "Enable", then configure the OAuth consent screen

## 3. Get Your Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 4. Update Firebase Configuration

1. Open `lib/firebase.ts`
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## 5. Configure OAuth Consent Screen (for Google Sign-in)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "APIs & Services" > "OAuth consent screen"
4. Configure the consent screen with your app information
5. Add your domain to authorized domains

## 6. Test the Authentication

1. Run your app: `npm run dev`
2. You should see a "Sign In" button in the top-right corner
3. Try creating an account with email/password
4. Try signing in with Google
5. Test the logout functionality

## Features Included

- **Email/Password Authentication**: Users can create accounts and sign in
- **Google Sign-in**: One-click authentication with Google
- **User Profile**: Shows user info and logout option
- **Protected Routes**: App requires authentication to access main features
- **Persistent Sessions**: Users stay logged in across browser sessions

## Security Notes

- Never commit your actual Firebase configuration to version control
- Consider using environment variables for production
- The current setup stores Firebase config directly in the code for simplicity

## Troubleshooting

- **"Firebase: Error (auth/configuration-not-found)"**: Check your Firebase configuration
- **"Firebase: Error (auth/invalid-api-key)"**: Verify your API key is correct
- **Google Sign-in not working**: Check OAuth consent screen configuration
- **"auth/unauthorized-domain"**: Add your domain to authorized domains in Firebase Console
