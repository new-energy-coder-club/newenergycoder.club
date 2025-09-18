import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
  BookOpen,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Star,
  Trophy,
  Flame,
  Zap,
  Users,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
  ChevronDown,
  Filter,
  Download,
  Share2,
  Settings,
  Bell,
  Gift
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  TechRoute,
  LearningStep,
  StepStatus,
  DifficultyLevel,
  TechDirection
} from '../types/learning';

interface LearningProgressProps {
  userId?: string;
  onRouteSelect?: (routeId: string) => void;
  onStepSelect?: (stepId: string) => void;
}

interface UserProgress {
  routeId: string;
  stepProgress: Record<string, StepStatus>;
  startDate: Date;
  lastActiveDate: Date;
  totalHoursSpent: number;
  currentStreak: number;
  longestStreak: number;
  completedSteps: number;
  totalSteps: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category: 'learning' | 'streak' | 'completion' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LearningStats {
  totalHours: number;
  completedRoutes: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionTime: number;
  weeklyGoalProgress: number;
  monthlyGoalProgress: number;
  skillPoints: number;
  level: number;
  nextLevelProgress: number;
}

const LearningProgress: React.FC<LearningProgressProps> = ({
  userId = 'demo-user',
  onRouteSelect,
  onStepSelect
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'achievements' | 'stats'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(10); // 小时
  const [monthlyGoal, setMonthlyGoal] = useState(40); // 小时

  // 模拟用户进度数据
  const [userProgressData] = useState<UserProgress[]>([
    {
      routeId: 'embedded-freertos',
      stepProgress: {
        'step-1': StepStatus.COMPLETED,
        'step-2': StepStatus.COMPLETED,
        'step-3': StepStatus.IN_PROGRESS,
        'step-4': StepStatus.NOT_STARTED,
      },
      startDate: new Date('2024-11-01'),
      lastActiveDate: new Date(),
      totalHoursSpent: 25,
      currentStreak: 7,
      longestStreak: 12,
      completedSteps: 2,
      totalSteps: 8
    },
    {
      routeId: 'gui-qt',
      stepProgress: {
        'step-1': StepStatus.COMPLETED,
        'step-2': StepStatus.IN_PROGRESS,
      },
      startDate: new Date('2024-11-15'),
      lastActiveDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalHoursSpent: 15,
      currentStreak: 0,
      longestStreak: 5,
      completedSteps: 1,
      totalSteps: 6
    }
  ]);

  // 计算学习统计
  const learningStats: LearningStats = useMemo(() => {
    const totalHours = userProgressData.reduce((sum, progress) => sum + progress.totalHoursSpent, 0);
    const completedRoutes = userProgressData.filter(progress => 
      progress.completedSteps === progress.totalSteps
    ).length;
    const currentStreak = Math.max(...userProgressData.map(p => p.currentStreak));
    const longestStreak = Math.max(...userProgressData.map(p => p.longestStreak));
    
    const skillPoints = totalHours * 10 + completedRoutes * 100;
    const level = Math.floor(skillPoints / 1000) + 1;
    const nextLevelProgress = (skillPoints % 1000) / 1000 * 100;
    
    return {
      totalHours,
      completedRoutes,
      currentStreak,
      longestStreak,
      averageSessionTime: totalHours / Math.max(userProgressData.length, 1),
      weeklyGoalProgress: (totalHours % weeklyGoal) / weeklyGoal * 100,
      monthlyGoalProgress: (totalHours % monthlyGoal) / monthlyGoal * 100,
      skillPoints,
      level,
      nextLevelProgress
    };
  }, [userProgressData, weeklyGoal, monthlyGoal]);

  // 成就系统
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: '初学者',
      description: '完成第一个学习步骤',
      icon: <Play className="w-6 h-6" />,
      unlockedAt: new Date('2024-11-01'),
      progress: 1,
      maxProgress: 1,
      category: 'learning',
      rarity: 'common'
    },
    {
      id: 'week-streak',
      title: '坚持一周',
      description: '连续学习7天',
      icon: <Flame className="w-6 h-6" />,
      unlockedAt: new Date(),
      progress: 7,
      maxProgress: 7,
      category: 'streak',
      rarity: 'rare'
    },
    {
      id: 'route-master',
      title: '路线大师',
      description: '完成一条完整的学习路线',
      icon: <Trophy className="w-6 h-6" />,
      progress: 0,
      maxProgress: 1,
      category: 'completion',
      rarity: 'epic'
    },
    {
      id: 'speed-learner',
      title: '学习达人',
      description: '单周学习超过20小时',
      icon: <Zap className="w-6 h-6" />,
      progress: 15,
      maxProgress: 20,
      category: 'learning',
      rarity: 'rare'
    }
  ];

