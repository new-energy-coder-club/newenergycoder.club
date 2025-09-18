# MarkdownRenderer 核心组件实现

## 组件概述

MarkdownRenderer 是 Markdown 功能的核心组件，负责将 Markdown 内容解析并渲染为 HTML，同时保持与项目整体设计风格的一致性。

## 文件实现

### 1. 类型定义文件

**文件路径**: `src/types/markdown.ts`

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

### 2. Markdown 解析器和工具函数

**文件路径**: `src/lib/markdown/parser.ts`

```typescript
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import readingTime from 'reading-time'
import type { 
  MarkdownRenderOptions, 
  ParsedMarkdown, 
  TableOfContents,
  MarkdownMetadata 
} from '@/types/markdown'

// 默认配置
export const DEFAULT_MARKDOWN_OPTIONS: MarkdownRenderOptions = {
  enableSyntaxHighlighting: true,
  enableMath: false,
  enableTables: true,
  enableTaskLists: true,
  enableEmoji: true,
  theme: 'auto'
}

// 配置 marked
function configureMarked(options: MarkdownRenderOptions) {
  const renderer = new marked.Renderer()
  
  // 自定义标题渲染，添加锚点
  renderer.heading = function(text: string, level: number) {
    const anchor = generateAnchor(text)
    return `<h${level} id="${anchor}" class="markdown-heading markdown-h${level}">
      <a href="#${anchor}" class="markdown-anchor">#</a>
      ${text}
    </h${level}>`
  }
  
  // 自定义代码块渲染
  renderer.code = function(code: string, language?: string) {
    const lang = language || 'text'
    return `<pre class="markdown-code-block"><code class="language-${lang}">${code}</code></pre>`
  }
  
  // 自定义链接渲染
  renderer.link = function(href: string, title: string | null, text: string) {
    const titleAttr = title ? ` title="${title}"` : ''
    const isExternal = href.startsWith('http')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${href}"${titleAttr}${target} class="markdown-link">${text}</a>`
  }
  
  // 配置选项
  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false, // 我们使用 DOMPurify 进行清理
    smartLists: true,
    smartypants: false
  })
}

// 生成锚点
function generateAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // 保留中文字符
    .replace(/\s+/g, '-')
    .trim()
}

// 提取目录
function extractTableOfContents(html: string): TableOfContents[] {
  const toc: TableOfContents[] = []
  const headingRegex = /<h([1-6])\s+id="([^"]+)"[^>]*>.*?<\/h[1-6]>/g
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const anchor = match[2]
    const title = match[0].replace(/<[^>]*>/g, '').replace('#', '').trim()
    
    toc.push({
      id: anchor,
      title,
      level,
      anchor,
      children: []
    })
  }
  
  return buildTocTree(toc)
}

// 构建目录树结构
function buildTocTree(flatToc: TableOfContents[]): TableOfContents[] {
  const tree: TableOfContents[] = []
  const stack: TableOfContents[] = []
  
  for (const item of flatToc) {
    // 找到合适的父级
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      tree.push(item)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) parent.children = []
      parent.children.push(item)
    }
    
    stack.push(item)
  }
  
  return tree
}

// 提取元数据
function extractMetadata(content: string): MarkdownMetadata {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = content.match(frontMatterRegex)
  
  if (!match) return {}
  
  const frontMatter = match[1]
  const metadata: MarkdownMetadata = {}
  
  // 简单的 YAML 解析
  const lines = frontMatter.split('\n')
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      const cleanKey = key.trim() as keyof MarkdownMetadata
      
      if (cleanKey === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        // 解析数组
        metadata[cleanKey] = value
          .slice(1, -1)
          .split(',')
          .map(tag => tag.trim().replace(/["']/g, ''))
      } else if (cleanKey === 'featured' || cleanKey === 'draft') {
        metadata[cleanKey] = value.toLowerCase() === 'true'
      } else {
        ;(metadata as any)[cleanKey] = value.replace(/["']/g, '')
      }
    }
  }
  
  return metadata
}

// 清理 HTML
function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'a', 'img',
      'ul', 'ol', 'li',
      'blockquote',
      'code', 'pre',
      'strong', 'em', 'del', 'ins',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
      'target', 'rel', 'width', 'height'
    ],
    ALLOW_DATA_ATTR: false
  })
}

