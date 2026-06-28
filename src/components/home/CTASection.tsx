import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

export function CTASection() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })
  
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary/10 to-accent/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.15),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div ref={contentRef} className="mx-auto max-w-4xl text-center">
          <h2 className="text-6xl font-bold gradient-text sm:text-7xl mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="glass-card hover-lift glow-hover px-8 py-4 text-lg" asChild>
              <Link to="/join">
                {t.cta.getStarted}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="glass-card hover-lift px-8 py-4 text-lg" asChild>
              <Link to="/contact">{t.nav.contact}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
