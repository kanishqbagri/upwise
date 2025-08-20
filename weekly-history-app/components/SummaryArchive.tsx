import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  History,
  CalendarToday,
  ArrowBack
} from '@mui/icons-material';
import { WeeklySummary } from '../types';
import { summaryService } from '../services/summaryService';

interface SummaryArchiveProps {
  onSummarySelect: (summary: WeeklySummary) => void;
  onBack: () => void;
}

export const SummaryArchive: React.FC<SummaryArchiveProps> = ({ onSummarySelect, onBack }) => {
  const [summaries, setSummaries] = useState<WeeklySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummaries();
  }, []);

  const loadSummaries = async () => {
    try {
      setLoading(true);
      const allSummaries = await summaryService.getAllSummaries();
      
      // If no summaries exist, generate a few for demonstration
      if (allSummaries.length === 0) {
        const demoSummaries = [];
        for (let i = 0; i < 4; i++) {
          const weekStart = new Date();
          weekStart.setDate(weekStart.getDate() - (i * 7));
          const summary = await summaryService.generateSummaryForWeek(weekStart);
          demoSummaries.push(summary);
        }
        setSummaries(demoSummaries);
      } else {
        setSummaries(allSummaries);
      }
    } catch (error) {
      console.error('Error loading summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryClick = (summary: WeeklySummary) => {
    onSummarySelect(summary);
  };

  const getCategoryCounts = (events: WeeklySummary['events']) => {
    const counts = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{ color: 'white', mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            📚 Weekly History Archive
          </Typography>
        </Box>
        <Typography variant="body1">
          Browse through past weekly summaries and discover fascinating historical events.
        </Typography>
      </Paper>

      {/* Summaries Grid */}
      <Grid container spacing={3}>
        {summaries.map((summary) => {
          const categoryCounts = getCategoryCounts(summary.events);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={summary.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => handleSummaryClick(summary)}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Week Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h3">
                      {summary.weekOf}
                    </Typography>
                  </Box>

                  {/* Theme */}
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    {summary.theme}
                  </Typography>

                  {/* Summary Preview */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ 
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {summary.summary}
                  </Typography>

                  {/* Category Distribution */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Categories:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {Object.entries(categoryCounts).map(([category, count]) => (
                        <Chip
                          key={category}
                          label={`${category} (${count})`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Event Count */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {summary.events.length} historical events
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined"
                      sx={{ textTransform: 'none' }}
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State */}
      {summaries.length === 0 && (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <History sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Weekly Summaries Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Weekly summaries will appear here once they're generated.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};
