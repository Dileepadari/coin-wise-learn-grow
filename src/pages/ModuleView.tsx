
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import ModuleContentView from "@/components/learning/ModuleContentView";

// Import modules instead of learningModules
import { modules } from "@/data/mockData";

export default function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addCoins } = useApp();
  
  const module = modules.find(m => m.id === moduleId);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedContent, setCompletedContent] = useState<string[]>([]);
  
  if (!module) {
    return (
      <Layout>
        <div className="container px-4 py-8 text-center">
          <h2 className="text-xl font-bold mb-4">Module not found</h2>
          <Button onClick={() => navigate("/learn")}>Back to Learning</Button>
        </div>
      </Layout>
    );
  }
  
  const currentContent = module.content[currentContentIndex] || module.quizzes[currentContentIndex - module.content.length];
  const isContentCompleted = completedContent.includes(currentContent.id);
  const progress = Math.round((completedContent.length / (module.content.length + module.quizzes.length)) * 100);
  
  const handleContentComplete = (contentId: string) => {
    if (completedContent.includes(contentId)) return;
    
    setCompletedContent(prev => [...prev, contentId]);
    
    // Add coins as reward
    const pointValue = currentContent.points || 5;
    addCoins(pointValue);
    
    toast(
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div className="font-medium">Content completed!</div>
      </div>,
      {
        description: `You earned ${pointValue} coins for completing this section.`,
      }
    );
  };
  
  const handleNext = () => {
    if (!isContentCompleted) {
      handleContentComplete(currentContent.id);
    }
    
    if (currentContentIndex < module.content.length + module.quizzes.length - 1) {
      setCurrentContentIndex(prev => prev + 1);
    } else {
      // Module completed
      toast(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div className="font-medium">Module Completed!</div>
        </div>,
        {
          description: `You've completed the ${module.name} module and earned ${module.totalPoints} points.`,
        }
      );
      
      // Navigate back to module list
      navigate("/learn");
    }
  };
  
  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
    } else {
      navigate("/learn");
    }
  };

  // Determine if current content is a quiz or regular content
  const isQuiz = currentContentIndex >= module.content.length;
  const contentTitle = isQuiz 
    ? module.quizzes[currentContentIndex - module.content.length].question 
    : module.content[currentContentIndex].title;
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <Button 
            variant="ghost" 
            className="pl-0 flex items-center mb-4"
            onClick={() => navigate("/learn")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
          
          <h1 className="text-2xl font-bold">{module.name}</h1>
          <p className="text-muted-foreground">{module.description}</p>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm font-medium">Progress: {progress}%</div>
            <div className="text-sm text-muted-foreground">
              {completedContent.length}/{module.content.length + module.quizzes.length} completed
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </div>
        
        <Card className="mb-6 p-6">
          <ModuleContentView 
            content={currentContent} 
            onComplete={() => handleContentComplete(currentContent.id)}
            moduleCategory={module.category}
            completed={isContentCompleted}
          />
        </Card>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
          >
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {currentContentIndex < module.content.length + module.quizzes.length - 1 ? 'Next' : 'Finish Module'}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
