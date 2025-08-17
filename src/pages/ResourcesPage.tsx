import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ExternalLink, Download, Search, Star, BookOpen, Code, Wrench, GraduationCap, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { AspectRatioSelector, type AspectRatio } from '@/components/ui/aspect-ratio-selector'

type ResourceCategory = 'all' | 'tutorials' | 'tools' | 'books' | 'courses' | 'documentation'
type ResourceDifficulty = 'beginner' | 'intermediate' | 'advanced'
type ResourceType = 'free' | 'paid'

interface Resource {
  id: string
  title: string
  description: string
  image: string
  category: ResourceCategory
  difficulty: ResourceDifficulty
  type: ResourceType
  author: string
  rating: number
  url: string
  downloadUrl?: string
  tags: string[]
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'React Complete Guide 2024',
    description: 'Comprehensive tutorial covering React fundamentals, hooks, context, and modern patterns with practical projects.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Tech Academy',
    rating: 4.8,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks']
  },
  {
    id: '2',
    title: 'VS Code Extensions Pack',
    description: 'Essential VS Code extensions for web development, including linters, formatters, and productivity tools.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'DevTools Team',
    rating: 4.9,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    downloadUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['VS Code', 'Extensions', 'Development', 'Productivity']
  },
  {
    id: '3',
    title: 'Clean Code: A Handbook',
    description: 'Essential principles and practices for writing maintainable, readable, and efficient code.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'intermediate',
    type: 'paid',
    author: 'Robert C. Martin',
    rating: 4.7,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Clean Code', 'Best Practices', 'Software Engineering']
  },
  {
    id: '4',
    title: 'Machine Learning Specialization',
    description: 'Complete ML course covering supervised learning, neural networks, and practical implementation.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'courses',
    difficulty: 'advanced',
    type: 'paid',
    author: 'Stanford Online',
    rating: 4.9,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Machine Learning', 'Python', 'AI', 'Data Science']
  },
  {
    id: '5',
    title: 'Node.js Official Documentation',
    description: 'Comprehensive documentation for Node.js runtime, APIs, and best practices.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Node.js Foundation',
    rating: 4.6,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Node.js', 'Backend', 'JavaScript', 'API']
  },
  {
    id: '6',
    title: 'Git Version Control Tutorial',
    description: 'Step-by-step guide to mastering Git for version control and collaborative development.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'beginner',
    type: 'free',
    author: 'Git Masters',
    rating: 4.5,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Git', 'Version Control', 'Collaboration', 'DevOps']
  },
  {
    id: '7',
    title: 'Figma Design System Kit',
    description: 'Professional design system components and templates for modern web applications.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Design Pro',
    rating: 4.4,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    downloadUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Figma', 'Design System', 'UI/UX', 'Templates']
  },
  {
    id: '8',
    title: 'Full Stack Web Development',
    description: 'Complete course covering frontend, backend, databases, and deployment strategies.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    category: 'courses',
    difficulty: 'advanced',
    type: 'paid',
    author: 'Web Dev Academy',
    rating: 4.8,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Full Stack', 'Web Development', 'React', 'Node.js', 'MongoDB']
  }
]

const categoryFilters = [
  { key: 'all' as ResourceCategory, labelKey: 'filterAll', icon: Search },
  { key: 'tutorials' as ResourceCategory, labelKey: 'filterTutorials', icon: BookOpen },
  { key: 'tools' as ResourceCategory, labelKey: 'filterTools', icon: Wrench },
  { key: 'books' as ResourceCategory, labelKey: 'filterBooks', icon: FileText },
  { key: 'courses' as ResourceCategory, labelKey: 'filterCourses', icon: GraduationCap },
  { key: 'documentation' as ResourceCategory, labelKey: 'filterDocumentation', icon: Code }
]

const getDifficultyColor = (difficulty: ResourceDifficulty) => {
  const colors = {
    beginner: 'bg-green-500/10 text-green-700 border-green-200',
    intermediate: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-500/10 text-red-700 border-red-200'
  }
  return colors[difficulty]
}

const getTypeColor = (type: ResourceType) => {
  const colors = {
    free: 'bg-blue-500/10 text-blue-700 border-blue-200',
    paid: 'bg-purple-500/10 text-purple-700 border-purple-200'
  }
  return colors[type]
}

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-video')
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)
  const t = useTranslation()

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              {t.resources.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {t.resources.description}
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={t.resources.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
              />
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container">
            <div className="flex flex-col gap-4">
              {/* Filter Toggle Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  {t.resources.filterTitle}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isFilterExpanded ? t.resources.collapseFilters : t.resources.expandFilters}
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
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {categoryFilters.map((filter) => {
                      const Icon = filter.icon
                      return (
                        <Button
                          key={filter.key}
                          variant={selectedCategory === filter.key ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory(filter.key)}
                          className="hover-lift transition-all duration-200 flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          {t.resources[filter.labelKey]}
                        </Button>
                      )
                    })}
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

        {/* Resources Grid */}
        <section className="py-16">
          <div className="container">
            {filteredResources.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-card hover-lift glow-hover group overflow-hidden">
                    <div className={`${selectedRatio} overflow-hidden relative`}>
                      <img 
                        src={resource.image}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={`${getDifficultyColor(resource.difficulty)} border`}>
                          {t.resources[resource.difficulty]}
                        </Badge>
                        <Badge className={`${getTypeColor(resource.type)} border`}>
                          {t.resources[`${resource.type}Resource`]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-primary/90 backdrop-blur-sm hover:bg-primary flex-1">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t.resources.viewResource}
                          </Button>
                          {resource.downloadUrl && (
                            <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <h3 className="font-bold text-xl mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t text-sm">
                        <div>
                          <div className="font-medium">{resource.author}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(resource.rating)}
                            <span className="text-muted-foreground ml-1">({resource.rating})</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {t.resources.noResults}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}