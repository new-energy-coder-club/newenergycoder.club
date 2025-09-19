/**
 * 文档难度级别配置系统
 * 为不同难度级别的文档提供差异化的链接检测和处理配置
 */

import { DocumentDifficulty, NavigationConfig } from '../types/link-detection';

/**
 * 难度级别配置接口
 * 定义每个难度级别的具体配置参数
 */
export interface DifficultyLevelConfig {
  /** 配置名称 */
  name: string;
  /** 配置描述 */
  description: string;
  /** 链接验证超时时间（毫秒） */
  validationTimeout: number;
  /** 最大并发验证数 */
  maxConcurrentValidations: number;
  /** 缓存过期时间（毫秒） */
  cacheExpiry: number;
  /** 是否启用深度链接检测 */
  enableDeepLinkDetection: boolean;
  /** 是否启用外部链接验证 */
  enableExternalLinkValidation: boolean;
  /** 重试次数 */
  retryCount: number;
  /** 重试延迟（毫秒） */
  retryDelay: number;
  /** 导航配置 */
  navigation: NavigationConfig;
  /** 性能优化配置 */
  performance: PerformanceConfig;
  /** UI展示配置 */
  ui: UIConfig;
}

/**
 * 性能优化配置接口
 */
export interface PerformanceConfig {
  /** 是否启用虚拟滚动 */
  enableVirtualScrolling: boolean;
  /** 批处理大小 */
  batchSize: number;
  /** 防抖延迟（毫秒） */
  debounceDelay: number;
  /** 是否启用预加载 */
  enablePreloading: boolean;
  /** 预加载阈值 */
  preloadThreshold: number;
}

/**
 * UI展示配置接口
 */
export interface UIConfig {
  /** 是否显示链接图标 */
  showLinkIcons: boolean;
  /** 是否显示链接预览 */
  showLinkPreview: boolean;
  /** 是否显示难度标识 */
  showDifficultyBadge: boolean;
  /** 链接样式类名 */
  linkClassName: string;
  /** 错误链接样式类名 */
  errorLinkClassName: string;
  /** 加载中样式类名 */
  loadingClassName: string;
  /** 动画持续时间（毫秒） */
  animationDuration: number;
}

/**
 * 基础级别配置
 * 适用于初学者文档，提供简化的链接检测功能
 */
const BASIC_CONFIG: DifficultyLevelConfig = {
  name: '基础级别',
  description: '适用于初学者文档，提供简化的链接检测和导航功能',
  validationTimeout: 3000,
  maxConcurrentValidations: 3,
  cacheExpiry: 30 * 60 * 1000, // 30分钟
  enableDeepLinkDetection: false,
  enableExternalLinkValidation: true,
  retryCount: 1,
  retryDelay: 1000,
  navigation: {
    smoothScroll: true,
    scrollOffset: 80,
    autoHighlight: true,
    highlightClass: 'bg-blue-100 border-l-4 border-blue-500',
    showBackToTop: true,
    backToTopThreshold: 300
  },
  performance: {
    enableVirtualScrolling: false,
    batchSize: 10,
    debounceDelay: 300,
    enablePreloading: false,
    preloadThreshold: 2
  },
  ui: {
    showLinkIcons: true,
    showLinkPreview: false,
    showDifficultyBadge: true,
    linkClassName: 'text-blue-600 hover:text-blue-800 underline transition-colors duration-200',
    errorLinkClassName: 'text-red-600 hover:text-red-800 line-through',
    loadingClassName: 'text-gray-400 animate-pulse',
    animationDuration: 200
  }
};

/**
 * 中级级别配置
 * 适用于进阶文档，提供平衡的功能和性能
 */
const INTERMEDIATE_CONFIG: DifficultyLevelConfig = {
  name: '中级级别',
  description: '适用于进阶文档，提供平衡的链接检测功能和性能优化',
  validationTimeout: 5000,
  maxConcurrentValidations: 5,
  cacheExpiry: 60 * 60 * 1000, // 1小时
  enableDeepLinkDetection: true,
  enableExternalLinkValidation: true,
  retryCount: 2,
  retryDelay: 1500,
  navigation: {
    smoothScroll: true,
    scrollOffset: 60,
    autoHighlight: true,
    highlightClass: 'bg-green-100 border-l-4 border-green-500',
    showBackToTop: true,
    backToTopThreshold: 400
  },
  performance: {
    enableVirtualScrolling: true,
    batchSize: 20,
    debounceDelay: 200,
    enablePreloading: true,
    preloadThreshold: 3
  },
  ui: {
    showLinkIcons: true,
    showLinkPreview: true,
    showDifficultyBadge: true,
    linkClassName: 'text-green-600 hover:text-green-800 underline decoration-2 transition-all duration-300',
    errorLinkClassName: 'text-red-600 hover:text-red-800 line-through opacity-75',
    loadingClassName: 'text-gray-500 animate-pulse',
    animationDuration: 300
  }
};

