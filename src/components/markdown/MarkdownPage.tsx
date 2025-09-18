import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { MarkdownPageProps, DEFAULT_MARKDOWN_CONFIG } from '@/types/markdown';
import { MarkdownRenderer } from './MarkdownRenderer';



// 主要的MarkdownPage组件
export function MarkdownPage({
  content: initialContent = '',
  showMetadata = false,
  className,
  onContentChange
}: MarkdownPageProps) {
  const [content, setContent] = useState(initialContent);
  const [config] = useState(DEFAULT_MARKDOWN_CONFIG);

  // 处理内容变化
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
  }, [onContentChange]);



  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex-1 overflow-y-auto p-6">
        <MarkdownRenderer
          content={content}
          config={config}
        />
      </div>
    </div>
  );
}

export default MarkdownPage;