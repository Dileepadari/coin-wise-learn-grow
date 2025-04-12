
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { reels } from "@/data/mockData";
import ReelCard from "@/components/reel/ReelCard";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import QuizPrompt from "@/components/quiz/QuizPrompt";
import GameSuggestion from "@/components/game/GameSuggestion";
import ModuleSuggestion from "@/components/learning/ModuleSuggestion";
import { toast } from "sonner";
import { Reel } from "@/types";

export default function Home() {
  const { user } = useApp();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState<'quiz' | 'game' | 'module' | null>(null);
  const [currentReel, setCurrentReel] = useState<Reel | null>(null);
  const [reelViewCount, setReelViewCount] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Set current reel when index changes
    setCurrentReel(reels[currentReelIndex]);
    
    // Increment view count
    setReelViewCount(prev => prev + 1);

    // Logic to show random prompts
    if (reelViewCount > 0 && reelViewCount % 2 === 0) { // Show suggestion every 2 reels
      const promptType = ['quiz', 'game', 'module'][Math.floor(Math.random() * 3)] as 'quiz' | 'game' | 'module';
      setTimeout(() => {
        setShowPrompt(promptType);
      }, 1000);
    } else {
      setShowPrompt(null);
    }
  }, [currentReelIndex]);

  const handlePreviousReel = () => {
    setCurrentReelIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setShowPrompt(null);
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev < reels.length - 1 ? prev + 1 : prev));
    setShowPrompt(null);
  };

  const handleDismissPrompt = () => {
    setShowPrompt(null);
  };

  const handleCelebrate = (message: string) => {
    toast(message, {
      icon: "🎉",
      className: "bg-primary text-primary-foreground",
    });
  };

  return (
    <Layout>
      <div className="relative h-full pb-16">
        {/* Reels container with snap scroll */}
        <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-10rem)] overflow-hidden">
          <div 
            className="h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateY(-${currentReelIndex * 100}%)` }}
          >
            {reels.map((reel, index) => (
              <div key={reel.id} className="h-full w-full">
                <ReelCard reel={reel} height="h-full" onCelebrate={handleCelebrate} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons positioned differently based on screen size */}
        <div className={`absolute ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2' : 'right-4 top-1/2 -translate-y-1/2'} flex ${isMobile ? 'flex-row gap-8' : 'flex-col gap-2'}`}>
          <Button
            variant="secondary" 
            size="icon"
            className="rounded-full bg-black/20 backdrop-blur-md"
            onClick={handlePreviousReel}
            disabled={currentReelIndex === 0}
          >
            <ChevronUp className={`h-5 w-5 ${isMobile ? 'rotate-90' : ''}`} />
          </Button>
          <Button
            variant="secondary" 
            size="icon"
            className="rounded-full bg-black/20 backdrop-blur-md"
            onClick={handleNextReel}
            disabled={currentReelIndex === reels.length - 1}
          >
            <ChevronDown className={`h-5 w-5 ${isMobile ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        {/* Reel indicator - different position for mobile */}
        <div className={`absolute ${isMobile ? 'top-4 right-4' : 'left-4 top-1/2 -translate-y-1/2'}`}>
          <div className="text-sm text-white bg-black/20 backdrop-blur-md px-2 py-1 rounded-full">
            {currentReelIndex + 1}/{reels.length}
          </div>
        </div>

        {/* Conditional prompts */}
        {showPrompt === 'quiz' && (
          <QuizPrompt onDismiss={handleDismissPrompt} category={currentReel?.category || 'basics'} />
        )}

        {showPrompt === 'game' && (
          <GameSuggestion onDismiss={handleDismissPrompt} category={currentReel?.category || 'basics'} />
        )}

        {showPrompt === 'module' && (
          <ModuleSuggestion onDismiss={handleDismissPrompt} moduleId={currentReel?.moduleId} category={currentReel?.category || 'basics'} />
        )}
      </div>
    </Layout>
  );
}
