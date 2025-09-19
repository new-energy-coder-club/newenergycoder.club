import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { JoinPage } from "@/pages/JoinPage";
import { FeishuJoinFormPage } from "@/pages/FeishuJoinFormPage";
import DashboardPage from "@/pages/DashboardPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { EventsPage } from "@/pages/EventsPage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { ContactPage } from "@/pages/ContactPage";
import GettingStartedPage from "@/pages/GettingStartedPage";
import EmbeddedDetailPage from "@/pages/EmbeddedDetailPage";
import MechanicalDetailPage from "@/pages/MechanicalDetailPage";
import DesignerDetailPage from "@/pages/DesignerDetailPage";
import { TeamPage } from "@/pages/TeamPage";
import { InnovationShowcasePage } from "@/pages/InnovationShowcasePage";
import AdminDashboard from "@/pages/AdminDashboard";
import { MarkdownViewer } from "@/pages/MarkdownViewer";
import { DocumentPage } from "@/components/DocumentPage";
import { TechnicalDocsLayout } from "@/components/TechnicalDocsLayout";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import './styles/LinkDetection.css'



function App() {
  return (
    <ErrorBoundary>
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
            <Route path="/innovation" element={<InnovationShowcasePage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/learning/embedded" element={<EmbeddedDetailPage />} />
            <Route path="/learning/mechanical" element={<MechanicalDetailPage />} />
            <Route path="/learning/designer" element={<DesignerDetailPage />} />
            
            {/* Document Routes */}
            <Route path="/docs/technical" element={<TechnicalDocsLayout />} />
            <Route path="/docs/technical/:slug" element={<DocumentPage />} />
            <Route path="/docs/:category/:subcategory/:slug" element={<DocumentPage />} />
            <Route path="/docs/:category" element={<DocumentPage />} />
            <Route path="/docs/:category/:slug" element={<DocumentPage />} />
            
            {/* Markdown Editor Routes */}
            <Route path="/markdown" element={<MarkdownViewer />} />
            <Route path="/markdown/editor" element={<MarkdownViewer />} />
            <Route path="/markdown/viewer" element={<MarkdownViewer />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/join/form" element={<FeishuJoinFormPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </BrowserRouter>
          <Toaster />
          <Analytics />
        </TooltipProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
