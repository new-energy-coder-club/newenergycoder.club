# New Energy Coder Club Web3

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-cyan.svg)](https://tailwindcss.com/)

**新能源编程俱乐部官方网站** - 一个旨在连接、启发和赋能新能源领域开发者和爱好者的现代化、功能丰富的平台。

## ✨ 项目简介

新能源编程俱乐部（Energy Coder Club）是一个致力于探索和推进软件技术在新能源领域应用的开发者社区。我们相信，通过代码和创新，可以为可持续发展的未来贡献力量。

本网站作为俱乐部的官方门户，旨在：
- **展示俱乐部形象**：分享我们的使命、愿景和团队成员。
- **发布最新动态**：发布俱乐部活动、技术研讨会和项目更新。
- **提供资源共享**：汇集学习资料、开发工具和行业报告。
- **促进社区互动**：提供一个平台，让成员可以交流思想、协作项目。

## 🚀 快速启动

### 手动启动

1. **安装 Node.js**（必需）
   - 访问 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本

2. **安装依赖：**
```bash
# 使用 npm
npm install

# 或使用 bun（更快）
bun install
```

3. **启动开发服务器：**
```bash
npm run dev
# 或 bun dev
```

4. **构建生产版本：**
```bash
npm run build
# 或 bun run build
```

## 部署

本网站使用 Vercel 进行托管，并通过 Cloudflare CDN 加速。

### 部署流程

1.  **连接 GitHub 仓库到 Vercel**
    -   在 [Vercel Dashboard](https://vercel.com/dashboard) 中导入此 GitHub 仓库
    -   Vercel 会自动检测到这是一个 Vite 项目

2.  **自动构建和部署**
    -   每次向 `main` 分支推送代码时，Vercel 会自动触发部署
    -   构建配置已在 `vercel.json` 中预设
    -   支持预览部署（Pull Request 会生成预览链接）

3.  **自定义域名**
    -   在 Vercel 项目设置中添加自定义域名 `newenergycoder.club`
    -   配置 DNS 记录指向 Vercel

4.  **访问网站**
    -   Vercel 部署链接：`https://your-project.vercel.app`
    -   自定义域名：`https://newenergycoder.club`


## 🌟 主要功能

- **多语言支持**：内置国际化（i18n），支持中英文切换。
- **主题切换**：支持明亮和暗黑模式，并能自动适应系统设置。
- **响应式设计**：在桌面、平板和移动设备上均有良好体验。
- **丰富的页面**：包括首页、关于我们、团队、活动、项目、资源和加入我们等。
- **动态内容**：活动和项目可由后台动态更新。
- **组件化开发**：基于 `shadcn/ui` 和 `Radix UI` 构建，易于维护和扩展。

## 🛠️ 技术栈

- **前端框架：** React 18.2.0 + TypeScript 5.7.2
- **构建工具：** Vite 6.3.1
- **样式框架：** Tailwind CSS 3.4.1
- **UI 组件：** shadcn/ui + Radix UI
- **路由：** React Router 7.5.1
- **状态管理：** Zustand
- **图标：** Lucide React
- **国际化：** 自定义 i18n 解决方案

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── auth/           # 认证相关
│   ├── forms/          # 表单组件
│   ├── home/           # 首页组件
│   ├── layout/         # 布局组件
│   └── ui/             # UI 基础组件
├── contexts/           # React Context
├── hooks/              # 自定义 Hooks
├── lib/                # 工具库和配置
├── pages/              # 页面组件
├── services/           # API 服务
└── store/              # 状态管理
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！无论是报告错误、提交功能请求，还是直接贡献代码。

1. **Fork 本仓库**
2. **创建您的分支** (`git checkout -b feature/AmazingFeature`)
3. **提交您的更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

- **Gitee 仓库**: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)
- **项目负责人**: [DarrenPig](https://gitee.com/darrenpig)

---

*由 New Energy Coder Club 驱动*
