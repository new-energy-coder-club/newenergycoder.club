# 预览环境配置指南

本指南将帮助您配置运行 Energy Coder Club Website 所需的开发环境和工具链。

## 🛠️ 必需工具

### 1. Node.js 和 npm

**推荐版本：** Node.js 18.x 或更高版本

#### Windows 安装方法：

**方法一：官方安装包（推荐）**
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本（长期支持版本）
3. 运行安装程序，按默认设置安装
4. 安装完成后重启命令行工具

**方法二：使用 Chocolatey**
```powershell
# 首先安装 Chocolatey（如果未安装）
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 Node.js
choco install nodejs
```

**方法三：使用 winget**
```powershell
winget install OpenJS.NodeJS
```

#### 验证安装
```bash
node --version
npm --version
```

### 2. Git（如果尚未安装）

```powershell
# 使用 winget
winget install Git.Git

# 或使用 Chocolatey
choco install git
```

## 📦 项目依赖安装

### 1. 克隆项目（如果尚未克隆）
```bash
git clone https://github.com/Darrenpig/Energy-Coder-Club-Website.git
cd Energy-Coder-Club-Website
```

### 2. 安装项目依赖
```bash
npm install
```

### 3. 验证依赖安装
```bash
npm list --depth=0
```

## 🚀 启动开发服务器

### 开发模式
```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动

### 构建项目
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🔧 项目技术栈

- **前端框架：** React 18
- **构建工具：** Vite 6
- **语言：** TypeScript
- **样式：** Tailwind CSS
- **UI 组件：** Radix UI
- **路由：** React Router
- **状态管理：** Zustand
- **图标：** Lucide React

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── auth/           # 认证相关组件
│   ├── forms/          # 表单组件
│   ├── home/           # 首页组件
│   ├── layout/         # 布局组件
│   └── ui/             # UI 基础组件
├── contexts/           # React Context
├── hooks/              # 自定义 Hooks
├── lib/                # 工具库
│   ├── i18n/          # 国际化配置
│   └── utils.ts       # 工具函数
├── pages/              # 页面组件
├── services/           # API 服务
└── store/              # 状态管理
```

## 🌐 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览构建结果
- `npm run lint` - 运行 ESLint 检查

## 🐛 常见问题

### 1. Node.js 未找到
**错误：** `node : 无法将"node"项识别为 cmdlet`

**解决方案：**
- 确保已正确安装 Node.js
- 重启命令行工具
- 检查环境变量 PATH 是否包含 Node.js 路径

### 2. 依赖安装失败
**解决方案：**
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 3. 端口被占用
**错误：** `Port 5173 is already in use`

**解决方案：**
```bash
# 使用不同端口
npm run dev -- --port 3000
```

## 📞 获取帮助

如果遇到问题，请：
1. 检查本指南的常见问题部分
2. 查看项目的 GitHub Issues
3. 联系项目维护者

---

**注意：** 确保您的系统满足最低要求，并且网络连接正常以下载依赖包。