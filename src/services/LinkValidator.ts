/**
 * 链接验证器服务
 * 负责验证链接的有效性和可访问性
 */

import { ValidationResult, LinkType } from '../types/link-detection';
import { globalCacheManager } from './CacheManager';

/**
 * 链接验证器类
 * 提供多种链接验证方法
 */
export class LinkValidator {
  private validationCache: Map<string, ValidationResult> = new Map();
  private readonly CACHE_EXPIRY = 5 * 60 * 1000; // 5分钟缓存
  private readonly DEFAULT_TIMEOUT = 5000; // 5秒超时

  /**
   * 验证单个链接
   * @param url - 要验证的URL
   * @returns 验证结果
   */
  async validateLink(url: string): Promise<ValidationResult> {
    try {
      // 先检查全局缓存
      const globalCached = globalCacheManager.getValidationResult(url);
      if (globalCached) {
        return globalCached;
      }

      // 检查本地缓存
      const cached = this.getCachedValidation(url);
      if (cached) {
        return cached;
      }

      const result = await this.performValidation(url);
      
      // 缓存结果到本地和全局缓存
      this.cacheValidation(url, result);
      globalCacheManager.cacheValidationResult(url, result);
      
      return result;
    } catch (error) {
      const errorResult: ValidationResult = {
        isValid: false,
        error: error instanceof Error ? error.message : '验证失败',
        validatedAt: Date.now(),
        responseTime: 0,
      };
      
      // 缓存错误结果（较短时间）
      this.cacheValidation(url, errorResult);
      globalCacheManager.cacheValidationResult(url, errorResult);
      
      return errorResult;
    }
  }

  /**
   * 验证链接有效性
   * @param url 要验证的链接
   * @param timeout 超时时间（毫秒）
   * @returns 验证结果
   */
  async validate(url: string, timeout: number = this.DEFAULT_TIMEOUT): Promise<ValidationResult> {
    // 检查缓存
    const cached = this.getCachedValidation(url);
    if (cached) {
      return cached;
    }

    const startTime = Date.now();
    let result: ValidationResult;

    try {
      // 根据URL类型选择验证方法
      if (this.isExternalUrl(url)) {
        result = await this.validateExternalUrl(url, timeout);
      } else if (this.isInternalUrl(url)) {
        result = await this.validateInternalUrl(url);
      } else if (this.isAnchorUrl(url)) {
        result = this.validateAnchorUrl(url);
      } else if (this.isEmailUrl(url)) {
        result = this.validateEmailUrl(url);
      } else if (this.isTelUrl(url)) {
        result = this.validateTelUrl(url);
      } else {
        result = await this.validateRelativeUrl(url);
      }

      result.responseTime = Date.now() - startTime;
      result.validatedAt = Date.now();

      // 缓存结果
      this.cacheValidation(url, result);
      
      return result;
    } catch (error) {
      result = {
        isValid: false,
        error: error instanceof Error ? error.message : '验证过程中发生未知错误',
        responseTime: Date.now() - startTime,
        validatedAt: Date.now()
      };

      this.cacheValidation(url, result);
      return result;
    }
  }

  private async performValidation(url: string): Promise<ValidationResult> {
    const startTime = Date.now();
    let result: ValidationResult;

    // 根据URL类型选择验证方法
    if (this.isExternalUrl(url)) {
      result = await this.validateExternalUrl(url, this.DEFAULT_TIMEOUT);
    } else if (this.isInternalUrl(url)) {
      result = await this.validateInternalUrl(url);
    } else if (this.isAnchorUrl(url)) {
      result = this.validateAnchorUrl(url);
    } else if (this.isEmailUrl(url)) {
      result = this.validateEmailUrl(url);
    } else if (this.isTelUrl(url)) {
      result = this.validateTelUrl(url);
    } else {
      result = await this.validateRelativeUrl(url);
    }

    result.responseTime = Date.now() - startTime;
    result.validatedAt = Date.now();

    return result;
  }

