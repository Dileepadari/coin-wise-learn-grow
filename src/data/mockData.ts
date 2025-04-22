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
  firstName: "Rahul",
  lastName: "Singh",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  coins: 250,
  badges: [],
  progress: [],
  likedContent: ["reel1", "reel3"],
  savedContent: ["reel2"],
  level: 1,
  completedModules: [],
  completedGames: [],
  knowledgeLevel: "beginner",
  preferredCategories: [],
  email: "",
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
    title: "Daily Saving Tip",
    content: "Save ₹10 every day and have ₹3,650 by year end!",
    likes: 245,
    saves: 120,
    moduleId: "module1",
    category: "savings",
    videoUrl: "",
    thumbnailUrl: "",
    author: "",
    comments: 0,
    duration: "",
    publishedDate: new Date(),
    authorAvatar: "",
    tags: []
  },
  {
    id: "reel2",
    title: "Spot the Scam",
    content: "Never click on links promising free money or gifts",
    likes: 189,
    saves: 210,
    moduleId: "module2",
    category: "fraud",
    videoUrl: "",
    thumbnailUrl: "",
    author: "",
    comments: 0,
    duration: "",
    publishedDate: new Date(),
    authorAvatar: "",
    tags: []
  },
  {
    id: "reel3",
    title: "Investment Basics",
    content: "Start investing small amounts regularly for better returns",
    likes: 156,
    saves: 89,
    moduleId: "module3",
    category: "investment",
    videoUrl: "",
    thumbnailUrl: "",
    author: "",
    comments: 0,
    duration: "",
    publishedDate: new Date(),
    authorAvatar: "",
    tags: []
  },
  {
    id: "reel4",
    title: "Budget Trick",
    content: "Use the 50-30-20 rule: 50% needs, 30% wants, 20% savings",
    likes: 201,
    saves: 132,
    moduleId: "module5",
    category: "basics",
    videoUrl: "",
    thumbnailUrl: "",
    author: "",
    comments: 0,
    duration: "",
    publishedDate: new Date(),
    authorAvatar: "",
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
