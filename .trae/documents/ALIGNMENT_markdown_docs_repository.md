# ALIGNMENT - Markdown 文档仓库自动渲染系统

## 1. 对齐目标

本文档按当前仓库真实状态重写，用于明确 Markdown 文档系统已经落地的范围、当前实现边界以及与原始需求之间的偏差，作为后续维护与继续演进的对齐基线。

## 2. 原始需求与当前现状

### 2.1 原始需求

- 建立一个 Markdown 文档仓库
- 支持文档自动渲染为网页
- 能从 `/getting-started` 或相关学习入口访问文档
- 页面风格与主站保持一致

### 2.2 当前现状

- 文档仓库已存在，实际目录位于 `public/docs/`
- 通用 Markdown 文档访问已接入 `/docs/...` 路由
- 核心加载与缓存能力已经落地，分别由 `DocumentLoader` 与 `DocumentCache` 承担
- 技术文档模块已实现增强布局组件：`TechnicalDocsLayout + TechnicalDocsNavigation + TechnicalDocsSearch + DocumentTOC`
- 通用文档页 `DocumentPage` 已支持 Front Matter、TOC、标题锚点、任务列表渲染、链接检测区块
- `/getting-started` 当前不再直接进入本地文档系统，而是重定向到外部站点 `https://docs.newenergycoder.club/start-here`

### 2.3 与原需求的主要偏差

- 原规划中的 `docs/` 目录，实际落地为 `public/docs/`
- 原规划中的通用 `DocumentNavigation / DocumentBreadcrumb / DocumentSidebar` 未按设计独立落地
- 现状中 `DocumentPage` 集中了页面加载、数据读取、Markdown 渲染和增强逻辑，没有按最初规划细拆
- 原需求强调 `/getting-started` 作为本地文档入口，但当前实现已经改为外部跳转
- 搜索能力只覆盖 `technical` 分类，不是全局文档搜索
- 技术文档增强布局组件虽已实现，但当前路由只将其接入 `/docs/technical` 概览页，`/docs/technical/:slug` 实际直接进入 `DocumentPage`

## 3. 现有项目分析

### 3.1 技术栈

- 前端框架：React + TypeScript + Vite
- 路由：React Router DOM
- 样式系统：Tailwind CSS + shadcn/ui
- Markdown 渲染：`react-markdown` + `remark-gfm`
- 缓存：内存缓存 + `sessionStorage`

### 3.2 当前相关实现

- `src/services/DocumentLoader.ts`
  - 加载 `_meta.json`
  - 读取 Markdown 文件
  - 解析 Front Matter
  - 生成 TOC
- `src/services/DocumentCache.ts`
  - 内存缓存
  - 会话缓存
  - TTL 与统计
- `src/components/DocumentPage.tsx`
  - 通用文档详情页
  - 集成 `ReactMarkdown`
  - 集成 `HeaderWithAnchor`
  - 集成 `LinkDetectorComponent`
  - 通过 `resolveDocumentRouteParams()` 补偿技术文档详情页路由参数
- `src/components/TechnicalDocsLayout.tsx`
  - 技术文档三栏布局组件
  - 当前仅用于 `/docs/technical` 概览页
- `src/components/TechnicalDocsNavigation.tsx`
  - 技术文档左侧导航
- `src/components/TechnicalDocsSearch.tsx`
  - 技术文档前端搜索
- `src/components/DocumentTOC.tsx`
  - 右侧目录与滚动高亮

### 3.3 当前相关路由

- `/docs/technical`
- `/docs/technical/:slug`
- `/docs/:category/:subcategory/:slug`
- `/docs/:category/:slug`
- `/docs/:category`
- `/getting-started` -> 外部跳转

## 4. 当前任务边界确认

### 4.1 已经落地的范围

- 建立静态 Markdown 文档目录
- 文档自动加载与渲染
- 文档缓存
- 技术文档导航、搜索与 TOC
- 标题锚点增强
- 文档链接检测区块

### 4.2 当前未完整落地的范围

- 通用分类统一导航体系
- 全局文档搜索
- 规划中的独立 `DocumentRouter`
- 规划中的独立 `DocumentBreadcrumb`
- 规划中的独立 `DocumentSidebar`
- 完整自动化测试体系

### 4.3 明确不在本轮同步范围内

- 重构代码实现
- 修改业务路由策略
- 恢复 `/getting-started` 的本地文档入口
- 新增后端服务

## 5. 技术实现现状

### 5.1 文档目录结构

当前以 `public/docs/` 为根目录，实际包含以下主要分类：

- `getting-started/`
- `tutorials/`
- `resources/`
- `technical/`
- `events/`
- `theme-integration/`

### 5.2 文档加载机制

- `DocumentLoader.loadDocument()` 先尝试 `index.md`
- 若目录型文档不存在，则回退到 `slug.md`
- 当 `index.md` 请求返回 HTML fallback 时，会进一步强制回退到 `slug.md`
- `DocumentLoader.loadMeta()` 按分类读取 `_meta.json`
- Markdown 文件通过浏览器 `fetch('/docs/...')` 读取

### 5.3 页面集成方式

- 通用文档通过 `DocumentPage` 渲染
- 技术文档概览页通过 `TechnicalDocsLayout` 提供增强阅读体验
- 技术文档详情页当前直接通过 `DocumentPage` 渲染，并不复用 `TechnicalDocsLayout`
- `/getting-started` 与本地 Markdown 仓库的耦合关系已经弱化

## 6. 待确认问题

当前以“现状同步”为目标，本轮不再保留规划期疑问；但后续如果要继续演进，需要优先确认以下事项：

1. 是否要把 `/getting-started` 重新接回本地文档系统
2. 是否要将技术文档专用能力推广为全站统一文档框架
3. 是否要将前端串行搜索替换为预构建索引
4. 是否要补齐文档系统自动化测试

## 7. 现状验收基线

### 7.1 已满足

1. 已存在分类清晰的 Markdown 文档仓库
2. 已支持 Markdown 自动渲染
3. 已支持缓存与错误处理
4. 已支持技术文档概览页导航、搜索与预留目录能力
5. 已支持响应式阅读页面

### 7.2 部分满足

1. 学习入口与文档系统存在关联，但 `/getting-started` 已外跳，不再是本地统一入口
2. 搜索已存在，但只覆盖 `technical`
3. 目录能力已在组件层实现，但当前技术文档详情路由未接入该三栏布局

### 7.3 未满足或与原规划不同

1. 未形成全站统一的文档导航系统
2. 未落地原设计中的全部拆分组件
3. 未补齐体系化自动化测试

## 8. 结论

本任务不应再被描述为“待建设的 Markdown 文档系统”，而应视为“已落地但存在结构偏移和局部欠账的文档系统”。后续文档应统一以当前真实实现为准，避免继续沿用早期规划态描述。

---

**文档状态**: 已按现状同步  
**创建时间**: 2024-12-19  
**最后更新**: 2026-08-17  
**负责人**: SOLO Document  
