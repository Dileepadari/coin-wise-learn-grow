import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Star, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import confetti from 'canvas-confetti';

const OnboardingComplete = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { updateUser, addCoins } = useAppContext();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
      setShowConfetti(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Add coins for completing onboarding
      addCoins(50);
      
      // Update user with onboarding completed status
      updateUser({ level: 1 });
    }, 800);

    return () => clearTimeout(timer);
  }, [addCoins, updateUser]);

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400 flex flex-col justify-center items-center p-6 text-white">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Award className="h-12 w-12 text-white" />
            </div>
            {showConfetti && 
              <div className="absolute -top-2 -right-2 bg-secondary text-white h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white animate-bounce">
                +1
              </div>
            }
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">बधाई हो! 🎉</h1>
        <h2 className="text-xl mb-6">Congratulations!</h2>
        
        <p className="mb-8 text-lg">
          आपने अपनी वित्तीय यात्रा की शुरुआत कर दी है। आपको ₹50 सिक्के मिले हैं!
          <br />
          <span className="text-sm opacity-80">
            You have started your financial journey. You've earned ₹50 coins!
          </span>
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>ऑनबोर्डिंग पूरी हो गई</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/30" />
        </div>

        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-white/30 rounded-full p-3 mb-2">
              <Star className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="text-sm">Level 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/30 rounded-full p-3 mb-2">
              <Award className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="text-sm">50 Coins</span>
          </div>
        </div>

        <Button 
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white border-none py-6"
          disabled={progress < 100}
        >
          शुरू करें (Start Now)
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      {showConfetti && (
        <div className="mt-6 animate-bounce text-lg font-bold">
          🎉 आपकी वित्तीय सफलता की शुरुआत! 🎉
          <br />
          <span className="text-sm font-normal">The beginning of your financial success!</span>
        </div>
      )}
    </div>
  );
};

export default OnboardingComplete;