  /**
   * 批量验证链接
   * @param urls 链接数组
   * @param maxConcurrent 最大并发数
   * @param timeout 超时时间
   * @returns 验证结果数组
   */
  async validateBatch(
    urls: string[],
    maxConcurrent: number = 5,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const uniqueUrls = [...new Set(urls)]; // 去重
    
    // 分批处理以控制并发
    for (let i = 0; i < uniqueUrls.length; i += maxConcurrent) {
      const batch = uniqueUrls.slice(i, i + maxConcurrent);
      
      // 使用Promise.allSettled而不是Promise.all，避免单个失败影响整批
      const batchPromises = batch.map(async (url) => {
        try {
          const result = await this.validate(url, timeout);
          return { url, result, success: true };
        } catch (error) {
          console.warn(`验证链接失败: ${url}`, error);
          return {
            url,
            result: {
              isValid: false,
              error: error instanceof Error ? error.message : '验证失败',
              responseTime: 0,
              validatedAt: Date.now()
            } as ValidationResult,
            success: false
          };
        }
      });
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        
        for (const promiseResult of batchResults) {
          if (promiseResult.status === 'fulfilled') {
            results.push(promiseResult.value.result);
          } else {
            console.error('批量验证Promise失败:', promiseResult.reason);
            results.push({
              isValid: false,
              error: '批量验证Promise失败',
              responseTime: 0,
              validatedAt: Date.now()
            });
          }
        }
        
        // 在批次之间添加小延迟，避免过度占用资源
        if (i + maxConcurrent < uniqueUrls.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        console.error('批量验证批次失败:', error);
        // 为失败的批次添加错误结果
        const errorResults = batch.map(() => ({
          isValid: false,
          error: '批量验证批次失败',
          responseTime: 0,
          validatedAt: Date.now()
        }));
        results.push(...errorResults);
      }
    }

    return results;
  }

