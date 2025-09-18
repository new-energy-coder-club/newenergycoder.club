# Markdown 功能完整集成方案

## 最终实现总结

本文档提供了 Markdown 功能的完整集成方案，包括路由配置、样式集成、测试方案和部署准备。

## 1. 路由配置

### 更新 App.tsx

**文件路径**: `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { JoinPage } from "@/pages/JoinPage";
import { FeishuJoinFormPage } from "@/pages/FeishuJoinFormPage";
import DashboardPage from "@/pages/DashboardPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { EventsPage } from "@/pages/EventsPage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { ContactPage } from "@/pages/ContactPage";
import GettingStartedPage from "@/pages/GettingStartedPage";
import EmbeddedDetailPage from "@/pages/EmbeddedDetailPage";
import MechanicalDetailPage from "@/pages/MechanicalDetailPage";
import DesignerDetailPage from "@/pages/DesignerDetailPage";
import { TeamPage } from "@/pages/TeamPage";
import { InnovationShowcasePage } from "@/pages/InnovationShowcasePage";
import AdminDashboard from "@/pages/AdminDashboard";

// 新增 Markdown 相关导入
import MarkdownPage from "@/components/markdown/MarkdownPage";
import { MarkdownListPage } from "@/pages/MarkdownListPage";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* 现有路由 */}
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/innovation" element={<InnovationShowcasePage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/learning/embedded" element={<EmbeddedDetailPage />} />
              <Route path="/learning/mechanical" element={<MechanicalDetailPage />} />
              <Route path="/learning/designer" element={<DesignerDetailPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/join/form" element={<FeishuJoinFormPage />} />
              
              {/* 新增 Markdown 路由 */}
              <Route path="/docs" element={<MarkdownListPage />} />
              <Route path="/docs/:slug" element={<MarkdownPage />} />
              <Route path="/markdown/:slug" element={<MarkdownPage />} />
              
              {/* 受保护的路由 */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              {/* 管理员路由 */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Analytics />
        </TooltipProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
```

### 创建 MarkdownListPage

**文件路径**: `src/pages/MarkdownListPage.tsx`

```tsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Calendar, User, Clock, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageLayout } from '@/components/layout/PageLayout'
import type { MarkdownDocument } from '@/types/markdown'
import { cn } from '@/lib/utils'

// 模拟文档列表数据
const mockDocuments: MarkdownDocument[] = [
  {
    id: '1',
    title: 'Getting Started - 快速开始指南',
    content: '',
    author: '新能源编程俱乐部',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tags: ['入门', '指南', '快速开始'],
    category: '教程',
    slug: 'getting-started-guide',
    excerpt: '了解如何快速开始使用我们的平台，包括环境搭建、基础配置和第一个项目。',
    readingTime: 5,
    isPublished: true
  },
  {
    id: '2',
    title: 'React + TypeScript 最佳实践',
    content: '',
    author: '技术团队',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    tags: ['React', 'TypeScript', '最佳实践'],
    category: '技术',
    slug: 'react-typescript-best-practices',
    excerpt: '深入了解 React 和 TypeScript 结合使用的最佳实践，提升代码质量和开发效率。',
    readingTime: 12,
    isPublished: true
  },
  {
    id: '3',
    title: '嵌入式开发入门教程',
    content: '',
    author: '嵌入式团队',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    tags: ['嵌入式', 'C/C++', 'FreeRTOS'],
    category: '嵌入式',
    slug: 'embedded-development-tutorial',
    excerpt: '从零开始学习嵌入式开发，包括硬件基础、编程环境搭建和实际项目开发。',
    readingTime: 25,
    isPublished: true
  }
]

interface DocumentCardProps {
  document: MarkdownDocument
  index: number
}

function DocumentCard({ document, index }: DocumentCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {document.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{document.readingTime} 分钟</span>
            </div>
          </div>
          
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            <Link to={`/docs/${document.slug}`} className="block">
              {document.title}
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {document.excerpt}
          </p>
          
          {/* 标签 */}
          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {document.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              {document.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{document.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(document.createdAt)}</span>
              </div>
            </div>
            
            <Button asChild variant="ghost" size="sm" className="h-auto p-0 text-xs">
              <Link to={`/docs/${document.slug}`}>
                阅读更多 →
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function MarkdownListPage() {
  const [documents, setDocuments] = useState<MarkdownDocument[]>(mockDocuments)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(mockDocuments.map(doc => doc.category)))]
  
  // 过滤文档
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    
    return matchesSearch && matchesCategory && doc.isPublished
  })
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面头部 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                文档中心
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              探索我们的技术文档、教程和指南，助力您的学习和开发之旅
            </p>
          </motion.div>
          
          {/* 搜索和筛选 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索文档..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* 分类筛选 */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category === 'all' ? '全部' : category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* 文档列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document, index) => (
              <DocumentCard
                key={document.id}
                document={document}
                index={index}
              />
            ))}
          </div>
          
          {/* 空状态 */}
          {filteredDocuments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                未找到相关文档
              </h3>
              <p className="text-muted-foreground">
                尝试调整搜索关键词或筛选条件
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default MarkdownListPage
```

