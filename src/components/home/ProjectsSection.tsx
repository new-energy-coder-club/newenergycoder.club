import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Star, Users } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { Link } from 'react-router-dom'

interface Project {
  title: string
  description: string
  category: string
  status: 'active' | 'development' | 'completed'
  tags: string[]
  githubUrl?: string
  giteeUrl?: string
  demoUrl?: string
  participants?: number
}

function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'development': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '🟢 活跃'
      case 'development': return '🟡 开发中'
      case 'completed': return '🔵 已完成'
      default: return '⚪ 未知'
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${getStatusColor(project.status)}`}
              >
                {getStatusText(project.status)}
              </Badge>
            </div>
          </div>
          {project.participants && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{project.participants}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 技术标签 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* 项目链接 */}
        <div className="flex gap-2 flex-wrap">
          {project.giteeUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.giteeUrl} target="_blank" rel="noopener noreferrer">
                <GiteeIcon className="h-4 w-4 mr-1" />
                Gitee
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GiteeIcon className="h-4 w-4 mr-1" />
                GitHub
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                演示
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsSection() {
  const t = useTranslation()

  // 基于Gitee仓库信息的热门项目数据
  const hotProjects: Project[] = [
    {
      title: '2025 ROBOCON',
      description: '全国大学生机器人竞赛ROBOCON 2025赛季项目，包含机器人设计、控制系统和竞赛策略。',
      category: '🏆 竞赛项目',
      status: 'active',
      tags: ['机器人', 'ROS', '嵌入式', '控制系统', 'C++'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/competitions/2025/robocon',
      participants: 12
    },
    {
      title: '人形机器人开发',
      description: 'Duma小型人形机器人项目，开源人形机器人硬件设计和软件控制系统。',
      category: '🤖 机器人项目',
      status: 'active',
      tags: ['人形机器人', 'Arduino', '3D打印', '舵机控制', '步态规划'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/humanoid-robot',
      participants: 8
    },
    {
      title: '5轴流体工作站',
      description: '基于人工智能的能源监测和管理系统，实现智能化能源优化。',
      category: '🧠 AI项目',
      status: 'development',
      tags: ['AI', 'Python', '数据分析', '物联网', 'TensorFlow'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring',
      participants: 6
    },
    {
      title: '星闪技术开发',
      description: '新一代无线通信技术NearLink的研发和应用，支持低功耗高速通信。',
      category: '⚡ 嵌入式项目',
      status: 'active',
      tags: ['NearLink', '无线通信', '嵌入式', 'C', '物联网'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink',
      participants: 5
    },
    {
      title: 'MICA验证项目',
      description: 'MICA关键性验证项目，包含完整的文档系统和自动化部署配置。',
      category: '🔬 科研项目',
      status: 'active',
      tags: ['验证测试', 'GitHub Actions', '自动化', '文档系统'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/mica-validation',
      participants: 4
    },
    {
      title: '灵巧手项目',
      description: '人形机器人UMI低成本灵巧手项目，实现精细操作控制。',
      category: '🦾 机器人项目',
      status: 'development',
      tags: ['灵巧手', '精密控制', '传感器', '机械设计'],
      giteeUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/dexterous-hand',
      participants: 7
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            🔥 热门项目
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            探索我们正在进行的创新项目，涵盖AI、机器人、嵌入式系统等多个技术领域
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hotProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* 查看更多按钮 */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <a 
                href="https://gitee.com/darrenpig/new_energy_coder_club" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <GiteeIcon className="h-5 w-5 mr-2" />
                访问完整仓库
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="min-w-[200px]">
              <Link to="/projects">
                <Star className="h-5 w-5 mr-2" />
                查看所有项目
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}