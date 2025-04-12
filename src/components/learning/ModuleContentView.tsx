
import { useState } from "react";
import { LearningModule } from "@/types";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { CheckCircle, Play, ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModuleContentViewProps {
  content: any;
  module: LearningModule;
  onComplete: () => void;
}

export default function ModuleContentView({ content, module, onComplete }: ModuleContentViewProps) {
  const { addCoins } = useApp();
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [hasEarned, setHasEarned] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  
  const handleShare = () => {
    toast("Content shared!", {
      icon: "✅",
      description: "Your friends will receive your recommendation"
    });
  };
  
  const handleComplete = () => {
    if (hasEarned) return;
    
    // Award coins and show celebration
    setShowCelebration(true);
    const earnedCoins = content.type === 'quiz' ? 10 : 5;
    addCoins(earnedCoins);
    setHasEarned(true);
    
    toast(`+${earnedCoins} coins!`, {
      icon: "🪙",
      description: "Keep learning to earn more!"
    });
    
    setTimeout(() => {
      setShowCelebration(false);
      onComplete();
    }, 1500);
  };
  
  const handleQuizAnswer = (selectedAnswerIndex: number) => {
    if (quizAnswer !== null) return;
    
    setQuizAnswer(selectedAnswerIndex);
    
    if (content.type === 'quiz' && selectedAnswerIndex === content.correctAnswer) {
      toast("Correct answer! +10 coins", {
        icon: "✅",
        description: content.explanation || "Great job!"
      });
      
      setTimeout(handleComplete, 1500);
    } else if (content.type === 'quiz') {
      toast("Try again!", {
        icon: "❌",
        description: "That's not the correct answer."
      });
    }
  };
  
  const handleVideoPlay = () => {
    // Simulate watching video
    if (videoWatched) return;
    
    toast("Video playing", {
      description: "Learning through visual content!"
    });
    
    // Mark as watched after 3 seconds (simulating video watching)
    setTimeout(() => {
      setVideoWatched(true);
      toast("Video completed!", {
        icon: "📹",
        description: "You've learned valuable information!"
      });
    }, 3000);
  };
  
  return (
    <div className={`space-y-4 ${showCelebration ? 'animate-pulse' : ''}`}>
      {/* Content display based on type */}
      {content.type === 'quiz' ? (
        <div>
          <h3 className="text-lg font-medium mb-4">{content.question}</h3>
          
          <div className="space-y-3 mb-6">
            {content.options.map((option: string, optionIndex: number) => (
              <Button
                key={optionIndex}
                variant={quizAnswer === optionIndex ? 
                  (optionIndex === content.correctAnswer ? "default" : "destructive") : 
                  "outline"}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleQuizAnswer(optionIndex)}
                disabled={quizAnswer !== null}
              >
                {optionIndex === content.correctAnswer && quizAnswer === optionIndex && (
                  <CheckCircle className="h-4 w-4 mr-2 text-white" />
                )}
                {option}
              </Button>
            ))}
          </div>
          
          {quizAnswer === content.correctAnswer && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm mb-4">
              <p className="font-medium">Correct!</p>
              <p>{content.explanation}</p>
            </div>
          )}
          
          {quizAnswer !== null && quizAnswer !== content.correctAnswer && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-800 text-sm mb-4">
              <p className="font-medium">Incorrect</p>
              <p>Try again or review the material.</p>
            </div>
          )}
        </div>
      ) : content.type === 'reel' ? (
        <div>
          <div 
            className="aspect-video bg-black rounded-md mb-6 flex items-center justify-center cursor-pointer"
            onClick={handleVideoPlay}
          >
            <Play className={`h-12 w-12 ${videoWatched ? 'text-green-500' : 'text-white'}`} />
          </div>
          
          <p className="mb-6">{content.content}</p>
          
          {videoWatched && !hasEarned && (
            <div className="p-3 bg-green-50 rounded-md text-center animate-pulse mb-4">
              <p className="text-green-700">Video completed! Click continue to earn coins.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Text lesson content */}
          <div className="prose max-w-none">
            <p className="mb-4 text-lg">{content.content}</p>
            
            {/* Sample long text lesson with sections */}
            <h3 className="text-lg font-medium mt-6 mb-2">Key Points to Remember</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Financial education is crucial for making informed decisions</li>
              <li>Start saving early to benefit from compound interest</li>
              <li>Create a budget to track income and expenses effectively</li>
              <li>Be wary of get-rich-quick schemes and financial scams</li>
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 my-6">
              <h4 className="font-medium text-blue-800 mb-2">Example Scenario</h4>
              <p className="text-blue-700">
                Ravi earns ₹30,000 per month. By saving just 10% (₹3,000) every month and investing 
                it wisely, he could accumulate a significant amount over time due to compound interest.
              </p>
            </div>
            
            <blockquote className="border-l-4 border-primary pl-4 italic my-6">
              "The most important investment you can make is in yourself." - Warren Buffett
            </blockquote>
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Badge variant="outline" className="flex items-center">
          {content.points || 5} points
        </Badge>
        
        <div className="space-x-2">
          <Button 
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button 
            size="sm"
            onClick={handleComplete}
            className={cn(
              "flex items-center gap-1",
              content.type === 'quiz' ? 'hidden' : '',
              hasEarned ? 'bg-green-600 hover:bg-green-700' : ''
            )}
            disabled={content.type === 'reel' && !videoWatched}
          >
            {hasEarned ? 'Completed' : 'Continue'}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
