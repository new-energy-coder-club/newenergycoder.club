import { ArrowRight, BookOpen, BrainCircuit, Camera, CircuitBoard, Clock, Codepen, Cpu, FolderGit2, GitBranch, Map, MapPin, Scale, Users, Wrench, Trophy, Code, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const iconComponents: { [key: string]: React.ElementType } = {
  Wrench,
  Cpu,
  CircuitBoard,
  Camera,
  Codepen,
  BrainCircuit,
};

export function AboutSection() {
  const t = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="relative rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10 w-11/12 mx-auto">
          <div className="relative z-10 p-12">
            <div className="text-foreground mb-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 gradient-text">
                  {t.footer.clubName}
                </h1>
                <h2 className="text-3xl font-bold tracking-tight">
                  <span className="gradient-text mr-2">{`{`}</span>
                  {t.about.title}
                  <span className="gradient-text ml-2">{`}`}</span>
                </h2>
                <div className="mt-6">
                  <p className="leading-relaxed text-left">
                    {t.about.paragraph1}
                  </p>
                  <div className="mt-8 space-y-3">
                    {t.about.coreAbilities.map((ability, index) => {
                      const IconComponent = iconComponents[ability.icon];
                      return (
                        <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1">
                          <div className="p-2 bg-emerald-500/10 rounded-full">
                            {IconComponent && <IconComponent className="w-6 h-6 text-emerald-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-300 leading-relaxed">
                              <strong className="font-semibold text-emerald-400">{ability.title}:</strong> {ability.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-8 flex">
                  <Button asChild className="bg-white/10 border-white/20 hover:bg-white/20 hover-lift glow-hover" variant="outline">
                    <Link to="/team">
                      {t.about.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
            </div>

            {/* Project Origin Story */}
            <div>
              <Card className="glass-card hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="gradient-text">{t.about.projectOrigin.title}</CardTitle>
                      <CardDescription>{t.about.projectOrigin.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="leading-relaxed whitespace-pre-line">
                      {t.about.projectOrigin.content}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2 Development */}
              <div className="mt-8">
                <Card className="glass-card hover-lift">
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Core Advantages */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-2">{t.about.coreAdvantages.title}</h3>
            <p className="text-muted-foreground">{t.about.coreAdvantages.subtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 双驱动结构 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{t.about.coreAdvantages.dualTrack.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.coreAdvantages.dualTrack.description}
                </p>
              </CardContent>
            </Card>

            {/* 全周期资产库 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FolderGit2 className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{t.about.coreAdvantages.fullProcess.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.coreAdvantages.fullProcess.description}
                </p>
              </CardContent>
            </Card>

            {/* 新手上手与贡献路径 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Map className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">{t.about.coreAdvantages.onboarding.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.coreAdvantages.onboarding.description}
                </p>
              </CardContent>
            </Card>

            {/* 线上线下联动 */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-lg">{t.about.coreAdvantages.base.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.coreAdvantages.base.description}
                </p>
              </CardContent>
            </Card>

            {/* 文档/知识库外置联动 */}
            <Card className="glass-card hover-lift md:col-span-2 lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <ExternalLink className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-lg">{t.about.coreAdvantages.knowledgeBase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.coreAdvantages.knowledgeBase.description}
                </p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://scn0bdoc8zxg.feishu.cn/wiki/S10LwzVZdiWLwxkEnEqcTcmEn6e" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t.about.coreAdvantages.feishuLink}
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/getting-started">
                      <Code className="mr-2 h-4 w-4" />
                      {t.about.coreAdvantages.escapeManualLink}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Contributing and License Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
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
                  <h5 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {t.about.license.permissionsTitle}
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
                  <h5 className="font-medium text-red-600 mb-2">{t.about.license.limitationsTitle}</h5>
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
                  <h5 className="font-medium text-blue-600 mb-2">{t.about.license.conditionsTitle}</h5>
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
  );
}