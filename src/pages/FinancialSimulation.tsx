
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { toast } from "@/components/ui/sonner";
import { Map, UserCircle, Building, Store, ArrowRight, Coins, RefreshCw } from "lucide-react";

export default function FinancialSimulation() {
  const { user, addCoins } = useApp();
  const [scenario, setScenario] = useState<number>(0);
  const [balance, setBalance] = useState<number>(5000);
  const [day, setDay] = useState<number>(1);
  const [location, setLocation] = useState<'home' | 'bank' | 'market' | 'mall'>('home');
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "Monthly Salary",
      description: "You just received your salary for this month. Your mom asked you to get groceries. How would you manage your money?",
      options: [
        {
          text: "Save 20% first, then buy groceries",
          outcome: "You saved ₹1,000 and still had enough for groceries. Good financial discipline!",
          balanceChange: 0,
          reward: 20
        },
        {
          text: "Buy groceries first, save whatever is left",
          outcome: "You spent on groceries but saved less than planned. Try to save first next time!",
          balanceChange: -200,
          reward: 5
        },
        {
          text: "Buy groceries and some treats for yourself",
          outcome: "You enjoyed the treats but didn't save anything. Think long-term!",
          balanceChange: -500,
          reward: 0
        }
      ]
    },
    {
      id: 2,
      title: "Unexpected Expense",
      description: "Your phone broke and needs repair. It will cost ₹2,000. What will you do?",
      options: [
        {
          text: "Use your emergency fund",
          outcome: "Good job having an emergency fund! This is exactly what it's for.",
          balanceChange: -2000,
          reward: 30
        },
        {
          text: "Borrow money from a friend",
          outcome: "You got your phone fixed but now you're in debt. Remember to repay quickly!",
          balanceChange: -2000,
          reward: 10
        },
        {
          text: "Use credit card and pay minimum due",
          outcome: "Using credit card for emergencies works, but paying only minimum will cost you in interest.",
          balanceChange: -500,
          reward: 5
        }
      ]
    },
    {
      id: 3,
      title: "Investment Opportunity",
      description: "A friend tells you about an investment opportunity that promises 50% returns in 1 month. What do you do?",
      options: [
        {
          text: "Research thoroughly before investing",
          outcome: "You found it was a scam! Your research saved you from losing money.",
          balanceChange: 0,
          reward: 50
        },
        {
          text: "Invest a small amount to test",
          outcome: "It turned out to be a scam. You lost some money but learned an important lesson.",
          balanceChange: -1000,
          reward: 10
        },
        {
          text: "Invest a large amount for big returns",
          outcome: "It was a scam! You lost a significant amount. Be careful of schemes promising unrealistic returns.",
          balanceChange: -3000,
          reward: 0
        }
      ]
    }
  ];

  const currentScenario = scenarios[scenario];

  useEffect(() => {
    // Show welcome message
    toast("Welcome to Financial Simulation!", {
      description: "Make financial decisions and see their impact in this virtual world"
    });
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    const option = currentScenario.options[optionIndex];
    
    // Update balance
    setBalance(prev => prev + option.balanceChange);
    
    // Show outcome
    toast(option.outcome, {
      icon: option.balanceChange >= 0 ? "✅" : "ℹ️",
      description: option.balanceChange > 0 ? `+₹${option.balanceChange}` : 
                  option.balanceChange < 0 ? `-₹${Math.abs(option.balanceChange)}` : ""
    });
    
    // Award coins
    if (option.reward > 0) {
      setTimeout(() => {
        addCoins(option.reward);
        setShowCelebration(true);
        toast(`+${option.reward} coins!`, { 
          icon: "🪙",
          className: "bg-amber-500 text-white" 
        });
        
        setTimeout(() => {
          setShowCelebration(false);
        }, 2000);
      }, 1000);
    }
    
    // Move to next scenario or finish game
    setTimeout(() => {
      if (scenario < scenarios.length - 1) {
        setScenario(scenario + 1);
        setDay(day + 1);
      } else {
        setGameCompleted(true);
        toast("Game completed!", {
          icon: "🎉",
          description: "You've learned valuable financial lessons"
        });
      }
    }, 2000);
  };

  const handleLocationChange = (loc: 'home' | 'bank' | 'market' | 'mall') => {
    setLocation(loc);
    
    const messages = {
      home: "Welcome home! This is where you can rest and plan your finances.",
      bank: "Welcome to the bank! Here you can manage your savings and investments.",
      market: "The market has all essential items you need for daily life.",
      mall: "The mall has many tempting items! Be careful with your spending."
    };
    
    toast(messages[loc]);
  };

  const handleRestartGame = () => {
    setScenario(0);
    setBalance(5000);
    setDay(1);
    setLocation('home');
    setGameCompleted(false);
  };

  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-3">
          <h1 className="text-2xl font-bold">Financial Life Simulator</h1>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Day {day} - Make wise financial decisions</p>
            <Badge variant="outline" className="bg-primary/10">
              Balance: ₹{balance.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Map and location selection */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Map className="h-4 w-4 mr-2" />
              Location
            </h3>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Button 
                variant={location === 'home' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLocationChange('home')}
              >
                <UserCircle className="h-4 w-4 mr-1" />
                Home
              </Button>
              
              <Button 
                variant={location === 'bank' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLocationChange('bank')}
              >
                <Building className="h-4 w-4 mr-1" />
                Bank
              </Button>
              
              <Button 
                variant={location === 'market' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLocationChange('market')}
              >
                <Store className="h-4 w-4 mr-1" />
                Market
              </Button>
              
              <Button 
                variant={location === 'mall' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLocationChange('mall')}
              >
                <Store className="h-4 w-4 mr-1" />
                Mall
              </Button>
            </div>
            
            <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1">
                  {location === 'home' && '🏠'}
                  {location === 'bank' && '🏦'}
                  {location === 'market' && '🛒'}
                  {location === 'mall' && '🏬'}
                </div>
                <p>You are at the {location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Current Scenario */}
        {!gameCompleted ? (
          <Card className={`mb-4 ${showCelebration ? 'animate-pulse border-amber-400' : ''}`}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">{currentScenario.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{currentScenario.description}</p>
              
              <div className="space-y-2">
                {currentScenario.options.map((option, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleOptionSelect(index)}
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-4">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Game Completed!</h3>
              <p className="mb-4">Final Balance: ₹{balance.toLocaleString()}</p>
              
              <div className="bg-muted/30 p-3 rounded-md mb-4 text-left">
                <h4 className="font-medium mb-2">What you learned:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>The importance of saving before spending</li>
                  <li>How to handle unexpected expenses</li>
                  <li>Identifying potential financial scams</li>
                  <li>Making thoughtful financial decisions</li>
                </ul>
              </div>
              
              <Button className="w-full" onClick={handleRestartGame}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
