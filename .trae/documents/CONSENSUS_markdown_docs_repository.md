# CONSENSUS - Markdown 文档仓库自动渲染系统

## 1. 共识结论

本任务已不再定义为“从零建设文档系统”，而是明确为：

- 以当前仓库中的 Markdown 文档系统实现为基线
- 用现状文档替换早期规划态描述
- 记录已实现能力、未完成能力和与原始目标的偏差

## 2. 当前系统共识描述

### 2.1 文档仓库

- 实际根目录为 `public/docs/`
- 已存在多类文档内容与 `_meta.json` 元数据文件
- 当前主要分类包括：
  - `getting-started`
  - `tutorials`
  - `resources`
  - `technical`
  - `events`

### 2.2 页面与服务实现

- `DocumentLoader`
  - 已实现文档内容加载、Front Matter 解析、TOC 生成
- `DocumentCache`
  - 已实现内存缓存与 `sessionStorage` 双层缓存
- `DocumentPage`
  - 已作为通用文档详情页投入使用
  - 技术文档详情页当前也直接复用该页面
- `TechnicalDocsLayout`
  - 已作为技术文档概览页增强布局投入使用
  - 详情页能力存在于组件内部，但当前路由未接入
- `TechnicalDocsNavigation`
  - 已实现技术文档导航
- `TechnicalDocsSearch`
  - 已实现技术文档前端搜索
- `DocumentTOC`
  - 已实现目录渲染和滚动高亮

### 2.3 当前路由共识

当前有效文档路由以 `src/App.tsx` 为准：

```text
/docs/technical
/docs/technical/:slug
/docs/:category/:subcategory/:slug
/docs/:category/:slug
/docs/:category
```

补充说明：

- `/getting-started` 当前不是本地文档入口，而是重定向到外部文档站
- 技术文档概览页具有独立布局能力，普通文档与技术文档详情页当前都走通用页面

## 3. 技术实现共识

### 3.1 文档加载方式

- 不使用运行时扫描本地源码目录
- 通过浏览器 `fetch('/docs/...')` 读取 `public/docs` 静态资源
- 文档加载顺序为：
  1. 优先尝试目录型 `index.md`
  2. 再回退到同名 `slug.md`
- 若 `index.md` 请求在开发或托管回退场景下返回 HTML，仍会继续回退到 `slug.md`

### 3.2 Markdown 渲染方式

- 正文渲染采用 `ReactMarkdown + remark-gfm`
- 标题增强采用 `HeaderWithAnchor`
- 文档后处理能力包含 `LinkDetectorComponent`
- `LinkDetectorComponent` 在当前 `DocumentPage` 中默认自动执行链接校验

### 3.3 缓存方式

- 优先从内存缓存读取
- 内存未命中后读取 `sessionStorage`
- 默认缓存为短时 TTL 策略

## 4. 边界与限制共识

### 4.1 已纳入当前系统范围

- 静态 Markdown 文档读取
- 分类元数据读取
- 文档详情页展示
- 技术文档导航、搜索、目录
- 文档缓存
- 文档错误态展示

### 4.2 未纳入或尚未完成

- 全站统一文档导航体系
- 全局全文搜索
- 自动化测试闭环
- 原规划中的 `DocumentRouter`
- 原规划中的独立 `DocumentBreadcrumb`
- 原规划中的独立 `DocumentSidebar`

### 4.3 与原规划不一致但已接受的现状

- `public/docs/` 替代 `docs/`
- `DocumentPage` 承担了更多聚合职责
- `technical` 分类拥有专项增强能力，而不是所有分类统一增强
- `/getting-started` 改为外部跳转

## 5. 验收共识

### 5.1 认定为已完成

1. 文档仓库与基础分类已落地
2. Markdown 文档可以被正确加载和渲染
3. 文档缓存能力已存在
4. 技术文档概览页导航与搜索已存在
5. 错误态和加载态已有基本处理

### 5.2 认定为部分完成

1. 学习入口与文档系统存在连接，但不再由 `/getting-started` 本地页统一承载
2. 搜索已实现，但仅限技术文档
3. 技术文档三栏布局能力已在组件层具备，但当前详情路由未接入
4. 文档结构化能力已具备，但不是完全按原设计拆分落地

### 5.3 认定为待补齐

1. 自动化测试闭环
2. 文档正文相对链接一致性自动校验
3. 技术文档详情页与三栏布局的实际路由接线
4. 通用分类的统一布局体验
5. 搜索性能与覆盖范围

## 6. 风险与注意事项共识

- `DocumentTOC` 使用动态 Tailwind 缩进类名，存在样式失效风险
- `TechnicalDocsSearch` 采用前端串行加载文档进行搜索，后续扩展成本较高
- `DocumentLoader.searchDocuments()`、`DocumentCache.preload()` 与 `DocumentLoader.loadAllCategories()` 仍未形成实际调用闭环
- 文档正文中的相对链接尚未建立自动一致性校验，仍可能出现链接指向缺失文档的情况
- `TechnicalDocsLayout` 的详情页能力与 `DocumentTOC` 联动当前停留在组件级，用户实际访问技术详情页时不会看到该增强布局

## 7. 后续方向共识

后续如果继续演进本系统，优先级建议如下：

1. 建立正文相对链接的一致性自动校验
2. 为 `DocumentLoader`、`DocumentCache`、`DocumentPage` 补齐测试
3. 决定是否将技术文档详情页真正接入 `TechnicalDocsLayout`
4. 将技术文档能力抽象为全站统一文档框架
5. 将前端串行搜索替换为静态索引或预构建索引

---

**文档状态**: 已按现状确认  
**创建时间**: 2024-12-19  
**最后更新**: 2026-08-17  
**确认人**: SOLO Document  
**下一步**: 以现状版 DESIGN / TASK / ACCEPTANCE 文档为执行与维护基线
