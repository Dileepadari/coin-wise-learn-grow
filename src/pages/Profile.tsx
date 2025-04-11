
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { ThumbsUp, Bookmark, Settings, HelpCircle, FileText, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user, allBadges } = useApp();
  
  // Filter for unlocked badges
  const unlockedBadges = allBadges.filter(badge => badge.unlocked);
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6 flex items-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xl">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-muted-foreground">{user.phoneNumber}</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Balance</p>
            <p className="text-2xl font-bold">₹{user.coins}</p>
          </div>
          <Link to="/earn">
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
              Earn More
            </Badge>
          </Link>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Liked Content</h2>
            <Link to="/liked" className="text-sm text-primary">
              View All
            </Link>
          </div>
          <Link to="/liked">
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <ThumbsUp className="h-5 w-5 text-muted-foreground" />
              <span>View your liked content</span>
              <span className="ml-auto text-muted-foreground">→</span>
            </div>
          </Link>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Saved Content</h2>
            <Link to="/saved" className="text-sm text-primary">
              View All
            </Link>
          </div>
          <Link to="/saved">
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <Bookmark className="h-5 w-5 text-muted-foreground" />
              <span>View your saved content</span>
              <span className="ml-auto text-muted-foreground">→</span>
            </div>
          </Link>
        </div>
        
        <div className="mb-8">
          <h2 className="font-semibold mb-3">BADGES</h2>
          <div className="badge-grid">
            {allBadges.map(badge => (
              <div
                key={badge.id}
                className={`badge-item ${!badge.unlocked ? "badge-locked" : ""}`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">{badge.image}</div>
                  <p className="text-xs font-medium">{badge.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="font-semibold mb-3">SETTINGS</h2>
          <div className="space-y-2 bg-accent/50 rounded-lg divide-y">
            <Link to="/settings/password">
              <div className="flex items-center space-x-3 p-4">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>Change Password</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </div>
            </Link>
            <Link to="/settings/language">
              <div className="flex items-center space-x-3 p-4">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>Change Language</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </div>
            </Link>
            <Link to="/help">
              <div className="flex items-center space-x-3 p-4">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span>FAQ and Help</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </div>
            </Link>
            <Link to="/terms">
              <div className="flex items-center space-x-3 p-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>Terms & Conditions</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </div>
            </Link>
            <Link to="/login">
              <div className="flex items-center space-x-3 p-4 text-red-500">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
                <span className="ml-auto">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
