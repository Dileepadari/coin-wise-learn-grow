// Add LanguageKeys export to fix the TypeScript error
export type LanguageKeys = 'english' | 'hindi' | 'telugu';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email?: string;
  phoneNumber: string;
  points: number;
  coins: number;
  level: number;
  xp?: number;
  streak?: number;
  avatar?: string;
  badges: string[];
  completedModules: any[];
  completedGames: any[];
  knowledgeLevel: string;
  preferredCategories: string[];
  likedContent: string[];
  savedContent: string[];
  progress: any[];
}

export interface ModuleProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  category: string;
}

export interface LearningContent {
  id: string;
  title: string;
  type: ContentType;
  content: string;
  mediaUrl?: string;
  points: number;
  videoUrl?: string;
  theoryContent?: string;
  storyContent?: string;
}

export interface Quiz {
  id: string;
  title: string;
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  category: 'basics' | 'savings' | 'investment' | 'fraud' | 'borrowing';
  difficulty: string;
  totalPoints: number;
  content: Array<LearningContent>;
  quizzes: Quiz[];
  estimatedTime: string;
  thumbnail?: string;
}

export interface Reel {
  id: string;
  title: string;
  content: string;
  description: string;
  likes: number;
  saves: number;
  moduleId: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  author: string;
  authorAvatar: string;
  comments: number;
  duration: string;
  publishedDate: Date;
  tags: any[];
}

export interface ScamExample {
  id: string;
  message: string;
  isScam: boolean;
  explanation: string;
  tags: string[];
  tipCategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
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

export interface AppContextType {
  user: User;
  allBadges: Badge[];
  allModules: LearningModule[];
  allReels: Reel[];
  scamExamples: ScamExample[];
  activeTab: string;
  notifications: Notification[];
  language: LanguageKeys;
  updateUser: (userData: Partial<User>) => void;
  addCoins: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  likeContent: (contentId: string) => void;
  saveContent: (contentId: string) => void;
  updateProgress: (moduleId: string, progress: number) => void;
  completeModule: (moduleId: string) => void;
  setActiveTab: (tab: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

export type ContentType = 'text' | 'video' | 'infographic' | 'reel' | 'article' | 'simulation';

export interface TranslationKeys {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  home: string;
  search: string;
  loading: string;
  accept: string;
  notifications: string;
  signup: string;
  login: string;
  welcomeBack: string;
  forgotPassword: string;
  username: string;
  password: string;
  lessons: string;
  points: string;
  learn: string;
  games: string;
  community: string;
  profile: string;
  reels: string;
  saveMoney: string;
}
