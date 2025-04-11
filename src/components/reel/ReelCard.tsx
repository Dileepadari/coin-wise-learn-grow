
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ThumbsUp, Bookmark, ThumbsDown, Volume2, VolumeX, Globe, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reel } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface ReelCardProps {
  reel: Reel;
  height?: string;
}

export default function ReelCard({ reel, height = "h-[70vh]" }: ReelCardProps) {
  const { user, likeContent, saveContent } = useApp();
  const [isMuted, setIsMuted] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();
  
  const isLiked = user.likedContent.includes(reel.id);
  const isSaved = user.savedContent.includes(reel.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    likeContent(reel.id);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    saveContent(reel.id);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMuted(!isMuted);
  };
  
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🛡️';
      case 'borrowing': return '🏦';
      case 'basics': return '📚';
      default: return '💡';
    }
  };

  const handleAiSummarize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsAiLoading(false);
      toast({
        title: "AI Summary",
        description: `Key Point: ${reel.title} - ${reel.content.split('.')[0]}.`,
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className={cn("reel-container", height)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <div className="flex items-start mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
              {getCategoryEmoji(reel.category)}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-lg">{reel.title}</h3>
              <div className="flex items-center space-x-2">
                <Link to={`/category/${reel.category}`}>
                  <p className="text-xs flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    {reel.category}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          
          <p className="text-sm">{reel.content}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {reel.moduleId && (
              <Link to={`/learn/module/${reel.moduleId}`}>
                <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 flex items-center gap-1"
              onClick={handleAiSummarize}
              disabled={isAiLoading}
            >
              <BrainCircuit className="h-4 w-4" />
              {isAiLoading ? "Summarizing..." : "AI Summary"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="reel-actions bottom-24 sm:bottom-32 right-4">
        <button onClick={toggleLike} className="reel-action-button">
          {isLiked ? (
            <ThumbsUp className="h-6 w-6 fill-white" />
          ) : (
            <ThumbsUp className="h-6 w-6" />
          )}
        </button>
        <button onClick={toggleLike} className="reel-action-button">
          <ThumbsDown className="h-6 w-6" />
        </button>
        <button onClick={toggleSave} className="reel-action-button">
          {isSaved ? (
            <Bookmark className="h-6 w-6 fill-white" />
          ) : (
            <Bookmark className="h-6 w-6" />
          )}
        </button>
        <button onClick={toggleMute} className="reel-action-button">
          {isMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}
