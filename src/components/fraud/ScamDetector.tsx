
import { useState } from "react";
import { ScamExample } from "@/types";
import { Button } from "../ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ScamDetectorProps {
  example: ScamExample;
  onComplete?: () => void;
}

export default function ScamDetector({ example, onComplete }: ScamDetectorProps) {
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { addCoins } = useAppContext();
  
  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer);
    
    if (answer === example.isScam) {
      // Correct answer
      addCoins(10);
      toast.success("Correct! You earned 10 coins");
    } else {
      // Wrong answer
      toast.error("That's not right. Try to identify the warning signs.");
    }
    
    setShowExplanation(true);
    
    if (onComplete) {
      setTimeout(onComplete, 3000);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Is this a scam?</h3>
        <div className="p-4 bg-background rounded border">
          <p className="italic">{example.message}</p>
        </div>
      </div>
      
      {userAnswer === null ? (
        <div className="flex space-x-2">
          <Button 
            variant="destructive" 
            onClick={() => handleAnswer(true)} 
            className="flex-1"
          >
            <XCircle className="mr-1 h-4 w-4" />
            Scam
          </Button>
          
          <Button 
            variant="default" 
            onClick={() => handleAnswer(false)} 
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="mr-1 h-4 w-4" />
            Valid
          </Button>
        </div>
      ) : (
        <div className={cn(
          "rounded-lg p-4",
          userAnswer === example.isScam 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        )}>
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {userAnswer === example.isScam ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </div>
            
            <div>
              <p className="font-medium">
                {userAnswer === example.isScam 
                  ? "You're right!" 
                  : "Oops! That's incorrect."
                }
              </p>
              <p className="text-sm mt-1">
                This message is {example.isScam ? "a scam" : "legitimate"}.
              </p>
              {showExplanation && (
                <div className="mt-2 text-sm">
                  <p className="font-medium">Why?</p>
                  <p>{example.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {userAnswer !== null && !showExplanation && (
        <Button
          variant="ghost"
          onClick={() => setShowExplanation(true)}
          className="w-full mt-3"
        >
          <AlertCircle className="mr-1 h-4 w-4" />
          Show explanation
        </Button>
      )}
    </div>
  );
}
