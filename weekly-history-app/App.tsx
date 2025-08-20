import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import {
  History,
  Email,
  Archive,
  Add
} from '@mui/icons-material';
import { EmailSignup } from './components/EmailSignup';
import { WeeklySummary } from './components/WeeklySummary';
import { SummaryArchive } from './components/SummaryArchive';
import { summaryService } from './services/summaryService';
import { emailService } from './services/emailService';
import { WeeklySummary as WeeklySummaryType } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

type View = 'home' | 'signup' | 'archive' | 'summary';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentSummary, setCurrentSummary] = useState<WeeklySummaryType | null>(null);

  useEffect(() => {
    loadLatestSummary();
  }, []);

  const loadLatestSummary = async () => {
    try {
      let summary = await summaryService.getLatestSummary();
      
      // If no summary exists, generate one
      if (!summary) {
        summary = await summaryService.generateWeeklySummary();
      }
      
      setCurrentSummary(summary);
    } catch (error) {
      console.error('Error loading latest summary:', error);
    }
  };

  const handleGenerateNewSummary = async () => {
    try {
      const newSummary = await summaryService.generateWeeklySummary();
      setCurrentSummary(newSummary);
      setCurrentView('summary');
    } catch (error) {
      console.error('Error generating new summary:', error);
    }
  };

  const handleSendWeeklyEmail = async () => {
    if (currentSummary) {
      try {
        await emailService.sendWeeklySummary(currentSummary);
        alert('Weekly summary sent to all subscribers!');
      } catch (error) {
        console.error('Error sending weekly email:', error);
        alert('Failed to send weekly email. Please try again.');
      }
    }
  };

  const speedDialActions = [
    {
      icon: <Add />,
      name: 'Generate New Summary',
      action: handleGenerateNewSummary
    },
    {
      icon: <Email />,
      name: 'Send Weekly Email',
      action: handleSendWeeklyEmail
    }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return <EmailSignup />;
      case 'archive':
        return (
          <SummaryArchive
            onSummarySelect={(summary) => {
              setCurrentSummary(summary);
              setCurrentView('summary');
            }}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'summary':
        return currentSummary ? (
          <WeeklySummary summary={currentSummary} />
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">No summary available</Typography>
          </Box>
        );
      default:
        return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                📚 Weekly Dose of History
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Discover fascinating historical events that shaped our world
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                From groundbreaking inventions to legendary athletes, engineering marvels to world-changing moments - 
                get your weekly dose of history delivered to your inbox or explore our archive.
              </Typography>
            </Box>

            {/* Latest Summary Preview */}
            {currentSummary && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                  This Week's Summary
                </Typography>
                <WeeklySummary summary={currentSummary} />
              </Box>
            )}

            {/* Call to Action */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                onClick={() => setCurrentView('signup')}
                sx={{ mr: 2, mb: 2 }}
              >
                Subscribe to Newsletter
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Archive />}
                onClick={() => setCurrentView('archive')}
                sx={{ mb: 2 }}
              >
                Browse Archive
              </Button>
            </Box>
          </Container>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <History sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Weekly Dose of History
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('home')}
              sx={{ mr: 1 }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('signup')}
              sx={{ mr: 1 }}
            >
              Subscribe
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('archive')}
            >
              Archive
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
          {renderView()}
        </Box>

        {/* Speed Dial for Admin Actions */}
        <SpeedDial
          ariaLabel="Admin actions"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default App;
