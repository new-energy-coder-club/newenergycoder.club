import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Home,
  BookOpen,
  TrendingUp,
  Star,
  User,
  Settings,
  Bell,
  Menu,
  X,
  Search,
  Filter,
  ChevronRight,
  Bookmark,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

// 导入学习中心组件
import PersonalLearningCenter from '../components/PersonalLearningCenter';
import TechRoadmapOverview from '../components/TechRoadmapOverview';
import LearningResources from '../components/LearningResources';
import LearningPathDetail from '../components/LearningPathDetail';
import LearningProgress from '../components/LearningProgress';

// 导入类型定义
import { TechRoute } from '../types/learning';

interface LearningCenterProps {
  // 可选的初始配置
  initialSection?: 'dashboard' | 'routes' | 'resources' | 'progress';
  userId?: string;
}

const LearningCenter: React.FC<LearningCenterProps> = ({
  initialSection = 'dashboard',
  userId
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { section, routeId } = useParams<{ section?: string; routeId?: string }>();
  
  // 状态管理
  const [currentSection, setCurrentSection] = useState<string>(section || initialSection);
  const [selectedRoute, setSelectedRoute] = useState<TechRoute | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // 页面标题映射
  const pageTitles = {
    dashboard: '学习仪表板',
    routes: '技术路线',
    resources: '学习资源',
    progress: '学习进度',
    settings: '个人设置',
    route: '学习路径详情'
  };

  // 导航菜单项
  const navigationItems = [
    {
      key: 'dashboard',
      label: '仪表板',
      icon: <Home className="w-5 h-5" />,
      description: '学习概览和快速访问'
    },
    {
      key: 'routes',
      label: '技术路线',
      icon: <BookOpen className="w-5 h-5" />,
      description: '浏览和选择学习路径'
    },
    {
      key: 'resources',
      label: '学习资源',
      icon: <Star className="w-5 h-5" />,
      description: '丰富的学习材料和工具'
    },
    {
      key: 'progress',
      label: '学习进度',
      icon: <TrendingUp className="w-5 h-5" />,
      description: '跟踪你的学习成果'
    }
  ];

  // 处理路由变化
  useEffect(() => {
    if (section && section !== currentSection) {
      setCurrentSection(section);
    }
  }, [section]);

  // 处理导航
  const handleNavigation = (sectionKey: string, routeId?: string) => {
    setIsLoading(true);
    setCurrentSection(sectionKey);
    
    // 更新URL
    const path = routeId ? `/learning/${sectionKey}/${routeId}` : `/learning/${sectionKey}`;
    navigate(path, { replace: false });
    
    // 关闭移动端菜单
    setIsMobileMenuOpen(false);
    
    // 模拟加载
    setTimeout(() => setIsLoading(false), 300);
  };

  // 处理路线选择
  const handleRouteSelect = (route: TechRoute) => {
    setSelectedRoute(route);
    handleNavigation('route', route.id);
  };

  // 处理返回
  const handleBack = () => {
    if (selectedRoute) {
      setSelectedRoute(null);
      handleNavigation('routes');
    } else {
      navigate('/', { replace: false });
    }
  };

  // 获取当前页面标题
  const getCurrentPageTitle = () => {
    if (selectedRoute) {
      return selectedRoute.title;
    }
    return pageTitles[currentSection as keyof typeof pageTitles] || '学习中心';
  };

  // 渲染主要内容
  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (currentSection) {
      case 'dashboard':
        return (
          <PersonalLearningCenter 
            userId={userId}
            onNavigate={handleNavigation}
          />
        );
      
      case 'routes':
        return (
          <TechRoadmapOverview 
            onSelectRoute={handleRouteSelect}
          />
        );
      
      case 'resources':
        return (
          <LearningResources 
            onAddToLearningPlan={(resource) => {
              console.log('Added to learning plan:', resource);
              // 这里可以添加到学习计划的逻辑
            }}
          />
        );
      
      case 'progress':
        return (
          <LearningProgress 
            userId={userId}
            onRouteSelect={(routeId) => {
              // 根据routeId找到对应的路线并选择
              handleNavigation('routes');
            }}
          />
        );
      
      case 'route':
        if (selectedRoute) {
          return (
            <LearningPathDetail 
              route={selectedRoute}
              onBack={() => handleBack()}
              onStartLearning={(routeId) => {
                console.log('Starting learning:', routeId);
                // 这里可以添加开始学习的逻辑
              }}
            />
          );
        }
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">未找到指定的学习路线</p>
            <button
              onClick={() => handleNavigation('routes')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回路线列表
            </button>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">页面不存在</p>
            <button
              onClick={() => handleNavigation('dashboard')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回仪表板
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{getCurrentPageTitle()} - 新能源程序员俱乐部</title>
        <meta name="description" content="新能源程序员俱乐部学习中心，提供嵌入式开发、图形界面设计等技术学习路线" />
        <meta name="keywords" content="学习中心,技术路线,嵌入式开发,FreeRTOS,uC/OS-II,Qt,WinForm,MFC" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* 顶部导航栏 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* 左侧：返回按钮和标题 */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {getCurrentPageTitle()}
                  </h1>
                  {selectedRoute && (
                    <p className="text-sm text-gray-600">
                      {selectedRoute.direction} · 难度: {selectedRoute.learningDifficulty}/5
                    </p>
                  )}
                </div>
              </div>

              {/* 中间：桌面端导航菜单 */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.key)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentSection === item.key
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    title={item.description}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* 右侧：搜索和用户菜单 */}
              <div className="flex items-center space-x-2">
                {/* 搜索按钮 */}
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-2 rounded-lg transition-colors ${
                    showSearch
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* 通知按钮 */}
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                {/* 用户头像 */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>

                {/* 移动端菜单按钮 */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 搜索栏 */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 py-4"
                >
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索学习内容..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* 移动端导航菜单 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* 移动端菜单头部 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">导航菜单</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 移动端菜单项 */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleNavigation(item.key)}
                        className={`w-full flex items-center space-x-3 p-4 text-left rounded-xl transition-all duration-200 ${
                          currentSection === item.key
                            ? 'text-blue-600 bg-blue-50 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        {item.icon}
                        <div className="flex-1">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 移动端菜单底部 */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">学习者</p>
                      <p className="text-sm text-gray-600">继续你的学习之旅</p>
                    </div>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 移动端菜单遮罩 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            />
          )}
        </AnimatePresence>

        {/* 主要内容区域 */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSection}-${selectedRoute?.id || 'none'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 底部快速操作栏（移动端） */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors ${
                  currentSection === item.key
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningCenter;