
import { Badge, LearningModule, Reel, ScamExample, User } from "../types";

export const currentUser: User = {
  id: "user1",
  firstName: "Rahul",
  lastName: "Singh",
  phoneNumber: "9876543210",
  coins: 250,
  badges: [],
  progress: [],
  likedContent: ["reel1", "reel3"],
  savedContent: ["reel2"]
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
    name: "Saving Basics",
    description: "Learn the fundamentals of saving money",
    category: "basics",
    content: [
      {
        id: "content1",
        type: "reel",
        title: "Why Save Money",
        description: "The importance of saving money",
        content: "Saving money is important for emergencies and future goals.",
        mediaUrl: undefined,
        points: 10
      },
      {
        id: "content2",
        type: "article",
        title: "Simple Saving Tips",
        description: "Easy ways to save money daily",
        content: "Start small by saving a little each day. Skip unnecessary expenses.",
        points: 15
      }
    ],
    quizzes: [
      {
        id: "quiz1",
        question: "Why is saving money important?",
        options: [
          "Only for rich people",
          "For emergencies and future goals",
          "It's not important",
          "Only for special occasions"
        ],
        correctAnswer: 1,
        explanation: "Saving money helps you handle emergencies and achieve future goals.",
        points: 20
      }
    ],
    totalPoints: 45,
    difficulty: "beginner"
  },
  {
    id: "module2",
    name: "Spotting Scams",
    description: "Learn how to identify and avoid financial scams",
    category: "fraud",
    content: [
      {
        id: "content3",
        type: "reel",
        title: "Common Scam Messages",
        description: "Identifying suspicious messages",
        content: "Be wary of messages promising money or asking for personal information.",
        points: 10
      },
      {
        id: "content4",
        type: "simulation",
        title: "Scam Detection Game",
        description: "Practice identifying scams",
        content: "Game simulation for identifying scams",
        points: 25
      }
    ],
    quizzes: [
      {
        id: "quiz2",
        question: "Which of these is likely a scam?",
        options: [
          "A message from your bank asking you to visit their branch",
          "A call from an unknown number offering a job with high salary without interview",
          "An email from a friend you know",
          "A reminder to pay your electricity bill"
        ],
        correctAnswer: 1,
        explanation: "Job offers with high salaries without proper interviews are typically scams.",
        points: 20
      }
    ],
    totalPoints: 55,
    difficulty: "beginner"
  },
  {
    id: "module3",
    name: "Basic Investments",
    description: "Introduction to investments for beginners",
    category: "investment",
    content: [],
    quizzes: [],
    totalPoints: 50,
    difficulty: "intermediate"
  },
  {
    id: "module4",
    name: "Responsible Borrowing",
    description: "Learn how to borrow money responsibly",
    category: "borrowing",
    content: [],
    quizzes: [],
    totalPoints: 60,
    difficulty: "intermediate"
  },
  {
    id: "module5",
    name: "Building a Budget",
    description: "Create and maintain a personal budget",
    category: "basics",
    content: [],
    quizzes: [],
    totalPoints: 45,
    difficulty: "beginner"
  },
  {
    id: "module6",
    name: "Planning for Future",
    description: "Long-term financial planning strategies",
    category: "savings",
    content: [],
    quizzes: [],
    totalPoints: 65,
    difficulty: "advanced"
  },
  {
    id: "module7",
    name: "Understanding UPI",
    description: "Learn how to use UPI safely and effectively",
    category: "basics",
    content: [],
    quizzes: [],
    totalPoints: 40,
    difficulty: "beginner"
  },
  {
    id: "module8",
    name: "Insurance Basics",
    description: "Understanding different types of insurance",
    category: "basics",
    content: [],
    quizzes: [],
    totalPoints: 55,
    difficulty: "intermediate"
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
    category: "savings"
  },
  {
    id: "reel2",
    title: "Spot the Scam",
    content: "Never click on links promising free money or gifts",
    likes: 189,
    saves: 210,
    moduleId: "module2",
    category: "fraud"
  },
  {
    id: "reel3",
    title: "Investment Basics",
    content: "Start investing small amounts regularly for better returns",
    likes: 156,
    saves: 89,
    moduleId: "module3",
    category: "investment"
  },
  {
    id: "reel4",
    title: "Budget Trick",
    content: "Use the 50-30-20 rule: 50% needs, 30% wants, 20% savings",
    likes: 201,
    saves: 132,
    moduleId: "module5",
    category: "basics"
  }
];

export const scamExamples: ScamExample[] = [
  {
    id: "scam1",
    message: "Dear user, You have won Rs 5L. Please click on the below link to get the money. http://link.com",
    isScam: true,
    explanation: "This is a scam because legitimate organizations don't send unsolicited messages about winning money and ask you to click on suspicious links.",
    tipCategory: "Prize Scams"
  },
  {
    id: "scam2",
    message: "Your UPI account will be blocked tonight. Call 98765-43210 immediately to prevent blocking.",
    isScam: true,
    explanation: "Banks never send threatening messages about account blocking. They don't ask you to call random numbers.",
    tipCategory: "Banking Scams"
  },
  {
    id: "scam3",
    message: "This is a reminder that your electricity bill of Rs. 1,450 is due on 25th April. Please pay through our official website or app.",
    isScam: false,
    explanation: "This appears to be a legitimate bill reminder as it doesn't ask for immediate action, doesn't include suspicious links, and directs you to official channels.",
    tipCategory: "Legitimate Reminders"
  },
  {
    id: "scam4",
    message: "Congratulations! You're selected for a govt job with 50,000/month salary. Send your details to claim job.",
    isScam: true,
    explanation: "Government jobs require formal application and interview processes. They never offer jobs through text messages.",
    tipCategory: "Job Scams"
  }
];
