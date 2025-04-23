
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAppContext } from "@/context/AppContext";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Bell,
  BadgeCheck,
  Users,
  Clock,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const { notifications, markNotificationAsRead } = useAppContext();
  const navigate = useNavigate();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <BadgeCheck className="h-5 w-5 text-green-500" />;
      case 'social':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handleNotificationClick = (id: string, actionLink?: string) => {
    markNotificationAsRead(id);
    
    if (actionLink) {
      navigate(actionLink);
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your activity
            </p>
          </div>
        </div>
        
        {notifications.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
              <h3 className="font-medium text-lg mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you have new notifications, they will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                  notification.read ? "opacity-70" : ""
                }`}
                onClick={() => handleNotificationClick(notification.id, notification.actionLink)}
              >
                <CardContent className="p-4 flex items-start">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary absolute top-4 right-3"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
