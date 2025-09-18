// 文档路由参数接口
export interface DocumentRouteParams extends Record<string, string | undefined> {
  category: string;
  subcategory?: string;
  slug: string;
}

// 路由配置接口
export interface DocumentRouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  children?: DocumentRouteConfig[];
}

// 面包屑导航项
export interface BreadcrumbItem {
  title: string;
  path?: string;
  active?: boolean;
}

// 导航状态
export interface NavigationState {
  currentCategory?: string;
  currentSubcategory?: string;
  currentSlug?: string;
  breadcrumbs: BreadcrumbItem[];
}

// 路由解析结果
export interface RouteParseResult {
  category: string;
  subcategory?: string;
  slug: string;
  isValid: boolean;
  error?: string;
}

// 文档URL构建参数
export interface DocumentUrlParams {
  category: string;
  subcategory?: string;
  slug: string;
  hash?: string;
}

// 路由守卫结果
export interface RouteGuardResult {
  canActivate: boolean;
  redirectTo?: string;
  error?: string;
}