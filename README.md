# New Energy Coder Club 官方网站

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-cyan.svg)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**新能源编程俱乐部官方网站** - 一个旨在连接、启发和赋能新能源领域开发者和爱好者的现代化、功能丰富的平台。

🌐 **在线访问**: [https://www.newenergycoder.club/](https://www.newenergycoder.club/)
## ✨ 项目简介

新能源编程俱乐部（Energy Coder Club）是一个致力于探索和推进软件技术在新能源领域应用的开发者社区。我们相信，通过代码和创新，可以为可持续发展的未来贡献力量。

本网站作为俱乐部的官方门户，旨在：
- **展示俱乐部形象**：分享我们的使命、愿景和团队成员。
- **发布最新动态**：发布俱乐部活动、技术研讨会和项目更新。
- **提供资源共享**：汇集学习资料、开发工具和行业报告。
- **促进社区互动**：提供一个平台，让成员可以交流思想、协作项目。

## 🚀 快速启动

### 环境要求

- **Node.js**: >= 22.0.0 (推荐使用最新 LTS 版本)
- **包管理器**: npm (内置) 或 pnpm/bun (可选，更快)
- **操作系统**: Windows, macOS, Linux

### 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/your-username/newenergycoder.club.git
cd newenergycoder.club
```

2. **安装依赖**
```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐，更快）
pnpm install

# 或使用 bun（最快）
bun install
```

3. **启动开发服务器**
```bash
npm run dev
# 或 pnpm dev
# 或 bun dev
```

开发服务器将在 `http://localhost:5173` 启动，支持热重载。

4. **构建生产版本**
```bash
npm run build
# 或 pnpm build
# 或 bun run build
```

5. **预览生产构建**
```bash
npm run preview
# 或 pnpm preview
# 或 bun preview
```

6. **代码检查**
```bash
npm run lint
# 或 pnpm lint
# 或 bun lint
```

### 本地测试指南

#### 功能测试清单

- [ ] **页面导航**: 测试所有页面路由是否正常工作
  - 首页 (`/`)
  - 团队页面 (`/team`)
  - 活动页面 (`/events`)
  - 项目页面 (`/projects`)
  - 资源页面 (`/resources`)
  - 加入我们 (`/join`)
  - 联系我们 (`/contact`)
  - 仪表板 (`/dashboard`) - 需要登录

- [ ] **响应式设计**: 在不同屏幕尺寸下测试
  - 桌面端 (≥1200px)
  - 平板端 (768px-1199px)
  - 移动端 (<768px)

- [ ] **主题切换**: 测试明亮/暗黑模式切换

- [ ] **语言切换**: 测试中英文切换功能

- [ ] **交互功能**: 测试按钮、表单、模态框等交互元素

#### 常见问题排查

**端口被占用**
```bash
# 查看端口占用
netstat -ano | findstr :5173  # Windows
lsof -ti:5173 | xargs kill -9  # macOS/Linux
```

**依赖安装失败**
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript 类型错误**
```bash
# 检查 TypeScript 配置
npx tsc --noEmit
```

## 🚀 部署

### Vercel 部署（推荐）

本项目已配置 Vercel 自动部署：

1. **自动部署**: 推送到 `main` 分支即可自动部署到生产环境
2. **预览部署**: Pull Request 会自动创建预览环境
3. **域名配置**: 在 Vercel 控制台配置自定义域名

### 手动部署

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview

# 部署到其他平台
# 将 dist 目录上传到静态托管服务
```

### 环境变量配置

在部署平台配置以下环境变量：

```bash
# Vercel Analytics（可选）
VITE_VERCEL_ANALYTICS_ID=your_analytics_id

# 其他配置
VITE_APP_TITLE=New Energy Coder Club
VITE_APP_DESCRIPTION=新能源编程俱乐部官方网站
```

### 部署检查清单

- [ ] 构建成功无错误
- [ ] 所有页面路由正常
- [ ] 响应式设计在各设备正常显示
- [ ] 主题切换功能正常
- [ ] 语言切换功能正常
- [ ] 图片和静态资源加载正常
- [ ] SEO 元数据配置正确


## 🌟 主要功能

### 核心功能
- **🌍 多语言支持**: 内置国际化（i18n），支持中英文无缝切换
- **🎨 主题切换**: 支持明亮和暗黑模式，自动适应系统设置
- **📱 响应式设计**: 完美适配桌面、平板和移动设备
- **🔐 用户认证**: 完整的登录/注册系统，支持受保护路由
- **📊 数据可视化**: 内置图表和数据展示组件

### 页面功能
- **🏠 首页**: 展示俱乐部概况、特色功能和最新动态
- **👥 团队页面**: 展示核心团队成员和组织架构
- **📅 活动页面**: 发布和管理俱乐部活动、技术研讨会
- **🚀 项目页面**: 展示开源项目和技术成果
- **📚 资源页面**: 提供学习资料、开发工具和行业报告
- **🤝 加入我们**: 多种加入方式，包括飞书群和表单申请
- **📞 联系我们**: 完整的联系信息和地图定位
- **📊 仪表板**: 用户个人中心和数据管理（需登录）

### 技术特性
- **⚡ 高性能**: 基于 Vite 构建，支持热重载和快速构建
- **🧩 组件化**: 基于 `shadcn/ui` 和 `Radix UI`，易于维护和扩展
- **🎯 类型安全**: 完整的 TypeScript 支持
- **📈 分析统计**: 集成 Vercel Analytics 进行访问统计
- **🔍 SEO 优化**: 良好的搜索引擎优化支持

## 🛠️ 技术栈

### 核心技术
- **前端框架**: React 18.2.0 + TypeScript 5.7.2
- **构建工具**: Vite 6.3.5
- **样式框架**: Tailwind CSS 3.4.1
- **UI 组件库**: shadcn/ui + Radix UI
- **路由管理**: React Router DOM 6.22.1
- **状态管理**: Zustand 5.0.6

### 开发工具
- **代码检查**: ESLint 9.22.0 + TypeScript ESLint
- **样式处理**: PostCSS + Autoprefixer
- **图标库**: Lucide React 0.503.0
- **工具函数**: clsx + tailwind-merge + class-variance-authority

### 部署与分析
- **部署平台**: Vercel
- **CDN 加速**: Cloudflare
- **访问统计**: Vercel Analytics 1.5.0
- **构建优化**: Terser 5.43.1

### 开发体验
- **热重载**: Vite HMR
- **类型检查**: TypeScript 严格模式
- **代码格式化**: ESLint + React Hooks 插件
- **国际化**: 自定义 i18n 解决方案

## 📁 项目结构

```
newenergycoder.club/
├── public/                 # 静态资源
│   ├── icons/             # 图标文件
│   └── images/            # 图片资源
├── src/
│   ├── components/        # 可复用组件
│   │   ├── auth/         # 用户认证组件
│   │   │   ├── LoginModal.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── forms/        # 表单组件
│   │   │   └── FeishuForm.tsx
│   │   ├── home/         # 首页专用组件
│   │   │   ├── AboutSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── TeamSection.tsx
│   │   ├── layout/       # 布局组件
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── PageLayout.tsx
│   │   └── ui/           # 基础 UI 组件
│   │       ├── LanguageSwitcher.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (更多 shadcn/ui 组件)
│   ├── contexts/          # React Context
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具库和配置
│   │   ├── i18n/         # 国际化配置
│   │   └── utils.ts      # 工具函数
│   ├── pages/             # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── JoinPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── FeishuJoinFormPage.tsx
│   │   ├── DisplayRatioPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── store/             # Zustand 状态管理
│   ├── App.tsx            # 应用主组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── .eslintrc.js           # ESLint 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
├── vercel.json            # Vercel 部署配置
└── package.json           # 项目依赖和脚本
```

## 👨‍💻 开发指南

### 代码规范

- **命名约定**: 使用 PascalCase 命名组件，camelCase 命名变量和函数
- **文件组织**: 每个组件一个文件，相关组件放在同一目录下
- **类型定义**: 优先使用 TypeScript 接口定义数据结构
- **样式规范**: 使用 Tailwind CSS 类名，避免内联样式

### 组件开发

```tsx
// 组件模板示例
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('default-styles', className)}>
      {children}
    </div>
  );
};
```

### 状态管理

使用 Zustand 进行状态管理：

```tsx
import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'zh' | 'en') => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  language: 'zh',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
```

### 国际化

添加新的翻译文本：

```tsx
// lib/i18n/zh.ts
export const zh = {
  common: {
    welcome: '欢迎',
    // ...
  },
  // ...
};

