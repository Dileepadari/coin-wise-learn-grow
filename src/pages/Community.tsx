
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Character } from "@/components/ui/character-dialog";
import { useAppContext } from "@/context/AppContext";
import { getCelebrityGuide } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, User, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const demoUsers = [
  { id: "1", name: "Anita", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { id: "2", name: "Ramesh", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { id: "3", name: "Priya", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop" },
  { id: "4", name: "Dinesh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
];

const demoPosts = [
  {
    id: "p1",
    user: demoUsers[0],
    content: "Meri sabse acchi bachat tip hai: har din 20 rupay ki mithai na khao, paise bachao! 😂 #SaveMoneyEatLess",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=600&auto=format&fit=crop",
    likes: 42,
    comments: 7,
    time: "2 ghante pehle"
  },
  {
    id: "p2",
    user: demoUsers[1],
    content: "Bhaiyo aur beheno! Mujhe ye investment scheme mili hai, kya koi janta hai ye sahi hai ya nahi? Bahut confused hoon main 🤔",
    likes: 12,
    comments: 23,
    time: "Kal"
  },
  {
    id: "p3",
    user: demoUsers[3],
    content: "Aaj mujhe ek UPI scam call aaya. Dhyan se rahiye dosto! Kisi ko bhi apna OTP na bataye. Maine bacha liya apna paisa 😎 #ScamAlert",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop",
    likes: 78,
    comments: 15,
    time: "Parso"
  },
];

export default function Community() {
  const { user } = useAppContext();
  const celeb = getCelebrityGuide("basics");
  const [activeTab, setActiveTab] = useState("trending");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <Layout>
      <div className="container px-2 pb-20">
        <div className="pt-3 pb-1">
          <Character
            name={celeb.name}
            avatar={celeb.avatar || "🤝"}
            dialog={`Masti karo, milke seekho, aur khoob gyaan baanto! ${celeb.name} ke saath finance pe charcha karo!`}
            category="basics"
            emotion="happy"
          />
        </div>
        
        {/* Search bar */}
        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Samudaay mein kya chal raha hai?"
            className="pl-9 bg-gradient-to-r from-white to-coin-yellow/20 border-0 shadow-sm"
          />
        </div>
        
        {/* Trending users row */}
        <div className="my-4">
          <p className="text-sm font-medium mb-2 text-coin-purple">Popular Saathiyon se jude</p>
          <div className="flex overflow-x-auto space-x-2 py-2 no-scrollbar">
            {demoUsers.map(demoUser => (
              <motion.div 
                key={demoUser.id}
                className="flex-shrink-0 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Avatar className="w-16 h-16 border-2 border-holi-pink">
                  <AvatarImage src={demoUser.avatar} />
                  <AvatarFallback className="bg-holi-yellow text-coin-purple">
                    {demoUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs mt-1">{demoUser.name}</span>
                <Button size="sm" variant="outline" className="mt-1 h-7 text-xs px-2 rounded-full bg-gradient-to-r from-coin-pink to-holi-yellow border-0 text-white">
                  <Plus className="h-3 w-3 mr-1" />
                  Jude
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto no-scrollbar">
          {["trending", "recent", "following"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "text-coin-purple relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-holi-pink before:to-holi-yellow"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "trending" ? "Mashhoor" : tab === "recent" ? "Naya" : "Dost"}
            </button>
          ))}
        </div>
        
        {/* Posts */}
        <div className="space-y-5 py-4">
          {demoPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white to-coin-yellow/10 shadow-sm rounded-xl overflow-hidden border-0"
            >
              {/* Post header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.user.name}</h3>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-coin-purple">
                  <User className="h-4 w-4" />
                  <span className="ml-1 text-xs">Profile</span>
                </Button>
              </div>
              
              {/* Post content */}
              <div className="px-4 pb-2">
                <p className="text-sm">{post.content}</p>
              </div>
              
              {/* Post image */}
              {post.image && (
                <div className="pt-2">
                  <img src={post.image} alt="Post image" className="w-full" />
                </div>
              )}
              
              {/* Post actions */}
              <div className="px-4 py-3 flex justify-between border-t border-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-sm">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAB */}
        <motion.div
          className="fixed bottom-20 right-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="h-14 w-14 rounded-full bg-gradient-to-r from-coin-purple to-coin-pink shadow-lg"
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
