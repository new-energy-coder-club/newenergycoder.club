import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Users, Zap, ExternalLink, Github, FileText, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface GuideSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  items: GuideItem[]
}

interface GuideItem {
  title: string
  description: string
  link?: string
  type: 'internal' | 'external' | 'document'
}

const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: '快速开始',
    description: '了解俱乐部基础信息和如何参与',
    icon: Zap,
    items: [
      {
        title: '俱乐部介绍',
        description: '了解新能源编程俱乐部的使命和愿景',
        link: '/team',
        type: 'internal'
      },
      {
        title: '加入俱乐部',
        description: '成为俱乐部成员，开始你的编程之旅',
        link: '/join',
        type: 'internal'
      },
      {
        title: '联系我们',
        description: '获取更多信息和支持',
        link: '/contact',
        type: 'internal'
      }
    ]
  },
  {
    id: 'projects',
    title: '项目开发',
    description: '参与开源项目和技术实践',
    icon: Code,
    items: [
      {
        title: '项目展示',
        description: '查看俱乐部的开源项目和成果',
        link: '/projects',
        type: 'internal'
      },
      {
        title: 'GitHub 仓库',
        description: '访问俱乐部的代码仓库',
        link: 'https://github.com/newenergycoder',
        type: 'external'
      },
      {
        title: '开发指南',
        description: '学习项目开发的最佳实践',
        type: 'document'
      }
    ]
  },
  {
    id: 'learning',
    title: '学习资源',
    description: '获取编程学习材料和教程',
    icon: BookOpen,
    items: [
      {
        title: '学习资源',
        description: '编程教程、文档和学习材料',
        link: '/resources',
        type: 'internal'
      },
      {
        title: '技术文档',
        description: '深入的技术文档和API参考',
        type: 'document'
      },
      {
        title: '视频教程',
        description: '观看编程实战视频教程',
        type: 'document'
      }
    ]
  },
  {
    id: 'community',
    title: '社区活动',
    description: '参与技术交流和社区建设',
    icon: Users,
    items: [
      {
        title: '活动日历',
        description: '查看即将举行的技术活动和工作坊',
        link: '/events',
        type: 'internal'
      },
      {
        title: '技术分享',
        description: '参与技术分享会和讨论',
        type: 'document'
      },
      {
        title: '竞赛活动',
        description: '参加编程竞赛和挑战赛',
        type: 'document'
      }
    ]
  }
]

function GuideCard({ section }: { section: GuideSection }) {
  const Icon = section.icon
  
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{section.title}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          {section.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {section.items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {item.type === 'internal' && <FileText className="h-4 w-4 text-blue-500" />}
                {item.type === 'external' && <ExternalLink className="h-4 w-4 text-green-500" />}
                {item.type === 'document' && <BookOpen className="h-4 w-4 text-purple-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {item.type === 'internal' ? '内部' : item.type === 'external' ? '外部' : '文档'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                {item.link && (
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" asChild>
                    {item.type === 'external' ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        访问 <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <a href={item.link}>
                        查看
                      </a>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function GettingStartedPage() {
  const t = useTranslation()
  
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl">
                入门文档
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              欢迎来到新能源编程俱乐部！这里是你开始编程之旅的起点，
              从基础入门到项目实践，我们为你提供全方位的学习指导。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/join">
                  <Users className="h-5 w-5" />
                  立即加入俱乐部
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="/projects">
                  <Code className="h-5 w-5" />
                  查看项目
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Guide Sections */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                学习路径
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                按照以下步骤，循序渐进地了解俱乐部和提升编程技能
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {guideSections.map((section) => (
                <GuideCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                快速链接
              </h2>
              <p className="text-lg text-muted-foreground">
                常用资源和工具的快速访问
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <Github className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">GitHub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    访问俱乐部的开源代码仓库
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="https://github.com/newenergycoder" target="_blank" rel="noopener noreferrer">
                      访问仓库
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">技术文档</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    详细的技术文档和API参考
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/resources">
                      查看文档
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">视频教程</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    观看编程实战视频教程
                  </p>
                  <Button size="sm" variant="outline">
                    即将推出
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">社区交流</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    加入技术讨论和交流群
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/contact">
                      联系我们
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default GettingStartedPage