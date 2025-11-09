---
title: 开发指南
description: 新能源编程俱乐部开发规范和最佳实践
author: 新能源编程俱乐部
tags: ["开发规范", "最佳实践", "代码风格"]
difficulty: intermediate
lastModified: 2024-12-19
---

# 开发指南

## 概述

本文档为新能源编程俱乐部平台的开发规范和最佳实践指南，旨在确保代码质量、提高开发效率、促进团队协作。

## 开发环境搭建

### 系统要求
- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0
- Git >= 2.30.0
- VS Code（推荐）

### 环境配置

#### 1. 克隆项目
```bash
git clone https://github.com/Darrenpig/new_energy_coder_club.git
cd club-platform
```

#### 2. 安装依赖
```bash
npm install
# 或
yarn install
```

#### 3. 环境变量配置
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
vim .env.local
```

#### 4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

### VS Code 配置

#### 推荐插件
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one"
  ]
}
```

#### 工作区设置
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   ├── forms/          # 表单组件
│   └── common/         # 通用组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hooks
├── lib/                # 工具库
│   ├── utils/          # 工具函数
│   ├── api/            # API客户端
│   ├── auth/           # 认证相关
│   └── constants/      # 常量定义
├── types/              # TypeScript类型定义
├── styles/             # 样式文件
├── assets/             # 静态资源
└── data/               # 静态数据
```

## 代码规范

### TypeScript 规范

#### 1. 类型定义
```typescript
// ✅ 好的实践
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// ✅ 使用联合类型
type UserRole = 'admin' | 'user' | 'moderator';

// ✅ 泛型使用
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// ❌ 避免使用 any
const userData: any = fetchUser(); // 不推荐

// ✅ 使用具体类型
const userData: User = fetchUser();
```

#### 2. 函数定义
```typescript
// ✅ 函数类型注解
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ 异步函数
const fetchUserData = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// ✅ 可选参数
const createUser = (name: string, email: string, avatar?: string): User => {
  return {
    id: generateId(),
    name,
    email,
    avatar,
    createdAt: new Date()
  };
};
```

### React 组件规范

#### 1. 函数组件
```typescript
// ✅ 推荐的组件结构
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  className 
}) => {
  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [user, onEdit]);

  return (
    <div className={cn('user-card', className)}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <button onClick={handleEdit}>编辑</button>
      )}
    </div>
  );
};
```

#### 2. 自定义 Hooks
```typescript
// ✅ 自定义Hook示例
export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await api.users.getById(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取用户失败');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
```

### CSS/Tailwind 规范

#### 1. 类名组织
```typescript
// ✅ 使用 cn 工具函数
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'md', 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        // 基础样式
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // 变体样式
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
        },
        // 尺寸样式
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};
```

#### 2. 响应式设计
```typescript
// ✅ 移动优先的响应式设计
const ResponsiveGrid = () => {
  return (
    <div className="
      grid 
      grid-cols-1 
      gap-4 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5
    ">
      {/* 网格内容 */}
    </div>
  );
};
```

## 最佳实践

### 1. 性能优化

#### 组件优化
```typescript
// ✅ 使用 React.memo 优化重渲染
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  return <div>{/* 渲染内容 */}</div>;
});

