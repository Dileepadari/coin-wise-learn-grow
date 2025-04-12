
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Gamepad2, Wallet, TrendingUp, ShieldAlert, Map, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

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
          description: "Make financial decisions and see how they affect your virtual life over time",
          status: "available",
          color: "from-blue-500/20 to-blue-500/10 border-blue-500/30"
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
          description: "Create a budget and face unexpected challenges while trying to stick to it",
          status: "coming-soon",
          color: "from-green-500/20 to-green-500/10 border-green-500/30"
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
          description: "Invest virtual money in stocks and mutual funds to learn market principles",
          status: "coming-soon",
          color: "from-amber-500/20 to-amber-500/10 border-amber-500/30"
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
          description: "Identify scams and fraudulent messages in this interactive challenge",
          status: "available",
          color: "from-red-500/20 to-red-500/10 border-red-500/30"
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
    } else if (gameId === "life-sim") {
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
      description: "Can help with investment advice"
    },
    {
      id: "npc2",
      name: "Neha",
      role: "Bank Manager",
      description: "Assists with loans and savings"
    },
    {
      id: "npc3",
      name: "Vikram",
      role: "Insurance Agent",
      description: "Explains insurance policies"
    }
  ];
  
  const handleSendRequest = (npcId: string) => {
    toast("Request sent!", {
      description: "The character will assist you in your next game session"
    });
  };

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Financial Games</h1>
          <p className="text-muted-foreground">Learn finance through interactive gameplay</p>
        </div>
        
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
                    <Card key={game.id} className={`bg-gradient-to-r ${game.color}`}>
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
                        <Button 
                          onClick={() => handlePlayGame(game.id)}
                          variant={game.status === "available" ? "default" : "secondary"}
                        >
                          {game.status === "available" ? "Start Game" : "Notify Me"}
                        </Button>
                      </CardContent>
                    </Card>
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
                
                <div className="w-40 h-40 bg-black/80 rounded-md flex items-center justify-center">
                  <div className="text-white text-xs">City Map</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                <p className="text-sm mb-1 font-medium">Current Task:</p>
                <p className="text-sm">You just received your salary for this month. Your mom asked you to get groceries. Use your money wisely to complete this task.</p>
                
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="outline" className="mr-2">Skip</Button>
                  <Button size="sm">Start</Button>
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
                  <div key={npc.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl">
                        👤
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
                  </div>
                ))}
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
