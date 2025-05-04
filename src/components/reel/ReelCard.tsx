import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { ThumbsUp, Bookmark, Volume2, VolumeX, BrainCircuit, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reel } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { getCelebrityGuide } from "@/utils/utils";

interface ReelCardProps {
  reel: Reel;
  height?: string;
  onCelebrate?: (message: string) => void;
  isActive?: boolean;
  accentColor?: string;
  withVideo?: boolean;
}

export default function ReelCard({
  reel,
  height = "h-[100vh]",
  onCelebrate,
  isActive = false,
  accentColor = "bg-gradient-to-bl from-coin-yellow to-coin-pink",
  withVideo = false
}: ReelCardProps) {
  const { user, likeContent, saveContent } = useAppContext();
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast: uiToast } = useToast();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reelCardRef = useRef<HTMLDivElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const isLiked = user.likedContent.includes(reel.id);
  const isSaved = user.savedContent.includes(reel.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    likeContent(reel.id);
    if (!isLiked && onCelebrate) onCelebrate("Mast laga? +2 coins mile!");
  };
  
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    saveContent(reel.id);
    if (!isSaved && onCelebrate) onCelebrate("Jeb mein daal diya! Badhai ho!");
  };
  
  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMuted((v) => !v);
    if (videoRef.current)
      videoRef.current.muted = !videoRef.current.muted;
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🦹‍♂️';
      case 'borrowing': return '💸';
      case 'basics': return '🛒';
      default: return '🌞';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            if (isActive) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (reelCardRef.current) {
      observer.observe(reelCardRef.current);
    }

    return () => {
      if (reelCardRef.current) {
        observer.unobserve(reelCardRef.current);
      }
    };
  }, [isActive]);
  
  const getCelebrityName = (category: string) => {
    return getCelebrityGuide(category).name;
  };

  const handleAiSummarize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      const summaries = {
        savings: `${getCelebrityName('savings')} kehti hain: Choti choti bachat, badi suvidha! Har din thoda bachao, kal mast hoga.`,
        fraud: `${getCelebrityName('fraud')} kehte hain: Naya mess ya call? Soch samajh ke! Apna paisa apne haath.`,
        investment: `${getCelebrityName('investment')} kehte hain: Chota kadam, bada munafa. Sahi jagah paisa lagao.`,
        basics: `${getCelebrityName('basics')} kehte hain: Apna kharcha likho, khud malik bano.`,
        borrowing: `${getCelebrityName('borrowing')} kehti hain: Udhar mat bhoolo, samjhauta karo samay pe.`,
      };
      const summary = summaries[reel.category as keyof typeof summaries] || 
        `${getCelebrityName('basics')} kehte hain: Yeh reel financial gyaan ke liye hai. Chal mast seekh lo!`;
      uiToast({
        title: "Filmi Sitaron se Poocho",
        description: summary,
        duration: 6000,
        style: {
          background: "linear-gradient(to right, #FF7E5F, #FF6F20)",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px 20px",
          marginTop: "20vh",
          fontSize: "16px",
          width: "90%",
          margin: "20vh auto",

        }
      });
      if (onCelebrate) onCelebrate("Filmi gyaan, 5 coin turant!");
    }, 1300);
  };

  return (
    <div  ref={reelCardRef} 
      className={cn(`relative w-full max-w-[430px] mx-auto ${height} rounded-3xl shadow-2xl overflow-hidden border-4 border-white`,
        accentColor,
        isActive ? "z-10" : "opacity-70")}
      style={{ boxShadow: "0px 0px 25px 0px rgba(253,230,138,0.8)", marginBottom: "100px", height: "80vh" }}
    >
        {!isVideoLoaded && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 border-4 border-t-coin-orange border-b-coin-purple rounded-full animate-spin"></div>
          </div>
        )}
      <div className="absolute top-0 left-0 right-0 px-6 py-5 z-20 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
        <span className="text-3xl font-extrabold tracking-wider text-white mr-2">
          {getCategoryEmoji(reel.category)} 
        </span>
        <span className="font-bold text-lg md:text-2xl text-white uppercase tracking-wider">{reel.title}</span>
      </div>
      
      <div className="h-full w-full relative">
        {withVideo && reel.videoUrl ? (
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              src={reel.videoUrl}
              className="w-full h-full object-cover absolute inset-0"
              muted={isMuted}
              autoPlay={isActive}
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              onPlay={() => setIsPlaying(true)}
            />
            <div
              className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          isPlaying ? "opacity-0" : "opacity-100 hover:opacity-100"
              )}
              onClick={togglePlay}
            >
              <Button
          size="icon"
          className="rounded-full shadow-lg hover:scale-110 transition w-16 h-16 bg-black/50"
              >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white" />
          )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-coin-purple/20 to-coin-pink/20">
            <span className="text-[6rem]">{getCategoryEmoji(reel.category)}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>
        
        <div className="absolute bottom-16 left-0 right-0 z-20 p-4">
          <div className="text-white text-lg font-medium backdrop-blur-sm bg-black/40 rounded-2xl p-3 shadow">
            <span className="text-coin-pink font-black text-xl mr-1">👉</span>
            {reel.content}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-5 justify-center">
            {reel.moduleId && (
              <Link to={`/learn/module/${reel.moduleId}`}>
                <Button variant="outline" size="sm" className="bg-gradient-to-r from-coin-purple to-coin-orange text-white border-none font-extrabold hover:scale-105 shadow-xl">
                  ₹ Learn More
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/70 text-coin-purple-dark border-coin-purple-vivid hover:bg-coin-purple/20 font-bold flex items-center gap-1"
              onClick={handleAiSummarize}
              disabled={isAiLoading}
            >
              <BrainCircuit className="h-5 w-5 text-coin-pink" />
              {isAiLoading ? "Jugaad..." : `${getCelebrityName(reel.category)} se Pucho`}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute right-3 top-1/2 z-30 flex flex-col gap-4 -translate-y-1/2">
        <Button 
          size="icon"
          className="rounded-full shadow-lg hover:scale-110 transition w-12 h-12 bg-black/30"
          onClick={toggleLike}
        >
          <ThumbsUp className={isLiked ? "fill-holi-white text-holi-white scale-125 h-6 w-6" : "text-white h-6 w-6"} />
        </Button>
        <Button
          size="icon"
          className="rounded-full shadow-lg hover:scale-110 transition w-12 h-12 bg-black/30"
          onClick={toggleSave}
        >
          <Bookmark className={isSaved ? "fill-holi-white text-holi-white scale-125 h-6 w-6" : "text-white h-6 w-6"} />
        </Button>
        <Button
          size="icon"
          className="rounded-full shadow-lg hover:scale-110 transition w-12 h-12 bg-black/30"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
        </Button>
        {/* <Button
          size="icon"
          className="rounded-full shadow-lg hover:scale-110 transition w-12 h-12 bg-black/30"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
        </Button> */}
      </div>
      
      <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center gap-3 z-20">
        <Link to={`/learn/chapter/${reel.category}`}>
          <span className="text-base font-bold rounded-full px-4 py-1 bg-holi-white/60 text-white border-2 border-holi-pink shadow">{getCategoryEmoji(reel.category)} {reel.category.toUpperCase()}</span>
        </Link>
      </div>
    </div>
  );
}
