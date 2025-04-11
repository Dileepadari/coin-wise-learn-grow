
import { useApp } from "@/context/AppContext";
import { ThumbsUp, Bell, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, notifications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-background shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>CoinWise</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Link to="/" onClick={() => setSidebarOpen(false)}>
                  <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                    <ThumbsUp className="h-4 w-4 mr-3" />
                    <span>Liked Content</span>
                  </div>
                </Link>
                <Link to="/saved" onClick={() => setSidebarOpen(false)}>
                  <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                    <Bell className="h-4 w-4 mr-3" />
                    <span>Saved Content</span>
                  </div>
                </Link>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Settings</h3>
                <div className="space-y-1">
                  <Link to="/settings/password" onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                      <span>Change Password</span>
                    </div>
                  </Link>
                  <Link to="/settings/language" onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                      <span>Change Language</span>
                    </div>
                  </Link>
                  <Link to="/help" onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                      <span>FAQ and Help</span>
                    </div>
                  </Link>
                  <Link to="/terms" onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent">
                      <span>Terms & Conditions</span>
                    </div>
                  </Link>
                  <Link to="/login" onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center py-2 px-3 rounded-md hover:bg-accent text-red-500">
                      <span>Logout</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold">CoinWise</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/notifications">
          <div className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>
        </Link>
        <Link to="/search">
          <Search className="h-5 w-5" />
        </Link>
        <Link to="/profile">
          <div className="flex items-center space-x-1">
            <span className="font-medium">₹{user.coins}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
