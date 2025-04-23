
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
import { motion } from "framer-motion";
import { Character } from "@/components/ui/character-dialog";
import { getMotivationalPhrase } from "@/utils/translate";

export default function Home() {
  const { user, language } = useApp();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState<'quiz' | 'game' | 'module' | null>(null);
  const [currentReel, setCurrentReel] = useState<Reel | null>(null);
  const [reelViewCount, setReelViewCount] = useState(0);
  const [showCharacter, setShowCharacter] = useState(false);
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

    // Occasionally show a character
    if (Math.random() > 0.7) {
      setTimeout(() => {
        setShowCharacter(true);
        setTimeout(() => setShowCharacter(false), 5000);
      }, 2000);
    } else {
      setShowCharacter(false);
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
  
  const getCharacterForCategory = () => {
    const category = currentReel?.category || 'basics';
    const characters = {
      'basics': {
        name: 'Raju',
        avatar: '👨‍🏫',
        dialog: getMotivationalPhrase('basics', language),
        emotion: 'excited' as const
      },
      'savings': {
        name: 'Lakshmi',
        avatar: '👩‍💼',
        dialog: getMotivationalPhrase('savings', language),
        emotion: 'happy' as const
      },
      'investment': {
        name: 'Vikram',
        avatar: '👨‍💼',
        dialog: getMotivationalPhrase('investment', language),
        emotion: 'thinking' as const
      },
      'fraud': {
        name: 'Sameera',
        avatar: '👮‍♀️',
        dialog: getMotivationalPhrase('fraud', language),
        emotion: 'thinking' as const
      },
      'borrowing': {
        name: 'Pradeep',
        avatar: '🏦',
        dialog: getMotivationalPhrase('borrowing', language),
        emotion: 'happy' as const
      }
    };
    
    return characters[category as keyof typeof characters] || characters.basics;
  };

  return (
    <Layout>
      <div className="relative h-full">
        {/* Reels container with snap scroll */}
        <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-10rem)] overflow-hidden">
          <motion.div 
            className="h-full transition-all duration-300 ease-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ transform: `translateY(-${currentReelIndex * 100}%)` }}
          >
            {reels.map((reel, index) => (
              <motion.div 
                key={reel.id} 
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentReelIndex === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <ReelCard reel={reel} height="h-full" onCelebrate={handleCelebrate} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons positioned differently based on screen size */}
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2`} style={{ marginTop: '-50px' }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary" 
              size="icon"
              className="rounded-full bg-black/20 backdrop-blur-md"
              onClick={handlePreviousReel}
              disabled={currentReelIndex === 0}
            >
              <ChevronUp className={`h-5 w-5`} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary" 
              size="icon"
              className="rounded-full bg-black/20 backdrop-blur-md"
              onClick={handleNextReel}
              disabled={currentReelIndex === reels.length - 1}
            >
              <ChevronDown className={`h-5 w-5`} />
            </Button>
          </motion.div>
        </div>

        {/* Reel indicator - different position for mobile */}
        <div className={`absolute ${isMobile ? 'top-4 right-4' : 'left-4 top-1/2 -translate-y-1/2'}`}>
          <motion.div 
            className="text-sm text-white bg-black/20 backdrop-blur-md px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={currentReelIndex}
          >
            {currentReelIndex + 1}/{reels.length}
          </motion.div>
        </div>

        {/* Character guide that appears occasionally
        {showCharacter && currentReel && (
          <div className="absolute top-10 left-4 z-20">
            <Character 
              {...getCharacterForCategory()}
              size="small"
            />
          </div>
        )} */}

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
