// 学习路径和技术路线相关的TypeScript类型定义

/**
 * 技术方向枚举
 * 定义俱乐部支持的主要技术学习方向
 */
export enum TechDirection {
  EMBEDDED = 'embedded',        // 嵌入式系统
  MECHANICAL = 'mechanical',    // 机械算法
  DESIGN = 'design'            // 设计师
}

/**
 * 学习阶段枚举
 * 定义学习路径中的不同阶段
 */
export enum LearningStage {
  BEGINNER = 'beginner',       // 初学者
  INTERMEDIATE = 'intermediate', // 中级
  ADVANCED = 'advanced',       // 高级
  EXPERT = 'expert'           // 专家
}

/**
 * 资源类型枚举
 * 定义不同类型的学习资源
 */
export enum ResourceType {
  DOCUMENTATION = 'documentation', // 文档教程
  VIDEO = 'video',                // 视频教程
  PRACTICE = 'practice',          // 实践项目
  TOOL = 'tool',                 // 开发工具
  BOOK = 'book',                 // 书籍资源
  COURSE = 'course',             // 在线课程
  COMMUNITY = 'community'        // 社区资源
}

/**
 * 难度等级枚举
 */
export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

/**
 * 步骤状态枚举
 */
export enum StepStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

/**
 * 学习资源接口
 * 定义单个学习资源的结构
 */
export interface LearningResource {
  /** 资源唯一标识 */
  id: string;
  /** 资源标题 */
  title: string;
  /** 资源描述 */
  description: string;
  /** 资源类型 */
  type: ResourceType;
  /** 资源链接 */
  url: string;
  /** 难度等级 */
  difficulty: DifficultyLevel;
  /** 预估学习时间（小时） */
  estimatedHours: number;
  /** 是否免费 */
  isFree: boolean;
  /** 语言 */
  language: 'zh' | 'en' | 'both';
  /** 标签 */
  tags: string[];
  /** 前置要求 */
  prerequisites?: string[];
  /** 相关技术栈 */
  techStack: string[];
  /** 最后更新时间 */
  lastUpdated: string;
}

/**
 * 学习步骤接口
 * 定义学习路径中的单个步骤
 */
export interface LearningStep {
  /** 步骤唯一标识 */
  id: string;
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description: string;
  /** 学习阶段 */
  stage: LearningStage;
  /** 步骤顺序 */
  order: number;
  /** 预估完成时间（天） */
  estimatedDays: number;
  /** 学习目标 */
  objectives: string[];
  /** 相关资源 */
  resources: LearningResource[];
  /** 实践项目 */
  practiceProjects?: string[];
  /** 技能检查点 */
  checkpoints: string[];
  /** 前置步骤ID */
  prerequisites?: string[];
  /** 可选步骤 */
  isOptional: boolean;
}

/**
 * 技术路线接口
 * 定义完整的技术学习路线
 */
export interface TechRoute {
  /** 路线唯一标识 */
  id: string;
  /** 技术方向 */
  direction: TechDirection;
  /** 路线标题 */
  title: string;
  /** 路线描述 */
  description: string;
  /** 详细介绍 */
  detailedDescription: string;
  /** 路线图标 */
  icon: string;
  /** 主题色彩 */
  color: string;
  /** 总预估时间（月） */
  totalEstimatedMonths: number;
  /** 学习步骤 */
  steps: LearningStep[];
  /** 核心技术栈 */
  coreTechnologies: string[];
  /** 就业方向 */
  careerPaths: string[];
  /** 薪资范围 */
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  /** 市场需求度 (1-5) */
  marketDemand: number;
  /** 学习难度 (1-5) */
  learningDifficulty: number;
  /** 推荐人群 */
  targetAudience: string[];
  /** 成功案例 */
  successStories?: string[];
  /** 最后更新时间 */
  lastUpdated: string;
}

/**
 * 快速上手指南接口
 */
export interface QuickStartGuide {
  /** 指南唯一标识 */
  id: string;
  /** 技术方向 */
  direction: TechDirection;
  /** 指南标题 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 快速步骤 */
  quickSteps: {
    /** 步骤标题 */
    title: string;
    /** 步骤描述 */
    description: string;
    /** 预估时间（分钟） */
    estimatedMinutes: number;
    /** 相关链接 */
    links?: Array<{
      title: string;
      url: string;
    }>;
  }[];
  /** 环境要求 */
  requirements: {
    /** 操作系统 */
    os: string[];
    /** 软件要求 */
    software: string[];
    /** 硬件要求 */
    hardware?: string[];
  };
  /** 第一个项目建议 */
  firstProjectSuggestion: {
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    estimatedHours: number;
    githubUrl?: string;
  };
}

/**
 * 培训资源分类接口
 */
