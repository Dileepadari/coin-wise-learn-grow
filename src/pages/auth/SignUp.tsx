import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo signup logic
    if (name && (email || phone) && password && password === confirmPassword) {
      login({
        id: "user1",
        name: name,
        phoneNumber: phone || "9876543210",
        points: 0,
        coins: 10,
        level: 1,
        badges: [],
        completedModules: [],
        completedGames: [],
        knowledgeLevel: "beginner",
        preferredCategories: [],
        likedContent: [],
        savedContent: [],
        progress: []
      });
      
      toast({
        title: "Signed up!",
        description: "You're all set. Welcome aboard!",
      });
      navigate("/");
    } else {
      if (!name) {
        toast({
          title: "Uh oh!",
          description: "Name is required.",
          variant: "destructive",
        });
      } else if (!email && !phone) {
        toast({
          title: "Uh oh!",
          description: "Email or phone number is required.",
          variant: "destructive",
        });
      } else if (password !== confirmPassword) {
        toast({
          title: "Uh oh!",
          description: "Passwords do not match.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Uh oh!",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input 
              type="tel" 
              placeholder="Your Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </div>
      </div>
    </div>
  );
}
