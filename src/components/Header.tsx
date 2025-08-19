import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00BCD4, #FF6B9D)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                letterSpacing: '-0.01em',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🚀</span>
              Upwise
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onThemeToggle}
            color="inherit"
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
