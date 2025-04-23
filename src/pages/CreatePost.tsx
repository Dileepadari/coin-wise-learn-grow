
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Image, AtSign, Hash, Send } from "lucide-react";
import { toast } from "sonner";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [postContent, setPostContent] = useState("");
  const [postTopic, setPostTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate post creation delay
    setTimeout(() => {
      toast("Post created successfully!", {
        icon: "✅",
        description: "Your post has been shared with the community."
      });
      
      setIsSubmitting(false);
      navigate("/community");
    }, 1000);
  };
  
  const handleCancel = () => {
    navigate("/community");
  };
  
  const suggestedTopics = [
    "Savings", "Investment", "Budgeting", "Credit Score", "Insurance", "Financial Freedom", "Debt Management"
  ];
  
  return (
    <Layout>
      <div className="container px-4 pb-20">
        <div className="py-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleCancel} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Create Post</h1>
          </div>
          <p className="text-muted-foreground">Share your financial journey with the community</p>
        </div>
        
        <Card className="mb-6">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Post</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Post Topic/Title */}
              <div>
                <div className="flex items-center mb-2">
                  <Hash className="h-4 w-4 text-primary mr-2" />
                  <label htmlFor="topic" className="font-medium">Topic (optional)</label>
                </div>
                <Input
                  id="topic"
                  placeholder="Add a topic for your post"
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Main Content */}
              <div>
                <div className="flex items-center mb-2">
                  <AtSign className="h-4 w-4 text-primary mr-2" />
                  <label htmlFor="content" className="font-medium">What's on your mind?</label>
                </div>
                <Textarea
                  id="content"
                  placeholder="Share your financial tips, questions, or experiences..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>
              
              {/* Suggested Topics */}
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-2">Suggested Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map((topic) => (
                    <Button
                      key={topic}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPostTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => {
                  toast("Feature coming soon!", {
                    description: "Image uploads will be available in the next update."
                  });
                }}
              >
                <Image className="h-4 w-4" />
                Add Image
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  className="flex items-center gap-1"
                  disabled={!postContent.trim() || isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="bg-muted/30 p-4 rounded-md">
          <h3 className="font-medium mb-2">Community Guidelines</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Share constructive financial advice and experiences</li>
            <li>Be respectful and supportive of others</li>
            <li>Don't share personal sensitive financial information</li>
            <li>Avoid promoting specific financial products</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
