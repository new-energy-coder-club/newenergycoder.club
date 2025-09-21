import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, FileText, Book, Code, Settings, Layers } from 'lucide-react';
import { DocumentMeta } from '../types/document';
import { DocumentLoader } from '../services/DocumentLoader';

interface TechnicalDocsNavigationProps {
  className?: string;
}

interface NavItem {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  order: number;
}

const iconMap: Record<string, React.ReactNode> = {
  'api-reference': <Code className="w-4 h-4" />,
  'architecture': <Layers className="w-4 h-4" />,
  'development-guide': <Book className="w-4 h-4" />,
  'integration-guide': <Settings className="w-4 h-4" />,
  'technical-standards': <FileText className="w-4 h-4" />,
  'deployment': <Settings className="w-4 h-4" />
};

export const TechnicalDocsNavigation: React.FC<TechnicalDocsNavigationProps> = ({ className = '' }) => {
  const { slug } = useParams();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const documentLoader = DocumentLoader.getInstance();

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    try {
      setLoading(true);
      const meta = await documentLoader.loadMeta('technical');
      
      if (meta.items) {
        const items: NavItem[] = meta.items.map(item => ({
          slug: item.slug,
          title: item.title,
          description: item.description || '',
          icon: iconMap[item.slug] || <FileText className="w-4 h-4" />,
          order: item.order || 0
        }));
        
        // 按order排序
        items.sort((a, b) => a.order - b.order);
        setNavItems(items);
      }
    } catch (err) {
      console.error('Failed to load technical docs navigation:', err);
      setError('加载导航失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mb-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
        <div className="text-center text-red-500 dark:text-red-400">
          <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          技术文档
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          详细的技术文档和API参考
        </p>
      </div>
      
      <div className="p-2">
        {navItems.map((item) => {
          const isActive = slug === item.slug;
          return (
            <Link
              key={item.slug}
              to={`/docs/technical/${item.slug}`}
              className={`
                flex items-center p-3 rounded-lg transition-colors group
                ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              <div className={`
                flex-shrink-0 mr-3
                ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }
              `}>
                {item.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`
                    text-sm font-medium truncate
                    ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    }
                  `}>
                    {item.title}
                  </h4>
                  <ChevronRight className={`
                    w-4 h-4 flex-shrink-0 ml-2 transition-transform
                    ${
                      isActive
                        ? 'text-blue-500 dark:text-blue-400 transform rotate-90'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }
                  `} />
                </div>
                <p className={`
                  text-xs mt-1 truncate
                  ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <FileText className="w-4 h-4 inline mr-1" />
          共 {navItems.length} 个文档
        </div>
      </div>
    </div>
  );
};

export default TechnicalDocsNavigation;