
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ShieldAlert, MessageSquare, Trophy, Star, User } from "lucide-react";
import { scamExamples } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import GameCharacter from "@/components/game/GameCharacter";
import CharacterDialog from "@/components/game/CharacterDialog";

export default function ScamDetectionGame() {
  const { toast } = useToast();
  const { user, addCoins } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [showCharacterDialog, setShowCharacterDialog] = useState(false);
  const [characterMessage, setCharacterMessage] = useState("");
  
  // Mentor character that gives tips
  const [showMentor, setShowMentor] = useState(true);
  
  useEffect(() => {
    if (showMentor) {
      setTimeout(() => {
        setCharacterMessage("Welcome to the Scam Detection Challenge! I'll help you learn to spot financial scams.");
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
      
      setCharacterMessage(`Correct! ${currentScam.explanation} ${streakBonus ? `+${streakBonus} streak bonus!` : ''}`);
      
      toast({
        title: "Correct!",
        description: currentScam.explanation + (streakBonus ? ` +${streakBonus} streak bonus!` : ''),
        variant: "default",
      });
    } else {
      setStreak(0);
      setCharacterMessage(`Oops! That's incorrect. ${currentScam.explanation}`);
      
      toast({
        title: "Incorrect",
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
      
      // Give final reward based on score
      const finalReward = Math.floor(score / 10);
      addCoins(finalReward);
      
      // Show final message from mentor
      setTimeout(() => {
        setCharacterMessage(`Great job! You've earned ${finalReward} coins for your financial knowledge!`);
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
  
  // Award badges based on performance
  useEffect(() => {
    if (gameOver && score >= 70) {
      // This would normally update user profile with a badge
      toast({
        title: "Badge Unlocked!",
        description: "You've earned the 'Scam Detective' badge!",
        variant: "default",
      });
    }
  }, [gameOver, score]);
  
  return (
    <Layout>
      <div className="container px-4 pb-20 relative">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Scam Detection Challenge</h1>
          <p className="text-muted-foreground">Learn to spot financial scams</p>
        </div>
        
        {/* Game UI with mentor character */}
        <div className="relative">
          {showMentor && (
            <div className="absolute right-0 top-0 z-10">
              <div className="relative">
                <GameCharacter 
                  name="Financial Mentor" 
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
            <Badge variant="outline" className="flex gap-1">
              <Trophy className="h-4 w-4" />
              Score: {score}
            </Badge>
            
            <div className="flex gap-2">
              {/* Streak indicator */}
              {streak >= 3 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs"
                >
                  <Star className="h-3 w-3 text-amber-500" fill="currentColor" />
                  Streak: {streak}
                </motion.div>
              )}
              
              <Badge variant="outline">
                Question {currentQuestion + 1}/{scamExamples.length}
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
                <Card className="mb-6 overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Is this a scam?</CardTitle>
                      <Badge>{currentScam.tipCategory}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-accent/30 p-4 rounded-md mb-6 flex">
                      <div className="mr-3 flex-shrink-0">
                        <User className="h-8 w-8 p-1 bg-primary/10 rounded-full text-primary" />
                      </div>
                      <div className="chat-bubble relative bg-white p-3 rounded-lg shadow-sm border">
                        <p className="text-sm">{currentScam.message}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    {!answered ? (
                      <>
                        <Button 
                          onClick={() => handleAnswer(true)} 
                          variant="outline" 
                          className="flex-1 border-destructive border hover:bg-destructive/10"
                        >
                          <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                          It's a Scam
                        </Button>
                        <Button 
                          onClick={() => handleAnswer(false)} 
                          variant="outline" 
                          className="flex-1 border-primary border hover:bg-primary/10"
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                          It's Legitimate
                        </Button>
                      </>
                    ) : (
                      <Button onClick={nextQuestion} className="w-full">
                        Next Question
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center py-8">
                <CardContent>
                  <ShieldAlert className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
                  <p className="mb-4">You scored {score} out of {scamExamples.length * 10} points</p>
                  
                  <div className="p-4 bg-muted rounded-md mb-6">
                    <h3 className="font-medium mb-2">Your Performance</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-background p-2 rounded">
                        <div className="text-muted-foreground">Accuracy</div>
                        <div className="font-medium">{Math.round(score / (scamExamples.length * 10) * 100)}%</div>
                      </div>
                      <div className="bg-background p-2 rounded">
                        <div className="text-muted-foreground">Best Streak</div>
                        <div className="font-medium">{streak}</div>
                      </div>
                      <div className="bg-background p-2 rounded">
                        <div className="text-muted-foreground">Coins Earned</div>
                        <div className="font-medium">{Math.floor(score / 10)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={restartGame}>Play Again</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        
        <div className="mt-8 bg-muted/30 p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            Scam Detection Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Be suspicious of unexpected messages claiming you've won money or prizes</li>
            <li>Banks will never ask for your PIN or full password over message or call</li>
            <li>Don't click on suspicious links in messages or emails</li>
            <li>Government jobs are never offered via text messages without a formal process</li>
            <li>Be cautious of urgent requests demanding immediate action</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
