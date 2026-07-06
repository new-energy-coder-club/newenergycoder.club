import { AspectRatio } from '@/types/ui'
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, Code, Palette, Heart, ExternalLink, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ImageProxy } from '@/components/ui/image-proxy'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'
const TeamPhoto1 = 'https://cdn.newenergycoder.club/images/src/image/校门合照.jpg'
const TeamPhoto2 = 'https://cdn.newenergycoder.club/images/src/image/横向项目合照.jpg'
const TeamPhoto3 = 'https://cdn.newenergycoder.club/images/src/image/合照1.jpg'
const TeamPhoto4 = 'https://cdn.newenergycoder.club/images/src/image/合照2.jpg'
const TeamPhoto5 = 'https://cdn.newenergycoder.club/images/src/image/合照3.jpg'
const TeamPhoto6 = 'https://cdn.newenergycoder.club/images/src/image/合照4.jpg'
const RCBBLogo = 'https://cdn.newenergycoder.club/images/src/RCBB.png'
import GifAnimation from '@/components/ui/GifAnimation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import type { TeamMember as TeamMemberType } from '@/lib/i18n/types/translations'
import type { Sponsor } from '@/lib/i18n/constants/team'
import { maintainers, developers, designers, contributors, sponsors } from '@/lib/i18n/constants/team'
import { MemberTechDetail } from '@/components/team/MemberTechDetail'
import { MemberCard } from '@/components/team/MemberCard'

