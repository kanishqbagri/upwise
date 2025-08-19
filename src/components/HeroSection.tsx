import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
        py: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 600,
            mx: 'auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1.5,
              letterSpacing: '-0.02em',
            }}
          >
            Discover Amazing Apps
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{
              mb: 3,
              maxWidth: 450,
              mx: 'auto',
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Explore our curated collection of innovative applications designed to enhance your learning, productivity, and lifestyle.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 3,
                py: 1,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Explore Apps
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 3,
                py: 1,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
          filter: 'blur(20px)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}20, ${theme.palette.primary.light}20)`,
          filter: 'blur(15px)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};
