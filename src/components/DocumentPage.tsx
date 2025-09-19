import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ArrowLeft, Calendar, User, Tag, Clock, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { FloatingControls } from '@/components/ui/floating-controls'
import { DocumentContent, DocumentLoadState } from '../types/document';
import { DocumentRouteParams } from '../types/routing';
import { DocumentLoader } from '../services/DocumentLoader';
import { DocumentCache } from '../services/DocumentCache';
import { LinkDetectorComponent } from './LinkDetectorComponent';
import { HeaderWithAnchor } from './HeaderWithAnchor';
import { DocumentDifficulty } from '../types/link-detection';

/**
 * 文档页面组件
 * 负责显示单个文档内容，集成加载和缓存功能
 */
export const DocumentPage: React.FC = () => {
  const { category, subcategory, slug } = useParams<DocumentRouteParams>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<DocumentContent | null>(null);
  const [loadState, setLoadState] = useState<DocumentLoadState>('idle');
  const [error, setError] = useState<string | null>(null);

  const documentLoader = DocumentLoader.getInstance();
  const documentCache = DocumentCache.getInstance();

  useEffect(() => {
    if (!category || !slug) {
      setError('Invalid document parameters');
      return;
    }

    loadDocument();
  }, [category, subcategory, slug]);

  const loadDocument = async () => {
    if (!category || !slug) return;

    setLoadState('loading');
    setError(null);

    try {
      // 首先尝试从缓存获取
      const cachedDoc = documentCache.get(category, slug, subcategory);
      if (cachedDoc) {
        setDocument(cachedDoc);
        setLoadState('success');
        return;
      }

      // 从服务器加载
      const result = await documentLoader.loadDocument(category, slug, subcategory);
      
      if (result.state === 'success' && result.data) {
        setDocument(result.data);
        setLoadState('success');
        // 缓存文档
        documentCache.set(category, slug, result.data, subcategory);
      } else {
        setError(result.error || 'Failed to load document');
        setLoadState('error');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setLoadState('error');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '未分级';
    }
  };

  // 转换难度类型
  const mapDifficultyToEnum = (difficulty?: string): DocumentDifficulty | undefined => {
    switch (difficulty) {
      case 'beginner':
        return DocumentDifficulty.BASIC;
      case 'intermediate':
        return DocumentDifficulty.INTERMEDIATE;
      case 'advanced':
        return DocumentDifficulty.ADVANCED;
      default:
        return undefined;
    }
  };

  if (loadState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">正在加载文档...</p>
        </div>
      </div>
    );
  }

  if (loadState === 'error' || !document) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">文档未找到</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || '抱歉，请求的文档不存在或暂时无法访问。'}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部导航 */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              返回
            </button>
            <ThemeToggle />
          </div>
          
          {/* 面包屑导航 */}
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>文档</span>
            <span className="mx-2">/</span>
            <span className="capitalize">{category}</span>
            {subcategory && (
              <>
                <span className="mx-2">/</span>
                <span className="capitalize">{subcategory}</span>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{document.title}</span>
          </nav>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* 文档头部 */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {document.title}
            </h1>
            
            {document.description && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {document.description}
              </p>
            )}

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {document.frontMatter.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {document.frontMatter.author}
                </div>
              )}
              
              {document.lastModified && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(document.lastModified)}
                </div>
              )}
              
              {document.frontMatter.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getDifficultyColor(document.frontMatter.difficulty)
                }`}>
                  {getDifficultyText(document.frontMatter.difficulty)}
                </span>
              )}
            </div>

            {/* 标签 */}
            {document.frontMatter.tags && document.frontMatter.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {document.frontMatter.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 文档内容 */}
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // 使用HeaderWithAnchor组件渲染标题
                  h1: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={1} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  h2: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={2} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  h3: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={3} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  h4: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={4} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-base font-medium text-gray-900 dark:text-white mt-3 mb-2"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  h5: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={5} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-sm font-medium text-gray-900 dark:text-white mt-2 mb-1"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  h6: ({ children, ...props }) => (
                    <HeaderWithAnchor 
                      level={6} 
                      difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                      className="text-xs font-medium text-gray-900 dark:text-white mt-2 mb-1"
                      {...props}
                    >
                      {children}
                    </HeaderWithAnchor>
                  ),
                  // 自定义代码块样式
                  code: ({ children, className, ...props }: any) => {
                    const isInline = !className || !className.includes('language-');
                    if (isInline) {
                      return (
                        <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="block bg-gray-900 dark:bg-gray-800 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto" {...props}>
                        {children}
                      </code>
                    );
                  },
                  // 自定义表格样式
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white" {...props}>
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-200" {...props}>
                      {children}
                    </td>
                  ),
                }}
              >
                {document.content}
              </ReactMarkdown>
              
              {/* 链接检测组件 */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">文档链接检测</h3>
                <LinkDetectorComponent
                  content={document.content}
                  difficulty={mapDifficultyToEnum(document.frontMatter.difficulty)}
                  documentPath={`/docs/${category}/${subcategory || ''}/${slug}`}
                  showValidationStatus={true}
                  autoValidate={true}
                  onError={(error) => {
                    console.error('链接检测错误:', error);
                  }}
                  onValidationComplete={(results) => {
                    console.log('链接验证完成:', results);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 悬浮控制组件 */}
      <FloatingControls />
    </div>
  );
};

export default DocumentPage;