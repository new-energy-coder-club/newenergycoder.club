import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 路由预加载映射
const ROUTE_PRELOAD_MAP: Record<string, string[]> = {
  '/': ['/projects', '/contact', '/team'], // 首页预加载常用页面
  '/projects': ['/contact', '/team'], // 项目页预加载相关页面
  '/team': ['/contact', '/join'], // 团队页预加载联系方式
  '/contact': ['/join', '/projects'] // 联系页预加载相关页面
};

// 预加载资源类型
interface PreloadResource {
  href: string;
  as: 'script' | 'style' | 'image' | 'font' | 'document';
  crossorigin?: 'anonymous' | 'use-credentials';
  type?: string;
}

// 关键资源预加载配置
const CRITICAL_RESOURCES: PreloadResource[] = [
  // 预加载关键字体
  {
    href: '/fonts/inter-var.woff2',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous'
  },
  // 预加载关键CSS
  {
    href: '/css/critical.css',
    as: 'style'
  }
];

// 创建预加载链接
const createPreloadLink = (resource: PreloadResource): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource.href;
  link.as = resource.as;
  
  if (resource.crossorigin) {
    link.crossOrigin = resource.crossorigin;
  }
  
  if (resource.type) {
    link.type = resource.type;
  }
  
  return link;
};

// 创建预取链接
const createPrefetchLink = (href: string): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  return link;
};

// 预加载路由组件
const preloadRoute = async (path: string) => {
  try {
    // 根据路径动态导入对应组件
    switch (path) {
      case '/projects':
        await import('@/pages/ProjectsPage');
        break;
      case '/contact':
        await import('@/pages/ContactPage');
        break;
      case '/team':
        await import('@/pages/TeamPage');
        break;
      case '/join':
        await import('@/pages/JoinPage');
        break;
      case '/events':
        await import('@/pages/EventsPage');
        break;
      case '/resources':
        await import('@/pages/ResourcesPage');
        break;
      case '/learning':
        await import('@/pages/LearningCenter');
        break;
      case '/dashboard':
        await import('@/pages/DashboardPage');
        break;
      case '/getting-started':
        await import('@/pages/GettingStartedPage');
        break;
      default:
        console.log(`No preload configuration for route: ${path}`);
    }
  } catch (error) {
    console.warn(`Failed to preload route ${path}:`, error);
  }
};

// 智能预加载策略
const useIntelligentPreload = () => {
  useEffect(() => {
    // 检查网络状况
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.saveData
    );

    // 慢网络下跳过预加载
    if (isSlowConnection) {
      console.log('Slow connection detected, skipping preload');
      return;
    }

    // 预加载关键资源
    CRITICAL_RESOURCES.forEach(resource => {
      const link = createPreloadLink(resource);
      document.head.appendChild(link);
    });

    // 页面空闲时预加载
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // 预加载首页相关路由
        ROUTE_PRELOAD_MAP['/']?.forEach(route => {
          const link = createPrefetchLink(route);
          document.head.appendChild(link);
          // 同时预加载组件
          preloadRoute(route);
        });
      });
    }
  }, []);
};

// 基于用户行为的预加载
const useHoverPreload = () => {
  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // 确保target是Element类型且支持closest方法
    if (!target || typeof target.closest !== 'function') return;
    
    const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          // 预加载路由组件
          preloadRoute(url.pathname);
          
          // 创建预取链接
          const prefetchLink = createPrefetchLink(url.pathname);
          document.head.appendChild(prefetchLink);
        }
      }
    };

    // 监听鼠标悬停事件
    document.addEventListener('mouseenter', handleMouseEnter, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, []);
};

// 基于路由的预加载
const useRouteBasedPreload = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    const preloadPaths = ROUTE_PRELOAD_MAP[currentPath];
    
    if (preloadPaths) {
      // 延迟预加载，避免阻塞当前页面
      setTimeout(() => {
        preloadPaths.forEach(path => {
          preloadRoute(path);
        });
      }, 1000);
    }
  }, [location.pathname]);
};

export const RoutePreloader: React.FC = () => {
  useIntelligentPreload();
  useHoverPreload();
  useRouteBasedPreload();
  
  return null; // 无UI组件
};

export default RoutePreloader;