/**
 * 高级级别配置
 * 适用于专家文档，提供完整的功能和高级优化
 */
const ADVANCED_CONFIG: DifficultyLevelConfig = {
  name: '高级级别',
  description: '适用于专家文档，提供完整的链接检测功能和高级性能优化',
  validationTimeout: 8000,
  maxConcurrentValidations: 10,
  cacheExpiry: 2 * 60 * 60 * 1000, // 2小时
  enableDeepLinkDetection: true,
  enableExternalLinkValidation: true,
  retryCount: 3,
  retryDelay: 2000,
  navigation: {
    smoothScroll: true,
    scrollOffset: 40,
    autoHighlight: true,
    highlightClass: 'bg-purple-100 border-l-4 border-purple-500',
    showBackToTop: true,
    backToTopThreshold: 500
  },
  performance: {
    enableVirtualScrolling: true,
    batchSize: 50,
    debounceDelay: 100,
    enablePreloading: true,
    preloadThreshold: 5
  },
  ui: {
    showLinkIcons: true,
    showLinkPreview: true,
    showDifficultyBadge: true,
    linkClassName: 'text-purple-600 hover:text-purple-800 underline decoration-2 hover:decoration-wavy transition-all duration-400',
    errorLinkClassName: 'text-red-600 hover:text-red-800 line-through opacity-60',
    loadingClassName: 'text-gray-600 animate-pulse',
    animationDuration: 400
  }
};

/**
 * 难度级别配置映射
 * 将难度枚举映射到具体的配置对象
 */
export const DIFFICULTY_CONFIGS: Record<DocumentDifficulty, DifficultyLevelConfig> = {
  [DocumentDifficulty.BASIC]: BASIC_CONFIG,
  [DocumentDifficulty.INTERMEDIATE]: INTERMEDIATE_CONFIG,
  [DocumentDifficulty.ADVANCED]: ADVANCED_CONFIG
};

/**
 * 获取指定难度级别的配置
 * @param difficulty 文档难度级别
 * @returns 对应的配置对象
 */
export function getDifficultyConfig(difficulty: DocumentDifficulty): DifficultyLevelConfig {
  return DIFFICULTY_CONFIGS[difficulty] || BASIC_CONFIG;
}

/**
 * 获取所有可用的难度级别
 * @returns 难度级别数组
 */
export function getAvailableDifficulties(): DocumentDifficulty[] {
  return Object.values(DocumentDifficulty);
}

/**
 * 根据文档路径推断难度级别
 * @param documentPath 文档路径
 * @returns 推断的难度级别
 */
export function inferDifficultyFromPath(documentPath: string): DocumentDifficulty {
  const path = documentPath.toLowerCase();
  
  if (path.includes('/basic/') || path.includes('/beginner/') || path.includes('/intro/')) {
    return DocumentDifficulty.BASIC;
  }
  
  if (path.includes('/advanced/') || path.includes('/expert/') || path.includes('/pro/')) {
    return DocumentDifficulty.ADVANCED;
  }
  
  if (path.includes('/intermediate/') || path.includes('/medium/')) {
    return DocumentDifficulty.INTERMEDIATE;
  }
  
  // 默认返回基础级别
  return DocumentDifficulty.BASIC;
}

/**
 * 合并配置对象
 * @param baseConfig 基础配置
 * @param overrides 覆盖配置
 * @returns 合并后的配置
 */
export function mergeConfigs(
  baseConfig: DifficultyLevelConfig,
  overrides: Partial<DifficultyLevelConfig>
): DifficultyLevelConfig {
  return {
    ...baseConfig,
    ...overrides,
    navigation: {
      ...baseConfig.navigation,
      ...overrides.navigation
    },
    performance: {
      ...baseConfig.performance,
      ...overrides.performance
    },
    ui: {
      ...baseConfig.ui,
      ...overrides.ui
    }
  };
}

/**
 * 验证配置对象的有效性
 * @param config 配置对象
 * @returns 验证结果
 */
export function validateConfig(config: DifficultyLevelConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (config.validationTimeout <= 0) {
    errors.push('验证超时时间必须大于0');
  }
  
  if (config.maxConcurrentValidations <= 0) {
    errors.push('最大并发验证数必须大于0');
  }
  
  if (config.cacheExpiry <= 0) {
    errors.push('缓存过期时间必须大于0');
  }
  
  if (config.retryCount < 0) {
    errors.push('重试次数不能为负数');
  }
  
  if (config.retryDelay < 0) {
    errors.push('重试延迟不能为负数');
  }
  
  if (config.navigation.scrollOffset < 0) {
    errors.push('滚动偏移量不能为负数');
  }
  
  if (config.navigation.backToTopThreshold < 0) {
    errors.push('返回顶部阈值不能为负数');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 默认导出配置管理器
 */
export default {
  getDifficultyConfig,
  getAvailableDifficulties,
  inferDifficultyFromPath,
  mergeConfigs,
  validateConfig,
  DIFFICULTY_CONFIGS
};