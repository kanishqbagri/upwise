import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.04); }
`;

const wordReveal = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const stats = [
  { value: '16+', label: 'Apps' },
  { value: '4', label: 'Categories' },
  { value: 'Weekly', label: 'New Releases' },
];

const headlineWords = ['Discover', 'Amazing', 'Apps'];

export const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${theme.palette.primary.dark}18 0%, ${theme.palette.background.default} 50%, ${theme.palette.secondary.dark}12 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.background.default} 50%, ${theme.palette.secondary.main}08 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${theme.palette.primary.main}22 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          zIndex: 0,
          opacity: theme.palette.mode === 'dark' ? 0.6 : 0.5,
        },
      }}
    >
      {/* Animated blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '8%',
          right: isMobile ? '-5%' : '8%',
          width: isMobile ? 180 : 300,
          height: isMobile ? 180 : 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent 70%)`,
          animation: `${float} 7s ease-in-out infinite`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: isMobile ? '-5%' : '6%',
          width: isMobile ? 140 : 220,
          height: isMobile ? 140 : 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}18, transparent 70%)`,
          animation: `${floatSlow} 9s ease-in-out infinite 1.5s`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '55%',
          right: isMobile ? '-10%' : '2%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15, transparent 70%)`,
          animation: `${float} 11s ease-in-out infinite 3s`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 680,
            mx: 'auto',
            py: { xs: 6, md: 10 },
          }}
        >
          {/* Staggered headline */}
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 2,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1, md: 1.5 },
              justifyContent: 'center',
            }}
          >
            {headlineWords.map((word, i) => (
              <Box
                key={word}
                component="span"
                sx={{
                  display: 'inline-block',
                  opacity: 0,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: `${wordReveal} 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.13}s forwards`,
                }}
              >
                {word}
              </Box>
            ))}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: 480,
              mx: 'auto',
              lineHeight: 1.5,
              fontWeight: 400,
              opacity: 0,
              animation: `${fadeUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.42s forwards`,
            }}
          >
            Explore our curated collection of innovative applications designed to enhance your learning, productivity, and lifestyle.
          </Typography>

          {/* CTAs */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 5,
              opacity: 0,
              animation: `${fadeUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards`,
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 3.5,
                py: 1.25,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  boxShadow: `0 8px 30px ${theme.palette.primary.main}50`,
                },
              }}
            >
              Explore Apps
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 3.5,
                py: 1.25,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderWidth: 1.5,
                '&:hover': {
                  borderWidth: 1.5,
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: `${theme.palette.primary.main}0D`,
                },
              }}
            >
              Learn More
            </Button>
          </Box>

          {/* Stats bar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              flexWrap: 'wrap',
              opacity: 0,
              animation: `${fadeUp} 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.68s forwards`,
            }}
          >
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </Typography>
                </Box>
                {i < stats.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: theme.palette.divider, height: 32, alignSelf: 'center' }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
