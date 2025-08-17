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
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Placeholder pages for Phase 2
const PlaceholderPage = ({ title }: { title: string }) => (
  <PageLayout>
    <div className="container py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-4">
        This page will be implemented in Phase 2 of the project.
      </p>
    </div>
  </PageLayout>
);

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.PROD ? '/Energy-Coder-Club-Website' : '/'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Phase 2 Routes (currently placeholders) */}
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} />
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
