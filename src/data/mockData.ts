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
      { 
        id: "content1", 
        title: "बचत क्यों जरूरी है?", 
        points: 10, 
        type: "article", 
        videoUrl: "https://www.youtube.com/embed/iv_5xhorHUI",
        content: "बचत के महत्व को समझें। बचत न केवल वित्तीय सुरक्षा प्रदान करती है, बल्कि यह आपको अप्रत्याशित खर्चों से निपटने में भी मदद करती है। यह आपके भविष्य को सुरक्षित करने का पहला कदम है। बचत की आदत डालने से आप अपने लक्ष्यों को आसानी से प्राप्त कर सकते हैं। यह आपको आत्मनिर्भर बनाता है और वित्तीय तनाव को कम करता है। बचत के बिना, आप आपातकालीन स्थितियों में फंस सकते हैं। इसलिए, बचत को अपनी प्राथमिकता बनाएं।", 
        theoryContent: "बचत के महत्व और तरीकों को समझने के लिए इस मॉड्यूल को पढ़ें। यह आपको वित्तीय सुरक्षा और आत्मनिर्भरता प्राप्त करने में मदद करेगा।"
      },
      { 
        id: "content2", 
        title: "बचत के तरीके", 
        points: 15, 
        type: "article", 
        content: "बचत के विभिन्न तरीकों को जानें। आप अपने खर्चों को ट्रैक करके बचत शुरू कर सकते हैं। बजट बनाना एक प्रभावी तरीका है। अनावश्यक खर्चों को कम करें और अपनी आय का एक हिस्सा बचत के लिए अलग रखें। बचत खाते का उपयोग करें और नियमित रूप से उसमें धन जमा करें। छोटी-छोटी बचतें समय के साथ बड़ी हो सकती हैं।" ,
        storyContent: "रमेश एक छोटे से गाँव में रहता था। उसकी आय सीमित थी, लेकिन उसने बचत की आदत डाल ली। हर महीने वह अपनी आय का 10% बचत करता था। कुछ सालों बाद, उसने अपनी बचत से एक छोटा व्यवसाय शुरू किया। आज, रमेश एक सफल उद्यमी है। यह सब उसकी बचत की आदत के कारण संभव हुआ।",
      }
    ],
    quizzes: [
      { 
        id: "quiz1", 
        title: "बचत का महत्व", 
        type: "quiz", 
        question: "बचत का पहला कदम क्या है?", 
        points: 20, 
        options: ["बजट बनाना", "लक्ष्य तय करना", "खर्च कम करना", "बचत शुरू करना"], 
        correctAnswer: 3, 
        explanation: "बचत का पहला कदम बचत शुरू करना है। बचत की आदत डालने से आप अपने वित्तीय लक्ष्यों को आसानी से प्राप्त कर सकते हैं।",
      }
    ],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "https://images.unsplash.com/photo-1556742042-4b7c60bcf9a0?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "module2",
    name: "निवेश की शुरुआत",
    description: "सही निवेश, बेहतर भविष्य",
    category: "investment",
    difficulty: "beginner",
    content: [
      { 
        id: "content3", 
        title: "निवेश क्या है?", 
        points: 10, 
        type: "article", 
        content: "निवेश के बारे में जानें। निवेश का मतलब है अपने धन को ऐसे साधनों में लगाना जो समय के साथ बढ़ सके। यह आपको वित्तीय स्वतंत्रता प्राप्त करने में मदद करता है। निवेश के माध्यम से आप अपने धन को बढ़ा सकते हैं और अपने भविष्य को सुरक्षित कर सकते हैं।",
        storyContent: "सीमा ने अपनी पहली नौकरी से ही निवेश करना शुरू कर दिया। उसने म्यूचुअल फंड और शेयर बाजार में निवेश किया। कुछ सालों बाद, उसके निवेश ने उसे एक घर खरीदने में मदद की। यह सब उसकी समझदारी और सही निवेश के कारण संभव हुआ।",
        videoUrl: "https://www.youtube.com/embed/fA9SWRoWyIk",
        theoryContent: "निवेश के महत्व और इसके फायदों को समझने के लिए इस मॉड्यूल को पढ़ें। यह आपको अपने वित्तीय लक्ष्यों को प्राप्त करने में मदद करेगा।"
      },
      { 
        id: "content4", 
        title: "निवेश के फायदे", 
        points: 15, 
        type: "article", 
        content: "निवेश के फायदों को समझें। यह आपको वित्तीय स्थिरता प्रदान करता है। निवेश से आप अपने लक्ष्यों को जल्दी प्राप्त कर सकते हैं। यह आपको मुद्रास्फीति के प्रभाव से बचाता है। सही निवेश से आप अपने धन को दोगुना कर सकते हैं।" 
      }
    ],
    quizzes: [
      { 
        id: "quiz2", 
        title: "निवेश का महत्व", 
        type: "quiz", 
        question: "निवेश का मुख्य उद्देश्य क्या है?", 
        points: 20, 
        options: ["लाभ कमाना", "भविष्य सुरक्षित करना", "जोखिम उठाना", "सभी"], 
        correctAnswer: 1, 
        explanation: "निवेश का मुख्य उद्देश्य भविष्य को सुरक्षित करना है। यह आपको वित्तीय स्वतंत्रता प्राप्त करने में मदद करता है।"
      }
    ],
    totalPoints: 120,
    estimatedTime: "45 minutes",
    thumbnail: "https://images.unsplash.com/photo-1565372918671-4b0b9c2c8f9a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "module3",
    name: "बजट बनाना और प्रबंधन",
    description: "अपने खर्चों को समझें और नियंत्रित करें",
    category: "savings",
    difficulty: "beginner",
    content: [
      {
        id: "content5",
        title: "बजट क्या है और क्यों जरूरी है?",
        points: 10,
        type: "article",
        videoUrl: "https://www.youtube.com/embed/7BMME2xTiAc",
        content: "बजट बनाना वित्तीय प्रबंधन का पहला कदम है। यह आपको अपने आय और खर्चों की स्पष्ट तस्वीर देता है, जिससे आप अनावश्यक खर्चों को पहचानकर उन्हें नियंत्रित कर सकते हैं। बजट से आप अपने वित्तीय लक्ष्यों की योजना बना सकते हैं और आपातकालीन स्थितियों के लिए तैयार रह सकते हैं।...",
        theoryContent: "इस लेख में बजट बनाने के महत्व और प्रक्रिया को विस्तार से समझाया गया है।"
      },
      {
        id: "content6",
        title: "बजट बनाने के चरण",
        points: 15,
        type: "article",
        content: "बजट बनाने के लिए पहले अपनी आय और खर्चों की सूची बनाएं। फिर आवश्यक और अनावश्यक खर्चों को अलग करें। अनावश्यक खर्चों को कम करके बचत बढ़ाएं। मासिक बजट बनाएं और उसका पालन करें।...",
        storyContent: "रीना ने बजट बनाकर अपने खर्चों को नियंत्रित किया और छह महीने में एक नई साइकिल खरीदी।"
      }
    ],
    quizzes: [
      {
        id: "quiz3",
        title: "बजट का महत्व",
        type: "quiz",
        question: "बजट बनाने का पहला कदम क्या है?",
        points: 20,
        options: ["बचत करना", "आय और खर्चों की सूची बनाना", "ऋण लेना", "निवेश करना"],
        correctAnswer: 1,
        explanation: "बजट बनाने का पहला कदम अपनी आय और खर्चों की सूची बनाना है।"
      }
    ],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "https://images.unsplash.com/photo-1581090700227-1e8e8f1a5b3c?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "module4",
    name: "ऋण और उसका प्रबंधन",
    description: "समझदारी से ऋण लें और चुकाएं",
    category: "borrowing",
    difficulty: "beginner",
    content: [
      {
        id: "content7",
        title: "ऋण क्या है?",
        points: 10,
        type: "article",
        videoUrl: "https://www.youtube.com/embed/LQ8R-aj6jvE",
        content: "ऋण वह राशि है जो आप किसी से उधार लेते हैं और उसे ब्याज सहित चुकाते हैं। यह व्यक्तिगत, शिक्षा, गृह या वाहन ऋण हो सकता है। ऋण लेते समय उसकी शर्तों और ब्याज दरों को समझना आवश्यक है।...",
        theoryContent: "इस लेख में विभिन्न प्रकार के ऋण और उनके प्रबंधन के तरीकों को समझाया गया है।"
      },
      {
        id: "content8",
        title: "ऋण प्रबंधन के तरीके",
        points: 15,
        type: "article",
        content: "ऋण प्रबंधन के लिए समय पर भुगतान करें, अतिरिक्त भुगतान करने का प्रयास करें और अनावश्यक ऋण से बचें। बजट बनाकर ऋण चुकाने की योजना बनाएं।...",
        storyContent: "अजय ने अपने शिक्षा ऋण को समय पर चुकाकर वित्तीय स्वतंत्रता प्राप्त की।"
      }
    ],
    quizzes: [
      {
        id: "quiz4",
        title: "ऋण प्रबंधन",
        type: "quiz",
        question: "ऋण चुकाने का सबसे अच्छा तरीका क्या है?",
        points: 20,
        options: ["समय पर भुगतान", "ऋण को अनदेखा करना", "नई ऋण लेना", "ब्याज नहीं चुकाना"],
        correctAnswer: 0,
        explanation: "समय पर भुगतान करने से आप अतिरिक्त ब्याज से बच सकते हैं और क्रेडिट स्कोर अच्छा रहता है।"
      }
    ],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "module5",
    name: "बीमा का महत्व",
    description: "अपने भविष्य को सुरक्षित करें",
    category: "investment",
    difficulty: "beginner",
    content: [
      {
        id: "content9",
        title: "बीमा क्या है?",
        points: 10,
        type: "article",
        videoUrl: "https://www.youtube.com/embed/LQ8R-aj6jvE",
        content: "बीमा एक वित्तीय सुरक्षा उपाय है जो आपको अप्रत्याशित घटनाओं से होने वाले नुकसान से बचाता है। यह जीवन, स्वास्थ्य, वाहन और संपत्ति बीमा हो सकता है।...",
        theoryContent: "इस लेख में बीमा के विभिन्न प्रकार और उनके लाभों को समझाया गया है।"
      },
      {
        id: "content10",
        title: "सही बीमा कैसे चुनें?",
        points: 15,
        type: "article",
        content: "बीमा चुनते समय अपनी आवश्यकताओं, प्रीमियम, कवरेज और बीमा कंपनी की प्रतिष्ठा पर ध्यान दें।...",
        storyContent: "सुमन ने स्वास्थ्य बीमा लेकर अस्पताल के खर्चों से बचाव किया।"
      }
    ],
    quizzes: [
      {
        id: "quiz5",
        title: "बीमा का चयन",
        type: "quiz",
        question: "बीमा चुनते समय सबसे महत्वपूर्ण बात क्या है?",
        points: 20,
        options: ["प्रीमियम की राशि", "कवरेज की सीमा", "बीमा कंपनी की प्रतिष्ठा", "उपरोक्त सभी"],
        correctAnswer: 3,
        explanation: "बीमा चुनते समय प्रीमियम, कवरेज और कंपनी की प्रतिष्ठा सभी महत्वपूर्ण हैं।"
      }
    ],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-ec7d2c5d1c9c?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "module6",
    name: "कर योजना और प्रबंधन",
    description: "अपने करों को समझें और बचत करें",
    category: "basics",
    difficulty: "beginner",
    content: [
      {
        id: "content11",
        title: "कर क्या है?",
        points: 10,
        type: "article",
        videoUrl: "https://www.youtube.com/embed/LQ8R-aj6jvE",
        content: "कर सरकार द्वारा नागरिकों से वसूला जाने वाला शुल्क है जो सार्वजनिक सेवाओं के लिए उपयोग होता है। आयकर, वस्तु एवं सेवा कर (GST) आदि इसके उदाहरण हैं।...",
        theoryContent: "इस लेख में विभिन्न प्रकार के कर और उनकी गणना के तरीके को समझाया गया है।"
      },
      {
        id: "content12",
        title: "कर योजना कैसे करें?",
        points: 15,
        type: "article",
        content: "कर योजना के लिए आय और खर्चों की सही जानकारी रखें, कर छूट और कटौतियों का लाभ उठाएं, और समय पर रिटर्न दाखिल करें।...",
        storyContent: "राहुल ने कर योजना करके 20,000 रुपये की बचत की।"
      }
    ],
    quizzes: [
      {
        id: "quiz6",
        title: "कर योजना",
        type: "quiz",
        question: "कर योजना का मुख्य उद्देश्य क्या है?",
        points: 20,
        options: ["अधिक कर देना", "कम कर देना", "कानूनी तरीके से कर बचाना", "कर नहीं देना"],
        correctAnswer: 2,
        explanation: "कर योजना का उद्देश्य कानूनी तरीके से कर बचाना है।"
      }
    ],
    totalPoints: 100,
    estimatedTime: "30 minutes",
    thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?q=80&w=200&auto=format&fit=crop"
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
    moduleId: "module1",
    category: "savings",
    videoUrl: "/videos/save.mp4",
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
    moduleId: "module5",
    category: "fraud",
    videoUrl: "/videos/scam.mp4",
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
    moduleId: "module3",
    category: "investment",
    videoUrl: "/videos/buy_emi.mp4",
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
    moduleId: "module4",
    category: "basics",
    videoUrl: "/videos/UPI.mp4",
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
