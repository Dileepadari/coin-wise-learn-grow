
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { modules } from "@/data/mockData";
import { ArrowLeft, BookOpen, Award, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function ChapterView() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [chapterModules, setChapterModules] = useState(modules.filter(m => m.category === category));
  
  useEffect(() => {
    if (!category || chapterModules.length === 0) {
      navigate('/learn');
    }
  }, [category, chapterModules, navigate]);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🛡️';
      case 'borrowing': return '🏦';
      case 'basics': return '📚';
      default: return '💡';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500";
      case "intermediate": return "bg-yellow-500";
      case "advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  const getChapterDescription = (category: string) => {
    switch (category) {
      case 'savings': return "Learn effective strategies to save money and build your financial safety net.";
      case 'investment': return "Understand how to grow your money through smart investment choices.";
      case 'fraud': return "Protect yourself by recognizing and avoiding common financial scams and frauds.";
      case 'borrowing': return "Learn responsible borrowing habits and understand different loan options.";
      case 'basics': return "Master the fundamental concepts of personal finance and money management.";
      default: return "Expand your financial knowledge with these modules.";
    }
  };
  
  const getModuleProgress = (moduleId: string) => {
    const progress = user.progress.find(p => p.moduleId === moduleId);
    return progress?.progress || 0;
  };
  
  const isModuleCompleted = (moduleId: string) => {
    const progress = user.progress.find(p => p.moduleId === moduleId);
    return progress?.completed || false;
  };
  
  const handleViewModule = (moduleId: string) => {
    navigate(`/learn/module/${moduleId}`);
  };
  
  const handleBack = () => {
    navigate('/learn');
  };
  
  // Get overall chapter progress
  const getChapterProgress = () => {
    const totalModules = chapterModules.length;
    const completedModules = chapterModules.filter(m => 
      user.progress.some(p => p.moduleId === m.id && p.completed)
    ).length;
    
    return Math.round((completedModules / totalModules) * 100) || 0;
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <Button variant="ghost" onClick={handleBack} className="pl-0 flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Chapters
          </Button>
          
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mr-3">
              {getCategoryIcon(category || '')}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold capitalize">{category} Chapter</h1>
              <p className="text-muted-foreground">
                {getChapterDescription(category || '')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Chapter progress */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Chapter Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {chapterModules.filter(m => isModuleCompleted(m.id)).length} of {chapterModules.length} modules completed
              </span>
              <Badge>{getChapterProgress()}%</Badge>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${getChapterProgress()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        {/* Module list */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{chapterModules.length} Learning Modules</h2>
          
          {chapterModules.map((module, index) => {
            const isCompleted = isModuleCompleted(module.id);
            const currentProgress = getModuleProgress(module.id);
            
            return (
              <Card 
                key={module.id} 
                className={`
                  hover:shadow-md transition-shadow
                  ${isCompleted ? "border-primary/30 bg-primary/5" : ""}
                `}
                onClick={() => handleViewModule(module.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-2">
                          {index + 1}
                        </span>
                      )}
                      {module.name}
                    </CardTitle>
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="mr-4">{module.content.length} lessons</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{module.content.length * 5} mins</span>
                    {module.quizzes.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{module.quizzes.length} quizzes</span>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="text-sm">{module.totalPoints} points</span>
                  </div>
                  
                  <Button 
                    variant={isCompleted ? "outline" : "default"} 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    {isCompleted ? "Review Module" : "Start Learning"}
                    <TrendingUp className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
