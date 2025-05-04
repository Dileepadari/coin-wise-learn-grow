
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Pages
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import ChapterView from "./pages/ChapterView";
import ModuleView from "./pages/ModuleView";
import Games from "./pages/Games";
import ScamDetectionGame from "./pages/ScamDetectionGame";
import FinancialSimulation from "./pages/FinancialSimulation";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import ConnectRequests from "./pages/ConnectRequests";
import OnboardingWelcome from "./pages/onboarding/OnboardingWelcome";
import OnboardingProfile from "./pages/onboarding/OnboardingProfile";
import OnboardingFinance from "./pages/onboarding/OnboardingFinance";
import OnboardingKnowledge from "./pages/onboarding/OnboardingKnowledge";
import OnboardingInterests from "./pages/onboarding/OnboardingInterests";
import OnboardingComplete from "./pages/onboarding/OnboardingComplete";
import Index from "./pages/Index";
import Logout from "./pages/auth/Logout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
          <Route path="/onboarding/profile" element={<OnboardingProfile />} />
          <Route path="/onboarding/finance" element={<OnboardingFinance />} />
          <Route path="/onboarding/knowledge" element={<OnboardingKnowledge />} />
          <Route path="/onboarding/interests" element={<OnboardingInterests />} />
          <Route path="/onboarding/complete" element={<OnboardingComplete />} />
          
            {/* Main App Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/chapter/:category" element={<ChapterView />} />
            <Route path="/learn/module/:moduleId" element={<ModuleView />} />
            <Route path="/games/scam-game" element={<ScamDetectionGame />} />
            <Route path="/games/financial-simulation" element={<FinancialSimulation />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/create-post" element={<CreatePost />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<Search />} />
            <Route path="/connect-requests" element={<ConnectRequests />} />
            <Route path="/auth/logout" element={<Logout />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
