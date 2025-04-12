
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Clock, ArrowRight, ChevronDown, ChevronUp, Play, CheckCircle } from "lucide-react";
import { modules } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LearningModuleContent from "@/components/learning/LearningModuleContent";

export default function Learn() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = [...new Set(modules.map(module => module.category))];
  
  // Filter modules based on selected category
  const filteredModules = selectedCategory 
    ? modules.filter(module => module.category === selectedCategory) 
    : modules;
    
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500";
      case "intermediate": return "bg-yellow-500";
      case "advanced": return "bg-red-500";
      default: return "bg-gray-500";
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
  
  const handleToggleModule = (moduleId: string) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
      // Scroll to module content after expansion
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Group modules by categories for chapter display
  const chapters = categories.map(category => {
    return {
      category,
      modules: modules.filter(module => module.category === category)
    };
  });

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Learn Finance</h1>
          <p className="text-muted-foreground">
            Complete chapters and modules to earn coins and badges
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 pb-6 overflow-x-auto">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              className="cursor-pointer px-3 py-1"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Chapters accordion */}
        <Accordion type="single" collapsible className="mb-6">
          {(selectedCategory ? chapters.filter(c => c.category === selectedCategory) : chapters).map((chapter) => (
            <AccordionItem key={chapter.category} value={chapter.category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-xl">
                    {chapter.category === 'savings' && '💰'}
                    {chapter.category === 'investment' && '📈'}
                    {chapter.category === 'fraud' && '🛡️'}
                    {chapter.category === 'borrowing' && '🏦'}
                    {chapter.category === 'basics' && '📚'}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-lg capitalize">{chapter.category}</h3>
                    <p className="text-xs text-muted-foreground">{chapter.modules.length} modules</p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent>
                <div className="pl-12 space-y-3">
                  {chapter.modules.map(module => (
                    <Card key={module.id} className={`
                      hover:shadow-md transition-shadow
                      ${isModuleCompleted(module.id) ? "border-primary/30 bg-primary/5" : ""}
                    `}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg flex items-center">
                            {isModuleCompleted(module.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
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
                        </div>
                        
                        <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${getModuleProgress(module.id)}%` }}
                          ></div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-sm">{module.totalPoints} points</span>
                        </div>
                        
                        <Button 
                          variant={expandedModule === module.id ? "default" : "outline"} 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleToggleModule(module.id)}
                        >
                          {expandedModule === module.id ? (
                            <>
                              Close Content
                              <ChevronUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              View Content
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </Button>
                      </CardFooter>
                      
                      {expandedModule === module.id && (
                        <div className="px-4 pb-4">
                          <div className="mt-3 border-t pt-3" ref={contentRef}>
                            <LearningModuleContent module={module} />
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
