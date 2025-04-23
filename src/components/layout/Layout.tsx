
import { ReactNode } from "react";
import Header from "./Header";
import TabBar from "./TabBar";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showTabBar?: boolean;
}

export default function Layout({ 
  children,
  showHeader = true,
  showTabBar = true 
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      
      <main className="flex-1 pt-16 pb-20">
        {children}
            </main>
      
      {showTabBar && <TabBar />}
    </div>
  );
}
