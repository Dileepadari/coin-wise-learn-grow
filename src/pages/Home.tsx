
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { reels } from "@/data/mockData";
import ReelCard from "@/components/reel/ReelCard";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useApp();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const handlePreviousReel = () => {
    setCurrentReelIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev < reels.length - 1 ? prev + 1 : prev));
  };

  return (
    <Layout>
      <div className="relative h-full pb-16">
        {/* Reels container with snap scroll */}
        <div className="h-[calc(100vh-10rem)] overflow-hidden">
          <div 
            className="h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateY(-${currentReelIndex * 100}%)` }}
          >
            {reels.map((reel, index) => (
              <div key={reel.id} className="h-full w-full">
                <ReelCard reel={reel} height="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <Button
            variant="secondary" 
            size="icon"
            className="rounded-full bg-black/20 backdrop-blur-md"
            onClick={handlePreviousReel}
            disabled={currentReelIndex === 0}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary" 
            size="icon"
            className="rounded-full bg-black/20 backdrop-blur-md"
            onClick={handleNextReel}
            disabled={currentReelIndex === reels.length - 1}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Reel indicator */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="text-sm text-white bg-black/20 backdrop-blur-md px-2 py-1 rounded-full">
            {currentReelIndex + 1}/{reels.length}
          </div>
        </div>
      </div>
    </Layout>
  );
}
