import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '../theme';
import LightBulbApp from '../App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use light theme for the light bulb app
const theme = lightTheme;

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LightBulbApp />
    </ThemeProvider>
  </React.StrictMode>
);
