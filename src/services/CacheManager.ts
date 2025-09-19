/**
 * 缓存管理器 - 管理链接验证结果和处理结果的缓存
 * 提供内存缓存、本地存储缓存和缓存策略管理
 */

import { ProcessedLink, ValidationResult } from '../types/link-detection';

/**
 * 缓存项接口
 */
interface CacheItem<T> {
  /** 缓存的数据 */
  data: T;
  /** 缓存创建时间戳 */
  timestamp: number;
  /** 缓存过期时间戳 */
  expiresAt: number;
  /** 访问次数 */
  accessCount: number;
  /** 最后访问时间 */
  lastAccessed: number;
}

/**
 * 缓存配置接口
 */
interface CacheConfig {
  /** 内存缓存最大条目数 */
  maxMemoryItems: number;
  /** 本地存储缓存最大条目数 */
  maxStorageItems: number;
  /** 默认缓存过期时间（毫秒） */
  defaultTTL: number;
  /** 链接验证结果缓存时间（毫秒） */
  validationTTL: number;
  /** 处理结果缓存时间（毫秒） */
  processingTTL: number;
  /** 是否启用本地存储缓存 */
  enableStorage: boolean;
  /** 缓存清理间隔（毫秒） */
  cleanupInterval: number;
}

/**
 * 缓存统计信息
 */
interface CacheStats {
  /** 内存缓存命中次数 */
  memoryHits: number;
  /** 内存缓存未命中次数 */
  memoryMisses: number;
  /** 存储缓存命中次数 */
  storageHits: number;
  /** 存储缓存未命中次数 */
  storageMisses: number;
  /** 当前内存缓存条目数 */
  memorySize: number;
  /** 当前存储缓存条目数 */
  storageSize: number;
  /** 缓存命中率 */
  hitRate: number;
}

/**
 * 缓存管理器类
 */
export class CacheManager {
  private memoryCache = new Map<string, CacheItem<any>>();
  private config: CacheConfig;
  private stats: CacheStats;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(config?: Partial<CacheConfig>) {
    this.config = {
      maxMemoryItems: 1000,
      maxStorageItems: 5000,
      defaultTTL: 30 * 60 * 1000, // 30分钟
      validationTTL: 60 * 60 * 1000, // 1小时
      processingTTL: 24 * 60 * 60 * 1000, // 24小时
      enableStorage: true,
      cleanupInterval: 5 * 60 * 1000, // 5分钟
      ...config,
    };

    this.stats = {
      memoryHits: 0,
      memoryMisses: 0,
      storageHits: 0,
      storageMisses: 0,
      memorySize: 0,
      storageSize: 0,
      hitRate: 0,
    };

    this.startCleanupTimer();
  }

  /**
   * 生成缓存键
   */
  private generateKey(prefix: string, identifier: string): string {
    return `${prefix}:${identifier}`;
  }

  /**
   * 创建缓存项
   */
  private createCacheItem<T>(data: T, ttl?: number): CacheItem<T> {
    const now = Date.now();
    const expirationTime = ttl || this.config.defaultTTL;
    
    return {
      data,
      timestamp: now,
      expiresAt: now + expirationTime,
      accessCount: 0,
      lastAccessed: now,
    };
  }

  /**
   * 检查缓存项是否过期
   */
  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() > item.expiresAt;
  }

  /**
   * 更新缓存项访问信息
   */
  private updateAccess<T>(item: CacheItem<T>): void {
    item.accessCount++;
    item.lastAccessed = Date.now();
  }

  /**
   * 从内存缓存获取数据
   */
  private getFromMemory<T>(key: string): T | null {
    const item = this.memoryCache.get(key) as CacheItem<T> | undefined;
    
    if (!item) {
      this.stats.memoryMisses++;
      return null;
    }

    if (this.isExpired(item)) {
      this.memoryCache.delete(key);
      this.stats.memoryMisses++;
      return null;
    }

    this.updateAccess(item);
    this.stats.memoryHits++;
    return item.data;
  }

  /**
   * 存储到内存缓存
   */
  private setToMemory<T>(key: string, data: T, ttl?: number): void {
    // 检查内存缓存大小限制
    if (this.memoryCache.size >= this.config.maxMemoryItems) {
      this.evictLeastRecentlyUsed();
    }

    const item = this.createCacheItem(data, ttl);
    this.memoryCache.set(key, item);
    this.stats.memorySize = this.memoryCache.size;
  }

  /**
   * 从本地存储获取数据
   */
  private getFromStorage<T>(key: string): T | null {
    if (!this.config.enableStorage || typeof localStorage === 'undefined') {
      this.stats.storageMisses++;
      return null;
    }

    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        this.stats.storageMisses++;
        return null;
      }

      const item: CacheItem<T> = JSON.parse(stored);
      
      if (this.isExpired(item)) {
        localStorage.removeItem(key);
        this.stats.storageMisses++;
        return null;
      }

      this.stats.storageHits++;
      return item.data;
    } catch (error) {
      console.warn('缓存读取失败:', error);
      this.stats.storageMisses++;
      return null;
    }
  }

  /**
   * 存储到本地存储
   */
  private setToStorage<T>(key: string, data: T, ttl?: number): void {
    if (!this.config.enableStorage || typeof localStorage === 'undefined') {
      return;
    }

    try {
      const item = this.createCacheItem(data, ttl);
      localStorage.setItem(key, JSON.stringify(item));
      
      // 更新存储缓存大小统计
      this.updateStorageSize();
    } catch (error) {
      console.warn('缓存存储失败:', error);
    }
  }

  /**
   * 更新存储缓存大小统计
   */
  private updateStorageSize(): void {
    if (typeof localStorage === 'undefined') return;
    
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('validation:') || key.startsWith('processing:'))) {
        count++;
      }
    }
    this.stats.storageSize = count;
  }

  /**
   * 淘汰最少使用的缓存项
   */
  private evictLeastRecentlyUsed(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, item] of this.memoryCache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.memoryCache.delete(oldestKey);
    }
  }

  /**
   * 启动清理定时器
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * 清理过期缓存
   */
  private cleanup(): void {
    // 清理内存缓存
    const now = Date.now();
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key);
      }
    }
    this.stats.memorySize = this.memoryCache.size;

    // 清理本地存储缓存
    if (this.config.enableStorage && typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('validation:') || key.startsWith('processing:'))) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const item: CacheItem<any> = JSON.parse(stored);
              if (this.isExpired(item)) {
                keysToRemove.push(key);
              }
            }
          } catch (error) {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.updateStorageSize();
    }
  }

  /**
   * 缓存链接验证结果
   */
  public cacheValidationResult(url: string, result: ValidationResult): void {
    const key = this.generateKey('validation', url);
    this.setToMemory(key, result, this.config.validationTTL);
    this.setToStorage(key, result, this.config.validationTTL);
  }

  /**
   * 获取缓存的链接验证结果
   */
  public getValidationResult(url: string): ValidationResult | null {
    const key = this.generateKey('validation', url);
    
    // 先从内存缓存获取
    let result = this.getFromMemory<ValidationResult>(key);
    if (result) {
      return result;
    }

    // 再从本地存储获取
    result = this.getFromStorage<ValidationResult>(key);
    if (result) {
      // 将结果放回内存缓存
      this.setToMemory(key, result, this.config.validationTTL);
      return result;
    }

    return null;
  }

  /**
   * 缓存链接处理结果
   */
  public cacheProcessingResult(content: string, results: ProcessedLink[]): void {
    const key = this.generateKey('processing', this.hashContent(content));
    this.setToMemory(key, results, this.config.processingTTL);
    this.setToStorage(key, results, this.config.processingTTL);
  }

  /**
   * 获取缓存的链接处理结果
   */
  public getProcessingResult(content: string): ProcessedLink[] | null {
    const key = this.generateKey('processing', this.hashContent(content));
    
    // 先从内存缓存获取
    let result = this.getFromMemory<ProcessedLink[]>(key);
    if (result) {
      return result;
    }

    // 再从本地存储获取
    result = this.getFromStorage<ProcessedLink[]>(key);
    if (result) {
      // 将结果放回内存缓存
      this.setToMemory(key, result, this.config.processingTTL);
      return result;
    }

    return null;
  }

  /**
   * 生成内容哈希
   */
  private hashContent(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return hash.toString(36);
  }

  /**
   * 清除所有缓存
   */
  public clearAll(): void {
    this.memoryCache.clear();
    this.stats.memorySize = 0;

    if (this.config.enableStorage && typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('validation:') || key.startsWith('processing:'))) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.stats.storageSize = 0;
    }

    // 重置统计信息
    this.stats.memoryHits = 0;
    this.stats.memoryMisses = 0;
    this.stats.storageHits = 0;
    this.stats.storageMisses = 0;
  }

  /**
   * 清除特定类型的缓存
   */
  public clearByType(type: 'validation' | 'processing'): void {
    // 清理内存缓存
    for (const [key] of this.memoryCache.entries()) {
      if (key.startsWith(`${type}:`)) {
        this.memoryCache.delete(key);
      }
    }
    this.stats.memorySize = this.memoryCache.size;

    // 清理本地存储缓存
    if (this.config.enableStorage && typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`${type}:`)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.updateStorageSize();
    }
  }

  /**
   * 获取缓存统计信息
   */
  public getStats(): CacheStats {
    const totalHits = this.stats.memoryHits + this.stats.storageHits;
    const totalMisses = this.stats.memoryMisses + this.stats.storageMisses;
    const total = totalHits + totalMisses;
    
    return {
      ...this.stats,
      hitRate: total > 0 ? totalHits / total : 0,
    };
  }

  /**
   * 更新缓存配置
   */
  public updateConfig(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
    
    // 重启清理定时器
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.startCleanupTimer();
  }

  /**
   * 销毁缓存管理器
   */
  public destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.memoryCache.clear();
  }
}

// 创建全局缓存管理器实例
export const globalCacheManager = new CacheManager();