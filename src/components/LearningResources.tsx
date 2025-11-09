import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  BookOpen,
  Play,
  Code,
  Wrench,
  Users,
  GraduationCap,
  ExternalLink,
  Clock,
  Star,
  Heart,
  Download,
  Globe,
  Tag,
  ChevronDown,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  LearningResource,
  ResourceType,
  DifficultyLevel,
  TechDirection,
  TrainingCategory
} from '../types/learning';
import {
  trainingCategories,
  getResourcesByDirection,
  getResourcesByType,
  getResourcesByDifficulty,
  getFreeResources,
  getResourcesByLanguage
} from '../data/resources';

interface LearningResourcesProps {
  selectedDirection?: TechDirection;
  onResourceSelect?: (resource: LearningResource) => void;
  onAddToLearningPlan?: (resource: LearningResource) => void;
}

interface FilterState {
  search: string;
  type: ResourceType | 'all';
  difficulty: DifficultyLevel | 'all';
  direction: TechDirection | 'all';
  language: 'zh' | 'en' | 'both';
  freeOnly: boolean;
}

const LearningResources: React.FC<LearningResourcesProps> = ({
  selectedDirection,
  onResourceSelect,
  onAddToLearningPlan
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    difficulty: 'all',
    direction: selectedDirection || 'all',
    language: 'both',
    freeOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 获取所有资源
  const allResources = useMemo(() => {
    return trainingCategories.flatMap(category => category.resources);
  }, []);

  // 筛选资源
  const filteredResources = useMemo(() => {
    let resources = allResources;

    // 搜索筛选
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      resources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // 类型筛选
    if (filters.type !== 'all') {
      resources = resources.filter(resource => resource.type === filters.type);
    }

    // 难度筛选
    if (filters.difficulty !== 'all') {
      resources = resources.filter(resource => resource.difficulty === filters.difficulty);
    }

    // 技术方向筛选
    if (filters.direction !== 'all') {
      resources = getResourcesByDirection(filters.direction).filter(resource =>
        resources.includes(resource)
      );
    }

    // 语言筛选
    if (filters.language !== 'both') {
      resources = resources.filter(resource => resource.language === filters.language);
    }

    // 免费资源筛选
    if (filters.freeOnly) {
      resources = resources.filter(resource => resource.isFree);
    }

    return resources;
  }, [allResources, filters]);

  // 获取资源类型图标
  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.DOCUMENTATION:
        return <BookOpen className="w-5 h-5" />;
      case ResourceType.VIDEO:
        return <Play className="w-5 h-5" />;
      case ResourceType.PRACTICE:
        return <Code className="w-5 h-5" />;
      case ResourceType.TOOL:
        return <Wrench className="w-5 h-5" />;
      case ResourceType.COMMUNITY:
        return <Users className="w-5 h-5" />;
      case ResourceType.COURSE:
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  // 获取难度颜色
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return 'text-green-600 bg-green-100';
      case DifficultyLevel.MEDIUM:
        return 'text-yellow-600 bg-yellow-100';
      case DifficultyLevel.HARD:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // 切换收藏状态
  const toggleBookmark = (resourceId: string) => {
    const newBookmarks = new Set(bookmarkedResources);
    if (newBookmarks.has(resourceId)) {
      newBookmarks.delete(resourceId);
    } else {
      newBookmarks.add(resourceId);
    }
    setBookmarkedResources(newBookmarks);
  };

  // 重置筛选器
  const resetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      difficulty: 'all',
      direction: selectedDirection || 'all',
      language: 'both',
      freeOnly: false
    });
  };

  // 资源卡片组件
  const ResourceCard: React.FC<{ resource: LearningResource }> = ({ resource }) => {
    const isBookmarked = bookmarkedResources.has(resource.id);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
      >
        {/* 卡片头部 */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                {getResourceTypeIcon(resource.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {t(`learning.resourceTypes.${resource.type}`)}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleBookmark(resource.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {resource.description}
          </p>

          {/* 资源信息 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{resource.estimatedHours}h</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>{resource.language === 'zh' ? '中文' : 'English'}</span>
              </div>
              {resource.isFree && (
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                  免费
                </span>
              )}
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              getDifficultyColor(resource.difficulty)
            }`}>
              {t(`learning.difficulty.${resource.difficulty}`)}
            </span>
          </div>

          {/* 技术标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.open(resource.url, '_blank')}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('learning.resources.viewResource')}</span>
            </button>
            <button
              onClick={() => onAddToLearningPlan?.(resource)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // 筛选器组件
  const FilterPanel: React.FC = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 border-b border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 资源类型筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('learning.resources.filterByType')}
              </label>
              <select
                id="filter-type"
                name="type"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as ResourceType | 'all' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">所有类型</option>
                {Object.values(ResourceType).map(type => (
                  <option key={type} value={type}>
                    {t(`learning.resourceTypes.${type}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* 难度筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('learning.resources.filterByDifficulty')}
              </label>
              <select
                id="filter-difficulty"
                name="difficulty"
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel | 'all' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">所有难度</option>
                {Object.values(DifficultyLevel).map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {t(`learning.difficulty.${difficulty}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* 技术方向筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('learning.resources.filterByDirection')}
              </label>
              <select
                id="filter-direction"
                name="direction"
                value={filters.direction}
                onChange={(e) => setFilters(prev => ({ ...prev, direction: e.target.value as TechDirection | 'all' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">所有方向</option>
                {Object.values(TechDirection).map(direction => (
                  <option key={direction} value={direction}>
                    {t(`learning.directions.${direction}.title`)}
                  </option>
                ))}
              </select>
            </div>

            {/* 语言筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('learning.resources.filterByLanguage')}
              </label>
              <select
                id="filter-language"
                name="language"
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value as 'zh' | 'en' | 'both' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="both">所有语言</option>
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* 免费资源开关 */}
          <div className="mt-4 flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="filter-freeOnly"
                name="freeOnly"
                checked={filters.freeOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, freeOnly: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {t('learning.resources.showFreeOnly')}
              </span>
            </label>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              重置筛选
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页面头部 */}
      <div className="mb-8">
        {/* NEC Home 图片 */}
        <div className="mb-6 text-center">
          <img 
            src="/src/NEC-home.gif" 
            alt="NEC Home" 
            className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
            style={{ maxHeight: '300px' }}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('learning.resources.title')}
        </h1>
        <p className="text-gray-600">
          {t('learning.resources.subtitle')}
        </p>
      </div>

      {/* 搜索和筛选栏 */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="resource-search"
                name="search"
                placeholder="搜索资源、技术或关键词..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 border rounded-lg transition-colors ${
                showFilters
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>筛选</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`} />
            </button>

            {/* 视图切换 */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 text-sm transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                网格
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 text-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                列表
              </button>
            </div>
          </div>
        </div>

        <FilterPanel />
      </div>

      {/* 结果统计 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          找到 <span className="font-semibold text-gray-900">{filteredResources.length}</span> 个资源
        </p>
        {(filters.search || filters.type !== 'all' || filters.difficulty !== 'all' || 
          filters.direction !== 'all' || filters.language !== 'both' || filters.freeOnly) && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>清除筛选</span>
          </button>
        )}
      </div>

      {/* 资源列表 */}
      <AnimatePresence mode="wait">
        {filteredResources.length > 0 ? (
          <motion.div
            key="resources"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('learning.messages.noResourcesFound')}
            </h3>
            <p className="text-gray-600 mb-4">
              尝试调整筛选条件或搜索其他关键词
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重置筛选
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningResources;