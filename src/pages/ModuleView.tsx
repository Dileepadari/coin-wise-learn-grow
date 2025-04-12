
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { modules } from "@/data/mockData";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ModuleContentView from "@/components/learning/ModuleContentView";
import { useApp } from "@/context/AppContext";

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user, updateProgress } = useApp();
  const [module, setModule] = useState(modules.find(m => m.id === moduleId));
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  
  // Get current content item (lesson or quiz)
  const allContent = [
    ...(module?.content || []).map(item => ({ ...item, type: 'content' })),
    ...(module?.quizzes || []).map(item => ({ ...item, type: 'quiz' }))
  ];
  
  // Get module progress
  const moduleProgress = user.progress.find(p => p.moduleId === moduleId);
  const progress = moduleProgress?.progress || 0;
  
  useEffect(() => {
    if (!module) {
      navigate('/learn');
    }
    
    // Update progress when content changes
    const newProgressPercentage = Math.round(((activeContentIndex + 1) / allContent.length) * 100);
    if (moduleId && newProgressPercentage > progress) {
      updateProgress(moduleId, newProgressPercentage);
    }
  }, [module, navigate, moduleId, activeContentIndex, progress, allContent.length, updateProgress]);
  
  const handleBack = () => {
    if (module?.category) {
      navigate(`/learn/chapter/${module.category}`);
    } else {
      navigate('/learn');
    }
  };
  
  const handleNext = () => {
    if (activeContentIndex < allContent.length - 1) {
      setActiveContentIndex(activeContentIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (activeContentIndex > 0) {
      setActiveContentIndex(activeContentIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  if (!module) {
    return null;
  }
  
  const currentContent = allContent[activeContentIndex];
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <Button variant="ghost" onClick={handleBack} className="pl-0 flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {module.category.charAt(0).toUpperCase() + module.category.slice(1)} Chapter
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{module.name}</h1>
            <Badge variant="outline" className="capitalize">
              {module.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground">
            <span>Progress: {progress}%</span>
            <span>{activeContentIndex + 1} of {allContent.length}</span>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Content navigation */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
          {allContent.map((content, index) => (
            <Button
              key={content.id}
              variant={index === activeContentIndex ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0 min-w-[40px] h-8 px-3"
              onClick={() => setActiveContentIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        
        {/* Module content */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {currentContent.title || (currentContent.type === 'quiz' ? `Quiz: ${currentContent.question}` : 'Lesson')}
              </CardTitle>
              <Badge>
                {currentContent.type === 'quiz' ? 'Knowledge Check' : currentContent.type.charAt(0).toUpperCase() + currentContent.type.slice(1)}
              </Badge>
            </div>
            <CardDescription>
              {currentContent.type === 'quiz' ? 'Test your knowledge' : `${(activeContentIndex + 1)} of ${allContent.length}`}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ModuleContentView 
              content={currentContent}
              module={module}
              onComplete={handleNext}
            />
          </CardContent>
        </Card>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={activeContentIndex === 0}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={activeContentIndex === allContent.length - 1}
            className="flex items-center"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
