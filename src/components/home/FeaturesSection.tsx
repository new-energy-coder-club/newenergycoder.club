import { useRef } from 'react'
import { 
  Calendar, 
  Code2, 
  LightbulbIcon, 
  Network, 
  Presentation, 
  Users 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/contexts/LanguageContext'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const getFeatures = (t: any) => [
  {
    title: t.features.weeklyWorkshops,
    description: t.features.weeklyWorkshopsDesc,
    icon: Code2,
  },
  {
    title: t.features.openSource,
    description: t.features.openSourceDesc,
    icon: Network,
  },
  {
    title: t.features.hackathons,
    description: t.features.hackathonsDesc,
    icon: LightbulbIcon,
  },
  {
    title: t.features.guestSpeakers,
    description: t.features.guestSpeakersDesc,
    icon: Presentation,
  },
  {
    title: t.features.networking,
    description: t.features.networkingDesc,
    icon: Users,
  },
  {
    title: t.features.conferences,
    description: t.features.conferencesDesc,
    icon: Calendar,
  },
]

export function FeaturesSection() {
  const t = useTranslation();
  const features = getFeatures(t);
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Cards stagger entrance
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--accent)/0.1),transparent_50%),radial-gradient(circle_at_80%_50%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{t.features.title}</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>
        
        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="glass-card hover-lift glow-hover group transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
