import { useAppContext } from "@/context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { translate } from "@/utils/translate";
import { motion } from "framer-motion";
import { FaHome, FaGamepad, FaBook, FaUsers, FaUserTie } from "react-icons/fa";

export default function TabBar() {
  const { activeTab, setActiveTab, language } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'learn',
      label: translate('learn', language),
      icon: FaBook,
      path: '/learn',
      color: 'bg-gradient-to-r from-purple-400 to-pink-500',
      emoji: '📖',
      message: {
        english: "Learn new!",
        hindi: "नया सीखें!",
        telugu: "కొత్తదాన్ని నేర్చుకోండి!"
      }
    },
    {
      id: 'games',
      label: translate('games', language),
      icon: FaGamepad,
      path: '/games',
      color: 'bg-gradient-to-r from-green-400 to-blue-500',
      emoji: '🎮',
      message: {
        english: "Play & earn!",
        hindi: "खेलें और कमाएं!",
        telugu: "ఆడి సంపాదించండి!"
      }
    },
    {
      id: 'home',
      label: translate('reels', language),
      icon: FaHome,
      path: '/home',
      color: 'bg-gradient-to-r from-yellow-400 to-red-500',
      emoji: '🏠',
      message: {
        english: "Trending reels!",
        hindi: "ट्रेंडिंग रील्स!",
        telugu: "ట్రెండింగ్ రీల్స్!"
      }
    },
    {
      id: 'community',
      label: translate('community', language),
      icon: FaUsers,
      path: '/community',
      color: 'bg-gradient-to-r to-green-400 from-blue-500',
      emoji: '🤝',
      message: {
        english: "Connect now!",
        hindi: "जुड़ें अभी!",
        telugu: "ఇప్పుడు కనెక్ట్ అవ్వండి!"
      }
    },
    {
      id: 'profile',
      label: translate('profile', language),
      icon: FaUserTie,
      path: '/profile',
      color: 'bg-gradient-to-r from-red-400 to-purple-500',
      emoji: '👤',
      message: {
        english: "Your progress!",
        hindi: "आपकी प्रगति!",
        telugu: "మీ పురోగతి!"
      }
    }
  ];

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname, setActiveTab]);

  return (
    <div className="tab-navigation flex justify-around bg-gray-100 p-2 rounded-lg shadow-lg">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <motion.div
            key={tab.id}
            initial={false}
            animate={{
              translateY: isActive ? -15 : 0,
              borderRadius: isActive ? '1.5rem' : '0.75rem',
              boxShadow: isActive ? '0 10px 20px rgba(0, 0, 0, 0.25)' : 'none',
              zIndex: isActive ? 20 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              "tab-item flex flex-col items-center justify-center p-3 cursor-pointer transition-transform",
              isActive ? `${tab.color} text-white font-bold` : "text-gray-600"
            )}
            onClick={() => {
              setActiveTab(tab.id);
              setTimeout(() => navigate(tab.path), 300); // Delay navigation to allow animation to complete
            }}
          >
            <div
              className={cn(
                "icon-container flex items-center justify-center w-12 h-12 rounded-full",
                isActive ? "bg-opacity-90" : "bg-gray-200"
              )}
            >
              {isActive ? (
                <motion.div
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <tab.icon className="h-6 w-6" />
                </motion.div>
              ) : (
                <tab.icon className="h-6 w-6" />
              )}
            </div>
            <span className="text-xs mt-1">{tab.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
