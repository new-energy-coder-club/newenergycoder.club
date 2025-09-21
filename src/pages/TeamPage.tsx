import { FloatingControls } from '@/components/ui/floating-controls'
import { AspectRatio } from '@/types/ui'
import React from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Mail, BarChart3, Users, Code, Palette, Heart } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ImageProxy } from '@/components/ui/image-proxy'
import { Header } from '@/components/layout/Header'
import { useState, useMemo } from 'react'
import TeamPhoto1 from '@/image/校门合照.jpg?url'
import TeamPhoto2 from '@/image/横向项目合照.jpg?url'
import TeamPhoto3 from '@/image/合照1.jpg?url'
import TeamPhoto4 from '@/image/合照2.jpg?url'
import TeamPhoto5 from '@/image/合照3.jpg?url'
import TeamPhoto6 from '@/image/合照4.jpg?url'

// 样式常量定义
const CARD_STYLES = {
  base: "group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 shadow-lg",
  analytics: "bg-card/90 backdrop-blur-md border-primary/30 shadow-lg",
  photo: "bg-card/90 backdrop-blur-md border-primary/30 shadow-lg overflow-hidden"
}

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
  github?: string
  linkedin?: string
  email?: string
}

// 团队成员卡片组件属性
interface TeamMemberCardProps {
  member: TeamMember
  isSponsors?: boolean
  selectedRatio?: AspectRatio
}

function TeamMemberCard({ member, isSponsors, selectedRatio = 'aspect-[3/4]' }: TeamMemberCardProps) {
  return (
    <Card className={CARD_STYLES.base}>
      <div className="relative overflow-hidden">
        <div className={isSponsors ? "h-[88px] w-auto" : `${selectedRatio} overflow-hidden relative`}>
          <Avatar className={isSponsors ? "h-[88px] w-auto rounded-none" : "w-full h-full rounded-none"}>
          <ImageProxy 
            src={member.image} 
            alt={member.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            fallbackSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
          />
          <AvatarFallback className="w-full h-full rounded-none text-2xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20">
            {member.name.slice(0, 2)}
          </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="text-center relative z-10">
         <CardTitle className="text-xl text-foreground dark:text-white drop-shadow-md">{member.name}</CardTitle>
         <div className="text-base font-medium flex justify-center">
           <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
             {member.role}
           </Badge>
         </div>
       </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground dark:text-gray-200 text-center mb-4 leading-relaxed drop-shadow-sm">
          {member.bio}
        </p>
        
        {/* 技术栈标签 */}
        {member.tags && member.tags.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-muted-foreground dark:text-gray-300 mb-2 text-center drop-shadow-sm">技能标签</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-3 py-1.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 hover:from-primary/30 hover:via-secondary/30 hover:to-primary/30 transition-all duration-300 border-primary/30 hover:border-primary/50 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/20 font-medium cursor-default shadow-sm hover:shadow-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-2">
          {member.github && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <GiteeIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.linkedin && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.email && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TeamSection({ title, members, selectedRatio }: { title: string; members: any[]; selectedRatio?: AspectRatio }) {
  const isSponsors = title.includes('Sponsor') || title.includes('赞助')
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} isSponsors={isSponsors} selectedRatio={selectedRatio} />
        ))}
      </div>
    </section>
  )
}

