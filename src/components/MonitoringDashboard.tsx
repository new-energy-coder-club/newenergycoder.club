import React, { useState, useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  Clock, 
  Zap, 
  TrendingUp, 
  Monitor,
  RefreshCw,
  Download
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'error';
  description: string;
}

const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Map<string, number>>(new Map());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // 刷新指标数据
  const refreshMetrics = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const metricsData = performanceMonitor.getMetrics();
        if (metricsData && metricsData instanceof Map) {
          setMetrics(metricsData);
        } else {
          console.warn('Performance metrics not available, using empty Map');
          setMetrics(new Map());
        }
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error refreshing metrics:', error);
        setMetrics(new Map());
      }
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    // 初始化性能监控
    try {
      performanceMonitor.init();
    } catch (error) {
      console.error('Error initializing performance monitor:', error);
    }
    
    refreshMetrics();
    // 每30秒自动刷新一次
    const interval = setInterval(refreshMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  // 格式化指标数据
  const formatMetrics = (): MetricData[] => {
    const metricsArray: MetricData[] = [];
    
    if (!metrics || !(metrics instanceof Map)) {
      return metricsArray;
    }
    
    metrics.forEach((value, key) => {
      let status: 'good' | 'warning' | 'error' = 'good';
      let description = '';
      
      // 根据指标类型设置状态和描述
      switch (key) {
        case 'LCP':
          status = value <= 2500 ? 'good' : value <= 4000 ? 'warning' : 'error';
          description = 'Largest Contentful Paint - 最大内容绘制时间';
          break;
        case 'FID':
          status = value <= 100 ? 'good' : value <= 300 ? 'warning' : 'error';
          description = 'First Input Delay - 首次输入延迟';
          break;
        case 'CLS':
          status = value <= 0.1 ? 'good' : value <= 0.25 ? 'warning' : 'error';
          description = 'Cumulative Layout Shift - 累积布局偏移';
          break;
        case 'Page_Load_Time':
          status = value <= 3000 ? 'good' : value <= 5000 ? 'warning' : 'error';
          description = '页面完整加载时间';
          break;
        case 'DNS_Time':
          status = value <= 200 ? 'good' : value <= 500 ? 'warning' : 'error';
          description = 'DNS 查询时间';
          break;
        case 'Response_Time':
          status = value <= 500 ? 'good' : value <= 1000 ? 'warning' : 'error';
          description = '服务器响应时间';
          break;
        default:
          description = '自定义性能指标';
      }
      
      metricsArray.push({
        name: key,
        value: Math.round(value * 100) / 100,
        unit: key === 'CLS' ? '' : 'ms',
        status,
        description
      });
    });
    
    return metricsArray.sort((a, b) => a.name.localeCompare(b.name));
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // 导出报告
  const exportReport = () => {
    const formattedData = formatMetrics();
    const report = {
      timestamp: new Date().toISOString(),
      metrics: metrics && metrics instanceof Map ? Object.fromEntries(metrics) : {},
      summary: {
        totalMetrics: metrics ? metrics.size : 0,
        goodMetrics: formattedData.filter(m => m.status === 'good').length,
        warningMetrics: formattedData.filter(m => m.status === 'warning').length,
        errorMetrics: formattedData.filter(m => m.status === 'error').length,
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formattedMetrics = formatMetrics();
  const coreWebVitals = formattedMetrics.filter(m => ['LCP', 'FID', 'CLS'].includes(m.name));
  const performanceMetrics = formattedMetrics.filter(m => !['LCP', 'FID', 'CLS'].includes(m.name));

  return (
    <div className="p-6 space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Monitor className="w-8 h-8" />
            网站监控仪表板
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            实时监控网站性能和用户体验指标
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshMetrics}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportReport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总指标数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics ? metrics.size : 0}</div>
            <p className="text-xs text-muted-foreground">
              最后更新: {lastUpdated.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">良好指标</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formattedMetrics.filter(m => m.status === 'good').length}
            </div>
            <p className="text-xs text-muted-foreground">
              性能表现优秀
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">警告指标</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formattedMetrics.filter(m => m.status === 'warning').length}
            </div>
            <p className="text-xs text-muted-foreground">
              需要关注优化
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">错误指标</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formattedMetrics.filter(m => m.status === 'error').length}
            </div>
            <p className="text-xs text-muted-foreground">
              需要立即处理
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 详细指标 */}
      <Tabs defaultValue="core-vitals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="core-vitals">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core-vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Core Web Vitals
              </CardTitle>
              <CardDescription>
                Google 核心网页指标，影响搜索排名和用户体验
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {coreWebVitals.length > 0 ? (
                  coreWebVitals.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(metric.status)}
                        <div>
                          <h3 className="font-medium">{metric.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{metric.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {metric.value}{metric.unit}
                        </span>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status === 'good' ? '优秀' : 
                           metric.status === 'warning' ? '警告' : '错误'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>暂无 Core Web Vitals 数据</p>
                    <p className="text-sm">请刷新页面或等待数据收集</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                性能指标详情
              </CardTitle>
              <CardDescription>
                页面加载、资源请求和用户交互的详细性能数据
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {performanceMetrics.length > 0 ? (
                  performanceMetrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(metric.status)}
                        <div>
                          <h3 className="font-medium">{metric.name.replace(/_/g, ' ')}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{metric.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {metric.value}{metric.unit}
                        </span>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status === 'good' ? '优秀' : 
                           metric.status === 'warning' ? '警告' : '错误'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>暂无性能数据</p>
                    <p className="text-sm">请刷新页面或等待数据收集</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringDashboard;