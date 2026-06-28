import { useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Linkedin, Mail, ArrowRight } from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { useTranslation } from '@/contexts/LanguageContext'
import { type AspectRatio } from '@/components/ui/floating-controls'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

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

interface TeamSectionProps {
  selectedRatio?: AspectRatio;
}

export function TeamSection({ selectedRatio = 'aspect-[3/4]' }: TeamSectionProps) {
  const t = useTranslation();
  const teamGroups = getTeamGroups(t);
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)

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

      // Each group title + cards stagger
      const groups = groupsRef.current?.children || []
      Array.from(groups).forEach((group) => {
        const title = group.querySelector('h3')
        const cards = group.querySelectorAll('.team-member-card')

        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })
  
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-accent/10 to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{t.team.title}</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.team.description}
          </p>
          

        </div>
        
        <div ref={groupsRef} className="space-y-16">
          {teamGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="">
              <h3 className="text-2xl font-bold text-center mb-8 gradient-text">{group.title}</h3>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max px-4">
                  {group.members.map((member, memberIndex) => (
                    <Card key={memberIndex} className="team-member-card glass-card hover-lift glow-hover group overflow-hidden flex-shrink-0 w-80">
                      <CardHeader className="pb-3">
                        <h4 className="font-bold text-lg">{member.name}</h4>
                        <p className="text-sm gradient-text font-semibold">{member.role}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                        <div className="flex gap-3">
                          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift">
                            <GiteeIcon className="h-4 w-4" />
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
