import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Mail, BarChart3, Users, Code, Palette, Heart } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { useState } from 'react'
import TeamPhoto1 from '@/image/校门合照.jpg'
import TeamPhoto2 from '@/image/横向项目合照.jpg'

interface TeamMemberCardProps {
  member: {
    name: string
    role: string
    bio: string
    image: string
    tags?: string[]
    github?: string
    linkedin?: string
    email?: string
  }
  isSponsors?: boolean
  selectedRatio?: AspectRatio
}

function TeamMemberCard({ member, isSponsors, selectedRatio = 'aspect-[3/4]' }: TeamMemberCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 shadow-lg">
      <div className="relative overflow-hidden">
        <div className={isSponsors ? "h-[88px] w-auto" : `${selectedRatio} overflow-hidden relative`}>
          <Avatar className={isSponsors ? "h-[88px] w-auto rounded-none" : "w-full h-full rounded-none"}>
          <AvatarImage 
            src={member.image} 
            alt={member.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
        <CardDescription className="text-base font-medium">
          <Badge variant="secondary" className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground dark:bg-primary/30 dark:text-white">
            {member.role}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground dark:text-gray-200 text-center mb-4 leading-relaxed drop-shadow-sm">
          {member.bio}
        </p>
        
        {/* 技术栈标签 - 优化版本 */}
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
  const isSponsors = title.includes('Sponsor') || title.includes('赞助');
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

export function TeamPage() {
  const t = useTranslation()
  // 显示比例状态管理 - 控制团队成员卡片图片的宽高比显示
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      {/* Background with team photos */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/85 dark:from-background/95 dark:to-background/90"></div>
        <img
          src={TeamPhoto1}
          alt="团队校门合照"
          className="w-full h-full object-cover opacity-20 dark:opacity-25"
          onError={(e) => {
            (e.target as HTMLImageElement).src = TeamPhoto2
          }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/90 backdrop-blur-md border-primary/30 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">维护者</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t.team.maintainers?.length || 0}</div>
                <p className="text-xs text-muted-foreground">核心团队成员</p>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-md border-primary/30 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">开发者</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t.team.developers?.length || 0}</div>
                <p className="text-xs text-muted-foreground">技术开发人员</p>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-md border-primary/30 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">设计师</CardTitle>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t.team.designers?.length || 0}</div>
                <p className="text-xs text-muted-foreground">UI/UX设计师</p>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-md border-primary/30 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">贡献者</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t.team.contributors?.length || 0}</div>
                <p className="text-xs text-muted-foreground">社区贡献者</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics Table */}
          <Card className="bg-card/90 backdrop-blur-md border-primary/30 shadow-lg">
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
                    <TableCell className="text-center">{t.team.maintainers?.length || 0}</TableCell>
                    <TableCell className="text-center">
                      {((t.team.maintainers?.length || 0) / 
                        ((t.team.maintainers?.length || 0) + 
                         (t.team.developers?.length || 0) + 
                         (t.team.designers?.length || 0) + 
                         (t.team.contributors?.length || 0)) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>项目管理、代码审核、技术决策</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">开发者</TableCell>
                    <TableCell className="text-center">{t.team.developers?.length || 0}</TableCell>
                    <TableCell className="text-center">
                      {((t.team.developers?.length || 0) / 
                        ((t.team.maintainers?.length || 0) + 
                         (t.team.developers?.length || 0) + 
                         (t.team.designers?.length || 0) + 
                         (t.team.contributors?.length || 0)) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>功能开发、Bug修复、技术实现</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">设计师</TableCell>
                    <TableCell className="text-center">{t.team.designers?.length || 0}</TableCell>
                    <TableCell className="text-center">
                      {((t.team.designers?.length || 0) / 
                        ((t.team.maintainers?.length || 0) + 
                         (t.team.developers?.length || 0) + 
                         (t.team.designers?.length || 0) + 
                         (t.team.contributors?.length || 0)) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>界面设计、用户体验、视觉规范</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">贡献者</TableCell>
                    <TableCell className="text-center">{t.team.contributors?.length || 0}</TableCell>
                    <TableCell className="text-center">
                      {((t.team.contributors?.length || 0) / 
                        ((t.team.maintainers?.length || 0) + 
                         (t.team.developers?.length || 0) + 
                         (t.team.designers?.length || 0) + 
                         (t.team.contributors?.length || 0)) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>文档编写、测试反馈、社区支持</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
