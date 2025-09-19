# 链接检测功能使用指南

## 概述

链接检测功能是一个强大的文档链接自动检测和验证系统，能够自动识别文档中的各种类型链接，验证其有效性，并提供丰富的交互功能。

## 功能特性

### 🔍 智能链接检测
- **多种链接类型支持**：外部链接、内部链接、锚点链接、邮件链接、电话链接、文件链接
- **自动链接提取**：从文档内容中自动识别和提取链接
- **链接分类**：根据链接类型进行智能分类和标记

### ✅ 链接验证
- **实时验证**：自动验证链接的有效性
- **批量验证**：支持大量链接的批量验证处理
- **缓存机制**：验证结果缓存，避免重复验证
- **错误处理**：优雅处理验证失败的情况

### 🎨 用户界面
- **可视化展示**：直观显示链接状态和统计信息
- **主题支持**：支持明暗主题切换
- **响应式设计**：适配各种屏幕尺寸
- **交互反馈**：丰富的用户交互反馈

### ⚡ 性能优化
- **懒加载**：按需加载链接检测组件
- **防抖处理**：避免频繁的链接处理请求
- **批处理**：高效的批量数据处理
- **缓存管理**：智能的缓存策略

## 快速开始

### 基础使用

```tsx
import { LinkDetectorComponent } from '@/components/LinkDetectorComponent';

function MyDocument() {
  const content = `
    这是一个包含链接的文档：
    - 官网：https://example.com
    - 邮箱：contact@example.com
    - 内部链接：/docs/guide
  `;

  return (
    <div>
      <h1>我的文档</h1>
      <LinkDetectorComponent 
        content={content}
        showStats={true}
        enableValidation={true}
      />
    </div>
  );
}
```

### 懒加载使用

```tsx
import { LazyLinkDetector } from '@/components/LazyLinkDetector';

function MyDocument() {
  return (
    <div>
      <h1>我的文档</h1>
      <LazyLinkDetector 
        content={content}
        enableLazyLoading={true}
        fallback={CustomLoadingComponent}
      />
    </div>
  );
}
```

### 可视区域懒加载

```tsx
import { ViewportLazyLinkDetector } from '@/components/LazyLinkDetector';

function MyDocument() {
  return (
    <div>
      <h1>我的文档</h1>
      <ViewportLazyLinkDetector 
        content={content}
        rootMargin="100px"
        threshold={0.1}
        once={true}
      />
    </div>
  );
}
```

## 组件API

### LinkDetectorComponent

主要的链接检测组件。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `content` | `string` | - | 要检测链接的文档内容 |
| `showStats` | `boolean` | `true` | 是否显示统计信息 |
| `enableValidation` | `boolean` | `true` | 是否启用链接验证 |
| `maxLinks` | `number` | `100` | 最大链接数量限制 |
| `difficulty` | `DocumentDifficulty` | `'basic'` | 文档难度级别 |
| `onLinksDetected` | `function` | - | 链接检测完成回调 |
| `onValidationComplete` | `function` | - | 验证完成回调 |
| `className` | `string` | - | 自定义CSS类名 |

#### 示例

```tsx
<LinkDetectorComponent
  content={documentContent}
  showStats={true}
  enableValidation={true}
  maxLinks={50}
  difficulty="intermediate"
  onLinksDetected={(links) => console.log('检测到链接:', links)}
  onValidationComplete={(results) => console.log('验证完成:', results)}
  className="my-link-detector"
/>
```

### HeaderWithAnchor

带锚点功能的标题组件。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `level` | `1-6` | `1` | 标题级别 |
| `children` | `ReactNode` | - | 标题内容 |
| `id` | `string` | - | 自定义锚点ID |
| `difficulty` | `DocumentDifficulty` | - | 难度级别 |
| `showAnchor` | `boolean` | `true` | 是否显示锚点按钮 |
| `className` | `string` | - | 自定义CSS类名 |

#### 示例

```tsx
<HeaderWithAnchor level={2} difficulty="advanced">
  高级功能介绍
</HeaderWithAnchor>

// 或使用便捷组件
<H1 difficulty="basic">基础概念</H1>
<H2 difficulty="intermediate">中级技巧</H2>
<H3 difficulty="advanced">高级应用</H3>
```

## Hook API

### useLinkProcessor

主要的链接处理Hook。

```tsx
const {
  links,
  stats,
  isProcessing,
  error,
  processLinks,
  clearCache,
  reprocessLinks
} = useLinkProcessor({
  enableValidation: true,
  maxLinks: 100,
  debounceMs: 300
});
```

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| `links` | `ProcessedLink[]` | 处理后的链接列表 |
| `stats` | `LinkStats` | 链接统计信息 |
| `isProcessing` | `boolean` | 是否正在处理 |
| `error` | `Error \| null` | 错误信息 |
| `processLinks` | `function` | 处理链接函数 |
| `clearCache` | `function` | 清除缓存函数 |
| `reprocessLinks` | `function` | 重新处理函数 |

### useSimpleLinkProcessor

简化版的链接处理Hook。

```tsx
const { links, processLinks } = useSimpleLinkProcessor();
```

### useLinkValidation

链接验证Hook。

```tsx
const {
  validationResults,
  isValidating,
  validateLinks,
  clearValidationCache
} = useLinkValidation();
```

### useLinkStats

链接统计Hook。

```tsx
const stats = useLinkStats(links);
```

## 配置选项

### 全局配置

```tsx
import { updateLinkDetectionConfig } from '@/config/LinkDetectionConfig';

// 更新全局配置
updateLinkDetectionConfig({
  validation: {
    enabled: true,
    timeout: 5000,
    retryCount: 2
  },
  cache: {
    enabled: true,
    ttl: 300000, // 5分钟
    maxSize: 1000
  },
  ui: {
    showStats: true,
    showValidationStatus: true,
    theme: 'auto'
  }
});
```

### 难度配置

```tsx
import { updateDifficultyConfig } from '@/config/LinkDetectionConfig';

// 更新难度配置
updateDifficultyConfig({
  basic: {
    color: '#10b981',
    label: '基础',
    description: '适合初学者'
  },
  intermediate: {
    color: '#f59e0b',
    label: '中级',
    description: '需要一定基础'
  },
  advanced: {
    color: '#ef4444',
    label: '高级',
    description: '需要深入理解'
  },
  expert: {
    color: '#8b5cf6',
    label: '专家',
    description: '专业级内容'
  }
});
```

## 样式定制

### CSS变量

链接检测组件使用CSS变量进行样式定制：

```css
:root {
  /* 主色调 */
  --link-detection-primary: #3b82f6;
  --link-detection-success: #10b981;
  --link-detection-warning: #f59e0b;
  --link-detection-error: #ef4444;
  
  /* 背景色 */
  --link-detection-bg-primary: #ffffff;
  --link-detection-bg-secondary: #f8fafc;
  
  /* 文本色 */
  --link-detection-text-primary: #1e293b;
  --link-detection-text-secondary: #64748b;
  
  /* 边框色 */
  --link-detection-border-primary: #e2e8f0;
  
  /* 圆角 */
  --link-detection-radius-md: 0.375rem;
  
  /* 间距 */
  --link-detection-spacing-md: 0.75rem;
}
```

### 暗色主题

```css
[data-theme="dark"] {
  --link-detection-bg-primary: #0f172a;
  --link-detection-bg-secondary: #1e293b;
  --link-detection-text-primary: #f8fafc;
  --link-detection-text-secondary: #cbd5e1;
  --link-detection-border-primary: #334155;
}
```

### 自定义样式类

```css
/* 自定义链接检测器样式 */
.my-link-detector {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 自定义链接项样式 */
.my-link-detector .link-item {
  transition: all 0.3s ease;
}

.my-link-detector .link-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

## 性能优化

### 缓存策略

```tsx
import { globalCacheManager } from '@/services/CacheManager';

// 清除特定缓存
globalCacheManager.clear('link-validation');

// 获取缓存统计
const stats = globalCacheManager.getStats();
console.log('缓存命中率:', stats.hitRate);

