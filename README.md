# Upwise

A collection of educational apps and games, deployed as a multi-app platform on Vercel.

## 🚀 Live Demo

- **Landing Page**: https://upwise.vercel.app/
- **Pokémon Trivia Challenge**: https://upwise.vercel.app/pokemon/
- **Princess Math Quest**: https://upwise.vercel.app/math/
- **Opposites Flash Cards**: https://upwise.vercel.app/opposites/

## 📁 Project Structure

```
upwise/
├── src/                           # Main landing page source
│   ├── App.tsx                   # Main landing page component
│   └── main.tsx                  # Main entry point
├── components/                    # Shared components
├── config/                       # App configuration
├── pokémon-trivia-challenge/     # Pokémon app source
├── princess-math-quest/          # Math app source
├── opposites-flash-cards-for-kids/ # Opposites app source
├── public/                       # Static assets and built sub-apps
├── dist/                         # Main app build output
├── scripts/                      # Build scripts
├── package.json                  # Main dependencies and scripts
└── vercel.json                   # Vercel deployment config
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the landing page**:
   ```bash
   npm run dev
   ```

3. **Run individual sub-apps**:
   ```bash
   # Pokémon app
   cd pokémon-trivia-challenge && npm run dev
   
   # Math app
   cd princess-math-quest && npm run dev
   
   # Opposites app
   cd opposites-flash-cards-for-kids && npm run dev
   ```

## 🏗️ Build Process

The build process automatically:
1. Builds all sub-apps with their respective configurations
2. Copies build outputs to `public/<app-name>/` directories
3. Builds the main landing page
4. Creates a deployable structure for Vercel

### Build Commands

```bash
# Build everything
npm run build

# Build only sub-apps
npm run build:subapps

# Build only main landing page
npm run build:main
```

## 🚀 Deployment

This project is configured for automatic deployment on Vercel:

1. **Connect to Vercel**: Link your GitHub repository
2. **Environment Variables**: Set `GEMINI_API_KEY` if needed
3. **Automatic Deployment**: Push to main branch

The `vercel.json` file handles:
- Build command: `npm run build`
- Output directory: `dist/`
- URL routing for sub-apps
- Cache headers for static assets

## 📱 Apps Included

### Pokémon Trivia Challenge
- Interactive Pokémon trivia questions
- Badge collection system
- Progressive difficulty levels

### Princess Math Quest
- Princess-themed math learning games
- Adaptive difficulty
- Visual feedback and rewards

### Opposites Flash Cards
- Interactive flash cards for learning opposites
- Kid-friendly interface
- Audio support

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **AI Integration**: Google Gemini API (where applicable)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

For detailed deployment information, see [DEPLOYMENT.md](DEPLOYMENT.md).
