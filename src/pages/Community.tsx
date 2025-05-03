
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Heart, MessageCircle, Share, Bookmark, Plus, Users, MoreVertical, Search,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for community posts
const posts = [
  {
    id: 1,
    user: {
      name: 'अमित शर्मा',
      avatar: null,
      location: 'मुंबई'
    },
    content: 'मैंने पिछले 6 महीने में हर दिन ₹50 बचाए और अब मैंने अपने बच्चों के लिए एक छोटा सा इमरजेंसी फंड बना लिया है। छोटी बचत, बड़ा सुख!',
    translation: 'I saved ₹50 every day for the past 6 months and now I have created a small emergency fund for my children. Small savings, big happiness!',
    image: '/placeholder.svg',
    likes: 45,
    comments: 12,
    timestamp: '2 घंटे पहले',
    category: 'savings'
  },
  {
    id: 2,
    user: {
      name: 'प्रिया पटेल',
      avatar: null,
      location: 'अहमदाबाद'
    },
    content: 'मैंने एक ऑनलाइन फ्रॉड से बचने में कामयाबी हासिल की! किसी ने मुझे WhatsApp पर "बैंक अधिकारी" के रूप में संपर्क किया और OTP मांगा, लेकिन मुझे धोखाधड़ी डिटेक्शन गेम से सीखे गए संकेतों की याद आई।',
    translation: 'I successfully avoided an online fraud! Someone contacted me on WhatsApp as a "bank officer" and asked for OTP, but I remembered the signs I learned from the fraud detection game.',
    likes: 78,
    comments: 23,
    timestamp: '5 घंटे पहले',
    category: 'fraud'
  },
  {
    id: 3,
    user: {
      name: 'राजेश कुमार',
      avatar: null,
      location: 'कोलकाता'
    },
    content: 'इस ऐप के बजट टूल का उपयोग करके, मैंने अपने खर्च को ट्रैक करना शुरू किया और 3 महीने में ₹15,000 की बचत की! अब मैं अपनी दुकान के लिए नए उपकरण खरीदने की योजना बना रहा हूं।',
    translation: 'By using the budget tool of this app, I started tracking my expenses and saved ₹15,000 in 3 months! Now I am planning to buy new equipment for my shop.',
    image: '/placeholder.svg',
    likes: 112,
    comments: 34,
    timestamp: '1 दिन पहले',
    category: 'savings'
  }
];

// Mock data for community suggestions
const suggestions = [
  {
    id: 1,
    name: 'सुनील वर्मा',
    avatar: null,
    location: 'जयपुर',
    mutualFriends: 3
  },
  {
    id: 2,
    name: 'नेहा गुप्ता',
    avatar: null,
    location: 'लखनऊ',
    mutualFriends: 1
  },
  {
    id: 3,
    name: 'विकास सिंह',
    avatar: null,
    location: 'चंडीगढ़',
    mutualFriends: 2
  },
  {
    id: 4,
    name: 'अनुष्का पांडे',
    avatar: null,
    location: 'भोपाल',
    mutualFriends: 5
  }
];

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  
  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      toast.info('पोस्ट अनलाइक किया गया (Post unliked)');
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast.success('पोस्ट लाइक किया गया! +2 XP (Post liked! +2 XP)');
    }
  };
  
  const handleSave = (postId: number) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast.info('पोस्ट अनसेव किया गया (Post unsaved)');
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast.success('पोस्ट सेव किया गया! (Post saved!)');
    }
  };
  
  const handleComment = (postId: number) => {
    toast.info('कमेंट फीचर जल्द आ रहा है... (Comment feature coming soon...)');
  };
  
  const handleShare = (postId: number) => {
    toast.success('शेयरिंग लिंक कॉपी किया गया! (Sharing link copied!)');
  };
  
  const handleConnect = (userId: number) => {
    toast.success('कनेक्शन अनुरोध भेजा गया! (Connection request sent!)');
  };
  
  const handleCreatePost = () => {
    navigate('/community/create-post');
  };
  
  const handleConnectRequests = () => {
    navigate('/connect-requests');
  };
  
  const handleSearch = () => {
    navigate('/search');
  };

  const handleback = () => {
    navigate(-1);
  };
  
  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🛡️';
      case 'borrowing': return '💸';
      default: return '💡';
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 pt-4 pb-20 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handleback}>
              <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">समुदाय (Community)</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleConnectRequests}>
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="posts">
              कहानियां (Stories)
            </TabsTrigger>
            <TabsTrigger value="connect">
              जुड़ें (Connect)
            </TabsTrigger>
          </TabsList>
          
          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <Button 
              onClick={handleCreatePost}
              className="w-full bg-gradient-to-r from-primary to-accent text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              अपनी सफलता की कहानी शेयर करें
              <br />
              <span className="text-xs">(Share your success story)</span>
            </Button>
            
            {posts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-white">
                          {post.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{post.user.name}</h3>
                        <p className="text-xs text-muted-foreground">{post.user.location} • {post.timestamp}</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      {getCategoryEmoji(post.category)} {post.category}
                    </Badge>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-4 pt-0">
                    <p className="mb-4">{post.content}</p>
                    <p className="text-xs text-muted-foreground mb-4">{post.translation}</p>
                    
                    {post.image && (
                      <div className="h-48 w-full rounded-md overflow-hidden mb-4">
                        <img src={post.image} alt="Post" className="h-full w-full object-cover" />
                      </div>
                    )}
                    
                    {/* Post Actions */}
                    <div className="flex justify-between border-t pt-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart 
                          className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                        <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleComment(post.id)}
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleShare(post.id)}
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSave(post.id)}
                      >
                        <Bookmark 
                          className={`h-4 w-4 ${savedPosts.includes(post.id) ? 'fill-yellow-500 text-yellow-500' : ''}`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Connect Tab */}
          <TabsContent value="connect">
            <h2 className="text-lg font-medium mb-4">सुझाए गए लोग (Suggested People)</h2>
            
            <div className="space-y-4">
              {suggestions.map(person => (
                <Card key={person.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/80 text-white">
                            {person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{person.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {person.location} • {person.mutualFriends} आपस के दोस्त
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleConnect(person.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        जुड़ें
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              और लोगों को खोजें (Find More People)
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
