/**
 * 文档链接自动检测系统的TypeScript类型定义
 * 提供完整的类型支持，确保类型安全和开发体验
 */

/**
 * 链接类型枚举
 * 定义系统支持的所有链接类型
 */
export enum LinkType {
  /** 内部文档链接 */
  INTERNAL = 'internal',
  /** 外部链接 */
  EXTERNAL = 'external',
  /** 锚点链接 */
  ANCHOR = 'anchor',
  /** 相对路径链接 */
  RELATIVE = 'relative',
  /** 绝对路径链接 */
  ABSOLUTE = 'absolute',
  /** 邮件链接 */
  EMAIL = 'email',
  /** 电话链接 */
  TEL = 'tel'
}

/**
 * 文档难度级别枚举
 * 对应低级、中级、高级三个层次
 */
export enum DocumentDifficulty {
  /** 低级/基础 */
  BASIC = 'basic',
  /** 中级/进阶 */
  INTERMEDIATE = 'intermediate',
  /** 高级/专家 */
  ADVANCED = 'advanced'
}

/**
 * 处理后的链接信息接口
 * 包含链接的完整元数据和处理结果
 */
export interface ProcessedLink {
  /** 原始链接URL */
  originalUrl: string;
  /** 处理后的链接URL */
  processedUrl: string;
  /** 链接类型 */
  type: LinkType;
  /** 链接是否有效 */
  isValid: boolean;
  /** 链接元数据 */
  metadata: LinkMetadata;
  /** 错误信息（如果有） */
  error?: string;
  /** 处理时间戳 */
  processedAt: number;
}

/**
 * 文档上下文信息接口
 * 提供文档的完整上下文信息
 */
export interface DocumentContext {
  /** 文档路径 */
  path: string;
  /** 文档难度级别 */
  difficulty: DocumentDifficulty;
  /** 文档标题 */
  title: string;
  /** 文档语言 */
  language: string;
  /** 文档分类/标签 */
  category?: string;
  /** 文档作者 */
  author?: string;
  /** 最后修改时间 */
  lastModified?: string;
  /** 文档元数据 */
  metadata?: Record<string, any>;
}

/**
 * 链接元数据接口
 * 存储链接的详细信息
 */
export interface LinkMetadata {
  /** 链接标题 */
  title?: string;
  /** 链接描述 */
  description?: string;
  /** 目标文档难度（如果是内部链接） */
  targetDifficulty?: DocumentDifficulty;
  /** 是否为下载链接 */
  isDownload?: boolean;
  /** 文件类型（如果是文件链接） */
  fileType?: string;
  /** 文件大小（如果是文件链接） */
  fileSize?: number;
  /** 链接权重/重要性 */
  weight?: number;
  /** 自定义属性 */
  customAttributes?: Record<string, string>;
}

/**
 * 锚点信息接口
 * 用于页面内导航的锚点数据
 */
export interface AnchorInfo {
  /** 锚点ID */
  id: string;
  /** 锚点文本内容 */
  text: string;
  /** 锚点层级（h1-h6） */
  level: number;
  /** 锚点在文档中的位置 */
  position: number;
  /** 父级锚点ID（用于构建层级结构） */
  parentId?: string;
  /** 子级锚点ID列表 */
  children?: string[];
}

/**
 * 链接检测服务接口
 * 定义链接检测服务的核心方法
 */
export interface ILinkDetectionService {
  /**
   * 处理单个链接
   * @param url 链接URL
   * @param context 文档上下文
   * @returns 处理后的链接信息
   */
  processLink(url: string, context: DocumentContext): Promise<ProcessedLink>;

  /**
   * 批量处理链接
   * @param urls 链接URL数组
   * @param context 文档上下文
   * @returns 处理后的链接信息数组
   */
  processLinks(urls: string[], context: DocumentContext): Promise<ProcessedLink[]>;

  /**
   * 验证链接有效性
   * @param url 链接URL
   * @returns 验证结果
   */
  validateLink(url: string): Promise<ValidationResult>;

  /**
   * 提取文档中的所有链接
   * @param content 文档内容
   * @param context 文档上下文
   * @returns 提取的链接数组
   */
  extractLinks(content: string, context: DocumentContext): string[];

