# Upwise Deployment Guide

This repository has been rearchitected for deployment to Vercel with the following structure:

## URL Structure
- `https://upwise.vercel.app/` → Landing page (root)
- `https://upwise.vercel.app/pokemon/` → Pokémon Trivia Challenge app
- `https://upwise.vercel.app/math/` → Princess Math Quest app
- `https://upwise.vercel.app/opposites/` → Opposites Flash Cards app

## Architecture

### Main Landing Page
- Located in the root directory
- Built with Vite/React
- Serves as the entry point with links to all sub-apps
- Build output: `dist/`

### Sub-Apps
Each sub-app is a complete, independent Vite/React application:
- `pokémon-trivia-challenge/` → Built to `public/pokemon/`
- `princess-math-quest/` → Built to `public/math/`
- `opposites-flash-cards-for-kids/` → Built to `public/opposites/`

## Build Process

The build process is handled by the main `package.json` scripts:

1. **`npm run build:subapps`** - Builds all sub-apps and copies them to `public/`
2. **`npm run build:main`** - Builds the main landing page
3. **`npm run build`** - Runs both steps in sequence

### Build Script Details
The `scripts/build.js` script:
- Installs dependencies for each sub-app
- Builds each sub-app using its own Vite configuration
- Copies build outputs to the appropriate `public/` subdirectory
- Handles errors gracefully

## Vercel Configuration

The `vercel.json` file configures:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite
- **Rewrites**: Routes sub-app URLs to their respective `index.html` files
- **Headers**: Cache control for static assets

## Local Development

### Running the Landing Page
```bash
npm run dev
```

### Running Individual Sub-Apps
```bash
# Pokémon app
cd pokémon-trivia-challenge && npm run dev

# Math app
cd princess-math-quest && npm run dev

# Opposites app
cd opposites-flash-cards-for-kids && npm run dev
```

## Deployment

1. **Connect to Vercel**: Link your GitHub repository to Vercel
2. **Build Settings**: Vercel will automatically detect the build command from `vercel.json`
3. **Environment Variables**: Set any required environment variables (e.g., `GEMINI_API_KEY`) in Vercel dashboard
4. **Deploy**: Push to main branch to trigger automatic deployment

## File Structure After Build

```
upwise/
├── dist/                    # Main landing page build
├── public/
│   ├── pokemon/            # Pokémon app build
│   ├── math/              # Math app build
│   ├── opposites/         # Opposites app build
│   └── favicon.ico
├── pokémon-trivia-challenge/  # Source code
├── princess-math-quest/       # Source code
├── opposites-flash-cards-for-kids/  # Source code
├── package.json
├── vercel.json
└── scripts/build.js
```

## Troubleshooting

### Build Failures
- Ensure all sub-apps have valid `package.json` files
- Check that all dependencies are properly specified
- Verify that each sub-app's Vite config has the correct `base` path

### Routing Issues
- Verify that `vercel.json` rewrites are correctly configured
- Ensure sub-apps are built to the correct `public/` subdirectories
- Check that each sub-app's `index.html` is in the root of its build directory

### Asset Loading Issues
- Confirm that each sub-app's Vite config has the correct `base` path
- Check that assets are being copied correctly during build
- Verify that asset paths in the built HTML files are correct
