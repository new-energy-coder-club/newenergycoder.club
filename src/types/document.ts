// 文档元数据接口
export interface DocumentMeta {
  title: string;
  description: string;
  order: number;
  items?: DocumentItem[];
  subcategories?: DocumentSubcategory[];
}

// 文档项接口
export interface DocumentItem {
  slug: string;
  title: string;
  description: string;
  order: number;
  tags?: string[];
  lastModified?: string;
}

// 文档子分类接口
export interface DocumentSubcategory {
  slug: string;
  title: string;
  description: string;
  order: number;
}

// 文档内容接口
export interface DocumentContent {
  slug: string;
  title: string;
  description?: string;
  content: string;
  frontMatter: DocumentFrontMatter;
  toc: TableOfContentsItem[];
  lastModified?: string;
}

// Front Matter接口
export interface DocumentFrontMatter {
  title: string;
  description?: string;
  tags?: string[];
  category: string;
  subcategory?: string;
  order?: number;
  lastModified?: string;
  author?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// 目录项接口
export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

// 文档加载状态
export type DocumentLoadState = 'idle' | 'loading' | 'success' | 'error';

// 文档加载结果
export interface DocumentLoadResult {
  state: DocumentLoadState;
  data?: DocumentContent;
  error?: string;
}

// 文档缓存项
export interface DocumentCacheItem {
  content: DocumentContent;
  timestamp: number;
  ttl: number;
}

// 文档搜索结果
export interface DocumentSearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  excerpt: string;
  score: number;
}