  /**
   * 生成锚点导航
   * @param content 文档内容
   * @returns 锚点信息数组
   */
  generateAnchors(content: string): AnchorInfo[];
}

/**
 * 链接验证结果接口
 * 包含链接验证的详细结果
 */
export interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** HTTP状态码（如果适用） */
  statusCode?: number;
  /** 响应时间（毫秒） */
  responseTime?: number;
  /** 错误信息 */
  error?: string;
  /** 重定向URL（如果有重定向） */
  redirectUrl?: string;
  /** 验证时间戳 */
  validatedAt: number;
}

/**
 * 导航配置接口
 * 用于配置文档导航行为
 */
export interface NavigationConfig {
  /** 是否启用平滑滚动 */
  smoothScroll: boolean;
  /** 滚动偏移量 */
  scrollOffset: number;
  /** 是否自动高亮当前锚点 */
  autoHighlight: boolean;
  /** 高亮样式类名 */
  highlightClass: string;
  /** 是否显示返回顶部按钮 */
  showBackToTop: boolean;
  /** 返回顶部按钮显示阈值 */
  backToTopThreshold: number;
}

/**
 * Hook选项接口
 * 用于配置useLinkProcessor Hook的行为
 */
export interface UseLinkProcessorOptions {
  /** 文档上下文 */
  context: DocumentContext;
  /** 是否启用缓存 */
  enableCache?: boolean;
  /** 缓存过期时间（毫秒） */
  cacheExpiry?: number;
  /** 是否自动处理链接 */
  autoProcess?: boolean;
  /** 处理延迟（毫秒） */
  debounceDelay?: number;
  /** 错误重试次数 */
  retryCount?: number;
  /** 自定义验证函数 */
  customValidator?: (url: string) => Promise<boolean>;
}

/**
 * Hook返回值接口
 * 定义useLinkProcessor Hook的返回值结构
 */
export interface UseLinkProcessorReturn {
  /** 处理后的链接数组 */
  processedLinks: ProcessedLink[];
  /** 是否正在处理 */
  isProcessing: boolean;
  /** 错误信息 */
  error: string | null;
  /** 处理链接的方法 */
  processLink: (url: string) => Promise<ProcessedLink>;
  /** 批量处理链接的方法 */
  processLinks: (urls: string[]) => Promise<ProcessedLink[]>;
  /** 清除缓存的方法 */
  clearCache: () => void;
  /** 重新处理的方法 */
  reprocess: () => Promise<void>;
}

/**
 * 缓存条目接口
 * 用于链接处理结果的缓存
 */
export interface CacheEntry<T = any> {
  /** 缓存的数据 */
  data: T;
  /** 缓存时间戳 */
  timestamp: number;
  /** 过期时间戳 */
  expiresAt: number;
  /** 访问次数 */
  accessCount: number;
  /** 最后访问时间 */
  lastAccessed: number;
}

/**
 * 性能指标接口
 * 用于监控系统性能
 */
export interface PerformanceMetrics {
  /** 处理的链接总数 */
  totalLinksProcessed: number;
  /** 平均处理时间（毫秒） */
  averageProcessingTime: number;
  /** 缓存命中率 */
  cacheHitRate: number;
  /** 错误率 */
  errorRate: number;
  /** 内存使用量（字节） */
  memoryUsage: number;
  /** 最后更新时间 */
  lastUpdated: number;
}

/**
 * 事件类型枚举
 * 定义系统支持的事件类型
 */
export enum EventType {
  /** 链接处理开始 */
  LINK_PROCESSING_START = 'link_processing_start',
  /** 链接处理完成 */
  LINK_PROCESSING_COMPLETE = 'link_processing_complete',
  /** 链接验证失败 */
  LINK_VALIDATION_FAILED = 'link_validation_failed',
  /** 缓存更新 */
  CACHE_UPDATED = 'cache_updated',
  /** 性能指标更新 */
  METRICS_UPDATED = 'metrics_updated'
}

/**
 * 事件数据接口
 * 定义事件携带的数据结构
 */
export interface EventData {
  /** 事件类型 */
  type: EventType;
  /** 事件时间戳 */
  timestamp: number;
  /** 事件数据载荷 */
  payload: any;
  /** 事件来源 */
  source?: string;
}