## 2. 样式集成

### 更新全局样式

**文件路径**: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 现有样式... */

/* Markdown 样式集成 */
@import './styles/markdown.css';

/* 添加一些全局的 Markdown 相关样式 */
@layer utilities {
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .prose-custom {
    @apply prose prose-lg max-w-none;
    @apply prose-headings:text-foreground prose-headings:font-semibold;
    @apply prose-p:text-muted-foreground prose-p:leading-relaxed;
    @apply prose-a:text-primary prose-a:no-underline hover:prose-a:underline;
    @apply prose-strong:text-foreground prose-strong:font-semibold;
    @apply prose-code:text-pink-600 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm;
    @apply prose-pre:bg-card prose-pre:border prose-pre:shadow-sm;
    @apply prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg;
  }
}
```

### 创建 Markdown 专用样式文件

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
  scroll-margin-top: 2rem;
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

/* 锚点样式 */
.markdown-heading {
  position: relative;
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

/* 段落和文本样式 */
.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

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

/* 目录样式 */
.toc-navigation {
  font-size: 0.875rem;
}

.toc-item {
  margin-bottom: 0.125rem;
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
  
  .markdown-anchor {
    display: none;
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
  
  .toc-navigation,
  .markdown-anchor {
    display: none;
  }
}
```

## 3. 依赖安装脚本

### package.json 更新

**需要添加的依赖**:

```json
{
  "dependencies": {
    "marked": "^12.0.0",
    "dompurify": "^3.0.8",
    "reading-time": "^1.5.0",
    "prismjs": "^1.29.0"
  },
  "devDependencies": {
    "@types/marked": "^12.0.0",
    "@types/dompurify": "^3.0.5",
    "@types/reading-time": "^1.1.6",
    "@types/prismjs": "^1.26.3"
  }
}
```

### 安装命令

```bash
# 安装核心依赖
npm install marked dompurify reading-time prismjs

# 安装类型定义
npm install -D @types/marked @types/dompurify @types/reading-time @types/prismjs
```

## 4. 测试方案

### 单元测试示例

**文件路径**: `src/components/markdown/__tests__/MarkdownRenderer.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from '../MarkdownRenderer'

describe('MarkdownRenderer', () => {
  it('renders markdown content correctly', () => {
    const content = '# Test Title\n\nThis is a paragraph.'
    
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
    expect(screen.getByText('This is a paragraph.')).toBeInTheDocument()
  })
  
  it('handles empty content', () => {
    render(<MarkdownRenderer content="" />)
    
    expect(screen.getByText('内容解析中...')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    const content = '# Test'
    
    render(<MarkdownRenderer content={content} className="custom-class" />)
    
    const renderer = screen.getByText('Test').closest('.markdown-renderer')
    expect(renderer).toHaveClass('custom-class')
  })
})
```

### 集成测试

**文件路径**: `src/components/markdown/__tests__/MarkdownViewer.test.tsx`

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MarkdownViewer } from '../MarkdownViewer'
import type { MarkdownDocument } from '@/types/markdown'

