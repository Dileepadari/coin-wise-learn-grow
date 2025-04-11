
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import ReelCard from "@/components/reel/ReelCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { allReels } = useApp();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentReelIndex(currentIndex => 
      currentIndex === 0 ? allReels.length - 1 : currentIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentReelIndex(currentIndex => 
      currentIndex === allReels.length - 1 ? 0 : currentIndex + 1
    );
  };
  
  const currentReel = allReels[currentReelIndex];
  
  return (
    <Layout>
      <div className="relative h-[calc(100vh-10rem)]">
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <ReelCard reel={currentReel} height="h-[calc(100vh-10rem)]" />
      </div>
    </Layout>
  );
}
