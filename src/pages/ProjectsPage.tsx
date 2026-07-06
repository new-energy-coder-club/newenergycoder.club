import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'
import { ProjectImage } from '@/components/ui/project-image'
import { projects as mockProjects, type ProjectCategory } from '@/data/projects'

const categoryFilters = [
  { key: 'all' as ProjectCategory, labelKey: 'filterAll' },
  { key: 'ai' as ProjectCategory, labelKey: 'filterAI' },
  { key: 'iot' as ProjectCategory, labelKey: 'filterIoT' },
  { key: 'embedded' as ProjectCategory, labelKey: 'filterEmbedded' },
  { key: 'robotics' as ProjectCategory, labelKey: 'filterRobotics' },
  { key: 'research' as ProjectCategory, labelKey: 'filterResearch' },
  { key: 'web' as ProjectCategory, labelKey: 'filterWeb' },
  { key: 'mobile' as ProjectCategory, labelKey: 'filterMobile' },
  { key: 'other' as ProjectCategory, labelKey: 'filterOther' }
]

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[21/9]')
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)
  const t = useTranslation()

  const filteredProjects = selectedCategory === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory)

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      {/* 主容器div - 设置最小高度为全屏，添加从背景色到强调色的渐变背景 */}
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      {/* Hero Section - 页面顶部英雄区域 */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 relative overflow-hidden">
        {/* 背景装饰div - 创建径向渐变背景效果，绝对定位覆盖整个section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        
        {/* 内容容器div - 相对定位，z-index为10确保在背景之上，文本居中对齐 */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.projects.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.projects.description}
            </p>
          </div>
        </div>
      </section>

{/* ProjectsPage 组件
├── useState 管理 selectedRatio 状态
├── 通过 PageLayout 传递属性
│   ├── showAspectRatio={true}
│   ├── aspectRatio={selectedRatio}
│   └── onAspectRatioChange={setSelectedRatio}
└── 在项目卡片中应用：className={`${selectedRatio} overflow-hidden relative`} */}


      {/* Filter Section - 筛选器区域 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedCategory === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(filter.key)}
                className="transition-all duration-200 hover-lift"
              >
                {t.projects[filter.labelKey]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - 项目网格区域 */}
      <section className="py-16">
        {/* 项目网格容器div - 使用container类进行响应式布局 */}
        <div className="container">
          {/* 项目网格div - 网格布局，间距为6，响应式列数：小屏1列，中屏2列，大屏3列 */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card hover-lift glow-hover group overflow-hidden">
                {/* 项目图片容器div - 使用选定的宽高比，隐藏溢出内容，相对定位 */}
                <div className={`${selectedRatio} overflow-hidden relative`}>
                  <ProjectImage 
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full"
                  />
                  {/* 
                    悬停遮罩层 - 项目卡片图片的交互遮罩效果
                    - absolute inset-0: 绝对定位，覆盖整个父容器（图片区域）
                    - bg-gradient-to-t: 从底部到顶部的渐变背景
                    - from-black/60: 渐变起点为60%透明度的黑色
                    - via-transparent: 渐变中间为完全透明
                    - to-transparent: 渐变终点为完全透明
                    - opacity-0: 默认状态下完全透明（不可见）
                    - group-hover:opacity-100: 当父元素（.group）被悬停时，遮罩变为完全不透明
                    - transition-opacity duration-300: 透明度变化的过渡动画，持续300毫秒
                    作用：为项目卡片提供优雅的悬停视觉反馈，增强用户交互体验
                  */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* 
                    悬停按钮容器 - 项目操作按钮的定位容器
                    - absolute: 绝对定位，脱离文档流
                    - bottom-4 left-4 right-4: 距离底部、左侧、右侧各16px（4 * 4px）
                    - opacity-0: 默认状态下完全透明（隐藏按钮）
                    - group-hover:opacity-100: 悬停时显示按钮（完全不透明）
                    - transition-opacity duration-300: 透明度变化的平滑过渡动画
                    作用：在用户悬停项目卡片时，在图片底部显示操作按钮
                  */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* 
                      按钮组布局容器 - 水平排列多个操作按钮
                      - flex: 弹性布局，子元素水平排列
                      - gap-2: 子元素之间的间距为8px（2 * 4px）
                      作用：确保多个按钮之间有适当的间距，保持整齐的布局
                    */}
                    <div className="flex gap-2">
                      {/* 条件渲染：只有当项目有项目链接时才显示查看项目按钮 */}
                      {project.projectUrl && (
                        /* 
                          查看项目按钮 - 跳转到项目详情页面的操作按钮
                          - size="sm": 小尺寸按钮，适合在卡片中使用
                          - bg-white/20: 20%透明度的白色背景
                          - backdrop-blur-sm: 小程度的背景模糊效果（毛玻璃效果）
                          - hover:bg-white/30: 悬停时背景透明度增加到30%
                          - ExternalLink图标: 表示外部链接的视觉提示
                          - mr-2: 图标右侧边距8px，与文字保持间距
                          作用：提供访问项目详情的快捷入口，视觉效果现代且优雅
                        */
                        <Button 
                          size="sm" 
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={() => window.open(project.projectUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.projects.viewProject}
                        </Button>
                      )}
                      {project.githubUrl && (
                        /* 查看代码按钮 - 小尺寸，轮廓样式，半透明背景，点击打开新窗口 */
                        <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30" onClick={() => window.open(project.githubUrl, '_blank')}>
                          <GiteeIcon className="h-4 w-4 mr-2" />
                          {t.projects.viewCode}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* 技术栈区域div - 包含标题和技术标签 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">{t.projects.technologies}</h4>
                    {/* 技术标签容器div - 水平排列可换行，间距为1 */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  

                  {/* 项目状态区域div - 柔和背景，圆角，内边距，小字体 */}
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <p className="text-muted-foreground">项目状态: 开发中</p>
                  </div>
                  
                  {/* 项目信息底部区域div - 水平排列两端对齐，顶部边框，内边距 */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    {/* 作者信息容器div - 水平排列居中对齐，间距为1 */}
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.author}</span>
                    </div>
                    {/* 日期信息容器div - 水平排列居中对齐，间距为1 */}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 空状态提示 - 当筛选结果为空时显示 */}
          {filteredProjects.length === 0 && (
            /* 空状态容器div - 文本居中，垂直内边距为16 */
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* 主容器div结束标签 */}
      </div>
      </PageLayout>
  )
}