import React, { useState, useEffect } from 'react';
import { List, ChevronRight, ChevronDown } from 'lucide-react';
import { TOCItem } from '../types/document';

interface DocumentTOCProps {
  toc: TOCItem[];
  className?: string;
}

export const DocumentTOC: React.FC<DocumentTOCProps> = ({ toc, className = '' }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 监听滚动事件，高亮当前章节
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      let currentId = '';
      
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentId = heading.id;
        } else {
          break;
        }
      }
      
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始调用
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTOCItem = (item: TOCItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeId === item.id;
    const indentClass = level > 0 ? `ml-${level * 4}` : '';

    return (
      <div key={item.id} className="mb-1">
        <div
          className={`
            flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors group
            ${indentClass}
            ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }
          `}
          onClick={() => scrollToHeading(item.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
              className={`
                mr-2 p-0.5 rounded transition-colors
                ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }
              `}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
          
          <span className={`
            text-sm truncate flex-1
            ${
              isActive
                ? 'font-medium text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
            }
          `}>
            {item.title}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map(child => renderTOCItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!toc || toc.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <List className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">暂无目录</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <List className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          目录
        </h3>
      </div>
      
      <div className="p-2 max-h-96 overflow-y-auto">
        {toc.map(item => renderTOCItem(item))}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <List className="w-4 h-4 inline mr-1" />
          共 {toc.length} 个章节
        </div>
      </div>
    </div>
  );
};

export default DocumentTOC;