import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Circle,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Code,
  Users,
  Target,
  Award,
  Calendar,
  TrendingUp,
  ExternalLink,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Star,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Lightbulb,
  Check
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  TechRoute,
  LearningStep,
  LearningStage,
  DifficultyLevel,
  StepStatus
} from '../types/learning';

interface LearningPathDetailProps {
  route: TechRoute;
  onBack: () => void;
  onStartLearning?: (routeId: string) => void;
  onStepComplete?: (routeId: string, stepId: string) => void;
  userProgress?: Record<string, StepStatus>;
}

interface LearningProgress {
  totalSteps: number;
  completedSteps: number;
  currentStage: number;
  estimatedTimeRemaining: number;
  completionPercentage: number;
}

const LearningPathDetail: React.FC<LearningPathDetailProps> = ({
  route,
  onBack,
  onStartLearning,
  onStepComplete,
  userProgress = {}
}) => {
  const { t } = useTranslation();
  const [selectedStep, setSelectedStep] = useState<LearningStep | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  // 计算学习进度
  const progress: LearningProgress = React.useMemo(() => {
    const allSteps = route.steps;
    const completedSteps = allSteps.filter(step => 
      userProgress[step.id] === StepStatus.COMPLETED
    ).length;
    
    const currentStepIndex = allSteps.findIndex(step => 
      userProgress[step.id] === StepStatus.IN_PROGRESS ||
      userProgress[step.id] === StepStatus.NOT_STARTED
    );

    const remainingSteps = allSteps.filter(step => 
      userProgress[step.id] !== StepStatus.COMPLETED
    );
    const estimatedTimeRemaining = remainingSteps.reduce((total, step) => 
      total + step.estimatedDays, 0
    );

    return {
      totalSteps: allSteps.length,
      completedSteps,
      currentStage: Math.floor(currentStepIndex / Math.max(1, Math.ceil(allSteps.length / 3))),
      estimatedTimeRemaining,
      completionPercentage: (completedSteps / allSteps.length) * 100
    };
  }, [route, userProgress]);



  // 获取步骤状态
  const getStepStatus = (stepId: string): StepStatus => {
    return userProgress[stepId] || StepStatus.NOT_STARTED;
  };

  // 获取步骤状态图标
  const getStepStatusIcon = (status: StepStatus) => {
    switch (status) {
      case StepStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case StepStatus.IN_PROGRESS:
        return <Play className="w-5 h-5 text-blue-600" />;
      case StepStatus.NOT_STARTED:
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
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

  // 处理步骤完成
  const handleStepComplete = (stepId: string) => {
    onStepComplete?.(route.id, stepId);
  };

  // 保存笔记
  const saveNote = (stepId: string, note: string) => {
    setUserNotes(prev => ({ ...prev, [stepId]: note }));
  };

  // 步骤详情组件
  const StepDetail: React.FC<{ step: LearningStep }> = ({ step }) => {
    const status = getStepStatus(step.id);
    const [noteText, setNoteText] = useState(userNotes[step.id] || '');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {getStepStatusIcon(status)}
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border-blue-200">
                学习步骤
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              {step.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedStep(null)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* 步骤信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">预计时间</p>
            <p className="font-semibold text-gray-900">{step.estimatedDays}天</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Target className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">学习目标</p>
            <p className="font-semibold text-gray-900">{step.objectives.length}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">资源数量</p>
            <p className="font-semibold text-gray-900">{step.resources.length}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Code className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">实践项目</p>
            <p className="font-semibold text-gray-900">{step.practiceProjects?.length || 0}</p>
          </div>
        </div>

        {/* 学习目标 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            学习目标
          </h4>
          <ul className="space-y-2">
            {step.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 学习资源 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            学习资源
          </h4>
          <div className="space-y-2">
            {step.resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{resource.title}</p>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(resource.url, '_blank')}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 实践项目 */}
        {step.practiceProjects && step.practiceProjects.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              实践项目
            </h4>
            <div className="space-y-3">
              {step.practiceProjects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">实践项目</h5>
                  <p className="text-gray-600 text-sm mb-3">{project}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>实践项目</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 学习笔记 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            学习笔记
          </h4>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={() => saveNote(step.id, noteText)}
            placeholder="记录你的学习心得、问题和想法..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center space-x-3">
          {status !== StepStatus.COMPLETED && (
            <button
              onClick={() => handleStepComplete(step.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>标记完成</span>
            </button>
          )}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>分享</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4" />
            <span>收藏</span>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>返回技术路线</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要内容区域 */}
        <div className="lg:col-span-2">
          {/* 路线头部信息 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{route.title}</h1>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    getDifficultyColor(route.learningDifficulty)
                  }`}>
                    难度 {route.learningDifficulty}/5
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{route.description}</p>
                
                {/* 核心技术标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {route.coreTechnologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'text-red-500 bg-red-50'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 路线统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">总步骤</p>
                <p className="text-xl font-bold text-gray-900">{progress.totalSteps}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">预计时间</p>
                <p className="text-xl font-bold text-gray-900">{route.totalEstimatedMonths * 30 * 8}h</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">学习人数</p>
                <p className="text-xl font-bold text-gray-900">1.2k+</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">完成率</p>
                <p className="text-xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>

          {/* 学习阶段 */}
          <div className="space-y-6">
            {route.steps.map((step, stepIndex) => {
              const status = getStepStatus(step.id);
              const isCompleted = status === StepStatus.COMPLETED;
              
              return (
                <div key={step.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStep?.id === step.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedStep(step)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCompleted
                            ? 'bg-green-600 text-white'
                            : stepIndex <= (progress.completedSteps || 0)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            stepIndex + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                          
                          {/* 步骤资源 */}
                          {step.resources && step.resources.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {step.resources.slice(0, 3).map((resource, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                  {resource.title}
                                </span>
                              ))}
                              {step.resources.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  +{step.resources.length - 3} 更多
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm text-gray-500">
                          <p>{step.estimatedDays}天</p>
                          <p>{step.stage}</p>
                        </div>
                        {getStepStatusIcon(status)}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 学习进度 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              学习进度
            </h3>
            
            {/* 进度环 */}
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progress.completionPercentage * 2.51} 251`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">
                    {Math.round(progress.completionPercentage)}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600">
                {progress.completedSteps} / {progress.totalSteps} 步骤完成
              </p>
            </div>

            {/* 进度详情 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">当前阶段</span>
                <span className="font-medium text-gray-900">
                  第 {progress.currentStage + 1} 阶段
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">剩余时间</span>
                <span className="font-medium text-gray-900">
                  {progress.estimatedTimeRemaining}h
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">预计完成</span>
                <span className="font-medium text-gray-900">
                  {new Date(Date.now() + progress.estimatedTimeRemaining * 60 * 60 * 1000)
                    .toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>

            {/* 开始学习按钮 */}
            <button
              onClick={() => onStartLearning?.(route.id)}
              className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>
                {progress.completedSteps > 0 ? '继续学习' : '开始学习'}
              </span>
            </button>
          </div>

          {/* 学习提示 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              学习建议
            </h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                <span>建议每天学习1-2小时，保持学习连续性</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                <span>完成每个阶段后进行实践项目巩固</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                <span>遇到问题时积极参与社区讨论</span>
              </li>
            </ul>
          </div>

          {/* 相关资源 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              相关资源
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">官方文档</p>
                    <p className="text-sm text-gray-600">查看完整技术文档</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">学习社区</p>
                    <p className="text-sm text-gray-600">加入学习讨论群</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">实战项目</p>
                    <p className="text-sm text-gray-600">下载练习项目</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 步骤详情弹窗 */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <StepDetail step={selectedStep} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningPathDetail;