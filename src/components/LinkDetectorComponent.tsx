/**
 * LinkDetectorComponent
 * 链接检测和渲染组件
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProcessedLink, DocumentDifficulty, LinkType, ValidationResult } from '../types/link-detection';
import { useLinkProcessor, useLinkStats } from '../hooks/useLinkProcessor';
import { getDifficultyConfig } from '../config/DifficultyConfig';
import { ExternalLink, Mail, Phone, FileText, Anchor, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

/**
 * 组件属性
 */
export interface LinkDetectorComponentProps {
  /** 文档内容 */
  content: string;
  /** 文档难度 */
  difficulty?: DocumentDifficulty;
  /** 文档路径 */
  documentPath?: string;
  /** 是否显示验证状态 */
  showValidationStatus?: boolean;
  /** 是否自动验证链接 */
  autoValidate?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 链接点击回调 */
  onLinkClick?: (link: ProcessedLink, event: React.MouseEvent) => void;
  /** 验证完成回调 */
  onValidationComplete?: (results: Map<string, ValidationResult>) => void;
  /** 错误回调 */
  onError?: (error: string) => void;
}

/**
 * 链接图标组件
 */
const LinkIcon: React.FC<{ type: LinkType; className?: string }> = ({ type, className = "w-4 h-4" }) => {
  switch (type) {
    case LinkType.EXTERNAL:
      return <ExternalLink className={className} />;
    case LinkType.EMAIL:
      return <Mail className={className} />;
    case LinkType.PHONE:
      return <Phone className={className} />;
    case LinkType.FILE:
      return <FileText className={className} />;
    case LinkType.ANCHOR:
      return <Anchor className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
};

/**
 * 验证状态图标组件
 */
const ValidationStatusIcon: React.FC<{ 
  result?: ValidationResult; 
  isValidating?: boolean;
  className?: string;
}> = ({ result, isValidating, className = "w-3 h-3" }) => {
  if (isValidating) {
    return <Clock className={`${className} text-yellow-500 animate-pulse`} />;
  }
  
  if (!result) {
    return <Clock className={`${className} text-gray-400`} />;
  }
  
  if (result.isValid) {
    return <CheckCircle className={`${className} text-green-500`} />;
  }
  
  return <AlertCircle className={`${className} text-red-500`} />;
};

/**
 * 链接组件
 */
const LinkComponent: React.FC<{
  link: ProcessedLink;
  validationResult?: ValidationResult;
  isValidating?: boolean;
  showValidationStatus?: boolean;
  difficulty?: DocumentDifficulty;
  onClick?: (link: ProcessedLink, event: React.MouseEvent) => void;
}> = ({ 
  link, 
  validationResult, 
  isValidating, 
  showValidationStatus, 
  difficulty,
  onClick 
}) => {
  const difficultyConfig = difficulty ? getDifficultyConfig(difficulty) : null;
  
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (onClick) {
      onClick(link, event);
    }
  }, [link, onClick]);
  
  const linkClasses = useMemo(() => {
    const baseClasses = "inline-flex items-center gap-1 transition-all duration-200 hover:opacity-80";
    const typeClasses = {
      [LinkType.EXTERNAL]: "text-blue-600 hover:text-blue-800 hover:underline",
      [LinkType.INTERNAL]: "text-purple-600 hover:text-purple-800 hover:underline",
      [LinkType.EMAIL]: "text-green-600 hover:text-green-800 hover:underline",
      [LinkType.PHONE]: "text-orange-600 hover:text-orange-800 hover:underline",
      [LinkType.FILE]: "text-indigo-600 hover:text-indigo-800 hover:underline",
      [LinkType.ANCHOR]: "text-gray-600 hover:text-gray-800 hover:underline",
      [LinkType.RELATIVE]: "text-blue-600 hover:text-blue-800 hover:underline"
    };
    
    let classes = `${baseClasses} ${typeClasses[link.type]}`;
    
    // 添加难度相关样式
    if (difficultyConfig) {
      classes += ` border-l-2 border-l-${difficultyConfig.color.replace('#', '')}`;
    }
    
    // 添加验证状态样式
    if (validationResult && !validationResult.isValid) {
      classes += " opacity-60 line-through";
    }
    
    return classes;
  }, [link.type, difficultyConfig, validationResult]);
  
  const title = useMemo(() => {
    let titleText = `${link.type.toUpperCase()}: ${link.originalUrl}`;
    
    if (validationResult) {
      titleText += `\n状态: ${validationResult.isValid ? '有效' : '无效'}`;
      if (validationResult.error) {
        titleText += `\n错误: ${validationResult.error}`;
      }
      if (validationResult.responseTime) {
        titleText += `\n响应时间: ${validationResult.responseTime}ms`;
      }
    }
    
    if (difficulty) {
      titleText += `\n难度: ${difficulty}`;
    }
    
    return titleText;
  }, [link, validationResult, difficulty]);
  
  return (
    <a
      href={link.processedUrl}
      className={linkClasses}
      title={title}
      onClick={handleClick}
      target={link.metadata.isExternal ? '_blank' : undefined}
      rel={link.metadata.isExternal ? 'noopener noreferrer' : undefined}
    >
      <LinkIcon type={link.type} className="w-3 h-3" />
      <span>{link.text}</span>
      {showValidationStatus && (
        <ValidationStatusIcon 
          result={validationResult} 
          isValidating={isValidating}
          className="w-3 h-3 ml-1"
        />
      )}
    </a>
  );
};

