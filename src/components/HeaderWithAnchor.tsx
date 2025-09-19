/**
 * HeaderWithAnchor
 * 带锚点的标题组件
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Link, Hash, Copy, Check } from 'lucide-react';
import { DocumentDifficulty } from '../types/link-detection';
import { getDifficultyConfig } from '../config/DifficultyConfig';

/**
 * 标题级别类型
 */
export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 组件属性
 */
export interface HeaderWithAnchorProps {
  /** 标题级别 (h1-h6) */
  level: HeaderLevel;
  /** 标题文本 */
  children: React.ReactNode;
  /** 自定义锚点ID，如果不提供则自动生成 */
  id?: string;
  /** 文档难度 */
  difficulty?: DocumentDifficulty;
  /** 是否显示锚点链接 */
  showAnchor?: boolean;
  /** 是否显示复制按钮 */
  showCopyButton?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 锚点点击回调 */
  onAnchorClick?: (id: string, event: React.MouseEvent) => void;
  /** 复制成功回调 */
  onCopySuccess?: (id: string, url: string) => void;
  /** 复制失败回调 */
  onCopyError?: (error: string) => void;
}

/**
 * 生成锚点ID
 */
const generateAnchorId = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // 移除HTML标签
    .replace(/<[^>]*>/g, '')
    // 替换空格和特殊字符为连字符
    .replace(/[\s\W-]+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '')
    // 限制长度
    .substring(0, 50);
};

/**
 * 提取文本内容
 */
const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  
  if (typeof children === 'number') {
    return children.toString();
  }
  
  if (React.isValidElement(children)) {
    return extractTextContent(children.props.children);
  }
  
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  
  return '';
};

/**
 * 复制到剪贴板
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

/**
 * 锚点按钮组件
 */
const AnchorButton: React.FC<{
  id: string;
  showCopyButton: boolean;
  difficulty?: DocumentDifficulty;
  onAnchorClick?: (id: string, event: React.MouseEvent) => void;
  onCopySuccess?: (id: string, url: string) => void;
  onCopyError?: (error: string) => void;
}> = ({ 
  id, 
  showCopyButton, 
  difficulty, 
  onAnchorClick, 
  onCopySuccess, 
  onCopyError 
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyConfig = difficulty ? getDifficultyConfig(difficulty) : null;
  
  const handleAnchorClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    
    // 滚动到元素
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // 更新URL
      const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
      window.history.pushState(null, '', newUrl);
    }
    
    if (onAnchorClick) {
      onAnchorClick(id, event);
    }
  }, [id, onAnchorClick]);
  
  const handleCopyClick = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${id}`;
    
    try {
      const success = await copyToClipboard(url);
      
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        if (onCopySuccess) {
          onCopySuccess(id, url);
        }
      } else {
        throw new Error('复制操作失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '复制失败';
      if (onCopyError) {
        onCopyError(errorMessage);
      }
    }
  }, [id, onCopySuccess, onCopyError]);
  
  const buttonClasses = useMemo(() => {
    let classes = "inline-flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200";
    
    if (difficultyConfig) {
      classes += ` text-${difficultyConfig.color.replace('#', '')}-600 hover:text-${difficultyConfig.color.replace('#', '')}-800`;
    } else {
      classes += " text-gray-400 hover:text-gray-600";
    }
    
    return classes;
  }, [difficultyConfig]);
  
  return (
    <span 
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`#${id}`}
        onClick={handleAnchorClick}
        className="p-1 rounded hover:bg-gray-100 transition-colors"
        title={`链接到 ${id}`}
        aria-label={`链接到标题 ${id}`}
      >
        {isHovered ? <Link className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
      </a>
      
      {showCopyButton && (
        <button
          onClick={handleCopyClick}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          title={copied ? '已复制链接' : '复制链接'}
          aria-label={copied ? '已复制链接' : '复制链接到剪贴板'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}
    </span>
  );
};

/**
 * 带锚点的标题组件
 */
export const HeaderWithAnchor: React.FC<HeaderWithAnchorProps> = ({
  level,
  children,
  id: customId,
  difficulty,
  showAnchor = true,
  showCopyButton = true,
  className = '',
  onAnchorClick,
  onCopySuccess,
  onCopyError
}) => {
  // 生成或使用自定义ID
  const anchorId = useMemo(() => {
    if (customId) {
      return customId;
    }
    
    const textContent = extractTextContent(children);
    return generateAnchorId(textContent);
  }, [customId, children]);
  
  // 获取难度配置
  const difficultyConfig = difficulty ? getDifficultyConfig(difficulty) : null;
  
  // 生成标题样式
  const headerClasses = useMemo(() => {
    const baseClasses = "group flex items-center scroll-mt-16";
    const levelClasses = {
      1: "text-3xl font-bold mb-6",
      2: "text-2xl font-semibold mb-4",
      3: "text-xl font-semibold mb-3",
      4: "text-lg font-medium mb-2",
      5: "text-base font-medium mb-2",
      6: "text-sm font-medium mb-1"
    };
    
    let classes = `${baseClasses} ${levelClasses[level]} ${className}`;
    
    // 添加难度相关样式
    if (difficultyConfig) {
      classes += ` border-l-4 border-l-${difficultyConfig.color.replace('#', '')} pl-4`;
    }
    
    return classes;
  }, [level, className, difficultyConfig]);
  
  // 创建标题元素
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return React.createElement(
    HeaderTag,
    {
      id: anchorId,
      className: headerClasses
    },
    <span className="flex-1">{children}</span>,
    showAnchor && (
      <AnchorButton
        id={anchorId}
        showCopyButton={showCopyButton}
        difficulty={difficulty}
        onAnchorClick={onAnchorClick}
        onCopySuccess={onCopySuccess}
        onCopyError={onCopyError}
      />
    )
  );
};

/**
 * 便捷的标题组件
 */
export const H1: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={1} {...props} />
);

export const H2: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={2} {...props} />
);

export const H3: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={3} {...props} />
);

export const H4: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={4} {...props} />
);

export const H5: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={5} {...props} />
);

export const H6: React.FC<Omit<HeaderWithAnchorProps, 'level'>> = (props) => (
  <HeaderWithAnchor level={6} {...props} />
);

export default HeaderWithAnchor;