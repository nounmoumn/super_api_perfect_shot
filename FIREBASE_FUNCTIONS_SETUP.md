# Firebase Functions Setup for Perfect Shot App

This guide will help you set up Firebase Functions to handle the Gemini API calls on the backend, eliminating the need for users to enter their API key.

## 🎯 What This Achieves

- **No API Key Required**: Users don't need to enter their Gemini API key
- **Secure Backend**: API keys are stored securely on the server
- **Better UX**: Seamless user experience without configuration
- **Scalable**: Firebase Functions automatically scale with usage

## 📋 Prerequisites

1. Firebase project created
2. Firebase CLI installed: `npm install -g firebase-tools`
3. Node.js 18+ installed

## 🚀 Setup Steps

### 1. Firebase Project Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable the following services:
   - **Authentication** (Email/Password + Google)
   - **Hosting**
   - **Functions**

### 2. Update Firebase Configuration

Update `lib/firebase.ts` with your actual Firebase project credentials:

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

### 3. Set Up Firebase Functions

1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Initialize Firebase in your project**:
   ```bash
   firebase init
   ```
   - Select: Functions, Hosting
   - Choose your Firebase project
   - Use TypeScript: Yes
   - Install dependencies: Yes

3. **Set up Gemini API Key**:
   ```bash
   firebase functions:config:set gemini.api_key="your-gemini-api-key"
   ```

### 4. Deploy Everything

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy Firebase Functions**:
   ```bash
   firebase deploy --only functions
   ```

3. **Deploy the complete app**:
   ```bash
   firebase deploy
   ```

## 🔧 Configuration Details

### Environment Variables

The Firebase Function uses the Gemini API key from Firebase config:
- Set via: `firebase functions:config:set gemini.api_key="your-key"`
- Access via: `functions.config().gemini.api_key`

### Function Endpoints

- `generateVibeBasedImage`: Main image generation function
- `generateImageWithDALLE`: Alternative DALL-E integration
- `healthCheck`: Health check endpoint

## 📁 Project Structure

```
├── functions/
│   ├── src/
│   │   └── index.ts          # Firebase Functions
│   ├── package.json          # Functions dependencies
│   └── tsconfig.json         # TypeScript config
├── lib/
│   ├── firebase.ts           # Firebase config
│   └── AuthContext.tsx       # Authentication
├── services/
│   └── firebaseService.ts    # Frontend service calls
└── dist/                     # Built frontend
```

## 🔄 How It Works

1. **User uploads images** and clicks generate
2. **Frontend calls** `generateVibeBasedImage` function
3. **Firebase Function** receives the request
4. **Function calls** Gemini API with stored API key
5. **Function returns** generated image URL to frontend
6. **Frontend displays** the result

## 🛠️ Development Workflow

### Local Development

1. **Start Firebase emulators**:
   ```bash
   firebase emulators:start
   ```

2. **Run frontend in dev mode**:
   ```bash
   npm run dev
   ```

3. **Test functions locally**:
   - Functions run on `http://localhost:5001`
   - Frontend connects to local functions

### Production Deployment

1. **Deploy functions**:
   ```bash
   firebase deploy --only functions
   ```

2. **Deploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

3. **Deploy everything**:
   ```bash
   firebase deploy
   ```

## 🔐 Security Considerations

- **API Keys**: Stored securely in Firebase Functions config
- **Authentication**: Required for all image generation
- **Rate Limiting**: Firebase Functions have built-in rate limiting
- **CORS**: Properly configured for your domain

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Make sure Firebase is installed: `npm install firebase`
2. **Function Errors**: Check Firebase Functions logs: `firebase functions:log`
3. **Authentication Issues**: Verify Firebase Auth is enabled
4. **API Key Issues**: Check function config: `firebase functions:config:get`

### Debug Commands

```bash
# Check Firebase project
firebase projects:list

# Check function config
firebase functions:config:get

# View function logs
firebase functions:log

# Test functions locally
firebase emulators:start --only functions
```

## 📊 Monitoring

- **Firebase Console**: Monitor function usage and errors
- **Function Logs**: Real-time debugging information
- **Performance**: Automatic scaling and optimization

## 🎉 Benefits

- ✅ **No API Key Required**: Users can start immediately
- ✅ **Secure**: API keys never exposed to frontend
- ✅ **Scalable**: Automatic scaling with Firebase
- ✅ **Reliable**: Built-in error handling and retries
- ✅ **Cost-Effective**: Pay only for actual usage

## 🔄 Next Steps

1. Set up your Firebase project
2. Configure the API key
3. Deploy the functions
4. Deploy the frontend
5. Test the complete flow

Your app will now work without requiring users to enter their API key!
