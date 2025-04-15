
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, UserPlus, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RequestCard from "@/components/community/RequestCard";
import { useApp } from "@/context/AppContext";

export default function ConnectRequests() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for pending requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: "req1", userName: "Deepak Verma", status: 'pending' as const, userId: "user10" },
    { id: "req2", userName: "Meera Shah", status: 'pending' as const, userId: "user11" },
    { id: "req3", userName: "Rahul Singh", status: 'pending' as const, userId: "user12" }
  ]);
  
  // Mock data for connections
  const [connections, setConnections] = useState([
    { id: "conn1", userName: "Priya Sharma", status: 'accepted' as const, userId: "user2" },
    { id: "conn2", userName: "Amit Kumar", status: 'accepted' as const, userId: "user3" }
  ]);
  
  // Mock data for people you may know
  const [peopleYouMayKnow] = useState([
    { id: "user4", userName: "Sunita Patel", userId: "user4" },
    { id: "user5", userName: "Vikram Mehta", userId: "user5" },
    { id: "user6", userName: "Ananya Gupta", userId: "user6" },
    { id: "user7", userName: "Rohan Joshi", userId: "user7" }
  ]);
  
  const handleAcceptRequest = (requestId: string) => {
    const request = pendingRequests.find(req => req.id === requestId);
    
    if (request) {
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
      setConnections(prev => [...prev, { ...request, status: 'accepted' as const }]);
    }
  };
  
  const handleDeclineRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
  };
  
  const filteredConnections = searchQuery
    ? connections.filter(conn => 
        conn.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : connections;
    
  const filteredPeopleYouMayKnow = searchQuery
    ? peopleYouMayKnow.filter(person => 
        person.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : peopleYouMayKnow;
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Connections</h1>
            <p className="text-muted-foreground">
              Manage your network and requests
            </p>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search connections..."
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="requests" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requests" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Requests</span>
              {pendingRequests.length > 0 && (
                <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="connections">
              <UserCheck className="h-4 w-4 mr-2" />
              <span>Connections</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="space-y-4 mt-4">
            <h3 className="font-medium">Pending Requests</h3>
            
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                <h3 className="font-medium text-lg mb-2">No pending requests</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any pending connection requests
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map(request => (
                  <RequestCard 
                    key={request.id}
                    id={request.id}
                    userName={request.userName}
                    status={request.status}
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                    userId={request.userId}
                  />
                ))}
              </div>
            )}
            
            <h3 className="font-medium mt-8">People You May Know</h3>
            {filteredPeopleYouMayKnow.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No suggestions found matching your search
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPeopleYouMayKnow.map(person => (
                  <RequestCard 
                    key={person.id}
                    id={person.id}
                    userName={person.userName}
                    status="pending"
                    onAccept={() => {}}
                    onDecline={() => {}}
                    isSendRequest={true}
                    userId={person.userId}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="connections" className="space-y-4 mt-4">
            {filteredConnections.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <UserCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                <h3 className="font-medium text-lg mb-2">No connections yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start connecting with other users to build your network
                </p>
                <Button onClick={() => navigate("/community")}>
                  Explore Community
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredConnections.map(connection => (
                  <RequestCard 
                    key={connection.id}
                    id={connection.id}
                    userName={connection.userName}
                    status={connection.status}
                    onAccept={() => {}}
                    onDecline={() => {}}
                    userId={connection.userId}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
