/**
 * useLinkProcessor Hook
 * 提供链接处理功能的React Hook
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ProcessedLink, DocumentContext, ValidationResult, LinkType, DocumentDifficulty } from '../types/link-detection';
import { LinkProcessor } from '../services/LinkProcessor';
import { LinkValidator } from '../services/LinkValidator';
import { LinkTransformer } from '../services/LinkTransformer';
import { PerformanceUtils } from '../utils/PerformanceUtils';
import { globalCacheManager } from '../services/CacheManager';

/**
 * Hook配置选项
 */
export interface UseLinkProcessorOptions {
  /** 是否自动验证链接 */
  autoValidate?: boolean;
  /** 验证延迟时间（毫秒） */
  validationDelay?: number;
  /** 最大并发验证数 */
  maxConcurrentValidations?: number;
  /** 是否启用缓存 */
  enableCache?: boolean;
  /** 缓存过期时间（毫秒） */
  cacheExpiry?: number;
  /** 是否在后台预验证 */
  prevalidate?: boolean;
  /** 文档上下文 */
  documentContext?: DocumentContext;
}

/**
 * Hook返回值
 */
export interface UseLinkProcessorReturn {
  /** 处理后的链接列表 */
  processedLinks: ProcessedLink[];
  /** 验证结果映射 */
  validationResults: Map<string, ValidationResult>;
  /** 是否正在处理 */
  isProcessing: boolean;
  /** 是否正在验证 */
  isValidating: boolean;
  /** 错误信息 */
  error: string | null;
  /** 处理链接 */
  processLinks: (content: string) => Promise<ProcessedLink[]>;
  /** 验证单个链接 */
  validateLink: (url: string) => Promise<ValidationResult>;
  /** 批量验证链接 */
  validateLinks: (urls: string[]) => Promise<ValidationResult[]>;
  /** 清除缓存 */
  clearCache: () => void;
  /** 重新处理 */
  reprocess: () => Promise<void>;
  /** 获取统计信息 */
  getStats: () => {
    totalLinks: number;
    validLinks: number;
    invalidLinks: number;
    pendingValidations: number;
    cacheHitRate: number;
  };
}

/**
 * 链接处理Hook
 * @param options 配置选项
 * @returns Hook返回值
 */
