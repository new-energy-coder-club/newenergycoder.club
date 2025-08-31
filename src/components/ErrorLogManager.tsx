import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Bug, 
  Clock, 
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  Download,
  AlertCircle,
  Info
} from 'lucide-react';
import * as Sentry from '@sentry/react';

interface ErrorLog {
  id: string;
  message: string;
  level: 'error' | 'warning' | 'info';
  timestamp: Date;
  url?: string;
  userAgent?: string;
  userId?: string;
  stack?: string;
  tags?: Record<string, string>;
  fingerprint?: string[];
}

const ErrorLogManager: React.FC = () => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ErrorLog[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);

  // 模拟错误日志数据（实际项目中应该从Sentry API获取）
  const generateMockErrorLogs = (): ErrorLog[] => {
    const mockErrors: ErrorLog[] = [
      {
        id: '1',
        message: 'TypeError: Cannot read property of undefined',
        level: 'error',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
        url: '/dashboard',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        stack: 'TypeError: Cannot read property of undefined\n    at Component.render (/src/components/Dashboard.tsx:45:12)',
        tags: { environment: 'production', version: '1.0.0' }
      },
      {
        id: '2',
        message: 'Network request failed',
        level: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1小时前
        url: '/api/data',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        stack: 'Error: Network request failed\n    at fetch (/src/lib/api.ts:23:8)',
        tags: { environment: 'production', api: 'data-fetch' }
      },
      {
        id: '3',
        message: 'Performance warning: Large bundle size detected',
        level: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2小时前
        url: '/',
        tags: { environment: 'production', type: 'performance' }
      }
    ];
    return mockErrors;
  };

  // 刷新错误日志
  const refreshErrorLogs = () => {
    setIsLoading(true);
    setTimeout(() => {
      const logs = generateMockErrorLogs();
      setErrorLogs(logs);
      filterLogs(logs, selectedLevel);
      setIsLoading(false);
    }, 1000);
  };

  // 过滤日志
  const filterLogs = (logs: ErrorLog[], level: string) => {
    if (level === 'all') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.level === level));
    }
  };

  // 处理级别过滤
  const handleLevelFilter = (level: string) => {
    setSelectedLevel(level);
    filterLogs(errorLogs, level);
  };

  // 清除所有日志
  const clearAllLogs = () => {
    setErrorLogs([]);
    setFilteredLogs([]);
    setSelectedError(null);
  };

  // 导出错误报告
  const exportErrorReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      totalErrors: errorLogs.length,
      errorsByLevel: {
        error: errorLogs.filter(log => log.level === 'error').length,
        warning: errorLogs.filter(log => log.level === 'warning').length,
        info: errorLogs.filter(log => log.level === 'info').length,
      },
      errors: errorLogs
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 手动触发测试错误
  const triggerTestError = () => {
    try {
      // 故意触发一个错误用于测试
      throw new Error('这是一个测试错误，用于验证错误监控功能');
    } catch (error) {
      Sentry.captureException(error);
      // 添加到本地日志
      const newError: ErrorLog = {
        id: Date.now().toString(),
        message: 'Test error: 这是一个测试错误，用于验证错误监控功能',
        level: 'error',
        timestamp: new Date(),
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        stack: (error as Error).stack,
        tags: { environment: 'test', type: 'manual-test' }
      };
      const updatedLogs = [newError, ...errorLogs];
      setErrorLogs(updatedLogs);
      filterLogs(updatedLogs, selectedLevel);
    }
  };

  useEffect(() => {
    refreshErrorLogs();
  }, []);

  // 获取级别图标
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Bug className="w-4 h-4" />;
    }
  };

  // 获取级别颜色
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  return (
    <div className="space-y-6">
      {/* 头部控制 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bug className="w-6 h-6" />
            错误监控管理
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            实时监控和管理应用程序错误日志
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={triggerTestError}
            className="flex items-center gap-2"
          >
            <Bug className="w-4 h-4" />
            触发测试错误
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshErrorLogs}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportErrorReport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            导出报告
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={clearAllLogs}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            清除日志
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总错误数</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorLogs.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">严重错误</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {errorLogs.filter(log => log.level === 'error').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">警告</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {errorLogs.filter(log => log.level === 'warning').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">信息</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {errorLogs.filter(log => log.level === 'info').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 过滤器 */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">过滤级别:</span>
        <div className="flex gap-2">
          {['all', 'error', 'warning', 'info'].map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleLevelFilter(level)}
            >
              {level === 'all' ? '全部' : level}
            </Button>
          ))}
        </div>
      </div>

      {/* 错误日志列表 */}
      <Card>
        <CardHeader>
          <CardTitle>错误日志</CardTitle>
          <CardDescription>
            显示最近的错误、警告和信息日志
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getLevelIcon(log.level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {log.message}
                          </h3>
                          <Badge className={getLevelColor(log.level)}>
                            {log.level}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(log.timestamp)}
                            </span>
                            {log.url && (
                              <span>页面: {log.url}</span>
                            )}
                          </div>
                          {log.tags && (
                            <div className="flex gap-1">
                              {Object.entries(log.tags).map(([key, value]) => (
                                <Badge key={key} variant="outline" className="text-xs">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedError(log)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Bug className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>暂无错误日志</p>
              <p className="text-sm">这是一个好消息！</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 错误详情模态框 */}
      {selectedError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {getLevelIcon(selectedError.level)}
                  错误详情
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedError(null)}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">错误信息</h4>
                  <p className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    {selectedError.message}
                  </p>
                </div>
                
                {selectedError.stack && (
                  <div>
                    <h4 className="font-medium mb-2">堆栈跟踪</h4>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                      {selectedError.stack}
                    </pre>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">时间</h4>
                    <p className="text-sm">{selectedError.timestamp.toLocaleString('zh-CN')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">页面URL</h4>
                    <p className="text-sm">{selectedError.url || '未知'}</p>
                  </div>
                </div>
                
                {selectedError.userAgent && (
                  <div>
                    <h4 className="font-medium mb-2">用户代理</h4>
                    <p className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      {selectedError.userAgent}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorLogManager;