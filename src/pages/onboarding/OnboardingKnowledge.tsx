
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, ArrowLeft, Book, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const questions = [
  {
    question: "बैंक में पैसे रखने का क्या फायदा है?",
    translation: "What is the benefit of keeping money in a bank?",
    options: [
      { id: "1", text: "कोई फायदा नहीं", translation: "No benefit", isCorrect: false },
      { id: "2", text: "ब्याज मिलता है", translation: "You earn interest", isCorrect: true },
      { id: "3", text: "बैंक आपके पैसे खर्च करता है", translation: "Bank spends your money", isCorrect: false }
    ]
  },
  {
    question: "बचत और निवेश में क्या अंतर है?",
    translation: "What is the difference between saving and investment?",
    options: [
      { id: "1", text: "कोई अंतर नहीं है", translation: "There is no difference", isCorrect: false },
      { id: "2", text: "बचत सुरक्षित होती है, निवेश में जोखिम होता है", translation: "Savings are safe, investments have risk", isCorrect: true },
      { id: "3", text: "निवेश हमेशा बचत से बेहतर होता है", translation: "Investment is always better than saving", isCorrect: false }
    ]
  },
  {
    question: "EMI का पूरा नाम क्या है?",
    translation: "What is the full form of EMI?",
    options: [
      { id: "1", text: "इक्विवेलेंट मंथली इनकम", translation: "Equivalent Monthly Income", isCorrect: false },
      { id: "2", text: "एक्सट्रा मनी इन्वेस्टमेंट", translation: "Extra Money Investment", isCorrect: false },
      { id: "3", text: "इक्विवेलेंट मंथली इन्स्टॉलमेंट", translation: "Equated Monthly Installment", isCorrect: true }
    ]
  }
];

const OnboardingFinanceKnowledge = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  
  const handleOptionSelect = (questionIndex: number, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionId
    }));
  };
  
  const handleCheckAnswers = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast.error("कृपया सभी सवालों के जवाब दें (Please answer all questions)");
      return;
    }
    
    setShowResults(true);
    
    // Count correct answers
    const correctCount = questions.reduce((count, question, index) => {
      const selectedOption = question.options.find(opt => opt.id === answers[index]);
      return selectedOption?.isCorrect ? count + 1 : count;
    }, 0);
    
    if (correctCount === questions.length) {
      toast.success("शानदार! आपने सभी सवालों के सही जवाब दिए!");
    } else {
      toast.info(`आपने ${correctCount} सही जवाब दिए। हम आपको और सिखाएंगे!`);
    }
  };
  
  const handleContinue = () => {
    navigate('/onboarding/interests');
  };
  
  const handleBack = () => {
    navigate('/onboarding/finance');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center mb-4">
            <Book className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            आपका वित्तीय ज्ञान
          </h1>
          <p className="text-muted-foreground">
            Your Financial Knowledge
          </p>
        </div>
        
        <Card className="border-accent/20 p-6 border-2 shadow-lg animate-scale-in">
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <h3 className="font-semibold">
                  {q.question}
                  <span className="block text-sm text-muted-foreground font-normal">{q.translation}</span>
                </h3>
                
                <div className="space-y-2">
                  {q.options.map((option) => {
                    const isSelected = answers[qIndex] === option.id;
                    const showCorrect = showResults && option.isCorrect;
                    const showIncorrect = showResults && isSelected && !option.isCorrect;
                    
                    return (
                      <button
                        key={option.id}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all flex justify-between items-center ${
                          isSelected && !showResults ? 'border-info bg-info/10' :
                          showCorrect ? 'border-green-500 bg-green-50' :
                          showIncorrect ? 'border-red-500 bg-red-50' :
                          'border-gray-200 hover:border-info hover:bg-info/5'
                        }`}
                        onClick={() => !showResults && handleOptionSelect(qIndex, option.id)}
                        disabled={showResults}
                      >
                        <div className="flex flex-col">
                          <span>{option.text}</span>
                          <span className="text-xs text-muted-foreground">{option.translation}</span>
                        </div>
                        
                        {showCorrect && (
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                        
                        {showIncorrect && (
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                        )}
                        
                        {isSelected && !showResults && (
                          <div className="h-6 w-6 rounded-full bg-info/20 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-info"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
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
              
              {showResults ? (
                <Button
                  onClick={handleContinue}
                  className="bg-accent hover:bg-accent-600 text-white"
                >
                  आगे (Next)
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleCheckAnswers}
                  className="bg-accent hover:bg-accent-600 text-white"
                >
                  जाँचें (Check)
                </Button>
              )}
            </div>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center">
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-info rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            3/5 - वित्तीय ज्ञान (Financial Knowledge)
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFinanceKnowledge;
