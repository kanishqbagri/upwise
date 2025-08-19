import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { TrendingUp, CalendarToday } from '@mui/icons-material';

interface StreakWidgetProps {
  weeks: number;
  lastRelease: string;
  nextRelease: string;
}

export const StreakWidget: React.FC<StreakWidgetProps> = ({
  weeks,
  lastRelease,
  nextRelease,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
        border: `1px solid ${theme.palette.primary.main}20`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp
            sx={{
              color: theme.palette.primary.main,
              mr: 1,
              fontSize: '1.5rem',
            }}
          />
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Release Streak
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 0.5,
            }}
          >
            {weeks}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            consecutive weeks of app releases
          </Typography>

          <LinearProgress
            variant="determinate"
            value={Math.min((weeks / 52) * 100, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.primary.light,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block' }}
            >
              Last Release
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {lastRelease}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block' }}
            >
              Next Release
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {nextRelease}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            p: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CalendarToday
            sx={{
              fontSize: '1rem',
              color: theme.palette.text.secondary,
              mr: 1,
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Weekly release schedule
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
