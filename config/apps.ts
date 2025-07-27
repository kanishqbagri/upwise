
import type { AppConfig } from '../types';
import { CodeIcon } from '../components/icons/CodeIcon';
import { ChartIcon } from '../components/icons/ChartIcon';
import { BrainIcon } from '../components/icons/BrainIcon';

export const apps: AppConfig[] = [
  {
    title: "Dev Sandbox",
    description: "An interactive coding environment to test and run snippets.",
    url: "#/dev-sandbox",
    icon: CodeIcon,
    bgColor: "bg-blue-900/50",
    textColor: "text-blue-300"
  },
  {
    title: "Data Visualizer",
    description: "Upload data and generate insightful charts and graphs.",
    url: "#/data-visualizer",
    icon: ChartIcon,
    bgColor: "bg-green-900/50",
    textColor: "text-green-300"
  },
  {
    title: "AI Playground",
    description: "Experiment with various AI models and prompts.",
    url: "#/ai-playground",
    icon: BrainIcon,
    bgColor: "bg-purple-900/50",
    textColor: "text-purple-300"
  },
   {
    title: "Project Tracker",
    description: "Manage tasks and track progress for your projects.",
    url: "#/project-tracker",
    icon: ChartIcon, 
    bgColor: "bg-yellow-900/50",
    textColor: "text-yellow-300"
  },
  {
    title: "Code Repository",
    description: "Browse and manage source code for our main applications.",
    url: "https://github.com",
    icon: CodeIcon,
    bgColor: "bg-gray-700",
    textColor: "text-gray-300"
  },
  {
    title: "Team Comms",
    description: "Internal communication platform for team collaboration.",
    url: "#/team-comms",
    icon: BrainIcon,
    bgColor: "bg-pink-900/50",
    textColor: "text-pink-300"
  },
];