export function useLinkProcessor(options: UseLinkProcessorOptions = {}): UseLinkProcessorReturn {
  const {
    autoValidate = true,
    validationDelay = 500,
    maxConcurrentValidations = 5,
    enableCache = true,
    cacheExpiry = 5 * 60 * 1000, // 5分钟
    prevalidate = false,
    documentContext
  } = options;

  // 状态管理
  const [processedLinks, setProcessedLinks] = useState<ProcessedLink[]>([]);
  const [validationResults, setValidationResults] = useState<Map<string, ValidationResult>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 服务实例
  const processorRef = useRef<LinkProcessor | null>(null);
  const validatorRef = useRef<LinkValidator | null>(null);
  const transformerRef = useRef<LinkTransformer | null>(null);
  
  // 验证队列和定时器
  const validationQueueRef = useRef<Set<string>>(new Set());
  const validationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>('');

  // 初始化服务实例
  useEffect(() => {
    processorRef.current = new LinkProcessor();
    validatorRef.current = new LinkValidator();
    transformerRef.current = new LinkTransformer();

    return () => {
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }
    };
  }, []);

  // 处理链接
  const processLinks = useCallback(async (content: string): Promise<ProcessedLink[]> => {
    if (!processorRef.current) return [];

    setIsProcessing(true);
    setError(null);
    lastContentRef.current = content;

    try {
      // 使用性能监控包装处理函数
      const measuredProcessor = PerformanceUtils.measurePerformance(
        processorRef.current.processDocument.bind(processorRef.current),
        'linkProcessing'
      );

      const links = await measuredProcessor(content, documentContext);
      setProcessedLinks(links);

      // 自动验证
      if (autoValidate) {
        const urls = links.map(link => link.originalUrl);
        scheduleValidation(urls);
      }

      return links;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '处理链接时发生错误';
      setError(errorMessage);
      console.error('链接处理错误:', err);
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, [autoValidate, documentContext]);

  // 验证单个链接
  const validateLink = useCallback(async (url: string): Promise<ValidationResult> => {
    if (!validatorRef.current) {
      throw new Error('验证器未初始化');
    }

    try {
      const result = await validatorRef.current.validate(url);
      
      setValidationResults(prev => {
        const newResults = new Map(prev);
        newResults.set(url, result);
        return newResults;
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '验证链接时发生错误';
      const errorResult: ValidationResult = {
        isValid: false,
        error: errorMessage,
        responseTime: 0,
        validatedAt: Date.now()
      };

      setValidationResults(prev => {
        const newResults = new Map(prev);
        newResults.set(url, errorResult);
        return newResults;
      });

      return errorResult;
    }
  }, []);

  // 批量验证链接
  const validateLinks = useCallback(async (urls: string[]): Promise<ValidationResult[]> => {
    if (!validatorRef.current) {
      throw new Error('验证器未初始化');
    }

    setIsValidating(true);
    
    try {
      const results = await validatorRef.current.validateBatch(
        urls, 
        maxConcurrentValidations
      );

      // 更新验证结果
      setValidationResults(prev => {
        const newResults = new Map(prev);
        urls.forEach((url, index) => {
          if (results[index]) {
            newResults.set(url, results[index]);
          }
        });
        return newResults;
      });

      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '批量验证链接时发生错误';
      setError(errorMessage);
      console.error('批量验证错误:', err);
      
      // 返回错误结果
      return urls.map(() => ({
        isValid: false,
        error: errorMessage,
        responseTime: 0,
        validatedAt: Date.now()
      }));
    } finally {
      setIsValidating(false);
    }
  }, [maxConcurrentValidations]);

  // 调度验证
  const scheduleValidation = useCallback((urls: string[]) => {
    // 添加到验证队列
    urls.forEach(url => validationQueueRef.current.add(url));

    // 清除现有定时器
    if (validationTimerRef.current) {
      clearTimeout(validationTimerRef.current);
    }

    // 设置新的验证定时器
    validationTimerRef.current = setTimeout(async () => {
      const urlsToValidate = Array.from(validationQueueRef.current);
      validationQueueRef.current.clear();

      if (urlsToValidate.length > 0) {
        await validateLinks(urlsToValidate);
      }
    }, validationDelay);
  }, [validateLinks, validationDelay]);

  // 清除缓存
  const clearCache = useCallback(() => {
    if (validatorRef.current) {
      validatorRef.current.clearCache();
    }
    if (processorRef.current) {
      processorRef.current.clearCache();
    }
    globalCacheManager.clearAll();
    setValidationResults(new Map());
  }, []);

  // 重新处理
  const reprocess = useCallback(async () => {
    if (lastContentRef.current) {
      await processLinks(lastContentRef.current);
    }
  }, [processLinks]);

  // 获取统计信息
  const getStats = useCallback(() => {
    const totalLinks = processedLinks.length;
    let validLinks = 0;
    let invalidLinks = 0;
    
    validationResults.forEach(result => {
      if (result.isValid) {
        validLinks++;
      } else {
        invalidLinks++;
      }
    });

    const pendingValidations = validationQueueRef.current.size;
    const validatedCount = validationResults.size;
    const cacheHitRate = totalLinks > 0 ? (validatedCount / totalLinks) : 0;

    return {
      totalLinks,
      validLinks,
      invalidLinks,
      pendingValidations,
      cacheHitRate
    };
  }, [processedLinks, validationResults]);

  // 预验证效果
  useEffect(() => {
    if (prevalidate && processedLinks.length > 0 && validatorRef.current) {
      const urls = processedLinks.map(link => link.originalUrl);
      const priorityUrls = urls.filter(url => {
        const link = processedLinks.find(l => l.originalUrl === url);
        return link?.type === LinkType.EXTERNAL || link?.type === LinkType.INTERNAL;
      });
      
      validatorRef.current.prevalidateLinks(urls, priorityUrls);
    }
  }, [processedLinks, prevalidate]);

  // 清理效果
  useEffect(() => {
    return () => {
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }
    };
  }, []);

  // Memoized返回值
  const returnValue = useMemo(() => ({
    processedLinks,
    validationResults,
    isProcessing,
    isValidating,
    error,
    processLinks,
    validateLink,
    validateLinks,
    clearCache,
    reprocess,
    getStats
  }), [
    processedLinks,
    validationResults,
    isProcessing,
    isValidating,
    error,
    processLinks,
    validateLink,
    validateLinks,
    clearCache,
    reprocess,
    getStats
  ]);

  return returnValue;
}

/**
 * 简化版链接处理Hook
 * 适用于只需要基本链接处理功能的场景
 */
export function useSimpleLinkProcessor(content: string, difficulty?: DocumentDifficulty) {
  const [links, setLinks] = useState<ProcessedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const processor = useMemo(() => new LinkProcessor(), []);
  
  useEffect(() => {
    if (!content.trim()) {
      setLinks([]);
      return;
    }

    setIsLoading(true);
    
    const processContent = async () => {
      try {
        const processedLinks = await processor.processDocument(content, {
          difficulty,
          path: window.location.pathname,
          title: document.title,
          language: 'zh-CN'
        });
        setLinks(processedLinks);
      } catch (error) {
        console.error('简单链接处理错误:', error);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    processContent();
  }, [content, difficulty, processor]);

  return { links, isLoading };
}

/**
 * 链接验证Hook
 * 专门用于验证链接有效性
 */
export function useLinkValidation(urls: string[], options: {
  autoValidate?: boolean;
  validationDelay?: number;
} = {}) {
  const { autoValidate = true, validationDelay = 1000 } = options;
  
  const [results, setResults] = useState<Map<string, ValidationResult>>(new Map());
  const [isValidating, setIsValidating] = useState(false);
  
  const validator = useMemo(() => new LinkValidator(), []);
  
  const validate = useCallback(async (urlsToValidate: string[]) => {
    if (urlsToValidate.length === 0) return;
    
    setIsValidating(true);
    
    try {
      const validationResults = await validator.validateBatch(urlsToValidate);
      
      setResults(prev => {
        const newResults = new Map(prev);
        urlsToValidate.forEach((url, index) => {
          if (validationResults[index]) {
            newResults.set(url, validationResults[index]);
          }
        });
        return newResults;
      });
    } catch (error) {
      console.error('链接验证错误:', error);
    } finally {
      setIsValidating(false);
    }
  }, [validator]);
  
  useEffect(() => {
    if (!autoValidate || urls.length === 0) return;
    
    const timer = setTimeout(() => {
      validate(urls);
    }, validationDelay);
    
    return () => clearTimeout(timer);
  }, [urls, autoValidate, validationDelay, validate]);
  
  return {
    results,
    isValidating,
    validate: () => validate(urls),
    clearResults: () => setResults(new Map())
  };
}

/**
 * 链接统计Hook
 * 提供链接统计信息
 */
export function useLinkStats(links: ProcessedLink[], validationResults: Map<string, ValidationResult>) {
  return useMemo(() => {
    const stats = {
      total: links.length,
      byType: {} as Record<LinkType, number>,
      validated: validationResults.size,
      valid: 0,
      invalid: 0,
      pending: 0,
      external: 0,
      internal: 0
    };
    
    // 统计链接类型
    links.forEach(link => {
      stats.byType[link.type] = (stats.byType[link.type] || 0) + 1;
      
      if (link.type === LinkType.EXTERNAL) {
        stats.external++;
      } else {
        stats.internal++;
      }
    });
    
    // 统计验证结果
    validationResults.forEach(result => {
      if (result.isValid) {
        stats.valid++;
      } else {
        stats.invalid++;
      }
    });
    
    stats.pending = stats.total - stats.validated;
    
    return stats;
  }, [links, validationResults]);
}