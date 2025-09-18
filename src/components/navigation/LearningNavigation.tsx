import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Star,
  User,
  ChevronDown,
  ChevronRight,
  Target,
  Award,
  Clock,
  Bookmark,
  Settings,
  ExternalLink,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 导航项接口
interface NavigationItem {
  key: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string | number;
  isNew?: boolean;
  children?: NavigationItem[];
}

// 学习状态接口
interface LearningStatus {
  isLearning: boolean;
  currentRoute?: string;
  currentStep?: string;
  progress: number;
  totalTime: number; // 分钟
}

interface LearningNavigationProps {
  // 导航样式
  variant?: 'header' | 'sidebar' | 'dropdown' | 'mobile';
  // 是否显示学习状态
  showLearningStatus?: boolean;
  // 是否显示快速访问
  showQuickAccess?: boolean;
  // 自定义样式类
  className?: string;
  // 点击回调
  onNavigate?: (path: string) => void;
}

const LearningNavigation: React.FC<LearningNavigationProps> = ({
  variant = 'header',
  showLearningStatus = true,
  showQuickAccess = true,
  className = '',
  onNavigate
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [learningStatus, setLearningStatus] = useState<LearningStatus>({
    isLearning: false,
    progress: 0,
    totalTime: 0
  });

  // 导航项配置
  const navigationItems: NavigationItem[] = [
    {
      key: 'dashboard',
      title: '学习仪表板',
      path: '/learning/dashboard',
      icon: <TrendingUp className="w-4 h-4" />,
      description: '查看学习概览和进度统计'
    },
    {
      key: 'routes',
      title: '技术路线',
      path: '/learning/routes',
      icon: <BookOpen className="w-4 h-4" />,
      description: '探索嵌入式和图形界面学习路径',
      badge: '新增',
      isNew: true
    },
    {
      key: 'resources',
      title: '学习资源',
      path: '/learning/resources',
      icon: <Star className="w-4 h-4" />,
      description: '丰富的学习材料和工具'
    },
    {
      key: 'progress',
      title: '学习进度',
      path: '/learning/progress',
      icon: <Target className="w-4 h-4" />,
      description: '跟踪学习成果和成就'
    }
  ];

  // 快速访问项
  const quickAccessItems: NavigationItem[] = [
    {
      key: 'freertos',
      title: 'FreeRTOS路线',
      path: '/learning/routes/freertos-embedded',
      icon: <BookOpen className="w-4 h-4" />,
      description: '实时操作系统学习'
    },
    {
      key: 'qt',
      title: 'Qt开发路线',
      path: '/learning/routes/qt-gui',
      icon: <Star className="w-4 h-4" />,
      description: '跨平台GUI开发'
    },
    {
      key: 'bookmarks',
      title: '我的收藏',
      path: '/learning/bookmarks',
      icon: <Bookmark className="w-4 h-4" />,
      description: '收藏的学习内容'
    }
  ];

  // 检查当前路径是否为学习中心
  const isLearningPath = location.pathname.startsWith('/learning');

  // 处理导航点击
  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    setIsDropdownOpen(false);
  };

  // 模拟学习状态更新
  useEffect(() => {
    // 这里可以从实际的学习状态管理中获取数据
    const mockLearningStatus: LearningStatus = {
      isLearning: Math.random() > 0.7,
      currentRoute: 'FreeRTOS嵌入式开发',
      currentStep: '任务调度机制',
      progress: Math.floor(Math.random() * 100),
      totalTime: Math.floor(Math.random() * 120) + 30
    };
    setLearningStatus(mockLearningStatus);
  }, []);

  // 渲染学习状态
  const renderLearningStatus = () => {
    if (!showLearningStatus || !learningStatus.isLearning) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-800">正在学习</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-green-600" />
            <span className="text-xs text-green-600">{learningStatus.totalTime}分钟</span>
          </div>
        </div>
        <p className="text-sm text-green-700 mb-1">{learningStatus.currentRoute}</p>
        <p className="text-xs text-green-600">{learningStatus.currentStep}</p>
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-green-600 mb-1">
            <span>进度</span>
            <span>{learningStatus.progress}%</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${learningStatus.progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  // 渲染导航项
  const renderNavigationItem = (item: NavigationItem, isActive: boolean) => (
    <motion.div
      key={item.key}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={item.path}
        onClick={(e) => {
          e.preventDefault();
          handleNavigate(item.path);
        }}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <div className={`flex-shrink-0 ${
          isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
        }`}>
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium truncate">{item.title}</span>
            {item.badge && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                item.isNew
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.badge}
              </span>
            )}
          </div>
          {item.description && variant !== 'header' && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {item.description}
            </p>
          )}
        </div>
        {variant === 'sidebar' && (
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </Link>
    </motion.div>
  );

  // 头部导航样式
  if (variant === 'header') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            isLearningPath
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>学习中心</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
            >
              <div className="p-4">
                {renderLearningStatus()}
                
                <div className="space-y-1">
                  {navigationItems.map((item) => 
                    renderNavigationItem(item, location.pathname === item.path)
                  )}
                </div>

                {showQuickAccess && (
                  <>
                    <div className="border-t border-gray-200 my-4" />
                    <div className="mb-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">快速访问</h4>
                      <div className="space-y-1">
                        {quickAccessItems.map((item) => 
                          renderNavigationItem(item, location.pathname === item.path)
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link
                    to="/learning"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/learning');
                    }}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>进入学习中心</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 侧边栏导航样式
  if (variant === 'sidebar') {
    return (
      <div className={`space-y-2 ${className}`}>
        {renderLearningStatus()}
        
        <div className="space-y-1">
          {navigationItems.map((item) => 
            renderNavigationItem(item, location.pathname === item.path)
          )}
        </div>

        {showQuickAccess && (
          <>
            <div className="border-t border-gray-200 my-4" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 px-3">快速访问</h4>
              <div className="space-y-1">
                {quickAccessItems.map((item) => 
                  renderNavigationItem(item, location.pathname === item.path)
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // 移动端导航样式
  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        {renderLearningStatus()}
        
        <div className="grid grid-cols-2 gap-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.path);
                }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {item.icon}
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      item.isNew
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-center">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // 下拉菜单样式
  return (
    <div className={`space-y-1 ${className}`}>
      {navigationItems.map((item) => 
        renderNavigationItem(item, location.pathname === item.path)
      )}
    </div>
  );
};

export default LearningNavigation;