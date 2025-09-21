import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Code, 
  Settings, 
  Zap, 
  BookOpen, 
  ArrowRight,
  Clock,
  Users,
  Shield
} from 'lucide-react';

interface QuickNavItem {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const quickNavItems: QuickNavItem[] = [
  {
    slug: 'api-reference',
    title: 'API 参考',
    description: '完整的 API 接口文档，包含用户管理、学习资源等核心功能',
    icon: <Code className="w-6 h-6" />,
    color: 'bg-blue-500',
    estimatedTime: '15 分钟',
    difficulty: 'intermediate'
  },
  {
    slug: 'architecture',
    title: '系统架构',
    description: '了解系统的整体架构设计、技术栈选择和核心组件',
    icon: <Settings className="w-6 h-6" />,
    color: 'bg-green-500',
    estimatedTime: '10 分钟',
    difficulty: 'advanced'
  },
  {
    slug: 'development-guide',
    title: '开发指南',
    description: '开发环境搭建、代码规范、调试技巧等开发必备知识',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-purple-500',
    estimatedTime: '20 分钟',
    difficulty: 'beginner'
  },
  {
    slug: 'integration-guide',
    title: '集成指南',
    description: '第三方服务集成、部署配置、监控告警等运维相关内容',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-orange-500',
    estimatedTime: '25 分钟',
    difficulty: 'intermediate'
  },
  {
    slug: 'technical-standards',
    title: '技术规范',
    description: '代码规范、安全标准、性能优化等技术标准和最佳实践',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-red-500',
    estimatedTime: '12 分钟',
    difficulty: 'intermediate'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
    case 'intermediate':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
    case 'advanced':
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900';
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return '入门';
    case 'intermediate':
      return '中级';
    case 'advanced':
      return '高级';
    default:
      return '未知';
  }
};

export const TechnicalDocsQuickNav: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickNavItems.map((item) => (
        <Link
          key={item.slug}
          to={`/docs/technical/${item.slug}`}
          className="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${item.color} text-white`}>
              {item.icon}
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              {item.estimatedTime && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{item.estimatedTime}</span>
                </div>
              )}
              
              {item.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                  {getDifficultyText(item.difficulty)}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TechnicalDocsQuickNav;