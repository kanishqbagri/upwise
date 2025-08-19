import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { HeroSection } from '../components/HeroSection';
import { CategoryCard } from '../components/CategoryCard';
import { AppCard } from '../components/AppCard';
import { StreakWidget } from '../components/StreakWidget';
import { categories, featuredApps, newApps } from '../data/apps';

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
  onAppClick: (app: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCategoryClick, onAppClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const streakData = {
    weeks: 12,
    lastRelease: 'Dec 15, 2024',
    nextRelease: 'Dec 22, 2024',
  };

  return (
    <Box>
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Categories Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
            }}
          >
            Explore Categories
          </Typography>

          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} lg={3} key={category.id}>
                <CategoryCard
                  category={category}
                  onClick={() => onCategoryClick(category.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Apps Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
            }}
          >
            Featured Apps
          </Typography>

          <Grid container spacing={4}>
            {featuredApps.map((app) => (
              <Grid item xs={12} sm={6} lg={4} key={app.id}>
                <AppCard
                  app={app}
                  onClick={() => onAppClick(app)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* This Week's New Apps & Streak Widget */}
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Box>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  mb: 4,
                  fontWeight: 700,
                }}
              >
                This Week's New Apps
              </Typography>

              <Grid container spacing={3}>
                {newApps.map((app) => (
                  <Grid item xs={12} sm={6} key={app.id}>
                    <AppCard
                      app={app}
                      onClick={() => onAppClick(app)}
                    />
                  </Grid>
                ))}
                {newApps.length === 0 && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 8,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        No new apps this week
                      </Typography>
                      <Typography variant="body2">
                        Check back next week for fresh releases!
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <StreakWidget {...streakData} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
