export interface App {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  url: string;
  icon: string;
  featured?: boolean;
  new?: boolean;
}

export type Category = 'learn-play' | 'productivity-tools' | 'life-lifestyle' | 'fun-funky';

export interface CategoryInfo {
  id: Category;
  title: string;
  description: string;
  emoji: string;
  color: string;
  apps: App[];
}

export interface StreakData {
  weeks: number;
  lastRelease: string;
  nextRelease: string;
}
