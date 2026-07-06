import { useRef } from 'react'
import { ChevronRight, Code, Lightbulb, Zap, Bot, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import giteeStats from '@/data/team-gitee-stats.json'

export function HeroSection() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLButtonElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)

  const magneticTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map())
  const hoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map())
  const arrowTween = useRef<gsap.core.Tween | null>(null)
  const marqueeTween = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // ========== 0. Background grid ambient drift ==========
        if (gridRef.current) {
          gsap.to(gridRef.current, {
            backgroundPosition: '60px 60px',
            duration: 20,
            repeat: -1,
            ease: 'none',
          })
        }

        // ========== Master Timeline: entrance choreography ==========
        const master = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.15,
        })

        // 1. Badge pops in like a physical badge
        master.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30, scale: 0.8, rotateX: -15 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.7, ease: 'back.out(1.7)' },
          0
        )

        // 2. Headline: SplitText by words, slam down with physical weight
        let titleSplit: SplitText | null = null
        let highlightSplit: SplitText | null = null

        if (titleRef.current) {
          titleSplit = new SplitText(titleRef.current, { type: 'words', wordsClass: 'title-word' })
          master.fromTo(
            titleSplit.words,
            { y: 80, opacity: 0, rotateX: -80, skewY: 8 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              skewY: 0,
              duration: 0.9,
              ease: 'back.out(1.4)',
              stagger: 0.08,
            },
            0.25
          )
        }

        // 3. Highlight words get extra mechanical snap + subtle glitch on the last word
        if (highlightRef.current) {
          highlightSplit = new SplitText(highlightRef.current, { type: 'words', wordsClass: 'highlight-word' })
          master.fromTo(
            highlightSplit.words,
            { y: 90, opacity: 0, rotateX: -90, skewX: -12 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              skewX: 0,
              duration: 1,
              ease: 'back.out(1.2)',
              stagger: 0.1,
            },
            0.55
          )

          // Extra glitch skew on the final word (PPT / floor)
          const lastWord = highlightSplit.words[highlightSplit.words.length - 1]
          if (lastWord) {
            master.to(
              lastWord,
              {
                skewX: 8,
                x: 3,
                duration: 0.06,
                ease: 'steps(1)',
                yoyo: true,
                repeat: 3,
              },
              1.1
            )
          }
        }

        // 4. Subtitle fades up
        master.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.95
        )

        // 5. Stats row: slide up + counters roll
        const statItems = statsRef.current?.querySelectorAll('.stat-item')
        const statValues = statsRef.current?.querySelectorAll('.stat-value')
        if (statItems?.length) {
          master.fromTo(
            statItems,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
            1.15
          )
        }

        if (statValues?.length) {
          statValues.forEach((el) => {
            const target = Number(el.getAttribute('data-value'))
            const suffix = el.getAttribute('data-suffix') || ''
            const proxy = { val: 0 }
            master.to(
              proxy,
              {
                val: target,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = Math.round(proxy.val) + suffix
                },
              },
              1.35
            )
          })
        }

        // 6. CTA buttons enter
        master.fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
          1.45
        )

        // 7. Tech stack marquee fades in and starts rolling
        master.fromTo(
          marqueeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.75
        )

        // 8. Feature cards enter last
        master.fromTo(
          cardsRef.current?.children || [],
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'back.out(1.4)',
          },
          1.95
        )

        // ========== Ambient loops (not in master timeline) ==========

        // Background glow drifts
        gsap.to(glowRef.current, {
          x: 60,
          y: -40,
          scale: 1.1,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // Feature icons breathing pulse
        const iconContainers = cardsRef.current?.querySelectorAll('.feature-icon')
        if (iconContainers) {
          gsap.to(iconContainers, {
            scale: 1.08,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.4, from: 'start' },
          })
        }

        // Marquee infinite scroll
        const track = marqueeRef.current?.querySelector('.marquee-track') as HTMLElement | null
        if (track) {
          const totalWidth = track.scrollWidth / 2
          marqueeTween.current = gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            repeat: -1,
            ease: 'none',
          })
        }

        // Floating robot hover
        if (robotRef.current) {
          gsap.to(robotRef.current, {
            y: -10,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }

        // Floating gear slow rotation
        if (gearRef.current) {
          const icon = gearRef.current.querySelector('svg')
          if (icon) {
            gsap.to(icon, {
              rotation: 360,
              duration: 20,
              repeat: -1,
              ease: 'none',
            })
          }
        }

        return () => {
          titleSplit?.revert()
          highlightSplit?.revert()
        }
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  // Magnetic button effect with adaptive directional easing
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const existingTween = magneticTweens.current.get(el)
    if (existingTween) {
      existingTween.kill()
    }

    const currentX = (gsap.getProperty(el, 'x') as number) || 0
    const currentY = (gsap.getProperty(el, 'y') as number) || 0

    const tween = gsap.fromTo(
      el,
      { x: currentX, y: currentY },
      {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: 'power2.out',
      }
    )

    magneticTweens.current.set(el, tween)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const tween = magneticTweens.current.get(el)

    if (tween) {
      tween.reverse()
    } else {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }
  }

  // Hover scale + glow burst
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget

    const existingTween = hoverTweens.current.get(el)
    if (existingTween) {
      existingTween.kill()
    }

    const tween = gsap.to(el, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })

    hoverTweens.current.set(el, tween)

    // Glow burst on the button surface
    const glow = el.querySelector('.btn-glow') as HTMLElement | null
    if (glow) {
      gsap.fromTo(
        glow,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.6, scale: 1.5, duration: 0.4, ease: 'power2.out' }
      )
    }

    // Arrow nudge loop for primary CTA
    const arrow = el.querySelector('.cta-arrow') as HTMLElement | null
    if (arrow && !arrowTween.current) {
      arrowTween.current = gsap.to(arrow, {
        x: 4,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: 'sine.inOut',
      })
    }
  }

  const handleHoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const tween = hoverTweens.current.get(el)

    if (tween) {
      tween.reverse()
    } else {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const glow = el.querySelector('.btn-glow') as HTMLElement | null
    if (glow) {
      gsap.to(glow, { opacity: 0, scale: 0.5, duration: 0.3 })
    }

    const arrow = el.querySelector('.cta-arrow') as HTMLElement | null
    if (arrow && arrowTween.current) {
      arrowTween.current.kill()
      arrowTween.current = null
      gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' })
    }
  }

  // Marquee hover: slow the track, not the whole page
  const handleMarqueeEnter = () => {
    if (marqueeTween.current) {
      gsap.to(marqueeTween.current, { timeScale: 0.2, duration: 0.4, ease: 'power2.out' })
    }
  }
  const handleMarqueeLeave = () => {
    if (marqueeTween.current) {
      gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.4, ease: 'power2.out' })
    }
  }

  const features = [
    {
      icon: Code,
      title: t.hero.codingWorkshops,
      desc: t.hero.codingWorkshopsDesc,
    },
    {
      icon: Lightbulb,
      title: t.hero.innovationProjects,
      desc: t.hero.innovationProjectsDesc,
    },
    {
      icon: Zap,
      title: t.hero.industryConnections,
      desc: t.hero.industryConnectionsDesc,
    },
  ]

  const stats = [
    {
      key: 'commits',
      value: giteeStats.commits.total,
      suffix: '+',
      label: t.hero.stats.commits.label,
    },
    {
      key: 'contributors',
      value: t.hero.stats.contributors.value,
      suffix: t.hero.stats.contributors.suffix,
      label: t.hero.stats.contributors.label,
    },
    {
      key: 'projects',
      value: t.hero.stats.projects.value,
      suffix: t.hero.stats.projects.suffix,
      label: t.hero.stats.projects.label,
    },
  ]

  const techStack = [...t.hero.techStack, ...t.hero.techStack]

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background pt-20 pb-28"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ willChange: 'background-position' }}
      />

      {/* Dynamic gradient glows */}
      <div
        ref={glowRef}
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/25 to-accent/15 blur-3xl"
      />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-accent/25 to-primary/15 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center mb-8">
            <div
              ref={badgeRef}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm hover-lift glow-hover opacity-0"
              style={{ perspective: '1000px' }}
            >
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">{t.hero.tagline}</span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ perspective: '1000px' }}
          >
            {t.hero.title}
            <span ref={highlightRef} className="gradient-text block sm:inline">
              {' '}
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-0"
          >
            {t.hero.description}
          </p>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="stat-item flex flex-col items-center rounded-xl border border-primary/10 bg-card/40 px-6 py-4 backdrop-blur-sm opacity-0"
              >
                <span
                  className="stat-value text-3xl font-bold tracking-tight gradient-text"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            ref={buttonsRef}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="relative overflow-hidden gradient-bg-primary hover-lift glow-hover text-base px-8 py-6 will-change-transform"
              asChild
            >
              <Link
                to="/join"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseOut={handleHoverLeave}
              >
                <span className="btn-glow absolute inset-0 rounded-md bg-white/20 opacity-0 pointer-events-none" />
                <span className="relative z-10">{t.hero.joinCommunity}</span>
                <ChevronRight className="cta-arrow relative z-10 ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden hover-lift border-primary/20 hover:border-primary/40 text-base px-8 py-6 will-change-transform"
              asChild
            >
              <a
                href="https://gitee.com/Darrenpig/new_energy_coder_club"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseOut={handleHoverLeave}
              >
                <span className="btn-glow absolute inset-0 rounded-md bg-primary/10 opacity-0 pointer-events-none" />
                <span className="relative z-10">{t.hero.viewGithub}</span>
              </a>
            </Button>
          </div>

          {/* Tech stack marquee */}
          <div
            ref={marqueeRef}
            className="mt-14 overflow-hidden rounded-full border border-primary/10 bg-card/30 py-3 backdrop-blur-sm opacity-0"
            onMouseEnter={handleMarqueeEnter}
            onMouseLeave={handleMarqueeLeave}
          >
            <div className="marquee-track flex w-max items-center gap-6 px-3">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="whitespace-nowrap rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary/90 border border-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={cardsRef}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 opacity-0"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="feature-icon relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary mb-5 group-hover:scale-110 transition-transform duration-300 glow-hover">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="relative text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-muted-foreground text-center leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating actions anchored to hero section bottom */}
      <button
        ref={robotRef}
        className="absolute bottom-6 left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-card/80 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-primary/10 hover:text-primary"
        aria-label="Robot assistant"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Bot className="h-5 w-5" />
      </button>
      <button
        ref={gearRef}
        className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-card/80 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-primary/10 hover:text-primary"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>
    </div>
  )
}
