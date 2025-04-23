
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check } from "lucide-react";
import { modules } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { Character } from "@/components/ui/character-dialog";
import { motion } from "framer-motion";
import { translate } from "@/utils/translate";
import { getCelebrityGuide } from "@/utils/utils"; // <-- this import is now used below

export default function Learn() {
  const { user, language } = useAppContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    // Show a random tip after page loads
    const timer = setTimeout(() => {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 6000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Celebrity guiding the user
  const currentCelebrity = getCelebrityGuide("savings"); // pick as per your context or randomize if you want

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
  
  const getTipForLanguage = () => {
    const tips = {
      english: "Completing all modules in a category unlocks a special badge!",
      hindi: "एक श्रेणी के सभी मॉड्यूल पूरे करने से एक विशेष बैज मिलता है!",
      telugu: "ఒక వర్గంలోని అన్ని మాడ్యూల్‌లను పూర్తి చేయడం ద్వారా ప్రత్యేక బ్యాడ్జ్‌ని అన్‌లాక్ చేస్తుంది!"
    };
    
    return tips[language];
  };

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {translate('learn', language)} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              {" "}{translate('wantToEarn', language)}
            </span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {modules.length} {translate('lessons', language)} • {user.completedModules.length} {translate('complete', language)}
          </motion.p>
        </div>
        
        {showTip && (
          <div className="mb-6">
            <Character
              name={currentCelebrity.name}
              avatar={currentCelebrity.avatar || "✨"}
              dialog={currentCelebrity.quote || "Seekh kar hi jeet hai, dosto~"}
              emotion="excited"
              category="savings"
            />
          </div>
        )}

        {/* Category filter */}
        <motion.div 
          className="flex gap-2 pb-6 overflow-x-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1"
            onClick={() => handleCategoryFilter(null)}
          >
            {language === 'english' ? 'All' : language === 'hindi' ? 'सभी' : 'అన్నీ'}
          </Badge>
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Badge 
                variant={selectedCategory === category ? "default" : "outline"} 
                className="cursor-pointer px-3 py-1"
                onClick={() => handleCategoryFilter(category)}
              >
                {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Chapters list */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCategories.map((category, index) => {
            const progress = getCategoryProgress(category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewChapter(category)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <motion.div 
                          className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-2xl"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {getCategoryIcon(category)}
                        </motion.div>
                        <div>
                          <CardTitle className="capitalize">{category}</CardTitle>
                          <CardDescription>
                            {progress.completed} {language === 'english' ? 'of' : language === 'hindi' ? 'में से' : 'నుండి'} {progress.total} {
                              language === 'english' 
                                ? 'modules completed' 
                                : language === 'hindi' 
                                  ? 'मॉड्यूल पूरे किए' 
                                  : 'మాడ్యూల్స్ పూర్తి'
                            }
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
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      ></motion.div>
                    </div>
                    
                    {/* Module list preview */}
                    <div className="mt-4 space-y-1">
                      {modules
                        .filter(module => module.category === category)
                        .slice(0, 3)
                        .map((module, moduleIndex) => {
                          const isCompleted = user.progress.some(p => p.moduleId === module.id && p.completed);
                          
                          return (
                            <motion.div 
                              key={module.id} 
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + moduleIndex * 0.1 }}
                            >
                              {isCompleted ? (
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                              )}
                              <span className={`text-sm ${isCompleted ? 'text-green-700' : ''}`}>
                                {module.name}
                              </span>
                            </motion.div>
                          );
                        })}
                      
                      {modules.filter(module => module.category === category).length > 3 && (
                        <motion.div 
                          className="text-xs text-muted-foreground pl-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          + {modules.filter(module => module.category === category).length - 3} {
                            language === 'english' 
                              ? 'more modules' 
                              : language === 'hindi' 
                                ? 'और मॉड्यूल' 
                                : 'మరిన్ని మాడ్యూల్స్'
                          }
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
