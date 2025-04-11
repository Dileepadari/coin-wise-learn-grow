
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { badges, reels, modules } from "@/data/mockData";
import { Award, Coins, Clock, ArrowUpRight, LockIcon, CheckCircle, TrendingUp, BookOpen, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  
  const userBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);
  
  const userLikedContent = reels.filter(reel => user.likedContent.includes(reel.id));
  const userSavedContent = reels.filter(reel => user.savedContent.includes(reel.id));
  
  // Daily tasks - moved from Home page
  const dailyTasks = [
    { id: 'task1', description: 'Complete a learning module', completed: true, points: 15 },
    { id: 'task2', description: 'Watch 5 financial reels', completed: false, points: 10 },
    { id: 'task3', description: 'Play the scam detection game', completed: false, points: 20 }
  ];
  
  // Daily tips - moved from Home page
  const dailyTips = [
    "Save ₹10 each day in a digital piggy bank. You'll have ₹3,650 by year-end!",
    "Avoid late fees by setting up automatic bill payments through UPI.",
    "Before buying something, ask yourself if it's a 'need' or a 'want'."
  ];

  // Featured modules - take first 2
  const featuredModules = modules.slice(0, 2);

  return (
    <Layout>
      <div className="container px-4 pb-20">
        {/* Profile header */}
        <div className="py-6 flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarFallback className="text-xl bg-primary/20 text-primary">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-muted-foreground">{user.phoneNumber}</p>
          
          <div className="flex items-center mt-2 gap-2">
            <div className="flex items-center">
              <Coins className="h-4 w-4 mr-1 text-amber-500" />
              <span className="font-medium">{user.coins}</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-primary" />
              <span>{userBadges.length} badges</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="mt-4">
            Edit Profile
          </Button>
        </div>
        
        {/* Daily stats - moved from Home page */}
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
        
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="py-4">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Progress</CardTitle>
                <CardDescription>Your financial education journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Savings Basics</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Scam Detection</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Investment Fundamentals</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Activity Summary</CardTitle>
                <CardDescription>Your recent activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Earned "Savings Starter" badge</p>
                        <p className="text-xs text-muted-foreground">Completed first savings module</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2d ago</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <Coins className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Earned 45 coins</p>
                        <p className="text-xs text-muted-foreground">Completed "Daily Saving" quiz</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">3d ago</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Learning streak: 5 days</p>
                        <p className="text-xs text-muted-foreground">Keep going to increase your streak</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Badges tab */}
          <TabsContent value="badges" className="py-4">
            <h3 className="font-medium mb-3">Earned Badges</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {userBadges.map(badge => (
                <Card key={badge.id} className="flex items-center p-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl">
                    {badge.image}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <h3 className="font-medium mb-3">Badges to Earn</h3>
            <div className="grid grid-cols-2 gap-4">
              {lockedBadges.map(badge => (
                <Card key={badge.id} className="flex items-center p-3 opacity-70">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center relative">
                    <LockIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Saved content tab */}
          <TabsContent value="saved" className="py-4">
            <Tabs defaultValue="liked" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="liked">Liked</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="liked">
                <div className="space-y-4">
                  {userLikedContent.map(content => (
                    <Card key={content.id} className="p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge>{content.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{content.content}</p>
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <span className="text-muted-foreground">{content.likes} likes</span>
                        <Button variant="ghost" size="sm" className="text-xs flex items-center">
                          View <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <div className="space-y-4">
                  {userSavedContent.map(content => (
                    <Card key={content.id} className="p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge>{content.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{content.content}</p>
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <span className="text-muted-foreground">{content.saves} saves</span>
                        <Button variant="ghost" size="sm" className="text-xs flex items-center">
                          View <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          {/* Tasks tab - moved from Home page */}
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
            
            <h3 className="font-medium mb-3 mt-6">Today's Learning Modules</h3>
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
                          Start <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
