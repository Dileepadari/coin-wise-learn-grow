import React, { createContext, useContext, useState } from "react";
import { User } from "@/types";

export interface Notification {
  id: string;
  title: string; // Add this line
  message: string;
  read: boolean;
  actionLink?: string;
  type: 'achievement' | 'social' | 'reminder' | 'general';
  timestamp: Date; // Add this line
}

export interface AppContextType {
  user: User;
  language: 'english' | 'hindi' | 'telugu';
  notifications: Notification[];
  setLanguage: (language: 'english' | 'hindi' | 'telugu') => void;
  likeContent: (contentId: string) => void;
  saveContent: (contentId: string) => void;
  addCoins: (amount: number) => void;
  addPoints: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  markNotificationAsRead: (id: string) => void;
  logout: () => void;
  activeTab: string; // Add this line
  setActiveTab: (tab: string) => void; // Add this line
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void; // Add this line
  updateUser: (userData: Partial<User>) => void; // Add this line
}

const defaultUser: User = {
  id: "user1",
  name: "Raju",
  email: "raju@example.com",
  phoneNumber: "9876543210",
  points: 120,
  coins: 50,
  level: 2,
  xp: 67,
  streak: 3,
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  badges: ["savings-master", "fraud-detector"],
  completedModules: [],
  completedGames: [],
  knowledgeLevel: "beginner",
  preferredCategories: ["savings", "basics"],
  likedContent: ["reel1", "reel3"],
  savedContent: ["reel2"],
  progress: []
};

const AppContext = createContext<AppContextType>({
  user: defaultUser,
  language: 'english',
  notifications: [],
  setLanguage: () => {},
  likeContent: () => {},
  saveContent: () => {},
  addCoins: () => {},
  addPoints: () => {},
  completeModule: () => {},
  markNotificationAsRead: () => {},
  logout: () => {},
  activeTab: "home", // Add this line
  setActiveTab: () => {}, // Add this line
  addNotification: () => {}, // Add this line
  updateUser: () => {} // Add this line
});

export const useAppContext = () => useContext(AppContext);

const updateLikedContent = (user: User, contentId: string): string[] => {
  if (user.likedContent.includes(contentId)) {
    return user.likedContent.filter(id => id !== contentId);
  } else {
    return [...user.likedContent, contentId];
  }
};

const updateSavedContent = (user: User, contentId: string): string[] => {
  if (user.savedContent.includes(contentId)) {
    return user.savedContent.filter(id => id !== contentId);
  } else {
    return [...user.savedContent, contentId];
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'telugu'>('english');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<string>("home"); // Add this line

  const likeContent = (contentId: string) => {
    setUser(prev => ({
      ...prev,
      likedContent: updateLikedContent(prev, contentId)
    }));
  };

  const saveContent = (contentId: string) => {
    setUser(prev => ({
      ...prev,
      savedContent: updateSavedContent(prev, contentId)
    }));
  };

  const addCoins = (amount: number) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  const addPoints = (amount: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + amount
    }));
  };

  const completeModule = (moduleId: string) => {
    setUser(prev => ({
      ...prev,
      completedModules: [...prev.completedModules, moduleId]
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const logout = () => {
    setUser(defaultUser);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...userData })); // Add this function
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]); // Add this function
  };

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        notifications,
        setLanguage,
        likeContent,
        saveContent,
        addCoins,
        addPoints,
        completeModule,
        markNotificationAsRead,
        logout,
        activeTab, // Add this line
        setActiveTab, // Add this line
        addNotification, // Add this line
        updateUser // Add this line
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
