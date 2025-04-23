import { Bell, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/context/AppContext";
import { translate, getRandomGreeting } from "@/utils/translate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { coinFlip, fadeInUp, floating } from "@/utils/animations";

export default function Header() {
  const { user, language, notifications } = useAppContext();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setGreeting(getRandomGreeting(language));
  }, [language]);

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
              variants={coinFlip}
              initial="initial"
              animate="animate"
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              ₹
            </motion.div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-coin-purple to-coin-pink">
              CoinWise
            </div>
          </Link>
          
          {/* <motion.div 
            className="ml-4 px-2 py-1 bg-green-500/10 rounded-full text-xs text-green-600 font-medium"
            variants={floating}
            initial="initial"
            animate="animate"
          >
            ₹50 {translate('saveMoney', language)}
          </motion.div> */}
        </motion.div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSearchClick}
            className="relative rounded-full hover:bg-coin-purple/10 hover:text-coin-purple"
          >
            <motion.div whileHover={{ rotate: 15 }}>
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNotificationClick}
            className="relative rounded-full hover:bg-coin-pink/10 hover:text-coin-pink"
          >
            <motion.div animate={{ rotate: unreadNotifications > 0 ? [0, -5, 5, -5, 5, 0] : 0 }} 
              transition={{ repeat: unreadNotifications > 0 ? Infinity : 0, repeatDelay: 2 }}>
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
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
              onClick={() => setDropdownOpen(!dropdownOpen)}
              >
              <Avatar className="hidden md:flex h-8 w-8 border-2 border-coin-purple/20">
                <AvatarFallback className="bg-purple-gradient text-white">
                  {user?.name?.charAt(0) || 'G'}
                </AvatarFallback>
              </Avatar>
              
              <div className="md:flex flex-col items-start">
                <motion.span 
                  className="text-xs font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={greeting} // Force animation when greeting changes
                >
                  {greeting}
                </motion.span>
                <div className="flex items-center">
                  <motion.span 
                    className="coin text-xs h-4 w-4 mr-1"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ repeat: Infinity, repeatDelay: 5, duration: 1 }}
                  >
                    ₹
                  </motion.span>
                  <span className="text-xs text-orange-500">{user?.points || 0}</span>
                </div>
              </div>
              
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeatDelay: 3, repeat: Infinity }}
                  className="cursor-pointer"
                >
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </motion.div>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    <ul className="py-1">
                      <li>
                      <Button
                      className="w-full justify-start text-left px-4 py-2 bg-white text-sm text-gray-700 hover:bg-yellow-200 flex items-center space-x-2"
                      onClick={() => navigate('/profile')}
                      >
                      <span>👤</span>
                      <span>Profile</span>
                      </Button>
                      </li>
                      <li>
                      <Button
                      className="w-full justify-start text-left px-4 py-2 bg-white text-sm text-gray-700 hover:bg-green-200 flex items-center space-x-2"
                      onClick={() => navigate('/community')}
                      >
                      <span>🌐</span>
                      <span>Community</span>
                      </Button>
                      </li>
                      <li>
                      <Button
                      className="w-full justify-start text-left px-4 py-2 bg-white text-sm text-gray-700 hover:bg-red-200 flex items-center space-x-2"
                      onClick={() => navigate('/login')}
                      >
                      <span>🚪</span>
                      <span>Logout</span>
                      </Button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="h-[2px] w-full bg-gradient-to-r from-coin-pink via-coin-purple to-coin-orange" style={{ animationDuration: '5s' }}></div> </header>
  );
}
