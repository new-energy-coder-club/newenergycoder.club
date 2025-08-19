import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

type ProjectCategory = 'all' | 'web' | 'mobile' | 'ai' | 'iot' | 'embedded' | 'robotics' | 'research' | 'other'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: ProjectCategory
  technologies: string[]
  author: string
  date: string
  projectUrl?: string
  githubUrl?: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: '20250319流体工作站',
    description: '流体工作站监控系统，实现对流体设备的实时监控和数据采集，提供高精度的流体参数测量和控制功能。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/JIDINAQI.png',
    category: 'ai',
    technologies: ['嵌入式系统', '传感器技术', 'C/C++', '数据采集', 'SCADA'],
    author: '新能源编程俱乐部',
    date: '2025-03-19',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring/20250319流体工作站'
  },
  {
    id: '2',
    title: '20250426星闪手柄',
    description: '基于WS63的星闪手柄开发项目，采用星闪技术实现低延迟、高可靠性的无线通信，为游戏和控制应用提供优质体验。',
    image: 'https://gitee.com/jumuwa/new_energy_coder_club/raw/master/Nearlink_handle.jpg',
    category: 'embedded',
    technologies: ['WS63', '星闪技术', 'NearLink', '嵌入式开发', '无线通信'],
    author: '新能源编程俱乐部',
    date: '2025-04-26',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink/20250426星闪手柄'
  },
  {
    id: '3',
    title: ' 20241201人形机器人主线',
    description: '人形机器人核心开发项目，涵盖机器人运动控制、感知系统、决策算法等关键技术，致力于打造智能化的人形机器人平台。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Duma_image.png',
    category: 'robotics',
    technologies: ['ROS', '运动控制', '计算机视觉', '深度学习', '传感器融合'],
    author: '新能源编程俱乐部',
    date: '2024-12-01',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/humanoid-robot/人形机器人主线'
  },
  {
    id: '4',
    title: '20241115飞控通讯（飞行汽车项目组）',
    description: '无人机飞控系统通讯项目，实现无人机与地面站之间的可靠数据传输，支持实时遥测、遥控和任务规划功能。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/PhotoelectricKG.png',
    category: 'robotics',
    technologies: ['飞控系统', '无线通信', 'MAVLink', '实时系统', '嵌入式开发'],
    author: '新能源编程俱乐部',
    date: '2024-11-15',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/250510飞控通讯'
  },
  {
    id: '5',
    title: 'NEC 横向项目（真实需求企业级命题）',
    description: '产学研合作项目，与企业和科研院所合作开展技术研发，将理论研究与实际应用相结合，推动科技成果转化。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Roadmap.png',
    category: 'research',
    technologies: ['产学研合作', '技术转化', '项目管理', '创新研发'],
    author: '新能源编程俱乐部',
    date: '2024-10-01',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」'
  },
  {
    id: '6',
    title: '人形机器人UMI低成本灵巧手',
    description: '高性价比灵巧手研发项目，通过优化设计和制造工艺，降低灵巧手成本，提高其在教育和研究领域的普及性。',
    image: 'https://ww2.mathworks.cn/help/examples/robotics/win64/DesignManipulatorPathsUsingIKDesignerExample_03.png',
    category: 'research',
    technologies: ['机械设计', '3D打印', '控制算法', '成本优化', 'UMI'],
    author: '新能源编程俱乐部',
    date: '2024-09-20',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/dexterous-hand'
  },
  {
    id: '7',
    title: '20241015气缸控制系统',
    description: '高精度气动控制系统，实现对气缸运动的精确控制，广泛应用于自动化生产线和机器人系统中。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/%E9%80%89%E5%9E%8B%E8%B5%84%E6%96%99.png',
    category: 'research',
    technologies: ['气动控制', 'PLC', '精密控制', '自动化', '工业控制'],
    author: '新能源编程俱乐部',
    date: '2024-10-15',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/pneumatic-system'
  },
  {
    id: '8',
    title: '3D打印成型SIG',
    description: '专业3D打印服务团队，提供从设计到成型的一站式3D打印解决方案，支持多种材料和复杂结构的打印需求。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/projects/%E7%A7%91%E7%A0%94%E3%80%8C%E6%A8%AA%E5%90%91%E9%A1%B9%E7%9B%AE%E3%80%8D/image/%E9%99%90%E4%BD%8D%E5%99%A8.jpg',
    category: 'research',
    technologies: ['3D打印', 'CAD设计', '材料科学', '快速成型', '后处理工艺'],
    author: '新能源编程俱乐部',
    date: '2024-07-10',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/3d-printing-team'
  },
  {
    id: '9',
    title: 'MICA混合关键系统验证',
    description: '混合关键部署框架验证项目，研究和验证MICA框架在混合关键系统中的应用效果和性能表现。',
    image: 'https://darrenpig.github.io/files/news10.jpg',
    category: 'research',
    technologies: ['MICA框架', '混合关键系统', '系统验证', '性能分析', '安全关键'],
    author: '新能源编程俱乐部',
    date: '2024-06-25',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/mica-validation'
  }
]

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
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        {/* 背景装饰div - 创建径向渐变背景效果，绝对定位覆盖整个section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        
        {/* 内容容器div - 相对定位，z-index为10确保在背景之上，文本居中对齐 */}
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
            {t.projects.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
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
      <section className="py-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        {/* 筛选器容器div - 使用container类进行响应式布局 */}
        <div className="container">
          {/* 筛选器内容div - 垂直排列，间距为4 */}
          <div className="flex flex-col gap-4">
            {/* Toggle Button - 切换按钮区域 */}
             {/* 标题和切换按钮容器div - 水平排列，两端对齐，垂直居中 */}
             <div className="flex justify-between items-center">
               <h3 className="text-lg font-semibold">{t.projects.filterTitle}</h3>
               {/* 筛选器展开/收起按钮 - 幽灵样式，小尺寸，带悬停效果和过渡动画 */}
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                 className="hover-lift transition-all duration-200"
               >
                 {isFilterExpanded ? (
                   <>
                     <ChevronUp className="h-4 w-4 mr-2" />
                     {t.projects.collapseFilters}
                   </>
                 ) : (
                   <>
                     <ChevronDown className="h-4 w-4 mr-2" />
                     {t.projects.expandFilters}
                   </>
                 )}
               </Button>
             </div>
            
            {/* Collapsible Filter Content - 可折叠的筛选器内容 */}
            {/* 可折叠内容容器div - 根据展开状态动态调整最大高度和透明度，带过渡动画 */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFilterExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {/* 筛选器内容div - 垂直排列，间距为6，底部内边距为4 */}
              <div className="flex flex-col gap-6 pb-4">
                {/* 筛选按钮容器div - 水平排列可换行，间距为2，居中对齐（小屏幕）或左对齐（大屏幕） */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {categoryFilters.map((filter) => (
                    /* 分类筛选按钮 - 根据选中状态切换样式，带悬停效果和过渡动画 */
                    <Button
                      key={filter.key}
                      variant={selectedCategory === filter.key ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(filter.key)}
                      className="hover-lift transition-all duration-200"
                    >
                      {t.projects[filter.labelKey]}
                    </Button>
                  ))}
                </div>
                

              </div>
            </div>
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
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
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