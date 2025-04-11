
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import ScamDetector from "@/components/fraud/ScamDetector";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ScamDetectionGame() {
  const { scamExamples } = useApp();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // 30 second timer
  const [gameOver, setGameOver] = useState(false);
  
  const startGame = () => {
    setGameStarted(true);
    setCurrentExampleIndex(0);
    setScore(0);
    setTimer(30);
    setGameOver(false);
    
    // Start timer
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  };
  
  const handleNextExample = () => {
    if (currentExampleIndex < scamExamples.length - 1) {
      setCurrentExampleIndex(prevIndex => prevIndex + 1);
    } else {
      setGameOver(true);
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Scam Detection Game</h1>
          <p className="text-muted-foreground">Test your knowledge and identify scams</p>
        </div>
        
        {!gameStarted && !gameOver ? (
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Identify the message that can be potentially labelled as scam</h2>
            <p className="text-muted-foreground mb-6">
              You'll be shown several messages and you need to identify if they're scams or legitimate.
            </p>
            
            <div className="flex justify-center space-x-3">
              <Button onClick={startGame} size="lg">
                START GAME
              </Button>
              <Button variant="outline" size="lg">
                READ MORE
              </Button>
            </div>
          </div>
        ) : gameOver ? (
          <div className="bg-card border rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Game Over!</h2>
            <p className="text-lg mb-4">Your score: {score} points</p>
            
            <div className="max-w-xs mx-auto mb-8">
              <p className="mb-2 text-muted-foreground">
                You've completed the scam detection challenge. The more you practice, the better you'll get at spotting scams!
              </p>
            </div>
            
            <Button onClick={startGame}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{timer} sec</span>
                </div>
                <div className="text-sm font-medium">
                  Score: {score}
                </div>
              </div>
              <Progress value={(timer / 30) * 100} className="h-2" />
            </div>
            
            <ScamDetector 
              example={scamExamples[currentExampleIndex]} 
              onComplete={handleNextExample}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
