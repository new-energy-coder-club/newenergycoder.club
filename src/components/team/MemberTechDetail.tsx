import type { LucideIcon } from 'lucide-react'
import {
  Zap,
  Cpu,
  Eye,
  Cog,
  GitBranch,
  Brain,
  Bot,
  Globe,
  CircuitBoard,
  Layers,
  Wrench,
  Code,
  FolderOpen,
  ExternalLink,
  Rocket,
  Mail,
  Linkedin,
  Github,
  Target,
  Radio,
  Server,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { ImageProxy } from '@/components/ui/image-proxy'
import { getProjectById } from '@/data/projects'
import type { TeamMember } from '@/lib/i18n/types/translations'
import BonjourIcon from '@/bonjour.ico?url'

interface MemberTechDetailProps {
  member: TeamMember | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface TechModule {
  id: string
  name: string
  icon: LucideIcon
  keywords: string[]
}

const TECH_MODULES: TechModule[] = [
  {
    id: 'control',
    name: '电控系统',
    icon: Zap,
    keywords: ['电控', '电机', '驱动', '电源', 'FOC', '逆变器', '电池管理', 'BMS'],
  },
  {
    id: 'embedded',
    name: '嵌入式开发',
    icon: Cpu,
    keywords: ['嵌入式', 'STM32', 'RTOS', '单片机', 'ESP32', 'ARM', 'C语言', '固件'],
  },
  {
    id: 'vision',
    name: '机器视觉',
    icon: Eye,
    keywords: ['视觉', '计算机视觉', 'OpenCV', 'YOLO', 'LiDAR', '图像处理', '目标检测'],
  },
  {
    id: 'mechanical',
    name: '机械结构',
    icon: Cog,
    keywords: ['机械', '3D建模', 'SolidWorks', '3D打印', 'CAD', '结构', '传动'],
  },
  {
    id: 'algorithm',
    name: '算法与控制',
    icon: GitBranch,
    keywords: ['算法', '控制', '运动控制', '路径规划', 'MPC', 'PID', '逆运动学', ' Slam'],
  },
  {
    id: 'ai',
    name: '人工智能',
    icon: Brain,
    keywords: ['AI', '深度学习', '神经网络', '华为云AI', '机器学习', '大模型', 'LLM'],
  },
  {
    id: 'robotics',
    name: '机器人中间件',
    icon: Bot,
    keywords: ['ROS', 'ROS2', '机器人', 'Gazebo', '仿真', 'MoveIt'],
  },
  {
    id: 'fullstack',
    name: '全栈开发',
    icon: Globe,
    keywords: ['全栈', '前端', '后端', 'React', 'Node.js', 'TypeScript', 'Web'],
  },
  {
    id: 'hardware',
    name: '硬件设计',
    icon: CircuitBoard,
    keywords: ['硬件', 'PCB', '电路', '原理图', 'Altium', 'KiCad', '信号完整性'],
  },
  {
    id: 'industrial',
    name: '工业设计',
    icon: Layers,
    keywords: ['工业设计', '产品设计', '外观', 'CMF', '用户体验', 'UX'],
  },
  {
    id: 'devops',
    name: 'DevOps / 工具链',
    icon: Wrench,
    keywords: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '自动化'],
  },
  {
    id: 'communication',
    name: '通信协议',
    icon: Radio,
    keywords: ['通信', '星闪', 'NearLink', 'CAN', 'UART', 'SPI', 'I2C', '无线'],
  },
  {
    id: 'system',
    name: '系统架构',
    icon: Server,
    keywords: ['系统架构', 'BSP', 'Linux', 'openEuler', '混合关键系统', '实时系统'],
  },
  {
    id: 'localization',
    name: '定位导航',
    icon: Target,
    keywords: ['定位', '导航', 'SLAM', '里程计', 'IMU', 'GPS', 'UWB'],
  },
]

function deriveModules(tags: string[] = []): TechModule[] {
  const matched = new Set<string>()
  const result: TechModule[] = []
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase()
    for (const mod of TECH_MODULES) {
      if (matched.has(mod.id)) continue
      if (mod.keywords.some(k => lowerTag.includes(k.toLowerCase()))) {
        matched.add(mod.id)
        result.push(mod)
      }
    }
  }
  return result.slice(0, 6)
}

function SkillBars({ skills }: { skills?: { name: string; level: number }[] }) {
  if (!skills || skills.length === 0) return null
  return (
    <div className="space-y-3">
      {skills.map(skill => (
        <div key={skill.name} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-foreground">{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ModuleTopology({
  modules,
  memberName,
}: {
  modules: TechModule[]
  memberName: string
}) {
  if (modules.length === 0) return null

  const radius = 78
  const centerX = 100
  const centerY = 100
  const angleStep = (2 * Math.PI) / modules.length

  return (
    <div className="relative w-full aspect-square max-w-[220px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {modules.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth="1"
            />
          )
        })}

        <circle
          cx={centerX}
          cy={centerY}
          r="26"
          fill="hsl(var(--primary) / 0.12)"
          stroke="hsl(var(--primary) / 0.5)"
          strokeWidth="2"
        />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary text-[10px] font-semibold"
        >
          {memberName.slice(0, 4)}
        </text>

        {modules.map((mod, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          return (
            <g key={mod.id}>
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="hsl(var(--card))"
                stroke="hsl(var(--primary) / 0.35)"
                strokeWidth="1.5"
              />
              <foreignObject x={x - 8} y={y - 8} width="16" height="16">
                <div className="flex items-center justify-center w-full h-full">
                  <mod.icon className="w-4 h-4 text-primary" />
                </div>
              </foreignObject>
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                className="fill-foreground text-[9px] font-medium"
              >
                {mod.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function ProjectResponsibilityCard({
  project,
}: {
  project: NonNullable<TeamMember['projects']>[number]
}) {
  const detail = getProjectById(project.id)
  const href =
    project.url ||
    detail?.projectUrl ||
    detail?.githubUrl ||
    `/projects#project-${project.id}`
  const isExternal = href.startsWith('http')

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-foreground text-sm truncate">
              {project.name}
            </h4>
            <p className="text-xs text-primary/80 mt-0.5">{project.role}</p>
          </div>
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            aria-label="项目详情"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        {detail?.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {detail.description}
          </p>
        )}
        {detail?.technologies && detail.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {detail.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function MemberTechDetail({
  member,
  open,
  onOpenChange,
}: MemberTechDetailProps) {
  if (!member) return null

  const modules = deriveModules(member.tags)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{member.name} - 技术责任详情</DialogTitle>
          <DialogDescription>{member.role}</DialogDescription>
        </DialogHeader>

        {/* Header */}
        <div className="relative">
          <div className="h-36 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30" />
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4">
              <Avatar className="w-28 h-28 rounded-full border-4 border-background shadow-xl bg-muted">
                <ImageProxy
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.avatarStyle === 'bilevel' ? 'avatar-bilevel' : ''}`}
                  fallbackSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
                />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20">
                  {member.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {member.name}
                </h2>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-primary/10 text-primary border-primary/20"
                >
                  {member.role}
                </Badge>
              </div>

              <div className="flex gap-2">
                {member.gitee && (
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <a
                      href={member.gitee}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Gitee"
                    >
                      <GiteeIcon className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.github && (
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.bonjour && (
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <a
                      href={member.bonjour}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Bonjour"
                    >
                      <img src={BonjourIcon} alt="Bonjour" className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.linkedin && (
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.email && (
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <a href={`mailto:${member.email}`} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Tech Responsibility Map */}
        {modules.length > 0 && (
          <div className="px-6 py-5 border-t border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              技术责任图谱
            </h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <ModuleTopology modules={modules} memberName={member.name} />
              <div className="space-y-2">
                {modules.map(mod => (
                  <div
                    key={mod.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <mod.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{mod.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {member.skills && member.skills.length > 0 && (
          <div className="px-6 py-5 border-t border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              技能深度
            </h3>
            <SkillBars skills={member.skills} />
          </div>
        )}

        {/* Tags */}
        {member.tags && member.tags.length > 0 && (
          <div className="px-6 py-5 border-t border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              技术标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-3 py-1 bg-primary/5 hover:bg-primary/10 border-primary/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {member.projects && member.projects.length > 0 && (
          <div className="px-6 py-5 border-t border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              代表作 / 负责项目
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {member.projects.map(project => (
                <ProjectResponsibilityCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-6 py-4 border-t border-border/50 bg-muted/30">
          <a
            href="/projects"
            className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Rocket className="h-4 w-4" />
            查看全部项目
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
