/**
 * 批处理优化工具
 * 提供高效的批量数据处理功能
 */

/**
 * 批处理配置选项
 */
export interface BatchProcessorOptions<T, R> {
  /** 批处理大小 */
  batchSize: number;
  /** 批次间延迟（毫秒） */
  batchDelay?: number;
  /** 最大并发数 */
  maxConcurrency?: number;
  /** 处理函数 */
  processor: (batch: T[]) => Promise<R[]>;
  /** 错误处理策略 */
  errorStrategy?: 'fail-fast' | 'continue' | 'retry';
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟 */
  retryDelay?: number;
  /** 进度回调 */
  onProgress?: (processed: number, total: number) => void;
  /** 错误回调 */
  onError?: (error: Error, batch: T[], batchIndex: number) => void;
}

/**
 * 批处理结果
 */
export interface BatchProcessorResult<R> {
  /** 成功处理的结果 */
  results: R[];
  /** 失败的批次信息 */
  failures: Array<{
    batchIndex: number;
    error: Error;
    items: any[];
  }>;
  /** 处理统计 */
  stats: {
    totalItems: number;
    processedItems: number;
    failedItems: number;
    totalBatches: number;
    successfulBatches: number;
    failedBatches: number;
    processingTime: number;
  };
}

/**
 * 批处理器类
 */
export class BatchProcessor<T, R> {
  private options: Required<BatchProcessorOptions<T, R>>;
  private isProcessing = false;
  private abortController?: AbortController;

  constructor(options: BatchProcessorOptions<T, R>) {
    this.options = {
      batchDelay: 0,
      maxConcurrency: 3,
      errorStrategy: 'continue',
      retryCount: 2,
      retryDelay: 1000,
      onProgress: () => {},
      onError: () => {},
      ...options
    };
  }

  /**
   * 处理数据批次
   */
  async process(items: T[]): Promise<BatchProcessorResult<R>> {
    if (this.isProcessing) {
      throw new Error('BatchProcessor is already processing');
    }

    this.isProcessing = true;
    this.abortController = new AbortController();
    
    const startTime = Date.now();
    const batches = this.createBatches(items);
    const results: R[] = [];
    const failures: BatchProcessorResult<R>['failures'] = [];
    
    let processedItems = 0;
    let successfulBatches = 0;
    let failedBatches = 0;

    try {
      // 使用信号量控制并发
      const semaphore = new Semaphore(this.options.maxConcurrency);
      
      const batchPromises = batches.map(async (batch, batchIndex) => {
        await semaphore.acquire();
        
        try {
          if (this.abortController?.signal.aborted) {
            throw new Error('Processing aborted');
          }

          const batchResults = await this.processBatchWithRetry(
            batch, 
            batchIndex
          );
          
          results.push(...batchResults);
          processedItems += batch.length;
          successfulBatches++;
          
          this.options.onProgress(processedItems, items.length);
          
          // 批次间延迟
          if (this.options.batchDelay > 0) {
            await this.delay(this.options.batchDelay);
          }
          
        } catch (error) {
          failedBatches++;
          const errorObj = error instanceof Error ? error : new Error(String(error));
          
          failures.push({
            batchIndex,
            error: errorObj,
            items: batch
          });
          
          this.options.onError(errorObj, batch, batchIndex);
          
          if (this.options.errorStrategy === 'fail-fast') {
            throw error;
          }
        } finally {
          semaphore.release();
        }
      });

      await Promise.all(batchPromises);
      
    } finally {
      this.isProcessing = false;
      this.abortController = undefined;
    }

    const processingTime = Date.now() - startTime;
    const failedItems = failures.reduce((sum, failure) => sum + failure.items.length, 0);

    return {
      results,
      failures,
      stats: {
        totalItems: items.length,
        processedItems,
        failedItems,
        totalBatches: batches.length,
        successfulBatches,
        failedBatches,
        processingTime
      }
    };
  }

  /**
   * 中止处理
   */
  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  /**
   * 检查是否正在处理
   */
  get processing(): boolean {
    return this.isProcessing;
  }

  /**
   * 创建批次
   */
  private createBatches(items: T[]): T[][] {
    const batches: T[][] = [];
    const { batchSize } = this.options;
    
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    
    return batches;
  }

  /**
   * 带重试的批处理
   */
  private async processBatchWithRetry(
    batch: T[], 
    batchIndex: number
  ): Promise<R[]> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.options.retryCount; attempt++) {
      try {
        return await this.options.processor(batch);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < this.options.retryCount) {
          await this.delay(this.options.retryDelay * (attempt + 1));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 信号量类（控制并发）
 */
class Semaphore {
  private permits: number;
  private waitQueue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }

    return new Promise<void>(resolve => {
      this.waitQueue.push(resolve);
    });
  }

  release(): void {
    this.permits++;
    
    if (this.waitQueue.length > 0) {
      const resolve = this.waitQueue.shift()!;
      this.permits--;
      resolve();
    }
  }
}

/**
 * 链接批处理器
 * 专门用于处理链接相关的批量操作
 */
export class LinkBatchProcessor {
  private validationProcessor: BatchProcessor<string, boolean>;
  private transformProcessor: BatchProcessor<any, any>;

  constructor() {
    // 链接验证批处理器
    this.validationProcessor = new BatchProcessor({
      batchSize: 10,
      batchDelay: 100,
      maxConcurrency: 3,
      processor: async (urls: string[]) => {
        // 批量验证链接
        const results = await Promise.allSettled(
          urls.map(async (url) => {
            try {
              const response = await fetch(url, { 
                method: 'HEAD',
                signal: AbortSignal.timeout(5000)
              });
              return response.ok;
            } catch {
              return false;
            }
          })
        );
        
        return results.map(result => 
          result.status === 'fulfilled' ? result.value : false
        );
      },
      errorStrategy: 'continue',
      retryCount: 2
    });

    // 链接转换批处理器
    this.transformProcessor = new BatchProcessor({
      batchSize: 20,
      batchDelay: 50,
      maxConcurrency: 2,
      processor: async (links: any[]) => {
        // 批量转换链接
        return links.map(link => ({
          ...link,
          processed: true,
          processedAt: new Date().toISOString()
        }));
      },
      errorStrategy: 'continue'
    });
  }

  /**
   * 批量验证链接
   */
  async validateLinks(
    urls: string[], 
    onProgress?: (processed: number, total: number) => void
  ): Promise<BatchProcessorResult<boolean>> {
    return this.validationProcessor.process(urls);
  }

  /**
   * 批量转换链接
   */
  async transformLinks(
    links: any[], 
    onProgress?: (processed: number, total: number) => void
  ): Promise<BatchProcessorResult<any>> {
    return this.transformProcessor.process(links);
  }

  /**
   * 中止所有处理
   */
  abortAll(): void {
    this.validationProcessor.abort();
    this.transformProcessor.abort();
  }
}

/**
 * 创建批处理器的工厂函数
 */
export function createBatchProcessor<T, R>(
  options: BatchProcessorOptions<T, R>
): BatchProcessor<T, R> {
  return new BatchProcessor(options);
}

/**
 * 简单的批处理函数
 */
export async function processBatch<T, R>(
  items: T[],
  processor: (batch: T[]) => Promise<R[]>,
  batchSize = 10,
  batchDelay = 0
): Promise<R[]> {
  const batchProcessor = new BatchProcessor({
    batchSize,
    batchDelay,
    processor
  });
  
  const result = await batchProcessor.process(items);
  return result.results;
}

// 导出全局链接批处理器实例
export const globalLinkBatchProcessor = new LinkBatchProcessor();