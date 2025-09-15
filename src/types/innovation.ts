// 创新技术展示相关的TypeScript类型定义

// 技术分类枚举
export enum TechnologyCategory {
  SOLAR = 'solar',
  WIND = 'wind',
  ENERGY_STORAGE = 'energy_storage',
  SMART_GRID = 'smart_grid',
  ELECTRIC_VEHICLE = 'electric_vehicle',
  HYDROGEN = 'hydrogen',
  BIOMASS = 'biomass',
  GEOTHERMAL = 'geothermal'
}

// 技术成熟度等级
export enum TechnologyMaturity {
  RESEARCH = 'research',        // 研究阶段
  PROTOTYPE = 'prototype',      // 原型阶段
  PILOT = 'pilot',             // 试点阶段
  COMMERCIAL = 'commercial'     // 商业化阶段
}

// 技术指标接口
export interface TechnologyMetrics {
  efficiency?: string;          // 效率
  capacity?: string;           // 容量
  cost?: string;              // 成本
  lifespan?: string;          // 使用寿命
  carbonReduction?: string;    // 碳减排量
  energyOutput?: string;       // 能源输出
  [key: string]: string | undefined; // 允许其他自定义指标
}

// 应用场景接口
export interface ApplicationScenario {
  id: string;
  name: string;
  description: string;
  benefits: string[];
}

// 创新技术接口
export interface InnovationTechnology {
  id: string;
  name: string;
  category: TechnologyCategory;
  description: string;
  detailedDescription: string;
  maturity: TechnologyMaturity;
  image: string;
  videoUrl?: string;
  demoUrl?: string;
  metrics: TechnologyMetrics;
  applications: ApplicationScenario[];
  advantages: string[];
  challenges: string[];
  developmentTeam: string;
  developmentDate: string;
  lastUpdated: string;
  tags: string[];
  relatedTechnologies: string[]; // 相关技术ID列表
  researchPapers?: string[];     // 相关研究论文链接
  patents?: string[];           // 专利信息
}

// 技术对比接口
export interface TechnologyComparison {
  technologies: string[]; // 技术ID列表
  metrics: string[];      // 对比指标
}

// 技术路线图节点接口
export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in_progress' | 'planned';
  category: TechnologyCategory;
  milestones: string[];
  dependencies?: string[]; // 依赖的其他节点ID
}

// 技术路线图接口
export interface TechnologyRoadmap {
  id: string;
  title: string;
  description: string;
  timeframe: {
    start: string;
    end: string;
  };
  nodes: RoadmapNode[];
}

// 筛选器接口
export interface InnovationFilters {
  categories: TechnologyCategory[];
  maturity: TechnologyMaturity[];
  searchQuery: string;
  sortBy: 'name' | 'date' | 'maturity' | 'category';
  sortOrder: 'asc' | 'desc';
}

// 页面状态接口
export interface InnovationPageState {
  technologies: InnovationTechnology[];
  filters: InnovationFilters;
  selectedTechnology: InnovationTechnology | null;
  comparisonMode: boolean;
  selectedForComparison: string[];
  roadmap: TechnologyRoadmap | null;
  loading: boolean;
  error: string | null;
}

// 技术分类配置接口
export interface CategoryConfig {
  key: TechnologyCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
}

// 导出默认的技术分类配置
export const TECHNOLOGY_CATEGORIES: CategoryConfig[] = [
  {
    key: TechnologyCategory.SOLAR,
    label: '太阳能技术',
    description: '太阳能发电、储能和应用技术',
    icon: 'Sun',
    color: 'text-yellow-600'
  },
  {
    key: TechnologyCategory.WIND,
    label: '风能技术',
    description: '风力发电和风能利用技术',
    icon: 'Wind',
    color: 'text-blue-600'
  },
  {
    key: TechnologyCategory.ENERGY_STORAGE,
    label: '储能技术',
    description: '电池、超级电容等储能解决方案',
    icon: 'Battery',
    color: 'text-green-600'
  },
  {
    key: TechnologyCategory.SMART_GRID,
    label: '智能电网',
    description: '智能电网和能源管理系统',
    icon: 'Zap',
    color: 'text-purple-600'
  },
  {
    key: TechnologyCategory.ELECTRIC_VEHICLE,
    label: '电动汽车',
    description: '电动汽车和充电基础设施',
    icon: 'Car',
    color: 'text-indigo-600'
  },
  {
    key: TechnologyCategory.HYDROGEN,
    label: '氢能技术',
    description: '氢能生产、储存和应用技术',
    icon: 'Atom',
    color: 'text-cyan-600'
  },
  {
    key: TechnologyCategory.BIOMASS,
    label: '生物质能',
    description: '生物质能源和生物燃料技术',
    icon: 'Leaf',
    color: 'text-emerald-600'
  },
  {
    key: TechnologyCategory.GEOTHERMAL,
    label: '地热能',
    description: '地热发电和地热利用技术',
    icon: 'Mountain',
    color: 'text-orange-600'
  }
];

// 技术成熟度配置
export const MATURITY_LEVELS = [
  {
    key: TechnologyMaturity.RESEARCH,
    label: '研究阶段',
    description: '基础研究和概念验证',
    color: 'text-red-600'
  },
  {
    key: TechnologyMaturity.PROTOTYPE,
    label: '原型阶段',
    description: '原型开发和测试',
    color: 'text-orange-600'
  },
  {
    key: TechnologyMaturity.PILOT,
    label: '试点阶段',
    description: '小规模试点和验证',
    color: 'text-yellow-600'
  },
  {
    key: TechnologyMaturity.COMMERCIAL,
    label: '商业化阶段',
    description: '大规模商业应用',
    color: 'text-green-600'
  }
];