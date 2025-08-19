import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { CategoryInfo } from '../types';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        background: `linear-gradient(135deg, ${category.color}10, ${category.color}05)`,
        border: `1px solid ${category.color}20`,
        '&:hover': {
          borderColor: category.color,
          background: `linear-gradient(135deg, ${category.color}15, ${category.color}10)`,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: '3rem',
              mr: 2,
            }}
          >
            {category.emoji}
          </Typography>
          <Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                color: category.color,
                mb: 0.5,
              }}
            >
              {category.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.4 }}
            >
              {category.apps.length} apps
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            flexGrow: 1,
            lineHeight: 1.6,
          }}
        >
          {category.description}
        </Typography>

        <Button
          variant="outlined"
          endIcon={<ArrowForward />}
          sx={{
            alignSelf: 'flex-start',
            borderColor: category.color,
            color: category.color,
            '&:hover': {
              backgroundColor: `${category.color}10`,
              borderColor: category.color,
            },
          }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
};
