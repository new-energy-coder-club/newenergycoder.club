import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, BookOpen, Code, Settings, Zap, ChevronRight } from 'lucide-react';
import { DocumentPage } from './DocumentPage';
import { TechnicalDocsNavigation } from './TechnicalDocsNavigation';
import { DocumentTOC } from './DocumentTOC';
import { TechnicalDocsSearch } from './TechnicalDocsSearch';
import { TechnicalDocsQuickNav } from './TechnicalDocsQuickNav';
import { DocumentLoader } from '../services/DocumentLoader';
import { TOCItem } from '../types/document';

export const TechnicalDocsLayout: React.FC = () => {
  const { slug } = useParams();
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  const documentLoader = DocumentLoader.getInstance();

  useEffect(() => {
    if (slug) {
      loadDocumentTOC();
    } else {
      setToc([]);
    }
  }, [slug]);

  const loadDocumentTOC = async () => {
    if (!slug) return;
    
    setLoading(true);
    try {
      const result = await documentLoader.loadDocument('technical', slug);
      if (result.state === 'success' && result.data?.toc) {
        setToc(result.data.toc);
      }
    } catch (error) {
      console.error('Failed to load document TOC:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索栏 */}
        <div className="mb-8">
          <TechnicalDocsSearch className="max-w-md" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏导航 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TechnicalDocsNavigation />
            </div>
          </div>
          
          {/* 主要内容区域 */}
          <div className={slug ? (toc.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3') : 'lg:col-span-3'}>
            {slug ? (
              <DocumentPage />
            ) : (
              <TechnicalDocsOverview />
            )}
          </div>

          {/* 文档目录 - 仅在查看具体文档时显示 */}
          {slug && toc.length > 0 && (
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-8">
                <DocumentTOC toc={toc} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 技术文档概览页面
const TechnicalDocsOverview: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          技术文档中心
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          探索我们的技术架构、API 接口、开发指南和最佳实践
        </p>
      </div>

      {/* 快速导航 */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          快速开始
        </h2>
        <TechnicalDocsQuickNav />
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">API 接口</p>
              <p className="text-2xl font-bold">15+</p>
            </div>
            <Code className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">技术组件</p>
              <p className="text-2xl font-bold">8+</p>
            </div>
            <Settings className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">开发指南</p>
              <p className="text-2xl font-bold">5+</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          如何使用技术文档
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">开发者入门</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  从开发指南开始了解项目结构，然后查看 API 参考了解接口使用方法
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">架构理解</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  通过系统架构文档了解整体设计思路和技术选型
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">集成部署</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  参考集成指南进行第三方服务配置和系统部署
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">规范遵循</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  遵循技术规范确保代码质量和系统安全性
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDocsLayout;