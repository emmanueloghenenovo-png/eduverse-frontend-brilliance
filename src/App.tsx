import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AidFlow from "./pages/AidFlow";
import HelpDesk from "./pages/HelpDesk";
import TalentStage from "./pages/TalentStage";
import Portfolio from "./pages/Portfolio";
import Opportunities from "./pages/Opportunities";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aidflow" element={<AidFlow />} />
            <Route path="/helpdesk" element={<HelpDesk />} />
            <Route path="/talentstage" element={<TalentStage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
