
import { useApp } from "@/context/AppContext";
import { Home, BookOpen, MessageSquare, Users, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function TabBar() {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/'
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
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/messages'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile'
    }
  ];

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
