import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  MarkdownConfig,
  MarkdownContent,
  MarkdownHookReturn,
  DEFAULT_MARKDOWN_CONFIG
} from '@/types/markdown';

// 本地存储键名
const STORAGE_KEYS = {
  CONTENT: 'markdown-editor-content',
  CONFIG: 'markdown-editor-config',
  HISTORY: 'markdown-editor-history'
} as const;

// 历史记录接口
interface HistoryEntry {
  content: string;
  timestamp: number;
  id: string;
}

// 自动保存Hook
function useAutoSave(
  content: string,
  config: MarkdownConfig,
  enabled: boolean = true,
  delay: number = 1000
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 设置新的自动保存定时器
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.CONTENT, content);
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
      } catch (error) {
        console.warn('Failed to auto-save to localStorage:', error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, config, enabled, delay]);
}

// 历史记录Hook
function useHistory(maxEntries: number = 50) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = useCallback((content: string) => {
    const entry: HistoryEntry = {
      content,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    };

    setHistory(prev => {
      const newHistory = [entry, ...prev.slice(0, maxEntries - 1)];
      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
      } catch (error) {
        console.warn('Failed to save history to localStorage:', error);
      }
      return newHistory;
    });
  }, [maxEntries]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (error) {
      console.warn('Failed to clear history from localStorage:', error);
    }
  }, []);

  const restoreFromHistory = useCallback((id: string): string | null => {
    const entry = history.find(h => h.id === id);
    return entry ? entry.content : null;
  }, [history]);

  return {
    history,
    addToHistory,
    clearHistory,
    restoreFromHistory
  };
}

// 统计信息Hook
function useMarkdownStats(content: string) {
  return useMemo(() => {
    const lines = content.split('\n');
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characters = content.length;
    const charactersNoSpaces = content.replace(/\s/g, '').length;
    
    // 计算标题数量
    const headings = {
      h1: (content.match(/^# /gm) || []).length,
      h2: (content.match(/^## /gm) || []).length,
      h3: (content.match(/^### /gm) || []).length,
      h4: (content.match(/^#### /gm) || []).length,
      h5: (content.match(/^##### /gm) || []).length,
      h6: (content.match(/^###### /gm) || []).length
    };

    // 计算其他元素
    const links = (content.match(/\[.*?\]\(.*?\)/g) || []).length;
    const images = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
    const inlineCode = (content.match(/`[^`]+`/g) || []).length;
    const tables = (content.match(/\|.*\|/g) || []).length;
    const blockquotes = (content.match(/^>/gm) || []).length;
    const lists = (content.match(/^[\s]*[-*+]\s/gm) || []).length + (content.match(/^[\s]*\d+\.\s/gm) || []).length;

    // 估算阅读时间（按每分钟200词计算）
    const readingTime = Math.ceil(words / 200);

    return {
      lines: lines.length,
      words,
      characters,
      charactersNoSpaces,
      headings,
      links,
      images,
      codeBlocks,
      inlineCode,
      tables,
      blockquotes,
      lists,
      readingTime
    };
  }, [content]);
}

// 主要的useMarkdown Hook
export function useMarkdown(
  initialContent: string = '',
  initialConfig: MarkdownConfig = DEFAULT_MARKDOWN_CONFIG,
  options: {
    autoSave?: boolean;
    autoSaveDelay?: number;
    maxHistoryEntries?: number;
    enableHistory?: boolean;
  } = {}
): MarkdownHookReturn {
  const {
    autoSave = true,
    autoSaveDelay = 1000,
    maxHistoryEntries = 50,
    enableHistory = true
  } = options;

  // 初始化状态，尝试从localStorage恢复
  const [content, setContent] = useState<string>(() => {
    if (initialContent) return initialContent;
    try {
      return localStorage.getItem(STORAGE_KEYS.CONTENT) || '';
    } catch {
      return '';
    }
  });

  const [config, setConfig] = useState<MarkdownConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...DEFAULT_MARKDOWN_CONFIG, ...JSON.parse(saved) } : initialConfig;
    } catch {
      return initialConfig;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // 使用历史记录Hook
  const historyHook = useHistory(enableHistory ? maxHistoryEntries : 0);

  // 使用自动保存Hook
  useAutoSave(content, config, autoSave, autoSaveDelay);

  // 计算统计信息
  const stats = useMarkdownStats(content);

  // 内容更新处理
  const updateContent = useCallback((newContent: string, addToHistory: boolean = true) => {
    setContent(newContent);
    setError(null);
    
    if (enableHistory && addToHistory && newContent !== content) {
      historyHook.addToHistory(content); // 保存当前内容到历史
    }
  }, [content, enableHistory, historyHook]);

  // 配置更新处理
  const updateConfig = useCallback((newConfig: Partial<MarkdownConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // 重置配置
  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_MARKDOWN_CONFIG);
  }, []);

  // 清空内容
  const clearContent = useCallback(() => {
    if (enableHistory) {
      historyHook.addToHistory(content);
    }
    setContent('');
    setError(null);
  }, [content, enableHistory, historyHook]);

  // 导入文件
  const importFile = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setError(null);

      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const fileContent = e.target?.result as string;
          if (enableHistory) {
            historyHook.addToHistory(content);
          }
          setContent(fileContent);
          setLastSaved(new Date());
          setIsLoading(false);
          resolve();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '文件读取失败';
          setError(errorMessage);
          setIsLoading(false);
          reject(new Error(errorMessage));
        }
      };

      reader.onerror = () => {
        const errorMessage = '文件读取失败';
        setError(errorMessage);
        setIsLoading(false);
        reject(new Error(errorMessage));
      };

      reader.readAsText(file);
    });
  }, [content, enableHistory, historyHook]);

  // 导出文件
  const exportFile = useCallback((filename?: string) => {
    try {
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `markdown-${new Date().toISOString().slice(0, 10)}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setLastSaved(new Date());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '文件导出失败';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [content]);

  // 手动保存
  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, content);
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
      setLastSaved(new Date());
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '保存失败';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [content, config]);

  // 从存储恢复
  const restoreFromStorage = useCallback(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
      
      if (savedContent !== null) {
        if (enableHistory) {
          historyHook.addToHistory(content);
        }
        setContent(savedContent);
      }
      
      if (savedConfig) {
        setConfig({ ...DEFAULT_MARKDOWN_CONFIG, ...JSON.parse(savedConfig) });
      }
      
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '恢复失败';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [content, enableHistory, historyHook]);

  // 清除存储
  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CONTENT);
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
      if (enableHistory) {
        historyHook.clearHistory();
      }
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '清除存储失败';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [enableHistory, historyHook]);

  return {
    // 状态
    content,
    config,
    isLoading,
    error,
    lastSaved,
    stats,
    
    // 内容操作
    updateContent,
    clearContent,
    
    // 配置操作
    updateConfig,
    resetConfig,
    
    // 文件操作
    importFile,
    exportFile,
    
    // 存储操作
    saveToStorage,
    restoreFromStorage,
    clearStorage,
    
    // 历史记录操作（仅在启用时提供）
    ...(enableHistory ? {
      history: historyHook.history,
      clearHistory: historyHook.clearHistory,
      restoreFromHistory: historyHook.restoreFromHistory
    } : {})
  };
}

export default useMarkdown;