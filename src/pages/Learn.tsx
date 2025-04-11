
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Clock, ArrowRight } from "lucide-react";
import { modules } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export default function Learn() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Learn Finance</h1>
          <p className="text-muted-foreground">
            Complete modules to earn coins and badges
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

        {/* Modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredModules.map(module => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{module.name}</CardTitle>
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="text-sm">{module.totalPoints} points</span>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Start Learning
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
