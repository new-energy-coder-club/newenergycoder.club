// Markdown相关类型定义

// Markdown渲染配置接口
export interface MarkdownConfig {
  // 是否启用GitHub风格的Markdown
  enableGFM?: boolean;
  // 是否启用代码高亮
  enableSyntaxHighlight?: boolean;
  // 代码高亮主题
  syntaxTheme?: 'light' | 'dark' | 'auto';
  // 是否启用数学公式
  enableMath?: boolean;
  // 是否启用表格
  enableTables?: boolean;
  // 是否启用任务列表
  enableTaskLists?: boolean;
  // 是否启用链接在新窗口打开
  openLinksInNewTab?: boolean;
}

// Markdown内容接口
export interface MarkdownContent {
  // 内容ID
  id: string;
  // 标题
  title: string;
  // Markdown原始内容
  content: string;
  // 作者
  author?: string;
  // 创建时间
  createdAt?: string;
  // 更新时间
  updatedAt?: string;
  // 标签
  tags?: string[];
  // 分类
  category?: string;
  // 摘要
  summary?: string;
  // 封面图片
  coverImage?: string;
  // 是否发布
  published?: boolean;
}

// Markdown渲染器属性接口
export interface MarkdownRendererProps {
  // Markdown内容
  content: string;
  // 渲染配置
  config?: MarkdownConfig;
  // 自定义CSS类名
  className?: string;
  // 加载状态
  loading?: boolean;
  // 错误状态
  error?: string | null;
  // 内容变化回调
  onContentChange?: (content: string) => void;
}

// Markdown页面属性接口
export interface MarkdownPageProps {
  // 内容数据
  content?: MarkdownContent;
  // 是否显示元信息
  showMetadata?: boolean;
  // 是否显示目录
  showTOC?: boolean;
  // 自定义样式
  customStyles?: React.CSSProperties;
  // 返回按钮配置
  backButton?: {
    show: boolean;
    text?: string;
    href?: string;
  };
}

// Markdown查看器属性接口
export interface MarkdownViewerProps {
  // 文章ID或URL
  source: string;
  // 源类型
  sourceType: 'id' | 'url' | 'content';
  // 页面配置
  pageConfig?: MarkdownPageProps;
  // 渲染配置
  renderConfig?: MarkdownConfig;
}

// useMarkdown Hook返回值接口
export interface UseMarkdownReturn {
  // 渲染后的内容
  renderedContent: string;
  // 加载状态
  loading: boolean;
  // 错误信息
  error: string | null;
  // 重新加载函数
  reload: () => void;
  // 更新配置函数
  updateConfig: (config: Partial<MarkdownConfig>) => void;
}

// Markdown API响应接口
export interface MarkdownApiResponse {
  success: boolean;
  data?: MarkdownContent;
  error?: string;
  message?: string;
}

// 默认配置
export const DEFAULT_MARKDOWN_CONFIG: MarkdownConfig = {
  enableGFM: true,
  enableSyntaxHighlight: true,
  syntaxTheme: 'auto',
  enableMath: false,
  enableTables: true,
  enableTaskLists: true,
  openLinksInNewTab: true,
};

// 支持的语法高亮主题
export const SYNTAX_THEMES = {
  light: 'github',
  dark: 'tomorrow-night',
  auto: 'github', // 默认使用light主题，可通过CSS媒体查询切换
} as const;

// Markdown文件类型
export type MarkdownFileType = 'md' | 'markdown' | 'txt';

// 内容来源类型
export type ContentSourceType = 'local' | 'remote' | 'api';

// 渲染状态类型
export type RenderStatus = 'idle' | 'loading' | 'success' | 'error';