
// Add LanguageKeys export to fix the TypeScript error
export type LanguageKeys = 'english' | 'hindi' | 'telugu';

export interface User {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  points: number;
  level: number;
  badges: string[];
  completedModules: string[];
  completedGames: string[];
  knowledgeLevel: string;
  preferredCategories: string[];
  likedContent?: string[];
  savedContent?: string[];
  progress: ModuleProgress[];
}

export interface ModuleProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'achievement' | 'social' | 'reminder' | 'system';
  timestamp: Date;
  read: boolean;
  actionLink?: string;
}

export interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  likes: number;
  comments: number;
  author: string;
  authorAvatar?: string;
  tags: string[];
  duration: string;
  publishedDate: Date;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pointsToEarn: number;
  timeToComplete: string;
  path: string;
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  totalPoints: number;
  content: Array<LearningContent | Quiz>;
  estimatedTime: string;
  thumbnail?: string;
}

export interface LearningContent {
  id: string;
  title: string;
  type: 'text' | 'video' | 'infographic';
  content: string;
  mediaUrl?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  type: 'quiz';
  questions: Question[];
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ScamExample {
  id: string;
  message: string;
  isScam: boolean;
  explanation: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}
