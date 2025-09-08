import { ChevronRight, Code, Lightbulb, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'

export function HeroSection() {
  const t = useTranslation();
  
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Enhanced gradient glows */}
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm hover-lift glow-hover">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">{t.hero.tagline}</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t.hero.title}
            <span className="gradient-text"> {t.hero.titleHighlight} </span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-bg-primary hover-lift glow-hover" asChild>
              <Link to="/join">
                {t.hero.joinCommunity}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hover-lift border-primary/20 hover:border-primary/40" asChild>
              <a href="https://gitee.com/Darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer">
                {t.hero.viewGithub}
              </a>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center group hover-lift">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 glow-hover">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.hero.codingWorkshops}</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">{t.hero.codingWorkshopsDesc}</p>
            </div>
            <div className="flex flex-col items-center group hover-lift">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300 glow-hover">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.hero.innovationProjects}</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">{t.hero.innovationProjectsDesc}</p>
            </div>
            <div className="flex flex-col items-center group hover-lift">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 glow-hover">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.hero.industryConnections}</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">{t.hero.industryConnectionsDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}