// ✅ 使用 useCallback 优化函数引用
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <ChildComponent onIncrement={handleIncrement} />;
};
```

#### 代码分割
```typescript
// ✅ 路由级别的代码分割
const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
const LazyProfile = lazy(() => import('@/pages/Profile'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<LazyDashboard />} />
          <Route path="/profile" element={<LazyProfile />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

### 2. 错误处理

#### 错误边界
```typescript
// ✅ 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 发送错误报告到监控服务
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>出现了一些问题</h2>
          <p>请刷新页面重试</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### API 错误处理
```typescript
// ✅ 统一的错误处理
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 处理认证失败
      auth.logout();
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      // 处理服务器错误
      toast.error('服务器错误，请稍后重试');
    }
    return Promise.reject(error);
  }
);
```

### 3. 状态管理

#### Zustand 状态管理
```typescript
// ✅ Zustand store 定义
interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const user = await api.auth.login(credentials);
      set({ user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '登录失败', 
        loading: false 
      });
    }
  },
  
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },
  
  updateProfile: async (data) => {
    const { user } = get();
    if (!user) return;
    
    try {
      const updatedUser = await api.users.update(user.id, data);
      set({ user: updatedUser });
    } catch (error) {
      set({ error: '更新失败' });
    }
  },
}));
```

### 4. 测试策略

#### 单元测试
```typescript
// ✅ 组件测试示例
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('编辑'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

#### Hook 测试
```typescript
// ✅ 自定义Hook测试
import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from './useUser';

jest.mock('@/lib/api');

describe('useUser', () => {
  it('fetches user data successfully', async () => {
    const mockUser = { id: '1', name: 'John' };
    (api.users.getById as jest.Mock).mockResolvedValue(mockUser);
    
    const { result } = renderHook(() => useUser('1'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toEqual(mockUser);
    });
  });
});
```

## Git 工作流

### 分支策略

```
main                 # 生产分支
├── develop         # 开发分支
│   ├── feature/    # 功能分支
│   ├── bugfix/     # 修复分支
│   └── hotfix/     # 热修复分支
└── release/        # 发布分支
```

### 提交规范

#### Commit Message 格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 类型说明
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例
```bash
# 功能提交
git commit -m "feat(auth): add social login support"

# 修复提交
git commit -m "fix(ui): resolve button alignment issue on mobile"

# 文档提交
git commit -m "docs(api): update authentication endpoints"
```

### 代码审查

#### Pull Request 模板
```markdown
## 变更描述
简要描述本次变更的内容和目的。

## 变更类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化

## 测试
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成

## 检查清单
- [ ] 代码符合项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 无破坏性变更

## 截图（如适用）

## 相关Issue
Closes #123
```

## 部署和发布

### 环境配置

#### 开发环境
```bash
# .env.development
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

#### 生产环境
```bash
# .env.production
REACT_APP_API_URL=https://api.newenergycoder.club/v1
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### 构建和部署

#### 本地构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

#### CI/CD 流程
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 性能监控

### 性能指标

```typescript
// ✅ 性能监控
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // 发送到分析服务
  console.log(metric);
};

// 监控核心性能指标
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 错误监控

```typescript
// ✅ 错误监控
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 发送错误报告
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // 发送错误报告
});
```

## 安全最佳实践

### 1. 输入验证
```typescript
// ✅ 使用 Zod 进行输入验证
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150),
});

const validateUser = (data: unknown) => {
  try {
    return userSchema.parse(data);
  } catch (error) {
    throw new Error('Invalid user data');
  }
};
```

### 2. XSS 防护
```typescript
// ✅ 安全的HTML渲染
import DOMPurify from 'dompurify';

const SafeHTML: React.FC<{ html: string }> = ({ html }) => {
  const cleanHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};
```

### 3. 敏感信息处理
```typescript
// ✅ 环境变量管理
const config = {
  apiUrl: process.env.REACT_APP_API_URL!,
  // ❌ 不要在前端暴露敏感信息
  // apiKey: process.env.REACT_APP_API_KEY, // 错误做法
};

// ✅ 在后端处理敏感操作
const authenticatedRequest = async (endpoint: string) => {
  // API密钥在后端处理
  return fetch(`/api/proxy${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
};
```

## 文档维护

### 代码注释
```typescript
// ✅ 良好的注释实践
/**
 * 计算用户学习进度百分比
 * @param completedLessons 已完成课程数
 * @param totalLessons 总课程数
 * @returns 进度百分比 (0-100)
 */
const calculateProgress = (completedLessons: number, totalLessons: number): number => {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
};

/**
 * 用户学习进度组件
 * 
 * 显示用户在特定技术路线中的学习进度，包括：
 * - 进度条可视化
 * - 完成课程数量
 * - 预计完成时间
 * 
 * @example
 * ```tsx
 * <LearningProgress 
 *   userId="123" 
 *   routeId="embedded-basics" 
 *   showEstimatedTime={true}
 * />
 * ```
 */
const LearningProgress: React.FC<LearningProgressProps> = ({ ... }) => {
  // 组件实现
};
```

### README 维护
```markdown
# 项目名称

简要描述项目的目的和功能。

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装和运行
\`\`\`bash
npm install
npm run dev
\`\`\`

## 项目结构

## 开发指南

## 部署说明

## 贡献指南

## 许可证
```

---

*本开发指南将随着项目发展持续更新，请定期查看最新版本。*