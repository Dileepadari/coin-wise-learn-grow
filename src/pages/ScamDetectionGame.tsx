
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ShieldAlert, MessageSquare, Trophy, Star, User } from "lucide-react";
import { scamExamples } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import GameCharacter from "@/components/game/GameCharacter";
import CharacterDialog from "@/components/game/CharacterDialog";
import { getCelebrityGuide } from "@/lib/utils";

export default function ScamDetectionGame() {
  const { toast } = useToast();
  const { user, addCoins } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [showCharacterDialog, setShowCharacterDialog] = useState(false);
  const [characterMessage, setCharacterMessage] = useState("");
  const [showMentor, setShowMentor] = useState(true);
  const celebrityMentor = getCelebrityGuide('fraud');

  useEffect(() => {
    if (showMentor) {
      setTimeout(() => {
        setCharacterMessage(`${celebrityMentor.name} bolte hain: "Yahan pe tum scam se bachne ka asli tareeka sikhenge, mast ready ho jao!"`);
        setShowCharacterDialog(true);
        setTimeout(() => {
          setShowCharacterDialog(false);
        }, 5000);
      }, 1000);
    }
  }, [showMentor]);

  const handleAnswer = (isScam: boolean) => {
    if (answered) return;
    
    setSelectedAnswer(isScam);
    setAnswered(true);
    
    const currentScam = scamExamples[currentQuestion];
    const isCorrect = isScam === currentScam.isScam;
    
    if (isCorrect) {
      const streakBonus = streak >= 3 ? 5 : 0;
      const newScore = score + 10 + streakBonus;
      setScore(newScore);
      setStreak(streak + 1);
      
      setCharacterMessage(`Bilkul sahi! ${currentScam.explanation} ${streakBonus ? `+${streakBonus} streak bonus!` : ''}`);
      
      toast({
        title: "Ekdum correct!",
        description: currentScam.explanation + (streakBonus ? ` +${streakBonus} streak bonus!` : ''),
        variant: "default",
      });
    } else {
      setStreak(0);
      setCharacterMessage(`Arre yaar! Galat ho gaya. ${currentScam.explanation}`);
      
      toast({
        title: "Oops! Galat jawab",
        description: currentScam.explanation,
        variant: "destructive",
      });
    }
    
    setShowCharacterDialog(true);
    setTimeout(() => setShowCharacterDialog(false), 4000);
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < scamExamples.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
      
      const finalReward = Math.floor(score / 10);
      addCoins(finalReward);
      
      setTimeout(() => {
        setCharacterMessage(`Kamaal kar diya! Aapne ${finalReward} coins jeete hain apne gyaan se!`);
        setShowCharacterDialog(true);
      }, 1000);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setAnswered(false);
    setSelectedAnswer(null);
    setStreak(0);
  };

  const currentScam = scamExamples[currentQuestion];

  useEffect(() => {
    if (gameOver && score >= 70) {
      toast({
        title: "Badge Mila!",
        description: "Aapne 'Scam Master' badge jeet liya hai!",
        variant: "default",
      });
    }
  }, [gameOver, score]);

  return (
    <Layout>
      <div className="container px-4 pb-20 relative">
        <div className="py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-coin-purple to-coin-pink bg-clip-text text-transparent">Scam Detection Challenge</h1>
          <p className="text-muted-foreground">Jhol-jhaal se kaise bache, wo seekho!</p>
        </div>
        
        <div className="relative">
          {showMentor && (
            <div className="absolute right-0 top-0 z-10">
              <div className="relative">
                <GameCharacter 
                  name={celebrityMentor.name} 
                  role="Security Expert" 
                  position={{x: 0, y: 0}} 
                  avatar="👨‍💼" 
                />
                <CharacterDialog 
                  text={characterMessage} 
                  isActive={showCharacterDialog}
                  position={{top: -80, left: -100}}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="flex gap-1 bg-gradient-to-r from-coin-yellow/30 to-coin-pink/30 border-0">
              <Trophy className="h-4 w-4 text-coin-yellow" />
              Score: {score}
            </Badge>
            
            <div className="flex gap-2">
              {streak >= 3 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-holi-yellow text-coin-purple px-2 py-1 rounded-full text-xs"
                >
                  <Star className="h-3 w-3 text-coin-orange" fill="currentColor" />
                  Streak: {streak}
                </motion.div>
              )}
              
              <Badge variant="outline" className="bg-gradient-to-r from-holi-blue/30 to-holi-green/30 border-0">
                Q. {currentQuestion + 1}/{scamExamples.length}
              </Badge>
            </div>
          </div>
          
          {!gameOver ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-holi-blue/10 shadow-md mb-6">
                  <div className="bg-gradient-to-r from-coin-purple/20 to-coin-blue/10 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-coin-purple">Kya ye scam hai?</h3>
                      <Badge className="bg-holi-pink border-0 text-white">{currentScam.tipCategory}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-gradient-to-r from-coin-yellow/20 to-white rounded-lg p-4 mb-6 flex">
                      <div className="mr-3 flex-shrink-0">
                        <User className="h-8 w-8 p-1 bg-coin-purple/10 rounded-full text-coin-purple" />
                      </div>
                      <div className="chat-bubble relative rounded-lg p-4 bg-white shadow-sm border">
                        <p className="text-sm">{currentScam.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    {!answered ? (
                      <>
                        <Button 
                          onClick={() => handleAnswer(true)} 
                          variant="outline" 
                          className="flex-1 border-coin-pink border hover:bg-coin-pink/10 rounded-xl"
                        >
                          <AlertCircle className="h-4 w-4 mr-2 text-coin-pink" />
                          Ye Scam Hai
                        </Button>
                        <Button 
                          onClick={() => handleAnswer(false)} 
                          variant="outline" 
                          className="flex-1 border-coin-blue border hover:bg-coin-blue/10 rounded-xl"
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-coin-blue" />
                          Ye Sahi Hai
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={nextQuestion} 
                        className="w-full bg-gradient-to-r from-holi-green to-holi-blue text-white border-0 rounded-xl"
                      >
                        Agla Sawaal
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center py-8 rounded-xl bg-gradient-to-br from-white to-holi-yellow/30 shadow-md">
                <ShieldAlert className="h-16 w-16 mx-auto text-coin-purple mb-4" />
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-coin-purple to-coin-pink bg-clip-text text-transparent">Game Khatam!</h2>
                <p className="mb-4">Aapne {score} mein se {scamExamples.length * 10} points score kiye</p>
                
                <div className="p-4 bg-gradient-to-r from-white to-coin-yellow/20 rounded-md mb-6 mx-4">
                  <h3 className="font-medium mb-2">Aapka Performance</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <div className="text-muted-foreground">Accuracy</div>
                      <div className="font-medium">{Math.round(score / (scamExamples.length * 10) * 100)}%</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <div className="text-muted-foreground">Best Streak</div>
                      <div className="font-medium">{streak}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <div className="text-muted-foreground">Coins Mile</div>
                      <div className="font-medium">{Math.floor(score / 10)}</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={restartGame} 
                  className="bg-gradient-to-r from-coin-purple to-holi-pink text-white border-0 rounded-xl"
                >
                  Phir Se Khelo
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-white to-coin-purple/10 p-4 rounded-xl shadow-sm">
          <h3 className="font-medium mb-2 flex items-center gap-2 text-coin-purple">
            <ShieldAlert className="h-4 w-4 text-coin-pink" />
            Scam Se Bachne Ke Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Kabhi bhi anjaane message ya calls pe bharosa na kare jisme lottery ya prize ki baat ho</li>
            <li>Bank wale kabhi bhi aapse PIN ya password poore nahin poochtey, na phone pe na message pe</li>
            <li>Message ya email mein aaye links pe click karne se pehle sochiye</li>
            <li>Sarkari naukri ki message kabhi seedhe message se nahin aati, hamesa official process hota hai</li>
            <li>Jaldi decision lene ko pressure karne waalon se savdhan rahiye</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
