import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  MarkdownPageProps,
  MarkdownConfig,
  DEFAULT_MARKDOWN_CONFIG,
  SYNTAX_THEMES
} from '@/types/markdown';
import {
  FileText,
  Settings,
  Eye,
  Code,
  Download,
  Upload,
  RefreshCw,
  Palette,
  Link,
  Type,
  CheckSquare,
  AlertCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 配置面板组件
interface ConfigPanelProps {
  config: MarkdownConfig;
  onConfigChange: (config: MarkdownConfig) => void;
}

function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const handleConfigUpdate = useCallback((updates: Partial<MarkdownConfig>) => {
    onConfigChange({ ...config, ...updates });
  }, [config, onConfigChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          渲染配置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 语法高亮设置 */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            语法高亮
          </Label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableSyntaxHighlight"
              checked={config.enableSyntaxHighlight}
              onChange={(e) => handleConfigUpdate({ enableSyntaxHighlight: e.target.checked })}
              className="rounded border-border"
            />
            <Label htmlFor="enableSyntaxHighlight" className="text-sm">
              启用代码语法高亮
            </Label>
          </div>
        </div>

        {/* 主题选择 */}
        {config.enableSyntaxHighlight && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              高亮主题
            </Label>
            <Select
              value={config.syntaxTheme}
              onValueChange={(value: any) => handleConfigUpdate({ syntaxTheme: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SYNTAX_THEMES.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* GFM支持 */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            GitHub风格Markdown
          </Label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableGFM"
              checked={config.enableGFM}
              onChange={(e) => handleConfigUpdate({ enableGFM: e.target.checked })}
              className="rounded border-border"
            />
            <Label htmlFor="enableGFM" className="text-sm">
              启用表格、任务列表等扩展语法
            </Label>
          </div>
        </div>

        {/* 链接设置 */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            链接行为
          </Label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="openLinksInNewTab"
              checked={config.openLinksInNewTab}
              onChange={(e) => handleConfigUpdate({ openLinksInNewTab: e.target.checked })}
              className="rounded border-border"
            />
            <Label htmlFor="openLinksInNewTab" className="text-sm">
              外部链接在新标签页打开
            </Label>
          </div>
        </div>

        {/* 字体大小 */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            字体大小
          </Label>
          <Select
            value={config.fontSize}
            onValueChange={(value: any) => handleConfigUpdate({ fontSize: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">小号 (14px)</SelectItem>
              <SelectItem value="medium">中号 (16px)</SelectItem>
              <SelectItem value="large">大号 (18px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// 工具栏组件
interface ToolbarProps {
  onImport: () => void;
  onExport: () => void;
  onReset: () => void;
  hasContent: boolean;
}

function Toolbar({ onImport, onExport, onReset, hasContent }: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-border">
      <Button variant="outline" size="sm" onClick={onImport}>
        <Upload className="h-4 w-4 mr-2" />
        导入文件
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onExport}
        disabled={!hasContent}
      >
        <Download className="h-4 w-4 mr-2" />
        导出文件
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onReset}
        disabled={!hasContent}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        重置内容
      </Button>
    </div>
  );
}

// 状态信息组件
interface StatusInfoProps {
  content: string;
  wordCount: number;
  lineCount: number;
  lastModified?: Date;
}

function StatusInfo({ content, wordCount, lineCount, lastModified }: StatusInfoProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground p-2 border-t border-border">
      <div className="flex items-center gap-1">
        <FileText className="h-3 w-3" />
        <span>{content.length} 字符</span>
      </div>
      <div className="flex items-center gap-1">
        <Type className="h-3 w-3" />
        <span>{wordCount} 词</span>
      </div>
      <div className="flex items-center gap-1">
        <span>{lineCount} 行</span>
      </div>
      {lastModified && (
        <div className="flex items-center gap-1 ml-auto">
          <span>最后修改: {lastModified.toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
}

// 主要的MarkdownPage组件
export function MarkdownPage({
  initialContent = '',
  initialConfig = DEFAULT_MARKDOWN_CONFIG,
  title = 'Markdown 编辑器',
  showToolbar = true,
  showConfig = true,
  showStatus = true,
  className,
  onContentChange,
  onConfigChange
}: MarkdownPageProps) {
  const [content, setContent] = useState(initialContent);
  const [config, setConfig] = useState(initialConfig);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'split'>('split');
  const [lastModified, setLastModified] = useState<Date>();
  const [error, setError] = useState<string | null>(null);

  // 计算统计信息
  const stats = useMemo(() => {
    const lines = content.split('\n').length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    return { wordCount: words, lineCount: lines };
  }, [content]);

  // 处理内容变化
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setLastModified(new Date());
    setError(null);
    onContentChange?.(newContent);
  }, [onContentChange]);

  // 处理配置变化
  const handleConfigChange = useCallback((newConfig: MarkdownConfig) => {
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  }, [onConfigChange]);

  // 导入文件
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          handleContentChange(content);
        };
        reader.onerror = () => {
          setError('文件读取失败');
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [handleContentChange]);

  // 导出文件
  const handleExport = useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `markdown-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  // 重置内容
  const handleReset = useCallback(() => {
    if (confirm('确定要清空所有内容吗？此操作不可撤销。')) {
      handleContentChange('');
    }
  }, [handleContentChange]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {activeTab === 'edit' ? '编辑模式' : activeTab === 'preview' ? '预览模式' : '分屏模式'}
          </Badge>
        </div>
      </div>

      {/* 工具栏 */}
      {showToolbar && (
        <Toolbar
          onImport={handleImport}
          onExport={handleExport}
          onReset={handleReset}
          hasContent={content.length > 0}
        />
      )}

      {/* 错误提示 */}
      {error && (
        <Alert className="m-4 border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 主要内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧配置面板 */}
        {showConfig && (
          <div className="w-80 border-r border-border overflow-y-auto">
            <ConfigPanel config={config} onConfigChange={handleConfigChange} />
          </div>
        )}

        {/* 中间编辑/预览区域 */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                编辑
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                预览
              </TabsTrigger>
              <TabsTrigger value="split" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                分屏
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="flex-1 m-0">
              <Textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="在此输入Markdown内容..."
                className="h-full resize-none border-0 focus-visible:ring-0 font-mono"
                style={{ fontSize: config.fontSize === 'small' ? '14px' : config.fontSize === 'large' ? '18px' : '16px' }}
              />
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 overflow-y-auto">
              <div className="p-6">
                <MarkdownRenderer
                  content={content}
                  config={config}
                  className={cn(
                    config.fontSize === 'small' && 'text-sm',
                    config.fontSize === 'large' && 'text-lg'
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="split" className="flex-1 m-0 flex">
              <div className="flex-1 border-r border-border">
                <Textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="在此输入Markdown内容..."
                  className="h-full resize-none border-0 focus-visible:ring-0 font-mono"
                  style={{ fontSize: config.fontSize === 'small' ? '14px' : config.fontSize === 'large' ? '18px' : '16px' }}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <MarkdownRenderer
                    content={content}
                    config={config}
                    className={cn(
                      config.fontSize === 'small' && 'text-sm',
                      config.fontSize === 'large' && 'text-lg'
                    )}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 状态栏 */}
      {showStatus && (
        <StatusInfo
          content={content}
          wordCount={stats.wordCount}
          lineCount={stats.lineCount}
          lastModified={lastModified}
        />
      )}
    </div>
  );
}

export default MarkdownPage;