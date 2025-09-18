import { DocumentSubcategory } from './document';

// Navigation types for document system
// These interfaces will be used when implementing the DocumentNavigation component

export interface DocumentCategory {
  id: string;
  title: string;
  slug: string;
  subcategories: DocumentSubcategory[];
  order?: number;
}

// 导航树节点接口
export interface NavigationNode {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  order: number;
  level: number;
  children?: NavigationNode[];
  parent?: NavigationNode;
  isActive?: boolean;
  isExpanded?: boolean;
}

// 导航分类接口
export interface NavigationCategory {
  slug: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
  items: NavigationItem[];
  subcategories: NavigationSubcategory[];
}

// 导航子分类接口
export interface NavigationSubcategory {
  slug: string;
  title: string;
  description: string;
  order: number;
  category: string;
  items: NavigationItem[];
}

// 导航项接口
export interface NavigationItem {
  slug: string;
  title: string;
  description: string;
  order: number;
  category: string;
  subcategory?: string;
  path: string;
  tags?: string[];
}

// 导航构建配置
export interface NavigationConfig {
  maxDepth: number;
  showIcons: boolean;
  showDescriptions: boolean;
  collapsible: boolean;
  defaultExpanded: boolean;
}

// 导航状态管理
export interface NavigationState {
  categories: NavigationCategory[];
  currentPath: string;
  expandedNodes: Set<string>;
  activeNode?: string;
  isLoading: boolean;
  error?: string;
}

// 导航操作类型
export type NavigationAction = 
  | { type: 'SET_CATEGORIES'; payload: NavigationCategory[] }
  | { type: 'SET_CURRENT_PATH'; payload: string }
  | { type: 'TOGGLE_NODE'; payload: string }
  | { type: 'EXPAND_NODE'; payload: string }
  | { type: 'COLLAPSE_NODE'; payload: string }
  | { type: 'SET_ACTIVE_NODE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined };

// 导航搜索结果
export interface NavigationSearchResult {
  item: NavigationItem;
  matches: {
    title?: boolean;
    description?: boolean;
    tags?: boolean;
  };
  score: number;
}