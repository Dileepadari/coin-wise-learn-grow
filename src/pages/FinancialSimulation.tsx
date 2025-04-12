import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { Map, UserCircle, Building, Store, ArrowRight, Coins, RefreshCw, Home, Briefcase, ShoppingBag, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

type DialogType = 'task-complete' | 'task-failed' | 'story' | 'character' | 'shop' | null;

export default function FinancialSimulation() {
  const navigate = useNavigate();
  const { user, addCoins } = useApp();
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

  // Characters in the game
  const characters = [
    { id: 'banker', name: 'Neha', role: 'Bank Manager', location: 'bank' },
    { id: 'boss', name: 'Vikram', role: 'Your Boss', location: 'work' },
    { id: 'shopkeeper', name: 'Amit', role: 'Store Owner', location: 'store' }
  ];

  // Initialize the game with intro story
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

  // Location descriptions and actions
  const locations = {
    home: {
      name: 'Home',
      description: 'Your apartment in Financial City',
      icon: <Home className="h-8 w-8 text-blue-500" />,
      actions: ['Check Tasks', 'Rest', 'Budget Planning']
    },
    bank: {
      name: 'City Bank',
      description: 'Manage your accounts and investments',
      icon: <Building className="h-8 w-8 text-green-500" />,
      actions: ['Open Account', 'Check Balance', 'Apply for Loan']
    },
    work: {
      name: 'Office',
      description: 'Your workplace where you earn money',
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
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

  // Change location in the game
  const handleLocationChange = (location: GameLocation) => {
    setCurrentLocation(location);
    
    // Random chance to trigger character interaction
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

  // Handle task selection
  const handleTaskSelect = (task: GameTask) => {
    if (currentLocation !== task.locationRequired) {
      toast(`You need to go to ${locations[task.locationRequired].name} to complete this task.`, {
        icon: <AlertCircle className="h-4 w-4 text-amber-500" />
      });
      return;
    }

    setActiveTask(task);

    // If task requires money, check if player has enough
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

    // Task completion logic
    if (task.requiredMoney) {
      setGameMoney(prev => prev - task.requiredMoney);
    }

    // Mark task as completed
    setTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, completed: true } : t
    ));

    setDialogContent({
      title: 'Task Completed!',
      description: `You have successfully completed "${task.title}". You've earned ${task.reward} coins and learned valuable financial skills.`,
      character: 'System',
      reward: task.reward
    });
    setShowDialog('task-complete');
  };

  // Complete a task and get rewards
  const handleCompleteTask = () => {
    if (activeTask) {
      // Add coins to user account
      addCoins(activeTask.reward);
      
      // Close dialog
      setShowDialog(null);
      
      // Add new tasks randomly
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

  // Perform job to earn money
  const handleWorkShift = () => {
    const earnings = Math.floor(Math.random() * 300) + 200;
    setGameMoney(prev => prev + earnings);
    
    toast(`You earned ₹${earnings} from your work shift!`, {
      icon: <Coins className="h-4 w-4 text-green-500" />
    });
  };

  // Advance to next day
  const handleNextDay = () => {
    setGameDay(prev => prev + 1);
    
    // Reset daily tasks
    setTasks(prev => prev.map(task => 
      task.completed ? task : { ...task, completed: false }
    ));
    
    toast(`Day ${gameDay + 1} begins!`, {
      description: "A new day with new opportunities.",
      icon: "🌅"
    });
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
        
        {/* Game World Map */}
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>Financial City Map</CardTitle>
              </div>
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
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-muted aspect-video rounded-lg relative overflow-hidden">
              {/* Game Map UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  <Button 
                    variant={currentLocation === 'home' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('home')}
                  >
                    <Home className="h-8 w-8" />
                    <span>Home</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'bank' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('bank')}
                  >
                    <Building className="h-8 w-8" />
                    <span>Bank</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'store' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('store')}
                  >
                    <Store className="h-8 w-8" />
                    <span>Store</span>
                  </Button>
                  
                  <Button 
                    variant={currentLocation === 'work' ? "default" : "outline"}
                    className="h-24 flex-col gap-1"
                    onClick={() => handleLocationChange('work')}
                  >
                    <Briefcase className="h-8 w-8" />
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
                    <UserCircle className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current location info */}
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
                    onClick={() => {
                      if (action === 'Start Shift') {
                        handleWorkShift();
                      } else {
                        toast(`Action: ${action}`, {
                          description: "This feature will be available in the next update!",
                        });
                      }
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="h-5 w-5 mr-2" />
              Current Tasks
            </CardTitle>
            <CardDescription>Complete tasks to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map(task => (
                <div 
                  key={task.id} 
                  className={`p-3 border rounded-md flex justify-between items-center
                    ${currentLocation === task.locationRequired ? 'border-primary' : ''}`}
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
                </div>
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

        {/* Task Complete Dialog */}
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
        
        {/* Task Failed Dialog */}
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
        
        {/* Story Dialog */}
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
        
        {/* Character Dialog */}
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
      </div>
    </Layout>
  );
}
