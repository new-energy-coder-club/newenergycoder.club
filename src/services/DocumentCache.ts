import { DocumentContent, DocumentCacheItem } from '../types/document';

/**
 * 文档缓存服务
 * 提供多级缓存管理，包括内存缓存和会话存储
 */
export class DocumentCache {
  private static instance: DocumentCache;
  private memoryCache: Map<string, DocumentCacheItem> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5分钟
  private readonly MAX_MEMORY_ITEMS = 50;
  private readonly SESSION_STORAGE_PREFIX = 'doc_cache_';

  private constructor() {
    // 启动时清理过期的会话存储
    this.cleanupSessionStorage();
  }

  public static getInstance(): DocumentCache {
    if (!DocumentCache.instance) {
      DocumentCache.instance = new DocumentCache();
    }
    return DocumentCache.instance;
  }

  /**
   * 生成缓存键
   */
  private generateKey(category: string, slug: string, subcategory?: string): string {
    return subcategory 
      ? `${category}/${subcategory}/${slug}`
      : `${category}/${slug}`;
  }

  /**
   * 检查缓存项是否过期
   */
  private isExpired(item: DocumentCacheItem): boolean {
    return Date.now() > (item.timestamp + item.ttl);
  }

  /**
   * 从内存缓存获取文档
   */
  private getFromMemory(key: string): DocumentContent | null {
    const item = this.memoryCache.get(key);
    if (!item) return null;
    
    if (this.isExpired(item)) {
      this.memoryCache.delete(key);
      return null;
    }
    
    return item.content;
  }

  /**
   * 存储到内存缓存
   */
  private setToMemory(key: string, content: DocumentContent, ttl: number = this.DEFAULT_TTL): void {
    // 如果缓存已满，删除最旧的项
    if (this.memoryCache.size >= this.MAX_MEMORY_ITEMS) {
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) {
        this.memoryCache.delete(firstKey);
      }
    }
    
    const item: DocumentCacheItem = {
      content,
      timestamp: Date.now(),
      ttl
    };
    
    this.memoryCache.set(key, item);
  }

  /**
   * 从会话存储获取文档
   */
  private getFromSessionStorage(key: string): DocumentContent | null {
    try {
      const storageKey = this.SESSION_STORAGE_PREFIX + key;
      const itemStr = sessionStorage.getItem(storageKey);
      if (!itemStr) return null;
      
      const item: DocumentCacheItem = JSON.parse(itemStr);
      if (this.isExpired(item)) {
        sessionStorage.removeItem(storageKey);
        return null;
      }
      
      return item.content;
    } catch (error) {
      console.warn('Error reading from session storage:', error);
      return null;
    }
  }

  /**
   * 存储到会话存储
   */
  private setToSessionStorage(key: string, content: DocumentContent, ttl: number = this.DEFAULT_TTL): void {
    try {
      const storageKey = this.SESSION_STORAGE_PREFIX + key;
      const item: DocumentCacheItem = {
        content,
        timestamp: Date.now(),
        ttl
      };
      
      sessionStorage.setItem(storageKey, JSON.stringify(item));
    } catch (error) {
      console.warn('Error writing to session storage:', error);
      // 如果存储失败，可能是因为空间不足，尝试清理
      this.cleanupSessionStorage();
    }
  }

  /**
   * 获取文档（优先从内存缓存，然后是会话存储）
   */
  get(category: string, slug: string, subcategory?: string): DocumentContent | null {
    const key = this.generateKey(category, slug, subcategory);
    
    // 首先尝试从内存缓存获取
    let content = this.getFromMemory(key);
    if (content) {
      return content;
    }
    
    // 然后尝试从会话存储获取
    content = this.getFromSessionStorage(key);
    if (content) {
      // 将会话存储中的内容提升到内存缓存
      this.setToMemory(key, content);
      return content;
    }
    
    return null;
  }

  /**
   * 设置文档缓存
   */
  set(category: string, slug: string, content: DocumentContent, subcategory?: string, ttl: number = this.DEFAULT_TTL): void {
    const key = this.generateKey(category, slug, subcategory);
    
    // 同时存储到内存缓存和会话存储
    this.setToMemory(key, content, ttl);
    this.setToSessionStorage(key, content, ttl);
  }

  /**
   * 检查是否存在缓存
   */
  has(category: string, slug: string, subcategory?: string): boolean {
    return this.get(category, slug, subcategory) !== null;
  }

  /**
   * 删除特定缓存
   */
  delete(category: string, slug: string, subcategory?: string): void {
    const key = this.generateKey(category, slug, subcategory);
    
    // 从内存缓存删除
    this.memoryCache.delete(key);
    
    // 从会话存储删除
    try {
      const storageKey = this.SESSION_STORAGE_PREFIX + key;
      sessionStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Error removing from session storage:', error);
    }
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    // 清空内存缓存
    this.memoryCache.clear();
    
    // 清空会话存储中的文档缓存
    this.cleanupSessionStorage(true);
  }

  /**
   * 清理过期的会话存储项
   */
  private cleanupSessionStorage(forceAll: boolean = false): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!key || !key.startsWith(this.SESSION_STORAGE_PREFIX)) continue;
        
        if (forceAll) {
          keysToRemove.push(key);
          continue;
        }
        
        try {
          const itemStr = sessionStorage.getItem(key);
          if (!itemStr) continue;
          
          const item: DocumentCacheItem = JSON.parse(itemStr);
          if (this.isExpired(item)) {
            keysToRemove.push(key);
          }
        } catch (error) {
          // 如果解析失败，也删除这个项
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
    } catch (error) {
      console.warn('Error cleaning up session storage:', error);
    }
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    memoryItems: number;
    sessionItems: number;
    totalSize: number;
  } {
    let sessionItems = 0;
    let totalSize = 0;
    
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.SESSION_STORAGE_PREFIX)) {
          sessionItems++;
          const value = sessionStorage.getItem(key);
          if (value) {
            totalSize += value.length;
          }
        }
      }
    } catch (error) {
      console.warn('Error getting cache stats:', error);
    }
    
    return {
      memoryItems: this.memoryCache.size,
      sessionItems,
      totalSize
    };
  }

  /**
   * 预热缓存（预加载常用文档）
   */
  async preload(documents: Array<{ category: string; slug: string; subcategory?: string }>): Promise<void> {
    // 这里可以实现预加载逻辑
    // 目前只是一个占位符，实际实现需要配合DocumentLoader
    console.log('Preloading documents:', documents);
  }
}