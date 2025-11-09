import { FloatingControls } from '@/components/ui/floating-controls'
import { AspectRatio } from '@/types/ui'
import React from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Mail, BarChart3, Users, Code, Palette, Heart, Phone } from 'lucide-react'
import BonjourIcon from '@/bonjour.ico?url'
import GithubIcon from '@/github.ico?url'
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
import MettaLogo from '@/image/sponsor/麦塔智能.png?url'
import AmassLogo from '@/image/sponsor/Amass.png?url'
import BenqLogo from '@/image/sponsor/benq-logo.png?url'
import YibainaLogo from '@/image/sponsor/易百纳.png?url'
import RCBBLogo from '@/RCBB.png?url'
// 已移除Three.js，保留GIF版本动画组件
import GifAnimation from '@/components/ui/GifAnimation'

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
  gitee?: string
  github?: string
  linkedin?: string
  email?: string
  bonjour?: string
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
         <CardTitle className="text-xl text-foreground dark:text-white drop-shadow-md">
           {member.github ? (
             <a
               href={member.github}
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline"
             >
               {member.name}
             </a>
           ) : (
             member.name
           )}
         </CardTitle>
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
          {member.gitee && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.gitee} target="_blank" rel="noopener noreferrer">
                <GiteeIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.github && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <img src={GithubIcon} alt="GitHub" className="h-4 w-4 object-contain dark:invert" />
              </a>
            </Button>
          )}
          {member.bonjour && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.bonjour} target="_blank" rel="noopener noreferrer" aria-label="Bonjour profile">
                <img src={BonjourIcon} alt="Bonjour" className="h-4 w-4" />
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

  // 仅将中文角引号「」着色为主题色，其余文本保持原样
  const renderBracketStyled = (text: string) => {
    return (
      <>
        {Array.from(text).map((ch, idx) => {
          if (ch === '「' || ch === '」') {
            return (
              <span key={idx} className="text-primary">{ch}</span>
            )
          }
          return <span key={idx}>{ch}</span>
        })}
      </>
    )
  }

  // 将长段说明文字按句分段，以提升可读性
  const renderDescriptionParagraphs = (text: string) => {
    // 以中英文常见句末符号为分隔，保留句末并按句渲染
    const sentences = text
      .split(/(?<=[。.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean)

    const renderCurlyEmphasis = (t: string) => {
      const targetPhrase = "如何让世界更高效、更清洁";
      const actionSentenceRegex = /^我们，是一个行动动词/;
      const englishFuturePhrase = "a greener, fairer, and smarter future";

      if (t.includes(targetPhrase)) {
        const parts = t.split(targetPhrase);
        return (
          <>
            {renderBracketStyled(parts[0])}
            <span className="text-primary font-bold">{"{ "}</span>
            <span className="font-bold">{targetPhrase}</span>
            <span className="text-primary font-bold">{" }"}</span>
            {renderBracketStyled(parts.slice(1).join(targetPhrase))}
          </>
        );
      }

      if (actionSentenceRegex.test(t)) {
        const hasPeriod = /。$/.test(t);
        const core = hasPeriod ? t.replace(/。$/, "") : t;
        return (
          <>
            <span className="text-primary font-bold">{"{ "}</span>
            <span className="text-primary font-bold">{core}</span>
            <span className="text-primary font-bold">{" }"}</span>
            {hasPeriod && <span>。</span>}
          </>
        );
      }

      // 英文短语强调：将 "a greener, fairer, and smarter future" 加粗并设置主题色
      if (t.includes(englishFuturePhrase)) {
        const parts = t.split(englishFuturePhrase);
        return (
          <>
            {renderBracketStyled(parts[0])}
            <span className="text-primary font-bold">{englishFuturePhrase}</span>
            {renderBracketStyled(parts.slice(1).join(englishFuturePhrase))}
          </>
        );
      }

      return renderBracketStyled(t);
    }

    return sentences.map((s, idx) => {
      let cls = "mt-2 text-muted-foreground leading-relaxed tracking-wide"
      // 新增：将“一群在代码与梦想交汇处相遇的人。”加粗
      if (/^一群在代码与梦想交汇处相遇的人/.test(s)) {
        cls = "mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      // 用户要求：以下两句加粗
      if (/^我们不同——/.test(s) || /^但我们相同——/.test(s)) {
        cls = "mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      // 用户要求：“我们，是一个行动动词。” 改为主题色的加粗文字
      if (/^我们，是一个行动动词/.test(s)) {
        cls = "mt-2 leading-relaxed tracking-wide font-bold text-primary"
      }
      // 英文版本：将 “Yet we are the same — we believe in technology for good, in the power of youth, and that sustainability is not a choice but a necessity.” 这句加粗
      if (/^Yet we are the same — we believe in technology for good/.test(s)) {
        cls = "mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }

      return (
        <p key={idx} className={cls}>
          {renderCurlyEmphasis(s)}
        </p>
      )
    })
  }

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
        {/* Light mode background uses external image, dark mode keeps local photo */}
        <img
          src="https://darrenpig.github.io/files/news10.jpg"
          alt="社区背景图"
          className="w-full h-full object-cover opacity-20 block dark:hidden"
          onError={(e) => {
            (e.target as HTMLImageElement).src = TeamPhoto1
          }}
        />
        <img
          src={TeamPhoto1}
          alt="团队校门合照"
          className="w-full h-full object-cover opacity-25 hidden dark:block"
          onError={(e) => {
            (e.target as HTMLImageElement).src = TeamPhoto2
          }}
        />
      </div>
      
      <div className="container py-12 relative z-20">
        {/* Hero Section with Theme Toggle */}
        <div className="mb-12 relative">
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="default"
              className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-xl md:text-2xl font-bold shadow hover:glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`{ ${t.about.title} }`}
            >
              {`{ ${t.about.title} }`}
            </Button>
            <ThemeToggle />
          </div>
          <div className="mt-4"></div>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-200 drop-shadow-md">
            {renderDescriptionParagraphs(t.team.description)}
          </div>
          {/* 用户要求：在 img 下面增加图片 https://darrenpig.github.io/files/news10.jpg */}
          <div className="mt-6 max-w-4xl mx-auto">
            <img
              src="https://darrenpig.github.io/files/news10.jpg"
              alt="社区展示图"
              className="w-full h-auto object-contain rounded-lg shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = TeamPhoto2
              }}
            />
          </div>
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
              给予我们帮助的合作伙伴
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-6">
              麦塔科技 艾迈斯 易百纳社区 明基
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
          </div>
          
          {/* Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-12">
            {[
              { name: '麦塔科技', logo: MettaLogo, website: 'https://www.myactuator.cn/' },
              { name: '艾迈斯', logo: AmassLogo, website: 'https://www.china-amass.com/' },
              { name: '易百纳社区', logo: YibainaLogo, website: 'https://www.ebaina.com/' },
              { name: '明基', logo: BenqLogo, website: 'https://www.benq.com.cn/' }
            ].map((sponsor, index) => (
              <div key={index} className="group">
                {sponsor.website ? (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${sponsor.name} 官网`}>
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 p-6">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                          {sponsor.logo ? (
                            <img
                              src={sponsor.logo}
                              alt={`${sponsor.name} logo`}
                              className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                              {sponsor.name}
                            </span>
                          )}
                        </div>
                        {sponsor.logo && (
                          <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                            {sponsor.name}
                          </span>
                        )}
                      </div>
                    </Card>
                  </a>
                ) : (
                  <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 p-6">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                            {sponsor.name}
                          </span>
                        )}
                      </div>
                      {sponsor.logo && (
                        <span className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                          {sponsor.name}
                        </span>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Sponsor CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/30 p-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-4">
                <Heart className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground dark:text-white">
                  成为我们的合作伙伴
                </h3>
                <p className="text-muted-foreground dark:text-gray-300 text-center max-w-lg">
                  如果您的企业或组织愿意支持新能源编程俱乐部的发展，欢迎联系我们了解合作机会
                </p>
                <div className="mt-1 flex flex-wrap justify-center gap-3">
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
                  <Button 
                    variant="outline" 
                    className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    asChild
                  >
                    <a href="tel:+8615896000818">
                      <Phone className="h-4 w-4 mr-2" />
                      电话：+86 15896000818
                    </a>
                  </Button>
                </div>
                <div className="mt-2 text-center space-y-1">
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    电话：<span className="font-medium text-foreground dark:text-white">+86 15896000818</span>
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    微信 WeChat：<span className="font-medium text-foreground dark:text-white">Pei-pei-Zhu-Pig</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Three.js Animation Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
              <a href="https://rcbbs.top/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                萝马车圈
              </a>
            </h2>
            {/* RCBB 图片展示：置于标题下方 */}
            <div className="flex justify-center mb-6">
              <img
                src={RCBBLogo}
                alt="萝马车圈 RCBB"
                className="w-full h-auto max-w-[1600px] drop-shadow"
              />
            </div>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-6">
              <span className="text-primary font-semibold mr-2">网页链接：</span>
              <a href="https://rcbbs.top/" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80 transition-colors">
                https://rcbbs.top/
              </a>
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm mb-8"></div>
          </div>
        <GifAnimation />
        </div>
      </div>
    </div>
    </div>
  )
}
