# 技术文档详情页接入三栏布局设计文档

- 日期: 2026-08-17
- 主题: 技术文档详情页接入 `TechnicalDocsLayout`
- 适用仓库: `d:\Project_env\newenergycoder.club`

## 1. 背景

当前技术文档模块存在明显的体验断层：

- `/docs/technical` 走 `TechnicalDocsLayout`，拥有搜索、左侧导航和概览页。
- `/docs/technical/:slug` 却直接走 `DocumentPage`，不复用左侧导航、搜索栏和右侧 TOC。

这导致技术文档中心在“概览页”和“详情页”之间不是同一套信息架构。用户从技术文档导航进入详情页后，反而失去上下文导航能力；而代码层面，`TechnicalDocsLayout` 内部其实已经具备详情页分支和 TOC 预取逻辑，只是当前路由没有接线。

本次工作的目标是把技术文档详情页真正收口到三栏布局中，同时避免把 `DocumentPage` 直接嵌入布局后产生双层页面壳、重复头部和宽度冲突。

## 2. 目标

本次改动的目标如下：

- 让 `/docs/technical/:slug` 真正接入 `TechnicalDocsLayout`。
- 保留 `DocumentPage` 作为文档正文的核心承载组件。
- 为 `DocumentPage` 增加“独立页模式 / 嵌入模式”边界，避免在三栏布局中重复渲染整页壳层。
- 保持现有文档加载、缓存、Markdown 渲染、标题锚点和链接检测能力不回退。
- 同步更新相关设计与现状文档，使口径与新实现一致。

## 3. 非目标

以下内容不在本次范围内：

- 不把所有文档分类统一迁移到 `TechnicalDocsLayout`。
- 不重写 `DocumentLoader`、`DocumentCache` 或全文搜索实现。
- 不把 `LinkDetectorComponent` 改造成正文内统一链接渲染器。
- 不在本次顺带修复 `DocumentTOC` 的动态缩进类名问题。
- 不引入新的全局文档框架抽象层。

## 4. 方案对比

### 4.1 方案 A：保持现状

- 优点：零改动、无回归风险。
- 缺点：技术文档体验继续断层，已有导航与 TOC 能力无法在详情页发挥价值。

### 4.2 方案 B：只改路由

- 做法：把 `/docs/technical/:slug` 直接改到 `TechnicalDocsLayout`。
- 优点：改动最小，可以快速看到左导航和 TOC。
- 缺点：`DocumentPage` 目前是完整页面组件，直接嵌入三栏布局后大概率出现重复头部、双层容器和视觉层级冲突。

### 4.3 方案 C：路由接线 + `DocumentPage` 嵌入模式

- 做法：让 `/docs/technical/:slug` 进入 `TechnicalDocsLayout`，同时给 `DocumentPage` 增加 `standalone` / `embedded` 模式。
- 优点：体验统一、组件职责清晰、后续可复用到其他文档分类。
- 缺点：需要一次小型结构收口与最小测试补充。

推荐采用方案 C。

## 5. 设计方案

### 5.1 路由设计

当前路由：

- `/docs/technical` -> `PageLayout > TechnicalDocsLayout`
- `/docs/technical/:slug` -> `PageLayout > DocumentPage`

调整后：

- `/docs/technical` -> `PageLayout > TechnicalDocsLayout`
- `/docs/technical/:slug` -> `PageLayout > TechnicalDocsLayout`

说明：

- 技术文档概览页与详情页共享同一个外层壳。
- `TechnicalDocsLayout` 内部根据 `slug` 是否存在，决定渲染概览页还是正文区。

### 5.2 `DocumentPage` 模式设计

为 `DocumentPage` 增加一个可选模式参数，推荐命名为：

- `variant?: 'standalone' | 'embedded'`

默认值为 `standalone`，保证现有普通文档页不受影响。

两种模式的边界如下：

- `standalone`
  - 保留顶部返回栏
  - 保留文档面包屑
  - 保留整页 `min-h-screen`
  - 保留内层 `max-w-4xl` 容器
