import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { Launch, NewReleases, Schedule } from '@mui/icons-material';
import { App } from '../types';

interface AppCardProps {
  app: App;
  onClick: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  const theme = useTheme();
  const isDummyApp = app.url === '#';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isDummyApp ? 'default' : 'pointer',
        position: 'relative',
        opacity: isDummyApp ? 0.7 : 1,
        '&:hover': {
          transform: isDummyApp ? 'none' : 'translateY(-4px)',
        },
      }}
      onClick={isDummyApp ? undefined : onClick}
    >
      {app.new && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
          }}
        >
          <Chip
            icon={<NewReleases />}
            label="New"
            size="small"
            color="primary"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
            }}
          />
        </Box>
      )}

      {isDummyApp && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1,
          }}
        >
          <Chip
            icon={<Schedule />}
            label="Coming Soon"
            size="small"
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[400],
              color: theme.palette.grey[600],
              fontWeight: 500,
            }}
          />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: '2.5rem',
              mr: 2,
              opacity: isDummyApp ? 0.6 : 1,
            }}
          >
            {app.icon}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                lineHeight: 1.3,
                opacity: isDummyApp ? 0.8 : 1,
              }}
            >
              {app.title}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            lineHeight: 1.6,
            opacity: isDummyApp ? 0.7 : 1,
          }}
        >
          {app.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {app.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  opacity: isDummyApp ? 0.6 : 1,
                }}
              />
            ))}
            {app.tags.length > 3 && (
              <Chip
                label={`+${app.tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  opacity: isDummyApp ? 0.6 : 1,
                }}
              />
            )}
          </Box>
        </Box>

        <Button
          variant="contained"
          endIcon={isDummyApp ? <Schedule /> : <Launch />}
          disabled={isDummyApp}
          sx={{
            alignSelf: 'flex-start',
            mt: 'auto',
            opacity: isDummyApp ? 0.5 : 1,
          }}
        >
          {isDummyApp ? 'Coming Soon' : 'Try It'}
        </Button>
      </CardContent>
    </Card>
  );
};
