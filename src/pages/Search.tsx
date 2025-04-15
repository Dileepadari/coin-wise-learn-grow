
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ArrowLeft, Users, BookOpen, Gamepad2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Search() {
  const navigate = useNavigate();
  const { allModules } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for users
  const users = [
    { id: "user1", name: "Raj Kumar", username: "@rajkumar" },
    { id: "user2", name: "Priya Sharma", username: "@priyasharma" },
    { id: "user3", name: "Amit Kumar", username: "@amitk" },
    { id: "user4", name: "Sunita Patel", username: "@sunitap" },
  ];
  
  const filteredModules = searchQuery
    ? allModules.filter(
        module =>
          module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
    
  const filteredUsers = searchQuery
    ? users.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const hasResults = filteredModules.length > 0 || filteredUsers.length > 0;
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-4 flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="flex-none">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for modules, users..."
              className="pl-9 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {searchQuery && (
          <>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4 space-y-6">
                {!hasResults && (
                  <div className="text-center py-8">
                    <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="font-medium text-lg mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try a different search term or browse categories
                    </p>
                  </div>
                )}
                
                {filteredModules.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Learning Modules
                    </h3>
                    <div className="space-y-2">
                      {filteredModules.slice(0, 3).map(module => (
                        <div
                          key={module.id}
                          className="p-3 border rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => navigate(`/learn/module/${module.id}`)}
                        >
                          <h4 className="font-medium">{module.name}</h4>
                          <p className="text-sm text-muted-foreground">{module.description.slice(0, 60)}...</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {filteredUsers.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Users
                    </h3>
                    <div className="space-y-2">
                      {filteredUsers.map(user => (
                        <div
                          key={user.id}
                          className="p-3 border rounded-md hover:bg-accent cursor-pointer flex items-center"
                          onClick={() => navigate(`/user/${user.id}`)}
                        >
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.username}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="modules" className="mt-4">
                {filteredModules.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="font-medium text-lg mb-2">No modules found</h3>
                    <p className="text-muted-foreground">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredModules.map(module => (
                      <div
                        key={module.id}
                        className="p-4 border rounded-md hover:bg-accent cursor-pointer"
                        onClick={() => navigate(`/learn/module/${module.id}`)}
                      >
                        <h4 className="font-medium">{module.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex items-center text-xs">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                            {module.category}
                          </span>
                          <span className="ml-2 text-muted-foreground">
                            {module.content.length + module.quizzes.length} lessons
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="users" className="mt-4">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="font-medium text-lg mb-2">No users found</h3>
                    <p className="text-muted-foreground">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className="p-4 border rounded-md hover:bg-accent cursor-pointer flex items-center"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarFallback>
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {!searchQuery && (
          <div className="mt-8">
            <h3 className="font-medium mb-4">Popular searches</h3>
            <div className="flex flex-wrap gap-2">
              {["Savings", "UPI Safety", "Investment", "Budget Planning", "Mobile Banking", "Credit Score"].map(term => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
