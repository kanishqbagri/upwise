import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { Category } from './types';

type Page = 'home' | Category;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId as Category);
    setCurrentPage(categoryId as Category);
  };

  const handleAppClick = (app: any) => {
    if (app.url.startsWith('http')) {
      window.open(app.url, '_blank');
    } else if (app.url.startsWith('/')) {
      window.location.href = app.url;
    } else {
      // Handle internal routing for future apps
      console.log('Navigating to:', app.url);
    }
  };

  const handleBackClick = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        
        {currentPage === 'home' ? (
          <HomePage
            onCategoryClick={handleCategoryClick}
            onAppClick={handleAppClick}
          />
        ) : (
          <CategoryPage
            categoryId={selectedCategory!}
            onAppClick={handleAppClick}
            onBackClick={handleBackClick}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;