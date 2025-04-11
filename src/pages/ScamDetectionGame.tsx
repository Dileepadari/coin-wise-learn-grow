
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ShieldAlert, MessageSquare, Trophy } from "lucide-react";
import { scamExamples } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";

export default function ScamDetectionGame() {
  const { toast } = useToast();
  const { user } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  
  const handleAnswer = (isScam: boolean) => {
    if (answered) return;
    
    setSelectedAnswer(isScam);
    setAnswered(true);
    
    const currentScam = scamExamples[currentQuestion];
    const isCorrect = isScam === currentScam.isScam;
    
    if (isCorrect) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: currentScam.explanation,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: currentScam.explanation,
        variant: "destructive",
      });
    }
  };
  
  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < scamExamples.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };
  
  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };
  
  const currentScam = scamExamples[currentQuestion];
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Scam Detection Challenge</h1>
          <p className="text-muted-foreground">Learn to spot financial scams</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline" className="flex gap-1">
            <Trophy className="h-4 w-4" />
            Score: {score}
          </Badge>
          <Badge variant="outline">
            Question {currentQuestion + 1}/{scamExamples.length}
          </Badge>
        </div>
        
        {!gameOver ? (
          <Card className="mb-6 overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Is this a scam?</CardTitle>
                <Badge>{currentScam.tipCategory}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-accent/30 p-4 rounded-md mb-6 flex">
                <MessageSquare className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <p className="text-sm">{currentScam.message}</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              {!answered ? (
                <>
                  <Button 
                    onClick={() => handleAnswer(true)} 
                    variant="outline" 
                    className="flex-1 border-destructive border"
                  >
                    <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                    It's a Scam
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(false)} 
                    variant="outline" 
                    className="flex-1 border-primary border"
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
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <ShieldAlert className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
              <p className="mb-4">You scored {score} out of {scamExamples.length * 10} points</p>
              <Button onClick={restartGame}>Play Again</Button>
            </CardContent>
          </Card>
        )}
        
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