// 设置缓存配置
globalCacheManager.updateConfig({
  maxSize: 2000,
  ttl: 600000, // 10分钟
  cleanupInterval: 300000 // 5分钟清理一次
});
```

### 批处理优化

```tsx
import { globalLinkBatchProcessor } from '@/utils/BatchProcessor';

// 批量验证链接
const result = await globalLinkBatchProcessor.validateLinks(
  urls,
  (processed, total) => {
    console.log(`验证进度: ${processed}/${total}`);
  }
);

console.log('验证结果:', result.results);
console.log('失败信息:', result.failures);
console.log('统计信息:', result.stats);
```

### 性能监控

```tsx
import { performanceMonitor } from '@/utils/PerformanceUtils';

// 监控函数性能
const monitoredFunction = performanceMonitor(
  async (content: string) => {
    return await processLinks(content);
  },
  'processLinks'
);

// 获取性能报告
const report = performanceMonitor.getReport();
console.log('性能报告:', report);
```

## 错误处理

### 错误边界

```tsx
import { LinkDetectorErrorBoundary } from '@/components/LazyLinkDetector';

function MyApp() {
  return (
    <LinkDetectorErrorBoundary>
      <LinkDetectorComponent content={content} />
    </LinkDetectorErrorBoundary>
  );
}
```

### 错误回调

```tsx
<LinkDetectorComponent
  content={content}
  onError={(error) => {
    console.error('链接检测错误:', error);
    // 发送错误报告
    reportError(error);
  }}
/>
```

## 最佳实践

### 1. 性能优化

- 使用懒加载组件减少初始加载时间
- 合理设置缓存TTL避免过期数据
- 使用防抖避免频繁的链接处理
- 限制最大链接数量防止性能问题

### 2. 用户体验

- 提供加载状态反馈
- 显示验证进度信息
- 优雅处理错误情况
- 支持主题切换

### 3. 可访问性

- 使用语义化的HTML结构
- 提供键盘导航支持
- 添加适当的ARIA标签
- 支持屏幕阅读器

### 4. 维护性

- 使用TypeScript确保类型安全
- 编写单元测试覆盖核心功能
- 遵循组件设计原则
- 保持代码文档更新

## 故障排除

### 常见问题

#### 1. 链接检测不工作

**问题**：组件渲染但不显示链接

**解决方案**：
- 检查`content`属性是否正确传递
- 确认内容中包含有效的链接格式
- 查看浏览器控制台是否有错误信息

#### 2. 样式显示异常

**问题**：组件样式不正确

**解决方案**：
- 确认已导入CSS文件：`import '@/styles/LinkDetection.css'`
- 检查CSS变量是否被覆盖
- 验证主题设置是否正确

#### 3. 验证功能失效

**问题**：链接验证不工作

**解决方案**：
- 检查网络连接
- 确认`enableValidation`属性为`true`
- 查看CORS策略是否阻止请求
- 检查验证超时设置

#### 4. 性能问题

**问题**：大量链接导致页面卡顿

**解决方案**：
- 使用懒加载组件
- 设置合理的`maxLinks`限制
- 启用缓存机制
- 使用批处理优化

### 调试技巧

```tsx
// 启用调试模式
<LinkDetectorComponent
  content={content}
  debug={true}
  onDebug={(info) => console.log('调试信息:', info)}
/>

// 查看缓存状态
console.log('缓存统计:', globalCacheManager.getStats());

// 监控性能
const stats = performanceMonitor.getReport();
console.log('性能统计:', stats);
```

## 更新日志

### v1.0.0 (2024-01-20)

- ✨ 初始版本发布
- 🔍 支持多种链接类型检测
- ✅ 实现链接验证功能
- 🎨 提供完整的UI组件
- ⚡ 集成性能优化功能
- 📚 完善的文档和示例

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建Pull Request

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件。

## 支持

如有问题或建议，请：

- 创建 [Issue](https://github.com/your-repo/issues)
- 发送邮件至：support@example.com
- 查看 [FAQ](./FAQ.md)

---

**Happy Coding! 🚀**