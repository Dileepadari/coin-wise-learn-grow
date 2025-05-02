import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, PiggyBank, ShieldAlert, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

const GamepadIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
  </svg>
);

const Games = () => {
  const [points, setPoints] = useState(120);
  const navigate = useNavigate();

  const games = [
    {
      id: "financial-simulation",
      title: "वित्तीय जीवन सिमुलेशन",
      translation: "Financial Life Simulation",
      description: "अपने दैनिक वित्तीय निर्णयों को सिमुलेट करें और उनके प्रभावों को देखें।",
      descTranslation: "Simulate your daily financial decisions and see their effects.",
      icon: <PiggyBank className="h-8 w-8 text-white" />,
      color: "from-primary to-accent",
      progress: 25,
      new: false,
      dailyTask: "10 दिनों तक बजट बनाकर चलें",
      dailyTaskTranslation: "Follow a budget for 10 days",
      reward: 50
    },
    {
      id: "budgeting",
      title: "बजट मास्टर",
      translation: "Budget Master",
      description: "अपने खर्चों का प्रबंधन करना सीखें और बचत के लिए बजट बनाएं।",
      descTranslation: "Learn to manage your expenses and create a budget for savings.",
      icon: <PiggyBank className="h-8 w-8 text-white" />,
      color: "from-secondary to-amber-500",
      progress: 0,
      new: true,
      dailyTask: "अपनी आय का 20% बचाएं",
      dailyTaskTranslation: "Save 20% of your income",
      reward: 75
    },
    {
      id: "scam-detection",
      title: "धोखा डिटेक्टर",
      translation: "Fraud Detector",
      description: "वित्तीय धोखाधड़ी की पहचान करना सीखें और अपने पैसे को सुरक्षित रखें।",
      descTranslation: "Learn to identify financial frauds and keep your money safe.",
      icon: <ShieldAlert className="h-8 w-8 text-white" />,
      color: "from-red-500 to-orange-500",
      progress: 40,
      new: false,
      dailyTask: "5 संदिग्ध लेनदेन की पहचान करें",
      dailyTaskTranslation: "Identify 5 suspicious transactions",
      reward: 60
    },
    {
      id: "investment",
      title: "निवेश गुरु",
      translation: "Investment Guru",
      description: "वित्तीय बाजारों के बारे में जानें और अपनी संपत्ति को बढ़ाएं।",
      descTranslation: "Learn about financial markets and grow your assets.",
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      color: "from-green-500 to-teal-500",
      progress: 10,
      new: false,
      dailyTask: "एक नया निवेश पोर्टफोलियो बनाएं",
      dailyTaskTranslation: "Create a new investment portfolio",
      reward: 100
    },
  ];

  const handleStartGame = (gameId: string) => {
    toast.success("गेम शुरू हो रहा है! (Game is starting!)");
    if (gameId === 'budgeting') {
      navigate('/games/budget-master');
    } else {
      navigate(`/games/${gameId}`);
    }
  };

  const handleCollectReward = (reward: number) => {
    setPoints(prev => prev + reward);
    toast.success(`बधाई हो! ${reward} अंक मिले! (Congratulations! ${reward} points earned!)`);
  };

  return (
    <Layout>
      
    <div className="pt-4 pb-24 px-4 bg-gradient-to-br from-background-purple via-background-soft to-background-yellow min-h-screen">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary">खेल (Games)</h1>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary px-3 py-1">
            <GamepadIcon className="w-4 h-4 mr-1" />
            <span>{points} अंक (Points)</span>
          </Badge>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6 shadow-sm border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium">दैनिक लक्ष्य (Daily Goals)</h3>
              <p className="text-sm text-muted-foreground">अपने वित्तीय लक्ष्यों को पूरा करें और पुरस्कार प्राप्त करें!</p>
              <p className="text-xs text-muted-foreground">(Complete your financial goals and receive rewards!)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="overflow-hidden border-2 border-primary/10 shadow-md hover-scale">
              <div className={`bg-gradient-to-r ${game.color} p-4 relative`}>
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-white/20 p-2">
                    {game.icon}
                  </div>
                  {game.new && (
                    <Badge className="bg-accent hover:bg-accent text-white">
                      नया (New)
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mt-3">
                  {game.title}
                </h2>
                <p className="text-white/80 text-sm">
                  {game.translation}
                </p>
                
                <div className="mt-2 bg-white/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full" 
                    style={{ width: `${game.progress}%` }}
                  ></div>
                </div>
                <p className="text-white/80 text-xs mt-1">
                  {game.progress}% पूरा (completed)
                </p>
              </div>

              <CardContent className="p-4">
                <p className="text-sm mb-4">
                  {game.description}
                  <br />
                  <span className="text-xs text-muted-foreground">
                    {game.descTranslation}
                  </span>
                </p>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-secondary">
                        आज का टास्क (Today's Task)
                      </p>
                      <p className="text-xs mt-1">
                        {game.dailyTask}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {game.dailyTaskTranslation}
                        </span>
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">
                      +{game.reward}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-secondary border-secondary hover:bg-secondary/5 w-full text-xs"
                    onClick={() => handleCollectReward(game.reward)}
                  >
                    पुरस्कार प्राप्त करें (Collect Reward)
                  </Button>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary-600"
                  onClick={() => handleStartGame(game.id)}
                >
                  <span>शुरू करें (Start)</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Games;