/**
 * 链接统计组件
 */
const LinkStats: React.FC<{
  stats: ReturnType<typeof useLinkStats>;
  isValidating: boolean;
  onRefresh?: () => void;
}> = ({ stats, isValidating, onRefresh }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">链接统计</h3>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isValidating}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            title="刷新验证"
          >
            <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">总链接</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">{stats.valid}</div>
          <div className="text-gray-600">有效</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">{stats.invalid}</div>
          <div className="text-gray-600">无效</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">待验证</div>
        </div>
      </div>
      
      {stats.total > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-500">
            <span>外部: {stats.external}</span>
            <span>内部: {stats.internal}</span>
            <span>已验证: {Math.round((stats.validated / stats.total) * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 主要的链接检测组件
 */
export const LinkDetectorComponent: React.FC<LinkDetectorComponentProps> = ({
  content,
  difficulty,
  documentPath,
  showValidationStatus = true,
  autoValidate = true,
  className = '',
  onLinkClick,
  onValidationComplete,
  onError
}) => {
  const [showStats, setShowStats] = useState(false);
  
  // 使用链接处理Hook
  const {
    processedLinks,
    validationResults,
    isProcessing,
    isValidating,
    error,
    processLinks,
    reprocess,
    getStats
  } = useLinkProcessor({
    autoValidate,
    documentContext: {
      difficulty,
      path: documentPath || window.location.pathname,
      title: document.title
    }
  });
  
  // 获取统计信息
  const stats = useLinkStats(processedLinks, validationResults);
  
  // 处理内容变化
  useEffect(() => {
    if (content.trim()) {
      processLinks(content);
    }
  }, [content, processLinks]);
  
  // 处理验证完成
  useEffect(() => {
    if (onValidationComplete && validationResults.size > 0) {
      onValidationComplete(validationResults);
    }
  }, [validationResults, onValidationComplete]);
  
  // 处理错误
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);
  
  // 渲染处理后的内容
  const renderProcessedContent = useCallback(() => {
    if (!content || processedLinks.length === 0) {
      return <div className="text-gray-500 italic">未检测到链接</div>;
    }
    
    // 简单的内容渲染，将链接替换为LinkComponent
    let processedContent = content;
    const linkComponents: JSX.Element[] = [];
    
    processedLinks.forEach((link, index) => {
      const linkId = `link-${index}`;
      const validationResult = validationResults.get(link.originalUrl);
      
      linkComponents.push(
        <LinkComponent
          key={linkId}
          link={link}
          validationResult={validationResult}
          isValidating={isValidating}
          showValidationStatus={showValidationStatus}
          difficulty={difficulty}
          onClick={onLinkClick}
        />
      );
      
      // 替换原始链接为占位符
      processedContent = processedContent.replace(
        link.originalUrl,
        `__LINK_${index}__`
      );
    });
    
    // 将占位符替换为实际的链接组件
    const parts = processedContent.split(/__LINK_\d+__/);
    const result: (string | JSX.Element)[] = [];
    
    parts.forEach((part, index) => {
      result.push(part);
      if (index < linkComponents.length) {
        result.push(linkComponents[index]);
      }
    });
    
    return (
      <div className="prose prose-sm max-w-none">
        {result.map((item, index) => 
          typeof item === 'string' ? (
            <span key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ) : (
            <React.Fragment key={index}>{item}</React.Fragment>
          )
        )}
      </div>
    );
  }, [content, processedLinks, validationResults, isValidating, showValidationStatus, difficulty, onLinkClick]);
  
  if (isProcessing) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">正在处理链接...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">链接处理错误: {error}</span>
        </div>
        <button
          onClick={reprocess}
          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          重试
        </button>
      </div>
    );
  }
  
  return (
    <div className={`link-detector ${className}`}>
      {/* 统计信息 */}
      {processedLinks.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <span>{showStats ? '隐藏' : '显示'}链接统计</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
              {stats.total}
            </span>
          </button>
          
          {showStats && (
            <LinkStats 
              stats={stats} 
              isValidating={isValidating}
              onRefresh={reprocess}
            />
          )}
        </div>
      )}
      
      {/* 处理后的内容 */}
      <div className="link-detector-content">
        {renderProcessedContent()}
      </div>
      
      {/* 验证状态指示器 */}
      {isValidating && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 animate-pulse mr-2" />
          <span>正在验证链接...</span>
        </div>
      )}
    </div>
  );
};

export default LinkDetectorComponent;