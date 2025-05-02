import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

const questions = [
  {
    question: "क्या आप अपनी आय से बचत करते हैं?",
    translation: "Do you save from your income?",
    options: [
      { id: "regularly", label: "हां, नियमित रूप से", translation: "Yes, regularly" },
      { id: "sometimes", label: "कभी-कभी", translation: "Sometimes" },
      { id: "rarely", label: "कभी-कभार", translation: "Rarely" },
      { id: "never", label: "कभी नहीं", translation: "Never" },
    ],
  },
  {
    question: "क्या आपने कभी लोन लिया है?",
    translation: "Have you ever taken a loan?",
    options: [
      { id: "formal", label: "हां, बैंक/वित्तीय संस्थान से", translation: "Yes, from a bank/financial institution" },
      { id: "informal", label: "हां, दोस्तों/रिश्तेदारों से", translation: "Yes, from friends/relatives" },
      { id: "both", label: "हां, दोनों प्रकार से", translation: "Yes, both types" },
      { id: "never", label: "कभी नहीं", translation: "Never taken a loan" },
    ],
  },
  {
    question: "क्या आपका बैंक खाता है?",
    translation: "Do you have a bank account?",
    options: [
      { id: "yes", label: "हां", translation: "Yes" },
      { id: "no", label: "नहीं", translation: "No" },
    ],
  },
  {
    question: "आपका सबसे महत्वपूर्ण वित्तीय लक्ष्य क्या है?",
    translation: "What is your most important financial goal?",
    options: [
      { id: "emergency", label: "आपातकालीन बचत बनाना", translation: "Building emergency savings" },
      { id: "children", label: "बच्चों की शिक्षा", translation: "Children's education" },
      { id: "home", label: "घर खरीदना", translation: "Buying a home" },
      { id: "business", label: "व्यवसाय शुरू/विस्तार करना", translation: "Starting/expanding business" },
      { id: "retirement", label: "बुढ़ापे के लिए बचत", translation: "Saving for old age" },
    ],
  },
];

const OnboardingFinance = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleContinue = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("कृपया सभी सवालों के जवाब दें (Please answer all questions)");
      return;
    }

    toast.success("बढ़िया! आपने अपने वित्तीय आदतों के बारे में बताया");
    navigate("/onboarding/knowledge");
  };

  const handleBack = () => {
    navigate("/onboarding/profile");
  };

  const handleAnswerSelect = (questionIndex: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerId,
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
            आपकी वित्तीय आदतें
          </h1>
          <p className="text-muted-foreground">Your Money Habits</p>
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
                  {q.options.map((option) => (
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
            2/5 - वित्तीय आदतें (Financial Habits)
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

export default OnboardingFinance;
