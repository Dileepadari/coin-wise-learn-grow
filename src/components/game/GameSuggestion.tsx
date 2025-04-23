
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { X, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCelebrityGuide } from "@/utils/utils"; // <-- fixed import path

interface GameSuggestionProps {
  onDismiss: () => void;
  category: string;
}

export default function GameSuggestion({ onDismiss, category }: GameSuggestionProps) {
  const navigate = useNavigate();
  
  const celebrity = getCelebrityGuide(category);
  
  // Game suggestions based on category
  const gameSuggestions = {
    fraud: {
      title: "Scam Alert Challenge",
      description: "Test your scam detection skills in this interactive challenge. Can you spot all the financial traps?",
      route: "/scam-game"
    },
    savings: {
      title: "Budget Master",
      description: "Create a budget and face unexpected challenges while trying to stick to it.",
      route: "/financial-sim"
    },
    investment: {
      title: "Market Guru",
      description: "Invest virtual money in stocks and mutual funds to learn investment principles.",
      route: "/financial-sim"
    },
    basics: {
      title: "Financial Life Simulator",
      description: "Make financial decisions and see how they affect your virtual life over time.",
      route: "/financial-sim"
    },
    borrowing: {
      title: "Loan Smart",
      description: "Learn about different loan options and how to borrow wisely through this game.",
      route: "/financial-sim"
    }
  };
  
  const game = gameSuggestions[category as keyof typeof gameSuggestions] || gameSuggestions.basics;
  
  const handleStartGame = () => {
    navigate(game.route);
    onDismiss();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <Card className="w-[90%] max-w-md mx-auto animate-scale-in border-2 border-coin-purple">
        <div className="relative h-36 bg-gradient-to-r from-coin-blue to-coin-purple overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={celebrity.image} alt={celebrity.name} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-xl tracking-wide">{celebrity.name}</h3>
                <p className="italic text-sm">{celebrity.quote}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onDismiss} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Gamepad2 className="mr-2 h-6 w-6 text-coin-pink" />
            <h3 className="font-bold text-lg">Game Suggestion</h3>
          </div>
          
          <h4 className="text-lg font-medium mb-2">{game.title}</h4>
          <p className="text-muted-foreground">{game.description}</p>
          
          <div className="mt-4 bg-holi-yellow/30 p-3 rounded-md text-sm border-l-4 border-holi-yellow">
            <p>"{celebrity.name} recommends: Playing games is a fun way to learn financial concepts without real-world risks! Earn coins and badges while improving your knowledge."</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onDismiss} className="border-holi-pink text-holi-pink hover:bg-holi-pink/10">
            Baad Mein
          </Button>
          
          <Button onClick={handleStartGame} className="bg-gradient-to-r from-coin-purple to-coin-pink text-white">
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
