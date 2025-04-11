
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Badge, LearningModule, ModuleProgress, Notification, Reel, ScamExample, User } from '../types';
import { badges, currentUser, modules, reels, scamExamples } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
  user: User;
  allBadges: Badge[];
  allModules: LearningModule[];
  allReels: Reel[];
  scamExamples: ScamExample[];
  activeTab: string;
  notifications: Notification[];
  updateUser: (userData: Partial<User>) => void;
  addCoins: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  likeContent: (contentId: string) => void;
  saveContent: (contentId: string) => void;
  updateProgress: (moduleId: string, progress: number) => void;
  completeModule: (moduleId: string) => void;
  setActiveTab: (tab: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const defaultContextValue: AppContextType = {
  user: currentUser,
  allBadges: badges,
  allModules: modules,
  allReels: reels,
  scamExamples: scamExamples,
  activeTab: 'home',
  notifications: [],
  updateUser: () => {},
  addCoins: () => {},
  unlockBadge: () => {},
  likeContent: () => {},
  saveContent: () => {},
  updateProgress: () => {},
  completeModule: () => {},
  setActiveTab: () => {},
  addNotification: () => {},
  markNotificationAsRead: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User>(currentUser);
  const [allBadges, setAllBadges] = useState<Badge[]>(badges);
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  const addCoins = (amount: number) => {
    setUser(prevUser => ({
      ...prevUser,
      coins: prevUser.coins + amount
    }));
    
    toast({
      title: "Coins Added!",
      description: `You earned ${amount} coins`,
    });
  };

  const unlockBadge = (badgeId: string) => {
    const updatedBadges = allBadges.map(badge => 
      badge.id === badgeId ? { ...badge, unlocked: true } : badge
    );
    setAllBadges(updatedBadges);
    
    const unlockedBadge = allBadges.find(badge => badge.id === badgeId);
    if (unlockedBadge) {
      addNotification({
        userId: user.id,
        title: "New Badge Unlocked!",
        message: `You've earned the ${unlockedBadge.name} badge`,
        read: false,
        type: "achievement"
      });
      
      toast({
        title: "Badge Unlocked!",
        description: `You've earned the ${unlockedBadge.name} badge`,
      });
    }
  };

  const likeContent = (contentId: string) => {
    if (user.likedContent.includes(contentId)) {
      setUser(prevUser => ({
        ...prevUser,
        likedContent: prevUser.likedContent.filter(id => id !== contentId)
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        likedContent: [...prevUser.likedContent, contentId]
      }));
    }
  };

  const saveContent = (contentId: string) => {
    if (user.savedContent.includes(contentId)) {
      setUser(prevUser => ({
        ...prevUser,
        savedContent: prevUser.savedContent.filter(id => id !== contentId)
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        savedContent: [...prevUser.savedContent, contentId]
      }));
      toast({
        title: "Content Saved",
        description: "You can find this in your saved items",
      });
    }
  };

  const updateProgress = (moduleId: string, progress: number) => {
    const existingProgressIndex = user.progress.findIndex(p => p.moduleId === moduleId);
    
    if (existingProgressIndex >= 0) {
      const newProgress = [...user.progress];
      newProgress[existingProgressIndex] = {
        ...newProgress[existingProgressIndex],
        progress: Math.min(100, progress),
        lastAccessed: new Date()
      };
      setUser(prevUser => ({ ...prevUser, progress: newProgress }));
    } else {
      const newProgressItem: ModuleProgress = {
        moduleId,
        progress,
        completed: false,
        lastAccessed: new Date()
      };
      setUser(prevUser => ({
        ...prevUser,
        progress: [...prevUser.progress, newProgressItem]
      }));
    }
  };

  const completeModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    updateProgress(moduleId, 100);
    addCoins(module.totalPoints);
    
    // Update specific module progress as completed
    setUser(prevUser => ({
      ...prevUser,
      progress: prevUser.progress.map(p => 
        p.moduleId === moduleId 
          ? { ...p, progress: 100, completed: true, lastAccessed: new Date() }
          : p
      )
    }));

    // Check if we should unlock a badge for this module
    if (module.category === 'basics' && !allBadges.find(b => b.id === 'badge1')?.unlocked) {
      unlockBadge('badge1');
    } else if (module.category === 'investment' && !allBadges.find(b => b.id === 'badge2')?.unlocked) {
      unlockBadge('badge2');
    }
    
    toast({
      title: "Module Completed!",
      description: `You've completed ${module.name} and earned ${module.totalPoints} coins!`,
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(note => 
        note.id === notificationId ? { ...note, read: true } : note
      )
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      allBadges,
      allModules: modules,
      allReels: reels,
      scamExamples,
      activeTab,
      notifications,
      updateUser,
      addCoins,
      unlockBadge,
      likeContent,
      saveContent,
      updateProgress,
      completeModule,
      setActiveTab,
      addNotification,
      markNotificationAsRead,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
