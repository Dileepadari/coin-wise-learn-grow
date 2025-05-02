import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { translate } from '@/utils/translate';
import { motion } from 'framer-motion';

const Login = () => {
  const { updateUser, language } = useAppContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOtpLogin, setIsOtpLogin] = useState(true); // Set OTP login as default
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleGenerateOtp = () => {
    if (!formData.phoneNumber) {
      setError('Please enter your phone number to generate OTP');
      return;
    }
    setError(null);
    setOtpSent(true);

    // Simulate OTP generation API call
    setTimeout(() => {
      alert('OTP sent to your phone number: 1234'); // Replace with actual OTP logic
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate login API call
    setTimeout(() => {
      if (isOtpLogin) {
        // Handle OTP login
        if (formData.otp === '1234') {
          updateUser({
            id: 'user-123',
            name: 'राजेश कुमार',
            phoneNumber: formData.phoneNumber,
            points: 75,
            level: 1,
            badges: ["नया सितारा", "शुरुआती वित्तीय गुरु"],
            completedModules: [],
            completedGames: [],
            knowledgeLevel: "beginner",
            preferredCategories: ["saving", "budgeting"],
            likedContent: [],
            savedContent: [],
            progress: []
          });
          navigate('/home');
        } else {
          setError('Invalid OTP');
        }
      } else {
        // Handle password login
        updateUser({
          id: 'user-123',
          name: 'राजेश कुमार',
          phoneNumber: formData.phoneNumber,
          points: 75,
          level: 1,
          badges: ["नया सितारा", "शुरुआती वित्तीय गुरु"],
          completedModules: [],
          completedGames: [],
          knowledgeLevel: "beginner",
          preferredCategories: ["saving", "budgeting"],
          likedContent: [],
          savedContent: [],
          progress: []
        });
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const toggleLoginMethod = () => {
    setIsOtpLogin(!isOtpLogin);
    setError(null);
    setFormData({ ...formData, password: '', otp: '' });
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient p-4 bg-festival-pattern">
      <motion.div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-coin-orange relative">
          <div className="px-8 pt-8 pb-2 bg-orange-gradient">
            <motion.div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                {translate('login', language)}
              </h2>
              <p className="text-white/80 mt-1">
                {isOtpLogin
                  ? 'OTP के साथ लॉगिन करें'
                  : 'अपने खाते तक पहुंचने के लिए लॉगिन करें'}
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700">
                  {translate('Phone Number', language)}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-orange focus:border-coin-orange"
                  placeholder="आपका फोन नंबर दर्ज करें"
                />
              </div>

              {isOtpLogin ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-gray-700">
                      {translate('OTP', language)}
                    </Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      value={formData.otp}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-orange focus:border-coin-orange"
                      placeholder="आपका OTP दर्ज करें"
                      disabled={!otpSent}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleGenerateOtp}
                    className="w-full h-12 rounded-xl bg-coin-gradient hover:opacity-90 text-white font-bold button-shimmer"
                  >
                    {otpSent ? 'Resend OTP' : 'Generate OTP'}
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-700">
                      {translate('password', language)}
                    </Label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-coin-purple hover:text-coin-purple-dark"
                    >
                      {translate('forgotPassword', language)}?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-2 border-gray-300 hover:border-coin-orange focus:border-coin-orange pr-10"
                      placeholder="आपका पासवर्ड दर्ज करें"
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
              )}

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
                    <LogIn className="h-5 w-5" />
                    <span>{translate('login', language)}</span>
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={toggleLoginMethod}
                className="text-coin-purple font-medium hover:underline"
              >
                {isOtpLogin
                  ? 'पासवर्ड के साथ लॉगिन करें'
                  : 'OTP के साथ लॉगिन करें'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                खाता नहीं है?{' '}
                <Link
                  to="/auth/signup"
                  className="text-coin-purple font-medium hover:underline"
                >
                  {translate('signup', language)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
