import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

const questions = [
  {
    question: "आप अपनी मासिक आय का कितना हिस्सा बचाते हैं?",
    translation: "How much of your monthly income do you save?",
    options: [
      { id: "none", label: "कुछ नहीं", translation: "Nothing" },
      { id: "little", label: "थोड़ा (10% से कम)", translation: "A little (less than 10%)" },
      { id: "some", label: "कुछ (10-20%)", translation: "Some (10-20%)" },
      { id: "lot", label: "बहुत (20% से अधिक)", translation: "A lot (more than 20%)" }
    ]
  },
  {
    question: "जब अचानक पैसे की जरूरत पड़ती है, तो आप क्या करते हैं?",
    translation: "What do you do when you suddenly need money?",
    options: [
      { id: "borrow-family", label: "परिवार से उधार लेते हैं", translation: "Borrow from family" },
      { id: "borrow-friends", label: "दोस्तों से उधार लेते हैं", translation: "Borrow from friends" },
      { id: "loan", label: "लोन लेते हैं", translation: "Take a loan" },
      { id: "savings", label: "अपनी बचत का उपयोग करते हैं", translation: "Use savings" }
    ]
  },
  {
    question: "आप अपना पैसा कैसे ट्रैक करते हैं?",
    translation: "How do you track your money?",
    options: [
      { id: "no-track", label: "ट्रैक नहीं करते", translation: "Don't track" },
      { id: "mental", label: "अपने दिमाग में रखते हैं", translation: "Keep it in mind" },
      { id: "diary", label: "डायरी में लिखते हैं", translation: "Write in a diary" },
      { id: "app", label: "ऐप का उपयोग करते हैं", translation: "Use an app" }
    ]
  }
];

const OnboardingFinancePersonality = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();
  
  const handleContinue = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast.error("कृपया सभी सवालों के जवाब दें (Please answer all questions)");
      return;
    }
    
    toast.success("बढ़िया! आपने अपने वित्तीय व्यक्तित्व के बारे में बताया");
    navigate('/onboarding/finance');
  };
  
  const handleBack = () => {
    navigate('/onboarding/welcome');
  };
  
  const handleAnswerSelect = (questionIndex: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerId
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center mb-4">
            <PersonIcon className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            आपका वित्तीय व्यक्तित्व
          </h1>
          <p className="text-muted-foreground">
            Your Financial Personality
          </p>
        </div>
        
        <Card className="p-6 border-2 border-accent/20 shadow-lg animate-scale-in">
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold">
                  {q.question}
                  <span className="block text-sm text-muted-foreground font-normal">{q.translation}</span>
                </h3>
                
                <RadioGroup 
                  value={answers[index]} 
                  onValueChange={(value) => handleAnswerSelect(index, value)}
                >
                  {q.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.id} 
                        id={`q${index}-${option.id}`} 
                        className="text-accent" 
                      />
                      <Label 
                        htmlFor={`q${index}-${option.id}`}
                        className="text-sm flex flex-col"
                      >
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.translation}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/5"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                पीछे (Back)
              </Button>
              
              <Button
                onClick={handleContinue}
                className="bg-accent hover:bg-accent-600 text-white"
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
            <div className="h-3 w-3 bg-accent rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            2/5 - वित्तीय व्यक्तित्व (Financial Personality)
          </p>
        </div>
      </div>
    </div>
  );
};

const PersonIcon = ({ className = "" }) => {
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  );
};

export default OnboardingFinancePersonality;