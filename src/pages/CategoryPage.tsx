import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  useTheme,
} from '@mui/material';
import { NavigateNext, ArrowBack } from '@mui/icons-material';
import { AppCard } from '../components/AppCard';
import { categories } from '../data/apps';
import { Category } from '../types';

interface CategoryPageProps {
  categoryId: Category;
  onAppClick: (app: any) => void;
  onBackClick: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onAppClick,
  onBackClick,
}) => {
  const theme = useTheme();
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" color="error">
          Category not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ mb: 4 }}
      >
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBackClick();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <ArrowBack sx={{ mr: 0.5, fontSize: '1rem' }} />
          Home
        </Link>
        <Typography color="text.primary">{category.title}</Typography>
      </Breadcrumbs>

      {/* Category Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '3rem',
              mr: 3,
            }}
          >
            {category.emoji}
          </Typography>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                color: category.color,
                mb: 1,
              }}
            >
              {category.title}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {category.description}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {category.apps.length} apps available
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Apps Grid */}
      {category.apps.length > 0 ? (
        <Grid container spacing={4}>
          {category.apps.map((app) => (
            <Grid item xs={12} sm={6} lg={4} key={app.id}>
              <AppCard
                app={app}
                onClick={() => onAppClick(app)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 12,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="h4" gutterBottom>
            No apps in this category yet
          </Typography>
          <Typography variant="body1">
            We're working on adding apps to this category. Check back soon!
          </Typography>
        </Box>
      )}
    </Container>
  );
};
