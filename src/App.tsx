import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages for code splitting
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const NotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));
const JoinPage = React.lazy(() => import("@/pages/JoinPage").then(module => ({ default: module.JoinPage })));
const FeishuJoinFormPage = React.lazy(() => import("@/pages/FeishuJoinFormPage").then(module => ({ default: module.FeishuJoinFormPage })));
const DashboardPage = React.lazy(() => import("@/pages/DashboardPage"));
const ProjectsPage = React.lazy(() => import("@/pages/ProjectsPage").then(module => ({ default: module.ProjectsPage })));
const EventsPage = React.lazy(() => import("@/pages/EventsPage").then(module => ({ default: module.EventsPage })));
const ResourcesPage = React.lazy(() => import("@/pages/ResourcesPage").then(module => ({ default: module.ResourcesPage })));
const ContactPage = React.lazy(() => import("@/pages/ContactPage").then(module => ({ default: module.ContactPage })));
const GettingStartedPage = React.lazy(() => import("@/pages/GettingStartedPage"));
const EmbeddedDetailPage = React.lazy(() => import("@/pages/EmbeddedDetailPage"));
const MechanicalDetailPage = React.lazy(() => import("@/pages/MechanicalDetailPage"));
const DesignerDetailPage = React.lazy(() => import("@/pages/DesignerDetailPage"));
const TeamPage = React.lazy(() => import("@/pages/TeamPage").then(module => ({ default: module.TeamPage })));
const InnovationShowcasePage = React.lazy(() => import("@/pages/InnovationShowcasePage").then(module => ({ default: module.InnovationShowcasePage })));
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));
const MarkdownViewer = React.lazy(() => import("@/pages/MarkdownViewer").then(module => ({ default: module.MarkdownViewer })));
const DocumentPage = React.lazy(() => import("@/components/DocumentPage").then(module => ({ default: module.DocumentPage })));
const TechnicalDocsLayout = React.lazy(() => import("@/components/TechnicalDocsLayout").then(module => ({ default: module.TechnicalDocsLayout })));
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import RoutePreloader from "@/components/RoutePreloader";
import { initFontOptimization } from "@/utils/fontOptimization";
import './styles/LinkDetection.css'



function App() {
  // 初始化字体优化
  React.useEffect(() => {
    initFontOptimization();
  }, []);

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <LanguageProvider>
        {typeof window !== 'undefined' ? (
          <TooltipProvider>
          <BrowserRouter>
            <RoutePreloader />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Phase 2 Routes (currently placeholders) */}
            <Route path="/projects" element={<PageLayout><ProjectsPage /></PageLayout>} />
            <Route path="/events" element={<PageLayout><EventsPage /></PageLayout>} />
            <Route path="/resources" element={<PageLayout><ResourcesPage /></PageLayout>} />
            <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
            <Route path="/team" element={<PageLayout><TeamPage /></PageLayout>} />
            <Route path="/innovation" element={<PageLayout><InnovationShowcasePage /></PageLayout>} />
            <Route path="/getting-started" element={<PageLayout><GettingStartedPage /></PageLayout>} />
            <Route path="/learning/embedded" element={<PageLayout><EmbeddedDetailPage /></PageLayout>} />
            <Route path="/learning/mechanical" element={<PageLayout><MechanicalDetailPage /></PageLayout>} />
            <Route path="/learning/designer" element={<PageLayout><DesignerDetailPage /></PageLayout>} />
            
            {/* Document Routes */}
            <Route path="/docs/technical" element={<PageLayout><TechnicalDocsLayout /></PageLayout>} />
            <Route path="/docs/technical/:slug" element={<PageLayout><DocumentPage /></PageLayout>} />
            <Route path="/docs/:category/:subcategory/:slug" element={<PageLayout><DocumentPage /></PageLayout>} />
            <Route path="/docs/:category" element={<PageLayout><DocumentPage /></PageLayout>} />
            <Route path="/docs/:category/:slug" element={<PageLayout><DocumentPage /></PageLayout>} />
            
            {/* Markdown Editor Routes */}
            <Route path="/markdown" element={<PageLayout><MarkdownViewer /></PageLayout>} />
            <Route path="/markdown/editor" element={<PageLayout><MarkdownViewer /></PageLayout>} />
            <Route path="/markdown/viewer" element={<PageLayout><MarkdownViewer /></PageLayout>} />
            <Route path="/join" element={<PageLayout><JoinPage /></PageLayout>} />
            <Route path="/join/form" element={<PageLayout><FeishuJoinFormPage /></PageLayout>} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PageLayout><DashboardPage /></PageLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<PageLayout><AdminDashboard /></PageLayout>} />
            
            <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
          </Routes>
          </Suspense>
          </BrowserRouter>
          <Toaster />
          <Analytics />
          {typeof window !== 'undefined' && <SpeedInsights />}
          </TooltipProvider>
        ) : (
          <BrowserRouter>
            <RoutePreloader />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        )}
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