  // 获取成就稀有度颜色
  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
    }
  };

  // 概览页面
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* 用户等级和进度 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">等级 {learningStats.level}</h2>
            <p className="text-blue-100">技能点数: {learningStats.skillPoints}</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>下一等级进度</span>
            <span>{Math.round(learningStats.nextLevelProgress)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${learningStats.nextLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 学习统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.totalHours}h</p>
          <p className="text-sm text-gray-600">总学习时间</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.currentStreak}</p>
          <p className="text-sm text-gray-600">连续学习天数</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.completedRoutes}</p>
          <p className="text-sm text-gray-600">完成路线</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.unlockedAt).length}</p>
          <p className="text-sm text-gray-600">获得成就</p>
        </div>
      </div>

      {/* 学习目标 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">学习目标</h3>
          <button
            onClick={() => setShowGoalModal(true)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* 周目标 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">本周目标 ({weeklyGoal}h)</span>
              <span className="font-medium">
                {Math.round(learningStats.weeklyGoalProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(learningStats.weeklyGoalProgress, 100)}%` }}
              />
            </div>
          </div>
          
          {/* 月目标 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">本月目标 ({monthlyGoal}h)</span>
              <span className="font-medium">
                {Math.round(learningStats.monthlyGoalProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(learningStats.monthlyGoalProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">完成了 "FreeRTOS基础概念" 学习</p>
              <p className="text-xs text-gray-600">2小时前</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Award className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">获得成就 "坚持一周"</p>
              <p className="text-xs text-gray-600">1天前</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Play className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">开始学习 "Qt界面设计" 路线</p>
              <p className="text-xs text-gray-600">3天前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 学习路线页面
  const RoutesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">我的学习路线</h3>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="year">本年</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {userProgressData.map((progress, index) => {
          const completionPercentage = (progress.completedSteps / progress.totalSteps) * 100;
          
          return (
            <motion.div
              key={progress.routeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => onRouteSelect?.(progress.routeId)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {progress.routeId === 'embedded-freertos' ? 'FreeRTOS嵌入式开发' : 'Qt图形界面开发'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    开始时间: {progress.startDate.toLocaleDateString('zh-CN')}
                  </p>
                  
                  {/* 进度条 */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        进度: {progress.completedSteps}/{progress.totalSteps} 步骤
                      </span>
                      <span className="font-medium">{Math.round(completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-600 mb-1">学习时间</div>
                  <div className="text-lg font-semibold text-gray-900">{progress.totalHoursSpent}h</div>
                </div>
              </div>
              
              {/* 统计信息 */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">连续天数</p>
                  <p className="font-semibold text-gray-900">{progress.currentStreak}</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">最后学习</p>
                  <p className="font-semibold text-gray-900">
                    {Math.floor((Date.now() - progress.lastActiveDate.getTime()) / (1000 * 60 * 60 * 24))}天前
                  </p>
                </div>
                <div className="text-center">
                  <Trophy className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">最长连续</p>
                  <p className="font-semibold text-gray-900">{progress.longestStreak}天</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // 成就页面
  const AchievementsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">成就系统</h3>
        <div className="text-sm text-gray-600">
          {achievements.filter(a => a.unlockedAt).length} / {achievements.length} 已解锁
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => {
          const isUnlocked = !!achievement.unlockedAt;
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border-2 p-6 transition-all duration-300 ${
                isUnlocked 
                  ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${
                  isUnlocked ? getRarityColor(achievement.rarity) : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className={`font-semibold ${
                      isUnlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      getRarityColor(achievement.rarity)
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    isUnlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {/* 进度条 */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                      <span className="text-gray-500">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          isUnlocked ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {isUnlocked && achievement.unlockedAt && (
                    <p className="text-xs text-gray-500">
                      解锁时间: {achievement.unlockedAt.toLocaleDateString('zh-CN')}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // 统计页面
  const StatsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">学习统计</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 详细统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">学习时间分布</h4>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">嵌入式开发</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-16 h-2 bg-blue-600 rounded-full" />
                </div>
                <span className="text-sm font-medium">25h</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">图形界面</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-12 h-2 bg-green-600 rounded-full" />
                </div>
                <span className="text-sm font-medium">15h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">学习效率</h4>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">平均会话时长</span>
              <span className="text-sm font-medium">{learningStats.averageSessionTime.toFixed(1)}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">完成率</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">学习频率</span>
              <span className="text-sm font-medium">5天/周</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">技能发展</h4>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">当前等级</span>
              <span className="text-sm font-medium">Lv.{learningStats.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">技能点数</span>
              <span className="text-sm font-medium">{learningStats.skillPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">下级进度</span>
              <span className="text-sm font-medium">{Math.round(learningStats.nextLevelProgress)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 学习日历热力图 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">学习活动热力图</h4>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 365 }, (_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  intensity > 0.7 ? 'bg-green-600' :
                  intensity > 0.5 ? 'bg-green-400' :
                  intensity > 0.3 ? 'bg-green-200' :
                  intensity > 0.1 ? 'bg-green-100' : 'bg-gray-100'
                }`}
                title={`学习时间: ${(intensity * 5).toFixed(1)}h`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
          <span>少</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm" />
            <div className="w-3 h-3 bg-green-100 rounded-sm" />
            <div className="w-3 h-3 bg-green-200 rounded-sm" />
            <div className="w-3 h-3 bg-green-400 rounded-sm" />
            <div className="w-3 h-3 bg-green-600 rounded-sm" />
          </div>
          <span>多</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 页面头部 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          学习进度中心
        </h1>
        <p className="text-gray-600">
          跟踪你的学习进度，查看统计数据和解锁成就
        </p>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'overview', label: '概览', icon: <TrendingUp className="w-4 h-4" /> },
            { key: 'routes', label: '学习路线', icon: <BookOpen className="w-4 h-4" /> },
            { key: 'achievements', label: '成就', icon: <Award className="w-4 h-4" /> },
            { key: 'stats', label: '统计', icon: <BarChart3 className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'routes' && <RoutesTab />}
              {activeTab === 'achievements' && <AchievementsTab />}
              {activeTab === 'stats' && <StatsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 目标设置弹窗 */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">设置学习目标</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    周学习目标 (小时)
                  </label>
                  <input
                    type="number"
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    月学习目标 (小时)
                  </label>
                  <input
                    type="number"
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存
                </button>
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningProgress;