import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import { Email, History, Sports, Engineering, Science } from '@mui/icons-material';
import { emailService } from '../services/emailService';

const categories = [
  { value: 'invention', label: 'Inventions', icon: <Science /> },
  { value: 'athlete', label: 'Athletes', icon: <Sports /> },
  { value: 'engineering', label: 'Engineering', icon: <Engineering /> },
  { value: 'world-history', label: 'World History', icon: <History /> }
];

export const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['invention', 'athlete', 'engineering', 'world-history']);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || selectedCategories.length === 0) {
      setMessage({ type: 'error', text: 'Please enter an email and select at least one category.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const success = await emailService.subscribe(email, {
        categories: selectedCategories,
        frequency
      });

      if (success) {
        setMessage({ 
          type: 'success', 
          text: 'Successfully subscribed! You\'ll receive your first weekly dose of history soon.' 
        });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h2" gutterBottom>
          Get Your Weekly Dose of History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Subscribe to receive fascinating historical events delivered to your inbox every week.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 3 }}
          placeholder="your.email@example.com"
        />

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">
            <Typography variant="h6">Categories of Interest</Typography>
          </FormLabel>
          <FormGroup row>
            {categories.map((category) => (
              <FormControlLabel
                key={category.value}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => handleCategoryChange(category.value)}
                    icon={category.icon}
                    checkedIcon={category.icon}
                  />
                }
                label={category.label}
                sx={{ minWidth: 120 }}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">
            <Typography variant="h6">Frequency</Typography>
          </FormLabel>
          <RadioGroup
            row
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'weekly' | 'monthly')}
          >
            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
            <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
          </RadioGroup>
        </FormControl>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ py: 1.5 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Subscribe to Newsletter'
          )}
        </Button>
      </form>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        We respect your privacy. Unsubscribe at any time.
      </Typography>
    </Paper>
  );
};
