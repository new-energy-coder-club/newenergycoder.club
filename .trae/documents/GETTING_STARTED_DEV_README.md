# Getting Started - 快速开发指南

## 📋 项目概述

新能源编程俱乐部官网是一个基于 React + TypeScript + Vite 构建的现代化 Web 应用，专注于为新能源领域的编程学习者提供优质的学习资源和交流平台。

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0
- **Git**: 最新版本

### 本地开发设置

```bash
# 1. 克隆项目
git clone <repository-url>
cd newenergycoder.club

# 2. 安装依赖
npm install
# 或者使用 yarn
yarn install

# 3. 启动开发服务器
npm run dev
# 或者使用 yarn
yarn dev

# 4. 打开浏览器访问
# http://localhost:5173
```

## 🏗️ 项目架构

### 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS + shadcn/ui
- **路由管理**: React Router DOM
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **状态管理**: React Hooks (useState, useEffect)
- **代码规范**: ESLint + Prettier

### 目录结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # shadcn/ui 基础组件
│   ├── layout/         # 布局组件
│   └── auth/           # 认证相关组件
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── GettingStartedPage.tsx  # 入门指南页
│   ├── EmbeddedDetailPage.tsx  # 嵌入式详情页
│   └── ...
├── contexts/           # React Context
├── hooks/              # 自定义 Hooks
├── lib/                # 工具函数
├── types/              # TypeScript 类型定义
└── styles/             # 全局样式
```

## 🎯 核心功能模块

### 1. Getting Started 页面 (`/getting-started`)

**功能特性**:
- 技术方向展示（嵌入式开发、GUI界面开发、算法与数据结构）
- 快速上手指南
- 学习统计数据展示
- 响应式设计

**关键组件**:
- `TechDirectionCard`: 技术方向卡片
- `QuickGuideCard`: 快速指南卡片
- `StatsCard`: 统计数据卡片

### 2. 学习路径详情页面

- `/learning/embedded` - 嵌入式开发详情
- `/learning/designer` - GUI界面开发详情
- `/learning/mechanical` - 机械设计详情

### 3. 通用组件系统

基于 shadcn/ui 构建的组件库：
- `Button`, `Card`, `Badge` - 基础UI组件
- `PageLayout` - 页面布局组件
- `ProtectedRoute` - 路由保护组件

## 🛠️ 开发指南

### 添加新页面

1. **创建页面组件**
```tsx
// src/pages/NewPage.tsx
import { PageLayout } from '@/components/layout/PageLayout'

export default function NewPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">新页面</h1>
        {/* 页面内容 */}
      </div>
    </PageLayout>
  )
}
```

2. **添加路由配置**
```tsx
// src/App.tsx
import NewPage from '@/pages/NewPage'

// 在 Routes 中添加
<Route path="/new-page" element={<NewPage />} />
```

### 样式开发规范

1. **使用 Tailwind CSS 类名**
```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">标题</h2>
</div>
```

2. **响应式设计**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 内容 */}
</div>
```

3. **主题色彩使用**
```tsx
// 主色调：蓝色系
<Button className="bg-blue-600 hover:bg-blue-700">
// 辅助色：绿色系（成功）、红色系（警告）
<Badge className="bg-green-100 text-green-800">
```

### 组件开发最佳实践

1. **TypeScript 类型定义**
```tsx
interface ComponentProps {
  title: string
  description?: string
  onClick?: () => void
}

export function Component({ title, description, onClick }: ComponentProps) {
  // 组件实现
}
```

2. **使用 Framer Motion 动画**
```tsx
import { motion } from 'framer-motion'

<motion.div
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ duration: 0.2 }}
>
  {/* 内容 */}
</motion.div>
```

3. **状态管理**
```tsx
const [isLoading, setIsLoading] = useState(false)
const [data, setData] = useState<DataType[]>([])

useEffect(() => {
  // 数据获取逻辑
}, [])
```

## 🔧 开发工具配置

### VS Code 推荐插件

- **ES7+ React/Redux/React-Native snippets** - React 代码片段
- **Tailwind CSS IntelliSense** - Tailwind 智能提示
- **TypeScript Importer** - 自动导入
- **Prettier - Code formatter** - 代码格式化
- **ESLint** - 代码检查

### 代码格式化配置

项目已配置 Prettier 和 ESLint，保存时自动格式化：

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🚀 构建和部署

### 本地构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 部署到 Vercel

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量（如需要）
3. 自动部署：推送到 main 分支触发部署

## 📝 常见问题

### Q: 如何添加新的技术方向？

A: 在 `GettingStartedPage.tsx` 中的 `techDirections` 数组添加新项：

```tsx
{
  id: 'new-tech',
  title: '新技术方向',
  description: '描述信息',
  icon: IconComponent,
  color: 'blue',
  gradient: 'from-blue-500 to-cyan-500',
  skills: ['技能1', '技能2'],
  difficulty: 'beginner',
  duration: '3-4个月',
  projects: 8,
  link: '/learning/new-tech'
}
```

### Q: 如何修改主题色彩？

A: 编辑 `tailwind.config.js` 中的颜色配置：

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    }
  }
}
```

### Q: 组件样式不生效？

A: 检查以下几点：
1. 确保导入了正确的 CSS 文件
2. 检查 Tailwind 类名是否正确
3. 确认组件层级和 CSS 优先级
4. 重启开发服务器

## 🤝 贡献指南

1. **Fork 项目**
2. **创建功能分支**: `git checkout -b feature/new-feature`
3. **提交更改**: `git commit -m 'Add new feature'`
4. **推送分支**: `git push origin feature/new-feature`
5. **创建 Pull Request**

### 代码提交规范

使用 Conventional Commits 格式：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

## 📞 获取帮助

- **项目文档**: 查看 `/docs` 目录
- **Issue 反馈**: GitHub Issues
- **技术交流**: 加入俱乐部技术群

---

**Happy Coding! 🎉**

> 这个项目是新能源编程俱乐部的开源项目，欢迎所有对新能源技术和编程感兴趣的朋友参与贡献！