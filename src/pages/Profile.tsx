
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAppContext } from "@/context/AppContext";
import { Character } from "@/components/ui/character-dialog";
import { getCelebrityGuide } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bell, BookOpen, Edit, LogOut, Settings, Trophy, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout } = useAppContext();
  const celeb = getCelebrityGuide(user.preferredCategories?.[0] || "basics");
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate stats
  const totalModulesCompleted = user.completedModules.length;
  const totalBadgesEarned = user.badges.length;
  const totalCoinsEarned = user.coins;
  const streakDays = user.streak || 0;

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <Character
            name={celeb.name}
            avatar={celeb.avatar || "👑"}
            dialog={`Arrey ${user.name}, tumhare financial safar mein ${celeb.name} sath hai! Champion banne ke liye progress barte raho!`}
            category={user.preferredCategories?.[0] || "basics"}
            emotion="excited"
          />
          
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full md:w-1/3"
            >
              <div className="rounded-xl overflow-hidden bg-gradient-to-b from-white via-holi-yellow/10 to-coin-pink/10 shadow-md">
                <div className="p-5 pb-2">
                  <h2 className="text-lg font-bold text-coin-purple">Aapka Profile</h2>
                  <p className="text-xs text-muted-foreground">Apna account manage kariye</p>
                </div>
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-coin-purple">
                        <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback className="bg-gradient-to-r from-coin-purple to-coin-pink text-white text-xl">
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full bg-background">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h2 className="text-xl font-bold mt-4">{user.name || "User"}</h2>
                    <p className="text-muted-foreground text-sm">{user.email || "user@example.com"}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="bg-gradient-to-r from-coin-yellow/30 to-coin-yellow/10 text-coin-purple border-0">Level {user.level || 1}</Badge>
                      <Badge variant="outline" className="bg-gradient-to-r from-coin-pink/30 to-coin-pink/10 text-coin-purple border-0">{streakDays} Din Streak 🔥</Badge>
                    </div>
                    
                    <div className="w-full mt-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Level {(user.level || 1) + 1} tak ka progress</span>
                        <span>{user.xp || 0}/100 XP</span>
                      </div>
                      <div className="bg-white/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${user.xp || 0}%` }}
                          className="h-full bg-gradient-to-r from-coin-purple to-coin-pink rounded-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center">
                      <div className="bg-gradient-to-b from-white to-coin-purple/10 p-3 rounded-xl shadow-sm">
                        <div className="text-xl font-bold text-coin-purple">{totalCoinsEarned}</div>
                        <div className="text-xs text-muted-foreground">Coins</div>
                      </div>
                      <div className="bg-gradient-to-b from-white to-holi-green/10 p-3 rounded-xl shadow-sm">
                        <div className="text-xl font-bold text-holi-green">{totalModulesCompleted}</div>
                        <div className="text-xs text-muted-foreground">Modules</div>
                      </div>
                      <div className="bg-gradient-to-b from-white to-holi-yellow/10 p-3 rounded-xl shadow-sm">
                        <div className="text-xl font-bold text-holi-yellow">{totalBadgesEarned}</div>
                        <div className="text-xs text-muted-foreground">Badges</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-6 w-full">
                      <Button variant="outline" className="flex-1 bg-gradient-to-r from-white to-coin-yellow/10 rounded-xl border-0 shadow-sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 bg-gradient-to-r from-white to-coin-pink/10 rounded-xl border-0 shadow-sm" 
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4 bg-gradient-to-r from-coin-yellow/30 to-coin-pink/30 rounded-xl p-1">
                  <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white">Overview</TabsTrigger>
                  <TabsTrigger value="badges" className="rounded-lg data-[state=active]:bg-white">Badges</TabsTrigger>
                  <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-white">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="rounded-xl overflow-hidden bg-gradient-to-b from-white via-coin-blue/5 to-coin-blue/10 shadow-md">
                    <div className="p-5 pb-2">
                      <h3 className="text-lg font-bold text-coin-purple">Learning Progress</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {['savings', 'investment', 'fraud', 'borrowing', 'basics'].map((category) => {
                          const progress = Math.floor(Math.random() * 100);
                          return (
                            <div key={category} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{category}</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="bg-white/50 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ delay: 0.2 }}
                                  className={`h-full rounded-full ${
                                    category === 'savings' ? 'bg-holi-green' :
                                    category === 'investment' ? 'bg-coin-blue' :
                                    category === 'fraud' ? 'bg-coin-pink' :
                                    category === 'borrowing' ? 'bg-holi-yellow' :
                                    'bg-coin-purple'
                                  }`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden bg-gradient-to-b from-white via-coin-purple/5 to-coin-purple/10 shadow-md">
                    <div className="p-5 pb-2">
                      <h3 className="text-lg font-bold text-coin-purple">Aap Ki Recent Activity</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {[
                          { icon: BookOpen, text: "'Saving Basics' module complete kiya", time: "2 ghante pehle" },
                          { icon: Trophy, text: "'Smart Saver' badge jeeta", time: "1 din pehle" },
                          { icon: UserIcon, text: "Profile update kiya", time: "3 din pehle" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-holi-pink/20 to-holi-yellow/20 p-2 rounded-full">
                              <item.icon className="h-4 w-4 text-coin-purple" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{item.text}</p>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="badges" className="space-y-4">
                  <div className="rounded-xl overflow-hidden bg-gradient-to-b from-white via-holi-yellow/10 to-holi-yellow/20 shadow-md">
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-coin-purple">Aapke Badges</h3>
                      <p className="text-xs text-muted-foreground">Jo achievements aapne unlock kiye hai</p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { name: "Smart Saver", icon: "💰", color: "bg-gradient-to-b from-white to-green-100" },
                          { name: "Scam Detector", icon: "🛡️", color: "bg-gradient-to-b from-white to-red-100" },
                          { name: "Investment Guru", icon: "📈", color: "bg-gradient-to-b from-white to-blue-100" },
                          { name: "Budget Master", icon: "📊", color: "bg-gradient-to-b from-white to-purple-100" },
                          { name: "7 Din Streak", icon: "🔥", color: "bg-gradient-to-b from-white to-orange-100" },
                          { name: "Quiz Champion", icon: "🏆", color: "bg-gradient-to-b from-white to-yellow-100" },
                        ].map((badge, i) => (
                          <motion.div
                            key={i}
                            className={`aspect-square border-0 rounded-xl flex flex-col items-center justify-center p-2 shadow-sm ${badge.color}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-3xl mb-2">{badge.icon}</span>
                            <span className="text-xs font-medium text-center">{badge.name}</span>
                          </motion.div>
                        ))}
                        
                        {/* Locked badges */}
                        {[
                          { name: "Finance Expert", icon: "🧠", color: "bg-gradient-to-b from-white to-gray-100" },
                          { name: "Community Leader", icon: "👑", color: "bg-gradient-to-b from-white to-gray-100" },
                        ].map((badge, i) => (
                          <motion.div
                            key={i}
                            className={`aspect-square border-0 rounded-xl flex flex-col items-center justify-center p-2 shadow-sm ${badge.color} opacity-50`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-3xl mb-2">🔒</span>
                            <span className="text-xs font-medium text-center">{badge.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <div className="rounded-xl overflow-hidden bg-gradient-to-b from-white via-coin-pink/5 to-coin-pink/10 shadow-md">
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-coin-purple">Activity Feed</h3>
                      <p className="text-xs text-muted-foreground">Aapki recent activities aur achievements</p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-6">
                        {[
                          { 
                            icon: BookOpen, 
                            title: "Module Complete Kiya", 
                            description: "Aapne 'Understanding Interest Rates' seekha",
                            time: "Aaj, 10:30 AM",
                            reward: "+15 coins"
                          },
                          { 
                            icon: Trophy, 
                            title: "Badge Jeeta", 
                            description: "Aapne 'Smart Saver' badge unlock kiya",
                            time: "Kal, 3:45 PM",
                            reward: "+25 coins"
                          },
                          { 
                            icon: Bell, 
                            title: "Daily Streak", 
                            description: "Aapne 7 dino se continuously app use kiya!",
                            time: "Kal, 9:15 AM",
                            reward: "+5 coins"
                          },
                        ].map((activity, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="mt-1">
                              <div className="bg-gradient-to-r from-coin-purple/20 to-holi-pink/20 p-2 rounded-full">
                                <activity.icon className="h-5 w-5 text-coin-purple" />
                              </div>
                            </div>
                            <div className="flex-1 border-b border-muted/30 pb-4">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{activity.title}</h4>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                              {activity.reward && (
                                <Badge variant="outline" className="mt-2 bg-gradient-to-r from-holi-yellow/30 to-holi-yellow/10 border-0">
                                  {activity.reward}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
