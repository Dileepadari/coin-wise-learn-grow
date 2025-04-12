
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ThumbsUp, MessageSquare, Share2, MoreVertical, Edit, Trash2, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

export default function Community() {
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
  
  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: `post-${Date.now()}`,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      content: newPost,
      likes: 0,
      timestamp: new Date()
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    
    toast("Post shared successfully!", {
      icon: "✅",
      description: "Your community will see your post"
    });
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
      icon: "👍"
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
      icon: "✅"
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
      icon: "🗑️"
    });
  };
  
  const handleShare = (postId: string) => {
    toast("Post shared!", {
      icon: "✅",
      description: "Your contacts will receive this post"
    });
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect and share with others</p>
        </div>
        
        <div className="mb-6">
          <form onSubmit={handlePostSubmit} className="space-y-3">
            <Textarea
              className="w-full p-3 border rounded-lg resize-none min-h-[100px]"
              placeholder="Share your financial journey or ask a question..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newPost.trim()}>
                Post
              </Button>
            </div>
          </form>
        </div>
        
        <div className="space-y-4">
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
                    
                    <button className="flex items-center space-x-1 hover:text-primary">
                      <MessageSquare className="h-4 w-4" />
                      <span>Comment</span>
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