// 统计卡片组件属性类型
interface StatCardProps {
  title: string
  count: number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

// 统计卡片组件
function StatCard({ title, count, description, icon: Icon }: StatCardProps) {
  return (
    <Card className={CARD_STYLES.analytics}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// 照片卡片组件属性类型
interface PhotoCardProps {
  src: string
  alt: string
}

// 图片卡片组件
function PhotoCard({ src, alt }: PhotoCardProps) {
  return (
    <Card className={CARD_STYLES.photo}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <ImageProxy
            src={src}
            alt={alt}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            fallbackSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TeamPage() {
  const t = useTranslation()
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')

  // 使用 useMemo 优化统计计算
  const teamStats = useMemo(() => {
    const counts = {
      maintainers: t.team.maintainers?.length || 0,
      developers: t.team.developers?.length || 0,
      designers: t.team.designers?.length || 0,
      contributors: t.team.contributors?.length || 0
    }
    
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
    
    const percentages = Object.fromEntries(
      Object.entries(counts).map(([key, count]) => [
        key,
        total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
      ])
    )
    
    return { counts, percentages, total }
  }, [t.team.maintainers, t.team.developers, t.team.designers, t.team.contributors])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background with team photos */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/85 dark:from-background/95 dark:to-background/90"></div>
          <ImageProxy
            src={TeamPhoto1}
            alt="团队校门合照"
            className="w-full h-full object-cover opacity-20 dark:opacity-25"
            fallbackSrc={TeamPhoto2}
          />
        </div>
        
        <div className="container py-12 relative z-20">
        {/* Hero Section with Theme Toggle */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
            {t.about.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-200 drop-shadow-md">
            {t.team.description}
          </p>
        </div>

        {/* Team Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
            {t.team.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Team Sections */}
        <TeamSection title={t.team.maintainerTitle} members={t.team.maintainers} selectedRatio={selectedRatio} />
        <TeamSection title={t.team.developerTitle} members={t.team.developers} selectedRatio={selectedRatio} />
        <TeamSection title={t.team.designerTitle} members={t.team.designers} selectedRatio={selectedRatio} />
        <TeamSection title={t.team.contributorTitle} members={t.team.contributors} selectedRatio={selectedRatio} />
        <TeamSection title={t.team.sponsorTitle} members={t.team.sponsors} selectedRatio={selectedRatio} />

        {/* Team Analytics Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
                {t.team.analytics.title}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2">
              {t.team.analytics.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t.team.analytics.giteeReference}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {t.team.analytics.lastUpdated}: {new Date().toLocaleDateString('zh-CN')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <StatCard title="维护者" count={teamStats.counts.maintainers} description="核心团队成员" icon={Users} />
            <StatCard title="开发者" count={teamStats.counts.developers} description="技术开发人员" icon={Code} />
            <StatCard title="设计师" count={teamStats.counts.designers} description="UI/UX设计师" icon={Palette} />
            <StatCard title="贡献者" count={teamStats.counts.contributors} description="社区贡献者" icon={Heart} />
          </div>

          {/* Detailed Analytics Table */}
          <Card className={CARD_STYLES.analytics}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t.team.analytics.roleDistribution}</CardTitle>
              <CardDescription>{t.team.analytics.contributionStats}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>角色类型</TableHead>
                    <TableHead className="text-center">人数</TableHead>
                    <TableHead className="text-center">占比</TableHead>
                    <TableHead>{t.team.analytics.mainResponsibilities}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">维护者</TableCell>
                    <TableCell className="text-center">{teamStats.counts.maintainers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.maintainers}%</TableCell>
                    <TableCell>{t.team.analytics.maintainerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">开发者</TableCell>
                    <TableCell className="text-center">{teamStats.counts.developers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.developers}%</TableCell>
                    <TableCell>{t.team.analytics.developerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">设计师</TableCell>
                    <TableCell className="text-center">{teamStats.counts.designers}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.designers}%</TableCell>
                    <TableCell>{t.team.analytics.designerResponsibilities}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">贡献者</TableCell>
                    <TableCell className="text-center">{teamStats.counts.contributors}</TableCell>
                    <TableCell className="text-center">{teamStats.percentages.contributors}%</TableCell>
                    <TableCell>{t.team.analytics.contributorResponsibilities}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Team Project Photo Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              团队项目合照
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>
          
          <Card className={CARD_STYLES.photo}>
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={TeamPhoto2}
                  alt="团队横向项目合照"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-center text-muted-foreground dark:text-gray-200">
                  {t.team.teamPhotoDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Team Photos Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              更多团队合照
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_PHOTOS.map((photo, index) => (
              <PhotoCard key={index} src={photo.src} alt={photo.alt} />
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
            欢迎开发者们加入！   
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>
          
          {/* Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-12">
            {/* 赞助商数据将在未来添加 */}
            {[].map((sponsor, index) => (
              <div key={index} className="group">
                <a 
                  href={sponsor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 p-6">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                        <img 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                        {sponsor.name}
                      </span>
                    </div>
                  </Card>
                </a>
              </div>
            ))}
          </div>

          {/* Sponsor CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/30 p-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-4">
                <Heart className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground dark:text-white">
                  成为我们的赞助商
                </h3>
                <p className="text-muted-foreground dark:text-gray-300 text-center max-w-lg">
                  如果您的企业或组织愿意支持新能源编程俱乐部的发展，欢迎联系我们了解赞助合作机会
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  asChild
                >
                  <a href="mailto:22230635@czu.cn">
                    <Mail className="h-4 w-4 mr-2" />
                    联系我们
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* 添加首页动图展示 */}
        <div className="mt-16 mb-12">
          <Card className={CARD_STYLES.photo}>
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src="/src/NEC-home.gif"
                  alt="首页动图展示"
                  className="w-full h-auto object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}
