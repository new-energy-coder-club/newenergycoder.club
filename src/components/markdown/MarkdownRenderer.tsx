import React, { useMemo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  MarkdownRendererProps,
  MarkdownConfig,
  DEFAULT_MARKDOWN_CONFIG,
  SYNTAX_THEMES
} from '@/types/markdown';
import { AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 代码块组件
interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
  config: MarkdownConfig;
}

function CodeBlock({ children, className, inline, config }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 检测系统主题
  useEffect(() => {
    const checkTheme = () => {
      if (config.syntaxTheme === 'auto') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(config.syntaxTheme === 'dark');
      }
    };

    checkTheme();
    
    if (config.syntaxTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', checkTheme);
      return () => mediaQuery.removeEventListener('change', checkTheme);
    }
  }, [config.syntaxTheme]);

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">
        {children}
      </code>
    );
  }

  if (!config.enableSyntaxHighlight) {
    return (
      <div className="relative">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">{children}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <SyntaxHighlighter
        style={isDark ? tomorrow : github}
        language={language}
        PreTag="div"
        className="rounded-lg !mt-0 !mb-0"
        codeTagProps={{
          style: {
            fontSize: '0.875rem',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
          }
        }}
      >
        {children}
      </SyntaxHighlighter>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

// 链接组件
interface LinkProps {
  href?: string;
  children: React.ReactNode;
  config: MarkdownConfig;
}

function Link({ href, children, config }: LinkProps) {
  const isExternal = href?.startsWith('http');
  const target = config.openLinksInNewTab && isExternal ? '_blank' : undefined;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  );
}

// 表格组件
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-muted/50">
      {children}
    </thead>
  );
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      {children}
    </tr>
  );
}

function TableCell({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const { isHeader, ...domProps } = props;
  const Component = isHeader ? 'th' : 'td';
  
  return (
    <Component 
      className={cn(
        "px-4 py-2 text-left border-r border-border last:border-r-0",
        isHeader && "font-semibold"
      )}
      {...domProps}
    >
      {children}
    </Component>
  );
}

// 任务列表组件
function TaskListItem({ children, checked }: { children: React.ReactNode; checked?: boolean }) {
  return (
    <li className="flex items-start gap-2 list-none">
      <input
        type="checkbox"
        checked={checked}
        disabled
        className="mt-1 rounded border-border"
      />
      <span className={checked ? 'line-through text-muted-foreground' : ''}>
        {children}
      </span>
    </li>
  );
}

// 加载骨架屏组件
function MarkdownSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

// 主要的MarkdownRenderer组件
export function MarkdownRenderer({
  content,
  config = DEFAULT_MARKDOWN_CONFIG,
  className,
  loading = false,
  error = null,
  onContentChange
}: MarkdownRendererProps) {
  const mergedConfig = useMemo(() => ({
    ...DEFAULT_MARKDOWN_CONFIG,
    ...config
  }), [config]);

  // 处理内容变化
  useEffect(() => {
    if (onContentChange) {
      onContentChange(content);
    }
  }, [content, onContentChange]);

  // 配置remark插件
  const remarkPlugins = useMemo(() => {
    const plugins = [];
    if (mergedConfig.enableGFM) {
      plugins.push(remarkGfm);
    }
    return plugins;
  }, [mergedConfig.enableGFM]);

  // 自定义组件映射
  const components = useMemo(() => ({
    code: ({ children, className, ...props }: any) => (
      <CodeBlock
        className={className}
        config={mergedConfig}
        inline={!className}
        {...props}
      >
        {children}
      </CodeBlock>
    ),
    a: ({ href, children }: any) => (
      <Link href={href} config={mergedConfig}>
        {children}
      </Link>
    ),
    table: Table,
    thead: TableHead,
    tr: TableRow,
    td: (props: any) => <TableCell {...props} />,
    th: (props: any) => <TableCell {...props} isHeader />,
    li: ({ children, className, ...props }: any) => {
      // 检查是否是任务列表项
      if (className?.includes('task-list-item')) {
        const checked = props['data-checked'] !== undefined;
        return <TaskListItem checked={checked}>{children}</TaskListItem>;
      }
      return <li className="ml-4" {...props}>{children}</li>;
    },
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base font-semibold mt-3 mb-1">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm font-semibold mt-2 mb-1">{children}</h6>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    hr: () => <hr className="my-8 border-border" />,
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-sm my-4"
        loading="lazy"
      />
    )
  }), [mergedConfig]);

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <MarkdownSkeleton />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className={cn("border-destructive", className)}>
        <AlertCircle className="h-4 w-4" />
        <div>
          <h4 className="font-semibold">渲染错误</h4>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </Alert>
    );
  }

  if (!content || content.trim() === '') {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <p className="text-muted-foreground">暂无内容</p>
      </Card>
    );
  }

  return (
    <div className={cn("prose prose-slate max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        components={components}
        skipHtml={false}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;