import * as Sentry from '@sentry/react';

// Sentry配置
export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || '', // 从环境变量获取DSN
    environment: import.meta.env.MODE || 'development',
    integrations: [
    Sentry.browserTracingIntegration(),
  ],
    // 性能监控采样率
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // 错误采样率
    sampleRate: 1.0,
    // 在开发环境中启用调试
    debug: import.meta.env.MODE === 'development',
    // 设置发布版本
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    // 忽略某些错误
    beforeSend(event) {
      // 过滤掉一些不重要的错误
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.type === 'ChunkLoadError' || 
            error?.value?.includes('Loading chunk')) {
          return null; // 忽略代码分割加载错误
        }
      }
      return event;
    },
  });
};

// 手动捕获错误的工具函数
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

// 添加用户上下文
export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// 添加面包屑
export const addBreadcrumb = (message: string, category: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};