// 样式常量定义
const CARD_STYLES = {
  base: "team-card group overflow-hidden hover:shadow-lg transition-colors duration-300 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 shadow-lg",
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

// 赞助商等级徽章样式
const SPONSOR_LEVEL_STYLES: Record<Sponsor['level'], { badge: string; name: string }> = {
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
  const levelStyle = SPONSOR_LEVEL_STYLES[sponsor.level]

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
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                ;(e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden')
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

        {/* 支持内容 */}
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

// 过滤分类
const FILTER_CATEGORIES = ['all', 'maintainers', 'developers', 'designers', 'contributors'] as const
type FilterCategory = typeof FILTER_CATEGORIES[number]

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: '全部成员',
  maintainers: '核心团队',
  developers: '开发设计',
  designers: 'UI/UX',
  contributors: '贡献者'
}

// 成员徽章（头像 + @姓名）
function MemberBadge({ member }: { member: TeamMemberType }) {
  return (
    <a
      href={member.github || member.gitee || '#'}
      target={member.github || member.gitee ? '_blank' : undefined}
      rel={member.github || member.gitee ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-md bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0"
    >
      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-muted shrink-0">
        <ImageProxy
          src={member.image}
          alt={member.name}
          className={`w-full h-full object-cover ${member.avatarStyle === 'bilevel' ? 'avatar-bilevel' : ''}`}
          fallbackSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
        />
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        @{member.name}
      </span>
    </a>
  )
}

// 单行无限滚动 marquee
function MarqueeRow({
  members,
  reverse = false,
  duration = 40,
}: {
  members: TeamMemberType[]
  reverse?: boolean
  duration?: number
}) {
  const animationName = reverse ? 'marquee-right' : 'marquee-left'
  return (
    <div className="overflow-hidden py-1">
      <div
        className="flex w-max gap-2"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          transform: reverse ? 'translateX(-50%)' : undefined,
        }}
      >
        {members.map((member, index) => (
          <MemberBadge key={`a-${member.name}-${index}`} member={member} />
        ))}
        {members.map((member, index) => (
          <MemberBadge key={`b-${member.name}-${index}`} member={member} />
        ))}
      </div>
    </div>
  )
}

// 3 行交错滚动的成员条
function MemberStrip({ members }: { members: TeamMemberType[] }) {
  const row1 = members.filter((_, i) => i % 3 === 0)
  const row2 = members.filter((_, i) => i % 3 === 1)
  const row3 = members.filter((_, i) => i % 3 === 2)

  return (
    <div className="w-full pb-4">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <MarqueeRow members={row1} duration={45} />
      <MarqueeRow members={row2} reverse duration={55} />
      <MarqueeRow members={row3} duration={50} />
    </div>
  )
}

interface TeamSectionProps {
  title: string
  members: TeamMemberType[]
  selectedRatio?: AspectRatio
  variant?: 'featured' | 'compact'
  onMemberClick?: (member: TeamMemberType) => void
}

function TeamSection({ title, members, selectedRatio, variant = 'compact', onMemberClick }: TeamSectionProps) {
  const isFeatured = variant === 'featured'
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector('h2')
      const cards = gridRef.current?.querySelectorAll('.team-card')
      const splits: SplitText[] = []

      if (titleEl) {
        const titleSplit = SplitText.create(titleEl, { type: 'chars' })
        splits.push(titleSplit)
        gsap.fromTo(
          titleSplit.chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotateX: 15, transformOrigin: 'center bottom' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onComplete: () => {
              // 入场动画完成
            }
          }
        )
      }

      return () => {
        splits.forEach(split => split.revert())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="mb-16" style={{ perspective: '1200px' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
      </div>
      <div
        ref={gridRef}
        className={cn(
          'grid',
          isFeatured
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5'
        )}
      >
        {members.map((member, index) => (
          <MemberCard
            key={`${member.name}-${index}`}
            member={member}
            variant={isFeatured ? 'featured' : 'compact'}
            aspectRatio={selectedRatio}
            onClick={onMemberClick ? () => onMemberClick(member) : undefined}
            priority={isFeatured && index < 4}
          />
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
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: cardRef })

  return (
    <Card ref={cardRef} className={CARD_STYLES.analytics}>
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
  const [selectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  // 过滤后的成员
  const filteredMembers = useMemo(() => {
    switch (filter) {
      case 'maintainers': return { maintainers: t.team.maintainers, developers: [], designers: [], contributors: [] }
      case 'developers': return { maintainers: [], developers: t.team.developers, designers: [], contributors: [] }
      case 'designers': return { maintainers: [], developers: [], designers: t.team.designers, contributors: [] }
      case 'contributors': return { maintainers: [], developers: [], designers: [], contributors: t.team.contributors }
      default: return {
        maintainers: t.team.maintainers,
        developers: t.team.developers,
        designers: t.team.designers,
        contributors: t.team.contributors
      }
    }
  }, [filter, t.team])

  // Flip 过滤切换
  const handleFilterChange = (nextFilter: FilterCategory) => {
    if (nextFilter === filter || !pageRef.current) return

    // 获取当前所有团队卡片的 Flip 状态
    const state = Flip.getState('.team-card')

    setFilter(nextFilter)

    // 在下一帧 DOM 更新后执行 Flip
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.65,
        ease: 'power3.inOut',
        stagger: 0.04,
        absolute: true,
        scale: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.8, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.4)' }
          )
        },
        onLeave: (elements) => {
          gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'power2.in' })
        },
      })
    })
  }

  // Hero 描述 SplitText 入场
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const paragraphs = heroRef.current?.querySelectorAll('.hero-desc-paragraph')
      const splits: SplitText[] = []

      paragraphs?.forEach((p) => {
        const split = SplitText.create(p, { type: 'lines' })
        splits.push(split)
        gsap.fromTo(
          split.lines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      return () => {
        splits.forEach(split => split.revert())
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

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
      let cls = "hero-desc-paragraph mt-2 text-muted-foreground leading-relaxed tracking-wide"
      if (/^一群在代码与梦想交汇处相遇的人/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^我们不同——/.test(s) || /^但我们相同——/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
      }
      if (/^我们，是一个行动动词/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-primary"
      }
      if (/^Yet we are the same — we believe in technology for good/.test(s)) {
        cls = "hero-desc-paragraph mt-2 leading-relaxed tracking-wide font-bold text-foreground dark:text-white"
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

  // 所有成员合并（用于顶部成员条）
  const allMembers = useMemo(() => [
    ...maintainers,
    ...developers,
    ...designers,
    ...contributors
  ], [])

  // 赞助商按等级分组
  const sponsorsByLevel = useMemo(() => ({
    strategic: sponsors.filter(s => s.level === 'strategic'),
    gold: sponsors.filter(s => s.level === 'gold'),
    silver: sponsors.filter(s => s.level === 'silver'),
    bronze: sponsors.filter(s => s.level === 'bronze'),
    partner: sponsors.filter(s => s.level === 'partner')
  }), [])

  return (
    <div ref={pageRef} className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background with team photos */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 dark:from-background/98 dark:to-background/95"></div>
          {/* Light mode background uses external image, dark mode keeps local photo */}
          <img
            src="https://darrenpig.github.io/files/news10.jpg"
            alt="社区背景图"
            className="w-full h-full object-cover opacity-[0.07] blur-sm block dark:hidden"
            onError={(e) => {
              (e.target as HTMLImageElement).src = TeamPhoto1
            }}
          />
          <img
            src={TeamPhoto1}
            alt="团队校门合照"
            className="w-full h-full object-cover opacity-[0.10] blur-sm hidden dark:block"
            onError={(e) => {
              (e.target as HTMLImageElement).src = TeamPhoto2
            }}
          />
        </div>

      <div className="container py-12 relative z-20">
        {/* Hero Section with Theme Toggle */}
        <div ref={heroRef} className="mb-12 relative">
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

        {/* Members Strip */}
        <div className="mb-8">
          <MemberStrip members={allMembers} />
        </div>

        {/* Team Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground drop-shadow-lg dark:text-white dark:drop-shadow-2xl">
            {t.team.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTER_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              className={`
                filter-button relative overflow-hidden rounded-full px-5 transition-all duration-300
                ${filter === category
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
                  : 'border-primary/30 hover:border-primary/60 hover:bg-primary/10'
                }
              `}
              onClick={() => handleFilterChange(category)}
            >
              {FILTER_LABELS[category]}
            </Button>
          ))}
        </div>

        {/* Team Sections */}
        <TeamSection title={t.team.maintainerTitle} members={filteredMembers.maintainers} selectedRatio={selectedRatio} variant="featured" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.developerTitle} members={filteredMembers.developers} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.designerTitle} members={filteredMembers.designers} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />
        <TeamSection title={t.team.contributorTitle} members={filteredMembers.contributors} selectedRatio={selectedRatio} variant="compact" onMemberClick={setSelectedMember} />

        <MemberTechDetail
          member={selectedMember}
          open={!!selectedMember}
          onOpenChange={open => {
            if (!open) setSelectedMember(null)
          }}
        />

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
                <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
                <div className="absolute inset-0 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
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
        {sponsors.length > 0 && (
          <div className="mt-20 mb-16 pt-12 border-t border-gray-200 dark:border-gray-800">
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
            </div>

            {/* 成为赞助商 CTA */}
            <div className="mt-12 text-center">
              <Card className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
                <div className="text-left">
                  <h4 className="font-semibold mb-1">成为我们的合作伙伴</h4>
                  <p className="text-sm text-muted-foreground">支持开源工程教育，与 NEC 社区共同成长</p>
                </div>
                <Button asChild>
                  <a href="mailto:22230635@czu.cn">
                    <Heart className="h-4 w-4 mr-2" />
                    联系我们
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        )}

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
