
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Shield } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unread: number;
  online: boolean;
}

export default function Messages() {
  const { user } = useAppContext();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "contact1",
      name: "Financial Advisor",
      lastMessage: "How can I help you with your savings plan today?",
      lastMessageTime: new Date(2023, 5, 15, 14, 30),
      unread: 1,
      online: true
    },
    {
      id: "contact2",
      name: "Ravi Kumar",
      lastMessage: "Thanks for the investment tip!",
      lastMessageTime: new Date(2023, 5, 14, 9, 45),
      unread: 0,
      online: false
    },
    {
      id: "contact3",
      name: "Scam Alert Bot",
      lastMessage: "New alert: Be aware of this UPI scam going around...",
      lastMessageTime: new Date(2023, 5, 13, 16, 20),
      unread: 2,
      online: true
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1",
      senderId: "contact1",
      receiverId: user.id,
      text: "Hello! I'm your financial advisor. How can I help you today?",
      timestamp: new Date(2023, 5, 15, 14, 0),
      read: true
    },
    {
      id: "msg2",
      senderId: user.id,
      receiverId: "contact1",
      text: "Hi, I wanted to know how I can start saving with a small income",
      timestamp: new Date(2023, 5, 15, 14, 5),
      read: true
    },
    {
      id: "msg3",
      senderId: "contact1",
      receiverId: user.id,
      text: "That's a great question! Even with a small income, you can start by saving just ₹10 per day. By the end of a month, you'll have saved ₹300, and by year-end, ₹3,650!",
      timestamp: new Date(2023, 5, 15, 14, 10),
      read: true
    },
    {
      id: "msg4",
      senderId: "contact1",
      receiverId: user.id,
      text: "Would you like me to help you create a simple savings plan?",
      timestamp: new Date(2023, 5, 15, 14, 30),
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chatMessages = selectedContact
    ? messages.filter(
        msg =>
          (msg.senderId === selectedContact.id && msg.receiverId === user.id) ||
          (msg.senderId === user.id && msg.receiverId === selectedContact.id)
      )
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      receiverId: selectedContact.id,
      text: newMessage,
      timestamp: new Date(),
      read: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update last message in contacts
    setContacts(
      contacts.map(contact =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              lastMessage: newMessage,
              lastMessageTime: new Date()
            }
          : contact
      )
    );
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    setMessages(
      messages.map(msg =>
        msg.senderId === contact.id && msg.receiverId === user.id
          ? { ...msg, read: true }
          : msg
      )
    );
    // Update unread count
    setContacts(
      contacts.map(c =>
        c.id === contact.id ? { ...c, unread: 0 } : c
      )
    );
  };

  return (
    <Layout>
      <div className="container px-0 pb-20 h-[calc(100vh-9rem)] flex">
        {/* Contacts sidebar */}
        <div className={`w-full ${selectedContact ? "hidden md:block" : ""} md:w-1/3 border-r`}>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className={`flex items-center p-4 hover:bg-accent cursor-pointer ${
                  selectedContact?.id === contact.id ? "bg-accent" : ""
                }`}
                onClick={() => selectContact(contact)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {contact.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-sm">
                      {contact.name}
                      {contact.id === "contact1" && (
                        <Badge variant="secondary" className="ml-2 py-0 text-xs">
                          Advisor
                        </Badge>
                      )}
                      {contact.id === "contact3" && (
                        <Badge variant="outline" className="ml-2 py-0 text-xs flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Bot
                        </Badge>
                      )}
                    </h3>
                    {contact.lastMessageTime && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(contact.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`w-full ${selectedContact ? "" : "hidden md:block"} md:w-2/3 flex flex-col`}>
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden mr-2"
                  onClick={() => setSelectedContact(null)}
                >
                  Back
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {selectedContact.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium text-sm">{selectedContact.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.senderId === user.id ? "justify-end" : ""
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.senderId === user.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70 text-right">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 text-center">
              <Card className="max-w-md w-full md:py-8">
                <CardContent>
                  <h2 className="text-xl font-bold mb-2 mt-6">Welcome to Messages</h2>
                  <p className="text-muted-foreground">
                    Select a conversation to start chatting with financial advisors and friends
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
