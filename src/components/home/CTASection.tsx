import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'

export function CTASection() {
  const t = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.15),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
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