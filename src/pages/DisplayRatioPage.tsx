// React Hooks
import { useState } from 'react'

// UI 组件
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// 从FloatingControls导入集成的组件和类型
import { AspectRatio, DisplayItem, typeColors, aspectRatioOptions } from '@/components/ui/floating-controls'

// 布局组件
import { PageLayout } from '@/components/layout/PageLayout'

// 图标组件
import { Linkedin, Mail, ExternalLink, Download } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'

// 国际化
import { useTranslation } from '@/contexts/LanguageContext'

const sampleItems: DisplayItem[] = [
  {
    id: '1',
    title: '张三',
    description: '全栈开发工程师，专注于React和Node.js开发',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    type: 'team',
    role: '技术负责人'
  },
  {
    id: '2',
    title: '智能能源管理系统',
    description: '基于AI的智能电网管理平台，提供实时监控和优化建议',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    type: 'project',
    category: 'AI'
  },
  {
    id: '3',
    title: 'React进阶教程',
    description: '深入学习React Hooks、Context API和性能优化技巧',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    type: 'resource',
    category: '教程'
  },
  {
    id: '4',
    title: '新能源技术分享会',
    description: '探讨最新的太阳能和风能技术发展趋势',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    type: 'event',
    category: '技术分享'
  },
  {
    id: '5',
    title: '李四',
    description: 'UI/UX设计师，擅长用户体验设计和界面优化',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop',
    type: 'team',
    role: '设计师'
  },
  {
    id: '6',
    title: '区块链能源交易平台',
    description: '基于区块链技术的去中心化能源交易系统',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    type: 'project',
    category: '区块链'
  }
]

export function DisplayRatioPage() {
  const t = useTranslation()
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredItems = selectedType === 'all' 
    ? sampleItems 
    : sampleItems.filter(item => item.type === selectedType)

  const renderCard = (item: DisplayItem) => {
    return (
      <Card key={item.id} className="glass-card hover-lift glow-hover group overflow-hidden">
        <div className={`${selectedRatio} overflow-hidden relative`}>
          <img 
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${typeColors[item.type]} border`}>
              {item.type === 'team' ? '团队' : 
               item.type === 'project' ? '项目' : 
               item.type === 'resource' ? '资源' : '活动'}
            </Badge>
          </div>

          {/* Category/Role Badge */}
          {(item.category || item.role) && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
                {item.category || item.role}
              </Badge>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              {item.type === 'team' ? (
                <>
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                    <GiteeIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                    <Mail className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" className="bg-primary/90 backdrop-blur-sm hover:bg-primary flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    查看详情
                  </Button>
                  {item.type === 'resource' && (
                    <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <h4 className="font-bold text-lg">{item.title}</h4>
          {item.role && (
            <p className="text-sm gradient-text font-semibold">{item.role}</p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        {/* 页面顶部的主要展示区域，包含标题和描述文本 */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              显示比例调整器
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              调整卡片显示比例，查看不同比例下的视觉效果
            </p>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map(renderCard)}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">没有找到匹配的内容</p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        {/*
        <section className="py-16 bg-gradient-to-br from-secondary/20 to-accent/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold gradient-text mb-6">关于显示比例</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">正方形 (1:1)</h3>
                  <p className="text-sm text-muted-foreground">适合头像、图标等需要统一尺寸的内容</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">视频比例 (16:9)</h3>
                  <p className="text-sm text-muted-foreground">现代显示器标准比例，适合视频和横向内容</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">传统比例 (4:3)</h3>
                  <p className="text-sm text-muted-foreground">经典显示比例，平衡的视觉效果</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">竖直比例 (3:4)</h3>
                  <p className="text-sm text-muted-foreground">适合人物肖像和竖向内容展示</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">宽屏比例 (16:10)</h3>
                  <p className="text-sm text-muted-foreground">专业显示器比例，适合工作内容</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2">超宽比例 (21:9)</h3>
                  <p className="text-sm text-muted-foreground">电影级宽屏比例，视觉冲击力强</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>
    </PageLayout>
  )
}