export interface TrainingCategory {
  /** 分类唯一标识 */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类描述 */
  description: string;
  /** 分类图标 */
  icon: string;
  /** 资源列表 */
  resources: LearningResource[];
  /** 推荐等级 (1-5) */
  recommendationLevel: number;
}

/**
 * 学习进度接口
 */
export interface LearningProgress {
  /** 用户ID */
  userId: string;
  /** 技术方向 */
  direction: TechDirection;
  /** 当前步骤ID */
  currentStepId: string;
  /** 已完成步骤ID列表 */
  completedSteps: string[];
  /** 总进度百分比 */
  overallProgress: number;
  /** 开始时间 */
  startDate: string;
  /** 最后活动时间 */
  lastActivity: string;
  /** 学习统计 */
  stats: {
    /** 总学习时间（小时） */
    totalHours: number;
    /** 完成的项目数 */
    completedProjects: number;
    /** 获得的技能点 */
    skillPoints: number;
  };
}

/**
 * 技术路线配置接口
 * 用于页面展示的配置信息
 */
export interface TechRouteConfig {
  key: TechDirection;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  popularityScore: number;
}

/**
 * 学习路径筛选器接口
 */
export interface LearningFilters {
  /** 技术方向 */
  directions: TechDirection[];
  /** 学习阶段 */
  stages: LearningStage[];
  /** 资源类型 */
  resourceTypes: ResourceType[];
  /** 难度等级 */
  difficulties: DifficultyLevel[];
  /** 是否免费 */
  isFree?: boolean;
  /** 语言偏好 */
  language?: 'zh' | 'en' | 'both';
  /** 搜索关键词 */
  searchQuery: string;
  /** 排序方式 */
  sortBy: 'popularity' | 'difficulty' | 'duration' | 'updated';
  /** 排序顺序 */
  sortOrder: 'asc' | 'desc';
}

/**
 * 页面状态接口
 */
export interface LearningPageState {
  /** 技术路线列表 */
  techRoutes: TechRoute[];
  /** 当前选中的技术方向 */
  selectedDirection: TechDirection | null;
  /** 快速上手指南 */
  quickStartGuides: QuickStartGuide[];
  /** 培训资源分类 */
  trainingCategories: TrainingCategory[];
  /** 筛选器状态 */
  filters: LearningFilters;
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 用户学习进度 */
  userProgress?: LearningProgress;
}

// 导出默认的技术路线配置
export const TECH_ROUTE_CONFIGS: TechRouteConfig[] = [
  {
    key: TechDirection.EMBEDDED,
    label: '嵌入式系统',
    description: '学习嵌入式开发、实时操作系统和硬件编程',
    icon: 'Cpu',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['FreeRTOS', 'uC/OS-II', 'ARM Cortex', 'IoT开发'],
    popularityScore: 85
  },
  {
    key: TechDirection.MECHANICAL,
    label: '机械算法',
    description: '掌握机械工程中的算法设计和数值计算',
    icon: 'Settings',
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    features: ['有限元分析', 'CAD算法', '控制系统', '仿真建模'],
    popularityScore: 75
  },
  {
    key: TechDirection.DESIGN,
    label: '设计师路线',
    description: '学习UI/UX设计和图形界面开发技术',
    icon: 'Palette',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Qt界面', 'WinForm', 'MFC', 'UI/UX设计'],
    popularityScore: 90
  }
];

// 导出资源类型配置
export const RESOURCE_TYPE_CONFIGS = [
  {
    key: ResourceType.DOCUMENTATION,
    label: '文档教程',
    icon: 'FileText',
    color: 'text-blue-600'
  },
  {
    key: ResourceType.VIDEO,
    label: '视频教程',
    icon: 'Play',
    color: 'text-red-600'
  },
  {
    key: ResourceType.PRACTICE,
    label: '实践项目',
    icon: 'Code',
    color: 'text-green-600'
  },
  {
    key: ResourceType.TOOL,
    label: '开发工具',
    icon: 'Wrench',
    color: 'text-orange-600'
  },
  {
    key: ResourceType.BOOK,
    label: '书籍资源',
    icon: 'Book',
    color: 'text-indigo-600'
  },
  {
    key: ResourceType.COURSE,
    label: '在线课程',
    icon: 'GraduationCap',
    color: 'text-purple-600'
  },
  {
    key: ResourceType.COMMUNITY,
    label: '社区资源',
    icon: 'Users',
    color: 'text-pink-600'
  }
];

// 导出难度等级配置
export const DIFFICULTY_CONFIGS = [
  {
    key: DifficultyLevel.EASY,
    label: '简单',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: '适合初学者，无需前置知识'
  },
  {
    key: DifficultyLevel.MEDIUM,
    label: '中等',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: '需要一定基础知识和经验'
  },
  {
    key: DifficultyLevel.HARD,
    label: '困难',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    description: '需要扎实的基础和丰富经验'
  }
];