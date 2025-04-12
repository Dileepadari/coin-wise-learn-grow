
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check } from "lucide-react";
import { modules } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export default function Learn() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = [...new Set(modules.map(module => module.category))];
  
  // Filter modules based on selected category
  const filteredCategories = selectedCategory 
    ? categories.filter(category => category === selectedCategory) 
    : categories;
    
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
  
  const getCategoryProgress = (category: string) => {
    const categoryModules = modules.filter(m => m.category === category);
    const completedModules = categoryModules.filter(m => 
      user.progress.some(p => p.moduleId === m.id && p.completed)
    );
    
    return {
      completed: completedModules.length,
      total: categoryModules.length,
      percentage: Math.round((completedModules.length / categoryModules.length) * 100) || 0
    };
  };

  const handleViewChapter = (category: string) => {
    navigate(`/learn/chapter/${category}`);
  };

  // Category filter
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
  };

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
            onClick={() => handleCategoryFilter(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              className="cursor-pointer px-3 py-1"
              onClick={() => handleCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Chapters list */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCategories.map((category) => {
            const progress = getCategoryProgress(category);
            
            return (
              <Card 
                key={category} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewChapter(category)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-2xl">
                        {getCategoryIcon(category)}
                      </div>
                      <div>
                        <CardTitle className="capitalize">{category}</CardTitle>
                        <CardDescription>
                          {progress.completed} of {progress.total} modules completed
                        </CardDescription>
                      </div>
                    </div>
                    
                    <Badge variant="outline">
                      {progress.percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Progress bar */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  
                  {/* Module list preview */}
                  <div className="mt-4 space-y-1">
                    {modules
                      .filter(module => module.category === category)
                      .slice(0, 3)
                      .map(module => {
                        const isCompleted = user.progress.some(p => p.moduleId === module.id && p.completed);
                        
                        return (
                          <div key={module.id} className="flex items-center">
                            {isCompleted ? (
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            )}
                            <span className={`text-sm ${isCompleted ? 'text-green-700' : ''}`}>
                              {module.name}
                            </span>
                          </div>
                        );
                      })}
                    
                    {modules.filter(module => module.category === category).length > 3 && (
                      <div className="text-xs text-muted-foreground pl-6">
                        + {modules.filter(module => module.category === category).length - 3} more modules
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
