
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Sparkle } from "lucide-react";
import { translate, DEFAULT_LANGUAGE } from "@/utils/translate";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useApp();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // In a real app, this would make an API call
      updateUser({
        phoneNumber,
      });
      
      setLoading(false);
      navigate("/");
    }, 1500);
  };
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-blue-gradient p-4 overflow-hidden">
      {/* Decorative rangoli patterns */}
      <div className="rangoli-decoration top-0 left-0 opacity-10"></div>
      <div className="rangoli-decoration bottom-0 right-0 opacity-10"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="hero-card bg-white">
          {/* Colorful top header */}
          <div className="px-8 pt-8 pb-4 bg-mehendi-gradient">
            <div className="text-center">
              {/* Animated coin symbol */}
              <div className="coin mx-auto mb-4 animate-float">₹</div>
              <h2 className="text-2xl font-bold text-white">
                {translate('welcomeBack', DEFAULT_LANGUAGE)}
              </h2>
              <p className="text-white/80 mt-1">
                अपने खाते तक पहुंचने के लिए लॉगिन करें
              </p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm animate-shake">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  {translate('phoneNumber', DEFAULT_LANGUAGE)}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+91</span>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="अपना फोन नंबर दर्ज करें"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 rounded-xl pl-12 border-2 border-gray-300 focus:border-coin-purple"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    {translate('password', DEFAULT_LANGUAGE)}
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-coin-purple hover:text-coin-purple-dark">
                    {translate('forgotPassword', DEFAULT_LANGUAGE)}?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="अपना पासवर्ड दर्ज करें"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-2 border-gray-300 focus:border-coin-purple pr-10"
                    required
                  />
                  <button 
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-coin-gradient hover:opacity-90 text-white font-bold button-shimmer" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>लॉग इन हो रहा है...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LogIn className="h-5 w-5" />
                    <span>{translate('login', DEFAULT_LANGUAGE)}</span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-coin-orange/40"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-muted-foreground">
                    या इसके साथ लॉगिन करें
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 w-full rounded-xl border-2 border-gray-300 hover:border-coin-purple hover:bg-coin-purple/5">
                  <svg
                    className="mr-2 h-5 w-5 text-coin-purple"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 w-full rounded-xl border-2 border-gray-300 hover:border-coin-blue hover:bg-coin-blue/5">
                  <svg
                    className="mr-2 h-5 w-5 text-coin-blue"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 5.16c-.94.42-1.95.7-3.01.82 1.08-.65 1.91-1.68 2.3-2.9-1.01.6-2.13 1.03-3.32 1.27-1.34-1.43-3.25-2.16-5.33-1.86-4.05.6-6.33 4.95-5.24 8.68-4.45-.22-8.4-2.36-11.04-5.6C4.13 7.78 4.53 9.8 5.9 10.48c-.83-.03-1.63-.26-2.37-.64v.07c0 2.44 1.74 4.49 4.05 4.95-.43.12-.88.18-1.35.18-.33 0-.65-.03-.97-.09.64 2.01 2.5 3.47 4.7 3.51-1.73 1.35-3.9 2.16-6.27 2.16-.4 0-.8-.02-1.19-.07 2.24 1.44 4.9 2.29 7.76 2.29 9.14 0 14.16-7.57 14.16-14.13 0-.21 0-.43-.01-.63.97-.7 1.78-1.57 2.45-2.55z"></path>
                  </svg>
                  Twitter
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                खाता नहीं है?{' '}
                <Link to="/signup" className="text-coin-purple font-medium hover:underline flex items-center justify-center gap-1 mt-1">
                  {translate('signup', DEFAULT_LANGUAGE)}
                  <Sparkle className="h-4 w-4 text-coin-orange animate-bounce-subtle" />
                </Link>
              </p>
            </div>
          </div>
          
          {/* Festive bottom decoration */}
          <div className="h-3 w-full bg-holi-gradient"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-between mt-6">
          <div className="diya"></div>
          <div className="diya"></div>
          <div className="diya"></div>
        </div>
      </div>
    </div>
  );
}
