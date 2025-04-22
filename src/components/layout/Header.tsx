
import { Bell, Search, Settings, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/context/AppContext";
import { translate } from "@/utils/translate";
import { motion } from "framer-motion";

export default function Header() {
  const { user, language, notifications } = useApp();
  const navigate = useNavigate();
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = () => {
    navigate("/notifications");
  };
  
  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-coin-purple/20">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="h-9 w-9 bg-purple-gradient rounded-full flex items-center justify-center text-white font-bold text-lg"
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              ₹
            </motion.div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-coin-purple to-coin-pink">
              CoinWise
            </div>
          </Link>
          
          <motion.div 
            className="ml-4 px-2 py-1 bg-green-500/10 rounded-full text-xs text-green-600 font-medium"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ₹50 {translate('saveMoney', language)}
          </motion.div>
        </motion.div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSearchClick}
            className="relative rounded-full hover:bg-coin-purple/10 hover:text-coin-purple"
          >
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNotificationClick}
            className="relative rounded-full hover:bg-coin-pink/10 hover:text-coin-pink"
          >
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            {unreadNotifications > 0 && (
              <motion.span 
                className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-coin-red text-[10px] text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {unreadNotifications}
              </motion.span>
            )}
          </Button>
          
          <div className="relative ml-2">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-coin-purple/10"
              onClick={() => navigate('/profile')}
            >
              <Avatar className="h-8 w-8 border-2 border-coin-purple/20">
                <AvatarFallback className="bg-purple-gradient text-white">
                  {user?.name?.charAt(0) || 'G'}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-medium">{user?.name || "गेस्ट"}</span>
                <div className="flex items-center">
                  <span className="coin text-xs h-4 w-4 mr-1">₹</span>
                  <span className="text-xs text-orange-500">{user?.points || 0}</span>
                </div>
              </div>
              
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated gradient strip at bottom */}
      <div className="h-[2px] w-full bg-gradient-to-r from-coin-pink via-coin-purple to-coin-orange animate-shimmer"></div>
    </header>
  );
}
