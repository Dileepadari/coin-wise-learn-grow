
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { X, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { modules } from "@/data/mockData";

interface ModuleSuggestionProps {
  onDismiss: () => void;
  moduleId?: string;
  category: string;
}

export default function ModuleSuggestion({ onDismiss, moduleId, category }: ModuleSuggestionProps) {
  const navigate = useNavigate();
  
  // Find recommended module - prioritize moduleId if available, otherwise suggest by category
  const suggestedModule = moduleId ? 
    modules.find(m => m.id === moduleId) : 
    modules.filter(m => m.category === category)[0] || modules[0];
  
  const handleStartLearning = () => {
    navigate(`/learn/module/${suggestedModule.id}`);
    onDismiss();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <Card className="w-[90%] max-w-md mx-auto animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-green-500" />
            Learning Module
          </h3>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="pt-4">
          <h4 className="text-lg font-medium mb-2">{suggestedModule.name}</h4>
          <p className="text-muted-foreground">{suggestedModule.description}</p>
          
          <div className="mt-4 p-3 bg-muted/30 rounded-md flex justify-between items-center">
            <div className="text-sm">
              <p className="font-medium">{suggestedModule.content.length} lessons</p>
              <p className="text-xs text-muted-foreground">Est. time: {suggestedModule.content.length * 5} mins</p>
            </div>
            
            <div className="text-sm text-right">
              <p className="font-medium">{suggestedModule.totalPoints} points</p>
              <p className="text-xs text-amber-500">{suggestedModule.difficulty}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onDismiss}>
            Not Now
          </Button>
          
          <Button onClick={handleStartLearning}>
            Start Learning
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
