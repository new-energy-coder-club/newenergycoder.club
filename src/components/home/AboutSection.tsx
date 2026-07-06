import { useRef } from 'react'
import { ArrowRight, GitBranch, Scale, Users, Code, BookOpen, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { projects } from '@/data/projects'

export function AboutSection() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const titleEl = headerRef.current?.querySelector('h2')
      const paragraphEl = headerRef.current?.querySelector('.about-paragraph')
      const originTitleEl = headerRef.current?.querySelector('.origin-title')
      const originContentEl = headerRef.current?.querySelector('.origin-content')

      const splits: SplitText[] = []

      // 1. 标题字符级 SplitText 入场
      if (titleEl) {
        const titleSplit = SplitText.create(titleEl, { type: 'chars' })
        splits.push(titleSplit)
        gsap.fromTo(
          titleSplit.chars,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 2. 段落按行 SplitText 入场
      if (paragraphEl) {
        const paragraphSplit = SplitText.create(paragraphEl, { type: 'lines' })
        splits.push(paragraphSplit)
        gsap.fromTo(
          paragraphSplit.lines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 3. Project Origin 标题 + 内容 SplitText
      if (originTitleEl) {
        const originTitleSplit = SplitText.create(originTitleEl, { type: 'chars' })
        splits.push(originTitleSplit)
        gsap.fromTo(
          originTitleSplit.chars,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: originTitleEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (originContentEl) {
        const originContentSplit = SplitText.create(originContentEl, { type: 'lines' })
        splits.push(originContentSplit)
        gsap.fromTo(
          originContentSplit.lines,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: originContentEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 4. 下方卡片稳重科技 stagger 入场
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.96, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.75,
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]"></div>

      <div className="container relative z-10">
        <div ref={headerRef} className="relative rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* About intro */}
              <div className="text-foreground">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t.about.title}
                </h2>
                <div className="mt-6">
                  <p className="about-paragraph leading-relaxed text-foreground/85">
                    {t.about.paragraph1}
                  </p>
                </div>
                <div className="mt-6 flex">
                  <Button asChild className="bg-white/10 border-white/20 hover:bg-white/20 hover-lift glow-hover" variant="outline">
                    <Link to="/team">
                      {t.about.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Project Origin Story */}
              <Card className="glass-card hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="origin-title gradient-text">{t.about.projectOrigin.title}</CardTitle>
                      <CardDescription>{t.about.projectOrigin.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="origin-content leading-relaxed">
                      {t.about.projectOrigin.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="mt-12 grid gap-6 lg:grid-cols-2" style={{ perspective: '1000px' }}>
          {/* Phase 2 Development */}
          <Card className="glass-card hover-lift lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.phase2.title}</CardTitle>
                  <CardDescription>{t.about.phase2.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {t.about.phase2.content}
                </p>
              </div>

              {/* Active repo links */}
              <div className="mt-5 flex flex-wrap gap-2">
                {projects.slice(0, 4).map((project) => (
                  <a
                    key={project.id}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-foreground/80 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <GitBranch className="h-3 w-3" />
                    {project.title}
                  </a>
                ))}
              </div>

              <div className="mt-5">
                <Button asChild variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 hover-lift">
                  <a href="https://gitee.com/darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer">
                    {t.about.phase2.viewRepos}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contributing Guidelines */}
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.contributing.title}</CardTitle>
                  <CardDescription>{t.about.contributing.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  {t.about.contributing.howToContribute}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.about.contributing.steps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">{t.about.contributing.codeOfConduct}</p>
                <p className="text-sm text-muted-foreground">{t.about.contributing.reportIssues}</p>
              </div>
            </CardContent>
          </Card>

          {/* License Information */}
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.license.title}</CardTitle>
                  <CardDescription>{t.about.license.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p className="text-sm text-muted-foreground">{t.about.license.openSource}</p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h5 className="font-medium text-emerald-400 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Permissions
                  </h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.permissions.map((permission: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-rose-400 mb-2">Limitations</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.limitations.map((limitation: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-sky-400 mb-2">Conditions</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.conditions.map((condition: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-sky-400"></span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
