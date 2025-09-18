import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Loader2 } from 'lucide-react';

// 懒加载学习中心组件
const LearningCenter = lazy(() => import('../pages/LearningCenter'));
const TechRoadmapOverview = lazy(() => import('../components/TechRoadmapOverview'));
const LearningResources = lazy(() => import('../components/LearningResources'));
const LearningProgress = lazy(() => import('../components/LearningProgress'));
const PersonalLearningCenter = lazy(() => import('../components/PersonalLearningCenter'));
const LearningPathDetail = lazy(() => import('../components/LearningPathDetail'));

// 加载中组件
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = '加载中...' }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 text-center max-w-sm mx-auto"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <BookOpen className="w-12 h-12 text-blue-600" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1"
          >
            <Loader2 className="w-6 h-6 text-blue-400" />
          </motion.div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">学习中心</h3>
      <p className="text-gray-600">{message}</p>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  </div>
);

// 错误边界组件
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">页面加载失败</h3>
        <p className="text-gray-600 mb-4">抱歉，学习中心暂时无法访问</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
};

// 学习路由配置
export const learningRoutes: RouteObject[] = [
  {
    path: '/learning',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习中心..." />}>
        <LearningCenter />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner message="正在加载仪表板..." />}>
            <PersonalLearningCenter />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/learning/dashboard',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载仪表板..." />}>
        <LearningCenter initialSection="dashboard" />
      </Suspense>
    )
  },
  {
    path: '/learning/routes',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载技术路线..." />}>
        <LearningCenter initialSection="routes" />
      </Suspense>
    )
  },
  {
    path: '/learning/routes/:routeId',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习路径..." />}>
        <LearningCenter initialSection="routes" />
      </Suspense>
    )
  },
  {
    path: '/learning/resources',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习资源..." />}>
        <LearningCenter initialSection="resources" />
      </Suspense>
    )
  },
  {
    path: '/learning/progress',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习进度..." />}>
        <LearningCenter initialSection="progress" />
      </Suspense>
    )
  },
  {
    path: '/learning/settings',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载设置页面..." />}>
        <LearningCenter initialSection="dashboard" />
      </Suspense>
    )
  }
];

// 学习中心快速访问路由
export const quickAccessRoutes: RouteObject[] = [
  {
    path: '/roadmap',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载技术路线..." />}>
        <LearningCenter initialSection="routes" />
      </Suspense>
    )
  },
  {
    path: '/resources',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习资源..." />}>
        <LearningCenter initialSection="resources" />
      </Suspense>
    )
  },
  {
    path: '/progress',
    element: (
      <Suspense fallback={<LoadingSpinner message="正在加载学习进度..." />}>
        <LearningCenter initialSection="progress" />
      </Suspense>
    )
  }
];

// 学习中心导航配置
export const learningNavigation = {
  main: {
    title: '学习中心',
    path: '/learning',
    icon: BookOpen,
    description: '个性化学习管理平台'
  },
  sections: [
    {
      key: 'dashboard',
      title: '仪表板',
      path: '/learning/dashboard',
      description: '学习概览和快速访问'
    },
    {
      key: 'routes',
      title: '技术路线',
      path: '/learning/routes',
      description: '浏览和选择学习路径'
    },
    {
      key: 'resources',
      title: '学习资源',
      path: '/learning/resources',
      description: '丰富的学习材料和工具'
    },
    {
      key: 'progress',
      title: '学习进度',
      path: '/learning/progress',
      description: '跟踪你的学习成果'
    }
  ]
};

// 路由守卫配置
export const learningRouteGuards = {
  // 是否需要登录
  requireAuth: true,
  // 重定向路径
  redirectPath: '/login',
  // 权限检查
  checkPermissions: (userRole: string) => {
    // 这里可以根据用户角色检查权限
    return ['user', 'premium', 'admin'].includes(userRole);
  }
};

// 面包屑导航配置
export const breadcrumbConfig = {
  '/learning': [{ title: '首页', path: '/' }, { title: '学习中心', path: '/learning' }],
  '/learning/dashboard': [{ title: '首页', path: '/' }, { title: '学习中心', path: '/learning' }, { title: '仪表板', path: '/learning/dashboard' }],
  '/learning/routes': [{ title: '首页', path: '/' }, { title: '学习中心', path: '/learning' }, { title: '技术路线', path: '/learning/routes' }],
  '/learning/resources': [{ title: '首页', path: '/' }, { title: '学习中心', path: '/learning' }, { title: '学习资源', path: '/learning/resources' }],
  '/learning/progress': [{ title: '首页', path: '/' }, { title: '学习中心', path: '/learning' }, { title: '学习进度', path: '/learning/progress' }]
};

// SEO配置
export const seoConfig = {
  '/learning': {
    title: '学习中心 - 新能源程序员俱乐部',
    description: '个性化学习管理平台，提供嵌入式开发、图形界面设计等技术学习路线',
    keywords: '学习中心,技术路线,嵌入式开发,图形界面,程序员学习'
  },
  '/learning/routes': {
    title: '技术路线 - 学习中心',
    description: '探索嵌入式开发、图形界面设计等技术学习路线，包含FreeRTOS、uC/OS-II、Qt、WinForm、MFC等技术栈',
    keywords: 'FreeRTOS,uC/OS-II,Qt,WinForm,MFC,嵌入式,图形界面'
  },
  '/learning/resources': {
    title: '学习资源 - 学习中心',
    description: '丰富的学习资源库，包含文档教程、视频课程、实践项目、开发工具等',
    keywords: '学习资源,教程,视频课程,实践项目,开发工具'
  },
  '/learning/progress': {
    title: '学习进度 - 学习中心',
    description: '跟踪你的学习进度，查看学习统计和成就，制定学习目标',
    keywords: '学习进度,学习统计,学习成就,学习目标'
  }
};

export default learningRoutes;