import { Badge, LearningModule, Reel, ScamExample, User } from "../types";

export const mockUser: User = {
  id: "1",
  firstName: "Raju",
  lastName: "Kumar",
  name: "Raju Kumar",
  phoneNumber: "+91123456789",
  points: 100,
  coins: 50,
  level: 1,
  badges: ["नया सीखने वाला"],
  completedModules: [],
  completedGames: [],
  knowledgeLevel: "beginner",
  preferredCategories: ["savings", "basics"],
  likedContent: [],
  savedContent: [],
  progress: []
};

export const currentUser: User = {
  id: "user1",
  firstName: "Raju",
  lastName: "Kumar",
  name: "Raju Kumar",
  phoneNumber: "+91 98765 43210",
  email: "raju@example.com",
  coins: 50,
  points: 120,
  badges: [],
  progress: [],
  likedContent: ["reel1", "reel3"],
  savedContent: ["reel2"],
  level: 2,
  xp: 67,
  streak: 3,
  completedModules: [],
  completedGames: [],
  knowledgeLevel: "beginner",
  preferredCategories: ["savings", "basics"],
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
};

export const badges: Badge[] = [
  {
    id: "badge1",
    name: "Saving Starter",
    description: "Complete your first saving module",
    image: "💰",
    unlocked: true,
    category: "savings"
  },
  {
    id: "badge2",
    name: "Investment Novice",
    description: "Complete your first investment module",
    image: "📈",
    unlocked: false,
    category: "investment"
  },
  {
    id: "badge3",
    name: "Scam Detector",
    description: "Successfully identify 5 scams",
    image: "🛡️",
    unlocked: true,
    category: "scam-detection"
  },
  {
    id: "badge4",
    name: "Budget Master",
    description: "Create your first budget plan",
    image: "📊",
    unlocked: false,
    category: "savings"
  },
  {
    id: "badge5",
    name: "Loan Expert",
    description: "Learn about responsible borrowing",
    image: "🏦",
    unlocked: false,
    category: "borrowing"
  },
  {
    id: "badge6",
    name: "Financial Friend",
    description: "Help 3 friends with financial advice",
    image: "👥",
    unlocked: false,
    category: "savings"
  }
];

export const modules: LearningModule[] = [
  {
    id: "module1",
    name: "बचत का महत्व",
    description: "छोटी बचत, बड़ी सफलता",
    category: "savings",
    difficulty: "beginner",
    content: [],
    quizzes: [],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "/images/savings.jpg"
  },
  {
    id: "module2",
    name: "निवेश की शुरुआत",
    description: "सही निवेश, बेहतर भविष्य",
    category: "investment",
    difficulty: "beginner",
    content: [],
    quizzes: [],
    totalPoints: 120,
    estimatedTime: "45 minutes",
    thumbnail: "/images/investment.jpg"
  },
  {
    id: "module3",
    name: "धोखे से बचें",
    description: "सतर्क रहें, सुरक्षित रहें",
    category: "fraud",
    difficulty: "intermediate",
    content: [],
    quizzes: [],
    totalPoints: 150,
    estimatedTime: "60 minutes",
    thumbnail: "/images/fraud.jpg"
  },
  {
    id: "module4",
    name: "बजट बनाना सीखें",
    description: "सही बजट, सही योजना",
    category: "basics",
    difficulty: "beginner",
    content: [],
    quizzes: [],
    totalPoints: 80,
    estimatedTime: "25 minutes",
    thumbnail: "/images/budget.jpg"
  },
  {
    id: "module5",
    name: "कर्ज से मुक्ति",
    description: "समझदारी से कर्ज लें",
    category: "borrowing",
    difficulty: "intermediate",
    content: [],
    quizzes: [],
    totalPoints: 130,
    estimatedTime: "50 minutes",
    thumbnail: "/images/borrowing.jpg"
  },
  {
    id: "module6",
    name: "वित्तीय योजना",
    description: "भविष्य की तैयारी",
    category: "savings",
    difficulty: "advanced",
    content: [],
    quizzes: [],
    totalPoints: 180,
    estimatedTime: "75 minutes",
    thumbnail: "/images/planning.jpg"
  },
  {
    id: "module7",
    name: "UPI का ज्ञान",
    description: "UPI से सुरक्षित लेनदेन",
    category: "basics",
    difficulty: "beginner",
    content: [],
    quizzes: [],
    totalPoints: 90,
    estimatedTime: "35 minutes",
    thumbnail: "/images/upi.jpg"
  },
  {
    id: "module8",
    name: "बीमा का महत्व",
    description: "सही बीमा, सही सुरक्षा",
    category: "basics",
    difficulty: "intermediate",
    content: [],
    quizzes: [],
    totalPoints: 140,
    estimatedTime: "55 minutes",
    thumbnail: "/images/insurance.jpg"
  }
];

