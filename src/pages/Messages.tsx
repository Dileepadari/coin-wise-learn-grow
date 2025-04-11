
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Check, X, Send } from "lucide-react";

export default function Messages() {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      senderId: 'user2',
      senderName: 'Priya Sharma',
      content: 'Hello, I saw your post about saving. Can you share some tips?',
      timestamp: new Date(2023, 3, 15, 14, 30)
    },
    {
      id: 'msg2',
      senderId: 'user3',
      senderName: 'Amit Kumar',
      content: 'Thanks for the advice yesterday!',
      timestamp: new Date(2023, 3, 14, 10, 15)
    }
  ]);
  
  const [borrowRequests, setBorrowRequests] = useState([
    {
      id: 'req1',
      requesterId: 'user4',
      requesterName: 'Sunita Patel',
      amount: 200,
      purpose: 'Phone recharge',
      timestamp: new Date(2023, 3, 15, 9, 45),
      status: 'pending'
    },
    {
      id: 'req2',
      requesterId: 'user5',
      requesterName: 'Vikram Singh',
      amount: 500,
      purpose: 'Medicine',
      timestamp: new Date(2023, 3, 14, 16, 20),
      status: 'pending'
    }
  ]);
  
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleAcceptRequest = (reqId: string) => {
    setBorrowRequests(borrowRequests.map(req => 
      req.id === reqId ? { ...req, status: 'accepted' } : req
    ));
  };
  
  const handleDeclineRequest = (reqId: string) => {
    setBorrowRequests(borrowRequests.map(req => 
      req.id === reqId ? { ...req, status: 'declined' } : req
    ));
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Chats and borrow requests</p>
        </div>
        
        <div className="space-y-6">
          {messages.map(message => (
            <div key={message.id} className="border rounded-lg p-4 bg-card">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {message.senderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">
                      {message.senderName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          <h2 className="font-semibold text-lg pt-2">Borrow Requests</h2>
          
          {borrowRequests.map(request => (
            <div key={request.id} className="border rounded-lg p-4 bg-card">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {request.requesterName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">
                      {request.requesterName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(request.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-2">
                    <span className="font-medium">₹{request.amount}</span> for {request.purpose}
                  </p>
                  
                  {request.status === 'pending' ? (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        <X className="h-4 w-4 mr-1" /> Decline
                      </Button>
                    </div>
                  ) : (
                    <div className={`text-sm font-medium ${
                      request.status === 'accepted' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && borrowRequests.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No messages or requests yet</p>
              <Button variant="outline" className="mt-4">
                <Send className="h-4 w-4 mr-2" />
                Start a conversation
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
