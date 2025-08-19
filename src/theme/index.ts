import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 28,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#00BCD4',
      light: '#4DD0E1',
      dark: '#0097A7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6B9D',
      light: '#FF8FB1',
      dark: '#E91E63',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    grey: {
      50: '#FAFBFC',
      100: '#F5F7FA',
      200: '#E8ECF1',
      300: '#D1D9E0',
      400: '#B8C2CC',
      500: '#8A94A6',
      600: '#6B7280',
      700: '#4A5568',
      800: '#2D3748',
      900: '#1A202C',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4DD0E1',
      light: '#80DEEA',
      dark: '#00BCD4',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF8FB1',
      light: '#FFB3D1',
      dark: '#FF6B9D',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    grey: {
      50: '#FAFBFC',
      100: '#F5F7FA',
      200: '#E8ECF1',
      300: '#D1D9E0',
      400: '#B8C2CC',
      500: '#8A94A6',
      600: '#6B7280',
      700: '#4A5568',
      800: '#2D3748',
      900: '#1A202C',
    },
  },
});
