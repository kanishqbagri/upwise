# 📚 Weekly Dose of History

A comprehensive web application that generates and delivers weekly historical summaries via email. The app focuses on fascinating historical events across four main categories: inventions, athletes, engineering marvels, and world history.

## ✨ Features

### 🎯 Core Functionality
- **Weekly Summary Generation**: Automatically generates themed weekly summaries with 4 historical events
- **Email Newsletter**: Sends beautifully formatted weekly emails to subscribers
- **Email Signup**: User-friendly subscription form with category preferences
- **Archive System**: Browse past weekly summaries and historical events
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 📧 Email Features
- **Category Preferences**: Users can choose which historical categories they're interested in
- **Frequency Options**: Weekly or monthly delivery options
- **Beautiful Templates**: Professional HTML and text email templates
- **Unsubscribe Support**: Easy unsubscribe functionality

### 🏛️ Historical Categories
- **Inventions**: Groundbreaking discoveries and technological breakthroughs
- **Athletes**: Legendary sports achievements and athletic milestones
- **Engineering**: Marvelous engineering feats and infrastructure achievements
- **World History**: Pivotal moments that shaped human civilization

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for beautiful, responsive components
- **Vite** for fast development and building
- **date-fns** for date manipulation

### Backend (Serverless)
- **Vercel Functions** for API endpoints
- **Email Service Integration** (SendGrid, Mailgun, etc.)
- **Database Integration** (for subscriber management)

### Key Libraries
- `@mui/material` - UI components
- `@mui/icons-material` - Icons
- `date-fns` - Date utilities
- `react` & `react-dom` - Core React

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
weekly-history-app/
├── components/              # React components
│   ├── EmailSignup.tsx     # Newsletter subscription form
│   ├── WeeklySummary.tsx   # Weekly summary display
│   └── SummaryArchive.tsx  # Archive browsing
├── data/                   # Historical data
│   └── historicalEvents.ts # Database of historical events
├── services/               # Business logic
│   ├── emailService.ts     # Email handling
│   └── summaryService.ts   # Summary generation
├── types.ts               # TypeScript definitions
├── App.tsx               # Main application
└── index.tsx             # Entry point
```

## 🔧 Configuration

### Environment Variables

For production deployment, you'll need to set up:

```env
# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_key
MAILGUN_API_KEY=your_mailgun_key

# Database (for subscriber management)
DATABASE_URL=your_database_url

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Email Service Integration

The app is designed to work with popular email services:

1. **SendGrid** (Recommended)
2. **Mailgun**
3. **ConvertKit**
4. **Mailchimp**

## 📧 Email Features

### Subscription Management
- Email validation
- Category preferences
- Frequency selection (weekly/monthly)
- Unsubscribe functionality

### Email Templates
- Professional HTML templates
- Plain text fallbacks
- Responsive design
- Branded styling

### Content Generation
- Themed weekly summaries
- 4 historical events per week
- Automatic theme generation
- Significance explanations

## 🎨 UI/UX Features

### Design System
- Material Design principles
- Consistent color scheme
- Responsive grid layouts
- Smooth animations

### User Experience
- Intuitive navigation
- Clear call-to-actions
- Loading states
- Error handling
- Success feedback

## 📊 Data Management

### Historical Events Database
- 12+ curated historical events
- Categorized by type
- Rich metadata (dates, significance, tags)
- Easy to extend and maintain

### Summary Generation
- Random event selection
- Theme-based grouping
- Automatic summary writing
- Category distribution

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set up environment variables
3. Deploy - the app will be available at `/weekly-history/`

### Manual Deployment
1. Build the app: `npm run build`
2. Deploy the `dist/` directory to your hosting provider

## 🔌 API Endpoints

### `/api/subscribe`
- **Method**: POST
- **Purpose**: Handle email subscriptions
- **Body**: `{ email, preferences }`

### `/api/send-newsletter`
- **Method**: POST
- **Purpose**: Send weekly newsletters
- **Body**: `{ summary }`

## 📈 Future Enhancements

### Planned Features
- **AI-Powered Content**: Generate summaries using AI
- **Social Sharing**: Share summaries on social media
- **User Profiles**: Personalized content preferences
- **Interactive Elements**: Quizzes, polls, and discussions
- **Mobile App**: Native mobile application
- **Analytics**: Track engagement and readership

### Content Expansion
- **More Categories**: Art, music, literature, science
- **Regional Focus**: Local and regional history
- **Timeline Views**: Interactive historical timelines
- **Deep Dives**: Detailed articles on specific events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is for educational and entertainment purposes.

## 🆘 Support

For questions or support:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

**Weekly Dose of History** - Making history accessible, one week at a time! 📚✨
