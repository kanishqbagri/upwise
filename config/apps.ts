
import type { AppConfig } from '../types';
import { CodeIcon } from '../components/icons/CodeIcon';
import { ChartIcon } from '../components/icons/ChartIcon';
import { BrainIcon } from '../components/icons/BrainIcon';

export const apps: AppConfig[] = [
  {
    title: "Pokémon Trivia Challenge",
    description: "Test your Pokémon knowledge with interactive trivia questions and earn badges!",
    url: "/pokemon/",
    icon: BrainIcon,
    bgColor: "bg-red-900/50",
    textColor: "text-red-300"
  },
  {
    title: "Princess Math Quest",
    description: "Embark on a magical math adventure with princess-themed learning games.",
    url: "/math/",
    icon: ChartIcon,
    bgColor: "bg-pink-900/50",
    textColor: "text-pink-300"
  },
  {
    title: "Opposites Flash Cards",
    description: "Learn opposites through interactive flash cards designed for kids.",
    url: "/opposites/",
    icon: CodeIcon,
    bgColor: "bg-blue-900/50",
    textColor: "text-blue-300"
  }
];
