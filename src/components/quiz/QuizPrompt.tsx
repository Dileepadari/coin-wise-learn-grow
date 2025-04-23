
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { X, Award } from "lucide-react";
import { scamExamples } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { getCelebrityGuide } from "@/utils/utils"; // <-- fixed import path

interface QuizPromptProps {
  onDismiss: () => void;
  category: string;
}

export default function QuizPrompt({ onDismiss, category }: QuizPromptProps) {
  const navigate = useNavigate();
  const { addCoins } = useAppContext();
  
  const celebrity = getCelebrityGuide(category);
  
  const quizContent = {
    fraud: {
      question: "Identify the message that can be potentially labelled as a scam",
      options: [
        "Dear user, You have won Rs 5L. Please click on the link to claim your prize.",
        "Your electricity bill of Rs 1,450 is due on 25th. Pay through our official website.",
        "Thank you for shopping with us. Your order will be delivered tomorrow.",
        "Hi, this is your bank. Please update your KYC by sharing your password."
      ],
      answer: 0
    },
    savings: {
      question: "Which of these is the best saving habit?",
      options: [
        "Saving whatever is left at month end",
        "Setting aside money first when you receive income",
        "Taking loans for everyday expenses",
        "Spending now and planning to save later"
      ],
      answer: 1
    },
    investment: {
      question: "Which statement about investments is true?",
      options: [
        "All investments guarantee high returns",
        "Diversification increases risk",
        "Starting early gives your money more time to grow",
        "Investing is only for wealthy people"
      ],
      answer: 2
    },
    basics: {
      question: "What does the 50-30-20 budget rule mean?",
      options: [
        "Save 50%, spend 30% on needs, 20% on wants",
        "50% needs, 30% wants, 20% savings",
        "50% investments, 30% expenses, 20% savings",
        "50% debt payment, 30% living expenses, 20% entertainment"
      ],
      answer: 1
    },
    borrowing: {
      question: "Which is a responsible borrowing habit?",
      options: [
        "Taking loans for luxury items",
        "Borrowing only what you can repay",
        "Applying for multiple loans at once",
        "Using credit cards for everyday expenses"
      ],
      answer: 1
    }
  };
  
  const quiz = quizContent[category as keyof typeof quizContent] || quizContent.basics;
  
  const handleStartQuiz = () => {
    toast(`${celebrity.name} ka nazar hai aap par! +10 coins`, {
      icon: "🎉",
      description: "Filmi sitare proud hai aapke gyaan se!"
    });
    addCoins(10);
    onDismiss();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <Card className="w-[90%] max-w-md mx-auto animate-scale-in border-2 border-holi-yellow">
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-coin-purple to-holi-pink">
          <h3 className="font-semibold flex items-center text-white">
            <Award className="mr-2 h-5 w-5 text-amber-300" />
            {celebrity.name} ka Quick Quiz
          </h3>
          <Button variant="ghost" size="icon" onClick={onDismiss} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 flex gap-3 items-center bg-gradient-to-r from-holi-yellow/30 to-white">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-coin-pink">
            <img src={celebrity.image} alt={celebrity.name} className="w-full h-full object-cover" />
          </div>
          <div className="font-medium italic text-coin-purple">
            "{category === 'basics' ? 'Zindagi main safalta paane ke liye' : 'Paise ko samajhne ke liye'} thoda gyaan zaroori hai!" 
          </div>
        </div>
        
        <CardContent className="pt-4">
          <h4 className="text-lg font-medium mb-4">{quiz.question}</h4>
          
          <div className="space-y-2">
            {quiz.options.map((option, index) => (
              <div 
                key={index} 
                className="p-3 border-2 rounded-md cursor-pointer hover:bg-holi-yellow/20 transition-colors border-holi-green/40"
              >
                {option}
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onDismiss} className="border-holi-pink text-holi-pink hover:bg-holi-pink/10">
            Abhi Nahi
          </Button>
          
          <Button onClick={handleStartQuiz} className="bg-gradient-to-r from-coin-purple to-coin-pink text-white">
            Jawab Dein
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