// 主解析函数
export function parseMarkdown(
  content: string, 
  options: MarkdownRenderOptions = {}
): ParsedMarkdown {
  const mergedOptions = { ...DEFAULT_MARKDOWN_OPTIONS, ...options }
  
  // 配置 marked
  configureMarked(mergedOptions)
  
  // 提取元数据
  const metadata = extractMetadata(content)
  
  // 移除 front matter
  const cleanContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
  
  // 解析 Markdown
  let html = marked(cleanContent) as string
  
  // 清理 HTML
  html = sanitizeHTML(html)
  
  // 提取目录
  const toc = extractTableOfContents(html)
  
  // 计算阅读时间和字数
  const stats = readingTime(cleanContent)
  
  return {
    html,
    toc,
    metadata,
    readingTime: stats.minutes,
    wordCount: stats.words
  }
}

// 生成 slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
    .substring(0, 50) // 限制长度
}

// 计算阅读时间
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content)
  return Math.ceil(stats.minutes)
}
```

### 3. MarkdownRenderer 组件

**文件路径**: `src/components/markdown/MarkdownRenderer.tsx`

```tsx
import React, { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { parseMarkdown } from '@/lib/markdown/parser'
import type { MarkdownRendererProps } from '@/types/markdown'
import { cn } from '@/lib/utils'

// 语法高亮样式（如果启用）
const loadPrismStyles = () => {
  if (typeof window !== 'undefined') {
    import('prismjs/themes/prism-tomorrow.css')
    import('prismjs/components/prism-typescript')
    import('prismjs/components/prism-jsx')
    import('prismjs/components/prism-tsx')
    import('prismjs/components/prism-bash')
    import('prismjs/components/prism-json')
    import('prismjs/components/prism-css')
    import('prismjs/components/prism-python')
    import('prismjs/components/prism-cpp')
  }
}

export function MarkdownRenderer({
  content,
  options = {},
  className,
  onContentLoad
}: MarkdownRendererProps) {
  // 解析 Markdown 内容
  const parsed = useMemo(() => {
    if (!content.trim()) return null
    
    try {
      return parseMarkdown(content, options)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      return null
    }
  }, [content, options])
  
  // 加载语法高亮
  useEffect(() => {
    if (options.enableSyntaxHighlighting && parsed?.html.includes('<code')) {
      loadPrismStyles()
      
      // 动态加载 Prism.js
      import('prismjs').then((Prism) => {
        Prism.highlightAll()
      })
    }
  }, [parsed, options.enableSyntaxHighlighting])
  
  // 通知父组件内容已加载
  useEffect(() => {
    if (parsed && onContentLoad) {
      onContentLoad(parsed)
    }
  }, [parsed, onContentLoad])
  
  if (!parsed) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">内容解析中...</div>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'markdown-renderer',
        'prose prose-lg max-w-none',
        'prose-headings:text-foreground prose-headings:font-semibold',
        'prose-p:text-muted-foreground prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-code:text-pink-600 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm',
        'prose-pre:bg-card prose-pre:border prose-pre:shadow-sm',
        'prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg',
        'prose-ul:text-muted-foreground prose-ol:text-muted-foreground',
        'prose-li:text-muted-foreground',
        'prose-table:text-sm',
        'prose-th:bg-muted prose-th:font-semibold prose-th:text-foreground',
        'prose-td:border-border',
        'prose-hr:border-border',
        'prose-img:rounded-lg prose-img:shadow-md',
        className
      )}
    >
      {/* 自定义样式 */}
      <style jsx>{`
        .markdown-renderer {
          --tw-prose-body: hsl(var(--muted-foreground));
          --tw-prose-headings: hsl(var(--foreground));
          --tw-prose-lead: hsl(var(--muted-foreground));
          --tw-prose-links: hsl(var(--primary));
          --tw-prose-bold: hsl(var(--foreground));
          --tw-prose-counters: hsl(var(--muted-foreground));
          --tw-prose-bullets: hsl(var(--muted-foreground));
          --tw-prose-hr: hsl(var(--border));
          --tw-prose-quotes: hsl(var(--foreground));
          --tw-prose-quote-borders: hsl(var(--primary));
          --tw-prose-captions: hsl(var(--muted-foreground));
          --tw-prose-code: hsl(var(--foreground));
          --tw-prose-pre-code: hsl(var(--muted-foreground));
          --tw-prose-pre-bg: hsl(var(--card));
          --tw-prose-th-borders: hsl(var(--border));
          --tw-prose-td-borders: hsl(var(--border));
        }
        
        .markdown-heading {
          position: relative;
          scroll-margin-top: 2rem;
        }
        
        .markdown-anchor {
          position: absolute;
          left: -1.5rem;
          opacity: 0;
          transition: opacity 0.2s;
          text-decoration: none;
          color: hsl(var(--muted-foreground));
          font-weight: normal;
        }
        
        .markdown-heading:hover .markdown-anchor {
          opacity: 1;
        }
        
        .markdown-code-block {
          position: relative;
          overflow-x: auto;
        }
        
        .markdown-link {
          transition: all 0.2s;
        }
        
        .markdown-link:hover {
          color: hsl(var(--primary));
        }
      `}</style>
      
      {/* 渲染 HTML 内容 */}
      <div 
        dangerouslySetInnerHTML={{ __html: parsed.html }}
        className="markdown-content"
      />
    </motion.div>
  )
}

