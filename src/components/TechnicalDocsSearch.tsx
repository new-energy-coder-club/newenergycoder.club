import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocumentLoader } from '../services/DocumentLoader';
import { DocumentMeta } from '../types/document';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  content: string;
  matchScore: number;
}

interface TechnicalDocsSearchProps {
  className?: string;
}

export const TechnicalDocsSearch: React.FC<TechnicalDocsSearchProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allDocs, setAllDocs] = useState<DocumentMeta[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const documentLoader = DocumentLoader.getInstance();

  useEffect(() => {
    loadAllDocs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query.trim());
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const loadAllDocs = async () => {
    try {
      const meta = await documentLoader.loadMeta('technical');
      if (meta.items) {
        setAllDocs(meta.items);
      }
    } catch (error) {
      console.error('Failed to load docs metadata:', error);
    }
  };

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const searchResults: SearchResult[] = [];
      const queryLower = searchQuery.toLowerCase();
      
      for (const doc of allDocs) {
        let matchScore = 0;
        let contentPreview = '';
        
        // 标题匹配（权重最高）
        if (doc.title.toLowerCase().includes(queryLower)) {
          matchScore += 10;
        }
        
        // 描述匹配
        if (doc.description && doc.description.toLowerCase().includes(queryLower)) {
          matchScore += 5;
        }
        
        // 尝试加载文档内容进行全文搜索
        try {
          const docResult = await documentLoader.loadDocument('technical', doc.slug);
          if (docResult.state === 'success' && docResult.data) {
            const content = docResult.data.content.toLowerCase();
            const queryIndex = content.indexOf(queryLower);
            
            if (queryIndex !== -1) {
              matchScore += 3;
              // 提取匹配内容的上下文
              const start = Math.max(0, queryIndex - 50);
              const end = Math.min(content.length, queryIndex + 100);
              contentPreview = docResult.data.content.substring(start, end);
              
              // 高亮匹配的文本
              const regex = new RegExp(`(${searchQuery})`, 'gi');
              contentPreview = contentPreview.replace(regex, '**$1**');
            }
          }
        } catch (error) {
          console.warn(`Failed to search in document ${doc.slug}:`, error);
        }
        
        if (matchScore > 0) {
          searchResults.push({
            slug: doc.slug,
            title: doc.title,
            description: doc.description || '',
            content: contentPreview,
            matchScore
          });
        }
      }
      
      // 按匹配分数排序
      searchResults.sort((a, b) => b.matchScore - a.matchScore);
      setResults(searchResults.slice(0, 8)); // 限制结果数量
      setIsOpen(searchResults.length > 0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索技术文档..."
          className="
            w-full pl-10 pr-10 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
            transition-colors
          "
          onFocus={() => {
            if (results.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">搜索中...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                找到 {results.length} 个结果
              </div>
              {results.map((result) => (
                <Link
                  key={result.slug}
                  to={`/docs/technical/${result.slug}`}
                  onClick={handleResultClick}
                  className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {highlightText(result.title, query)}
                        </h4>
                      </div>
                      {result.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                          {highlightText(result.description, query)}
                        </p>
                      )}
                      {result.content && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">
                          ...{highlightText(result.content, query)}...
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">未找到相关文档</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechnicalDocsSearch;