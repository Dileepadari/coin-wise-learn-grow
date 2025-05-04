import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import ModuleContentView from "@/components/learning/ModuleContentView";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/utils/animations";
import { AnimatedIcon, Confetti } from "@/components/ui/custom-icons";
import { LearningContent, Quiz } from "@/types";

// Import modules instead of learningModules
import { modules } from "@/data/mockData";

export default function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { addCoins, updateUser, user } = useAppContext();
  
  const module = modules.find(m => m.id === moduleId);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedContent, setCompletedContent] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Check if user has any progress in this module already
    const moduleProgress = user.progress.find(p => p.moduleId === moduleId);
    if (moduleProgress && moduleProgress.completed) {
      const allContentIds = [
        ...module?.content.map(c => c.id) || [],
        ...module?.quizzes.map(q => q.id) || []
      ];
      setCompletedContent(allContentIds);
    }
  }, [moduleId, user.progress, module]);
  
  if (!module) {
    return (
      <Layout>
        <div className="container px-4 py-8 text-center">
          <h2 className="text-xl font-bold mb-4">मॉड्यूल नहीं मिला (Module not found)</h2>
          <Button onClick={() => navigate("/learn")}>लर्निंग पेज पर वापस जाएं</Button>
        </div>
      </Layout>
    );
  }

  // Determine the current content item based on index
  let currentContent: LearningContent | Quiz;
  if (currentContentIndex < module.content.length) {
    currentContent = module.content[currentContentIndex];
  } else {
    const quizIndex = currentContentIndex - module.content.length;
    currentContent = module.quizzes[quizIndex];
  }

  const isContentCompleted = completedContent.includes(currentContent?.id);
  const progress = Math.round((completedContent.length / (module.content.length + module.quizzes.length)) * 100);
  
  const handleContentComplete = (contentId: string) => {
    if (completedContent.includes(contentId)) return;
    
    setCompletedContent(prev => [...prev, contentId]);
    
    // Add coins as reward
    const pointValue = currentContent.points || 5;
    addCoins(pointValue);
    
    if (progress + Math.round(100 / (module.content.length + module.quizzes.length)) >= 100) {
      // If this completion will make the module 100% complete
      setShowConfetti(true);
      
      // Add XP for module completion
      updateUser({ xp: user.xp ? user.xp + 50 : 50 });
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    toast(
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div className="font-medium">सामग्री पूरी हुई!</div>
      </div>,
      {
        description: `आपने इस खंड को पूरा करके ${pointValue} सिक्के अर्जित किए हैं।`,
      }
    );
  };
  
  const handleNext = () => {
    if (!isContentCompleted) {
      handleContentComplete(currentContent.id);
    }
    
    if (currentContentIndex < module.content.length + module.quizzes.length - 1) {
      setCurrentContentIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Module completed
      toast(
        <div className="flex items-center gap-2">
          <AnimatedIcon>
            <Confetti className="h-5 w-5 text-yellow-500" />
          </AnimatedIcon>
          <div className="font-medium">मॉड्यूल पूरा हुआ!</div>
        </div>,
        {
          description: `आपने ${module.name} मॉड्यूल पूरा कर लिया है और ${module.totalPoints} अंक अर्जित किए हैं।`,
        }
      );
      
      // Navigate back to module list
      navigate("/learn/chapter/" + module.category);
    }
  };
  
  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/learn/chapter/" + module.category);
    }
  };

  // Determine if current content is a quiz or regular content
  const isQuiz = currentContentIndex >= module.content.length;
  
  return (
    <Layout>
      <div className="container px-4 pb-20 relative">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Add confetti animation here */}
            <div className="absolute top-20 left-1/4 text-yellow-500 animate-bounce">
              <Confetti className="h-6 w-6" />
            </div>
            <div className="absolute top-40 left-3/4 text-primary animate-bounce delay-300">
              <Confetti className="h-8 w-8" />
            </div>
            <div className="absolute top-60 left-1/2 text-green-500 animate-bounce delay-700">
              <Confetti className="h-10 w-10" />
            </div>
          </div>
        )}
      
        <motion.div 
          className="py-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Button 
            variant="ghost" 
            className="pl-0 flex items-center mb-4"
            onClick={() => navigate("/learn")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            मॉड्यूल्स पर वापस जाएं
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{module.name}</h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
            
            <motion.div 
              className="bg-primary/10 p-2 rounded-full flex items-center gap-1 text-primary font-medium"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4" />
              <span>{module.totalPoints} अंक</span>
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm font-medium">प्रगति: {progress}%</div>
            <div className="text-sm text-muted-foreground">
              {completedContent.length}/{module.content.length + module.quizzes.length} पूरा
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </motion.div>
        
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
        >
          <Card className="mb-6 p-6 shadow-md border-primary/10">
            {currentContent && (
              <ModuleContentView 
                content={currentContent} 
                onComplete={() => handleContentComplete(currentContent.id)}
                moduleCategory={module.category}
                completed={isContentCompleted}
              />
            )}
          </Card>
        </motion.div>
        
        <motion.div 
          className="flex justify-between mt-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            पिछला
          </Button>
          
          <Button 
            onClick={handleNext}
            className="gap-2"
          >
            {currentContentIndex < module.content.length + module.quizzes.length - 1 ? 'अगला' : 'मॉड्यूल पूरा करें'}
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}