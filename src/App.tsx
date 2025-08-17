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
      
      <div className="mt-12 space-y-8">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">关于新能源编程俱乐部</h2>
          <p className="text-muted-foreground leading-relaxed">
            新能源编程俱乐部成立于2023年，由一群热爱编程并致力于可持续发展和可再生能源的开发者和工程师创立。
            我们的使命是建立一个社区，开发用于可再生能源应用、智能电网技术、能源效率和可持续发展的开源软件解决方案。
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">我们的愿景</h3>
          <p className="text-muted-foreground leading-relaxed">
            通过工作坊、黑客马拉松、协作项目以及与能源公司的合作伙伴关系，我们致力于创建一个技术与可持续发展相结合的平台，
            为更美好的未来而努力。我们相信技术的力量能够推动绿色能源革命，创造更加清洁和高效的能源解决方案。
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">加入我们</h3>
          <p className="text-muted-foreground leading-relaxed">
            无论你是编程新手还是经验丰富的开发者，无论你对新能源技术了解多少，我们都欢迎你的加入。
            在这里，你将有机会参与创新项目，学习前沿技术，结识志同道合的伙伴，共同为可持续发展贡献力量。
          </p>
        </div>
      </div>
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
