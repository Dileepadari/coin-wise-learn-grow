
import { useApp } from "@/context/AppContext";
import { Home, Gamepad2, BookOpen, Users, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { translate } from "@/utils/translate";
import { motion } from "framer-motion";
import { bounceIn, fadeInUp, popIn } from "@/utils/animations";

export default function TabBar() {
  const { activeTab, setActiveTab, language } = useApp();
  const location = useLocation();

  const tabs = [
    {
      id: 'home',
      label: translate('reels', language),
      icon: Home,
      path: '/',
      color: 'text-coin-purple',
      emoji: '📱',
      message: {
        english: "Check new reels!",
        hindi: "नई रील्स देखें!",
        telugu: "కొత్త రీల్స్ చూడండి!"
      }
    },
    {
      id: 'games',
      label: translate('games', language),
      icon: Gamepad2,
      path: '/games',
      color: 'text-coin-orange',
      emoji: '🎮',
      message: {
        english: "Play & earn!",
        hindi: "खेलें और कमाएं!",
        telugu: "ఆడండి & సంపాదించండి!"
      }
    },
    {
      id: 'learn',
      label: translate('learn', language),
      icon: BookOpen,
      path: '/learn',
      color: 'text-green-500',
      emoji: '📚',
      message: {
        english: "Learn with fun!",
        hindi: "मज़े से सीखें!",
        telugu: "సరదాగా నేర్చుకోండి!"
      }
    },
    {
      id: 'community',
      label: translate('community', language),
      icon: Users,
      path: '/community',
      color: 'text-blue-500',
      emoji: '👥',
      message: {
        english: "Join friends!",
        hindi: "दोस्तों से जुड़ें!",
        telugu: "స్నేహితులతో చేరండి!"
      }
    },
    {
      id: 'profile',
      label: translate('profile', language),
      icon: User,
      path: '/profile',
      color: 'text-coin-pink',
      emoji: '👤',
      message: {
        english: "Your progress!",
        hindi: "आपकी प्रगति!",
        telugu: "మీ పురోగతి!"
      }
    }
  ];

  // Update active tab based on current path
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname, setActiveTab]);

  return (
    <div className="tab-navigation">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={cn(
              "tab-item hover-float",
              isActive ? `${tab.color} font-medium tab-active` : "text-gray-500"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {isActive ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <tab.icon className="h-6 w-6 mb-1" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center text-[8px]"
                  variants={popIn}
                  initial="initial"
                  animate="animate"
                >
                  <Sparkles className="h-2 w-2 text-white" />
                </motion.div>
              </motion.div>
            ) : (
              <tab.icon className="h-6 w-6 mb-1" />
            )}
            <span>{tab.label}</span>
            
            {isActive && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="mt-1 flex flex-col text-xs opacity-70"
              >
                <span className="text-[10px]">{tab.message[language]}</span>
                <motion.div 
                  variants={bounceIn}
                  initial="initial" 
                  animate="animate" 
                  transition={{ delay: 0.3 }}
                >
                  {tab.emoji}
                </motion.div>
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
