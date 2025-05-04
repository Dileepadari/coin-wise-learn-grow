import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProgressCircle from "@/components/ui/ProgressCircle";
import { 
  User, Award, Heart, Bookmark, Book, Trophy, 
  Star, BadgePlus, BadgeCheck, ArrowUp,
  Calendar, Clock, History, Gift, Users,
  Wallet, BarChart2, Share2, FileText,
  Sparkle, PartyPopper, Target, Smile, Rocket, Settings, Lock, Globe, HelpCircle, LogOut,
} from "lucide-react";
import { LevelUp, GamepadIcon, BadgeIcon, Rupee, AnimatedIcon, Confetti } from "@/components/ui/custom-icons";
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useIsMobile } from '@/hooks/use-mobile';
import { fadeInUp, bounceIn, popIn, floating, coinFlip, pulseEffect, bounceUpDown, tada, wiggle, jello } from '@/utils/animations';
import Layout from '@/components/layout/Layout';

const Profile = () => {
  const { user, addCoins } = useAppContext();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [presentLanguage, setPresentLanguage] = useState('हिंदी');
  const isMobile = useIsMobile();

  const setPresentLanguageHandler = (language) => {
    setIsLanguageModalOpen(false);
    setPresentLanguage(language);
    localStorage.setItem('language', language);
    toast.success(`भाषा बदल दी गई है: ${language}`, {
      description: 'Language changed successfully!',
      style: { background: 'linear-gradient(to right, #fef9c3, #fef08a)' }
    });
  }
  const handleLevelUp = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500']
    });
    toast.success('बधाई हो! आप अगले लेवल पर पहुंच गए हैं!', {
      description: 'You have reached the next level!',
      style: { background: 'linear-gradient(to right, #fef9c3, #fef08a)' }
    });
    addCoins(50);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Calculate XP needed for next level (simple formula: level * 100)
  const xpForNextLevel = user.level * 100;
  const xpProgress = user.xp ? Math.min((user.xp / xpForNextLevel) * 100, 100) : 0;

  // Group badges by category with fun colors
  const badgeCategories = {
    savings: { name: 'बचत', color: 'from-green-50 to-emerald-50 border-emerald-100', icon: '💰' },
    investment: { name: 'निवेश', color: 'from-blue-50 to-sky-50 border-sky-100', icon: '📈' },
    fraud: { name: 'धोखाधड़ी', color: 'from-red-50 to-rose-50 border-rose-100', icon: '🛡️' },
    basics: { name: 'मूलभूत', color: 'from-amber-50 to-yellow-50 border-yellow-100', icon: '📚' },
    general: { name: 'सामान्य', color: 'from-purple-50 to-fuchsia-50 border-fuchsia-100', icon: '🎯' }
  };

  // Mock badges data (in a real app, this would come from the backend)
  const userBadges = [
    { id: "badge1", name: "बचत मास्टर", icon: "💰", category: "savings", description: "आपने 5000 रुपए बचाए", earned: "2 दिन पहले" },
    { id: "badge2", name: "निवेश विशेषज्ञ", icon: "📈", category: "investment", description: "पहला निवेश पूरा किया", earned: "1 हफ्ते पहले" },
    { id: "badge3", name: "धोखाधड़ी डिटेक्टर", icon: "🛡️", category: "fraud", description: "5 धोखाधड़ी पहचानी", earned: "3 दिन पहले" },
    { id: "badge4", name: "लर्निंग चैंपियन", icon: "📚", category: "basics", description: "3 मॉड्यूल पूरे किए", earned: "2 हफ्ते पहले" },
    { id: "badge5", name: "स्ट्रीक वॉरियर", icon: "🔥", category: "general", description: "7 दिन की स्ट्रीक", earned: "आज" },
    { id: "badge6", name: "रील एक्सप्लोरर", icon: "📱", category: "general", description: "10 रील्स देखीं", earned: "कल" },
    { id: "badge7", name: "क्विज मास्टर", icon: "🧠", category: "basics", description: "5 क्विज़ में पूरे अंक", earned: "3 दिन पहले" },
    { id: "badge8", name: "शेयर गुरु", icon: "📲", category: "general", description: "3 दोस्तों को आमंत्रित किया", earned: "1 सप्ताह पहले" },
  ];
  
  // Mock data for achievements
  const achievements = [
    { id: 1, name: "पहला मॉड्यूल पूरा", icon: "📚", progress: 100, total: 100, completed: true },
    { id: 2, name: "5 दिन की स्ट्रीक", icon: "🔥", progress: user.streak || 0, total: 5, completed: (user.streak || 0) >= 5 },
    { id: 3, name: "10 रील्स देखे", icon: "📱", progress: 7, total: 10, completed: false },
    { id: 4, name: "पहला गेम जीता", icon: "🎮", progress: 0, total: 1, completed: false },
    { id: 5, name: "5 क्विज़ पूरे किए", icon: "🧩", progress: 3, total: 5, completed: false },
    { id: 6, name: "2000 रुपए बचाए", icon: "💸", progress: 1200, total: 2000, completed: false },
    { id: 7, name: "फाइनेंस कैलकुलेटर का उपयोग करें", icon: "🧮", progress: 0, total: 1, completed: false },
    { id: 8, name: "10 अधिसूचनाएँ पढ़ें", icon: "🔔", progress: 6, total: 10, completed: false },
  ];

  // Simplified activity timeline 
  const activityTimeline = [
    { id: 1, type: "module", title: "बचत मॉड्यूल पूरा किया", date: "आज", icon: <Book className="h-4 w-4 text-blue-500" /> },
    { id: 2, type: "reel", title: "EMI के बारे में रील देखी", date: "कल", icon: <FileText className="h-4 w-4 text-purple-500" /> },
    { id: 3, type: "badge", title: "नया बैज अर्जित किया", date: "2 दिन पहले", icon: <Award className="h-4 w-4 text-amber-500" /> },
    { id: 4, type: "game", title: "बजट गेम खेला", date: "3 दिन पहले", icon: <GamepadIcon className="h-4 w-4 text-green-500" /> },
    { id: 5, type: "quiz", title: "निवेश क्विज़ पास किया", date: "5 दिन पहले", icon: <FileText className="h-4 w-4 text-red-500" /> },
  ];

  // Financial activity - simplified for informal workers
  const financialActivity = {
    savings: { current: 2500, target: 5000, lastUpdated: "3 दिन पहले" },
    expenses: [
      { category: "खाना", amount: 1200, icon: "🍲" },
      { category: "यात्रा", amount: 800, icon: "🚌" },
      { category: "मनोरंजन", amount: 500, icon: "🎬" }
    ],
    goals: [
      { name: "आपातकालीन फंड", target: 10000, current: 3500, icon: "🏦" },
      { name: "मोबाइल फोन", target: 15000, current: 6000, icon: "📱" }
    ],
    income: [
      { source: "दैनिक वेतन", amount: 400, icon: "💼", frequency: "दैनिक" },
      { source: "अतिरिक्त काम", amount: 1500, icon: "🔨", frequency: "साप्ताहिक" }
    ]
  };

  // Format the date for display
  const formatDate = (dateString) => {
    return dateString || "N/A";
  };

  // Profile sections with more fun icons
  const sections = [
    { key: 'overview', label: 'प्रोफ़ाइल', icon: <User className="h-4 w-4" /> },
    { key: 'badges', label: 'बैज', icon: <BadgeIcon className="h-4 w-4" /> },
    { key: 'achievements', label: 'उपलब्धियां', icon: <Trophy className="h-4 w-4" /> },
    { key: 'activity', label: 'गतिविधियां', icon: <History className="h-4 w-4" /> },
    { key: 'finances', label: 'वित्त', icon: <Wallet className="h-4 w-4" /> },
  ];

  const renderOverviewSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="md:col-span-1"
          variants={bounceIn}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="overflow-visible bg-gradient-to-b from-white to-indigo-50 border-indigo-100">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mb-2">
                <motion.div whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}>
                  <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-400 to-purple-500 text-white">{user.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                </motion.div>
              

                <motion.div 
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md"
                  variants={floating}
                  initial="initial"
                  animate="animate"
                >
                  <LevelUp className="h-3.5 w-3.5" />
                  <span>Lv.{user.level}</span>
                </motion.div>
              </div>
              <motion.div className="text-center w-full" variants={fadeInUp}>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{user.phoneNumber}</p>
                {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
                
                <motion.div 
                  className="flex items-center justify-center gap-1.5 mt-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100">
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    <span>अनौपचारिक कामगार</span>
                  </Badge>
                </motion.div>
                <motion.div
                  className="container py-4 px-4 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Language Change Button */}
                  <div className="flex justify-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100"
                    onClick={() => setIsLanguageModalOpen(true)}
                  >
                    भाषा बदलें
                  </Button>
                  </div>

                  {/* Language Selection Modal */}
                    {isLanguageModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                      <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsLanguageModalOpen(false)}
                      >
                      ✕
                      </button>
                      <h2 className="text-lg font-semibold mb-4 text-center text-indigo-700">भाषा चुनें</h2>
                      <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100"
                        onClick={() => setPresentLanguageHandler('English')}
                      >
                        English
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100"
                        onClick={() => setPresentLanguageHandler('Hindi')}
                      >
                        हिंदी
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100"
                        onClick={() => setPresentLanguageHandler('Telugu')}
                      >
                        తెలుగు
                      </Button>
                      </div>
                    </div>
                    </div>
                    )}
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>



        <motion.div 
          className="md:col-span-2"
          variants={fadeInUp}
          custom={1}
        >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <Sparkle className="h-5 w-5 mr-2 text-blue-500" />
              </AnimatedIcon>
              बैज और अंक
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div 
                className="flex flex-col items-center justify-center text-center"
                variants={bounceUpDown}
                >
                <motion.div 
                  className="h-20 w-20 rounded-full border-2 border-primary/20 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <motion.div className="flex flex-col">
                  <BadgeIcon className="h-5 w-5 text-purple-500 mx-auto" />
                  <span className="text-lg font-bold">{userBadges.length}</span>
                  </motion.div>
                </motion.div>
                <p className="text-xs">अर्जित बैज</p>
                </motion.div>
              <motion.div 
                className="flex flex-col items-center justify-center text-center"
                variants={coinFlip}
              >
                <motion.div 
                className="h-20 w-20 rounded-full border-2 border-primary/20 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-2"
                whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                >
                <motion.div className="flex flex-col">
                  <Trophy className="h-5 w-5 text-amber-500 mx-auto" />
                  <span className="text-lg font-bold">{user.points}</span>
                </motion.div>
                </motion.div>
                <p className="text-xs">कुल अंक</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center justify-center text-center"
                variants={bounceUpDown}
              >
                <motion.div 
                className="h-20 w-20 rounded-full border-2 border-primary/20 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-2"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                <motion.div className="flex flex-col">
                  <Rupee className="h-5 w-5 text-green-500 mx-auto" />
                  <span className="text-lg font-bold">{user.coins}</span>
                </motion.div>
                </motion.div>
                <p className="text-xs">सिक्के</p>
              </motion.div>

              </div>
              
              <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">दैनिक स्ट्रीक</span>
                <motion.div whileHover={{ scale: 1.1 }}>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <span className="mr-1">🔥</span> {user.streak || 0} दिन
                </Badge>
                </motion.div>
              </div>
              
              <motion.div className="flex justify-between gap-1 mb-3">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <motion.div 
                  key={day}
                  className={`h-2 flex-1 rounded-full ${
                  (user.streak || 0) >= day ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gray-200'
                  }`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: day * 0.1 }}
                />
                ))}
              </motion.div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">मॉड्यूल पूरे किए</span>
                <span className="text-sm font-medium">{user.completedModules?.length || 0}/12</span>
              </div>
              <motion.div 
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(user.completedModules?.length || 0) * 100 / 12}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">गेम्स खेले</span>
                <span className="text-sm font-medium">{user.completedGames?.length || 0}/4</span>
              </div>
              <motion.div 
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(user.completedGames?.length || 0) * 100 / 4}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>

              <div className="flex flex-col items-center justify-center text-center mt-4">
                <ProgressCircle 
                progress={xpProgress} 
                size={80} 
                label="XP" 
                className="mb-2"
                strokeWidth={10}
                />
                <Button 
                size="sm" 
                className="w-full mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                onClick={handleLevelUp}
                disabled={xpProgress < 100}
                >
                <ArrowUp className="h-3.5 w-3.5 mr-1" />
                लेवल अप
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                {user.xp}/{xpForNextLevel} XP
                </p>
              </div>
              </div>
            </CardContent>
            </Card>
        </motion.div>
      </div>
      
      {/* Quick stats cards with animations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Award className="h-6 w-6 text-primary mb-2" />, value: userBadges.length, label: "कुल बैज", color: "from-purple-50 to-fuchsia-50" },
          { icon: <Book className="h-6 w-6 text-blue-500 mb-2" />, value: user.completedModules?.length || 0, label: "पूरे मॉड्यूल", color: "from-blue-50 to-sky-50" },
          { icon: <GamepadIcon className="h-6 w-6 text-green-500 mb-2" />, value: user.completedGames?.length || 0, label: "खेले गए गेम्स", color: "from-green-50 to-emerald-50" },
          { icon: <Calendar className="h-6 w-6 text-amber-500 mb-2" />, value: user.streak || 0, label: "दिन का स्ट्रीक", color: "from-amber-50 to-yellow-50" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={popIn}
            custom={index}
            whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
          >
            <Card className={`bg-gradient-to-r ${stat.color} border-none shadow-sm`}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <AnimatedIcon delay={index * 0.1}>
                  {stat.icon}
                </AnimatedIcon>
                <motion.p 
                  className="text-lg font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Recent activity with animation */}
      <motion.div variants={bounceIn}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <History className="h-5 w-5 mr-2 text-primary" />
              हाल की गतिविधियां
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityTimeline.slice(0, 3).map((activity, index) => (
                <motion.div 
                  key={activity.id} 
                  className="flex items-start gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {activity.icon}
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={() => setActiveSection('activity')}
            >
              सभी गतिविधियां देखें
              <ArrowUp className="h-3.5 w-3.5 ml-1 rotate-90" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div 
    className="space-y-4 mt-6"
    variants={fadeInUp}
  >
    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
      <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center">
        <Settings className="h-5 w-5 mr-2 text-gray-500" />
        सेटिंग्स
      </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="space-y-3">
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => navigate('/liked-content')}
        >
        <div className="flex items-center">
          <Heart className="h-4 w-4 mr-2 text-rose-500" />
          पसंदीदा सामग्री
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => navigate('/saved-content')}
        >
        <div className="flex items-center">
          <Bookmark className="h-4 w-4 mr-2 text-blue-500" />
          सहेजी गई सामग्री
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => navigate('/change-password')}
        >
        <div className="flex items-center">
          <Lock className="h-4 w-4 mr-2 text-yellow-500" />
          पासवर्ड बदलें
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => setIsLanguageModalOpen(true)}
        >
        <div className="flex items-center">
          <Globe className="h-4 w-4 mr-2 text-blue-500" />
          भाषा बदलें
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => navigate('/faq')}
        >
        <div className="flex items-center">
          <HelpCircle className="h-4 w-4 mr-2 text-green-500" />
          FAQ और सहायता
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => navigate('/terms')}
        >
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-purple-500" />
          नियम और शर्तें
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
        <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => {
          // Add logout logic here
          toast.success('आप लॉगआउट हो गए हैं!');
          navigate('/login');
        }}
        >
        <div className="flex items-center">
          <LogOut className="h-4 w-4 mr-2 text-red-500" />
          लॉगआउट
        </div>
        <ArrowUp className="h-4 w-4 rotate-90 text-muted-foreground" />
        </Button>
      </div>
      </CardContent>
    </Card>
  </motion.div>
    </>
  );

  const renderBadgesSection = () => (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        variants={fadeInUp}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BadgeIcon className="h-5 w-5 text-primary" /> 
          मेरे बैज
        </h2>
        <Badge variant="outline" className="flex items-center gap-1 bg-purple-50">
          <BadgePlus className="h-3.5 w-3.5" />
          <span>{userBadges.length}</span>
        </Badge>
      </motion.div>
      
      {/* Badges by category with fun animations */}
      {Object.entries(badgeCategories).map(([key, category], catIndex) => (
        <motion.div 
          key={key} 
          variants={fadeInUp} 
          custom={catIndex}
          initial="initial"
          animate="animate"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className={`overflow-visible bg-gradient-to-r ${category.color}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg flex items-center">
                <motion.span 
                  className="mr-2 text-xl"
                  variants={wiggle}
                  whileHover="hover"
                >
                  {category.icon}
                </motion.span>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userBadges
                  .filter(badge => badge.category === key)
                  .map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className={`flex items-center p-3 bg-white/70 rounded-lg shadow-sm border border-white/80`}
                      variants={popIn}
                      custom={index}
                      whileHover={{ scale: 1.05, y: -3, transition: { duration: 0.2 } }}
                    >
                      <motion.div 
                        className="h-12 w-12 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mr-3 text-xl shadow-sm"
                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                      >
                        {badge.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{badge.name}</h3>
                        <p className="text-xs">{badge.description}</p>
                        <div className="flex items-center mt-1 text-xs opacity-80">
                          <Clock className="h-3 w-3 mr-1" />
                          {badge.earned || "N/A"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                {userBadges.filter(badge => badge.category === key).length === 0 && (
                  <motion.div 
                    className="text-sm text-muted-foreground italic col-span-2 py-6 text-center bg-white/50 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Target className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    इस श्रेणी में अभी कोई बैज नहीं है
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      {/* Upcoming badges - simplified */}
      <motion.div 
        variants={bounceIn}
        initial="initial"
        animate="animate"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <Star className="h-5 w-5 mr-2 text-amber-500" />
              </AnimatedIcon>
              आगामी बैज
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center p-3 bg-white/70 rounded-lg shadow-sm"
                variants={popIn}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-3 text-xl opacity-80"
                  animate={{ 
                    rotate: [0, 5, -5, 5, 0],
                    transition: { repeat: Infinity, duration: 4 } 
                  }}
                >
                  🏆
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">10 दिन का स्ट्रीक</h3>
                  <div className="mt-2">
                    <motion.div 
                      className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden"
                    >
                      <motion.div 
                        className="h-full bg-amber-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(user.streak || 0) * 10}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </motion.div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">{user.streak || 0}/10</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        variants={fadeInUp}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          उपलब्धियां
        </h2>
        <Badge variant="outline" className="flex items-center gap-1 bg-amber-50">
          <Trophy className="h-3.5 w-3.5" />
          <span>{achievements.filter(a => a.completed).length}/{achievements.length}</span>
        </Badge>
      </motion.div>
      
      {/* Completed achievements - simplified */}
      <motion.div variants={bounceIn}>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <BadgeCheck className="h-5 w-5 mr-2 text-green-500" />
              </AnimatedIcon>
              पूरी उपलब्धियां
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.filter(a => a.completed).length > 0 ? (
                achievements.filter(a => a.completed).map((achievement, index) => (
                  <motion.div 
                    key={achievement.id} 
                    className="flex items-center p-3 bg-white/70 rounded-lg shadow-sm"
                    variants={popIn}
                    custom={index}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3"
                      whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                    >
                      <motion.span 
                        className="text-xl"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          transition: { repeat: Infinity, duration: 2 } 
                        }}
                      >
                        {achievement.icon}
                      </motion.span>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{achievement.name}</h3>
                        <BadgeCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <motion.div 
                        className="h-1.5 mt-1 bg-green-200 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="text-center py-6 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col items-center">
                    <AnimatedIcon>
                      <Trophy className="h-10 w-10 text-gray-300 mb-2" />
                    </AnimatedIcon>
                    <p>आपने अभी तक कोई उपलब्धि पूरी नहीं की है</p>
                    <p className="text-sm mt-1">कोशिश जारी रखें!</p>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* In-progress achievements - simplified */}
      <motion.div variants={fadeInUp} custom={1}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <Award className="h-5 w-5 mr-2 text-amber-500" />
              </AnimatedIcon>
              चालू उपलब्धियां
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.filter(a => !a.completed).slice(0, 3).map((achievement, index) => (
                <motion.div 
                  key={achievement.id} 
                  className="flex items-center p-3 bg-white/70 rounded-lg shadow-sm"
                  variants={popIn}
                  custom={index}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-3"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                  >
                    <span className="text-xl">{achievement.icon}</span>
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{achievement.name}</h3>
                      <span className="text-sm text-muted-foreground">{achievement.progress}/{achievement.total}</span>
                    </div>
                    <motion.div className="h-1.5 mt-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderActivitySection = () => (
    <div className="space-y-6">
      <motion.h2 
        className="text-xl font-bold flex items-center gap-2"
        variants={fadeInUp}
      >
        <History className="h-5 w-5 text-primary" />
        गतिविधियां
      </motion.h2>
      
      {/* Timeline with simplified view */}
      <motion.div variants={bounceIn}>
        <Card className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-500" />
              समयरेखा
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-8 border-l-2 border-dashed border-purple-200 space-y-6 ml-2">
              {activityTimeline.map((activity, index) => (
                <motion.div 
                  key={activity.id} 
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <motion.div 
                    className="absolute -left-10 top-0 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm"
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {activity.icon}
                  </motion.div>
                  <motion.div 
                    className={`p-4 rounded-lg ${
                      index === 0 ? 'bg-white border border-purple-100' : 'bg-white/70'
                    }`}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-sm font-medium">{activity.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liked content - simplified */}
        <motion.div 
          variants={fadeInUp} 
          custom={1}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AnimatedIcon>
                  <Heart className="h-5 w-5 text-rose-500 mr-2" />
                </AnimatedIcon>
                पसंदीदा
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.likedContent && user.likedContent.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {user.likedContent.slice(0, 2).map((contentId) => (
                    <motion.div 
                      key={contentId} 
                      className="p-3 bg-white/70 rounded-md shadow-sm"
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                      <div className="font-medium text-sm">रील #{contentId}</div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="text-center p-6 bg-white/50 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Heart className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    कोई रील पसंद नहीं
                  </p>
                </motion.div>
              )}
              <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate('/reels')}>
                और देखें
                <ArrowUp className="h-3.5 w-3.5 ml-1 rotate-90" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* In-progress modules - simplified */}
        <motion.div 
          variants={fadeInUp} 
          custom={2}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AnimatedIcon>
                  <Book className="h-5 w-5 text-green-500 mr-2" />
                </AnimatedIcon>
                मॉड्यूल
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.progress && user.progress.length > 0 ? (
                <div className="space-y-3">
                  {user.progress.slice(0, 2).map((moduleProgress) => (
                    <motion.div 
                      key={moduleProgress.moduleId} 
                      className="p-3 bg-white/70 rounded-md shadow-sm"
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    >
                      <div className="font-medium mb-1 text-sm">मॉड्यूल #{moduleProgress.moduleId}</div>
                      <motion.div className="flex items-center gap-2">
                        <motion.div className="h-1.5 bg-gray-200 flex-1 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${moduleProgress.progress}%` }}
                            transition={{ duration: 1 }}
                          />
                        </motion.div>
                        <span className="text-xs">{moduleProgress.progress}%</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="text-center p-6 bg-white/50 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Book className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    कोई मॉड्यूल नहीं
                  </p>
                </motion.div>
              )}
              <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate('/learn')}>
                मॉड्यूल देखें
                <ArrowUp className="h-3.5 w-3.5 ml-1 rotate-90" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
  
  const renderFinancesSection = () => (
    <div className="space-y-6">
      <motion.h2 
        className="text-xl font-bold flex items-center gap-2"
        variants={fadeInUp}
      >
        <Wallet className="h-5 w-5 text-primary" />
        वित्तीय प्रगति
      </motion.h2>
      
      {/* Financial overview for informal workers - simplified */}
      <motion.div variants={bounceIn}>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <Wallet className="h-5 w-5 text-green-500 mr-2" />
              </AnimatedIcon>
              आय और बचत
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Income sources - simplified */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">आय</h3>
              <div className="space-y-3">
                {financialActivity.income.map((income, index) => (
                  <motion.div 
                    key={index} 
                    className="p-3 bg-white/70 rounded-lg shadow-sm"
                    variants={popIn}
                    custom={index}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mr-3"
                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                      >
                        <span className="text-lg">{income.icon}</span>
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{income.source}</h4>
                          <div className="text-right">
                            <span className="text-sm font-bold">₹{income.amount}</span>
                            <p className="text-xs text-muted-foreground">{income.frequency}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Savings progress - simplified */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">बचत</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm">वर्तमान</span>
                <span className="font-medium">₹{financialActivity.savings.current}</span>
              </div>
              <motion.div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(financialActivity.savings.current / financialActivity.savings.target) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">लक्ष्य: ₹{financialActivity.savings.target}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium mb-1">वित्तीय लक्ष्य</h3>
              {financialActivity.goals.map((goal, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 bg-white/70 rounded-lg shadow-sm"
                  variants={popIn}
                  custom={index + 2}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mr-3"
                      whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                    >
                      <span className="text-lg">{goal.icon}</span>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{goal.name}</h4>
                        <span className="text-sm">₹{goal.current}/₹{goal.target}</span>
                      </div>
                      <motion.div className="h-1.5 bg-gray-200 mt-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/games/budget-master')}
            >
              <GamepadIcon className="h-4 w-4 mr-2" />
              बजट गेम खेलें
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Daily Income Tips Card - Specific for informal workers */}
      <motion.div 
        variants={fadeInUp}
        custom={1}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AnimatedIcon>
                <Gift className="h-5 w-5 text-amber-500 mr-2" />
              </AnimatedIcon>
              सुझाव
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="p-3 bg-white/70 rounded-lg shadow-sm mb-3"
              variants={popIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <h3 className="font-medium mb-1 text-sm flex items-center">
                <Smile className="h-4 w-4 mr-1 text-amber-500" />
                दैनिक आय का प्रबंधन
              </h3>
              <p className="text-xs">प्रतिदिन की कमाई का 20% बचत खाते में डालें</p>
            </motion.div>
            <motion.div 
              className="p-3 bg-white/70 rounded-lg shadow-sm"
              variants={popIn}
              custom={1}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <h3 className="font-medium mb-1 text-sm flex items-center">
                <Rocket className="h-4 w-4 mr-1 text-blue-500" />
                अतिरिक्त आय के अवसर
              </h3>
              <p className="text-xs">अपने कौशल का उपयोग करके अतिरिक्त काम खोजें</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  // Responsive section rendering based on desktop or mobile view
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'badges':
        return renderBadgesSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'activity':
        return renderActivitySection();
      case 'finances':
        return renderFinancesSection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <Layout>
    <motion.div
      className="container py-4 px-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile navigation - improved tab clarity */}
      {isMobile && (
        <motion.div className="mb-6" variants={fadeInUp}>
          <Tabs defaultValue="overview" value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid grid-cols-5 w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50">
              {sections.map((section, index) => (
                <TabsTrigger key={section.key} value={section.key} className="text-xs p-2">
                  <motion.div 
                    className="flex flex-col items-center gap-1"
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatedIcon delay={index * 0.1}>
                      {section.icon}
                    </AnimatedIcon>
                    <span>{section.label}</span>
                  </motion.div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
      )}
      
      {/* Desktop layout with improved spacing */}
      {!isMobile ? (
        <div className="grid grid-cols-12 gap-6">
          <motion.div 
            className="col-span-3"
            variants={fadeInUp}
            custom={0}
          >
            <Card className="sticky top-20 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="p-4">
                <div className="space-y-1 py-2">
                  {sections.map((section, index) => (
                    <motion.div 
                      key={section.key}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={activeSection === section.key ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === section.key ? "" : "text-muted-foreground"}`}
                        onClick={() => setActiveSection(section.key)}
                      >
                        <div className="flex items-center">
                          <AnimatedIcon delay={index * 0.1}>
                            {section.icon}
                          </AnimatedIcon>
                          <span className="ml-2">{section.label}</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">अगला लेवल</h3>
                    <div className="flex justify-between text-xs mb-1">
                      <span>लेवल {user.level}</span>
                      <span>लेवल {user.level + 1}</span>
                    </div>
                    <motion.div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        transition={{ duration: 1 }}
                      />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      अगले लेवल तक {xpForNextLevel - (user.xp || 0)} XP
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">स्ट्रीक</h3>
                    <div className="flex justify-between gap-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <motion.div 
                          key={day}
                          className={`h-2 flex-1 rounded-full ${
                            (user.streak || 0) >= day ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gray-200'
                          }`}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: day * 0.1 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {user.streak || 0} दिन लगातार
                    </p>
                  </div>
                  
                  <motion.div 
                    className="pt-2"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200"
                      onClick={() => navigate('/settings')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      प्रोफाइल सेटिंग्स
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => navigate('/notifications')}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      पुरस्कार देखें
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
            
            <motion.div 
              variants={fadeInUp}
              custom={1}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="mt-6 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <Share2 className="h-4 w-4 mr-2 text-purple-500" />
                    शेयर करें
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    अभी शेयर करें
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="col-span-9"
            variants={fadeInUp}
            custom={1}
          >
            {renderSectionContent()}
          </motion.div>
        </div>
      ) : (
        // Mobile view just shows the active section content
        <div>
          {renderSectionContent()}
        </div>
      )}

      {/* Confetti effect for celebrations */}
      {showConfetti && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute -top-10 right-10"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ repeat: 2, duration: 1 }}
          >
            <Confetti className="h-10 w-10 text-yellow-500" />
          </motion.div>
          <motion.div className="absolute top-20 left-10"
            animate={{
              y: [0, 30, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ repeat: 2, duration: 1.3, delay: 0.2 }}
          >
            <Confetti className="h-8 w-8 text-pink-500" />
          </motion.div>
          <motion.div className="absolute bottom-40 right-20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ repeat: 2, duration: 0.8, delay: 0.4 }}
          >
            <PartyPopper className="h-8 w-8 text-green-500" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
    </Layout>
  );
};

export default Profile;