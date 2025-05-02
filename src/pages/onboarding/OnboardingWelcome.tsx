import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowRight, IndianRupee, Coins, PiggyBank } from 'lucide-react';
import { toast } from 'sonner';

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    toast.success("शुरुआत होने वाली है! (The journey begins!)");
    navigate('/onboarding/profile');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-in">
          <div className="mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse-ring"></div>
            </div>
            <div className="relative z-10 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <CoinsAnimation />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-coin-purple-vivid mb-2">
            CoinWise में आपका स्वागत है!
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to CoinWise!
          </p>
          
          <div className="mt-6 space-y-4">
            <p className="text-center text-lg">
              अपने वित्तीय जीवन को बेहतर बनाने के लिए आपने एक महत्वपूर्ण कदम उठाया है।
            </p>
            <p className="text-center text-sm text-muted-foreground">
              (You've taken an important step towards improving your financial life.)
            </p>
          </div>
        </div>
        
        <Card className="p-6 border-2 border-coin-orange/20 shadow-lg animate-scale-in">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">
              यहाँ आप क्या सीखेंगे:
            </h2>
            
            <div className="space-y-4">
              <FeatureItem 
                icon={<IndianRupee className="h-5 w-5 text-coin-purple-vivid" />}
                title="बजट बनाना"
                subtitle="Budget Management"
              />
              
              <FeatureItem 
                icon={<Coins className="h-5 w-5 text-coin-purple-vivid" />}
                title="बचत की आदतें"
                subtitle="Saving Habits"
              />
              
              <FeatureItem 
                icon={<PiggyBank className="h-5 w-5 text-coin-purple-vivid" />}
                title="निवेश की बुनियादी बातें"
                subtitle="Investment Basics"
              />
            </div>
            
            <div className="text-center pt-4">
              <Button
                onClick={handleContinue}
                className="bg-orange-gradient hover:bg-primary-600 text-white px-8 py-6 rounded-lg font-medium text-lg transition-transform hover:scale-105"
              >
                <span>शुरू करें (Start)</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center">
            <div className="h-3 w-3 bg-primary rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            1/5 - स्वागत (Welcome)
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) => {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg bg-background-soft hover:bg-white transition-colors hover:shadow-md">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

const CoinsAnimation = () => {
  return (
    <div className="relative w-16 h-16">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-8 h-8 bg-yellow-300 rounded-full border-2 border-yellow-500 flex items-center justify-center"
          style={{
            top: i * 6,
            left: i * 4,
            animation: `float ${1 + i * 0.2}s infinite alternate ease-in-out`,
            animationDelay: `${i * 0.1}s`
          }}
        >
          <span className="text-yellow-800 font-bold text-xs">₹</span>
        </div>
      ))}
    </div>
  );
};

export default OnboardingWelcome;
