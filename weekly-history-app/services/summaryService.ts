import { WeeklySummary, HistoricalEvent } from '../types';
import { getRandomEvents } from '../data/historicalEvents';
import { format, startOfWeek } from 'date-fns';

export class SummaryService {
  private summaries: WeeklySummary[] = [];

  async generateWeeklySummary(): Promise<WeeklySummary> {
    try {
      // Get current week dates
      const now = new Date();
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
      // const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Sunday
      
      const weekOf = format(weekStart, 'MMM d, yyyy');
      
      // Get random events for this week
      const events = getRandomEvents(4); // 4 events per week
      
      // Generate theme based on events
      const theme = this.generateTheme(events);
      
      // Generate summary
      const summary = this.generateSummary(events, theme);
      
      const weeklySummary: WeeklySummary = {
        id: Date.now().toString(),
        weekOf,
        events,
        theme,
        summary,
        publishedAt: new Date().toISOString()
      };

      // Store the summary
      this.summaries.unshift(weeklySummary);
      
      // Keep only last 52 summaries (1 year)
      if (this.summaries.length > 52) {
        this.summaries = this.summaries.slice(0, 52);
      }

      return weeklySummary;
    } catch (error) {
      console.error('Error generating weekly summary:', error);
      throw new Error('Failed to generate weekly summary');
    }
  }

  async getLatestSummary(): Promise<WeeklySummary | null> {
    return this.summaries.length > 0 ? this.summaries[0] : null;
  }

  async getAllSummaries(): Promise<WeeklySummary[]> {
    return [...this.summaries];
  }

  async getSummaryById(id: string): Promise<WeeklySummary | null> {
    return this.summaries.find(summary => summary.id === id) || null;
  }

  private generateTheme(events: HistoricalEvent[]): string {
    const categories = events.map(event => event.category);
    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantCategory = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    const themes = {
      'invention': 'Innovation & Discovery',
      'athlete': 'Triumph & Achievement',
      'engineering': 'Engineering Marvels',
      'world-history': 'World-Changing Moments'
    };

    return themes[dominantCategory as keyof typeof themes] || 'Historical Highlights';
  }

  private generateSummary(events: HistoricalEvent[], theme: string): string {
    const years = events.map(event => event.year).sort((a, b) => a - b);
    const yearSpan = years[years.length - 1] - years[0];
    
    const categoryNames = events.map(event => {
      const categories = {
        'invention': 'invention',
        'athlete': 'athletic achievement',
        'engineering': 'engineering feat',
        'world-history': 'world-changing event'
      };
      return categories[event.category];
    });

    const uniqueCategories = [...new Set(categoryNames)];
    
    let summary = `This week we explore ${theme.toLowerCase()}, spanning ${yearSpan} years of human history. `;
    
    if (uniqueCategories.length === 1) {
      summary += `We focus on ${uniqueCategories[0]}s that shaped our world. `;
    } else {
      summary += `From ${uniqueCategories.slice(0, -1).join(', ')} to ${uniqueCategories[uniqueCategories.length - 1]}, `;
      summary += `these events demonstrate the diverse ways humans have pushed boundaries and changed history. `;
    }

    summary += `Each story reveals the courage, ingenuity, and determination that define our shared human experience.`;

    return summary;
  }

  // Generate a summary for a specific week (for testing or manual generation)
  async generateSummaryForWeek(weekStart: Date): Promise<WeeklySummary> {
    const weekOf = format(weekStart, 'MMM d, yyyy');
    const events = getRandomEvents(4);
    const theme = this.generateTheme(events);
    const summary = this.generateSummary(events, theme);

    const weeklySummary: WeeklySummary = {
      id: Date.now().toString(),
      weekOf,
      events,
      theme,
      summary,
      publishedAt: new Date().toISOString()
    };

    this.summaries.unshift(weeklySummary);
    return weeklySummary;
  }
}

export const summaryService = new SummaryService();
