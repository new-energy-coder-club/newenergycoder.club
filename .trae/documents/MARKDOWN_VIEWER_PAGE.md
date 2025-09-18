# MarkdownViewer 页面组件实现

## 组件概述

MarkdownViewer 是一个完整的 Markdown 文档查看页面，提供文档展示、目录导航、元数据显示等功能，并与项目整体设计保持一致。

## 核心组件实现

### 1. MarkdownViewer 容器组件

**文件路径**: `src/components/markdown/MarkdownViewer.tsx`

```tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, Calendar, Tag, BookOpen, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TableOfContents } from './TableOfContents'
import { DocumentMetadata } from './DocumentMetadata'
import type { MarkdownViewerProps, ParsedMarkdown } from '@/types/markdown'
import { cn } from '@/lib/utils'

export function MarkdownViewer({
  document,
  showToc = true,
  showMetadata = true,
  className
}: MarkdownViewerProps) {
  const [parsedContent, setParsedContent] = useState<ParsedMarkdown | null>(null)
  const [isTocOpen, setIsTocOpen] = useState(false)
  
  const handleContentLoad = (parsed: ParsedMarkdown) => {
    setParsedContent(parsed)
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  return (
    <div className={cn('markdown-viewer', className)}>
      {/* 文档头部信息 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {document.title}
            </h1>
            
            {document.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {document.excerpt}
              </p>
            )}
            
            {/* 文档元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {document.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{document.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(document.createdAt)}</span>
              </div>
              
              {parsedContent && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{parsedContent.readingTime} 分钟阅读</span>
                </div>
              )}
              
              {parsedContent && (
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{parsedContent.wordCount} 字</span>
                </div>
              )}
            </div>
            
            {/* 标签 */}
            {document.tags && document.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {document.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* 移动端目录切换按钮 */}
          {showToc && parsedContent?.toc && parsedContent.toc.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="md:hidden ml-4"
              onClick={() => setIsTocOpen(!isTocOpen)}
            >
              {isTocOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          )}
        </div>
        
        <Separator />
      </motion.div>
      
      {/* 主要内容区域 */}
      <div className="flex gap-8">
        {/* 文档内容 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 min-w-0"
        >
          <MarkdownRenderer
            content={document.content}
            options={{
              enableSyntaxHighlighting: true,
              enableTables: true,
              enableTaskLists: true,
              enableEmoji: true,
              theme: 'auto'
            }}
            onContentLoad={handleContentLoad}
            className="markdown-document-content"
          />
          
          {/* 文档底部信息 */}
          {showMetadata && parsedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <DocumentMetadata
                document={document}
                parsed={parsedContent}
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* 桌面端侧边栏目录 */}
        {showToc && parsedContent?.toc && parsedContent.toc.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="sticky top-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    目录
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <TableOfContents
                    toc={parsedContent.toc}
                    className="max-h-96 overflow-y-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* 移动端目录抽屉 */}
      <AnimatePresence>
        {isTocOpen && showToc && parsedContent?.toc && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsTocOpen(false)}
            />
            
            {/* 目录抽屉 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    目录
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsTocOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <TableOfContents
                  toc={parsedContent.toc}
                  onItemClick={() => setIsTocOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MarkdownViewer
```

### 2. TableOfContents 目录组件

**文件路径**: `src/components/markdown/TableOfContents.tsx`

```tsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TableOfContents as TOCType } from '@/types/markdown'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  toc: TOCType[]
  className?: string
  onItemClick?: () => void
}

interface TOCItemProps {
  item: TOCType
  level?: number
  activeId?: string
  onItemClick?: () => void
}

function TOCItem({ item, level = 0, activeId, onItemClick }: TOCItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeId === item.id
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // 滚动到对应标题
    const element = document.getElementById(item.anchor)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    onItemClick?.()
  }
  
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }
  
  return (
    <div className="toc-item">
      <div
        className={cn(
          'flex items-center gap-1 py-1 px-2 rounded-md text-sm transition-colors cursor-pointer group',
          'hover:bg-muted/50',
          isActive && 'bg-primary/10 text-primary font-medium',
          !isActive && 'text-muted-foreground hover:text-foreground'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
        
        {!hasChildren && <div className="w-4" />}
        
        <span className="flex-1 truncate leading-relaxed">
          {item.title}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.children!.map((child) => (
            <TOCItem
              key={child.id}
              item={child}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function TableOfContents({ toc, className, onItemClick }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>()
  
  // 监听滚动，高亮当前章节
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%'
      }
    )
    
    // 观察所有标题元素
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
    headings.forEach((heading) => observer.observe(heading))
    
    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [toc])
  
  if (!toc || toc.length === 0) {
    return (
      <div className={cn('text-sm text-muted-foreground text-center py-4', className)}>
        暂无目录
      </div>
    )
  }
  
  return (
    <nav className={cn('toc-navigation', className)}>
      <div className="space-y-1">
        {toc.map((item) => (
          <TOCItem
            key={item.id}
            item={item}
            activeId={activeId}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </nav>
  )
}

export default TableOfContents
```

### 3. DocumentMetadata 元数据组件

**文件路径**: `src/components/markdown/DocumentMetadata.tsx`

```tsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Tag, 
  Edit,
  Eye,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { MarkdownDocument, ParsedMarkdown } from '@/types/markdown'
import { cn } from '@/lib/utils'

interface DocumentMetadataProps {
  document: MarkdownDocument
  parsed: ParsedMarkdown
  className?: string
}

export function DocumentMetadata({ 
  document, 
  parsed, 
  className 
}: DocumentMetadataProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: document.excerpt || document.title,
          url: window.location.href
        })
      } catch (err) {
        console.log('分享取消或失败')
      }
    } else {
      // 复制链接到剪贴板
      try {
        await navigator.clipboard.writeText(window.location.href)
        // 这里可以添加一个 toast 提示
        console.log('链接已复制到剪贴板')
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('document-metadata', className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            文档信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                创建信息
              </h4>
              
              {document.author && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">作者:</span>
                  <span className="text-muted-foreground">{document.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">创建:</span>
                <span className="text-muted-foreground">
                  {formatDate(document.createdAt)}
                </span>
              </div>
              
              {document.updatedAt && document.updatedAt !== document.createdAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">更新:</span>
                  <span className="text-muted-foreground">
                    {formatDate(document.updatedAt)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                内容统计
              </h4>
              
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">字数:</span>
                <span className="text-muted-foreground">
                  {parsed.wordCount.toLocaleString()} 字
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">阅读时间:</span>
                <span className="text-muted-foreground">
                  约 {parsed.readingTime} 分钟
                </span>
              </div>
              
              {document.category && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">分类:</span>
                  <Badge variant="outline" className="text-xs">
                    {document.category}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          {/* 标签 */}
          {document.tags && document.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  标签
                </h4>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* 操作按钮 */}
          <Separator />
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              文档 ID: {document.id}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              分享
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DocumentMetadata
```

### 4. MarkdownPage 页面容器

**文件路径**: `src/components/markdown/MarkdownPage.tsx`

```tsx
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PageLayout } from '@/components/layout/PageLayout'
import { MarkdownViewer } from './MarkdownViewer'
import { useMarkdownDocument } from '@/hooks/useMarkdownDocument'
import type { MarkdownPageProps } from '@/types/markdown'
import { cn } from '@/lib/utils'

export function MarkdownPage({ 
  slug, 
  fallbackContent,
  className 
}: MarkdownPageProps & { className?: string }) {
  const { document, isLoading, error, reload } = useMarkdownDocument(slug)
  
  const handleGoBack = () => {
    window.history.back()
  }
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 加载骨架屏 */}
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }
  
  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center gap-4">
                <Button onClick={handleGoBack} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回
                </Button>
                
                <Button onClick={reload} variant="default">
                  重试
                </Button>
              </div>
              
              {/* 如果有备用内容，显示它 */}
              {fallbackContent && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-4">备用内容</h3>
                  <div className="prose prose-sm max-w-none">
                    {fallbackContent}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </PageLayout>
    )
  }
  
  if (!document) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-4">
                文档未找到
              </h1>
              <p className="text-muted-foreground mb-6">
                请求的文档不存在或已被删除。
              </p>
              
              <Button onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
            </motion.div>
          </div>
        </div>
      </PageLayout>
    )
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button 
              onClick={handleGoBack} 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </motion.div>
          
          {/* 文档查看器 */}
          <MarkdownViewer
            document={document}
            showToc={true}
            showMetadata={true}
            className={className}
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default MarkdownPage
```

### 5. useMarkdownDocument Hook

**文件路径**: `src/hooks/useMarkdownDocument.ts`

```typescript
import { useState, useEffect, useCallback } from 'react'
import type { 
  UseMarkdownDocumentReturn, 
  MarkdownDocument 
} from '@/types/markdown'

// 模拟 API 调用 - 实际项目中应该替换为真实的 API
const fetchMarkdownDocument = async (slug: string): Promise<MarkdownDocument> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟文档数据
  const mockDocument: MarkdownDocument = {
    id: `doc-${slug}`,
    title: `示例文档: ${slug}`,
    content: `# ${slug} 文档\n\n这是一个示例 Markdown 文档。\n\n## 介绍\n\n这里是文档的介绍内容。\n\n## 详细内容\n\n这里是详细的内容说明。\n\n### 子章节\n\n更多的内容...\n\n\`\`\`typescript\nconst example = 'Hello World'\nconsole.log(example)\n\`\`\`\n\n## 总结\n\n文档的总结部分。`,
    author: '新能源编程俱乐部',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    tags: ['示例', 'Markdown', '文档'],
    category: '教程',
    slug,
    excerpt: '这是一个示例 Markdown 文档，展示了基本的格式和功能。',
    isPublished: true
  }
  
  // 模拟可能的错误
  if (slug === 'not-found') {
    throw new Error('文档未找到')
  }
  
  return mockDocument
}

export function useMarkdownDocument(slug: string): UseMarkdownDocumentReturn {
  const [document, setDocument] = useState<MarkdownDocument | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const loadDocument = useCallback(async () => {
    if (!slug.trim()) {
      setDocument(null)
      setError(null)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const doc = await fetchMarkdownDocument(slug)
      setDocument(doc)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '加载文档失败'
      setError(errorMessage)
      setDocument(null)
    } finally {
      setIsLoading(false)
    }
  }, [slug])
  
  const reload = useCallback(() => {
    loadDocument()
  }, [loadDocument])
  
  useEffect(() => {
    loadDocument()
  }, [loadDocument])
  
  return {
    document,
    isLoading,
    error,
    reload
  }
}

export default useMarkdownDocument
```

## 路由配置

### 添加 Markdown 路由

**在 `src/App.tsx` 中添加路由**:

```tsx
import MarkdownPage from '@/components/markdown/MarkdownPage'

// 在 Routes 中添加
<Route path="/markdown/:slug" element={<MarkdownPage />} />
```

## 使用示例

### 基础使用

```tsx
import { MarkdownViewer } from '@/components/markdown/MarkdownViewer'

function MyPage() {
  const document = {
    id: '1',
    title: '示例文档',
    content: '# 标题\n\n这是内容...',
    author: '作者',
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: 'example',
    isPublished: true
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <MarkdownViewer 
        document={document}
        showToc={true}
        showMetadata={true}
      />
    </div>
  )
}
```

### 页面路由使用

```tsx
// 访问 /markdown/getting-started 会显示对应的文档
<Link to="/markdown/getting-started">
  查看入门指南
</Link>
```

## 特性说明

1. **响应式设计**: 支持桌面端和移动端
2. **目录导航**: 自动生成目录，支持点击跳转
3. **元数据显示**: 显示文档的详细信息
4. **语法高亮**: 支持代码块语法高亮
5. **主题适配**: 自动适配深色/浅色主题
6. **加载状态**: 提供加载和错误状态处理
7. **分享功能**: 支持原生分享或复制链接
8. **滚动高亮**: 目录会根据滚动位置高亮当前章节
9. **移动端优化**: 移动端使用抽屉式目录
10. **动画效果**: 使用 Framer Motion 提供流畅的动画

这个实现完全符合项目的设计风格，使用了相同的组件库和设计模式，确保了视觉和交互的一致性。