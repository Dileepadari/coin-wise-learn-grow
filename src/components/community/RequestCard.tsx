
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

interface RequestCardProps {
  id: string;
  userName: string;
  status: 'pending' | 'accepted' | 'declined';
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isSendRequest?: boolean;
  userId: string;
}

export default function RequestCard({ id, userName, status, onAccept, onDecline, isSendRequest = false, userId }: RequestCardProps) {
  const navigate = useNavigate();
  const { addNotification } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAccept = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAccept(id);
      
      // Add notification
      addNotification({
        userId,
        title: "Request Accepted",
        message: `You accepted ${userName}'s connection request`,
        read: false,
        type: "social"
      });
      
      toast("Request accepted", {
        description: `You are now connected with ${userName}`
      });
      
      setIsLoading(false);
    }, 500);
  };
  
  const handleDecline = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onDecline(id);
      
      toast("Request declined", {
        description: "The request has been declined"
      });
      
      setIsLoading(false);
    }, 500);
  };
  
  const handleSendRequest = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast("Request sent", {
        description: `Your request has been sent to ${userName}`
      });
      
      setIsLoading(false);
    }, 500);
  };
  
  const handleOpenChat = () => {
    navigate("/messages");
  };
  
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback className="bg-primary/20 text-primary">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-xs text-muted-foreground">@{userName.toLowerCase().replace(/\s+/g, '')}</p>
        </div>
      </div>
      
      {isSendRequest ? (
        <Button
          size="sm"
          onClick={handleSendRequest}
          disabled={isLoading}
        >
          Send Request
        </Button>
      ) : status === 'accepted' ? (
        <Button
          size="sm"
          variant="outline"
          onClick={handleOpenChat}
        >
          Message
        </Button>
      ) : (
        <div className="space-x-2">
          <Button
            size="sm"
            onClick={handleAccept}
            disabled={isLoading}
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecline}
            disabled={isLoading}
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}
