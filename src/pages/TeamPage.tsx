import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TeamMemberCardProps {
  member: {
    name: string
    role: string
    bio: string
    image: string
    github?: string
    linkedin?: string
    email?: string
  }
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback className="text-lg font-semibold">
            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <CardDescription className="text-base font-medium">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            {member.role}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
          {member.bio}
        </p>
        <div className="flex justify-center gap-2">
          {member.github && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.linkedin && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.email && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TeamSection({ title, members }: { title: string; members: any[] }) {
  if (!members || members.length === 0) return null

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  )
}

export function TeamPage() {
  const t = useTranslation()

  return (
    <PageLayout>
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t.team.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.team.description}
          </p>
        </div>

        {/* Team Sections */}
        <TeamSection title={t.team.maintainerTitle} members={t.team.maintainers} />
        <TeamSection title={t.team.developerTitle} members={t.team.developers} />
        <TeamSection title={t.team.designerTitle} members={t.team.designers} />
        <TeamSection title={t.team.contributorTitle} members={t.team.contributors} />
        <TeamSection title={t.team.sponsorTitle} members={t.team.sponsors} />

        {/* Team Photo Section */}
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">团队合照</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/src/image/team_photo.jpg"
                alt="新能源编程俱乐部团队合照"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">新能源编程俱乐部</h3>
                <p className="text-sm opacity-90">2024年度团队合照</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}