import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { JoinPage } from "@/pages/JoinPage";
import DashboardPage from "@/pages/DashboardPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { EventsPage } from "@/pages/EventsPage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { ContactPage } from "@/pages/ContactPage";
import { DisplayRatioPage } from "@/pages/DisplayRatioPage";
import { TeamPage } from "@/pages/TeamPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LanguageProvider } from "@/contexts/LanguageContext";



function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Phase 2 Routes (currently placeholders) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/display-ratio" element={<DisplayRatioPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
