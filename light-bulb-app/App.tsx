import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Lightbulb, LightbulbOutlined } from '@mui/icons-material';

const funnyMessages = [
  "You're really brightening up my day! 💡",
  "Click me again, I dare you! ⚡",
  "Are you trying to solve world peace? 🌍",
  "This bulb has seen things... \ud83d\udc40",
  "You're like a moth to a flame! 🦋",
  "Energy conservation? Never heard of it! 🔋",
  "My electricity bill is crying 😭",
  "You're giving me ideas! 💭",
  "This is getting lit! 🔥",
  "Are you a light switch tester? 🧪",
  "I feel so enlightened! ✨",
  "You're really turning me on! 😏",
  "This is illuminating! 📚",
  "You're a bright spark! ⚡",
  "I'm glowing with joy! 😊",
  "You're lighting up my life! 💖",
  "This is electrifying! ⚡",
  "You're a real bright idea! \ud83d\udca1",
  "I'm shining bright like a diamond! 💎",
  "You're making me feel special! \ud83c\udf1f"
];

const LightBulbApp: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isGlowing, setIsGlowing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Click the light bulb to turn it on! 💡");

  const handleBulbClick = () => {
    setIsGlowing(!isGlowing);
    setClickCount(prev => prev + 1);

    const messageIndex = Math.floor(clickCount / 3) % funnyMessages.length;
    setCurrentMessage(funnyMessages[messageIndex]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="h1"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Interactive Light Bulb
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Clicks: {clickCount}
          </Typography>
        </Paper>

        <Box
          onClick={handleBulbClick}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isGlowing ? 'scale(1.06)' : 'scale(1)',
            filter: isGlowing ? 'drop-shadow(0 0 60px #FFD700)' : 'none',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {isGlowing ? (
            <Lightbulb
              sx={{
                fontSize: isMobile ? 180 : 320,
                color: '#FFD700',
                filter: 'drop-shadow(0 0 60px #FFD700)',
              }}
            />
          ) : (
            <LightbulbOutlined
              sx={{
                fontSize: isMobile ? 180 : 320,
                color: theme.palette.grey[400],
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            maxWidth: 500,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              lineHeight: 1.4,
              color: theme.palette.text.primary,
            }}
          >
            {currentMessage}
          </Typography>
        </Paper>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: theme.palette.text.secondary,
            maxWidth: 400,
            mt: 2,
          }}
        >
          
        </Typography>
      </Box>
    </Container>
  );
};

export default LightBulbApp;