export default MarkdownRenderer
```

### 4. useMarkdown 自定义 Hook

**文件路径**: `src/hooks/useMarkdown.ts`

```typescript
import { useState, useEffect, useCallback } from 'react'
import { parseMarkdown } from '@/lib/markdown/parser'
import type { 
  UseMarkdownReturn, 
  MarkdownRenderOptions,
  ParsedMarkdown 
} from '@/types/markdown'

export function useMarkdown(
  content: string,
  options: MarkdownRenderOptions = {}
): UseMarkdownReturn {
  const [parsed, setParsed] = useState<ParsedMarkdown | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const parseContent = useCallback(async () => {
    if (!content.trim()) {
      setParsed(null)
      setError(null)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      // 使用 setTimeout 来避免阻塞 UI
      const result = await new Promise<ParsedMarkdown>((resolve, reject) => {
        setTimeout(() => {
          try {
            const parsed = parseMarkdown(content, options)
            resolve(parsed)
          } catch (err) {
            reject(err)
          }
        }, 0)
      })
      
      setParsed(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '解析失败'
      setError(errorMessage)
      setParsed(null)
    } finally {
      setIsLoading(false)
    }
  }, [content, options])
  
  const reload = useCallback(() => {
    parseContent()
  }, [parseContent])
  
  useEffect(() => {
    parseContent()
  }, [parseContent])
  
  return {
    parsed,
    isLoading,
    error,
    reload
  }
}

export default useMarkdown
```

## 样式文件

### Markdown 专用样式

**文件路径**: `src/styles/markdown.css`

```css
/* Markdown 内容基础样式 */
.markdown-content {
  line-height: 1.7;
  color: hsl(var(--muted-foreground));
}

/* 标题样式 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  color: hsl(var(--foreground));
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-content h1 {
  font-size: 2.25rem;
  border-bottom: 2px solid hsl(var(--border));
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.875rem;
  border-bottom: 1px solid hsl(var(--border));
  padding-bottom: 0.25rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
}

.markdown-content h4 {
  font-size: 1.25rem;
}

.markdown-content h5 {
  font-size: 1.125rem;
}

.markdown-content h6 {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
}

/* 段落样式 */
.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

/* 链接样式 */
.markdown-content a {
  color: hsl(var(--primary));
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}

.markdown-content a:hover {
  border-bottom-color: hsl(var(--primary));
}

/* 列表样式 */
.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin-bottom: 0.25rem;
}

