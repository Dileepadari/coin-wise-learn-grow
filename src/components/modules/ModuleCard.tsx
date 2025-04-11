
import { LearningModule } from "@/types";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ProgressCircle from "../ui/ProgressCircle";
import { BookOpen, Award } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: LearningModule;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { user } = useApp();
  
  const moduleProgress = user.progress.find(p => p.moduleId === module.id);
  const progress = moduleProgress?.progress || 0;
  const completed = moduleProgress?.completed || false;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
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
  
  return (
    <Link to={`/learn/module/${module.id}`}>
      <div className={cn(
        "border rounded-lg p-4 transition-all hover:shadow-md flex justify-between items-center",
        completed && "border-primary/30 bg-primary/5"
      )}>
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
            {getCategoryIcon(module.category)}
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium line-clamp-1">{module.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={cn("text-xs", getDifficultyColor(module.difficulty))}>
                {module.difficulty}
              </Badge>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>{module.content.length} lessons</span>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Award className="h-3 w-3 mr-1" />
                <span>{module.totalPoints} points</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <ProgressCircle 
            progress={progress} 
            size={36} 
            strokeWidth={4}
            showPercentage={true}
          />
        </div>
      </div>
    </Link>
  );
}
