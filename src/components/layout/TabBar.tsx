
import { useApp } from "@/context/AppContext";
import { Home, Gamepad2, BookOpen, Users, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { translate } from "@/utils/translate";
import { motion } from "framer-motion";

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
      emoji: '📱'
    },
    {
      id: 'games',
      label: translate('games', language),
      icon: Gamepad2,
      path: '/games',
      color: 'text-coin-orange',
      emoji: '🎮'
    },
    {
      id: 'learn',
      label: translate('learn', language),
      icon: BookOpen,
      path: '/learn',
      color: 'text-green-500',
      emoji: '📚'
    },
    {
      id: 'community',
      label: translate('community', language),
      icon: Users,
      path: '/community',
      color: 'text-blue-500',
      emoji: '👥'
    },
    {
      id: 'profile',
      label: translate('profile', language),
      icon: User,
      path: '/profile',
      color: 'text-coin-pink',
      emoji: '👤'
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs opacity-70"
              >
                {tab.emoji}
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
