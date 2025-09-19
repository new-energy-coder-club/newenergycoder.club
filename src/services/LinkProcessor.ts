/**
 * 链接处理器服务
 * 负责链接的解析、转换和处理逻辑
 */

import {
  ProcessedLink,
  DocumentContext,
  LinkType,
  LinkMetadata,
  AnchorInfo,
  ILinkDetectionService,
  ValidationResult,
  DocumentDifficulty
} from '../types/link-detection';
import { getDifficultyConfig } from '../config/DifficultyConfig';
import { LinkValidator } from './LinkValidator';
import { LinkTransformer } from './LinkTransformer';
import { globalCacheManager } from './CacheManager';
import { globalLinkBatchProcessor } from '../utils/BatchProcessor';

/**
 * 链接处理器类
 * 实现ILinkDetectionService接口，提供完整的链接处理功能
 */
export class LinkProcessor implements ILinkDetectionService {
  private validator: LinkValidator;
  private transformer: LinkTransformer;
  private cache: Map<string, ProcessedLink> = new Map();
  private processingQueue: Map<string, Promise<ProcessedLink>> = new Map();

  constructor() {
    this.validator = new LinkValidator();
    this.transformer = new LinkTransformer();
  }

  /**
   * 处理单个链接
   * @param url 链接URL
   * @param context 文档上下文
   * @returns 处理后的链接信息
   */
  async processLink(url: string, context: DocumentContext): Promise<ProcessedLink> {
    const cacheKey = this.generateCacheKey(url, context);
    
    // 检查缓存
    const cached = this.getCachedLink(cacheKey, context);
    if (cached) {
      return cached;
    }

    // 检查是否正在处理中
    const processing = this.processingQueue.get(cacheKey);
    if (processing) {
      return processing;
    }

    // 开始处理链接
    const processingPromise = this.doProcessLink(url, context);
    this.processingQueue.set(cacheKey, processingPromise);

    try {
      const result = await processingPromise;
      this.cacheLink(cacheKey, result, context);
      return result;
    } finally {
      this.processingQueue.delete(cacheKey);
    }
  }

  /**
   * 批量处理链接
   * @param urls 链接URL数组
   * @param context 文档上下文
   * @returns 处理后的链接信息数组
   */
  async processLinks(urls: string[], context: DocumentContext): Promise<ProcessedLink[]> {
    // 尝试从缓存获取处理结果
    const cacheKey = urls.join('|');
    const cached = globalCacheManager.getProcessingResult(cacheKey);
    if (cached) {
      return cached;
    }

    const config = getDifficultyConfig(context.difficulty);
    const batchSize = config.performance.batchSize;
    const results: ProcessedLink[] = [];

    // 分批处理链接
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchPromises = batch.map(url => this.processLink(url, context));
      
      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      } catch (error) {
        console.error('批量处理链接时发生错误:', error);
        // 继续处理剩余批次
      }

