
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

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
            <textarea
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
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(post.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-3">{post.content}</p>
                  
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
                      <span>Reply</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 hover:text-primary">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
