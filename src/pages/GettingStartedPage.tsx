import React, { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Code,
  Users,
  Zap,
  ExternalLink,
  Github,
  FileText,
  Video,
  Cpu,
  Palette,
  Calculator,
  ArrowRight,
  Clock,
  Star,
  Target,
  Play,
  ChevronRight,
  Award,
  TrendingUp
} from 'lucide-react'
import TechRoadmapOverview from '@/components/TechRoadmapOverview'
import LearningResources from '@/components/LearningResources'
import { techRoutes } from '@/data/techRoutes'
import { trainingCategories } from '@/data/resources'

// 技术方向接口
interface TechDirection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
  skills: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  projects: number
  link: string
}

// 快速上手指南接口
interface QuickGuide {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  steps: string[]
  estimatedTime: string
  difficulty: 'easy' | 'medium' | 'hard'
}

// 学习统计接口
interface LearningStats {
  totalStudents: number
  completedProjects: number
  averageRating: number
  successRate: number
}

// 技术方向数据
const techDirections: TechDirection[] = [
  {
    id: 'embedded',
    title: '嵌入式开发',
    description: '学习嵌入式系统开发，掌握硬件与软件结合的核心技术',
    icon: Cpu,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    skills: ['C/C++', 'FreeRTOS', '硬件调试', '通信协议'],
    difficulty: 'intermediate',
    duration: '6-8个月',
    projects: 12,
    link: '/docs/tutorials/basic'
  },
  {
    id: 'gui',
    title: 'GUI界面开发',
    description: '掌握跨平台图形界面开发，创建美观实用的桌面应用',
    icon: Palette,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    skills: ['Qt/QML', 'UI设计', '跨平台开发', '用户体验'],
    difficulty: 'beginner',
    duration: '4-6个月',
    projects: 10,
    link: '/docs/tutorials/intermediate'
  },
  {
    id: 'algorithm',
    title: '算法与数据结构',
    description: '深入学习算法设计与优化，提升编程思维和解决问题的能力',
    icon: Calculator,
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    skills: ['算法设计', '数据结构', '性能优化', '数学建模'],
    difficulty: 'advanced',
    duration: '8-12个月',
    projects: 15,
    link: '/docs/tutorials/advanced'
  }
]

// 快速上手指南数据
const quickGuides: QuickGuide[] = [
  {
    id: 'setup',
    title: '环境搭建',
    description: '快速搭建开发环境，开始你的编程之旅',
    icon: Zap,
    steps: [
      '选择适合的开发工具',
      '安装必要的软件包',
      '配置开发环境',
      '运行第一个程序'
    ],
    estimatedTime: '30分钟',
    difficulty: 'easy'
  },
  {
    id: 'first-project',
    title: '第一个项目',
    description: '通过实际项目快速上手，掌握基础开发流程，并解决你的第一个Good Issue',
    icon: Code,
    steps: [
      '选择入门项目',
      '理解项目结构',
      '编写核心代码',
      '测试和调试',
      '寻找并解决第一个Good Issue',
      '项目部署'
    ],
    estimatedTime: '2小时',
    difficulty: 'medium'
  },
  {
    id: 'community',
    title: '加入社区',
    description: '融入学习社区，获得更多支持和交流机会',
    icon: Users,
    steps: [
      '注册俱乐部账号',
      '完善个人资料',
      '加入学习小组',
      '参与讨论交流'
    ],
    estimatedTime: '15分钟',
    difficulty: 'easy'
  }
]

// 学习统计数据
const learningStats: LearningStats = {
  totalStudents: 1200,
  completedProjects: 350,
  averageRating: 4.8,
  successRate: 92
}

// 技术方向卡片组件
function TechDirectionCard({ direction }: { direction: TechDirection }) {
  const Icon = direction.icon
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门'
      case 'intermediate': return '进阶'
      case 'advanced': return '高级'
      default: return '未知'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`h-2 bg-gradient-to-r ${direction.gradient}`} />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${direction.gradient} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <Badge className={getDifficultyColor(direction.difficulty)}>
              {getDifficultyText(direction.difficulty)}
            </Badge>
          </div>
          <CardTitle className="text-xl mb-2">{direction.title}</CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {direction.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{direction.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{direction.projects}个项目</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">核心技能</h4>
              <div className="flex flex-wrap gap-1">
                {direction.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="w-full mt-4" asChild>
              <a href={direction.link}>
                开始学习
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// 快速指南卡片组件
function QuickGuideCard({ guide }: { guide: QuickGuide }) {
  const Icon = guide.icon
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '困难'
      default: return '未知'
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getDifficultyColor(guide.difficulty)}>
                    {getDifficultyText(guide.difficulty)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{guide.estimatedTime}</span>
                </div>
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} />
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{guide.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">步骤：</h4>
                  <ol className="space-y-2">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

// 统计卡片组件
function StatsCard({ icon: Icon, title, value, description }: {
  icon: React.ComponentType<any>
  title: string
  value: string | number
  description: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="text-center hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function GettingStartedPage() {
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              新能源编程俱乐部
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              探索新能源技术的无限可能，从编程开始改变世界
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="mr-2 h-5 w-5" />
              加入俱乐部
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-primary/5 transition-all duration-300">
              <Code className="mr-2 h-5 w-5" />
              查看项目
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                访问官网
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 学习统计 */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <StatsCard
              icon={Users}
              title="学习者"
              value={learningStats.totalStudents}
              description="活跃学习者"
            />
            <StatsCard
              icon={Target}
              title="完成项目"
              value={learningStats.completedProjects}
              description="项目完成数"
            />
            <StatsCard
              icon={Star}
              title="平均评分"
              value={learningStats.averageRating}
              description="学员满意度"
            />
            <StatsCard
              icon={TrendingUp}
              title="成功率"
              value={`${learningStats.successRate}%`}
              description="学习成功率"
            />
          </motion.div>
        </div>
      </section>

      {/* 技术方向选择 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">选择你的技术方向</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              根据你的兴趣和职业规划，选择最适合的学习路径
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techDirections.map((direction, index) => (
              <motion.div
                key={direction.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedDirection(selectedDirection === direction.id ? null : direction.id)}
              >
                <TechDirectionCard direction={direction} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 快速上手指南 */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">快速上手指南</h2>
            <p className="text-lg text-muted-foreground">
              跟随我们的指南，快速开始你的新能源编程之旅
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <QuickGuideCard guide={guide} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 培训资源 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">培训资源</h2>
            <p className="text-lg text-muted-foreground">
              丰富的学习资源，助你快速提升技能
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">GitHub 仓库</h3>
                  <p className="text-sm text-muted-foreground mb-4">查看项目源码和贡献代码</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      访问 GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">技术文档</h3>
                  <p className="text-sm text-muted-foreground mb-4">详细的技术文档和API参考</p>
                  <Button variant="outline" size="sm">
                    查看文档
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Play className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">视频教程</h3>
                  <p className="text-sm text-muted-foreground mb-4">观看实战项目视频教程</p>
                  <Button variant="outline" size="sm">
                    观看视频
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">社区交流</h3>
                  <p className="text-sm text-muted-foreground mb-4">加入社区讨论和交流</p>
                  <Button variant="outline" size="sm">
                    加入讨论
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}