
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Gamepad2, Wallet, TrendingUp, ShieldAlert, Map, User, Trophy, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function Games() {
  const navigate = useNavigate();
  const { addCoins } = useApp();
  const [activeTab, setActiveTab] = useState("simulation");
  
  const gameCategories = [
    {
      id: "simulation",
      label: "Life Simulation",
      description: "Experience financial decisions in a virtual life",
      icon: <Gamepad2 className="h-12 w-12 text-blue-500" />,
      games: [
        {
          id: "life-sim",
          title: "Financial Life Simulator",
          description: "Make financial decisions and see how they affect your virtual life over time. Interact with characters, earn money, and build financial skills.",
          status: "available",
          color: "from-blue-500/20 to-blue-500/10 border-blue-500/30",
          features: ["Character conversations", "Skill building", "Shopping system", "Budget planning"]
        }
      ]
    },
    {
      id: "budgeting",
      label: "Budgeting",
      description: "Practice creating and sticking to budgets",
      icon: <Wallet className="h-12 w-12 text-green-500" />,
      games: [
        {
          id: "budget-master",
          title: "Budget Master",
          description: "Create a budget and face unexpected challenges while trying to stick to it. Learn to prioritize spending and save for emergencies.",
          status: "available",
          color: "from-green-500/20 to-green-500/10 border-green-500/30",
          features: ["Budget creation", "Emergency events", "Spending tracking", "Financial tips"]
        }
      ]
    },
    {
      id: "investment",
      label: "Investment",
      description: "Learn how to grow your money through investments",
      icon: <TrendingUp className="h-12 w-12 text-amber-500" />,
      games: [
        {
          id: "market-guru",
          title: "Market Guru",
          description: "Invest virtual money in stocks and mutual funds to learn market principles. Watch your portfolio grow or shrink based on your decisions.",
          status: "available",
          color: "from-amber-500/20 to-amber-500/10 border-amber-500/30",
          features: ["Stock market simulation", "Investment tracking", "Risk management", "Portfolio analysis"]
        }
      ]
    },
    {
      id: "scam-detection",
      label: "Scam Detection",
      description: "Learn to identify financial scams and frauds",
      icon: <ShieldAlert className="h-12 w-12 text-red-500" />,
      games: [
        {
          id: "scam-alert",
          title: "Scam Alert Challenge",
          description: "Identify scams and fraudulent messages in this interactive challenge. Learn what tricks scammers use and how to protect yourself.",
          status: "available",
          color: "from-red-500/20 to-red-500/10 border-red-500/30",
          features: ["Interactive challenges", "Character mentor", "Streak rewards", "Skill development"]
        }
      ]
    }
  ];
  
  const handlePlayGame = (gameId: string) => {
    if (gameId === "scam-alert") {
      navigate("/scam-game");
      addCoins(5);
      toast("Game started! +5 coins", {
        icon: "🎮"
      });
    } else if (gameId === "life-sim" || gameId === "budget-master" || gameId === "market-guru") {
      navigate("/financial-sim");
      addCoins(5);
      toast("Game started! +5 coins", {
        icon: "🎮"
      });
    } else {
      toast("Coming Soon", {
        description: "This game is still under development. Check back later!"
      });
    }
  };
  
  const npcs = [
    {
      id: "npc1",
      name: "Ravi",
      role: "Financial Advisor",
      description: "Can help with investment advice",
      avatar: "👨‍💼"
    },
    {
      id: "npc2",
      name: "Neha",
      role: "Bank Manager",
      description: "Assists with loans and savings",
      avatar: "👩‍💼"
    },
    {
      id: "npc3",
      name: "Vikram",
      role: "Insurance Agent",
      description: "Explains insurance policies",
      avatar: "👨‍🏫"
    }
  ];
  
  const handleSendRequest = (npcId: string) => {
    toast("Character will join your game!", {
      description: "The character will assist you in your next game session"
    });
  };
  
  // Featured achievements that can be earned in games
  const achievements = [
    {
      title: "Budget Master",
      description: "Complete a month without overspending",
      progress: 75,
      icon: <Wallet className="h-5 w-5" />
    },
    {
      title: "Scam Detector",
      description: "Identify 10 scams correctly in a row",
      progress: 40,
      icon: <ShieldAlert className="h-5 w-5" />
    },
    {
      title: "Smart Investor",
      description: "Earn 20% return on investments",
      progress: 60,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];
  
  // Show a random achievement animation occasionally
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(achievements[0]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
      setCurrentAchievement(randomAchievement);
      setShowAchievement(true);
      
      setTimeout(() => setShowAchievement(false), 4000);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Financial Games</h1>
          <p className="text-muted-foreground">Learn finance through interactive gameplay</p>
        </div>
        
        {/* Achievement notification */}
        {showAchievement && (
          <motion.div
            className="fixed top-24 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-3"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/20 p-2 rounded-full">
              <Trophy className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <div className="font-medium">{currentAchievement.title}</div>
              <div className="text-sm text-gray-300">{currentAchievement.description}</div>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-1">
                <div 
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${currentAchievement.progress}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-4">
            {gameCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {gameCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="py-4">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {category.icon}
                  <div>
                    <h2 className="font-bold text-lg">{category.label}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {category.games.map(game => (
                    <motion.div 
                      key={game.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className={`bg-gradient-to-r ${game.color}`}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{game.title}</CardTitle>
                            <Badge variant={game.status === "available" ? "default" : "outline"}>
                              {game.status === "available" ? "Play Now" : "Coming Soon"}
                            </Badge>
                          </div>
                          <CardDescription>{game.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {game.features && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {game.features.map(feature => (
                                <Badge key={feature} variant="secondary" className="bg-background/50">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <Button 
                            onClick={() => handlePlayGame(game.id)}
                            variant={game.status === "available" ? "default" : "secondary"}
                            className="w-full"
                          >
                            {game.status === "available" ? "Start Game" : "Notify Me"}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Game Map - only shown in simulation tab */}
        {activeTab === "simulation" && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Map className="h-5 w-5 mr-2" />
                <CardTitle>Game World</CardTitle>
              </div>
              <CardDescription>Navigate the financial world and complete tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted aspect-square rounded-md relative flex items-center justify-center">
                <div className="absolute top-5 right-5 font-bold text-xl">N</div>
                <div className="absolute bottom-5 right-5 font-bold text-xl">E</div>
                <div className="absolute bottom-5 left-5 font-bold text-xl">S</div>
                <div className="absolute top-5 left-5 font-bold text-xl">W</div>
                
                {/* City Map with locations */}
                <div className="w-80 h-80 bg-black/80 rounded-md flex items-center justify-center relative">
                  {/* Home location */}
                  <motion.div 
                    className="absolute bg-blue-500/70 w-16 h-16 rounded-md flex items-center justify-center flex-col"
                    style={{ top: '20%', left: '30%' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Home className="h-6 w-6 text-white" />
                    <span className="text-xs text-white">Home</span>
                  </motion.div>
                  
                  {/* Bank location */}
                  <motion.div 
                    className="absolute bg-green-500/70 w-16 h-16 rounded-md flex items-center justify-center flex-col"
                    style={{ top: '30%', right: '20%' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Building className="h-6 w-6 text-white" />
                    <span className="text-xs text-white">Bank</span>
                  </motion.div>
                  
                  {/* Store location */}
                  <motion.div 
                    className="absolute bg-red-500/70 w-16 h-16 rounded-md flex items-center justify-center flex-col"
                    style={{ bottom: '20%', left: '25%' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Store className="h-6 w-6 text-white" />
                    <span className="text-xs text-white">Store</span>
                  </motion.div>
                  
                  {/* Office location */}
                  <motion.div 
                    className="absolute bg-amber-500/70 w-16 h-16 rounded-md flex items-center justify-center flex-col"
                    style={{ bottom: '30%', right: '25%' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Briefcase className="h-6 w-6 text-white" />
                    <span className="text-xs text-white">Work</span>
                  </motion.div>
                  
                  {/* Player marker */}
                  <motion.div 
                    className="absolute bg-primary w-8 h-8 rounded-full border-4 border-white flex items-center justify-center"
                    style={{ top: '50%', left: '50%' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      borderColor: ['rgba(255,255,255,1)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,1)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User className="h-4 w-4 text-white" />
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                <p className="text-sm mb-1 font-medium">Current Task:</p>
                <p className="text-sm">You just received your salary for this month. Your mom asked you to get groceries. Use your money wisely to complete this task.</p>
                
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => toast("Task skipped. New task will be assigned in the game.")}
                  >
                    Skip
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handlePlayGame("life-sim")}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Game Characters - only shown in simulation tab */}
        {activeTab === "simulation" && (
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <CardTitle>Game Characters</CardTitle>
              </div>
              <CardDescription>These characters can help you in the financial world</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {npcs.map(npc => (
                  <motion.div
                    key={npc.id} 
                    className="flex items-center justify-between p-3 border rounded-md"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl">
                        {npc.avatar}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{npc.name}</h4>
                        <p className="text-xs text-muted-foreground">{npc.role} - {npc.description}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendRequest(npc.id)}
                    >
                      Request Help
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-primary/10 rounded-md">
                <h4 className="font-medium text-sm mb-1 flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-primary" />
                  Game Achievements
                </h4>
                <p className="text-xs text-muted-foreground mb-2">Complete these challenges to earn rewards</p>
                
                <div className="space-y-2">
                  {achievements.map(achievement => (
                    <div key={achievement.title} className="flex items-center">
                      <div className="bg-muted p-1 rounded mr-2">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium">{achievement.title}</div>
                        <div className="w-full bg-muted h-1.5 rounded-full">
                          <div 
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs font-medium">{achievement.progress}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="bg-muted/30 p-4 rounded-lg mt-6">
          <h3 className="font-medium mb-2">Why Play Financial Games?</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Learn financial concepts in a fun, risk-free environment</li>
            <li>Practice making financial decisions without real-world consequences</li>
            <li>Develop smart money habits through gameplay</li>
            <li>Earn coins and badges while improving your financial knowledge</li>
            <li>Compete with friends and learn together</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
