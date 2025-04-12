
import { useState } from "react";
import { LearningModule } from "@/types";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { CheckCircle, Play, Lightbulb, Award, ArrowRight, Share2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LearningModuleContentProps {
  module: LearningModule;
}

export default function LearningModuleContent({ module }: LearningModuleContentProps) {
  const { user, updateProgress, completeModule, addCoins } = useApp();
  const [activeContent, setActiveContent] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [completedContents, setCompletedContents] = useState<string[]>([]);
  
  // Get user progress for this module
  const moduleProgress = user.progress.find(p => p.moduleId === module.id);
  const progress = moduleProgress?.progress || 0;
  const isModuleCompleted = moduleProgress?.completed || false;
  
  const handleContentSelect = (contentId: string) => {
    setActiveContent(contentId);
    if (!completedContents.includes(contentId)) {
      // Calculate new progress percentage
      const newCompletedContents = [...completedContents, contentId];
      const totalItems = module.content.length + module.quizzes.length;
      const newProgressPercentage = Math.round((newCompletedContents.length / totalItems) * 100);
      
      setCompletedContents(newCompletedContents);
      updateProgress(module.id, newProgressPercentage);
      
      // Celebration for completing content
      setShowCelebration(true);
      const earnedCoins = 5;
      addCoins(earnedCoins);
      
      toast(`+${earnedCoins} coins!`, {
        icon: "🪙",
        description: "Keep learning to earn more rewards!"
      });
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      
      // Check if module is completed
      if (newProgressPercentage >= 100 && !isModuleCompleted) {
        completeModule(module.id);
        toast("Module completed!", {
          icon: "🎉",
          description: `You've earned ${module.totalPoints} coins!`
        });
      }
    }
  };
  
  const handleQuizAnswer = (quizId: string, selectedAnswerIndex: number) => {
    const quiz = module.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    setQuizAnswers({
      ...quizAnswers,
      [quizId]: selectedAnswerIndex
    });
    
    if (selectedAnswerIndex === quiz.correctAnswer) {
      // Correct answer
      if (!completedContents.includes(quizId)) {
        // Calculate new progress percentage
        const newCompletedContents = [...completedContents, quizId];
        const totalItems = module.content.length + module.quizzes.length;
        const newProgressPercentage = Math.round((newCompletedContents.length / totalItems) * 100);
        
        setCompletedContents(newCompletedContents);
        updateProgress(module.id, newProgressPercentage);
        
        // Celebration for completing quiz
        setShowCelebration(true);
        const earnedCoins = 10;
        addCoins(earnedCoins);
        
        toast("Correct answer! +10 coins", {
          icon: "✅",
          description: quiz.explanation
        });
        
        setTimeout(() => {
          setShowCelebration(false);
        }, 2000);
        
        // Check if module is completed
        if (newProgressPercentage >= 100 && !isModuleCompleted) {
          completeModule(module.id);
          toast("Module completed!", {
            icon: "🎉",
            description: `You've earned ${module.totalPoints} coins!`
          });
        }
      }
    } else {
      // Incorrect answer
      toast("Try again!", {
        icon: "❌",
        description: "That's not the correct answer."
      });
    }
  };
  
  const handleShare = () => {
    toast("Module shared!", {
      icon: "✅",
      description: "Your friends will receive your recommendation"
    });
  };

  return (
    <div className={`space-y-4 ${showCelebration ? 'animate-pulse' : ''}`}>
      <h4 className="font-medium text-lg mb-2">Module Content</h4>
      
      {module.content.map((content, index) => (
        <div key={content.id} className="border rounded-md overflow-hidden">
          <div 
            className={`flex items-center justify-between p-3 cursor-pointer
              ${activeContent === content.id ? 'bg-muted' : ''}
              ${completedContents.includes(content.id) ? 'border-l-4 border-l-green-500' : ''}`}
            onClick={() => handleContentSelect(content.id)}
          >
            <div className="flex items-center">
              <div className="bg-primary/10 h-8 w-8 flex items-center justify-center rounded-full mr-3">
                {completedContents.includes(content.id) ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  content.type === 'reel' ? 
                    <Play className="h-4 w-4" /> : 
                    <Lightbulb className="h-4 w-4" />
                }
              </div>
              <div>
                <h5 className="font-medium">{content.title}</h5>
                <p className="text-xs text-muted-foreground capitalize">{content.type}</p>
              </div>
            </div>
            
            <Badge variant="outline" className="ml-2">
              +{content.points} pts
            </Badge>
          </div>
          
          {activeContent === content.id && (
            <div className="p-4 border-t">
              <p className="mb-4">{content.content}</p>
              
              {content.type === 'reel' && (
                <div className="aspect-video bg-black/10 rounded-md mb-4 flex items-center justify-center">
                  <Play className="h-8 w-8" />
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  size="sm"
                  variant="outline"
                  className="mr-2 flex items-center gap-1"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                
                <Button 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setActiveContent(null)}
                >
                  Next Lesson
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {module.quizzes.length > 0 && (
        <>
          <h4 className="font-medium text-lg mt-6 mb-2">Knowledge Check</h4>
          
          {module.quizzes.map((quiz) => (
            <div key={quiz.id} className="border rounded-md overflow-hidden">
              <div 
                className={`p-3 cursor-pointer
                  ${completedContents.includes(quiz.id) ? 'border-l-4 border-l-green-500' : ''}`}
                onClick={() => setActiveContent(quiz.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 h-8 w-8 flex items-center justify-center rounded-full mr-3 text-amber-600">
                      <Award className="h-4 w-4" />
                    </div>
                    <h5 className="font-medium">Quiz: {quiz.question}</h5>
                  </div>
                  
                  <Badge variant="outline" className="bg-amber-50">
                    +{quiz.points} pts
                  </Badge>
                </div>
              </div>
              
              {activeContent === quiz.id && (
                <div className="p-4 border-t">
                  <p className="font-medium mb-4">{quiz.question}</p>
                  
                  <div className="space-y-2 mb-4">
                    {quiz.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={quizAnswers[quiz.id] === optionIndex ? 
                          (optionIndex === quiz.correctAnswer ? "default" : "destructive") : 
                          "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleQuizAnswer(quiz.id, optionIndex)}
                        disabled={quizAnswers[quiz.id] !== null && quizAnswers[quiz.id] !== undefined}
                      >
                        {optionIndex === quiz.correctAnswer && quizAnswers[quiz.id] === optionIndex && (
                          <CheckCircle className="h-4 w-4 mr-2 text-white" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {quizAnswers[quiz.id] === quiz.correctAnswer && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm mb-4">
                      <p className="font-medium">Correct!</p>
                      <p>{quiz.explanation}</p>
                    </div>
                  )}
                  
                  {quizAnswers[quiz.id] !== null && quizAnswers[quiz.id] !== undefined && quizAnswers[quiz.id] !== quiz.correctAnswer && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-800 text-sm mb-4">
                      <p className="font-medium">Incorrect</p>
                      <p>Try again or review the material.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}
      
      <div className="mt-4 pt-4 border-t">
        <Accordion type="single" collapsible>
          <AccordionItem value="faq">
            <AccordionTrigger>
              <span className="text-sm">Frequently Asked Questions</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium">Why should I use my budget?</h5>
                  <p className="text-muted-foreground">A budget helps you track expenses and save more effectively.</p>
                </div>
                <div>
                  <h5 className="font-medium">What does savings mean?</h5>
                  <p className="text-muted-foreground">Savings is money set aside for future use or emergencies.</p>
                </div>
                <div>
                  <h5 className="font-medium">How is content included with my subscription?</h5>
                  <p className="text-muted-foreground">All learning modules and games are included with your free account.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
