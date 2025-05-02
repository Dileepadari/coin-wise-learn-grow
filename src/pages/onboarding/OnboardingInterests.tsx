import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowRight, ArrowLeft, Target, PiggyBank, IndianRupee, Users, Gamepad } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '../../components/ui/checkbox';

const learningOptions = [
  {
    id: "savings",
    icon: <PiggyBank className="h-6 w-6 text-secondary" />,
    title: "बचत और बजट",
    translation: "Savings & Budgeting",
    description: "अपनी आय का प्रबंधन करना सीखें और आपातकालीन फंड बनाएं",
    descTranslation: "Learn to manage your income and create emergency funds"
  },
  {
    id: "loans",
    icon: <IndianRupee className="h-6 w-6 text-secondary" />,
    title: "ऋण और लोन",
    translation: "Loans & Credit",
    description: "जिम्मेदारी से उधार लेना और क्रेडिट स्कोर का निर्माण करना",
    descTranslation: "Borrowing responsibly and building credit score"
  },
  {
    id: "investing",
    icon: <Target className="h-6 w-6 text-secondary" />,
    title: "निवेश की बुनियादी बातें",
    translation: "Investment Basics",
    description: "अपने भविष्य के लिए बुद्धिमानी से पैसे लगाना",
    descTranslation: "Wisely investing money for your future"
  },
  {
    id: "games",
    icon: <Gamepad className="h-6 w-6 text-secondary" />,
    title: "इंटरैक्टिव गेम्स",
    translation: "Interactive Games",
    description: "खेल के माध्यम से वित्तीय कौशल सीखें",
    descTranslation: "Learn financial skills through games"
  },
  {
    id: "community",
    icon: <Users className="h-6 w-6 text-secondary" />,
    title: "समुदाय और सहायता",
    translation: "Community & Support",
    description: "अन्य लोगों से जुड़ें और अनुभव साझा करें",
    descTranslation: "Connect with others and share experiences"
  }
];

const OnboardingLearningInterests = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const handleToggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleContinue = () => {
    if (selectedOptions.length === 0) {
      toast.error("कृपया कम से कम एक विषय चुनें (Please select at least one topic)");
      return;
    }
    
    toast.success(`आपने ${selectedOptions.length} विषय चुने! अब आप अपनी यात्रा शुरू कर सकते हैं।`);
    navigate('/onboarding/complete');
  };
  
  const handleBack = () => {
    navigate('/onboarding/finance-knowledge');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-peach via-background-soft to-background-purple p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-secondary rounded-full mx-auto flex items-center justify-center mb-4">
            <BookOpenIcon className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            आप क्या सीखना चाहते हैं?
          </h1>
          <p className="text-muted-foreground">
            What do you want to learn?
          </p>
        </div>
        
        <Card className="p-6 border-2 border-secondary/20 shadow-lg animate-scale-in">
          <div className="space-y-6">
            <p className="text-sm text-center text-gray-600">
              आप जो विषय सीखना चाहते हैं, उन्हें चुनें (आप बाद में और विषय जोड़ सकते हैं)
              <br />
              <span className="text-xs text-muted-foreground">
                (Select topics you want to learn - you can add more later)
              </span>
            </p>
            
            <div className="space-y-3">
              {learningOptions.map(option => (
                <div 
                  key={option.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOptions.includes(option.id) 
                      ? 'border-secondary bg-secondary/10' 
                      : 'border-gray-200 hover:border-secondary/50'
                  }`}
                  onClick={() => handleToggleOption(option.id)}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOptions.includes(option.id)
                        ? 'bg-secondary/20'
                        : 'bg-gray-100'
                    }`}>
                      {option.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-xs text-muted-foreground">{option.translation}</p>
                      </div>
                      <Checkbox 
                        checked={selectedOptions.includes(option.id)}
                        className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                        onCheckedChange={() => handleToggleOption(option.id)}
                      />
                    </div>
                    
                    <p className="text-sm mt-1 text-gray-600">{option.description}</p>
                    <p className="text-xs text-muted-foreground">{option.descTranslation}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/5"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                पीछे (Back)
              </Button>
              
              <Button
                onClick={handleContinue}
                className="bg-secondary hover:bg-secondary-600 text-white"
              >
                आगे (Next)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center">
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-secondary rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            4/5 - सीखने के विषय (Learning Interests)
          </p>
        </div>
      </div>
    </div>
  );
};

const BookOpenIcon = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
      />
    </svg>
  );
};

export default OnboardingLearningInterests;
