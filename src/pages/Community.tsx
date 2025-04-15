
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ThumbsUp, Share2, MoreVertical, Edit, Trash2, X, Plus, UserPlus, MessageSquare, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestCard from "@/components/community/RequestCard";
import { Input } from "@/components/ui/input";

export default function Community() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [posts, setPosts] = useState([
    {
      id: 'post1',
      userId: 'user2',
      userName: 'Priya Sharma',
      content: 'Just completed my first savings goal! So excited to have saved ₹5,000 in just 2 months using the daily saving tip.',
      likes: 12,
      timestamp: new Date(2023, 3, 15)
    },
    {
      id: 'post2',
      userId: 'user3',
      userName: 'Amit Kumar',
      content: 'Thanks to the scam detection training, I caught a fake bank message yesterday that was trying to steal my UPI PIN.',
      likes: 24,
      timestamp: new Date(2023, 3, 14)
    },
    {
      id: 'post3',
      userId: 'user4',
      userName: 'Sunita Patel',
      content: "Question: What's better - saving in a fixed deposit or trying small investments?",
      likes: 8,
      timestamp: new Date(2023, 3, 12)
    }
  ]);
  
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  
  // Mock data for pending requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: "req1", userName: "Deepak Verma", status: 'pending' as const, userId: "user10" },
    { id: "req2", userName: "Meera Shah", status: 'pending' as const, userId: "user11" }
  ]);
  
  // Add mock data for your posts
  const myPosts = posts.filter(post => post.userId === user.id);
  
  const handleCreatePost = () => {
    navigate("/create-post");
  };
  
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };
  
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    
    toast("Post liked!", {
      description: "You liked this post"
    });
  };
  
  const handleStartEdit = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(postId);
      setEditText(post.content);
    }
  };
  
  const handleSaveEdit = () => {
    if (!editingPost) return;
    
    setPosts(posts.map(post => 
      post.id === editingPost ? { ...post, content: editText } : post
    ));
    
    setEditingPost(null);
    setEditText("");
    
    toast("Post updated!", {
      description: "Your changes have been saved"
    });
  };
  
  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditText("");
  };
  
  const handleConfirmDelete = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteConfirm(true);
  };
  
  const handleDeletePost = () => {
    if (!postToDelete) return;
    
    setPosts(posts.filter(post => post.id !== postToDelete));
    setShowDeleteConfirm(false);
    setPostToDelete(null);
    
    toast("Post deleted", {
      description: "Your post has been removed"
    });
  };
  
  const handleShare = (postId: string) => {
    toast("Post shared!", {
      description: "Your contacts will receive this post"
    });
  };
  
  const handleAcceptRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    
    toast("Connection request accepted", {
      description: "You are now connected"
    });
  };
  
  const handleDeclineRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    
    toast("Connection request declined");
  };
  
  const handleViewAllRequests = () => {
    navigate("/connect-requests");
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect and share with others</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/messages")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="default" onClick={handleCreatePost} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs 
            defaultValue="posts" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="requests">
                Requests
                {pendingRequests.length > 0 && (
                  <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-4 space-y-4">
              {posts.map(post => (
                <div key={post.id} className="border rounded-lg p-4 bg-card">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {post.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{post.userName}</h3>
                        
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">
                            {formatTimestamp(post.timestamp)}
                          </span>
                          
                          {post.userId === user.id && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStartEdit(post.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Post
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleConfirmDelete(post.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                      
                      {editingPost === post.id ? (
                        <div className="mb-3">
                          <Textarea
                            className="w-full p-2 border rounded-md resize-none mb-2"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleSaveEdit}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm mb-3">{post.content}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                        <button 
                          className="flex items-center space-x-1 hover:text-primary"
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-1 hover:text-primary"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="requests" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Connection Requests</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewAllRequests}
                >
                  View All
                </Button>
              </div>
              
              {pendingRequests.length === 0 ? (
                <div className="text-center py-6 border rounded-lg">
                  <UserPlus className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                  <h3 className="font-medium mb-2">No pending requests</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any pending connection requests
                  </p>
                  <Button 
                    variant="outline"
                    onClick={handleViewAllRequests}
                  >
                    Find connections
                  </Button>
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
            </TabsContent>
            
            <TabsContent value="my-posts" className="mt-4 space-y-4">
              {myPosts.length === 0 ? (
                <div className="text-center py-6 border rounded-lg">
                  <Edit className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                  <h3 className="font-medium mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't created any posts yet
                  </p>
                  <Button onClick={handleCreatePost}>
                    Create your first post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myPosts.map(post => (
                    <div key={post.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {post.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium">{post.userName}</h3>
                            
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground mr-2">
                                {formatTimestamp(post.timestamp)}
                              </span>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleStartEdit(post.id)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Post
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleConfirmDelete(post.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Post
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          {editingPost === post.id ? (
                            <div className="mb-3">
                              <Textarea
                                className="w-full p-2 border rounded-md resize-none mb-2"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                              />
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                                  Cancel
                                </Button>
                                <Button size="sm" onClick={handleSaveEdit}>
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm mb-3">{post.content}</p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this post? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeletePost}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
