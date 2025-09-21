import { PageLayout } from '@/components/layout/PageLayout'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useTranslation } from '@/contexts/LanguageContext'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Code,
  Users,
  Trophy,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Activity,
  Zap
} from 'lucide-react'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

function DashboardPage() {
  const { user, logout } = useAuthStore()
  const t = useTranslation()

  if (!user) return null

  // Mock data for demonstration
  const userStats = {
    contributions: 12,
    eventsAttended: 5,
    projectsCompleted: 3,
    membershipProgress: 65
  }

  const recentProjects = [
    {
      id: 1,
      name: 'Smart Energy Monitor',
      status: 'In Progress',
      progress: 75,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Solar Panel Calculator',
      status: 'Completed',
      progress: 100,
      lastUpdated: '1 week ago'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'React Workshop',
      date: '2024-02-15',
      time: '14:00',
      registered: true
    },
    {
      id: 2,
      title: 'Green Tech Hackathon',
      date: '2024-02-20',
      time: '09:00',
      registered: false
    }
  ]

  return (
    <PageLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.dashboard.title}</h1>
          <p className="text-muted-foreground">{t.dashboard.welcome}, {user.name}!</p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Profile Card */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">
                    {user.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)}
                  </span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>
                    {user.email && <div className="text-sm">{user.email}</div>}
                    <div className="text-xs mt-1">
                      {t.dashboard.memberSince} {new Date().toLocaleDateString()}
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Membership Level</span>
                  <Badge variant="secondary">Active Member</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Next Level</span>
                    <span>{userStats.membershipProgress}%</span>
                  </div>
                  <Progress value={userStats.membershipProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={logout}>
                {t.dashboard.logout}
              </Button>
            </CardFooter>
          </Card>

          {/* My Activity Stats */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t.dashboard.myActivity.title}
              </CardTitle>
              <CardDescription>{t.dashboard.myActivity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.contributions}</div>
                  <div className="text-xs text-muted-foreground">{t.dashboard.myActivity.contributions}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{userStats.eventsAttended}</div>
                  <div className="text-xs text-muted-foreground">{t.dashboard.myActivity.eventsAttended}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.projectsCompleted}</div>
                  <div className="text-xs text-muted-foreground">{t.dashboard.myActivity.projectsCompleted}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {t.dashboard.quickActions.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button size="sm" variant="outline" className="h-auto p-3 flex flex-col gap-1" asChild>
                  <Link to="/projects">
                    <Code className="h-4 w-4" />
                    <span className="text-xs">{t.dashboard.quickActions.submitProject}</span>
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="h-auto p-3 flex flex-col gap-1" asChild>
                  <Link to="/events">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">{t.dashboard.quickActions.registerEvent}</span>
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="h-auto p-3 flex flex-col gap-1" asChild>
                  <Link to="/resources">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs">{t.dashboard.quickActions.viewResources}</span>
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="h-auto p-3 flex flex-col gap-1" asChild>
                  <Link to="/contact">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{t.dashboard.quickActions.contactUs}</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* My Projects */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {t.dashboard.myProjects.title}
              </CardTitle>
              <CardDescription>{t.dashboard.myProjects.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {recentProjects.length > 0 ? (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{project.name}</h4>
                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1" />
                      </div>
                      <p className="text-xs text-muted-foreground">Updated {project.lastUpdated}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t.dashboard.myProjects.noProjects}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="sm" asChild>
                <a href="https://gitee.com/Darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <GiteeIcon className="h-4 w-4" />
                  {t.dashboard.myProjects.viewGithub}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Events */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t.dashboard.upcomingEvents.title}
              </CardTitle>
              <CardDescription>{t.dashboard.upcomingEvents.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant={event.registered ? 'default' : 'outline'} className="text-xs">
                          {event.registered ? 'Registered' : 'Available'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t.dashboard.upcomingEvents.noEvents}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link to="/events">
                  {t.dashboard.upcomingEvents.viewAll}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}

export default DashboardPage