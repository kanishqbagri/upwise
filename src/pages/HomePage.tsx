import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { HeroSection } from '../components/HeroSection';
import { CategoryCard } from '../components/CategoryCard';
import { AppCard } from '../components/AppCard';
import { StreakWidget } from '../components/StreakWidget';
import { categories, featuredApps, newApps } from '../data/apps';
import { useInView } from '../hooks/useInView';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
  onAppClick: (app: any) => void;
}

// Render-prop section: stays invisible until scrolled into view, then
// passes inView=true so children can start their own stagger animations.
interface AnimatedSectionProps {
  children: (inView: boolean) => React.ReactNode;
  headingSlot?: React.ReactNode;
  mb?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, headingSlot, mb = 8 }) => {
  const { ref, inView } = useInView();
  return (
    <Box ref={ref} sx={{ mb, opacity: inView ? undefined : 0 }}>
      {headingSlot && (
        <Box
          sx={{
            opacity: 0,
            ...(inView && { animation: `${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards` }),
          }}
        >
          {headingSlot}
        </Box>
      )}
      {children(inView)}
    </Box>
  );
};

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
        {/* Categories */}
        <AnimatedSection
          headingSlot={
            <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
              Explore Categories
            </Typography>
          }
        >
          {(inView) => (
            <Grid container spacing={4}>
              {categories.map((category, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  key={category.id}
                  sx={{
                    opacity: 0,
                    ...(inView && {
                      animation: `${fadeUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * 70}ms forwards`,
                    }),
                  }}
                >
                  <CategoryCard category={category} onClick={() => onCategoryClick(category.id)} />
                </Grid>
              ))}
            </Grid>
          )}
        </AnimatedSection>

        {/* Featured Apps */}
        <AnimatedSection
          headingSlot={
            <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
              Featured Apps
            </Typography>
          }
        >
          {(inView) => (
            <Grid container spacing={4}>
              {featuredApps.map((app, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={app.id}
                  sx={{
                    opacity: 0,
                    ...(inView && {
                      animation: `${fadeUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * 70}ms forwards`,
                    }),
                  }}
                >
                  <AppCard app={app} onClick={() => onAppClick(app)} />
                </Grid>
              ))}
            </Grid>
          )}
        </AnimatedSection>

        {/* New Apps + Streak */}
        <AnimatedSection mb={0}>
          {(inView) => (
            <Grid container spacing={4}>
              <Grid item xs={12} lg={8}>
                <Box
                  sx={{
                    opacity: 0,
                    ...(inView && { animation: `${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards` }),
                  }}
                >
                  <Typography variant="h2" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
                    This Week's New Apps
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {newApps.map((app, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={app.id}
                      sx={{
                        opacity: 0,
                        ...(inView && {
                          animation: `${fadeUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms forwards`,
                        }),
                      }}
                    >
                      <AppCard app={app} onClick={() => onAppClick(app)} />
                    </Grid>
                  ))}
                  {newApps.length === 0 && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', py: 8, color: theme.palette.text.secondary }}>
                        <Typography variant="h6" gutterBottom>No new apps this week</Typography>
                        <Typography variant="body2">Check back next week for fresh releases!</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Box
                  sx={{
                    position: 'sticky',
                    top: 24,
                    opacity: 0,
                    ...(inView && {
                      animation: `${fadeUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards`,
                    }),
                  }}
                >
                  <StreakWidget {...streakData} />
                </Box>
              </Grid>
            </Grid>
          )}
        </AnimatedSection>
      </Container>
    </Box>
  );
};
