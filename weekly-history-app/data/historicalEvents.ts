import { HistoricalEvent } from '../types';

export const historicalEvents: HistoricalEvent[] = [
  // Inventions
  {
    id: '1',
    title: 'The First Telephone Call',
    description: 'Alexander Graham Bell made the first successful telephone call to his assistant Thomas Watson, saying "Mr. Watson, come here, I want to see you."',
    date: 'March 10, 1876',
    year: 1876,
    category: 'invention',
    significance: 'This marked the birth of telecommunications and revolutionized global communication.',
    tags: ['telephone', 'communication', 'bell', 'technology'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '2',
    title: 'First Successful Airplane Flight',
    description: 'The Wright brothers achieved the first controlled, sustained flight of a powered aircraft at Kitty Hawk, North Carolina.',
    date: 'December 17, 1903',
    year: 1903,
    category: 'invention',
    significance: 'This breakthrough launched the aviation age and transformed transportation forever.',
    tags: ['aviation', 'wright-brothers', 'flight', 'transportation'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '3',
    title: 'First Computer Program',
    description: 'Ada Lovelace wrote the first algorithm intended to be processed by a machine, making her the first computer programmer.',
    date: '1843',
    year: 1843,
    category: 'invention',
    significance: 'Lovelace\'s work laid the foundation for modern computer programming and artificial intelligence.',
    tags: ['computer', 'programming', 'ada-lovelace', 'algorithm'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },

  // Athletes
  {
    id: '4',
    title: 'Jesse Owens Wins Four Gold Medals',
    description: 'At the 1936 Berlin Olympics, Jesse Owens won four gold medals in track and field, defying Nazi propaganda.',
    date: 'August 1936',
    year: 1936,
    category: 'athlete',
    significance: 'Owens\' achievements challenged racial stereotypes and became a symbol of triumph over adversity.',
    tags: ['olympics', 'track', 'jesse-owens', 'civil-rights'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '5',
    title: 'First Sub-4 Minute Mile',
    description: 'Roger Bannister became the first person to run a mile in under 4 minutes, achieving what was once thought impossible.',
    date: 'May 6, 1954',
    year: 1954,
    category: 'athlete',
    significance: 'This breakthrough showed that human limits are psychological as much as physical.',
    tags: ['running', 'roger-bannister', 'milestone', 'athletics'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '6',
    title: 'Muhammad Ali Wins Olympic Gold',
    description: 'Cassius Clay (later Muhammad Ali) won the light heavyweight boxing gold medal at the Rome Olympics.',
    date: 'September 5, 1960',
    year: 1960,
    category: 'athlete',
    significance: 'This marked the beginning of Ali\'s legendary career and his impact on sports and society.',
    tags: ['boxing', 'muhammad-ali', 'olympics', 'civil-rights'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },

  // Engineering
  {
    id: '7',
    title: 'Brooklyn Bridge Opens',
    description: 'The Brooklyn Bridge, connecting Manhattan and Brooklyn, opened to traffic as the longest suspension bridge in the world.',
    date: 'May 24, 1883',
    year: 1883,
    category: 'engineering',
    significance: 'This engineering marvel demonstrated the possibilities of steel construction and urban infrastructure.',
    tags: ['bridge', 'engineering', 'new-york', 'infrastructure'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '8',
    title: 'First Transatlantic Flight',
    description: 'Charles Lindbergh completed the first solo nonstop transatlantic flight from New York to Paris.',
    date: 'May 21, 1927',
    year: 1927,
    category: 'engineering',
    significance: 'This achievement proved the feasibility of long-distance air travel and connected continents.',
    tags: ['aviation', 'lindbergh', 'transatlantic', 'flight'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '9',
    title: 'Apollo 11 Moon Landing',
    description: 'Neil Armstrong became the first human to walk on the moon, marking humanity\'s greatest engineering achievement.',
    date: 'July 20, 1969',
    year: 1969,
    category: 'engineering',
    significance: 'This represented the pinnacle of human engineering and space exploration.',
    tags: ['space', 'moon', 'apollo', 'armstrong'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },

  // World History
  {
    id: '10',
    title: 'Declaration of Independence',
    description: 'The Continental Congress adopted the Declaration of Independence, establishing the United States of America.',
    date: 'July 4, 1776',
    year: 1776,
    category: 'world-history',
    significance: 'This document established the principles of democracy and human rights that would influence the world.',
    tags: ['independence', 'democracy', 'america', 'revolution'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '11',
    title: 'Fall of the Berlin Wall',
    description: 'The Berlin Wall, symbol of the Cold War division, began to be dismantled, leading to German reunification.',
    date: 'November 9, 1989',
    year: 1989,
    category: 'world-history',
    significance: 'This event marked the end of the Cold War and the beginning of a new era in international relations.',
    tags: ['cold-war', 'berlin-wall', 'reunification', 'freedom'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    id: '12',
    title: 'First Woman in Space',
    description: 'Valentina Tereshkova became the first woman to travel to space aboard Vostok 6.',
    date: 'June 16, 1963',
    year: 1963,
    category: 'world-history',
    significance: 'This milestone broke gender barriers in space exploration and inspired women worldwide.',
    tags: ['space', 'women', 'tereshkova', 'soviet-union'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  }
];

export const getRandomEvents = (count: number, categories?: string[]): HistoricalEvent[] => {
  let filteredEvents = historicalEvents;
  
  if (categories && categories.length > 0) {
    filteredEvents = historicalEvents.filter(event => 
      categories.includes(event.category)
    );
  }
  
  const shuffled = [...filteredEvents].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getEventsByCategory = (category: string): HistoricalEvent[] => {
  return historicalEvents.filter(event => event.category === category);
};
