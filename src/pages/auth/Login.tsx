
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { translate } from '@/utils/translate';
import { motion } from 'framer-motion';

const Login = () => {
  const { updateUser, language } = useAppContext();
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, any login works
      updateUser({
        id: 'user-123',
        name: 'राजेश कुमार',
        phoneNumber: formData.phoneNumber,
        points: 75,
        level: 1,
        badges: ["नया सितारा", "शुरुआती वित्तीय गुरु"],
        completedModules: [],
        completedGames: [],
        knowledgeLevel: "beginner",
        preferredCategories: ["saving", "budgeting"],
        likedContent: [],
        savedContent: [],
        progress: []
      });
      
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Financial tips to display randomly
  const financialTips = [
    "रोज़ थोड़ा बचाओ, बड़ा खज़ाना बनाओ! 💸",
    "पैसा पानी की तरह बहता है, उसे संभालकर रखो! 💧",
    "खर्च से पहले सोचो, फिर जेब खोलो! 🤔",
    "छोटी बचत, बड़ी समृद्धि की चाबी है! 🔑",
    "जैसा बोओगे, वैसा काटोगे - निवेश भी ऐसा ही है! 🌱"
  ];
  
  const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-coin-orange relative">
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
          
          <div className="px-8 pt-8 pb-2 bg-orange-gradient">
            <motion.div className="text-center mb-4" variants={itemVariants}>
              <motion.div 
                className="coin mx-auto mb-4" 
                animate={{ rotateY: 360 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                ₹
              </motion.div>
              <h2 className="text-2xl font-bold text-white">
                {translate('login', language)}
              </h2>
              <p className="text-white/80 mt-1">
                अपने खाते तक पहुंचने के लिए लॉगिन करें
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
              
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="phoneNumber" className="text-gray-700">
                  {translate('username', language)}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-orange focus:border-coin-orange"
                  placeholder="आपका फोन नंबर दर्ज करें"
                />
              </motion.div>
              
              <motion.div className="space-y-2" variants={itemVariants}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700">
                    {translate('password', language)}
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-coin-purple hover:text-coin-purple-dark">
                    {translate('forgotPassword', language)}?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-orange focus:border-coin-orange pr-10"
                    placeholder="आपका पासवर्ड दर्ज करें"
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
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-coin-gradient hover:opacity-90 text-white font-bold button-shimmer" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{translate('loading', language)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <LogIn className="h-5 w-5" />
                      <span>{translate('login', language)}</span>
                      <Sparkles className="h-4 w-4 text-yellow-300" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
            
            <motion.div 
              className="mt-8 py-4 px-6 bg-yellow-50 rounded-xl border-2 border-dashed border-coin-yellow relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-gradient"></div>
              <h3 className="font-medium text-coin-orange flex items-center">
                <span className="text-xl mr-2">💡</span> आज का टिप
              </h3>
              <p className="text-sm mt-2 text-gray-700">{randomTip}</p>
            </motion.div>
            
            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <p className="text-gray-600">
                खाता नहीं है?{' '}
                <Link to="/signup" className="text-coin-purple font-medium hover:underline">
                  {translate('signup', language)}
                </Link>
              </p>
            </motion.div>
          </div>
          
          {/* Decorative patterns */}
          <motion.div 
            className="absolute top-1/2 right-1 w-4 h-4 bg-coin-orange rounded-full opacity-30"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-12 left-2 w-3 h-3 bg-coin-purple rounded-full opacity-30"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-4 text-center text-white text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>🔒 आपकी जानकारी सुरक्षित है</p>
      </motion.div>
    </div>
  );
};

export default Login;
