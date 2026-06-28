import { useRef } from 'react'
import { ChevronRight, Code, Lightbulb, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function SplitText({
  children,
  className = '',
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const chars = children.split('')

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current?.querySelectorAll('.char') || [],
        {
          y: 80,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.03,
          delay,
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const magneticTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map())
  const hoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map())

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Badge entrance
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          0.2
        )

        // Subtitle entrance
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.8
        )

        // Buttons entrance
        tl.fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 },
          1.0
        )

        // Cards entrance
        tl.fromTo(
          cardsRef.current?.children || [],
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)',
          },
          1.3
        )

        // Background glow ambient animation with yoyo + easeReverse
        gsap.to(glowRef.current, {
          x: 60,
          y: -40,
          scale: 1.1,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          easeReverse: true,
        })

        // Feature icons subtle breathing pulse with yoyo + easeReverse
        const iconContainers = cardsRef.current?.querySelectorAll('.feature-icon')
        if (iconContainers) {
          gsap.to(iconContainers, {
            scale: 1.08,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            easeReverse: true,
            stagger: {
              each: 0.4,
              from: 'start',
            },
          })
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
        easeReverse: true,
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

  // Hover scale effect with easeReverse for smooth reverse playback
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget

    const existingTween = hoverTweens.current.get(el)
    if (existingTween) {
      existingTween.kill()
    }

    const tween = gsap.to(el, {
      scale: 1.04,
      duration: 0.3,
      ease: 'power2.out',
      easeReverse: true,
    })

    hoverTweens.current.set(el, tween)
  }

  const handleHoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const tween = hoverTweens.current.get(el)

    if (tween) {
      tween.reverse()
    } else {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
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

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background pt-20 pb-28"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Dynamic gradient glows */}
      <div
        ref={glowRef}
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/25 to-accent/15 blur-3xl"
      />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-accent/25 to-primary/15 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-8">
            <div
              ref={badgeRef}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm hover-lift glow-hover opacity-0"
            >
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">{t.hero.tagline}</span>
            </div>
          </div>

          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ perspective: '1000px' }}
          >
            <SplitText delay={0.4}>{t.hero.title}</SplitText>
            <span className="gradient-text">
              <SplitText delay={0.8}>{` ${t.hero.titleHighlight}`}</SplitText>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-0"
          >
            {t.hero.description}
          </p>

          <div
            ref={buttonsRef}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="gradient-bg-primary hover-lift glow-hover text-base px-8 py-6 will-change-transform"
              asChild
            >
              <Link
                to="/join"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseOut={handleHoverLeave}
              >
                {t.hero.joinCommunity}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-lift border-primary/20 hover:border-primary/40 text-base px-8 py-6 will-change-transform"
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
                {t.hero.viewGithub}
              </a>
            </Button>
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
    </div>
  )
}
