
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { reels, modules } from "@/data/mockData";
import { ArrowRight, BookOpen, Shield, ThumbsUp, Clock, TrendingUp, CheckCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("learn");
  
  // Featured reels - take first 3
  const featuredReels = reels.slice(0, 3);
  
  // Featured modules - take first 2
  const featuredModules = modules.slice(0, 2);
  
  // Daily tasks - hardcoded for now
  const dailyTasks = [
    { id: 'task1', description: 'Complete a learning module', completed: true, points: 15 },
    { id: 'task2', description: 'Watch 5 financial reels', completed: false, points: 10 },
    { id: 'task3', description: 'Play the scam detection game', completed: false, points: 20 }
  ];
  
  // Daily tips - hardcoded for now
  const dailyTips = [
    "Save ₹10 each day in a digital piggy bank. You'll have ₹3,650 by year-end!",
    "Avoid late fees by setting up automatic bill payments through UPI.",
    "Before buying something, ask yourself if it's a 'need' or a 'want'."
  ];

  return (
    <Layout>
      <div className="container px-4 pb-20">
        {/* Welcome header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold">Namaste, {user.firstName}!</h1>
          <p className="text-muted-foreground">Let's build your financial wisdom</p>
        </div>
        
        {/* Daily stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Day streak</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold">2/3</p>
              <p className="text-xs text-muted-foreground">Tasks done</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold">{user.coins}</p>
              <p className="text-xs text-muted-foreground">Coins earned</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Feature tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="play">Play & Earn</TabsTrigger>
            <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          </TabsList>
          
          {/* Learn tab */}
          <TabsContent value="learn" className="py-4">
            <h3 className="font-medium mb-3">Today's Learning Modules</h3>
            <div className="space-y-3">
              {featuredModules.map(module => (
                <Card key={module.id} className="overflow-hidden">
                  <div className="flex items-center">
                    <div className="p-4 flex-1">
                      <div className="flex justify-between mb-1">
                        <Badge variant="outline">{module.category}</Badge>
                        <Badge className={
                          module.difficulty === "beginner" ? "bg-green-500" :
                          module.difficulty === "intermediate" ? "bg-yellow-500" :
                          "bg-red-500"
                        }>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{module.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>{module.content.length} lessons</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => navigate("/learn")}
                        >
                          Start <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-end mt-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/learn")}>
                See All Learning Modules
              </Button>
            </div>
          </TabsContent>
          
          {/* Play tab */}
          <TabsContent value="play" className="py-4">
            <Card className="mb-4 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
              <CardContent className="p-4 flex items-center">
                <Shield className="h-12 w-12 text-primary mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Scam Detection Challenge</h3>
                  <p className="text-sm mb-2">Learn to spot financial scams and frauds</p>
                  <Button onClick={() => navigate("/scam-game")}>
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-500/20 to-blue-500/10 border-blue-500/30">
              <CardContent className="p-4 flex items-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Investment Simulator</h3>
                  <p className="text-sm mb-2">Practice investing with virtual money</p>
                  <Button variant="secondary">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tasks tab */}
          <TabsContent value="tasks" className="py-4">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Daily Tasks</CardTitle>
                <CardDescription>Complete tasks to earn coins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        task.completed 
                          ? "bg-primary border-primary" 
                          : "border-muted-foreground"
                      }`}>
                        {task.completed && (
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                      <span className={`ml-3 text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.description}
                      </span>
                    </div>
                    <Badge variant="outline">+{task.points} coins</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Daily Financial Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-l-4 border-primary pl-3 py-1 italic text-sm">
                  {dailyTips[0]}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Financial reels */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">Financial Reels</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/learn")}>
            See all
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredReels.map(reel => (
            <Card key={reel.id} className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <p className="text-xl px-4 text-center font-medium">{reel.title}</p>
              </div>
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{reel.content}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {reel.likes}
                    </span>
                  </div>
                  <Badge variant="outline">{reel.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
