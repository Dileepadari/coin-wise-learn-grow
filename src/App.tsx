
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Main App Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/chapter/:category" element={<ChapterView />} />
            <Route path="/learn/module/:moduleId" element={<ModuleView />} />
            <Route path="/scam-game" element={<ScamDetectionGame />} />
            <Route path="/financial-sim" element={<FinancialSimulation />} />
            <Route path="/community" element={<Community />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<Search />} />
            <Route path="/connect-requests" element={<ConnectRequests />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
