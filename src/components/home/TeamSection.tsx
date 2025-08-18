import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { AspectRatioSelector, type AspectRatio } from '@/components/ui/aspect-ratio-selector'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamGroup {
  title: string;
  members: TeamMember[];
}

const getTeamGroups = (t: any): TeamGroup[] => [
  {
    title: t.team.maintainerTitle,
    members: t.team.maintainers
  },
  {
    title: t.team.developerTitle,
    members: t.team.developers
  },
  {
    title: t.team.designerTitle,
    members: t.team.designers
  },
  {
    title: t.team.contributorTitle,
    members: t.team.contributors
  },
  {
    title: t.team.sponsorTitle,
    members: t.team.sponsors
  }
]

export function TeamSection() {
  const t = useTranslation();
  const teamGroups = getTeamGroups(t);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]');
  
  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{t.team.title}</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.team.description}
          </p>
          
          {/* Aspect Ratio Selector */}
          <div className="mt-8 flex justify-center">
            <AspectRatioSelector 
              value={selectedRatio} 
              onValueChange={setSelectedRatio}
              className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10"
            />
          </div>
        </div>
        
        <div className="space-y-16">
          {teamGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="">
              <h3 className="text-2xl font-bold text-center mb-8 gradient-text">{group.title}</h3>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max px-4">
                  {group.members.map((member, memberIndex) => (
                    <Card key={memberIndex} className="glass-card hover-lift glow-hover group overflow-hidden flex-shrink-0 w-80">
                      <div className={`${selectedRatio} overflow-hidden relative`}>
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardHeader className="pb-3">
                        <h4 className="font-bold text-lg">{member.name}</h4>
                        <p className="text-sm gradient-text font-semibold">{member.role}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                        <div className="flex gap-3">
                          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                            <Github className="h-4 w-4" />
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                            <Linkedin className="h-4 w-4" />
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                            <Mail className="h-4 w-4" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View Full Team Button */}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="group">
            <Link to="/team" className="flex items-center gap-2">
              {t.team.viewFullTeam}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}