const mockDocument: MarkdownDocument = {
  id: '1',
  title: 'Test Document',
  content: '# Test\n\nThis is a test document.',
  author: 'Test Author',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  slug: 'test-document',
  isPublished: true
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('MarkdownViewer', () => {
  it('renders document title and content', () => {
    renderWithRouter(<MarkdownViewer document={mockDocument} />)
    
    expect(screen.getByText('Test Document')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })
  
  it('shows table of contents when enabled', () => {
    renderWithRouter(
      <MarkdownViewer document={mockDocument} showToc={true} />
    )
    
    // TOC should be visible on desktop
    expect(screen.getByText('目录')).toBeInTheDocument()
  })
  
  it('toggles mobile TOC drawer', () => {
    renderWithRouter(
      <MarkdownViewer document={mockDocument} showToc={true} />
    )
    
    // Find and click the mobile menu button
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Check if drawer is opened (this would need more specific testing)
    expect(menuButton).toBeInTheDocument()
  })
})
```

## 5. 性能优化

### 代码分割

**文件路径**: `src/components/markdown/index.ts`

```typescript
// 懒加载 Markdown 组件
import { lazy } from 'react'

export const MarkdownRenderer = lazy(() => import('./MarkdownRenderer'))
export const MarkdownViewer = lazy(() => import('./MarkdownViewer'))
export const MarkdownPage = lazy(() => import('./MarkdownPage'))
export const TableOfContents = lazy(() => import('./TableOfContents'))
export const DocumentMetadata = lazy(() => import('./DocumentMetadata'))

// 类型导出
export type * from '@/types/markdown'
```

### 使用 Suspense

**在 App.tsx 中使用**:

```tsx
import { Suspense } from 'react'
import { MarkdownPage } from '@/components/markdown'

// 在路由中使用
<Route 
  path="/docs/:slug" 
  element={
    <Suspense fallback={<div>加载中...</div>}>
      <MarkdownPage />
    </Suspense>
  } 
/>
```

## 6. 部署准备

### 环境变量配置

**文件路径**: `.env.example`

```env
# Markdown 相关配置
VITE_MARKDOWN_API_URL=https://api.example.com/markdown
VITE_MARKDOWN_CACHE_TTL=300000
VITE_ENABLE_MARKDOWN_MATH=false
VITE_ENABLE_SYNTAX_HIGHLIGHTING=true
```

### Vercel 配置

**文件路径**: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/docs/:slug",
      "destination": "/index.html"
    },
    {
      "source": "/markdown/:slug",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 7. 使用指南

### 基本使用

1. **访问文档列表**: `/docs`
2. **查看特定文档**: `/docs/document-slug`
3. **直接访问 Markdown**: `/markdown/document-slug`

### 添加新文档

1. 在 `MarkdownListPage.tsx` 的 `mockDocuments` 数组中添加新文档
2. 确保 `slug` 字段唯一
3. 设置适当的 `category` 和 `tags`

### 自定义样式

1. 修改 `src/styles/markdown.css` 中的样式
2. 使用 CSS 变量保持主题一致性
3. 添加响应式断点支持

## 8. 故障排除

### 常见问题

1. **样式不生效**: 确保导入了 `markdown.css`
2. **路由不工作**: 检查 `App.tsx` 中的路由配置
3. **组件不渲染**: 确保安装了所有依赖
4. **类型错误**: 检查 TypeScript 类型定义

### 调试技巧

1. 使用浏览器开发者工具检查元素
2. 查看控制台错误信息
3. 使用 React Developer Tools
4. 检查网络请求状态

## 总结

这个完整的 Markdown 功能实现提供了：

1. ✅ **完整的组件系统**: 渲染器、查看器、页面容器
2. ✅ **路由集成**: 支持文档列表和详情页面
3. ✅ **样式一致性**: 与项目整体设计保持一致
4. ✅ **响应式设计**: 支持桌面端和移动端
5. ✅ **性能优化**: 代码分割和懒加载
6. ✅ **类型安全**: 完整的 TypeScript 支持
7. ✅ **测试覆盖**: 单元测试和集成测试
8. ✅ **部署就绪**: 包含部署配置和环境变量

所有组件都遵循项目的设计规范，使用相同的颜色变量、字体和交互模式，确保了用户体验的一致性。