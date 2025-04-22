
import { LearningModule } from "@/types";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import ProgressCircle from "../ui/ProgressCircle";
import { BookOpen, Award, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { getMotivationalPhrase } from "@/utils/translate";
import { motion } from "framer-motion";

interface ModuleCardProps {
  module: LearningModule;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { user, language } = useApp();
  
  const moduleProgress = user.progress.find(p => p.moduleId === module.id);
  const progress = moduleProgress?.progress || 0;
  const completed = moduleProgress?.completed || false;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getCategoryBackgroundPattern = (category: string) => {
    switch (category) {
      case 'savings': return 'bg-coin-yellow/5';
      case 'investment': return 'bg-green-500/5';
      case 'fraud': return 'bg-red-500/5';
      case 'borrowing': return 'bg-blue-500/5';
      case 'basics': return 'bg-coin-purple/5';
      default: return 'bg-gray-100';
    }
  };

  return (
    <Link to={`/learn/module/${module.id}`}>
      <motion.div 
        className={cn(
          "border rounded-lg overflow-hidden transition-all hover:shadow-lg relative",
          getCategoryBackgroundPattern(module.category),
          completed ? "border-primary/30 bg-primary/5" : ""
        )}
        whileHover={{ y: -5 }}
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-coin-purple to-coin-pink flex items-center justify-center text-3xl shadow-md">
              {getCategoryIcon(module.category)}
            </div>
            
            <div className="flex-1 space-y-1">
              <h3 className="font-medium line-clamp-1 flex items-center">
                {module.name}
                {completed && (
                  <motion.div
                    className="ml-1 text-amber-500"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Star className="h-4 w-4 fill-amber-500" />
                  </motion.div>
                )}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={cn("text-xs px-2 py-0 h-5", getDifficultyColor(module.difficulty))}>
                  {module.difficulty}
                </Badge>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>{module.content.length} {language === 'english' ? 'lessons' : language === 'hindi' ? 'पाठ' : 'పాఠాలు'}</span>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Award className="h-3 w-3 mr-1" />
                  <span>{module.totalPoints} {language === 'english' ? 'points' : language === 'hindi' ? 'अंक' : 'పాయింట్లు'}</span>
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
          
          <div className="mt-3 py-2 px-3 rounded-lg bg-white/50 border border-dashed border-coin-purple/30 text-xs text-center text-gray-600 italic">
            "{getMotivationalPhrase(module.category, language)}"
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="h-1 w-full bg-gradient-to-r from-coin-purple via-coin-orange to-coin-pink"></div>
        
        {completed && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <span>✓</span>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
