import { App, CategoryInfo } from '../types';

export const apps: App[] = [
  {
    id: 'pokemon-trivia',
    title: 'Pokémon Trivia Challenge',
    description: 'Test your Pokémon knowledge with interactive trivia questions and earn badges!',
    category: 'learn-play',
    tags: ['education', 'gaming', 'trivia', 'pokemon'],
    url: '/pokemon/',
    icon: '🎮',
    featured: true,
    new: false
  },
  {
    id: 'princess-math',
    title: 'Princess Math Quest',
    description: 'Embark on a magical math adventure with princess-themed learning games.',
    category: 'learn-play',
    tags: ['education', 'math', 'kids', 'princess'],
    url: '/math/',
    icon: '👑',
    featured: true,
    new: false
  },
  {
    id: 'opposites-flashcards',
    title: 'Opposites Flash Cards',
    description: 'Learn opposites through interactive flash cards designed for kids.',
    category: 'learn-play',
    tags: ['education', 'vocabulary', 'kids', 'flashcards'],
    url: '/opposites/',
    icon: '🔄',
    featured: false,
    new: true
  },
  {
    id: 'light-bulb',
    title: 'Interactive Light Bulb',
    description: 'Click the light bulb to make it glow! Count your clicks and discover funny messages.',
    category: 'fun-funky',
    tags: ['interactive', 'fun', 'clicking', 'animation'],
    url: '/lightbulb/',
    icon: '💡',
    featured: false,
    new: true
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver',
    description: 'Watch a stick figure automatically solve randomly generated mazes with celebration effects.',
    category: 'fun-funky',
    tags: ['puzzle', 'automation', 'animation', 'maze'],
    url: '/maze/',
    icon: '🧩',
    featured: false,
    new: true
  },
  {
    id: 'green-thumb-ai',
    title: 'Green Thumb AI',
    description: 'Identify plants with AI! Upload a photo and get detailed care instructions and fun facts.',
    category: 'productivity-tools',
    tags: ['ai', 'plants', 'identification', 'botany', 'productivity'],
    url: '/green-thumb/',
    icon: '🌱',
    featured: true,
    new: true
  },
  {
    id: 'weekly-history',
    title: 'Weekly Dose of History',
    description: 'Get fascinating historical events delivered to your inbox weekly. From inventions to athletes, engineering marvels to world-changing moments.',
    category: 'learn-play',
    tags: ['history', 'newsletter', 'education', 'email', 'learning'],
    url: '/weekly-history/',
    icon: '📚',
    featured: true,
    new: true
  },
  {
    id: 'bubble-pop',
    title: 'Bubble Pop',
    description: 'A minimalist, futuristic bubble-popping game. Pop unlimited bubbles, track your score, exit when you have had enough.',
    category: 'fun-funky',
    tags: ['game', 'casual', 'arcade', 'futuristic', 'minimalist'],
    url: '/bubble-pop/',
    icon: '🫧',
    featured: false,
    new: true
  },
  {
    id: 'dev-sandbox',
    title: 'Dev Sandbox',
    description: 'An interactive coding environment to test and run snippets.',
    category: 'productivity-tools',
    tags: ['development', 'coding', 'sandbox', 'tools'],
    url: '#',
    icon: '💻',
    featured: false,
    new: false
  },
  {
    id: 'data-visualizer',
    title: 'Data Visualizer',
    description: 'Upload data and generate insightful charts and graphs.',
    category: 'productivity-tools',
    tags: ['data', 'visualization', 'analytics', 'charts'],
    url: '#',
    icon: '📊',
    featured: false,
    new: false
  },
  {
    id: 'ai-playground',
    title: 'AI Playground',
    description: 'Experiment with various AI models and prompts.',
    category: 'productivity-tools',
    tags: ['ai', 'machine-learning', 'experimentation', 'tools'],
    url: '#',
    icon: '🤖',
    featured: false,
    new: false
  },
  {
    id: 'project-tracker',
    title: 'Project Tracker',
    description: 'Manage tasks and track progress for your projects.',
    category: 'productivity-tools',
    tags: ['productivity', 'project-management', 'tasks', 'tracking'],
    url: '#',
    icon: '📋',
    featured: false,
    new: false
  },
  {
    id: 'team-comms',
    title: 'Team Comms',
    description: 'Internal communication platform for team collaboration.',
    category: 'life-lifestyle',
    tags: ['communication', 'team', 'collaboration', 'work'],
    url: '#',
    icon: '💬',
    featured: false,
    new: false
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker',
    description: 'Build better habits with daily tracking and reminders.',
    category: 'life-lifestyle',
    tags: ['habits', 'productivity', 'lifestyle', 'tracking'],
    url: '#',
    icon: '✅',
    featured: false,
    new: false
  },
  {
    id: 'meme-generator',
    title: 'Meme Generator',
    description: 'Create hilarious memes with our easy-to-use generator.',
    category: 'fun-funky',
    tags: ['fun', 'memes', 'creativity', 'entertainment'],
    url: '#',
    icon: '😂',
    featured: false,
    new: false
  },
  {
    id: 'random-quotes',
    title: 'Random Quotes',
    description: 'Discover inspiring quotes from famous personalities.',
    category: 'fun-funky',
    tags: ['quotes', 'inspiration', 'entertainment', 'random'],
    url: '#',
    icon: '💭',
    featured: false,
    new: false
  }
];

export const categories: CategoryInfo[] = [
  {
    id: 'learn-play',
    title: 'Learn & Play',
    description: 'Educational apps and games for all ages',
    emoji: '🎓',
    color: '#00BCD4',
    apps: apps.filter(app => app.category === 'learn-play')
  },
  {
    id: 'productivity-tools',
    title: 'Productivity & Tools',
    description: 'Tools to boost your efficiency and workflow',
    emoji: '⚡',
    color: '#4CAF50',
    apps: apps.filter(app => app.category === 'productivity-tools')
  },
  {
    id: 'life-lifestyle',
    title: 'Life & Lifestyle',
    description: 'Apps for personal development and daily life',
    emoji: '🌟',
    color: '#FF9800',
    apps: apps.filter(app => app.category === 'life-lifestyle')
  },
  {
    id: 'fun-funky',
    title: 'Fun & Funky',
    description: 'Entertainment and creative applications',
    emoji: '🎉',
    color: '#E91E63',
    apps: apps.filter(app => app.category === 'fun-funky')
  }
];

export const featuredApps = apps.filter(app => app.featured);
export const newApps = apps.filter(app => app.new);
