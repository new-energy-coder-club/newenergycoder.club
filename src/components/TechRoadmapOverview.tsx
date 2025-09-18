import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Cpu, 
  Palette, 
  Clock, 
  Users, 
  TrendingUp,
  ChevronRight,
  Star,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  TechRoute, 
  TechDirection, 
  DifficultyLevel,
  LearningStage 
} from '../types/learning';
import { techRoutes } from '../data/techRoutes';

interface TechRoadmapOverviewProps {
  onSelectRoute?: (route: TechRoute) => void;
  onStartQuickGuide?: (direction: TechDirection) => void;
}

const TechRoadmapOverview: React.FC<TechRoadmapOverviewProps> = ({
  onSelectRoute,
  onStartQuickGuide
}) => {
  const { t } = useTranslation();
  const [selectedDirection, setSelectedDirection] = useState<TechDirection | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  // 按技术方向分组路线
  const routesByDirection = useMemo(() => {
    return techRoutes.reduce((acc, route) => {
      if (!acc[route.direction]) {
        acc[route.direction] = [];
      }
      acc[route.direction].push(route);
      return acc;
    }, {} as Record<TechDirection, TechRoute[]>);
  }, []);

  // 获取方向图标
  const getDirectionIcon = (direction: TechDirection) => {
    switch (direction) {
      case TechDirection.EMBEDDED:
        return <Cpu className="w-8 h-8" />;
      case TechDirection.MECHANICAL:
        return <Target className="w-8 h-8" />;
      case TechDirection.DESIGN:
        return <Palette className="w-8 h-8" />;
      default:
        return <Code className="w-8 h-8" />;
    }
  };

  // 获取难度颜色
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) {
      return 'text-green-600 bg-green-100';
    } else if (difficulty <= 3) {
      return 'text-yellow-600 bg-yellow-100';
    } else {
      return 'text-red-600 bg-red-100';
    }
  };

  // 计算路线统计信息
  const getRouteStats = (route: TechRoute) => {
    const totalHours = route.totalEstimatedMonths * 30 * 8; // 估算总小时数
    const totalSteps = route.steps.length;
    return { totalHours, totalSteps };
  };

  // 方向卡片组件
  const DirectionCard: React.FC<{ direction: TechDirection; routes: TechRoute[] }> = ({ 
    direction, 
    routes 
  }) => {
    const isSelected = selectedDirection === direction;
    const directionData = t(`learning.directions.${direction}`, { returnObjects: true }) as any;
    
    return (
      <motion.div
        className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
          isSelected 
            ? 'border-blue-500 bg-blue-50 shadow-lg' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }`}
        onClick={() => setSelectedDirection(isSelected ? null : direction)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {getDirectionIcon(direction)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {directionData.title}
              </h3>
              <p className="text-sm text-gray-600">
                {directionData.subtitle}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isSelected ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>

        <p className="text-gray-700 mb-4">
          {directionData.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{routes.length} 条路线</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>热门方向</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartQuickGuide?.(direction);
            }}
            className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            快速体验
          </button>
        </div>

        {/* 展开的路线列表 */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-3 border-t pt-4"
            >
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // 路线卡片组件
  const RouteCard: React.FC<{ route: TechRoute }> = ({ route }) => {
    const stats = getRouteStats(route);
    const isHovered = hoveredRoute === route.id;

    return (
      <motion.div
        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
        onMouseEnter={() => setHoveredRoute(route.id)}
        onMouseLeave={() => setHoveredRoute(null)}
        onClick={() => onSelectRoute?.(route)}
        whileHover={{ x: 4 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{route.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                getDifficultyColor(route.learningDifficulty)
              }`}>
                难度 {route.learningDifficulty}/5
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {route.description}
            </p>
          </div>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{stats.totalHours}小时</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>{stats.totalSteps}个步骤</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>{route.steps.length}个步骤</span>
            </div>
          </div>
          
          {/* 核心技术标签 */}
          <div className="flex items-center space-x-1">
            {route.coreTechnologies.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                {skill}
              </span>
            ))}
            {route.coreTechnologies.length > 2 && (
              <span className="text-xs text-gray-400">
                +{route.coreTechnologies.length - 2}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页面头部 */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('learning.pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('learning.pageSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* 统计信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {techRoutes.length}
          </h3>
          <p className="text-gray-600">学习路线</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-lg mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            3
          </h3>
          <p className="text-gray-600">技术方向</p>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-lg mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            30分钟
          </h3>
          <p className="text-gray-600">快速上手</p>
        </div>
      </motion.div>

      {/* 技术方向卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        {Object.entries(routesByDirection).map(([direction, routes]) => (
          <DirectionCard
            key={direction}
            direction={direction as TechDirection}
            routes={routes}
          />
        ))}
      </motion.div>

      {/* 底部行动号召 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white"
      >
        <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
        <h2 className="text-2xl font-bold mb-2">
          准备开始你的技术之旅？
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          选择一个技术方向，跟随我们精心设计的学习路线，从零基础到技术专家。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            查看学习资源
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors">
            开始技能评估
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TechRoadmapOverview;