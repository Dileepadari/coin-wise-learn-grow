
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { translate } from "@/utils/translate";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { language } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-coin-purple/10 via-white to-coin-pink/10 bg-festival-pattern">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-coin-purple/30">
          <div className="p-8 pb-4 bg-purple-gradient">
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🔒
              </motion.div>
              <h2 className="text-2xl font-bold text-white">
                {translate('forgotPassword', language)}
              </h2>
              <p className="text-white/80 mt-1 max-w-xs mx-auto">
                चिंता न करें! हम आपको पासवर्ड रीसेट लिंक भेज देंगे
              </p>
            </div>
          </div>

          <div className="p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-gray-700">
                    {translate('phoneNumber', language)}
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-purple focus:border-coin-purple"
                    placeholder="अपना फोन नंबर दर्ज करें"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    आपके नंबर पर एक OTP भेजा जाएगा
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
                      <span>{translate('loading', language)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>OTP भेजें</span>
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div 
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <Sparkles className="h-8 w-8" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800">
                  OTP भेज दिया गया!
                </h3>
                <p className="text-gray-600 mt-2">
                  हमने आपके फोन नंबर <span className="font-medium">{phoneNumber}</span> पर एक OTP भेज दिया है। कृपया अपना पासवर्ड रीसेट करने के लिए OTP दर्ज करें।
                </p>
                
                <div className="mt-6 flex justify-center space-x-3">
                  <Input
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-coin-purple"
                    maxLength={1}
                  />
                  <Input
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-coin-purple"
                    maxLength={1}
                  />
                  <Input
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-coin-purple"
                    maxLength={1}
                  />
                  <Input
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-coin-purple"
                    maxLength={1}
                  />
                </div>
                
                <Button 
                  className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-bold"
                >
                  पासवर्ड रीसेट करें
                </Button>
              </motion.div>
            )}
            
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-coin-purple hover:text-coin-purple-dark"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>{translate('login', language)} पर वापस जाएँ</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Festive decoration */}
        <div className="flex justify-around mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className={`w-3 h-3 rounded-full bg-${['coin-purple', 'coin-orange', 'coin-pink', 'coin-blue', 'coin-yellow'][i % 5]}`}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
