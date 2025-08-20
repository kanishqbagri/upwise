export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  year: number;
  category: 'invention' | 'athlete' | 'engineering' | 'world-history';
  significance: string;
  imageUrl?: string;
  tags: string[];
}

export interface WeeklySummary {
  id: string;
  weekOf: string;
  events: HistoricalEvent[];
  theme: string;
  summary: string;
  publishedAt: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  preferences: {
    categories: string[];
    frequency: 'weekly' | 'monthly';
  };
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}
