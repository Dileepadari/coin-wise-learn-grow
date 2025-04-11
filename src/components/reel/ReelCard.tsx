
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ThumbsUp, Bookmark, ThumbsDown, Volume2, VolumeX, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reel } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface ReelCardProps {
  reel: Reel;
  height?: string;
}

export default function ReelCard({ reel, height = "h-[70vh]" }: ReelCardProps) {
  const { user, likeContent, saveContent } = useApp();
  const [isMuted, setIsMuted] = useState(true);
  
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

  return (
    <div className={cn("reel-container", height)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
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
          
          {reel.moduleId && (
            <Link to={`/learn/module/${reel.moduleId}`}>
              <Button variant="outline" size="sm" className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="reel-actions bottom-32 right-4">
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