- `embedded`
  - 不渲染顶部返回栏
  - 不渲染重复面包屑
  - 不使用整页 `min-h-screen`
  - 不再创建与 `TechnicalDocsLayout` 冲突的外层宽度壳
  - 仅渲染文档头信息、正文内容和链接检测区块

### 5.3 `TechnicalDocsLayout` 接入方式

`TechnicalDocsLayout` 保持当前组件职责不变：

- 左栏：`TechnicalDocsNavigation`
- 顶部：`TechnicalDocsSearch`
- 中栏：概览页或文档正文
- 右栏：`DocumentTOC`

当存在 `slug` 时：

- 使用 `DocumentLoader.loadDocument('technical', slug)` 预取 TOC
- 中栏渲染 `DocumentPage` 的 `embedded` 模式
- 右栏按现有逻辑显示 TOC

### 5.4 数据与行为约束

以下行为在改动后必须保持不变：

- `DocumentPage` 仍然通过 `resolveDocumentRouteParams()` 兼容技术文档详情页路由参数。
- `DocumentLoader` 仍然保留 `index.md -> slug.md` 的回退逻辑，以及 HTML fallback 情况下的二次回退。
- `DocumentCache` 的命中与写入逻辑不改变。
- `LinkDetectorComponent` 仍保留在正文末尾，并维持自动校验。

## 6. 测试策略

本次遵循测试优先，至少覆盖以下最小验证：

### 6.1 先写失败测试

- 路由级测试：
  - 访问 `/docs/technical/:slug` 时，应渲染 `TechnicalDocsLayout` 外层结构，而不是独立整页 `DocumentPage` 壳。
- 组件级测试：
  - `DocumentPage` 在 `embedded` 模式下不显示顶部返回栏和重复面包屑。
  - `DocumentPage` 在 `standalone` 模式下保持现有行为。

### 6.2 回归验证

- 技术文档概览页仍可正常显示。
- 技术文档详情页仍可正常加载正文。
- `DocumentTOC` 仍可接收 TOC 并渲染。
- 普通文档路由不受影响。

## 7. 风险与对策

### 7.1 双层布局残留

风险：`embedded` 模式裁剪不完整，仍出现重复头部或宽度冲突。

对策：

- 只把页面级壳层放在 `standalone` 模式。
- 正文区公共内容尽量在两种模式之间复用。

### 7.2 技术详情页 TOC 不同步

风险：切到三栏布局后，TOC 高亮或内容与正文不一致。

对策：

- 保持 `TechnicalDocsLayout` 当前的 TOC 预取逻辑。
- 在回归测试和手动验证中重点检查技术文档详情页滚动行为。

### 7.3 普通文档页被意外影响

风险：给 `DocumentPage` 增加模式后，普通文档路由样式回退。

对策：

- 默认值保持 `standalone`。
- 为 `standalone` 补一条聚焦测试，防止行为无意变化。

## 8. 文档同步范围

本次实现完成后，需要同步更新：

- `.trae/documents/DESIGN_markdown_docs_repository.md`
- `.trae/documents/ALIGNMENT_markdown_docs_repository.md`
- `.trae/documents/CONSENSUS_markdown_docs_repository.md`
- `.trae/documents/TASK_markdown_docs_repository.md`
- `.trae/documents/ACCEPTANCE_markdown_docs_repository.md`

同步原则：

- 不再描述“技术详情页当前未接入三栏布局”。
- 改为准确描述“技术详情页已接入 `TechnicalDocsLayout`，`DocumentPage` 以嵌入模式承载正文”。

## 9. 验收标准

本次改动完成后，需满足以下标准：

- `/docs/technical` 保持当前概览页体验。
- `/docs/technical/:slug` 展示左导航、顶部搜索和右侧 TOC。
- 技术详情页正文不再出现重复整页壳层。
- 普通文档详情页保持原有独立页体验。
- 文档系统相关现状文档与代码实现一致。

## 10. 实施顺序

建议按以下顺序执行：

1. 先补测试，确认当前行为与目标行为差异。
2. 给 `DocumentPage` 增加 `variant` 模式。
3. 将技术详情路由切到 `TechnicalDocsLayout`。
4. 跑聚焦测试与必要构建验证。
5. 更新现状文档口径。
