import { useEffect } from 'react';

// Core Web Vitals 类型定义
interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
  id: string;
}

// 性能阈值配置
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

// 获取性能评级
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// 发送性能数据到分析服务
const sendToAnalytics = (metric: Metric) => {
  // 发送到 Vercel Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating
      }
    });
  }

  // 控制台输出（开发环境）
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta
    });
  }
};

// Web Vitals 监控函数
const getCLS = (onPerfEntry: (metric: Metric) => void) => {
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  const entryHandler = (entry: any) => {
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

      if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }

      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = [...sessionEntries];

        onPerfEntry({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          entries: clsEntries,
          id: 'cls-' + Date.now()
        });
      }
    }
  };

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entryHandler);
  });

  observer.observe({ type: 'layout-shift', buffered: true });
};

const getFID = (onPerfEntry: (metric: Metric) => void) => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      onPerfEntry({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        rating: getRating('FID', entry.processingStart - entry.startTime),
        delta: entry.processingStart - entry.startTime,
        entries: [entry],
        id: 'fid-' + Date.now()
      });
    });
  });

  observer.observe({ type: 'first-input', buffered: true });
};

const getLCP = (onPerfEntry: (metric: Metric) => void) => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;

    onPerfEntry({
      name: 'LCP',
      value: lastEntry.startTime,
      rating: getRating('LCP', lastEntry.startTime),
      delta: lastEntry.startTime,
      entries: [lastEntry],
      id: 'lcp-' + Date.now()
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
};

const getFCP = (onPerfEntry: (metric: Metric) => void) => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (entry.name === 'first-contentful-paint') {
        onPerfEntry({
          name: 'FCP',
          value: entry.startTime,
          rating: getRating('FCP', entry.startTime),
          delta: entry.startTime,
          entries: [entry],
          id: 'fcp-' + Date.now()
        });
      }
    });
  });

  observer.observe({ type: 'paint', buffered: true });
};

const getTTFB = (onPerfEntry: (metric: Metric) => void) => {
  const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
  if (navigationEntry) {
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    onPerfEntry({
      name: 'TTFB',
      value: ttfb,
      rating: getRating('TTFB', ttfb),
      delta: ttfb,
      entries: [navigationEntry],
      id: 'ttfb-' + Date.now()
    });
  }
};

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 监控 Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
    getFCP(sendToAnalytics);
    getTTFB(sendToAnalytics);

    // 监控资源加载性能
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > 1000) { // 超过1秒的资源
          console.warn('Slow resource:', entry.name, entry.duration + 'ms');
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    // 监控长任务
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        console.warn('Long task detected:', entry.duration + 'ms');
      });
    });

    if ('PerformanceObserver' in window) {
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // longtask 可能不被支持
      }
    }

    return () => {
      resourceObserver.disconnect();
      longTaskObserver.disconnect();
    };
  }, []);

  return null; // 这是一个无UI的监控组件
};

export default PerformanceMonitor;