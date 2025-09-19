/**
 * 性能优化工具类
 * 提供防抖、节流、批处理、懒加载等性能优化功能
 */

/**
 * 防抖函数类型
 */
type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
};

/**
 * 节流函数类型
 */
type ThrottledFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

/**
 * 批处理配置
 */
interface BatchConfig<T> {
  /** 批处理大小 */
  batchSize: number;
  /** 批处理延迟（毫秒） */
  delay: number;
  /** 最大等待时间（毫秒） */
  maxWait: number;
  /** 批处理函数 */
  processor: (items: T[]) => Promise<void> | void;
}

/**
 * 懒加载配置
 */
interface LazyLoadConfig {
  /** 根边距 */
  rootMargin: string;
  /** 阈值 */
  threshold: number;
  /** 是否只触发一次 */
  once: boolean;
}

/**
 * 性能监控数据
 */
interface PerformanceMetrics {
  /** 函数名称 */
  name: string;
  /** 调用次数 */
  callCount: number;
  /** 总执行时间 */
  totalTime: number;
  /** 平均执行时间 */
  averageTime: number;
  /** 最小执行时间 */
  minTime: number;
  /** 最大执行时间 */
  maxTime: number;
  /** 最后调用时间 */
  lastCallTime: number;
}

/**
 * 性能优化工具类
 */
export class PerformanceUtils {
  private static performanceMetrics = new Map<string, PerformanceMetrics>();

  /**
   * 防抖函数
   * @param func - 要防抖的函数
   * @param delay - 延迟时间（毫秒）
   * @param immediate - 是否立即执行
   * @returns 防抖后的函数
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    immediate = false
  ): DebouncedFunction<T> {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any = null;

    const debounced = function (this: any, ...args: Parameters<T>) {
      lastArgs = args;
      lastThis = this;

      const callNow = immediate && !timeoutId;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (!immediate && lastArgs) {
          func.apply(lastThis, lastArgs);
        }
      }, delay);

      if (callNow) {
        func.apply(this, args);
      }
    } as DebouncedFunction<T>;

    debounced.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    debounced.flush = () => {
      if (timeoutId && lastArgs) {
        clearTimeout(timeoutId);
        func.apply(lastThis, lastArgs);
        timeoutId = null;
      }
    };

    return debounced;
  }

  /**
   * 节流函数
   * @param func - 要节流的函数
   * @param delay - 延迟时间（毫秒）
   * @param options - 节流选项
   * @returns 节流后的函数
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    options: { leading?: boolean; trailing?: boolean } = {}
  ): ThrottledFunction<T> {
    const { leading = true, trailing = true } = options;
    let timeoutId: NodeJS.Timeout | null = null;
    let lastCallTime = 0;
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any = null;

    const throttled = function (this: any, ...args: Parameters<T>) {
      const now = Date.now();
      lastArgs = args;
      lastThis = this;

      if (!lastCallTime && !leading) {
        lastCallTime = now;
      }

      const remaining = delay - (now - lastCallTime);

      if (remaining <= 0 || remaining > delay) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastCallTime = now;
        func.apply(this, args);
      } else if (!timeoutId && trailing) {
        timeoutId = setTimeout(() => {
          lastCallTime = leading ? Date.now() : 0;
          timeoutId = null;
          if (lastArgs) {
            func.apply(lastThis, lastArgs);
          }
        }, remaining);
      }
    } as ThrottledFunction<T>;

    throttled.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = 0;
    };

    return throttled;
  }

  /**
   * 批处理器
   */
  static createBatchProcessor<T>(config: BatchConfig<T>) {
    let batch: T[] = [];
    let timeoutId: NodeJS.Timeout | null = null;
    let firstItemTime = 0;

    const processBatch = async () => {
      if (batch.length === 0) return;

      const currentBatch = [...batch];
      batch = [];
      firstItemTime = 0;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      try {
        await config.processor(currentBatch);
      } catch (error) {
        console.error('批处理失败:', error);
      }
    };

    const scheduleProcess = () => {
      if (timeoutId) return;

      const now = Date.now();
      const waitTime = Math.min(
        config.delay,
        Math.max(0, config.maxWait - (now - firstItemTime))
      );

      timeoutId = setTimeout(processBatch, waitTime);
    };

    return {
      add: (item: T) => {
        if (batch.length === 0) {
          firstItemTime = Date.now();
        }

        batch.push(item);

        if (batch.length >= config.batchSize) {
          processBatch();
        } else {
          scheduleProcess();
        }
      },
      flush: processBatch,
      clear: () => {
        batch = [];
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        firstItemTime = 0;
      },
      size: () => batch.length,
    };
  }

