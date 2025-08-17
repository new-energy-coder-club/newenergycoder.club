import { ArrowRight, GitBranch, Scale, Users, Code, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  const t = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight gradient-text">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="leading-relaxed">
                {t.about.paragraph2}
              </p>
              <p className="leading-relaxed">
                {t.about.paragraph3}
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="gradient-bg-secondary hover-lift glow-hover" variant="outline">
                <Link to="/about">
                  {t.about.learnMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            <div className="grid gap-4 lg:gap-8">
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 aspect-[3/4] h-full glass-card hover-lift"></div>
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 aspect-[4/3] glass-card hover-lift"></div>
            </div>
            <div className="grid gap-4 lg:gap-8">
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 aspect-[4/3] glass-card hover-lift"></div>
              <div className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 aspect-[3/4] h-full glass-card hover-lift"></div>
            </div>
          </div>
        </div>
        
        {/* Project Origin Story */}
        <div className="mt-24">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="gradient-text">{t.about.projectOrigin.title}</CardTitle>
                  <CardDescription>如果你对本项目还不是那么的了解，我希望你能好好看完下面这部分内容</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-line">
                  {t.about.projectOrigin.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phase 2 Development */}
        <div className="mt-16">
          <Card className="glass-card hover-lift">
            <CardHeader>
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
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {t.about.phase2.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contributing and License Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Contributing Guidelines */}
          <Card className="glass-card hover-lift">
            <CardHeader>
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
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  {t.about.contributing.howToContribute}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.about.contributing.steps.map((step, index) => (
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
            <CardHeader>
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
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t.about.license.openSource}</p>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h5 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Permissions
                  </h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.permissions.map((permission, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Limitations</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500"></span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-600 mb-2">Conditions</h5>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {t.about.license.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-blue-500"></span>
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
  )
}