      // 添加延迟以避免过载
      if (i + batchSize < urls.length) {
        await this.delay(config.performance.debounceDelay);
      }
    }

    // 缓存处理结果
    globalCacheManager.cacheProcessingResult(cacheKey, results);

    return results;
  }

  /**
   * 验证链接有效性
   * @param url 链接URL
   * @returns 验证结果
   */
  async validateLink(url: string): Promise<ValidationResult> {
    return this.validator.validate(url);
  }

  /**
   * 提取文档中的所有链接
   * @param content 文档内容
   * @param context 文档上下文
   * @returns 提取的链接数组
   */
  extractLinks(content: string, context: DocumentContext): string[] {
    const links: string[] = [];
    const config = getDifficultyConfig(context.difficulty);

    // Markdown链接正则表达式
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // HTML链接正则表达式
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    // 纯URL正则表达式
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;

    let match;

    // 提取Markdown链接
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      links.push(match[2]);
    }

    // 提取HTML链接
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      links.push(match[1]);
    }

    // 如果启用深度检测，提取纯URL
    if (config.enableDeepLinkDetection) {
      while ((match = urlRegex.exec(content)) !== null) {
        if (!links.includes(match[0])) {
          links.push(match[0]);
        }
      }
    }

    // 去重并过滤
    return [...new Set(links)].filter(link => this.isValidLinkFormat(link));
  }

  /**
   * 处理文档内容，提取并处理所有链接
   * @param content 文档内容
   * @param context 文档上下文
   * @returns 处理后的链接信息数组
   */
  async processDocument(content: string, context: DocumentContext): Promise<ProcessedLink[]> {
    // 提取文档中的所有链接
    const urls = this.extractLinks(content, context);
    
    // 批量处理链接
    return this.processLinks(urls, context);
  }

  /**
   * 生成锚点导航
   * @param content 文档内容
   * @returns 锚点信息数组
   */
  generateAnchors(content: string): AnchorInfo[] {
    const anchors: AnchorInfo[] = [];
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    let match;
    let position = 0;

    while ((match = headerRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = this.generateAnchorId(text);

      anchors.push({
        id,
        text,
        level,
        position: position++
      });
    }

    // 构建层级关系
    return this.buildAnchorHierarchy(anchors);
  }

  /**
   * 实际处理链接的内部方法
   */
  private async doProcessLink(url: string, context: DocumentContext): Promise<ProcessedLink> {
    const config = getDifficultyConfig(context.difficulty);
    const startTime = Date.now();

    try {
      // 转换链接
      const transformedUrl = this.transformer.transform(url, url, {
        difficulty: context.difficulty
      });
      
      // 确定链接类型
      const linkType = this.determineLinkType(transformedUrl.processedUrl);
      
      // 生成元数据
      const metadata = await this.generateMetadata(transformedUrl.processedUrl, linkType, context);
      
      // 验证链接（如果需要）
      let isValid = true;
      let error: string | undefined;
      
      if (this.shouldValidateLink(linkType, config)) {
        const validation = await this.validateLink(transformedUrl.processedUrl);
        isValid = validation.isValid;
        error = validation.error;
      }

      return {
        originalUrl: url,
        processedUrl: transformedUrl.processedUrl,
        text: transformedUrl.text,
        type: linkType,
        isValid,
        processedAt: Date.now(),
        metadata,
        error
      };
    } catch (err) {
      return {
        originalUrl: url,
        processedUrl: url,
        text: url,
        type: LinkType.EXTERNAL,
        isValid: false,
        processedAt: Date.now(),
        metadata: {
          customAttributes: {}
        },
        error: err instanceof Error ? err.message : '处理链接时发生未知错误'
      };
    }
  }

  /**
   * 确定链接类型
   */
  private determineLinkType(url: string): LinkType {
    if (url.startsWith('#')) {
      return LinkType.ANCHOR;
    }
    
    if (url.startsWith('mailto:')) {
      return LinkType.EMAIL;
    }
    
    if (url.startsWith('tel:')) {
      return LinkType.TEL;
    }
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // 检查是否为内部链接
      if (this.isInternalLink(url)) {
        return LinkType.INTERNAL;
      }
      return LinkType.EXTERNAL;
    }
    
    if (url.startsWith('/')) {
      return LinkType.ABSOLUTE;
    }
    
    return LinkType.RELATIVE;
  }

  /**
   * 检查是否为内部链接
   */
  private isInternalLink(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const currentHost = window.location.host;
      return urlObj.host === currentHost;
    } catch {
      return false;
    }
  }

  /**
   * 生成链接元数据
   */
  private async generateMetadata(
    url: string,
    type: LinkType,
    context: DocumentContext
  ): Promise<LinkMetadata> {
    const metadata: LinkMetadata = {};

    // 根据链接类型生成不同的元数据
    switch (type) {
      case LinkType.INTERNAL:
        metadata.targetDifficulty = this.inferTargetDifficulty(url, context);
        break;
      case LinkType.EXTERNAL:
        metadata.title = await this.extractLinkTitle(url);
        break;
      case LinkType.RELATIVE:
      case LinkType.ABSOLUTE:
        metadata.fileType = this.extractFileType(url);
        metadata.isDownload = this.isDownloadLink(url);
        break;
    }

    return metadata;
  }

  /**
   * 推断目标文档难度
   */
  private inferTargetDifficulty(url: string, context: DocumentContext): DocumentDifficulty {
    const path = url.toLowerCase();
    
    if (path.includes('/basic/') || path.includes('/beginner/')) {
      return DocumentDifficulty.BASIC;
    }
    
    if (path.includes('/advanced/') || path.includes('/expert/')) {
      return DocumentDifficulty.ADVANCED;
    }
    
    if (path.includes('/intermediate/')) {
      return DocumentDifficulty.INTERMEDIATE;
    }
    
    return context.difficulty; // 默认使用当前文档难度
  }

  /**
   * 提取链接标题
   */
  private async extractLinkTitle(url: string): Promise<string | undefined> {
    try {
      // 这里可以实现更复杂的标题提取逻辑
      // 目前返回URL的域名作为标题
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return undefined;
    }
  }

  /**
   * 提取文件类型
   */
  private extractFileType(url: string): string | undefined {
    const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
    return match ? match[1].toLowerCase() : undefined;
  }

  /**
   * 检查是否为下载链接
   */
  private isDownloadLink(url: string): boolean {
    const downloadExtensions = ['pdf', 'doc', 'docx', 'zip', 'rar', 'exe', 'dmg'];
    const fileType = this.extractFileType(url);
    return fileType ? downloadExtensions.includes(fileType) : false;
  }

  /**
   * 判断是否需要验证链接
   */
  private shouldValidateLink(type: LinkType, config: any): boolean {
    if (type === LinkType.EXTERNAL) {
      return config.enableExternalLinkValidation;
    }
    return type === LinkType.INTERNAL || type === LinkType.ABSOLUTE;
  }

  /**
   * 生成缓存键
   */
  private generateCacheKey(url: string, context: DocumentContext): string {
    return `${context.difficulty}:${context.path}:${url}`;
  }

  /**
   * 获取缓存的链接
   */
  private getCachedLink(cacheKey: string, context: DocumentContext): ProcessedLink | null {
    const cached = this.cache.get(cacheKey);
    if (!cached) return null;

    const config = getDifficultyConfig(context.difficulty);
    const isExpired = Date.now() - cached.processedAt > config.cacheExpiry;
    
    if (isExpired) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached;
  }

  /**
   * 缓存链接
   */
  private cacheLink(cacheKey: string, link: ProcessedLink, context: DocumentContext): void {
    this.cache.set(cacheKey, link);
    
    // 清理过期缓存
    this.cleanupExpiredCache(context);
  }

  /**
   * 清理过期缓存
   */
  private cleanupExpiredCache(context: DocumentContext): void {
    const config = getDifficultyConfig(context.difficulty);
    const now = Date.now();
    
    for (const [key, link] of this.cache.entries()) {
      if (now - link.processedAt > config.cacheExpiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 生成锚点ID
   */
  private generateAnchorId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * 构建锚点层级关系
   */
  private buildAnchorHierarchy(anchors: AnchorInfo[]): AnchorInfo[] {
    const stack: AnchorInfo[] = [];
    
    for (const anchor of anchors) {
      // 找到合适的父级
      while (stack.length > 0 && stack[stack.length - 1].level >= anchor.level) {
        stack.pop();
      }
      
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        anchor.parentId = parent.id;
        parent.children = parent.children || [];
        parent.children.push(anchor.id);
      }
      
      stack.push(anchor);
    }
    
    return anchors;
  }

  /**
   * 验证链接格式
   */
  private isValidLinkFormat(link: string): boolean {
    if (!link || link.trim().length === 0) return false;
    
    // 排除一些明显无效的链接
    const invalidPatterns = [
      /^javascript:/i,
      /^data:/i,
      /^blob:/i
    ];
    
    return !invalidPatterns.some(pattern => pattern.test(link));
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 清理缓存
   */
  public clearCache(): void {
    this.cache.clear();
    this.processingQueue.clear();
  }

  /**
   * 获取缓存统计信息
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * 批量处理链接（优化版）
   */
  async processBatch(contents: string[]): Promise<ProcessedLink[][]> {
    try {
      // 使用批处理器进行优化处理
      const result = await globalLinkBatchProcessor.transformLinks(
        contents.map((content, index) => ({ content, index })),
        (processed, total) => {
          // 可以添加进度回调
          console.debug(`批处理进度: ${processed}/${total}`);
        }
      );

      // 处理结果
      const processedResults = await Promise.all(
        result.results.map(async (item) => {
          const defaultContext: DocumentContext = {
            difficulty: DocumentDifficulty.BASIC,
            path: '',
            title: '',
            language: 'zh-CN'
          };
          return await this.processLinks([item.content], defaultContext);
        })
      );

      return processedResults;
    } catch (error) {
      console.error('批量处理链接失败:', error);
      // 降级到原始方法
      const defaultContext: DocumentContext = {
        difficulty: DocumentDifficulty.BASIC,
        path: '',
        title: '',
        language: 'zh-CN'
      };
      const results = await Promise.all(
        contents.map(content => this.processLinks([content], defaultContext))
      );
      return results;
    }
  }

  /**
   * 批量验证链接
   */
  async validateBatch(urls: string[]): Promise<boolean[]> {
    try {
      const result = await globalLinkBatchProcessor.validateLinks(urls);
      return result.results;
    } catch (error) {
      console.error('批量验证链接失败:', error);
      // 降级到单个验证
      const validationResults = await Promise.all(urls.map(url => this.validator.validate(url)));
      return validationResults.map(result => result.isValid);
    }
  }
}