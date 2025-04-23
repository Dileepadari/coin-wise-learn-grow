import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { 
  Map, 
  UserCircle, 
  Building as BuildingIcon, 
  Store as StoreIcon, 
  ArrowRight, 
  Coins, 
  RefreshCw, 
  Home as HomeIcon, 
  Briefcase as BriefcaseIcon, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  User as UserIcon,
  Pencil,
  BookOpen
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CharacterDialog from "@/components/game/CharacterDialog";
import { AnimatePresence, motion } from "framer-motion";
import GameShopDialog from "@/components/game/GameShopDialog";

// Game types
type GameLocation = 'home' | 'bank' | 'store' | 'work' | 'market';
type GameTask = {
  id: string;
  title: string;
  description: string;
  reward: number;
  requiredMoney?: number;
  locationRequired: GameLocation;
  completed: boolean;
};

type DialogType = 'task-complete' | 'task-failed' | 'story' | 'character' | 'shop' | 'budget' | 'skills' | null;

// Skills and Items
interface SkillLevel {
  name: string;
  level: number;
  description: string;
  maxLevel: number;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  benefit: string;
  effect: string;
}

export default function FinancialSimulation() {
  const navigate = useNavigate();
  const { user, addCoins } = useAppContext();
  const [currentLocation, setCurrentLocation] = useState<GameLocation>('home');
  const [gameMoney, setGameMoney] = useState(1000);
  const [gameDay, setGameDay] = useState(1);
  const [activeTask, setActiveTask] = useState<GameTask | null>(null);
  const [tasks, setTasks] = useState<GameTask[]>([
    {
      id: 'task1',
      title: 'Open a Savings Account',
      description: 'Visit the bank and open a savings account to keep your money safe.',
      reward: 50,
      locationRequired: 'bank',
      completed: false
    },
    {
      id: 'task2',
      title: 'Buy Groceries',
      description: 'Your family needs groceries. Buy them wisely and stay within budget.',
      reward: 30,
      requiredMoney: 200,
      locationRequired: 'store',
      completed: false
    },
    {
      id: 'task3',
      title: 'Complete Your Work Shift',
      description: 'Go to work and complete your daily tasks to earn money.',
      reward: 20,
      locationRequired: 'work',
      completed: false
    }
  ]);
  const [showDialog, setShowDialog] = useState<DialogType>(null);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    description: '',
    character: '',
    reward: 0
  });
  const [showStory, setShowStory] = useState(true);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [skills, setSkills] = useState<SkillLevel[]>([
    { name: "Financial Knowledge", level: 1, description: "Your understanding of financial concepts", maxLevel: 10 },
    { name: "Negotiation", level: 1, description: "Your ability to negotiate better deals", maxLevel: 10 },
    { name: "Budgeting", level: 1, description: "Your skill at creating and following budgets", maxLevel: 10 },
    { name: "Investment", level: 1, description: "Your knowledge of investment strategies", maxLevel: 10 }
  ]);
  
  const [budget, setBudget] = useState({
    income: 0,
    expenses: 0,
    savings: 0
  });
  
  const shopItems: Record<GameLocation, ShopItem[]> = {
    home: [],
    bank: [
      { 
        id: 'savings_account', 
        name: 'Savings Account', 
        description: 'Open a savings account with 3% interest', 
        price: 100, 
        benefit: '+3% interest on savings', 
        effect: 'addInterest' 
      },
      { 
        id: 'investment_guide', 
        name: 'Investment Guide', 
        description: 'A comprehensive guide to smart investing', 
        price: 150, 
        benefit: '+1 Investment skill', 
        effect: 'addSkill:Investment:1' 
      }
    ],
    store: [
      { 
        id: 'budget_app', 
        name: 'Budget App', 
        description: 'A mobile app to help track expenses', 
        price: 50, 
        benefit: '+1 Budgeting skill', 
        effect: 'addSkill:Budgeting:1' 
      },
      { 
        id: 'coupon_book', 
        name: 'Coupon Book', 
        description: 'A book of coupons for the grocery store', 
        price: 30, 
        benefit: '10% off at the store', 
        effect: 'discount:store:10' 
      }
    ],
    work: [
      { 
        id: 'online_course', 
        name: 'Online Course', 
        description: 'Take an online course to improve your skills', 
        price: 200, 
        benefit: '+2 Financial Knowledge', 
        effect: 'addSkill:Financial Knowledge:2' 
      },
      { 
        id: 'negotiation_book', 
        name: 'Negotiation Book', 
        description: 'Learn the art of negotiation', 
        price: 80, 
        benefit: '+1 Negotiation skill', 
        effect: 'addSkill:Negotiation:1' 
      }
    ],
    market: [
      { 
        id: 'stock_tips', 
        name: 'Stock Tips', 
        description: 'Inside information on promising stocks', 
        price: 300, 
        benefit: 'Unlock investment opportunities', 
        effect: 'unlockInvestment' 
      },
      { 
        id: 'market_analysis', 
        name: 'Market Analysis', 
        description: 'Professional analysis of market trends', 
        price: 250, 
        benefit: '+2 Investment skill', 
        effect: 'addSkill:Investment:2' 
      }
    ]
  };

  const characters = [
    { id: 'banker', name: 'Neha', role: 'Bank Manager', location: 'bank', position: { x: 70, y: 50 }, avatar: '👩‍💼' },
    { id: 'boss', name: 'Vikram', role: 'Your Boss', location: 'work', position: { x: 70, y: 30 }, avatar: '👨‍💼' },
    { id: 'shopkeeper', name: 'Amit', role: 'Store Owner', location: 'store', position: { x: 75, y: 40 }, avatar: '👨‍🏫' },
    { id: 'investor', name: 'Priya', role: 'Investment Advisor', location: 'market', position: { x: 65, y: 60 }, avatar: '👩‍💻' },
    { id: 'roommate', name: 'Rahul', role: 'Your Roommate', location: 'home', position: { x: 40, y: 50 }, avatar: '👨' }
  ];
  
  const characterDialogs: Record<string, string[]> = {
    banker: [
      "Welcome to City Bank! How can I help you today?",
      "We have special rates on savings accounts this month.",
      "Financial planning is crucial for your future success.",
      "Have you considered setting up an automatic savings plan?"
    ],
    boss: [
      "Good to see you at work. Ready for today's tasks?",
      "If you keep performing well, we might discuss a raise.",
      "Time is money - use it wisely!",
      "Your financial knowledge is improving. Keep it up!"
    ],
    shopkeeper: [
      "Welcome to my store! Take a look around.",
      "I have some special deals today if you're interested.",
      "Always compare prices before making big purchases.",
      "A good budget helps you avoid overspending on groceries."
    ],
    investor: [
      "The market is looking interesting today.",
      "Diversification is key to a successful investment strategy.",
      "Start investing early, even if it's small amounts.",
      "Risk and reward are always related in investments."
    ],
    roommate: [
      "Hey, how's it going? Ready to tackle some financial challenges?",
      "I heard about a great budgeting app that might help us.",
      "We should plan our shared expenses better this month.",
      "Don't forget to pay your share of the rent!"
    ]
  };

  useEffect(() => {
    if (!gameInitialized) {
      setDialogContent({
        title: 'Welcome to Financial City',
        description: "You've just moved to Financial City with ₹1,000 in your pocket. Your goal is to survive, grow your wealth, and learn smart financial habits along the way. Complete tasks, make wise choices, and see how your decisions affect your financial future.",
        character: 'System',
        reward: 0
      });
      setShowDialog('story');
      setGameInitialized(true);
    }
  }, [gameInitialized]);

  const locations = {
    home: {
      name: 'Home',
      description: 'Your apartment in Financial City',
      icon: <HomeIcon className="h-8 w-8 text-blue-500" />,
      actions: ['Check Tasks', 'Rest', 'Budget Planning']
    },
    bank: {
      name: 'City Bank',
      description: 'Manage your accounts and investments',
      icon: <BuildingIcon className="h-8 w-8 text-green-500" />,
      actions: ['Open Account', 'Check Balance', 'Apply for Loan']
    },
    work: {
      name: 'Office',
      description: 'Your workplace where you earn money',
      icon: <BriefcaseIcon className="h-8 w-8 text-amber-500" />,
      actions: ['Start Shift', 'Ask for Raise', 'Learn New Skills']
    },
    store: {
      name: 'Grocery Store',
      description: 'Buy essentials and groceries',
      icon: <ShoppingBag className="h-8 w-8 text-red-500" />,
      actions: ['Buy Groceries', 'Compare Prices', 'Use Coupons']
    },
    market: {
      name: 'Financial Market',
      description: 'Trade stocks and investments',
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      actions: ['Buy Stocks', 'Sell Stocks', 'Research Market']
    }
  };

  const handleLocationChange = (location: GameLocation) => {
    setCurrentLocation(location);
    
    if (Math.random() > 0.7) {
      const locationCharacters = characters.filter(c => c.location === location);
      if (locationCharacters.length > 0) {
        const character = locationCharacters[0];
        setDialogContent({
          title: `Meeting with ${character.name}`,
          description: `"Hello there! I'm ${character.name}, the ${character.role}. What can I help you with today?"`,
          character: character.name,
          reward: 0
        });
        setShowDialog('character');
      }
    }
  };

  const handleAction = (action: string) => {
    switch(action) {
      case 'Start Shift':
        handleWorkShift();
        break;
      case 'Budget Planning':
        setShowDialog('budget');
        break;
      case 'Check Tasks':
        toast("Your tasks are displayed below", {
          description: "Complete tasks to earn rewards and progress in the game."
        });
        break;
      case 'Open Account':
      case 'Buy Groceries':
      case 'Compare Prices':
      case 'Use Coupons':
      case 'Research Market':
        setShowShop(true);
        break;
      case 'Learn New Skills':
        setShowDialog('skills');
        break;
      case 'Ask for Raise':
        const negotiationLevel = skills.find(s => s.name === "Negotiation")?.level || 1;
        const successChance = negotiationLevel * 10;
        
        if (Math.random() * 100 < successChance) {
          const raiseAmount = Math.floor(Math.random() * 50) + (negotiationLevel * 20);
          setGameMoney(prev => prev + raiseAmount);
          toast(`Success! You got a raise of ₹${raiseAmount}`, {
            description: "Your negotiation skills paid off!",
            icon: "🎉"
          });
        } else {
          toast("Your request for a raise was denied", {
            description: "Try improving your negotiation skills first.",
            icon: "😔"
          });
        }
        break;
      default:
        toast(`Action: ${action}`, {
          description: "This feature will be available in the next update!"
        });
    }
  };

  const handleCharacterInteraction = (characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (!character) return;
    
    const dialogMessages = characterDialogs[characterId] || [];
    if (dialogMessages.length > 0) {
      const randomMessage = dialogMessages[Math.floor(Math.random() * dialogMessages.length)];
      
      setDialogContent({
        title: `${character.name} says:`,
        description: randomMessage,
        character: character.name,
        reward: 0
      });
      
      setShowDialog('character');
    }
  };

  const handleTaskSelect = (task: GameTask) => {
    if (currentLocation !== task.locationRequired) {
      toast(`You need to go to ${locations[task.locationRequired].name} to complete this task.`, {
        icon: <AlertCircle className="h-4 w-4 text-amber-500" />
      });
      return;
    }

    setActiveTask(task);

    if (task.requiredMoney && gameMoney < task.requiredMoney) {
      setDialogContent({
        title: 'Insufficient Funds',
        description: `You need ₹${task.requiredMoney} to complete this task, but you only have ₹${gameMoney}.`,
        character: 'System',
        reward: 0
      });
      setShowDialog('task-failed');
      return;
    }

    if (task.requiredMoney) {
      setGameMoney(prev => prev - task.requiredMoney);
    }

    setTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, completed: true } : t
    ));

    if (task.title.includes("Budget") || task.title.includes("Groceries")) {
      updateSkill("Budgeting", 1);
    } else if (task.title.includes("Savings") || task.title.includes("Account")) {
      updateSkill("Financial Knowledge", 1);
    }

    setDialogContent({
      title: 'Task Completed!',
      description: `You have successfully completed "${task.title}". You've earned ${task.reward} coins and learned valuable financial skills.`,
      character: 'System',
      reward: task.reward
    });
    setShowDialog('task-complete');
  };

  const updateSkill = (skillName: string, amount: number) => {
    setSkills(prev => prev.map(skill => {
      if (skill.name === skillName) {
        const newLevel = Math.min(skill.level + amount, skill.maxLevel);
        return { ...skill, level: newLevel };
      }
      return skill;
    }));
  };

  const handleCompleteTask = () => {
    if (activeTask) {
      addCoins(activeTask.reward);
      setShowDialog(null);
      
      if (Math.random() > 0.5) {
        const newTaskId = `task${tasks.length + 1}`;
        const newLocations: GameLocation[] = ['bank', 'store', 'work', 'market'];
        const randomLocation = newLocations[Math.floor(Math.random() * newLocations.length)];
        
        const newTask: GameTask = {
          id: newTaskId,
          title: `New Financial Challenge ${tasks.length + 1}`,
          description: `A new challenge has appeared. Go to ${locations[randomLocation].name} to complete it.`,
          reward: Math.floor(Math.random() * 50) + 20,
          locationRequired: randomLocation,
          completed: false
        };
        
        setTasks(prev => [...prev, newTask]);
        
        toast("New task available!", {
          description: "Check your task list for a new financial challenge.",
          icon: "📝"
        });
      }
    }
  };

  const handleWorkShift = () => {
    const baseEarnings = 200;
    const skillMultiplier = skills.find(s => s.name === "Financial Knowledge")?.level || 1;
    const earnings = Math.floor(Math.random() * 300) + baseEarnings + (skillMultiplier * 10);
    
    setGameMoney(prev => prev + earnings);
    setBudget(prev => ({...prev, income: prev.income + earnings}));
    
    toast(`You earned ₹${earnings} from your work shift!`, {
      icon: <Coins className="h-4 w-4 text-green-500" />
    });
    
    if (Math.random() > 0.8) {
      updateSkill("Financial Knowledge", 1);
      toast("Your financial knowledge improved through work experience!", {
        icon: "📈"
      });
    }
  };

  const handleNextDay = () => {
    setGameDay(prev => prev + 1);
    
    setTasks(prev => prev.map(task => 
      task.completed ? task : { ...task, completed: false }
    ));
    
    const hasInvestments = inventory.some(i => i === 'savings_account' || i === 'stock_tips');
    if (hasInvestments) {
      const investmentSkill = skills.find(s => s.name === "Investment")?.level || 1;
      const interestRate = 0.03 + (investmentSkill * 0.005);
      const interestAmount = Math.floor(gameMoney * interestRate);
      
      if (interestAmount > 0) {
        setGameMoney(prev => prev + interestAmount);
        toast(`You earned ₹${interestAmount} in interest!`, {
          description: "Your investments are growing.",
          icon: "💰"
        });
      }
    }
    
    toast(`Day ${gameDay + 1} begins!`, {
      description: "A new day with new opportunities.",
      icon: "🌅"
    });
  };

  const handleBuyItem = (item: ShopItem) => {
    if (gameMoney >= item.price) {
      setGameMoney(prev => prev - item.price);
      setInventory(prev => [...prev, item.id]);
      
      if (item.effect.startsWith('addSkill:')) {
        const [_, skillName, amountStr] = item.effect.split(':');
        const amount = parseInt(amountStr);
        updateSkill(skillName, amount);
      }
      
      toast(`You purchased ${item.name}!`, {
        description: `${item.benefit} has been added to your inventory.`
      });
    } else {
      toast("Not enough money!", {
        description: `You need ₹${item.price - gameMoney} more.`
      });
    }
  };

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Financial City</h1>
            <p className="text-muted-foreground">Your financial life simulator</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-amber-500" />
              ₹{gameMoney}
            </Badge>
            <Badge variant="outline">Day {gameDay}</Badge>
          </div>
        </div>
        
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>Financial City Map</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => setShowShop(true)}
                >
                  <StoreIcon className="h-4 w-4" />
                  Shop
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleNextDay}
                >
                  <RefreshCw className="h-4 w-4" />
                  Next Day
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-muted aspect-video rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  <Button 
                    variant={currentLocation === 'home' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('home')}
                  >
                    <HomeIcon className="h-8 w-8" />
                    <span>Home</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'bank' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('bank')}
                  >
                    <BuildingIcon className="h-8 w-8" />
                    <span>Bank</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'store' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('store')}
                  >
                    <StoreIcon className="h-8 w-8" />
                    <span>Store</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'work' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('work')}
                  >
                    <BriefcaseIcon className="h-8 w-8" />
                    <span>Work</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'market' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('market')}
                  >
                    <TrendingUp className="h-8 w-8" />
                    <span>Market</span>
                  </Button>
                  
                  <div className="h-24 flex items-center justify-center">
                    <UserIcon className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {characters
                  .filter(c => c.location === currentLocation)
                  .map(character => (
                    <motion.div
                      key={character.id}
                      className="absolute"
                      style={{ 
                        top: `${character.position.y}%`, 
                        left: `${character.position.x}%` 
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleCharacterInteraction(character.id)}
                    >
                      <div className="cursor-pointer flex flex-col items-center">
                        <div className="text-3xl">{character.avatar}</div>
                        <div className="text-xs font-medium mt-1">{character.name}</div>
                        <div className="text-xs text-muted-foreground">{character.role}</div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-4 p-4 border rounded-md">
              <div className="flex items-center mb-2">
                {locations[currentLocation].icon}
                <h2 className="text-xl font-bold ml-2">{locations[currentLocation].name}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{locations[currentLocation].description}</p>
              
              <div className="grid grid-cols-3 gap-2">
                {locations[currentLocation].actions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline"
                    onClick={() => handleAction(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Your Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {skills.map(skill => (
                <div key={skill.name} className="bg-muted/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium text-sm">{skill.name}</div>
                    <div className="text-xs bg-background px-2 py-1 rounded-full">
                      Level {skill.level}/{skill.maxLevel}
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pencil className="h-5 w-5 mr-2" />
              Current Tasks
            </CardTitle>
            <CardDescription>Complete tasks to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map(task => (
                <motion.div 
                  key={task.id} 
                  className={`p-3 border rounded-md flex justify-between items-center
                    ${currentLocation === task.locationRequired ? 'border-primary' : ''}`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2 text-xs">
                        Location: {locations[task.locationRequired].name}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center">
                        <Coins className="h-3 w-3 mr-1 text-amber-500" />
                        {task.reward} reward
                      </Badge>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    disabled={currentLocation !== task.locationRequired}
                    onClick={() => handleTaskSelect(task)}
                  >
                    Complete
                  </Button>
                </motion.div>
              ))}
              
              {tasks.filter(task => !task.completed).length === 0 && (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">All tasks completed! Check back tomorrow for new tasks.</p>
                </div>
              )}
            </div>
            
            {tasks.some(task => task.completed) && (
              <>
                <h4 className="font-medium mt-6 mb-2">Completed Tasks</h4>
                <div className="space-y-2">
                  {tasks.filter(task => task.completed).map(task => (
                    <div key={task.id} className="p-2 rounded-md bg-muted/30 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{task.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Dialog open={showDialog === 'task-complete'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {dialogContent.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>{dialogContent.description}</p>
              
              <div className="mt-4 p-4 bg-green-50 rounded-md text-center animate-pulse">
                <Coins className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="text-green-700 font-medium">+{dialogContent.reward} coins added to your account!</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleCompleteTask}>
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showDialog === 'task-failed'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                {dialogContent.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>{dialogContent.description}</p>
              
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <p className="text-red-700 text-sm">Tip: You might need to work more to earn money before attempting this task.</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowDialog(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showDialog === 'story'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>{dialogContent.description}</p>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-blue-700 text-sm">Your financial journey begins! Make smart choices and see how far you can go.</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowDialog(null)}>
                Start Game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showDialog === 'character'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4 flex items-start space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h3 className="font-medium">{dialogContent.character}</h3>
                <p className="mt-2">{dialogContent.description}</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(null)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowDialog(null);
                toast("Character interaction complete", {
                  description: "You gained some valuable financial advice!"
                });
              }}>
                Ask for Advice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showDialog === 'skills'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Learning New Skills
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>Taking time to learn can improve your financial skills and help you earn more money.</p>
              
              <div className="mt-4 space-y-4">
                {skills.map(skill => (
                  <div key={skill.name} className="border p-3 rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-xs bg-muted px-2 py-1 rounded">
                        Level {skill.level}/{skill.maxLevel}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground my-2">{skill.description}</p>
                    <Button 
                      size="sm" 
                      disabled={skill.level >= skill.maxLevel}
                      onClick={() => {
                        const cost = skill.level * 50;
                        if (gameMoney >= cost) {
                          setGameMoney(prev => prev - cost);
                          updateSkill(skill.name, 1);
                          toast(`${skill.name} improved to level ${skill.level + 1}!`, {
                            description: "Your knowledge is growing."
                          });
                        } else {
                          toast("Not enough money!", {
                            description: `You need ₹${cost} to improve this skill.`
                          });
                        }
                      }}
                    >
                      Learn (₹{skill.level * 50})
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowDialog(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showDialog === 'budget'} onOpenChange={() => setShowDialog(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                Budget Planning
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>Create and manage your budget to track income and expenses.</p>
              
              <div className="mt-4 space-y-3">
                <div className="bg-green-50 p-3 rounded-md">
                  <div className="text-sm text-green-700 font-medium">Income</div>
                  <div className="text-lg">₹{budget.income}</div>
                </div>
                
                <div className="bg-red-50 p-3 rounded-md">
                  <div className="text-sm text-red-700 font-medium">Expenses</div>
                  <div className="text-lg">₹{budget.expenses}</div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-blue-700 font-medium">Savings</div>
                  <div className="text-lg">₹{budget.savings}</div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-md">
                  <div className="text-sm text-amber-700 font-medium">Current Balance</div>
                  <div className="text-lg">₹{gameMoney}</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 border rounded-md">
                <h4 className="font-medium mb-2">Budgeting Tip:</h4>
                <p className="text-sm text-muted-foreground">
                  Try to save at least 20% of your income for emergencies and future investments.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(null)}>
                Close
              </Button>
              <Button onClick={() => {
                const savingsAmount = Math.min(gameMoney * 0.2, gameMoney);
                setGameMoney(prev => prev - savingsAmount);
                setBudget(prev => ({...prev, savings: prev.savings + savingsAmount}));
                
                toast("Savings updated!", {
                  description: `You set aside ₹${savingsAmount} for your future.`
                });
                
                updateSkill("Budgeting", 1);
                
                setShowDialog(null);
              }}>
                Save 20% of Money
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <GameShopDialog 
          isOpen={showShop} 
          onClose={() => setShowShop(false)}
          items={shopItems[currentLocation]}
          playerMoney={gameMoney}
          onBuyItem={handleBuyItem}
        />
      </div>
    </Layout>
  );
}
