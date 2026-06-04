import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  Code,
  Users,
  Zap,
  ExternalLink,
  Github,
  BookOpen,
  GitBranch,
  Sparkles,
  ArrowRight,
  Star,
  Target,
  ChevronRight,
  Award,
  TrendingUp,
  Eye
} from 'lucide-react'

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
    id: 'first-good-issue',
    title: '第一个好的问题',
    description: '寻找并解决你的第一个Good Issue，开始为开源项目做贡献',
    icon: Target,
    steps: [
      '浏览项目Issue列表',
      '筛选Good First Issue标签',
      '理解问题描述和要求',
      'Fork项目并创建分支',
      '实现解决方案',
      '提交Pull Request'
    ],
    estimatedTime: '25分钟',
    difficulty: 'easy'
  },
  {
    id: 'first-project',
    title: '第一个项目',
    description: '通过实际项目快速上手，掌握基础开发流程',
    icon: Code,
    steps: [
      '选择入门项目',
      '理解项目结构',
      '编写核心代码',
      '测试和调试',
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

// Gitee API 响应接口
interface GiteeWatcher {
  id: number
  login: string
  name: string
  avatar_url: string
  url: string
  html_url: string
  remark: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  blog: string | null
  weibo: string | null
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  stared: number
  watched: number
  created_at: string
  updated_at: string
  email: string | null
}

// CSDN 统计 API 响应接口
interface CSDNStats {
  username: string
  totalVisits: number | null
  fans: number | null
  originalArticles: number | null
  rank: number | null
  updatedAt: string
}

// 快速指南卡片组件
function QuickGuideCard({ guide }: { guide: QuickGuide }) {
  const t = useTranslation()
  const Icon = guide.icon
  const [isExpanded, setIsExpanded] = useState(false)
  const guideKey = guide.id === 'first-good-issue' ? 'firstGoodIssue' : (guide.id === 'first-project' ? 'firstProject' : guide.id)
  const item = t.gettingStarted?.quickGuides?.items?.[guideKey as 'setup' | 'firstGoodIssue' | 'firstProject' | 'community']
  const itemSteps = (item?.steps as string[]) || guide.steps
  
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
                <CardTitle className="text-lg">{item?.title ?? guide.title}</CardTitle>
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
                <p className="text-muted-foreground mb-4">{item?.description ?? guide.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t.gettingStarted.quickGuides.stepsLabel}</h4>
                  <ol className="space-y-2">
                    {itemSteps.map((step: string, index: number) => (
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
  const t = useTranslation()
  const [watchersCount, setWatchersCount] = useState<number>(1200)
  const [csdnVisits, setCsdnVisits] = useState<number>(538475)
  const [isLoading, setIsLoading] = useState(true)

  // 获取 Gitee watchers 数量和 CSDN 访问量
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 并行获取 Gitee 和 CSDN 数据
        const [giteeResponse, csdnResponse] = await Promise.all([
          fetch('https://gitee.com/api/v5/repos/darrenpig/new_energy_coder_club/watchers?page=1&per_page=100'),
          fetch('/api/csdn-stats?username=m0_74037814')
        ])

        if (giteeResponse.ok) {
          const data: GiteeWatcher[] = await giteeResponse.json()
          setWatchersCount(data.length)
        }

        if (csdnResponse.ok) {
          const data: CSDNStats = await csdnResponse.json()
          if (data.totalVisits) {
            setCsdnVisits(data.totalVisits)
          }
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.gettingStarted.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t.gettingStarted.hero.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/join">
                <Users className="mr-2 h-5 w-5" />
                {t.gettingStarted.hero.buttons.joinClub}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-primary/5 transition-all duration-300" asChild>
              <Link to="/projects">
                <Code className="mr-2 h-5 w-5" />
                {t.gettingStarted.hero.buttons.viewProjects}
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href="https://www.newenergycoder.club/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                {t.gettingStarted.hero.buttons.visitSite}
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
              title={t.gettingStarted.stats.learnersTitle}
              value={isLoading ? '...' : watchersCount}
              description={t.gettingStarted.stats.learnersDesc}
            />
            <StatsCard
              icon={Eye}
              title={t.gettingStarted.stats.csdnVisitsTitle}
              value={isLoading ? '...' : csdnVisits.toLocaleString()}
              description={t.gettingStarted.stats.csdnVisitsDesc}
            />
            <StatsCard
              icon={Star}
              title={t.gettingStarted.stats.averageRatingTitle}
              value={learningStats.averageRating}
              description={t.gettingStarted.stats.averageRatingDesc}
            />
            <StatsCard
              icon={TrendingUp}
              title={t.gettingStarted.stats.successRateTitle}
              value={`${learningStats.successRate}%`}
              description={t.gettingStarted.stats.successRateDesc}
            />
          </motion.div>
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
            <h2 className="text-3xl font-bold mb-4">{t.gettingStarted.quickGuides.title}</h2>
            <p className="text-lg text-muted-foreground">
              {t.gettingStarted.quickGuides.description}
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t.gettingStarted.trainingResources.title}</h2>
            <p className="text-lg text-muted-foreground">
              {t.gettingStarted.trainingResources.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">NEC 文档中心</h3>
                  <p className="text-sm text-muted-foreground mb-4">NEC官方文档中心，提供系统的学习指南与技术参考</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://docs.newenergycoder.club/" target="_blank" rel="noopener noreferrer">
                      查阅文档
                      <ExternalLink className="ml-2 h-3 w-3" />
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
                  <h3 className="font-semibold mb-2">NEC知识库</h3>
                  <p className="text-sm text-muted-foreground mb-4">飞书知识库（需登录），包含项目文档、技术资料和学习资源</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/S10LwzVZdiWLwxkEnEqcTcmEn6e" target="_blank" rel="noopener noreferrer">
                      访问知识库
                      <ExternalLink className="ml-2 h-3 w-3" />
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
                  <GitBranch className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Gitee参与协作</h3>
                  <p className="text-sm text-muted-foreground mb-4">飞书文档（需登录）：了解如何通过Gitee参与项目协作</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/KeqJwFcBfipgKJkNweccRlPgn94" target="_blank" rel="noopener noreferrer">
                      查看指南
                      <ExternalLink className="ml-2 h-3 w-3" />
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
                  <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">新人快速上手</h3>
                  <p className="text-sm text-muted-foreground mb-4">飞书文档（需登录）：新成员入门指南，快速了解团队</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/QAtNwr244ir8ZekITEZcwpOZnkg" target="_blank" rel="noopener noreferrer">
                      开始了解
                      <ExternalLink className="ml-2 h-3 w-3" />
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
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">AI基础技术学习</h3>
                  <p className="text-sm text-muted-foreground mb-4">飞书文档（需登录）：AI学习路径，从入门到实战</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/JIRlwpifli5EAEkwLJ4cKgnMnMf" target="_blank" rel="noopener noreferrer">
                      开始学习
                      <ExternalLink className="ml-2 h-3 w-3" />
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
                  <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{t.gettingStarted.trainingResources.githubRepoTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t.gettingStarted.trainingResources.githubRepoDesc}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com/Darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer">
                      {t.gettingStarted.trainingResources.visitGithub}
                    </a>
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