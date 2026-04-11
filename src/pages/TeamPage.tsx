import { Carousel } from '@/components/ui/Carousel'
import { AspectRatio } from '@/types/ui'
import React, { useState, useMemo } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, Code, Palette, Heart, ExternalLink, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Header } from '@/components/layout/Header'
import ChangzhouNECImg from '@/常州工NEC1.png'
import CURCRobocon1Img from '@/1.19CURC-ROBOCON线上例会_01(1).png'
import CURCRobocon2Img from '@/1.20CURC-ROBOCON线上例会2_03.png'
import { Sponsor, SponsorLevel } from '@/lib/i18n/constants/team'

// 团队照片使用 public 目录下的资源
const TeamPhoto1 = '/image/校门合照.jpg'
const TeamPhoto2 = '/image/横向项目合照.jpg'
const TeamPhoto3 = '/image/合照1.jpg'
const TeamPhoto4 = '/image/合照2.jpg'
const TeamPhoto5 = '/image/合照3.jpg'
const TeamPhoto6 = '/image/合照4.jpg'
const RoboconTraining = '/image/2026ROBOCON技术培训（常州工学院）_01.png'
const RCBBActivity = '/image/合照1.jpg'

// 已移除Three.js，保留GIF版本动画组件
import GifAnimation from '@/components/ui/GifAnimation'

// 团队照片配置
const TEAM_PHOTOS = [
  { src: TeamPhoto3, alt: "团队合照1" },
  { src: TeamPhoto4, alt: "团队合照2" },
  { src: TeamPhoto5, alt: "团队合照3" },
  { src: TeamPhoto6, alt: "团队合照4" }
]

// 团队成员数据类型定义
interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  tags?: string[]
  gitee?: string
  github?: string
  linkedin?: string
  email?: string
  bonjour?: string
}

// 团队成员卡片组件属性
interface TeamMemberCardProps {
  member: TeamMember
  roleBadge: 'core' | 'developer' | 'contributor'
}

// 角色徽章颜色配置
const ROLE_BADGE_STYLES = {
  core: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
  developer: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
  contributor: "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
}

