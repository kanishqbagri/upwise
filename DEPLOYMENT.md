# Deployment Guide for Green Thumb AI

## Overview

The Green Thumb AI app has been successfully refactored for Vercel deployment and is now integrated into the main Upwise platform. Here's what was accomplished:

## ✅ Completed Refactoring

### 1. **Environment Variables Fixed**
- Changed from `process.env.API_KEY` to `import.meta.env.VITE_GEMINI_API_KEY`
- Added proper TypeScript declarations in `vite-env.d.ts`
- Updated Vite configuration to remove old environment handling

### 2. **Build System Integration**
- Added green thumb app to `scripts/build.js`
- Updated `vercel.json` with routing for `/green-thumb/`
- Fixed TypeScript configuration and dependencies

### 3. **Landing Page Integration**
- Added Green Thumb AI to `src/data/apps.ts`
- Mapped to "Productivity & Tools" category
- Set as featured and new app with 🌱 icon

### 4. **Dependencies Updated**
- Downgraded React to v18.2.0 for compatibility
- Added proper TypeScript types
- Updated Vite configuration with React plugin

## 🚀 Deployment Steps

### 1. **Set Up Environment Variables (SECURE)**

⚠️ **IMPORTANT SECURITY UPDATE**: The API key is now handled securely through a backend serverless function.

In your Vercel dashboard, add the following environment variable:

```
GEMINI_API_KEY=your_actual_gemini_api_key
```

**Note the difference**: 
- ❌ OLD (INSECURE): `VITE_GEMINI_API_KEY` - exposed to client
- ✅ NEW (SECURE): `GEMINI_API_KEY` - server-side only

**To get a Gemini API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to Vercel environment variables (without VITE_ prefix)

### 2. **Deploy to Vercel**

The app is now ready for deployment. When you push to your main branch, Vercel will:

1. Run `npm run build` (which builds all sub-apps including green-thumb)
2. Deploy the main app to the root domain
3. Make green-thumb available at `/green-thumb/`

### 3. **Verify Deployment**

After deployment, you should be able to access:
- Main app: `https://your-domain.vercel.app/`
- Green Thumb AI: `https://your-domain.vercel.app/green-thumb/`

## 📁 File Structure

```
upwise/
├── green-thumb-ai/           # The refactored app
│   ├── components/           # React components
│   ├── services/            # Gemini AI service
│   ├── vite-env.d.ts        # Environment type declarations
│   ├── tsconfig.json        # TypeScript config
│   └── package.json         # Dependencies
├── scripts/build.js         # Updated to include green-thumb
├── vercel.json             # Updated with green-thumb routing
└── src/data/apps.ts        # Updated with green-thumb entry
```

## 🔧 Local Development

To test locally:

```bash
# Install dependencies
npm install

# Set environment variable
echo "VITE_GEMINI_API_KEY=your_key_here" > green-thumb-ai/.env

# Start development server
cd green-thumb-ai && npm run dev
```

## 🎯 Features

The Green Thumb AI app includes:
- **Plant Identification**: Upload photos to identify plants
- **Care Instructions**: Get watering and sunlight requirements
- **Interactive Hotspots**: Click on plant features for details
- **Responsive Design**: Works on all devices
- **Error Handling**: Graceful error messages and retry options

## 🐛 Troubleshooting

### Common Issues:

1. **"Gemini API key not configured"**
   - Ensure `VITE_GEMINI_API_KEY` is set in Vercel environment variables
   - Check that the key is valid and has proper permissions

2. **Build fails**
   - Run `npm install` in the green-thumb-ai directory
   - Check that all dependencies are properly installed

3. **App not accessible at /green-thumb/**
   - Verify the vercel.json routing configuration
   - Check that the build process completed successfully

## 🔒 Security Implementation

### API Key Protection
- **Backend Proxy**: API calls now go through a Vercel serverless function (`/api/identify-plant`)
- **Server-side Only**: Gemini API key is stored server-side and never exposed to the client
- **No Client-side Secrets**: Frontend code contains no sensitive information

### How It Works
1. **Frontend**: Converts image to base64 and sends to `/api/identify-plant`
2. **Backend**: Serverless function receives image data and calls Gemini API
3. **Secure**: API key is only accessible on the server, never in browser

### Previous Security Issue (FIXED)
- ❌ **Before**: `VITE_GEMINI_API_KEY` was embedded in client JavaScript (visible to anyone)
- ✅ **After**: `GEMINI_API_KEY` is server-side only, completely hidden from users

## 📝 Notes

- The app uses Google Gemini 2.5 Flash for plant identification
- All API calls are now made through a secure backend proxy
- The app is designed for educational and entertainment purposes
- Images are processed locally and sent securely to the backend API

## 🔗 Links

- **Green Thumb AI**: `/green-thumb/`
- **Main Landing Page**: `/`
- **Productivity Tools Category**: `/category/productivity-tools`