export const reels: Reel[] = [
  {
    id: "reel1",
    title: "Bachat karo",
    content: "Har din thodi bachat karo, badi khushiyan pao!",
    description: "Saving tips for daily life",
    likes: 1245,
    saves: 423,
    moduleId: "mod1",
    category: "savings",
    videoUrl: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=200&auto=format&fit=crop",
    author: "Money Master",
    comments: 89,
    duration: "0:30",
    publishedDate: new Date("2023-04-12"),
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    tags: []
  },
  {
    id: "reel2",
    title: "Scam se bacho",
    content: "Agar koi phone pe bole ki payment stuck hai, to samajh jaana scam hai!",
    description: "Protect yourself from common scams",
    likes: 905,
    saves: 723,
    moduleId: "mod5",
    category: "fraud",
    videoUrl: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1606188074044-fcd750f6996a?q=80&w=200&auto=format&fit=crop",
    author: "Scam Alert",
    comments: 231,
    duration: "0:45",
    publishedDate: new Date("2023-04-15"),
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    tags: []
  },
  {
    id: "reel3",
    title: "Nivesh kaise kare",
    content: "Choti choti investments se bhi future secure hota hai!",
    description: "Small investments for big returns",
    likes: 756,
    saves: 312,
    moduleId: "mod3",
    category: "investment",
    videoUrl: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1606189934846-a527add8a77b?q=80&w=200&auto=format&fit=crop",
    author: "Investment Guru",
    comments: 67,
    duration: "0:28",
    publishedDate: new Date("2023-04-10"),
    authorAvatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&auto=format&fit=crop",
    tags: []
  },
  {
    id: "reel4",
    title: "UPI smart tips",
    content: "UPI PIN kabhi kisi ko mat batao, bank employees bhi nahi mangenge!",
    description: "Safety tips for UPI transactions",
    likes: 1021,
    saves: 432,
    moduleId: "mod4",
    category: "basics",
    videoUrl: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?q=80&w=200&auto=format&fit=crop",
    author: "Digital Safety",
    comments: 112,
    duration: "0:35",
    publishedDate: new Date("2023-04-05"),
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    tags: []
  }
];

export const scamExamples: ScamExample[] = [
  {
    id: "scam1",
    message: "आपको 10 लाख रुपये का इनाम मिला है!",
    isScam: true,
    explanation: "कभी भी अनजान लोटरी या इनाम के झांसे में न आएं",
    tipCategory: "online",
    tags: ["lottery", "prize"],
    difficulty: "easy"
  },
  {
    id: "scam2",
    message: "आपका बैंक खाता ब्लॉक हो जाएगा!",
    isScam: true,
    explanation: "बैंक कभी भी फोन पर जानकारी नहीं मांगते",
    tipCategory: "banking",
    tags: ["account", "block"],
    difficulty: "medium"
  },
  {
    id: "scam3",
    message: "आज ही निवेश करें और डबल मुनाफा पाएं!",
    isScam: true,
    explanation: "ज्यादा मुनाफे का वादा हमेशा झूठा होता है",
    tipCategory: "investment",
    tags: ["investment", "profit"],
    difficulty: "hard"
  },
  {
    id: "scam4",
    message: "मुफ्त में आईफोन जीतने का मौका!",
    isScam: true,
    explanation: "मुफ्त में कुछ भी नहीं मिलता, यह सिर्फ एक जाल है",
    tipCategory: "online",
    tags: ["prize", "iphone"],
    difficulty: "easy"
  }
];
