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
    content: [
      { id: "content1", title: "बचत क्यों जरूरी है?", points: 10, type: "article", content: "बचत के महत्व को समझें।" },
      { id: "content2", title: "बचत के तरीके", points: 15, type: "article", content: "बचत के विभिन्न तरीकों को जानें।" }
    ],
    quizzes: [
      { 
        id: "quiz1", 
        title: "बचत का महत्व", 
        type: "quiz", 
        question: "बचत का पहला कदम क्या है?", 
        points: 20, 
        options: ["बजट बनाना", "लक्ष्य तय करना", "खर्च कम करना", "बचत शुरू करना"], 
        correctAnswer: 3, // Index of "बचत शुरू करना" in the options array
        explanation: "बचत का पहला कदम बचत शुरू करना है।"
      }
    ],
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
    content: [
      { id: "content3", title: "निवेश क्या है?", points: 10, type: "article", content: "निवेश के बारे में जानें।" },
      { id: "content4", title: "निवेश के फायदे", points: 15, type: "article", content: "निवेश के फायदों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz2", 
        title: "निवेश का महत्व", 
        type: "quiz", 
        question: "निवेश का मुख्य उद्देश्य क्या है?", 
        points: 20, 
        options: ["लाभ कमाना", "भविष्य सुरक्षित करना", "जोखिम उठाना", "सभी"], 
        correctAnswer: 1, // Index of "भविष्य सुरक्षित करना" in the options array
        explanation: "निवेश का मुख्य उद्देश्य भविष्य को सुरक्षित करना है।"
      }
    ],
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
    content: [
      { id: "content5", title: "सामान्य धोखाधड़ी के प्रकार", points: 15, type: "article", content: "सामान्य धोखाधड़ी के प्रकारों को समझें।" },
      { id: "content6", title: "धोखाधड़ी से बचने के उपाय", points: 20, type: "article", content: "धोखाधड़ी से बचने के उपायों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz3", 
        title: "धोखाधड़ी से बचाव", 
        type: "quiz", 
        question: "धोखाधड़ी से बचने का सबसे अच्छा तरीका क्या है?", 
        points: 25, 
        options: ["सतर्क रहें", "अनजान लिंक पर क्लिक करें", "अपनी जानकारी साझा करें", "सभी"], 
        correctAnswer: 0, // Index of "सतर्क रहें" in the options array
        explanation: "सतर्क रहना और अनजान स्रोतों से बचना सबसे अच्छा तरीका है।"
      }
    ],
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
    content: [
      { id: "content7", title: "बजट क्या है?", points: 10, type: "article", content: "बजट के बारे में जानें।" },
      { id: "content8", title: "बजट बनाने के चरण", points: 15, type: "article", content: "बजट बनाने के चरणों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz4", 
        title: "बजट का महत्व", 
        type: "quiz", 
        question: "बजट का मुख्य उद्देश्य क्या है?", 
        points: 20, 
        options: ["खर्च कम करना", "बचत बढ़ाना", "लक्ष्य तय करना", "उपरोक्त सभी"], 
        correctAnswer: 3, // Index of "उपरोक्त सभी" in the options array
        explanation: "बजट का मुख्य उद्देश्य सभी पहलुओं को संतुलित करना है।"
      }
    ],
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
    content: [
      { id: "content9", title: "कर्ज के प्रकार", points: 15, type: "article", content: "कर्ज के विभिन्न प्रकारों को समझें।" },
      { id: "content10", title: "कर्ज चुकाने की रणनीतियाँ", points: 20, type: "article", content: "कर्ज चुकाने की रणनीतियों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz5", 
        title: "कर्ज लेने से पहले", 
        type: "quiz", 
        question: "कर्ज लेने से पहले क्या विचार करना चाहिए?", 
        points: 25, 
        options: ["ब्याज दर", "ऋण अवधि", "भुगतान क्षमता", "उपरोक्त सभी"], 
        correctAnswer: 3, // Index of "उपरोक्त सभी" in the options array
        explanation: "कर्ज लेने से पहले सभी पहलुओं पर विचार करना चाहिए।"
      }
    ],
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
    content: [
      { id: "content11", title: "वित्तीय योजना का महत्व", points: 20, type: "article", content: "वित्तीय योजना के महत्व को समझें।" },
      { id: "content12", title: "लक्ष्य निर्धारण", points: 25, type: "article", content: "लक्ष्य निर्धारण के महत्व को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz6", 
        title: "वित्तीय योजना का पहला कदम", 
        type: "quiz", 
        question: "वित्तीय योजना का पहला कदम क्या है?", 
        points: 30, 
        options: ["लक्ष्य तय करना", "बजट बनाना", "निवेश करना", "खर्च कम करना"], 
        correctAnswer: 0, // Index of "लक्ष्य तय करना" in the options array
        explanation: "वित्तीय योजना का पहला कदम लक्ष्य तय करना है।"
      }
    ],
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
    content: [
      { id: "content13", title: "UPI क्या है?", points: 10, type: "article", content: "UPI के बारे में जानें।" },
      { id: "content14", title: "UPI का उपयोग कैसे करें?", points: 15, type: "article", content: "UPI का उपयोग करने के चरणों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz7", 
        title: "UPI सुरक्षा", 
        type: "quiz", 
        question: "UPI पिन को सुरक्षित रखने का सबसे अच्छा तरीका क्या है?", 
        points: 20, 
        options: ["किसी को न बताएं", "कागज पर लिखें", "दोस्तों को साझा करें", "सार्वजनिक स्थान पर रखें"], 
        correctAnswer: 0, // Index of "किसी को न बताएं" in the options array
        explanation: "UPI पिन को कभी भी किसी के साथ साझा नहीं करना चाहिए।"
      }
    ],
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
    content: [
      { id: "content15", title: "बीमा क्यों आवश्यक है?", points: 15, type: "article", content: "बीमा के महत्व को समझें।" },
      { id: "content16", title: "बीमा के प्रकार", points: 20, type: "article", content: "बीमा के विभिन्न प्रकारों को समझें।" }
    ],
    quizzes: [
      { 
        id: "quiz8", 
        title: "बीमा का महत्व", 
        type: "quiz",
        question: "बीमा चुनते समय किन बातों का ध्यान रखना चाहिए?", 
        points: 25, 
        options: ["बीमा की लागत", "कवर की गई बीमारियाँ", "कंपनी की प्रतिष्ठा", "उपरोक्त सभी"],
        correctAnswer: 3, // Index of "उपरोक्त सभी" in the options array
        explanation: "बीमा चुनते समय सभी पहलुओं पर विचार करना चाहिए।"
      }
    ],
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
    videoUrl: "https://pouch.jumpshare.com/preview/fn3eArSNWhmScZ2PGCpNH0BrMnuOXUsbHJqgyi9UU8WlAXaLUYtXGHmN9j7BKL2fQwxS3J2WOA9lZkooPcoLFNMfLQ1t1xNr9uy2Oq0xeE3ShkH-sMTGiK5hl52q14psfLsWc6bEwJveCVYwBzn7Om6yjbN-I2pg_cnoHs_AmgI.mp4",
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
    videoUrl: "https://pouch.jumpshare.com/preview/c4HBzf4Nx27PUETw_ybmxmt1880JVpmqT82Cith2sMyQsVT-XBCJD1a0nOX_5WyeETIjTuQKNMN_Gpj2kepx073LUwtZakbggDDuCwFDVwWEv9cJRZzMlC9Fu6-PHsj5moQ7yztZ_WfOR4hLbH7XOW6yjbN-I2pg_cnoHs_AmgI.mp4",
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
    videoUrl: "https://pouch.jumpshare.com/preview/BJCu_sevso0vQ9MwQvGkMgevXEhpuAXovAGNZTSh_aTtu7wADdMcK53NzPzM1ZVmWzxmr79WXWzZkXFc8SyfvCM4SyL5oCp4RA2ovpOpjeuYa2CQPRFPjWq4HzcEDmFe1IdtF05qGNbrJA2z-n3xim6yjbN-I2pg_cnoHs_AmgI.mp4",
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
    videoUrl: "https://pouch.jumpshare.com/preview/cbi6Uh86W0xiwtmpIivqVT8OJ0QbjGShPAofKqHluhr9Gd0eqB3lUovccJBAsI-zbmsMPVXJESsqhJRzzAVgUtuv7LOdeBbeUEjS1ROrl2BCFoqtgE4RBKjA2AYIHI4nF7e1BcQxWCB5RdDJq60o_G6yjbN-I2pg_cnoHs_AmgI.mp4",
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
