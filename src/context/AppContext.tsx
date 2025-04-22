
import { createContext, useContext, useState } from 'react';
import { User, Badge, LearningModule, Reel, ScamExample, Notification, LanguageKeys } from '@/types';

interface AppContextType {
  user: User;
  allBadges: Badge[];
  allModules: LearningModule[];
  allReels: Reel[];
  scamExamples: ScamExample[];
  activeTab: string;
  notifications: Notification[];
  language: LanguageKeys;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User) => void;
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
  user: {
    id: "user1",
    firstName: "Rahul",
    lastName: "Singh",
    name: "Rahul Singh",
    phoneNumber: "9876543210",
    points: 250,
    coins: 250,
    badges: [],
    progress: [],
    likedContent: ["reel1", "reel3"],
    savedContent: ["reel2"],
    level: 1,
    email: "",
    knowledgeLevel: "",
    preferredCategories: [],
    completedModules: [],
    completedGames: []
  },
  allBadges: [],
  allModules: [],
  allReels: [],
  scamExamples: [],
  activeTab: 'home',
  notifications: [],
  language: 'english',
  updateUser: () => {},
  setUser: () => {},
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

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User>(defaultContextValue.user);
  const [allBadges, setAllBadges] = useState<Badge[]>(defaultContextValue.allBadges);
  const [allModules, setAllModules] = useState<LearningModule[]>(defaultContextValue.allModules);
  const [allReels, setAllReels] = useState<Reel[]>(defaultContextValue.allReels);
  const [scamExamples, setScamExamples] = useState<ScamExample[]>(defaultContextValue.scamExamples);
  const [activeTab, setActiveTab] = useState(defaultContextValue.activeTab);
  const [notifications, setNotifications] = useState<Notification[]>(defaultContextValue.notifications);
  const [language, setLanguage] = useState<LanguageKeys>('english');

  const setUser = (user: User) => {
    setUserState(user);
  };

  const updateUser = (userData: Partial<User>) => {
    setUserState(prevUser => ({ ...prevUser, ...userData }));
  };

  const addCoins = (amount: number) => {
    setUserState(prevUser => ({
      ...prevUser,
      coins: prevUser.coins + amount
    }));
  };

  const unlockBadge = (badgeId: string) => {
    const updatedBadges = allBadges.map(badge =>
      badge.id === badgeId ? { ...badge, unlocked: true } : badge
    );
    setAllBadges(updatedBadges);
  };

  const likeContent = (contentId: string) => {
    setUserState(prevUser => ({
      ...prevUser,
      likedContent: prevUser.likedContent.includes(contentId)
        ? prevUser.likedContent.filter(id => id !== contentId)
        : [...prevUser.likedContent, contentId]
    }));
  };

  const saveContent = (contentId: string) => {
    setUserState(prevUser => ({
      ...prevUser,
      savedContent: prevUser.savedContent.includes(contentId)
        ? prevUser.savedContent.filter(id => id !== contentId)
        : [...prevUser.savedContent, contentId]
    }));
  };

  const updateProgress = (moduleId: string, progress: number) => {
    setUserState(prevUser => {
      const updatedProgress = [...prevUser.progress];
      const moduleIndex = updatedProgress.findIndex(p => p.moduleId === moduleId);

      if (moduleIndex > -1) {
        updatedProgress[moduleIndex] = { ...updatedProgress[moduleIndex], progress };
      } else {
        updatedProgress.push({ moduleId, progress, completed: false, lastAccessed: new Date() });
      }

      return { ...prevUser, progress: updatedProgress };
    });
  };

  const completeModule = (moduleId: string) => {
    setUserState(prevUser => {
      const updatedProgress = prevUser.progress.map(p =>
        p.moduleId === moduleId ? { ...p, completed: true } : p
      );
      const updatedCompletedModules = [...prevUser.completedModules];
      if (!updatedCompletedModules.includes(moduleId)) {
        updatedCompletedModules.push(moduleId);
      }
      return { 
        ...prevUser, 
        progress: updatedProgress,
        completedModules: updatedCompletedModules
      };
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
      allModules,
      allReels,
      scamExamples,
      activeTab,
      notifications,
      language,
      updateUser,
      setUser,
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
