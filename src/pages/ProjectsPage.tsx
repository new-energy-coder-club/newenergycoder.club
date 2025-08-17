import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { AspectRatioSelector, type AspectRatio } from '@/components/ui/aspect-ratio-selector'

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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
    category: 'iot',
    technologies: ['嵌入式系统', '传感器技术', 'C/C++', '数据采集', 'SCADA'],
    author: '新能源编程俱乐部',
    date: '2025-03-19',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '2',
    title: '20250426星闪手柄',
    description: '基于WS63的星闪手柄开发项目，采用星闪技术实现低延迟、高可靠性的无线通信，为游戏和控制应用提供优质体验。',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
    category: 'embedded',
    technologies: ['WS63', '星闪技术', 'NearLink', '嵌入式开发', '无线通信'],
    author: '新能源编程俱乐部',
    date: '2025-04-26',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '3',
    title: '人形机器人主线',
    description: '人形机器人核心开发项目，涵盖机器人运动控制、感知系统、决策算法等关键技术，致力于打造智能化的人形机器人平台。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    category: 'robotics',
    technologies: ['ROS', '运动控制', '计算机视觉', '深度学习', '传感器融合'],
    author: '新能源编程俱乐部',
    date: '2024-12-01',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '4',
    title: '飞控通讯',
    description: '无人机飞控系统通讯项目，实现无人机与地面站之间的可靠数据传输，支持实时遥测、遥控和任务规划功能。',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop',
    category: 'robotics',
    technologies: ['飞控系统', '无线通信', 'MAVLink', '实时系统', '嵌入式开发'],
    author: '新能源编程俱乐部',
    date: '2024-11-15',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '5',
    title: '横向项目',
    description: '产学研合作项目，与企业和科研院所合作开展技术研发，将理论研究与实际应用相结合，推动科技成果转化。',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    category: 'research',
    technologies: ['产学研合作', '技术转化', '项目管理', '创新研发'],
    author: '新能源编程俱乐部',
    date: '2024-10-01',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '6',
    title: '人形机器人UMI低成本灵巧手',
    description: '高性价比灵巧手研发项目，通过优化设计和制造工艺，降低灵巧手成本，提高其在教育和研究领域的普及性。',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
    category: 'research',
    technologies: ['机械设计', '3D打印', '控制算法', '成本优化', 'UMI'],
    author: '新能源编程俱乐部',
    date: '2024-09-20',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '7',
    title: '气缸控制系统',
    description: '高精度气动控制系统，实现对气缸运动的精确控制，广泛应用于自动化生产线和机器人系统中。',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=250&fit=crop',
    category: 'research',
    technologies: ['气动控制', 'PLC', '精密控制', '自动化', '工业控制'],
    author: '新能源编程俱乐部',
    date: '2024-08-15',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '8',
    title: '3D打印成型组',
    description: '专业3D打印服务团队，提供从设计到成型的一站式3D打印解决方案，支持多种材料和复杂结构的打印需求。',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
    category: 'research',
    technologies: ['3D打印', 'CAD设计', '材料科学', '快速成型', '后处理工艺'],
    author: '新能源编程俱乐部',
    date: '2024-07-10',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
  },
  {
    id: '9',
    title: 'MICA关键性验证',
    description: '混合关键部署框架验证项目，研究和验证MICA框架在混合关键系统中的应用效果和性能表现。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'research',
    technologies: ['MICA框架', '混合关键系统', '系统验证', '性能分析', '安全关键'],
    author: '新能源编程俱乐部',
    date: '2024-06-25',
    githubUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects'
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
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-video')
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)
  const t = useTranslation()

  const filteredProjects = selectedCategory === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory)

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
            {t.projects.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col gap-4">
            {/* Toggle Button */}
             <div className="flex justify-between items-center">
               <h3 className="text-lg font-semibold">{t.projects.filterTitle}</h3>
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
            
            {/* Collapsible Filter Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFilterExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="flex flex-col gap-6 pb-4">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {categoryFilters.map((filter) => (
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
                
                {/* Aspect Ratio Selector */}
                <div className="flex justify-center">
                  <AspectRatioSelector 
                    value={selectedRatio} 
                    onValueChange={setSelectedRatio}
                    className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card hover-lift glow-hover group overflow-hidden">
                <div className={`${selectedRatio} overflow-hidden relative`}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      {project.projectUrl && (
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.projects.viewProject}
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                          <Github className="h-4 w-4 mr-2" />
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
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-primary">{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 aspect-[4/3] glass-card hover-lift">
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <p className="text-muted-foreground">项目状态: 开发中</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
      </div>
    </PageLayout>
  )
}