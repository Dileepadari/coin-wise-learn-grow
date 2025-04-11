
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  coins: number;
  badges: Badge[];
  progress: ModuleProgress[];
  likedContent: string[];
  savedContent: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  category: 'savings' | 'investment' | 'scam-detection' | 'borrowing';
}

export interface ModuleProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  category: 'basics' | 'savings' | 'investment' | 'fraud' | 'borrowing';
  content: LearningContent[];
  quizzes: Quiz[];
  totalPoints: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningContent {
  id: string;
  type: 'reel' | 'article' | 'simulation';
  title: string;
  description: string;
  content: string;
  mediaUrl?: string;
  points: number;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface Reel {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  saves: number;
  moduleId?: string;
  category: 'basics' | 'savings' | 'investment' | 'fraud' | 'borrowing';
}

export interface ScamExample {
  id: string;
  message: string;
  isScam: boolean;
  explanation: string;
  tipCategory: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface BorrowRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  recipientId: string;
  amount: number;
  purpose: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  type: 'system' | 'achievement' | 'social' | 'reminder';
  actionLink?: string;
}