  /**
   * 懒加载观察器
   */
  static createLazyLoader(config: LazyLoadConfig = {
    rootMargin: '50px',
    threshold: 0.1,
    once: true,
  }) {
    if (typeof IntersectionObserver === 'undefined') {
      // 不支持 IntersectionObserver 的环境
      return {
        observe: (element: Element, callback: () => void) => {
          // 立即执行回调
          callback();
        },
        unobserve: () => {},
        disconnect: () => {},
      };
    }

    const callbacks = new WeakMap<Element, () => void>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = callbacks.get(entry.target);
            if (callback) {
              callback();
              if (config.once) {
                observer.unobserve(entry.target);
                callbacks.delete(entry.target);
              }
            }
          }
        });
      },
      {
        rootMargin: config.rootMargin,
        threshold: config.threshold,
      }
    );

    return {
      observe: (element: Element, callback: () => void) => {
        callbacks.set(element, callback);
        observer.observe(element);
      },
      unobserve: (element: Element) => {
        observer.unobserve(element);
        callbacks.delete(element);
      },
      disconnect: () => {
        observer.disconnect();
      },
    };
  }

  /**
   * 性能监控装饰器
   */
  static measurePerformance<T extends (...args: any[]) => any>(
    func: T,
    name?: string
  ): T {
    const funcName = name || func.name || 'anonymous';

    return ((...args: Parameters<T>) => {
      const startTime = performance.now();
      
      try {
        const result = func(...args);
        
        // 处理异步函数
        if (result instanceof Promise) {
          return result.finally(() => {
            const endTime = performance.now();
            this.recordMetrics(funcName, endTime - startTime);
          });
        }
        
        const endTime = performance.now();
        this.recordMetrics(funcName, endTime - startTime);
        return result;
      } catch (error) {
        const endTime = performance.now();
        this.recordMetrics(funcName, endTime - startTime);
        throw error;
      }
    }) as T;
  }

  /**
   * 记录性能指标
   */
  private static recordMetrics(name: string, executionTime: number): void {
    const existing = this.performanceMetrics.get(name);
    
    if (existing) {
      existing.callCount++;
      existing.totalTime += executionTime;
      existing.averageTime = existing.totalTime / existing.callCount;
      existing.minTime = Math.min(existing.minTime, executionTime);
      existing.maxTime = Math.max(existing.maxTime, executionTime);
      existing.lastCallTime = Date.now();
    } else {
      this.performanceMetrics.set(name, {
        name,
        callCount: 1,
        totalTime: executionTime,
        averageTime: executionTime,
        minTime: executionTime,
        maxTime: executionTime,
        lastCallTime: Date.now(),
      });
    }
  }

  /**
   * 获取性能指标
   */
  static getMetrics(name?: string): PerformanceMetrics | PerformanceMetrics[] {
    if (name) {
      return this.performanceMetrics.get(name) || {
        name,
        callCount: 0,
        totalTime: 0,
        averageTime: 0,
        minTime: 0,
        maxTime: 0,
        lastCallTime: 0,
      };
    }
    
    return Array.from(this.performanceMetrics.values());
  }

  /**
   * 清除性能指标
   */
  static clearMetrics(name?: string): void {
    if (name) {
      this.performanceMetrics.delete(name);
    } else {
      this.performanceMetrics.clear();
    }
  }

  /**
   * 内存使用情况监控
   */
  static getMemoryUsage(): any {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  /**
   * 请求空闲时间执行
   */
  static requestIdleCallback(
    callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
    options: { timeout?: number } = {}
  ): number {
    if (typeof requestIdleCallback !== 'undefined') {
      return requestIdleCallback(callback, options);
    }
    
    // 降级到 setTimeout
    return setTimeout(() => {
      const start = Date.now();
      callback({
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        didTimeout: false,
      });
    }, 1) as any;
  }

  /**
   * 取消空闲回调
   */
  static cancelIdleCallback(id: number): void {
    if (typeof cancelIdleCallback !== 'undefined') {
      cancelIdleCallback(id);
    } else {
      clearTimeout(id);
    }
  }

  /**
   * 分块处理大数组
   */
  static async processInChunks<T, R>(
    items: T[],
    processor: (chunk: T[]) => Promise<R[]> | R[],
    chunkSize = 100,
    delay = 0
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      const chunkResults = await processor(chunk);
      results.push(...chunkResults);
      
      // 在处理块之间添加延迟，避免阻塞主线程
      if (delay > 0 && i + chunkSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return results;
  }

  /**
   * 创建资源池
   */
  static createResourcePool<T>(
    factory: () => T,
    destroyer: (resource: T) => void,
    maxSize = 10
  ) {
    const pool: T[] = [];
    let created = 0;

    return {
      acquire: (): T => {
        if (pool.length > 0) {
          return pool.pop()!;
        }
        
        if (created < maxSize) {
          created++;
          return factory();
        }
        
        throw new Error('资源池已满');
      },
      release: (resource: T) => {
        if (pool.length < maxSize) {
          pool.push(resource);
        } else {
          destroyer(resource);
          created--;
        }
      },
      clear: () => {
        pool.forEach(destroyer);
        pool.length = 0;
        created = 0;
      },
      size: () => pool.length,
      created: () => created,
    };
  }
}

// 导出常用的工具函数
export const debounce = PerformanceUtils.debounce;
export const throttle = PerformanceUtils.throttle;
export const measurePerformance = PerformanceUtils.measurePerformance;
export const processInChunks = PerformanceUtils.processInChunks;