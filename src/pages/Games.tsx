import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Gamepad2, 
  Wallet, 
  TrendingUp, 
  ShieldAlert, 
  Map, 
  User, 
  Trophy, 
  ArrowRight, 
  Home as HomeIcon, 
  Building as BuildingIcon, 
  Store as StoreIcon, 
  Briefcase as BriefcaseIcon 
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function Games() {
  const navigate = useNavigate();
  const { addCoins } = useAppContext();
  const [activeTab, setActiveTab] = useState("simulation");
  
  const gameCategories = [
    {
      id: "simulation",
      label: "Life Sim",
      description: "Try out life decisions in a virtual world!",
      icon: <Gamepad2 className="h-12 w-12 text-blue-500" />,
      games: [
        {
          id: "life-sim",
          title: "Life Simulator",
          description: "Make choices, earn money, and see how life plays out. It's like real life, but way more fun!",
          status: "available",
          color: "from-blue-500/20 to-blue-500/10 border-blue-500/30",
          features: ["Chat with characters", "Build skills", "Go shopping", "Plan budgets"]
        }
      ]
    },
    {
      id: "budgeting",
      label: "Budgeting",
      description: "Master the art of budgeting like a pro!",
      icon: <Wallet className="h-12 w-12 text-green-500" />,
      games: [
        {
          id: "budget-master",
          title: "Budget Master",
          description: "Create a budget, tackle surprises, and learn to save. It's budgeting, but make it fun!",
          status: "available",
          color: "from-green-500/20 to-green-500/10 border-green-500/30",
          features: ["Make budgets", "Handle emergencies", "Track spending", "Get tips"]
        }
      ]
    },
    {
      id: "investment",
      label: "Investing",
      description: "Grow your money and learn the ropes of investing!",
      icon: <TrendingUp className="h-12 w-12 text-amber-500" />,
      games: [
        {
          id: "market-guru",
          title: "Market Guru",
          description: "Play the stock market, invest in funds, and see if you can grow your portfolio!",
          status: "available",
          color: "from-amber-500/20 to-amber-500/10 border-amber-500/30",
          features: ["Stock market sim", "Track investments", "Manage risks", "Analyze portfolios"]
        }
      ]
    },
    {
      id: "scam-detection",
      label: "Scam Spotting",
      description: "Learn to spot scams and stay safe!",
      icon: <ShieldAlert className="h-12 w-12 text-red-500" />,
      games: [
        {
          id: "scam-alert",
          title: "Scam Alert",
          description: "Spot scams and learn how to avoid them. Stay sharp and protect yourself!",
          status: "available",
          color: "from-red-500/20 to-red-500/10 border-red-500/30",
          features: ["Interactive challenges", "Mentor guidance", "Earn streak rewards", "Build skills"]
        }
      ]
    }
  ];
  
  const handlePlayGame = (gameId: string) => {
    if (gameId === "scam-alert") {
      navigate("/scam-game");
      addCoins(5);
      toast("Game on! +5 coins 🎮");
    } else if (gameId === "life-sim" || gameId === "budget-master" || gameId === "market-guru") {
      navigate("/financial-sim");
      addCoins(5);
      toast("Game on! +5 coins 🎮");
    } else {
      toast("Coming Soon 🚧", {
        description: "This one's still cooking. Check back later!"
      });
    }
  };
  
  const npcs = [
    {
      id: "npc1",
      name: "Ravi",
      role: "Money Guru",
      description: "Knows all about investments!",
      avatar: "👨‍💼"
    },
    {
      id: "npc2",
      name: "Neha",
      role: "Bank Boss",
      description: "Loans, savings, you name it!",
      avatar: "👩‍💼"
    },
    {
      id: "npc3",
      name: "Vikram",
      role: "Insurance Wiz",
      description: "Got questions about insurance? He's your guy!",
      avatar: "👨‍🏫"
    }
  ];
  
  const handleSendRequest = (npcId: string) => {
    toast("Your buddy is on the way!", {
      description: "They'll help you out in your next game session."
    });
  };
  
  const achievements = [
    {
      title: "Budget Boss",
      description: "Survive a month without overspending. Easy, right?",
      progress: 75,
      icon: <Wallet className="h-5 w-5" />
    },
    {
      title: "Scam Spotter",
      description: "Catch 10 scams in a row. Stay sharp!",
      progress: 40,
      icon: <ShieldAlert className="h-5 w-5" />
    },
    {
      title: "Investment Pro",
      description: "Get a 20% return on your investments. Cha-ching!",
      progress: 60,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];
  
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
          <h1 className="text-2xl font-bold">Fun Financial Games</h1>
          <p className="text-muted-foreground">Learn money stuff while having a blast!</p>
        </div>
        
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
        
        <div className="bg-muted/30 p-4 rounded-lg mt-6">
          <h3 className="font-medium mb-2">Why Play Financial Games?</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Learn money stuff without the boring lectures</li>
            <li>Make decisions without real-world consequences</li>
            <li>Build smart habits while having fun</li>
            <li>Earn coins and show off your badges</li>
            <li>Challenge your friends and learn together</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
