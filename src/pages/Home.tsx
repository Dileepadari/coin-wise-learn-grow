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
import { getMotivationalPhrase } from "@/utils/translate";
import { getCelebrityGuide } from "@/lib/utils";

export default function Home() {
  const { user, language } = useAppContext();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState<'quiz' | 'game' | 'module' | null>(null);
  const [currentReel, setCurrentReel] = useState<Reel | null>(null);
  const [reelViewCount, setReelViewCount] = useState(0);
  const [floatingSuggestion, setFloatingSuggestion] = useState<{
    type: 'quiz' | 'game' | 'module';
    celebrity: { name: string; avatar: string };
  } | null>(null);
  const reelsContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentReel(reels[currentReelIndex]);
    setReelViewCount((prev) => prev + 1);

    if (reelViewCount > 0 && reelViewCount % 5 === 0) { // Reduced frequency
      const promptType = ['quiz', 'game', 'module'][Math.floor(Math.random() * 3)] as 'quiz' | 'game' | 'module';
      const category = currentReel?.category || 'basics';
      const celebrity = getCelebrityGuide(category);

      setFloatingSuggestion({
        type: promptType,
        celebrity: {
          name: celebrity.name,
          avatar: celebrity.avatar || '🎬',
        },
      });
    } else {
      setFloatingSuggestion(null);
    }
  }, [currentReelIndex]);

  const handleScroll = () => {
    if (!reelsContainerRef.current) return;
    const children = reelsContainerRef.current.children;
    let newIndex = 0;
    const scrollY = reelsContainerRef.current.scrollTop;
    const height = reelsContainerRef.current.clientHeight;
    for (let i = 0; i < children.length; i++) {
      if ((children[i] as HTMLElement).offsetTop <= scrollY + height / 2) {
        newIndex = i;
      }
    }
    setCurrentReelIndex(newIndex);
  };

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

  const handleFloatingSuggestionClick = () => {
    if (floatingSuggestion) {
      setShowPrompt(floatingSuggestion.type);
      setFloatingSuggestion(null); // Hide the floating suggestion after clicking
    }
  };

  return (
    <Layout>
      <div className="relative h-full">
        {/* Floating Suggestion Widget */}
        {floatingSuggestion && (
          <motion.div
            className="fixed top-4 right-4 z-50 flex items-center gap-4 p-4 bg-white shadow-lg rounded-full cursor-pointer"
            onClick={handleFloatingSuggestionClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <img
              src={floatingSuggestion.celebrity.avatar}
              alt={floatingSuggestion.celebrity.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{floatingSuggestion.celebrity.name}</p>
              <p>suggests you try a {floatingSuggestion.type}!</p>
            </div>
          </motion.div>
        )}

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
                onCelebrate={(message) => toast(message, {
                  icon: "🎉",
                  position: "top-center", // Set the position to top center
                    style: {
                    animation: "fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 2.5s", // Add fade-in and fade-out animation
                    background: "linear-gradient(to right, #FF7E5F, #FF6B6B)", // Gradient background
                    color: "#fff", // White text color
                    borderRadius: "8px", // Rounded corners
                    padding: "10px 20px", // Padding
                    fontSize: "16px", // Font size
                    fontWeight: "bold", // Bold text  
                  },
                })}
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