/* 引用样式 */
.markdown-content blockquote {
  border-left: 4px solid hsl(var(--primary));
  background: hsl(var(--muted) / 0.5);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
}

.markdown-content blockquote p:last-child {
  margin-bottom: 0;
}

/* 代码样式 */
.markdown-content code {
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}

.markdown-content pre {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.markdown-content pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
}

/* 表格样式 */
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid hsl(var(--border));
  padding: 0.75rem;
  text-align: left;
}

.markdown-content th {
  background: hsl(var(--muted));
  font-weight: 600;
  color: hsl(var(--foreground));
}

.markdown-content tr:nth-child(even) {
  background: hsl(var(--muted) / 0.3);
}

/* 分割线样式 */
.markdown-content hr {
  border: none;
  border-top: 1px solid hsl(var(--border));
  margin: 2rem 0;
}

/* 图片样式 */
.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin: 1rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-content {
    font-size: 0.875rem;
  }
  
  .markdown-content h1 {
    font-size: 1.875rem;
  }
  
  .markdown-content h2 {
    font-size: 1.5rem;
  }
  
  .markdown-content h3 {
    font-size: 1.25rem;
  }
  
  .markdown-content pre {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
  
  .markdown-content table {
    font-size: 0.75rem;
  }
  
  .markdown-content th,
  .markdown-content td {
    padding: 0.5rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .markdown-content code {
    background: hsl(var(--muted));
  }
  
  .markdown-content pre {
    background: hsl(var(--card));
    border-color: hsl(var(--border));
  }
}

/* 打印样式 */
@media print {
  .markdown-content {
    color: black;
  }
  
  .markdown-content a {
    color: black;
    text-decoration: underline;
  }
  
  .markdown-content pre {
    background: #f5f5f5;
    border: 1px solid #ddd;
  }
}
```

## 使用示例

### 基础使用

```tsx
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

function MyComponent() {
  const markdownContent = `
# 标题

这是一个段落。

## 子标题

- 列表项 1
- 列表项 2

\`\`\`typescript
const hello = 'world'
console.log(hello)
\`\`\`
`

  return (
    <div className="container mx-auto px-4 py-8">
      <MarkdownRenderer 
        content={markdownContent}
        options={{
          enableSyntaxHighlighting: true,
          enableTables: true
        }}
        onContentLoad={(parsed) => {
          console.log('内容已解析:', parsed)
        }}
      />
    </div>
  )
}
```

### 与 Hook 结合使用

```tsx
import { useMarkdown } from '@/hooks/useMarkdown'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

function MarkdownPage({ content }: { content: string }) {
  const { parsed, isLoading, error } = useMarkdown(content, {
    enableSyntaxHighlighting: true,
    enableMath: true
  })
  
  if (isLoading) {
    return <div className="text-center py-8">加载中...</div>
  }
  
  if (error) {
    return <div className="text-red-500 text-center py-8">错误: {error}</div>
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <MarkdownRenderer content={content} />
      
      {parsed && (
        <div className="mt-8 text-sm text-muted-foreground">
          <p>字数: {parsed.wordCount}</p>
          <p>预计阅读时间: {parsed.readingTime} 分钟</p>
        </div>
      )}
    </div>
  )
}
```

## 集成说明

1. **安装依赖**: 需要安装 marked、dompurify、reading-time 等包
2. **样式集成**: 将 markdown.css 导入到主样式文件中
3. **类型安全**: 所有组件都有完整的 TypeScript 类型定义
4. **主题适配**: 自动适配项目的深色/浅色主题
5. **响应式**: 支持移动端和桌面端显示
6. **性能优化**: 使用 useMemo 缓存解析结果
7. **安全性**: 使用 DOMPurify 清理 HTML 内容

这个实现保持了与项目整体设计风格的一致性，使用了相同的颜色变量、字体和组件模式。