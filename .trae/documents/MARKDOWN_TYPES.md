# Markdown 功能类型定义

## TypeScript 类型定义文件

### 文件路径: `src/types/markdown.ts`

```typescript
// Markdown 文档接口
export interface MarkdownDocument {
  id: string
  title: string
  content: string
  author?: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  category?: string
  slug: string
  excerpt?: string
  readingTime?: number
  isPublished: boolean
}

// Markdown 渲染配置
export interface MarkdownRenderOptions {
  enableSyntaxHighlighting?: boolean
  enableMath?: boolean
  enableTables?: boolean
  enableTaskLists?: boolean
  enableEmoji?: boolean
  customCSS?: string
  theme?: 'light' | 'dark' | 'auto'
}

// Markdown 解析结果
export interface ParsedMarkdown {
  html: string
  toc?: TableOfContents[]
  metadata?: MarkdownMetadata
  readingTime: number
  wordCount: number
}

// 目录结构
export interface TableOfContents {
  id: string
  title: string
  level: number
  anchor: string
  children?: TableOfContents[]
}

// Markdown 元数据
export interface MarkdownMetadata {
  title?: string
  description?: string
  author?: string
  date?: string
  tags?: string[]
  category?: string
  featured?: boolean
  draft?: boolean
}

// Markdown 组件 Props
export interface MarkdownRendererProps {
  content: string
  options?: MarkdownRenderOptions
  className?: string
  onContentLoad?: (parsed: ParsedMarkdown) => void
}

export interface MarkdownViewerProps {
  document: MarkdownDocument
  showToc?: boolean
  showMetadata?: boolean
  className?: string
}

export interface MarkdownPageProps {
  slug: string
  fallbackContent?: string
}

// Hook 返回类型
export interface UseMarkdownReturn {
  parsed: ParsedMarkdown | null
  isLoading: boolean
  error: string | null
  reload: () => void
}

export interface UseMarkdownDocumentReturn {
  document: MarkdownDocument | null
  isLoading: boolean
  error: string | null
  reload: () => void
}

// 工具函数类型
export type MarkdownParser = (content: string, options?: MarkdownRenderOptions) => ParsedMarkdown
export type SlugGenerator = (title: string) => string
export type ReadingTimeCalculator = (content: string) => number
```

## 依赖包说明

### 需要安装的包

```bash
# 核心 Markdown 解析
npm install marked
npm install @types/marked

# 语法高亮
npm install prismjs
npm install @types/prismjs

# 数学公式支持 (可选)
npm install katex
npm install @types/katex

# HTML 清理 (安全性)
npm install dompurify
npm install @types/dompurify

# 工具库
npm install reading-time
npm install @types/reading-time
```

### 包功能说明

1. **marked**: 快速的 Markdown 解析器
2. **prismjs**: 语法高亮库
3. **katex**: 数学公式渲染 (可选)
4. **dompurify**: HTML 内容清理，防止 XSS 攻击
5. **reading-time**: 计算阅读时间

## 组件架构设计

### 组件层次结构

```
MarkdownPage (页面容器)
├── MarkdownViewer (文档查看器)
│   ├── MarkdownRenderer (内容渲染器)
│   ├── TableOfContents (目录组件)
│   └── DocumentMetadata (元数据显示)
└── MarkdownNavigation (导航组件)
```

### 文件结构

```
src/
├── components/
│   └── markdown/
│       ├── MarkdownRenderer.tsx
│       ├── MarkdownViewer.tsx
│       ├── MarkdownPage.tsx
│       ├── TableOfContents.tsx
│       └── DocumentMetadata.tsx
├── hooks/
│   ├── useMarkdown.ts
│   └── useMarkdownDocument.ts
├── lib/
│   └── markdown/
│       ├── parser.ts
│       ├── utils.ts
│       └── config.ts
├── types/
│   └── markdown.ts
└── styles/
    └── markdown.css
```

## 样式集成策略

### Tailwind CSS 类名约定

```css
/* Markdown 内容样式 */
.markdown-content {
  @apply prose prose-lg max-w-none;
  @apply prose-headings:text-gray-900 prose-headings:font-semibold;
  @apply prose-p:text-gray-700 prose-p:leading-relaxed;
  @apply prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline;
  @apply prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded;
  @apply prose-pre:bg-gray-900 prose-pre:text-gray-100;
}

/* 深色模式支持 */
.dark .markdown-content {
  @apply prose-invert;
  @apply prose-headings:text-gray-100;
  @apply prose-p:text-gray-300;
  @apply prose-code:text-pink-400 prose-code:bg-gray-800;
}
```

### 语法高亮主题

```typescript
// 支持的主题
export const SYNTAX_THEMES = {
  light: 'prism-tomorrow',
  dark: 'prism-tomorrow-night',
  auto: 'prism-auto'
} as const
```

## API 接口设计

### RESTful API (如果需要后端)

```typescript
// GET /api/markdown/:slug
interface GetMarkdownResponse {
  success: boolean
  data: MarkdownDocument
  message?: string
}

// POST /api/markdown/parse
interface ParseMarkdownRequest {
  content: string
  options?: MarkdownRenderOptions
}

interface ParseMarkdownResponse {
  success: boolean
  data: ParsedMarkdown
  message?: string
}
```

### 前端 API 函数

```typescript
// src/lib/markdown/api.ts
export async function fetchMarkdownDocument(slug: string): Promise<MarkdownDocument>
export async function parseMarkdownContent(content: string, options?: MarkdownRenderOptions): Promise<ParsedMarkdown>
export async function generateSlug(title: string): Promise<string>
```

## 配置选项

### 默认配置

```typescript
// src/lib/markdown/config.ts
export const DEFAULT_MARKDOWN_OPTIONS: MarkdownRenderOptions = {
  enableSyntaxHighlighting: true,
  enableMath: false,
  enableTables: true,
  enableTaskLists: true,
  enableEmoji: true,
  theme: 'auto'
}

export const MARKDOWN_CONFIG = {
  maxContentLength: 100000, // 100KB
  cacheTimeout: 5 * 60 * 1000, // 5分钟
  supportedExtensions: ['.md', '.markdown'],
  defaultAuthor: '新能源编程俱乐部',
  baseUrl: '/markdown'
}
```

## 安全考虑

### XSS 防护

```typescript
import DOMPurify from 'dompurify'

// 清理 HTML 内容
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'strong', 'em', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id']
  })
}
```

### 内容验证

```typescript
// 验证 Markdown 文档
export function validateMarkdownDocument(doc: Partial<MarkdownDocument>): string[] {
  const errors: string[] = []
  
  if (!doc.title?.trim()) {
    errors.push('标题不能为空')
  }
  
  if (!doc.content?.trim()) {
    errors.push('内容不能为空')
  }
  
  if (doc.content && doc.content.length > MARKDOWN_CONFIG.maxContentLength) {
    errors.push(`内容长度不能超过 ${MARKDOWN_CONFIG.maxContentLength} 字符`)
  }
  
  return errors
}
```