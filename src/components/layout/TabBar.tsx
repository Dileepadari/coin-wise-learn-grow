
import { useApp } from "@/context/AppContext";
import { Home, Gamepad2, BookOpen, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function TabBar() {
  const { activeTab, setActiveTab } = useApp();
  const location = useLocation();

  const tabs = [
    {
      id: 'home',
      label: 'Reels',
      icon: Home,
      path: '/'
    },
    {
      id: 'games',
      label: 'Games',
      icon: Gamepad2,
      path: '/games'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      path: '/learn'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      path: '/community'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile'
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
      {tabs.map(tab => (
        <Link
          key={tab.id}
          to={tab.path}
          className={cn(
            "tab-item",
            activeTab === tab.id && "tab-active"
          )}
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon className="h-6 w-6 mb-1" />
          <span>{tab.label}</span>
        </Link>
      ))}
    </div>
  );
}
