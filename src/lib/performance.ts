// 性能监控工具

// Web Vitals 指标类型
interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// 性能指标收集
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // 初始化性能监控
  init() {
    try {
      this.observeWebVitals();
    } catch (e) {
      console.warn('[Performance] WebVitals 观察初始化失败：', e);
    }
    try {
      this.observeResourceTiming();
    } catch (e) {
      console.warn('[Performance] ResourceTiming 观察初始化失败：', e);
    }
    try {
      this.observeNavigationTiming();
    } catch (e) {
      console.warn('[Performance] NavigationTiming 观察初始化失败：', e);
    }
    try {
      this.observeLongTasks();
    } catch (e) {
      console.warn('[Performance] LongTasks 观察初始化失败：', e);
    }
  }

  // 监控 Web Vitals 指标
  private observeWebVitals() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // 监控 LCP (Largest Contentful Paint)
      this.observeMetric('largest-contentful-paint', (entry) => {
        this.recordMetric('LCP', entry.startTime);
        this.sendMetricToAnalytics('LCP', entry.startTime);
      });

      // 监控 FID (First Input Delay)
      this.observeMetric('first-input', (entry) => {
        const fid = entry.processingStart - entry.startTime;
        this.recordMetric('FID', fid);
        this.sendMetricToAnalytics('FID', fid);
      });

      // 监控 CLS (Cumulative Layout Shift)
      this.observeMetric('layout-shift', (entry) => {
        if (!entry.hadRecentInput) {
          const cls = this.metrics.get('CLS') || 0;
          const newCls = cls + entry.value;
          this.recordMetric('CLS', newCls);
          this.sendMetricToAnalytics('CLS', newCls);
        }
      });
    }
  }

  // 监控资源加载时间
  private observeResourceTiming() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
            
            // 记录不同类型资源的加载时间
            if (resourceEntry.name.includes('.js')) {
              this.recordMetric('JS_Load_Time', loadTime);
            } else if (resourceEntry.name.includes('.css')) {
              this.recordMetric('CSS_Load_Time', loadTime);
            } else if (resourceEntry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
              this.recordMetric('Image_Load_Time', loadTime);
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  // 监控导航时间
  private observeNavigationTiming() {
    if (typeof window !== 'undefined' && window.performance && window.performance.navigation) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          // DNS 查询时间
          const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart;
          this.recordMetric('DNS_Time', dnsTime);
          
          // TCP 连接时间
          const tcpTime = navigation.connectEnd - navigation.connectStart;
          this.recordMetric('TCP_Time', tcpTime);
          
          // 请求响应时间
          const responseTime = navigation.responseEnd - navigation.requestStart;
          this.recordMetric('Response_Time', responseTime);
          
          // DOM 解析时间
          const domParseTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          this.recordMetric('DOM_Parse_Time', domParseTime);
          
          // 页面完全加载时间
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          this.recordMetric('Page_Load_Time', loadTime);
          
          // 发送导航指标到分析服务
          this.sendNavigationMetrics({
            dnsTime,
            tcpTime,
            responseTime,
            domParseTime,
            loadTime
          });
        }
      });
    }
  }

  // 监控长任务
  private observeLongTasks() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'longtask') {
              this.recordMetric('Long_Task', entry.duration);
              this.sendMetricToAnalytics('Long_Task', entry.duration);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (e) {
        // Long Task API 可能不被支持
        console.warn('Long Task API not supported');
      }
    }
  }

  // 通用指标观察器
  private observeMetric(type: string, callback: (entry: any) => void) {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(callback);
        });
        
        observer.observe({ entryTypes: [type] });
        this.observers.push(observer);
      } catch (e) {
        console.warn(`Performance observer for ${type} not supported`);
      }
    }
  }

  // 记录指标
  private recordMetric(name: string, value: number) {
    this.metrics.set(name, value);
    console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`);
  }

  // 发送指标到分析服务
  private sendMetricToAnalytics(name: string, value: number) {
    // 这里可以集成到 Vercel Analytics 或其他分析服务
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Performance', {
        metric: name,
        value: Math.round(value),
        url: window.location.pathname
      });
    }
  }

  // 发送导航指标
  private sendNavigationMetrics(metrics: Record<string, number>) {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Navigation', {
        ...metrics,
        url: window.location.pathname
      });
    }
  }

  // 手动记录自定义指标
  recordCustomMetric(name: string, value: number, unit: string = 'ms') {
    this.recordMetric(name, value);
    this.sendMetricToAnalytics(name, value);
  }

  // 测量函数执行时间
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;
    
    this.recordCustomMetric(`Function_${name}`, duration);
    return result;
  }

  // 测量异步函数执行时间
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    this.recordCustomMetric(`AsyncFunction_${name}`, duration);
    return result;
  }

  // 获取所有指标
  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }

  // 清理观察器
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// 导出单例实例
export const performanceMonitor = PerformanceMonitor.getInstance();

// 页面可见性变化监控
export const observePageVisibility = () => {
  if (typeof document !== 'undefined') {
    try {
      let startTime = Date.now();
      
      const handleVisibilityChange = () => {
        try {
          if (document.hidden) {
            // 页面变为不可见
            const visibleTime = Date.now() - startTime;
            performanceMonitor.recordCustomMetric('Page_Visible_Time', visibleTime);
          } else {
            // 页面变为可见
            startTime = Date.now();
          }
        } catch (e) {
          // 指标记录失败不应影响可见性监听
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // 页面卸载时记录总停留时间
      window.addEventListener('beforeunload', () => {
        try {
          if (!document.hidden) {
            const totalTime = Date.now() - startTime;
            performanceMonitor.recordCustomMetric('Page_Total_Time', totalTime);
          }
        } catch (e) {
          // 卸载时的记录失败也应被忽略
        }
      });
    } catch (e) {
      console.warn('[Performance] 页面可见性监听初始化失败：', e);
    }
  }
};