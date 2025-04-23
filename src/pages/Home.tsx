import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { useAppContext } from "@/context/AppContext";
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
import { getCelebrityGuide } from "@/lib/utils";

export default function Home() {
  const { user, language } = useAppContext();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState<'quiz' | 'game' | 'module' | null>(null);
  const [currentReel, setCurrentReel] = useState<Reel | null>(null);
  const [reelViewCount, setReelViewCount] = useState(0);
  const [showCharacter, setShowCharacter] = useState(false);
  const reelsContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentReel(reels[currentReelIndex]);
    setReelViewCount((prev) => prev + 1);

    if (reelViewCount > 0 && reelViewCount % 2 === 0) {
      const promptType = ['quiz', 'game', 'module'][Math.floor(Math.random() * 3)] as 'quiz' | 'game' | 'module';
      setTimeout(() => setShowPrompt(promptType), 1000);
    } else {
      setShowPrompt(null);
    }

    if (Math.random() > 0.7) {
      setTimeout(() => {
        setShowCharacter(true);
        setTimeout(() => setShowCharacter(false), 5000);
      }, 2000);
    } else {
      setShowCharacter(false);
    }
  }, [currentReelIndex]);

  const handleScroll = () => {
    if (!reelsContainerRef.current) return;
    const children = reelsContainerRef.current.children;
    let newIndex = 0;
    const scrollY = reelsContainerRef.current.scrollTop;
    const height = reelsContainerRef.current.clientHeight;
    for (let i = 0; i < children.length; i++) {
      if ((children[i] as HTMLElement).offsetTop <= scrollY + height/2) {
        newIndex = i;
      }
    }
    setCurrentReelIndex(newIndex);
  }

  const handlePreviousReel = () => {
    setCurrentReelIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setShowPrompt(null);
    if (reelsContainerRef.current) {
      const newScroll = (currentReelIndex - 1) * reelsContainerRef.current.clientHeight;
      reelsContainerRef.current.scrollTo({ top: newScroll, behavior: "smooth" });
    }
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev < reels.length - 1 ? prev + 1 : prev));
    setShowPrompt(null);
    if (reelsContainerRef.current) {
      const newScroll = (currentReelIndex + 1) * reelsContainerRef.current.clientHeight;
      reelsContainerRef.current.scrollTo({ top: newScroll, behavior: "smooth" });
    }
  };

  const handleDismissPrompt = () => setShowPrompt(null);

  const handleCelebrate = (message: string) => {
    toast(message, {
      icon: "🎉",
      className: "bg-marigold text-white font-bold text-lg",
    });
  };

  const getCharacterForCategory = () => {
    const category = currentReel?.category || 'basics';
    const celebrity = getCelebrityGuide(category);
    
    return {
      name: celebrity.name,
      avatar: celebrity.avatar || '👑',
      dialog: getMotivationalPhrase(category, language),
      emotion: category === 'investment' || category === 'fraud' ? 'thinking' as const : 'happy' as const
    };
  };

  return (
    <Layout>
      <div className="relative h-full">
        <div 
          className="h-[calc(100vh-5rem)] md:h-[calc(100vh-10rem)] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
          ref={reelsContainerRef}
          onScroll={handleScroll}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="snap-start snap-always h-[calc(100vh-5rem)] flex items-center justify-center"
              style={{ minHeight: "500px" }}
            >
              <ReelCard 
                reel={reel}
                height="h-[90vh] md:h-[90vh]"
                onCelebrate={handleCelebrate}
                isActive={index === currentReelIndex}
                accentColor={index % 2 === 0 ? "bg-gradient-to-br from-coin-orange to-coin-purple" : "bg-gradient-to-bl from-holi-yellow to-coin-pink"}
                withVideo
              />
            </div>
          ))}
        </div>
        
        {!isMobile && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary" 
                size="icon"
                className="rounded-full bg-holi-yellow text-coin-dark shadow-xl border-2 border-white"
                onClick={handlePreviousReel}
                disabled={currentReelIndex === 0}
              >
                <ChevronUp />
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary" 
                size="icon"
                className="rounded-full bg-coin-pink text-coin-dark shadow-xl border-2 border-white"
                onClick={handleNextReel}
                disabled={currentReelIndex === reels.length - 1}
              >
                <ChevronDown />
              </Button>
            </motion.div>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <div className="text-sm font-bold text-holi-pink bg-white/90 px-5 py-2 rounded-full shadow ring-2 ring-marigold">
            {currentReelIndex + 1}/{reels.length}
          </div>
        </div>
        
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
