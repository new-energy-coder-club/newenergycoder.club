import * as Sentry from '@sentry/react';

// Sentry配置（加固初始化，环境变量缺失时不阻断应用）
export const initSentry = () => {
  try {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    const release = import.meta.env.VITE_APP_VERSION || '1.0.0';
    const environment = import.meta.env.MODE || 'development';

    // 若未配置有效DSN，则跳过Sentry初始化
    if (!dsn || dsn.trim() === '' || /placeholder|example|dummy/i.test(dsn)) {
      if (environment !== 'production') {
        console.warn('[Sentry] DSN未配置或为占位符，跳过初始化');
      }
      return;
    }

    Sentry.init({
      dsn,
      environment,
      integrations: [Sentry.browserTracingIntegration()],
      // 性能监控采样率
      tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
      // 错误采样率
      sampleRate: 1.0,
      // 在开发环境中启用调试
      debug: environment === 'development',
      // 设置发布版本
      release,
      // 忽略某些错误
      beforeSend(event) {
        try {
          // 过滤掉一些不重要的错误
          if (event.exception) {
            const error = event.exception.values?.[0];
            const val = error?.value || '';
            if (
              error?.type === 'ChunkLoadError' ||
              /Loading chunk|failed to fetch dynamically imported module/i.test(val)
            ) {
              return null; // 忽略代码分割加载错误
            }
          }
          return event;
        } catch (e) {
          // 任何过滤逻辑异常不应影响事件上报
          return event;
        }
      },
    });
  } catch (e) {
    // Sentry初始化失败不应阻断应用启动
    console.error('[Sentry] 初始化失败，应用继续运行：', e);
  }
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