
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkle, ArrowLeft } from "lucide-react";
import { translate, DEFAULT_LANGUAGE } from "@/utils/translate";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-blue-gradient p-4 overflow-hidden">
      {/* Decorative rangoli patterns */}
      <div className="rangoli-decoration top-0 left-0 opacity-10"></div>
      <div className="rangoli-decoration bottom-0 right-0 opacity-10"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="hero-card bg-white">
          {/* Colorful top header */}
          <div className="px-8 pt-8 pb-4 bg-orange-gradient">
            <div className="text-center">
              {/* Animated coin symbol */}
              <div className="coin mx-auto mb-4 animate-float">
                <Sparkle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {translate('forgotPassword', DEFAULT_LANGUAGE)}
              </h2>
              <p className="text-white/80 mt-1">
                हम आपको एक रीसेट लिंक भेजेंगे
              </p>
            </div>
          </div>

          <div className="p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <p className="text-xs text-muted-foreground mt-1">
                    हम आपको एक वन-टाइम पासवर्ड भेजेंगे
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-coin-gradient hover:opacity-90 text-white font-bold button-shimmer"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>भेजा जा रहा है...</span>
                    </div>
                  ) : (
                    "पासवर्ड रीसेट लिंक भेजें"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Sparkle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">लिंक भेज दिया गया!</h3>
                  <p className="text-muted-foreground">
                    हमने आपके नंबर +91{phoneNumber.slice(-4).padStart(phoneNumber.length, '*')} पर एक पासवर्ड रीसेट लिंक भेज दिया है।
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/login')}
                  className="h-12 rounded-xl bg-blue-gradient hover:opacity-90 text-white font-bold button-shimmer"
                >
                  लॉगिन पर वापस जाएं
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-coin-purple font-medium hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                लॉगिन पर वापस जाएं
              </Link>
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
