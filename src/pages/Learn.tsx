
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Book, ArrowRight, CheckCircle, Lock, Star, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

const Learn = () => {
  const [level, setLevel] = useState(2);
  const [xp, setXp] = useState(120);
  const navigate = useNavigate();

  const chapters = [
    {
      id: 1,
      title: "बचत की आदतें",
      translation: "Saving Habits",
      description: "अपनी दैनिक आय से बचत करने के तरीके जानें और आपातकालीन फंड बनाएं।",
      descTranslation: "Learn ways to save from your daily income and create emergency funds.",
      modules: 5,
      completedModules: 3,
      unlocked: true,
      icon: <PiggyBankIcon className="h-7 w-7" />
    },
    {
      id: 2,
      title: "बजट बनाना",
      translation: "Creating a Budget",
      description: "अपने आय और खर्च का ट्रैक रखने के लिए सरल बजट बनाना सीखें।",
      descTranslation: "Learn to create simple budgets to track your income and expenses.",
      modules: 4,
      completedModules: 2,
      unlocked: true,
      icon: <CoinStackIcon className="h-7 w-7" />
    },
    {
      id: 3,
      title: "उधार लेने के नियम",
      translation: "Rules of Borrowing",
      description: "जिम्मेदारी से कर्ज लेना और EMI के बारे में महत्वपूर्ण जानकारी।",
      descTranslation: "Important information about responsible borrowing and EMIs.",
      modules: 6,
      completedModules: 0,
      unlocked: true,
      icon: <LoanIcon className="h-7 w-7" />
    },
    {
      id: 4,
      title: "डिजिटल वित्तीय सुरक्षा",
      translation: "Digital Financial Security",
      description: "ऑनलाइन लेनदेन में धोखाधड़ी से बचने के तरीके और सुरक्षा युक्तियाँ।",
      descTranslation: "Ways to avoid fraud in online transactions and security tips.",
      modules: 4,
      completedModules: 0,
      unlocked: false,
      icon: <ShieldIcon className="h-7 w-7" />
    },
    {
      id: 5,
      title: "बीमा की बुनियादी बातें",
      translation: "Insurance Basics",
      description: "विभिन्न प्रकार के बीमा और आपके लिए सही बीमा चुनने का तरीका।",
      descTranslation: "Different types of insurance and how to choose the right one for you.",
      modules: 5,
      completedModules: 0,
      unlocked: false,
      icon: <UmbrellaIcon className="h-7 w-7" />
    }
  ];

  // Recommended modules
  const recommendedModules = [
    {
      id: "savings101",
      title: "बचत के बुनियादी सिद्धांत",
      translation: "Basic Principles of Saving",
      chapterTitle: "बचत की आदतें",
      duration: "10 मिनट",
      xpReward: 15,
      icon: <CoinIcon className="h-5 w-5 text-yellow-500" />,
      color: "from-primary to-accent"
    },
    {
      id: "budget101",
      title: "हफ्तेवार बजट कैसे बनाएँ",
      translation: "How to Create a Weekly Budget",
      chapterTitle: "बजट बनाना",
      duration: "15 मिनट",
      xpReward: 20,
      icon: <ChartIcon className="h-5 w-5 text-green-500" />,
      color: "from-secondary to-amber-500"
    }
  ];

  const handleStartChapter = (chapterId: number) => {
    if (chapters.find(c => c.id === chapterId)?.unlocked) {
      toast.success(`अध्याय शुरू हो रहा है! (Chapter is loading!)`);
      navigate(`/learn/chapter/${chapterId}`);
    } else {
      toast.error("यह अध्याय अभी लॉक है। पहले पिछले अध्याय पूरा करें। (This chapter is locked. Complete previous chapters first.)");
    }
  };

  const handleStartModule = (moduleId: string) => {
    toast.success(`मॉड्यूल शुरू हो रहा है! (Module is loading!)`);
    navigate(`/learn/module/${moduleId}`);
    setXp(prev => prev + 5);
  };

  return (
    <Layout>
    <div className="pt-4 pb-24 px-4 bg-gradient-to-br from-background-soft via-background-purple to-background-yellow min-h-screen">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            सीखें (Learn)
          </h1>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              <span>{xp} XP</span>
            </Badge>
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary px-3 py-1">
              <Award className="w-4 h-4 mr-1" />
              <span>Level {level}</span>
            </Badge>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6 shadow-sm border border-primary/20">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <Book className="h-5 w-5 text-primary" />
            आगे बढ़ने के लिए
            <span className="text-xs text-muted-foreground ml-auto">(To progress)</span>
          </h3>
          
          <Progress value={xp % 100} className="h-2 bg-gray-100" />
          <div className="flex justify-between text-xs mt-1">
            <span>Level {level}</span>
            <span>{xp % 100}/100 XP</span>
            <span>Level {level + 1}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3 flex items-center">
            <GraduationCapIcon className="h-5 w-5 mr-2 text-primary" />
            आज के सुझाए गए मॉड्यूल
            <span className="text-xs text-muted-foreground ml-2">(Today's Recommended Modules)</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {recommendedModules.map((module) => (
              <Card key={module.id} className="border border-primary/10 shadow-sm hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg h-10 w-10 flex-shrink-0 bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                      {module.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <Badge variant="outline" className="bg-primary/5 text-xs">
                            {module.chapterTitle}
                          </Badge>
                          <h3 className="font-medium mt-1">
                            {module.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {module.translation}
                          </p>
                        </div>
                        <Badge className="bg-accent text-white h-fit">
                          +{module.xpReward} XP
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs text-muted-foreground">
                          <ClockIcon className="inline h-3 w-3 mr-1" />
                          {module.duration}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="text-xs bg-primary hover:bg-primary-600"
                          onClick={() => handleStartModule(module.id)}
                        >
                          अभी शुरू करें
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <h2 className="font-semibold text-lg mb-3">
          सभी अध्याय (All Chapters)
        </h2>
        
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Card 
              key={chapter.id} 
              className={`border-2 ${chapter.unlocked ? 'border-primary/10' : 'border-gray-200'} ${chapter.unlocked ? 'hover-scale' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    chapter.unlocked 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {chapter.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${!chapter.unlocked && 'text-gray-400'}`}>
                          {chapter.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {chapter.translation}
                        </p>
                      </div>
                      
                      {!chapter.unlocked && (
                        <Badge variant="outline" className="border-gray-300 text-gray-400 flex gap-1">
                          <Lock className="h-3 w-3" />
                          लॉक्ड
                        </Badge>
                      )}
                      
                      {chapter.completedModules > 0 && chapter.unlocked && (
                        <Badge className={`${
                          chapter.completedModules === chapter.modules 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-amber-500 hover:bg-amber-600'
                        } text-white`}>
                          {chapter.completedModules === chapter.modules 
                            ? 'पूरा हुआ' 
                            : `${chapter.completedModules}/${chapter.modules}`
                          }
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm mt-1 ${!chapter.unlocked && 'text-gray-400'}`}>
                      {chapter.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chapter.descTranslation}
                    </p>
                    
                    {chapter.unlocked && (
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <BookOpenIcon className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {chapter.modules} मॉड्यूल
                          </span>
                        </div>
                        
                        <Button 
                          size="sm"
                          className={`text-xs ${
                            chapter.completedModules === chapter.modules 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-primary hover:bg-primary-600'
                          }`}
                          onClick={() => handleStartChapter(chapter.id)}
                        >
                          {chapter.completedModules === chapter.modules 
                            ? (
                              <>
                                <CheckCircle className="mr-1 h-3 w-3" />
                                दोहराएं (Review)
                              </>
                            ) : (
                              <>
                                {chapter.completedModules > 0 ? 'जारी रखें (Continue)' : 'शुरू करें (Start)'}
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </>
                            )
                          }
                        </Button>
                      </div>
                    )}
                    
                    {chapter.unlocked && chapter.completedModules > 0 && (
                      <div className="mt-2 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(chapter.completedModules / chapter.modules) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

// Icon Components
const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const CoinIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const PiggyBankIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CoinStackIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M10.82 9C10.26 9 9.8 9.46 9.8 10.02C9.8 10.58 10.26 11.04 10.82 11.04C11.38 11.04 11.84 10.58 11.84 10.02C11.84 9.46 11.38 9 10.82 9Z" />
    <path d="M5.06 9.36L6.59 9.99C6.73 9.61 6.92 9.25 7.15 8.92L5.69 8.08C5.41 8.51 5.2 8.93 5.06 9.36Z" />
    <path d="M13.85 12.93C13.85 12.04 13.53 11.17 12.96 10.47C13.54 9.93 14.28 9.6 15.06 9.59C16.84 9.59 18.29 10.89 18.47 12.58C19.28 11.19 19.71 9.7 19.71 8.21C19.71 6.04 18.51 3.96 16.52 2.53C16.05 2.19 15.57 1.92 15.06 1.72C13.96 1.28 12.73 1.03 11.5 1C9.27 1 7.14 1.83 5.5 3.31C3.86 4.79 2.93 6.77 2.93 8.89C2.93 9.89 3.16 10.87 3.59 11.78C3.44 11.87 3.3 11.98 3.18 12.11C2.97 12.34 2.81 12.6 2.73 12.89C2.64 13.17 2.63 13.47 2.69 13.76C2.75 14.05 2.89 14.32 3.08 14.55C3.28 14.77 3.53 14.94 3.8 15.05C4.08 15.16 4.38 15.19 4.67 15.15C4.96 15.11 5.24 14.99 5.48 14.82C5.72 14.64 5.92 14.41 6.05 14.14C6.18 13.87 6.24 13.57 6.22 13.27C6.35 13.14 6.49 13.03 6.64 12.94C7.13 13.38 7.67 13.75 8.26 14.04C8.57 14.2 8.9 14.32 9.24 14.42C9.76 14.58 10.3 14.67 10.84 14.68C10.84 14.68 10.87 14.68 10.88 14.68C11.86 14.67 12.82 14.43 13.68 13.96C13.79 13.63 13.85 13.28 13.85 12.93Z" />
    <path d="M18.53 16.13C18.69 15.95 18.82 15.73 18.89 15.5C18.97 15.26 18.99 15.01 18.95 14.77C18.91 14.52 18.81 14.29 18.65 14.09C18.5 13.89 18.3 13.73 18.07 13.62C17.84 13.52 17.58 13.48 17.34 13.49C17.09 13.51 16.85 13.59 16.64 13.72C16.43 13.86 16.25 14.04 16.13 14.26C16.01 14.47 15.95 14.72 15.95 14.97C15.93 15.25 15.97 15.54 16.07 15.8C16.05 15.81 16.04 15.82 16.03 15.83L11.08 17.75C10.87 17.83 10.7 17.99 10.61 18.2C10.51 18.41 10.5 18.64 10.57 18.86C10.64 19.07 10.79 19.25 10.99 19.36C11.19 19.48 11.43 19.51 11.65 19.46L16.6 17.54C16.75 17.49 16.88 17.41 16.99 17.3C17.24 17.39 17.5 17.43 17.77 17.41C18.03 17.39 18.29 17.32 18.52 17.2C18.76 17.07 18.96 16.9 19.13 16.69C19.29 16.47 19.41 16.23 19.47 15.97C19.54 15.71 19.55 15.43 19.51 15.16C19.46 14.89 19.36 14.64 19.21 14.41C19.06 14.18 18.86 13.99 18.63 13.84C18.77 14.03 18.88 14.22 18.95 14.44C19.02 14.65 19.05 14.87 19.04 15.09C19.03 15.31 18.97 15.52 18.88 15.72C18.78 15.92 18.65 16.09 18.48 16.24C18.31 16.38 18.11 16.49 17.9 16.57C17.69 16.64 17.46 16.67 17.24 16.66C17.02 16.65 16.8 16.59 16.6 16.5C16.4 16.41 16.22 16.28 16.07 16.13C15.92 15.97 15.81 15.79 15.73 15.59C15.66 15.38 15.62 15.16 15.63 14.94C15.64 14.72 15.69 14.51 15.79 14.32C15.88 14.12 16.01 13.94 16.17 13.8C16.33 13.65 16.53 13.54 16.74 13.47C16.95 13.39 17.17 13.36 17.39 13.37C17.61 13.38 17.83 13.44 18.03 13.54C18.23 13.63 18.41 13.77 18.56 13.93C18.41 13.77 18.23 13.64 18.03 13.54C17.83 13.45 17.61 13.39 17.39 13.37C17.17 13.36 16.95 13.38 16.74 13.45C16.53 13.52 16.33 13.62 16.17 13.77C16.01 13.91 15.88 14.08 15.79 14.28C15.7 14.47 15.64 14.68 15.63 14.9C15.62 15.11 15.65 15.33 15.73 15.53C15.08 15.77 14.48 16.13 13.97 16.58C13.22 17.25 12.75 18.12 12.62 19.05L12.6 19.21L11.65 19.47C11.42 19.53 11.18 19.5 10.98 19.38C10.77 19.27 10.62 19.09 10.55 18.88C10.47 18.66 10.49 18.42 10.58 18.21C10.68 17.99 10.85 17.84 11.06 17.76L16.01 15.84C16.19 15.94 16.38 16.02 16.58 16.06C16.78 16.11 16.99 16.11 17.19 16.08C17.4 16.05 17.59 15.98 17.77 15.87C18.05 15.73 18.3 15.51 18.48 15.24C18.54 15.15 18.59 15.06 18.64 14.96C18.65 15.13 18.61 15.27 18.58 15.41C18.51 15.67 18.38 15.91 18.21 16.12L18.53 16.13Z" />
  </svg>
);

const LoanIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m0-1.5h.375a1.125 1.125 0 001.125-1.125V15m1.5 1.5v-.75A.75.75 0 0019.5 15h-.75m0 0v.75a.75.75 0 01-.75.75H18m-1.5-1.5h.75a.75.75 0 01.75.75v.75m-1.5-1.5h-1.875a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125H18.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H18.75m-1.5-1.5h-1.875a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H17.25m0-1.5h.375a1.125 1.125 0 011.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H17.25m-4.5 5.25h5.25m-5.25 0v-5.25m0 5.25v5.25" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const UmbrellaIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path d="M18 12H6M12 3v3m0 12v3M9 18a3 3 0 015.12-2.12M3 12c0-7 4.5-9 9-9s9 2 9 9" />
  </svg>
);

export default Learn;
