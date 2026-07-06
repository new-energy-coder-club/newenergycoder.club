import { useRef } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Code2, GitCommit, Trophy } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import giteeStats from '@/data/team-gitee-stats.json'
import { maintainers, developers, designers, contributors } from '@/lib/i18n/constants/team'

interface StatItemProps {
  value: number
  suffix?: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

function StatItem({ value, suffix = '', label, icon: Icon }: StatItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 backdrop-blur-sm">
      <div className="p-3 rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <div className="text-2xl font-bold gradient-text">
          {value}{suffix}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

export function TeamAnalysisSection() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const composition = [
    { label: t.team.maintainerTitle, count: maintainers.length, icon: Trophy },
    { label: t.team.developerTitle, count: developers.length, icon: Code2 },
    { label: t.team.designerTitle, count: designers.length, icon: Users },
    { label: t.team.contributorTitle, count: contributors.length, icon: BarChart3 },
  ]

  const totalMembers = maintainers.length + developers.length + designers.length + contributors.length

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const titleEl = headerRef.current?.querySelector('h2')
      const descEl = headerRef.current?.querySelector('p')
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
            stagger: 0.025,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (descEl) {
        const descSplit = SplitText.create(descEl, { type: 'lines' })
        splits.push(descSplit)
        gsap.fromTo(
          descSplit.lines,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      return () => {
        splits.forEach(split => split.revert())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(circle_at_80%_70%,hsl(var(--accent)/0.08),transparent_50%)]" />

      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-14">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{t.team.analytics.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.team.analytics.description}
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 lg:grid-cols-3">
          {/* Gitee activity overview */}
          <Card className="glass-card glow-hover lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GitCommit className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="gradient-text">{t.team.analytics.contributionStats}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <StatItem
                  value={giteeStats.commits.total}
                  suffix="+"
                  label={t.hero.stats.commits.label}
                  icon={GitCommit}
                />
                <StatItem
                  value={giteeStats.contributors.humans}
                  suffix="+"
                  label={t.team.analytics.activeContributors}
                  icon={Users}
                />
                <StatItem
                  value={giteeStats.repo.stars}
                  suffix=""
                  label="Stars"
                  icon={Trophy}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Top Contributors</h4>
                <div className="space-y-2">
                  {giteeStats.contributors.top.map((contributor, index) => (
                    <div
                      key={contributor.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium">{contributor.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{contributor.contributions} commits</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team composition */}
          <Card className="glass-card glow-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="gradient-text">{t.team.analytics.roleDistribution}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center pb-4 border-b border-border/50">
                <div className="text-4xl font-bold gradient-text">{totalMembers}</div>
                <div className="text-sm text-muted-foreground">{t.team.analytics.totalMembers}</div>
              </div>

              <div className="space-y-3">
                {composition.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${totalMembers > 0 ? (item.count / totalMembers) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {t.team.analytics.lastUpdated}：{new Date(giteeStats.generatedAt).toLocaleString('zh-CN')}
        </p>
      </div>
    </section>
  )
}
