
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/context/AppContext';
import { translate } from '@/utils/translate';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser, language } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      // Create a new user
      updateUser({
        id: 'new-user-id',
        name: `${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phoneNumber,
        points: 50, // Welcome bonus
        level: 1,
        badges: ["नया सितारा", "सीखने वाला"],
        completedModules: [],
        completedGames: [],
        knowledgeLevel: "beginner",
        preferredCategories: [],
        likedContent: [],
        savedContent: [],
        progress: []
      });
      
      setLoading(false);
      navigate('/onboarding/welcome');
      
    }, 1500);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  // Hero characters animation
  const characters = [
    { name: "रोहित दादा", role: "किसान", message: "मैंने अपनी बचत से ट्रैक्टर खरीदा!" },
    { name: "सीमा दीदी", role: "दर्जी", message: "अब मेरा अपना बिज़नेस है!" },
    { name: "राजेश भाई", role: "स्ट्रीट वेंडर", message: "मैंने अपने बच्चों को स्कूल भेजा!" }
  ];
  
  const [activeHero, setActiveHero] = useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % characters.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-coin-purple-vivid relative">
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-coin-yellow opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-coin-pink opacity-50"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          
          <div className="px-8 pt-8 pb-6 bg-purple-gradient">
            <div className="text-center mb-4">
              <motion.div 
                className="coin mx-auto mb-4"
                animate={{ rotateY: 360 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                ₹
              </motion.div>
              <h2 className="text-2xl font-bold text-white">
                {translate('welcomeTitle', language)}
              </h2>
              <p className="text-white/80 mt-1">
                {translate('welcomeMessage', language)}
              </p>
            </div>
            
            {/* Success story carousel */}
            <motion.div 
              key={activeHero}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/30"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-coin-gradient flex items-center justify-center text-white font-bold text-lg">
                  {characters[activeHero].name[0]}
                </div>
                <div className="ml-3 text-left">
                  <p className="font-medium text-white">{characters[activeHero].name}</p>
                  <p className="text-xs text-white/70">{characters[activeHero].role}</p>
                </div>
              </div>
              <p className="mt-2 text-white text-sm italic">"{characters[activeHero].message}"</p>
              <div className="flex justify-center mt-2">
                {characters.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full mx-1 ${i === activeHero ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="p-8 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    {translate('firstName', language)}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-purple focus:border-coin-purple-vivid"
                    placeholder="राम"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    {translate('lastName', language)}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-purple focus:border-coin-purple-vivid"
                    placeholder="शर्मा"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700">
                  {translate('phoneNumber', language)}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-purple focus:border-coin-purple-vivid"
                  placeholder="9876543210"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  {translate('password', language)}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-purple focus:border-coin-purple-vivid pr-10"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  name="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, terms: checked as boolean})
                  }
                  className="border-2 border-coin-purple data-[state=checked]:bg-coin-purple-vivid data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  {translate('termsAccepted', language)}
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={loading || !formData.terms}
                className="w-full h-12 rounded-xl bg-coin-purple hover:opacity-90 text-white font-bold button-shimmer" 
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{translate('loading', language)}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>{translate('createAccount', language)}</span>
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {translate('orSignUpWith', language)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl hover:bg-gray-100 hover:border-gray-400 flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl hover:bg-gray-100 hover:border-gray-400 flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 text-blue-500"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
                Facebook
              </Button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                {translate('alreadyHaveAccount', language)}{' '}
                <Link to="/auth/login" className="text-coin-purple-vivid font-medium hover:underline hover:text-coin-purple-dark">
                  {translate('loginText', language)}
                </Link>
              </p>
              
              <div className="mt-4 text-xs text-gray-500">
                <motion.p
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {translate('freeAccess', language)}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Festive decoration */}
        <div className="flex justify-around mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className={`w-3 h-3 rounded-full bg-${['coin-purple', 'coin-orange', 'coin-pink', 'coin-blue', 'coin-yellow'][i % 5]}`}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;