function TeamMemberCard({ member, roleBadge }: TeamMemberCardProps) {
  return (
    <Card className="group overflow-hidden border border-gray-200 dark:border-gray-700 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm
      flex flex-col h-full min-h-[400px]">
      
      {/* 头像区域 - 统一规范 */}
      <div className="pt-6 pb-4 flex justify-center">
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-md 
            border-2 border-primary/20 group-hover:border-primary/40 transition-all
            bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <img 
              src={member.image} 
              alt={member.name}
              className="object-cover w-full h-full grayscale-[20%] group-hover:grayscale-0 
                group-hover:scale-105 transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=e2e8f0`
              }}
            />
          </div>
          {roleBadge === 'core' && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">★</span>
            </div>
          )}
        </div>
      </div>

      {/* 内容区域 - 严格控制高度 */}
      <CardContent className="flex-1 flex flex-col px-5 py-0 min-h-0">
        {/* 姓名 - 固定高度 */}
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-1 truncate">
          {member.name}
        </h3>
        
        {/* 角色标签 - 固定高度 */}
        <div className="flex justify-center mb-2 h-6">
          <Badge variant="outline" className={`text-xs px-2 py-0.5 whitespace-nowrap ${ROLE_BADGE_STYLES[roleBadge]}`}>
            {member.role}
          </Badge>
        </div>
        
        {/* 简介 - 严格限制3行 */}
        {member.bio && (
          <div className="flex-1 min-h-[60px] max-h-[60px] overflow-hidden mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          </div>
        )}
        
        {/* 标签 - 固定显示3个，确保对齐 */}
        <div className="h-6 flex flex-wrap gap-1 justify-center mb-3">
          {(member.tags || []).slice(0, 3).map((tag, index) => (
            <span key={index} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700">
              {tag}
            </span>
          ))}
        </div>
        
        {/* 技能熟练度条 - 填充底部留白 */}
        <div className="mt-auto pt-3 pb-3 space-y-2">
          {(member.tags || []).slice(0, 2).map((tag, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 w-16 truncate">{tag}</span>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  style={{ width: `${[85, 70, 90][index % 3]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 社交链接 - 带悬停提示 */}
        <div className="flex justify-center gap-2 pt-2 pb-2 border-t border-gray-100 dark:border-gray-800">
          {member.github && (
            <a 
              href={member.github} 
              target="_blank" 
              rel="noopener noreferrer"
              title="查看 GitHub"
              className="w-8 h-8 rounded-full flex items-center justify-center 
                text-gray-400 hover:text-white hover:bg-gray-900 
                dark:hover:bg-white dark:hover:text-gray-900
                transition-all duration-200 group/icon"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              title="发送邮件"
              className="w-8 h-8 rounded-full flex items-center justify-center 
                text-gray-400 hover:text-primary hover:bg-primary/10 
                transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 赞助商等级徽章样式
const SPONSOR_LEVEL_STYLES: Record<SponsorLevel, { badge: string; name: string }> = {
  strategic: { 
    badge: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0",
    name: "战略合作伙伴"
  },
  gold: { 
    badge: "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-0",
    name: "Gold Sponsor"
  },
  silver: { 
    badge: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 border-0",
    name: "Silver Sponsor"
  },
  bronze: { 
    badge: "bg-gradient-to-r from-orange-400 to-amber-600 text-white border-0",
    name: "Bronze Sponsor"
  },
  partner: { 
    badge: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0",
    name: "Community Partner"
  }
}

// 赞助商卡片组件
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const levelStyle = SPONSOR_LEVEL_STYLES[sponsor.level];
  
  return (
    <Card className="group overflow-hidden border border-gray-200 dark:border-gray-700 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      
      {/* Logo 区域 - 统一尺寸 */}
      <div className="p-6 flex justify-center items-center h-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="relative w-32 h-16 flex items-center justify-center">
          {sponsor.image ? (
            <img 
              src={sponsor.image} 
              alt={`${sponsor.name} logo`}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                // Logo 加载失败时显示文字
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <span className={`text-lg font-bold text-center text-gray-400 ${sponsor.image ? 'hidden' : ''}`}>
            {sponsor.name}
          </span>
        </div>
      </div>
      
      <CardContent className="p-5">
        {/* 赞助商名称 */}
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          {sponsor.name}
        </h3>
        
        {/* 等级徽章 */}
        <div className="flex justify-center mb-3">
          <Badge className={`text-xs px-3 py-1 font-semibold ${levelStyle.badge}`}>
            {levelStyle.name}
          </Badge>
        </div>
        
        {/* 简介 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">
          {sponsor.bio}
        </p>
        
        {/* 支持内容 - 核心改进 */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 uppercase tracking-wider">支持内容</p>
          <ul className="space-y-1.5">
            {sponsor.supports.slice(0, 3).map((support, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  {support.item}
                  {support.quantity && (
                    <span className="text-xs text-gray-500 ml-1">({support.quantity})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 访问链接 */}
        {sponsor.website && sponsor.website !== '#' && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a 
              href={sponsor.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              访问官网
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 角色筛选类型（仅人员）
type RoleFilter = 'all' | 'core' | 'developer' | 'designer' | 'contributor'

interface TeamSectionProps { 
  title: string
  members: TeamMember[]
  roleBadge: 'core' | 'developer' | 'contributor'
  filter: RoleFilter
}

function TeamSection({ title, members, roleBadge, filter }: TeamSectionProps) {
  // 如果设置了筛选且不匹配，则不显示
  if (filter !== 'all' && filter !== roleBadge && !(filter === 'designer' && roleBadge === 'developer')) {
    return null
  }
  
  if (!members || members.length === 0) return null

  // 6人强制使用3×2或2×3布局，避免4+2的尴尬缺口
  const getGridCols = (count: number) => {
    if (count === 6) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2'
    if (count <= 3) return 'grid-cols-1 md:grid-cols-3'
    if (count <= 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <section className="mb-12">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{members.length} 人</p>
      </div>
      <div className={`grid ${getGridCols(members.length)} gap-5 max-w-5xl mx-auto`}>
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} roleBadge={roleBadge} />
        ))}
      </div>
    </section>
  )
}

// 统计卡片组件
function StatCard({ title, count, description, icon: Icon }: { title: string; count: number; description: string; icon: any }) {
  return (
    <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </Card>
  )
}

export function TeamPage() {
  const t = useTranslation()
  const [selectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')

  // 统计计算
  const teamStats = useMemo(() => {
    const counts = {
      maintainers: (t.team.maintainers?.length || 0) + (t.team.preMaintainers?.length || 0),
      developers: (t.team.developers?.length || 0) + (t.team.designers?.length || 0),
      contributors: t.team.contributors?.length || 0
    }
    const total = counts.maintainers + counts.developers + counts.contributors
    return { counts, total }
  }, [t.team])

  // 轮播图片
  const carouselImages = useMemo(() => [
    { src: TeamPhoto2, alt: "团队横向项目合照", description: t.team.teamPhotoDescription },
    { src: RoboconTraining, alt: "2026 ROBOCON技术培训", description: "2026 ROBOCON技术培训（常州工NEC）" },
    { src: ChangzhouNECImg, alt: "常州工NEC", description: "常州工NEC团队" },
    { src: CURCRobocon1Img, alt: "CURC-ROBOCON线上例会", description: "1.19 CURC-ROBOCON线上例会" },
    { src: CURCRobocon2Img, alt: "CURC-ROBOCON线上例会2", description: "1.20 CURC-ROBOCON线上例会" },
    { src: RCBBActivity, alt: "罗马车圈活动", description: "2601罗马车圈活动" },
    ...TEAM_PHOTOS.map(photo => ({ src: photo.src, alt: photo.alt }))
  ], [t.team.teamPhotoDescription])

  // 人员筛选按钮
  const filterButtons: { key: RoleFilter; label: string; count: number }[] = [
    { key: 'all', label: '全部成员', count: teamStats.total },
    { key: 'core', label: '核心团队', count: teamStats.counts.maintainers },
    { key: 'developer', label: '开发设计', count: teamStats.counts.developers },
    { key: 'contributor', label: '贡献者', count: teamStats.counts.contributors },
  ]

  // 获取赞助商数据
  const sponsors = t.team.sponsors as Sponsor[] || []

  // 按等级分组赞助商
  const sponsorsByLevel = useMemo(() => {
    const grouped: Record<SponsorLevel, Sponsor[]> = {
      strategic: [],
      gold: [],
      silver: [],
      bronze: [],
      partner: []
    }
    sponsors.forEach(s => {
      if (grouped[s.level]) {
        grouped[s.level].push(s)
      }
    })
    return grouped
  }, [sponsors])

  // 生成招商手册图片列表
  const brochureImages = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => ({
      src: `/image/brochures/brochure-${String(i + 1).padStart(2, '0')}.png.png`,
      alt: `招商手册第 ${i + 1} 页`
    }));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 via-primary/2 to-transparent"></div>
        </div>
      
        <div className="container py-12 relative z-10">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground dark:text-white">
              {t.team.title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.team.description}
            </p>
          </div>

          {/* 人员区域 */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">社区成员</h2>
              
              {/* 人员筛选器 */}
              <div className="flex flex-wrap gap-2">
                {filterButtons.map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setRoleFilter(btn.key)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                      ${roleFilter === btn.key 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    {btn.label}
                    <span className={`ml-1.5 text-xs ${roleFilter === btn.key ? 'text-primary-foreground/80' : 'text-gray-400'}`}>
                      {btn.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 团队成员网格 */}
            <TeamSection 
              title="核心团队"
              members={[...(t.team.maintainers || []), ...(t.team.preMaintainers || [])]} 
              roleBadge="core"
              filter={roleFilter}
            />
            <TeamSection 
              title="开发设计"
              members={[...(t.team.developers || []), ...(t.team.designers || [])]} 
              roleBadge="developer"
              filter={roleFilter}
            />
            <TeamSection 
              title="社区贡献者"
              members={t.team.contributors || []} 
              roleBadge="contributor"
              filter={roleFilter}
            />
          </div>

          {/* 赞助商区域 - 独立展示 */}
          {sponsors.length > 0 && (
            <div className="mb-16 pt-12 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">合作伙伴 & 赞助商</h2>
                </div>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  感谢以下组织为 NEC 社区提供的技术支持与资源赞助
                </p>
              </div>

              {/* 按等级分组展示 */}
              <div className="space-y-10">
                {/* 战略合作伙伴 */}
                {sponsorsByLevel.strategic.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm">
                        战略合作伙伴
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {sponsorsByLevel.strategic.map((sponsor, idx) => (
                        <SponsorCard key={idx} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Gold Sponsors */}
                {sponsorsByLevel.gold.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 text-sm">
                        Gold Sponsors
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {sponsorsByLevel.gold.map((sponsor, idx) => (
                        <SponsorCard key={idx} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Silver & Bronze */}
                {(sponsorsByLevel.silver.length > 0 || sponsorsByLevel.bronze.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 text-sm">
                        Silver & Bronze
                      </span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[...sponsorsByLevel.silver, ...sponsorsByLevel.bronze].map((sponsor, idx) => (
                        <SponsorCard key={idx} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Partners */}
                {sponsorsByLevel.partner.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-sm">
                        Community Partners
                      </span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {sponsorsByLevel.partner.map((sponsor, idx) => (
                        <SponsorCard key={idx} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 成为赞助商 CTA */}
              <div className="mt-12 text-center">
                <Card className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">成为我们的合作伙伴</h4>
                    <p className="text-sm text-muted-foreground">支持开源工程教育，与 NEC 社区共同成长</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <a href="mailto:22230635@czu.cn">
                        <Heart className="h-4 w-4 mr-2" />
                        联系我们
                      </a>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          查看招商手册
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                        <DialogHeader>
                          <DialogTitle>招商手册</DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 min-h-0 overflow-y-auto p-4">
                          <div className="flex flex-col items-center gap-4">
                            {brochureImages.map((image, index) => (
                              <img
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto rounded-md shadow-lg"
                              />
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* 统计分析 */}
          <div className="mb-12 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">社区数据</h2>
              <p className="text-muted-foreground">{t.team.analytics.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard title="核心团队" count={teamStats.counts.maintainers} description="项目维护者" icon={Users} />
              <StatCard title="开发设计" count={teamStats.counts.developers} description="技术实现" icon={Code} />
              <StatCard title="贡献者" count={teamStats.counts.contributors} description="社区参与" icon={Palette} />
              <StatCard title="合作伙伴" count={sponsors.length} description="赞助商与伙伴" icon={Building2} />
            </div>
          </div>

          {/* 团队照片 */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t.team.teamPhoto}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Carousel images={carouselImages} />
            </div>
          </div>

          {/* 萝马车圈 */}
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                <a href="https://rcbbs.top/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  萝马车圈
                </a>
              </h2>
              <p className="text-muted-foreground">RCBB 机器人竞赛技术社区</p>
            </div>
            <GifAnimation />
          </div>
        </div>
      </div>
    </div>
  )
}