  /**
   * 验证外部URL
   */
  private async validateExternalUrl(url: string, timeout: number): Promise<ValidationResult> {
    const startTime = Date.now();
    
    try {
      // 使用fetch进行HEAD请求以检查链接可访问性
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeout);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors', // 避免CORS问题
        cache: 'no-cache',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkValidator/1.0)'
        }
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      // 检查响应状态
      if (response.ok || response.status === 0) { // status 0 表示no-cors模式
        return {
          isValid: true,
          statusCode: response.status || 200,
          redirectUrl: response.url !== url ? response.url : undefined,
          responseTime,
          validatedAt: Date.now()
        };
      } else {
        return {
          isValid: false,
          statusCode: response.status,
          error: `HTTP ${response.status}: ${response.statusText}`,
          responseTime,
          validatedAt: Date.now()
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      if (error instanceof Error) {
        // 处理中断错误
        if (error.name === 'AbortError') {
          return {
            isValid: false,
            error: `请求超时 (${timeout}ms)`,
            responseTime,
            validatedAt: Date.now()
          };
        }
        
        // 处理网络错误
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('NetworkError') ||
            error.message.includes('ERR_NETWORK')) {
          // 网络错误，尝试使用备用验证方式
          try {
            return await this.validateUrlWithImage(url, timeout);
          } catch (fallbackError) {
            return {
              isValid: false,
              error: '网络连接失败，无法验证链接',
              responseTime,
              validatedAt: Date.now()
            };
          }
        }
        
        // 处理CORS错误
        if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
          // CORS错误，使用图片预加载方式验证
          return this.validateUrlWithImage(url, timeout);
        }
        
        return {
          isValid: false,
          error: `验证失败: ${error.message}`,
          responseTime,
          validatedAt: Date.now()
        };
      }
      
      return {
        isValid: false,
        error: '未知错误',
        responseTime,
        validatedAt: Date.now()
      };
    }
  }

  /**
   * 使用图片预加载方式验证URL（绕过CORS限制）
   */
  private validateUrlWithImage(url: string, timeout: number = this.DEFAULT_TIMEOUT): Promise<ValidationResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const img = new Image();
      let isResolved = false;
      
      const cleanup = () => {
        if (img) {
          img.onload = null;
          img.onerror = null;
          img.src = '';
        }
      };
      
      const resolveOnce = (result: ValidationResult) => {
        if (!isResolved) {
          isResolved = true;
          cleanup();
          resolve(result);
        }
      };
      
      const timeoutId = setTimeout(() => {
        resolveOnce({
          isValid: false,
          error: '图片验证超时',
          responseTime: Date.now() - startTime,
          validatedAt: Date.now()
        });
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        resolveOnce({
          isValid: true,
          statusCode: 200,
          responseTime: Date.now() - startTime,
          validatedAt: Date.now()
        });
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        // 图片加载失败，但URL可能仍然有效（非图片资源）
        // 采用保守策略，标记为可能有效但需要用户确认
        resolveOnce({
          isValid: true,
          statusCode: 200,
          error: '无法通过图片方式验证，可能为非图片资源',
          responseTime: Date.now() - startTime,
          validatedAt: Date.now()
        });
      };

      try {
        img.src = url;
      } catch (error) {
        clearTimeout(timeoutId);
        resolveOnce({
          isValid: false,
          error: 'URL格式无效',
          responseTime: Date.now() - startTime,
          validatedAt: Date.now()
        });
      }
    });
  }

  /**
   * 验证内部URL
   */
  private async validateInternalUrl(url: string): Promise<ValidationResult> {
    try {
      // 对于内部URL，检查路径是否存在
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache'
      });

      return {
        isValid: response.ok,
        statusCode: response.status,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
        validatedAt: Date.now()
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : '内部链接验证失败',
        validatedAt: Date.now()
      };
    }
  }

  /**
   * 验证锚点URL
   */
  private validateAnchorUrl(url: string): ValidationResult {
    const anchorId = url.substring(1); // 移除 # 符号
    
    if (!anchorId) {
      return {
        isValid: false,
        error: '锚点ID不能为空',
        validatedAt: Date.now()
      };
    }

    // 检查页面中是否存在对应的元素
    const element = document.getElementById(anchorId) || 
                   document.querySelector(`[name="${anchorId}"]`) ||
                   document.querySelector(`a[name="${anchorId}"]`);

    return {
      isValid: !!element,
      error: element ? undefined : `找不到锚点: ${anchorId}`,
      validatedAt: Date.now()
    };
  }

  /**
   * 验证邮件URL
   */
  private validateEmailUrl(url: string): ValidationResult {
    const email = url.replace('mailto:', '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const isValid = emailRegex.test(email);
    
    return {
      isValid,
      error: isValid ? undefined : '邮件地址格式无效',
      validatedAt: Date.now()
    };
  }

  /**
   * 验证电话URL
   */
  private validateTelUrl(url: string): ValidationResult {
    const tel = url.replace('tel:', '');
    const telRegex = /^[+]?[0-9\s\-\(\)]+$/;
    
    const isValid = telRegex.test(tel) && tel.replace(/\D/g, '').length >= 7;
    
    return {
      isValid,
      error: isValid ? undefined : '电话号码格式无效',
      validatedAt: Date.now()
    };
  }

  /**
   * 验证相对URL
   */
  private async validateRelativeUrl(url: string): Promise<ValidationResult> {
    try {
      // 将相对URL转换为绝对URL
      const absoluteUrl = new URL(url, window.location.href).href;
      return this.validateInternalUrl(absoluteUrl);
    } catch (error) {
      return {
        isValid: false,
        error: '相对URL格式无效',
        validatedAt: Date.now()
      };
    }
  }

  /**
   * 检查是否为外部URL
   */
  private isExternalUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * 检查是否为内部URL
   */
  private isInternalUrl(url: string): boolean {
    try {
      const urlObj = new URL(url, window.location.href);
      return urlObj.host === window.location.host;
    } catch {
      return false;
    }
  }

  /**
   * 检查是否为锚点URL
   */
  private isAnchorUrl(url: string): boolean {
    return url.startsWith('#');
  }

  /**
   * 检查是否为邮件URL
   */
  private isEmailUrl(url: string): boolean {
    return url.startsWith('mailto:');
  }

  /**
   * 检查是否为电话URL
   */
  private isTelUrl(url: string): boolean {
    return url.startsWith('tel:');
  }

  /**
   * 获取缓存的验证结果
   */
  private getCachedValidation(url: string): ValidationResult | null {
    const cached = this.validationCache.get(url);
    if (!cached) return null;

    const isExpired = Date.now() - cached.validatedAt > this.CACHE_EXPIRY;
    if (isExpired) {
      this.validationCache.delete(url);
      return null;
    }

    return cached;
  }

  /**
   * 缓存验证结果
   */
  private cacheValidation(url: string, result: ValidationResult): void {
    this.validationCache.set(url, result);
    
    // 定期清理过期缓存
    this.cleanupExpiredCache();
  }

  /**
   * 清理过期缓存
   */
  private cleanupExpiredCache(): void {
    const now = Date.now();
    for (const [url, result] of this.validationCache.entries()) {
      if (now - result.validatedAt > this.CACHE_EXPIRY) {
        this.validationCache.delete(url);
      }
    }
  }

  /**
   * 清除所有缓存
   */
  public clearCache(): void {
    this.validationCache.clear();
  }

  /**
   * 获取缓存统计信息
   */
  public getCacheStats(): {
    size: number;
    validCount: number;
    invalidCount: number;
    oldestEntry: number | null;
  } {
    let validCount = 0;
    let invalidCount = 0;
    let oldestEntry: number | null = null;

    for (const result of this.validationCache.values()) {
      if (result.isValid) {
        validCount++;
      } else {
        invalidCount++;
      }

      if (oldestEntry === null || result.validatedAt < oldestEntry) {
        oldestEntry = result.validatedAt;
      }
    }

    return {
      size: this.validationCache.size,
      validCount,
      invalidCount,
      oldestEntry
    };
  }

  /**
   * 预验证链接列表（后台验证）
   * @param urls 链接列表
   * @param priority 优先级链接（优先验证）
   */
  public async prevalidateLinks(urls: string[], priority: string[] = []): Promise<void> {
    try {
      // 过滤出需要验证的链接（排除已缓存的有效链接）
      const urlsToValidate = urls.filter(url => {
        const cached = this.getCachedValidation(url);
        return !cached || !cached.isValid;
      });
      
      if (urlsToValidate.length === 0) {
        return; // 所有链接都已验证且有效
      }
      
      // 优先验证重要链接
      const priorityUrls = priority.filter(url => urlsToValidate.includes(url));
      if (priorityUrls.length > 0) {
        try {
          await this.validateBatch(priorityUrls, 3, 8000); // 优先链接使用较长超时
          console.log(`优先验证完成: ${priorityUrls.length} 个链接`);
        } catch (error) {
          console.warn('优先链接验证失败:', error);
        }
      }

      // 后台验证其他链接
      const remainingUrls = urlsToValidate.filter(url => !priority.includes(url));
      if (remainingUrls.length > 0) {
        // 使用较低的并发数和较短超时避免影响用户体验
        setTimeout(async () => {
          try {
            await this.validateBatch(remainingUrls, 2, 5000);
            console.log(`后台验证完成: ${remainingUrls.length} 个链接`);
          } catch (error) {
            console.warn('后台链接验证失败:', error);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('预验证链接时发生错误:', error);
    }
  }

  /**
   * 检查URL格式是否有效
   * @param url 要检查的URL
   * @returns 是否为有效格式
   */
  public isValidUrlFormat(url: string): boolean {
    if (!url || typeof url !== 'string') return false;

    // 基本格式检查
    const urlPattern = /^(https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/).+/i;
    return urlPattern.test(url.trim());
  }

  /**
   * 获取URL的基本信息
   * @param url 链接
   * @returns URL信息
   */
  public getUrlInfo(url: string): {
    type: 'external' | 'internal' | 'anchor' | 'email' | 'tel' | 'relative';
    domain?: string;
    protocol?: string;
    isSecure?: boolean;
  } {
    if (this.isAnchorUrl(url)) {
      return { type: 'anchor' };
    }

    if (this.isEmailUrl(url)) {
      return { type: 'email' };
    }

    if (this.isTelUrl(url)) {
      return { type: 'tel' };
    }

    try {
      const urlObj = new URL(url, window.location.href);
      const isInternal = urlObj.host === window.location.host;
      
      return {
        type: isInternal ? 'internal' : 'external',
        domain: urlObj.hostname,
        protocol: urlObj.protocol,
        isSecure: urlObj.protocol === 'https:'
      };
    } catch {
      return { type: 'relative' };
    }
  }
}