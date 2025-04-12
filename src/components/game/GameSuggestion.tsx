
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { X, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameSuggestionProps {
  onDismiss: () => void;
  category: string;
}

export default function GameSuggestion({ onDismiss, category }: GameSuggestionProps) {
  const navigate = useNavigate();
  
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
      <Card className="w-[90%] max-w-md mx-auto animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold flex items-center">
            <Gamepad2 className="mr-2 h-5 w-5 text-blue-500" />
            Game Suggestion
          </h3>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="pt-4">
          <h4 className="text-lg font-medium mb-2">{game.title}</h4>
          <p className="text-muted-foreground">{game.description}</p>
          
          <div className="mt-4 bg-muted/30 p-3 rounded-md text-sm">
            <p>Playing games is a fun way to learn financial concepts without real-world risks! Earn coins and badges while improving your knowledge.</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onDismiss}>
            Maybe Later
          </Button>
          
          <Button onClick={handleStartGame}>
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
