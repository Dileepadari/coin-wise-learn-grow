import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo login logic
    if ((email || phone) && password) {
      login({
        id: "user1",
        name: "Raju Kumar",
        phoneNumber: phone || "9876543210",
        points: 120,
        coins: 50,
        level: 1,
        badges: [],
        completedModules: [],
        completedGames: [],
        knowledgeLevel: "beginner",
        preferredCategories: ["savings"],
        likedContent: [],
        savedContent: [],
        progress: []
      });
      
      setLoading(false);
      navigate("/");
      toast({
        title: "Login Successful!",
        description: `Welcome back, Raju! Let's learn something new today.`,
      });
    } else {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: "Please enter your email/phone and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-6 text-white lg:flex bg-coin-purple">
        <div className="relative z-20 mt-auto">
          <h2 className="space-y-2 text-2xl font-semibold tracking-tight">
            Learn about money, earn rewards
          </h2>
          <p className="text-muted-foreground">
            Join our community and start your journey to financial freedom.
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or Phone</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email or phone number"
                    type="text"
                    value={email || phone}
                    onChange={(e) => {
                      if (e.target.value.includes('@')) {
                        setEmail(e.target.value);
                        setPhone('');
                      } else {
                        setPhone(e.target.value);
                        setEmail('');
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" disabled>
                Google
              </Button>
              <Button variant="outline" disabled>
                Facebook
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/signup"
              className="hover:text-primary underline underline-offset-4"
            >
              Don't have an account? Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
