import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { FeishuForm } from '@/components/forms/FeishuForm'
import { AspectRatioSelector, type AspectRatio } from '@/components/ui/aspect-ratio-selector'

type EventCategory = 'all' | 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'networking'
type EventStatus = 'upcoming' | 'past'

interface Event {
  id: string
  title: string
  description: string
  image: string
  category: EventCategory
  date: string
  time: string
  location: string
  participants: number
  maxParticipants?: number
  status: EventStatus
  registrationUrl?: string
  detailsUrl?: string
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects using Python, TensorFlow, and real-world datasets.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'workshop',
    date: '2024-04-15',
    time: '14:00 - 17:00',
    location: 'Computer Lab A',
    participants: 25,
    maxParticipants: 30,
    status: 'upcoming',
    registrationUrl: 'https://example.com/register/ai-workshop',
    detailsUrl: 'https://example.com/events/ai-workshop'
  },
  {
    id: '2',
    title: 'Green Tech Hackathon 2024',
    description: '48-hour hackathon focused on developing sustainable technology solutions for environmental challenges.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    category: 'hackathon',
    date: '2024-05-20',
    time: '09:00 - 18:00 (2 days)',
    location: 'Innovation Hub',
    participants: 45,
    maxParticipants: 60,
    status: 'upcoming',
    registrationUrl: 'https://example.com/register/green-hackathon',
    detailsUrl: 'https://example.com/events/green-hackathon'
  },
  {
    id: '3',
    title: 'Industry Leaders Seminar',
    description: 'Meet and learn from successful tech entrepreneurs and industry leaders about career paths and innovation.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    category: 'seminar',
    date: '2024-04-28',
    time: '15:00 - 16:30',
    location: 'Main Auditorium',
    participants: 120,
    maxParticipants: 150,
    status: 'upcoming',
    registrationUrl: 'https://example.com/register/industry-seminar',
    detailsUrl: 'https://example.com/events/industry-seminar'
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering modern web development with React, Node.js, and cloud deployment.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'workshop',
    date: '2024-03-15',
    time: '09:00 - 17:00',
    location: 'Computer Lab B',
    participants: 28,
    maxParticipants: 30,
    status: 'past',
    detailsUrl: 'https://example.com/events/web-bootcamp'
  },
  {
    id: '5',
    title: 'Coding Competition 2024',
    description: 'Annual programming contest with algorithmic challenges and prizes for top performers.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    category: 'competition',
    date: '2024-02-28',
    time: '10:00 - 16:00',
    location: 'Main Hall',
    participants: 85,
    status: 'past',
    detailsUrl: 'https://example.com/events/coding-competition'
  },
  {
    id: '6',
    title: 'Tech Networking Night',
    description: 'Casual networking event for students, alumni, and industry professionals to connect and share experiences.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop',
    category: 'networking',
    date: '2024-03-08',
    time: '18:00 - 21:00',
    location: 'Student Center',
    participants: 65,
    status: 'past',
    detailsUrl: 'https://example.com/events/networking-night'
  }
]

const categoryFilters = [
  { key: 'all' as EventCategory, labelKey: 'filterAll' },
  { key: 'workshop' as EventCategory, labelKey: 'filterWorkshop' },
  { key: 'hackathon' as EventCategory, labelKey: 'filterHackathon' },
  { key: 'seminar' as EventCategory, labelKey: 'filterSeminar' },
  { key: 'competition' as EventCategory, labelKey: 'filterCompetition' },
  { key: 'networking' as EventCategory, labelKey: 'filterNetworking' }
]

const getCategoryColor = (category: EventCategory) => {
  const colors = {
    workshop: 'bg-blue-500/10 text-blue-700 border-blue-200',
    hackathon: 'bg-purple-500/10 text-purple-700 border-purple-200',
    seminar: 'bg-green-500/10 text-green-700 border-green-200',
    competition: 'bg-red-500/10 text-red-700 border-red-200',
    networking: 'bg-orange-500/10 text-orange-700 border-orange-200',
    all: 'bg-gray-500/10 text-gray-700 border-gray-200'
  }
  return colors[category] || colors.all
}

export function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all')
  const [activeTab, setActiveTab] = useState<EventStatus>('upcoming')
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)
  const t = useTranslation()

  const filterEvents = (status: EventStatus) => {
    const statusFiltered = mockEvents.filter(event => event.status === status)
    return selectedCategory === 'all' 
      ? statusFiltered 
      : statusFiltered.filter(event => event.category === selectedCategory)
  }

  const upcomingEvents = filterEvents('upcoming')
  const pastEvents = filterEvents('past')

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="glass-card hover-lift glow-hover group overflow-hidden">
      <div className={`${selectedRatio} overflow-hidden relative`}>
        <img 
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(event.category)} border`}>
            {t.events[`filter${event.category.charAt(0).toUpperCase() + event.category.slice(1)}` as keyof typeof t.events] || event.category}
          </Badge>
        </div>
        {event.status === 'upcoming' && (
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              {event.registrationUrl && (
                <FeishuForm 
                  eventId={event.id}
                  eventTitle={event.title}
                  className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-sm h-8 px-3"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.events.registerNow}
                </FeishuForm>
              )}
              {event.detailsUrl && (
                <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                  {t.events.viewDetails}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="font-bold text-xl mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <div className="font-medium">{new Date(event.date).toLocaleDateString()}</div>
              <div className="text-muted-foreground text-xs">{event.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{event.location}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-3 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {event.participants} {t.events.participants}
              {event.maxParticipants && ` / ${event.maxParticipants}`}
            </span>
          </div>
          {event.status === 'past' && event.detailsUrl && (
            <Button size="sm" variant="outline">
              {t.events.viewDetails}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              {t.events.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.events.description}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container">
            <div className="flex flex-col gap-4">
              {/* Filter Toggle Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  {t.events.filterTitle}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isFilterExpanded ? t.events.collapseFilters : t.events.expandFilters}
                  {isFilterExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Collapsible Filter Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isFilterExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="flex flex-col gap-6 pb-2">
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {categoryFilters.map((filter) => (
                      <Button
                        key={filter.key}
                        variant={selectedCategory === filter.key ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(filter.key)}
                        className="hover-lift transition-all duration-200 text-xs sm:text-sm px-3 py-2"
                        size="sm"
                      >
                        {t.events[filter.labelKey]}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Aspect Ratio Selector */}
                  <div className="flex justify-center">
                    <AspectRatioSelector 
                      value={selectedRatio} 
                      onValueChange={setSelectedRatio}
                      className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Tabs */}
        <section className="py-16">
          <div className="container">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as EventStatus)} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.events.upcoming}
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t.events.past}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-0">
                {upcomingEvents.length > 0 ? (
                  <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      {t.events.noUpcoming}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                {pastEvents.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      {t.events.noPast}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}