// lib/i18n/en.ts
export const en = {
  common: {
    welcome: 'Welcome',
    // ...
  },
  // ...
};
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！无论是报告错误、提交功能请求，还是直接贡献代码。

### 贡献流程

1. **Fork 本仓库**
2. **创建您的分支** (`git checkout -b feature/AmazingFeature`)
3. **提交您的更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 代码审查

- 确保代码通过 ESLint 检查
- 确保 TypeScript 类型检查通过
- 添加必要的注释和文档
- 测试新功能的各种场景

## ⚡ 性能优化

### 构建优化

- **代码分割**: 使用 React.lazy() 和 Suspense 进行路由级别的代码分割
- **Tree Shaking**: Vite 自动移除未使用的代码
- **资源压缩**: 生产构建自动压缩 JS、CSS 和图片
- **缓存策略**: 静态资源使用长期缓存

### 运行时优化

```tsx
// 使用 React.memo 优化组件渲染
export const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  // 处理点击事件
}, [dependency]);
```

### 图片优化

- 使用 WebP 格式图片
- 实现图片懒加载
- 提供多种尺寸的响应式图片

## ❓ 常见问题

### Q: 如何添加新的页面？

A: 
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `App.tsx` 中添加路由配置
3. 在导航组件中添加链接

### Q: 如何自定义主题？

A: 
1. 修改 `tailwind.config.js` 中的颜色配置
2. 更新 CSS 变量定义
3. 确保深色模式适配

### Q: 如何添加新的语言支持？

A: 
1. 在 `lib/i18n/` 目录下添加新的语言文件
2. 更新语言切换组件
3. 添加相应的翻译内容

### Q: 构建时出现内存不足错误？

A: 
```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 ./node_modules/.bin/vite build
```

### Q: 如何启用 PWA 功能？

A: 
1. 安装 `vite-plugin-pwa`
2. 配置 `vite.config.ts`
3. 添加 Service Worker 和 Manifest 文件

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

- **Gitee 仓库**: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)
- **项目负责人**: [DarrenPig](https://gitee.com/darrenpig)

---

*由 New Energy Coder Club 驱动*
