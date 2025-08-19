<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Green Thumb AI 🌱

An AI-powered plant identification app that uses Google's Gemini AI to identify plants from photos and provide detailed care instructions.

## Features

- **Plant Identification**: Upload a photo to identify plants using AI
- **Detailed Information**: Get plant name, scientific name, type, and origin
- **Care Instructions**: Receive specific watering and sunlight requirements
- **Interactive Hotspots**: Click on plant features to learn more
- **Fun Facts**: Discover interesting information about each plant
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Material Icons
- **AI**: Google Gemini AI (Gemini 2.5 Flash)
- **Deployment**: Vercel

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Environment Variables

### Required
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

### Getting a Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

## Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add the environment variable `VITE_GEMINI_API_KEY` in Vercel dashboard
3. Deploy - the app will be available at `/green-thumb/`

### Manual Deployment
1. Build the app: `npm run build`
2. The built files will be in the `dist/` directory
3. Deploy the contents to your hosting provider

## API Usage

The app uses Google's Gemini AI to:
- Analyze uploaded plant images
- Generate structured plant data including:
  - Plant name and scientific name
  - Care instructions (watering, sunlight)
  - Origin information
  - Fun facts
  - Interactive hotspots with coordinates

## Project Structure

```
green-thumb-ai/
├── components/          # React components
│   ├── ErrorDisplay.tsx
│   ├── Hotspot.tsx
│   ├── ImageUploader.tsx
│   ├── InteractiveImage.tsx
│   ├── LoadingSpinner.tsx
│   ├── PlantInfoCard.tsx
│   └── icons.tsx
├── services/           # API services
│   └── geminiService.ts
├── types.ts           # TypeScript type definitions
├── App.tsx           # Main app component
├── index.tsx         # App entry point
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and entertainment purposes.
