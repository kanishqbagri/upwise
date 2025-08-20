import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import {
  History,
  Sports,
  Engineering,
  Science,
  CalendarToday,
  TrendingUp
} from '@mui/icons-material';
import { WeeklySummary as WeeklySummaryType } from '../types';
import { format } from 'date-fns';

interface WeeklySummaryProps {
  summary: WeeklySummaryType;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'invention':
      return <Science />;
    case 'athlete':
      return <Sports />;
    case 'engineering':
      return <Engineering />;
    case 'world-history':
      return <History />;
    default:
      return <History />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'invention':
      return '#2196f3';
    case 'athlete':
      return '#4caf50';
    case 'engineering':
      return '#ff9800';
    case 'world-history':
      return '#9c27b0';
    default:
      return '#757575';
  }
};

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ summary }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            📚 Weekly Dose of History
          </Typography>
          <Typography variant="h5" gutterBottom>
            {summary.theme}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
            <CalendarToday />
            <Typography variant="h6">
              Week of {summary.weekOf}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
          This Week's Theme
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {summary.summary}
        </Typography>
      </Paper>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {summary.events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Event Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: getCategoryColor(event.category),
                      mr: 2
                    }}
                  >
                    {getCategoryIcon(event.category)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.date} • {event.year}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Event Description */}
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                  {event.description}
                </Typography>

                {/* Significance */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Historical Significance:
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                    {event.significance}
                  </Typography>
                </Box>

                {/* Tags */}
                <Box sx={{ mt: 'auto' }}>
                  {event.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1, backgroundColor: '#e3f2fd' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Paper elevation={1} sx={{ p: 3, mt: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          Published on {format(new Date(summary.publishedAt), 'MMMM d, yyyy')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Subscribe to receive these weekly historical insights directly in your inbox!
        </Typography>
      </Paper>
    </Box>
  );
};
