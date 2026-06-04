import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Zap, BookOpen, ChevronDown, Wrench, Code2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/LoginModal'
import { UserMenu } from '@/components/auth/UserMenu'
import { useAuthStore } from '@/store/auth-store'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

// 工具菜单项 - 支持国际化
const getToolItems = (isEn: boolean) => [
  { 
    label: isEn ? 'Solar Layout Tool' : '光伏排布工具', 
    href: 'https://solarglyph2.vercel.app/',
    description: isEn ? 'PV plant layout design' : '光伏电站布局设计'
  },
  { 
    label: isEn ? 'Steel Frame Designer' : '方管型材排布', 
    href: 'https://fibersteelstudio.vercel.app/',
    description: isEn ? 'Mechanical structure design tool' : '机械结构件设计工具'
  },
]

// 资源菜单项 - 支持国际化
const getResourceItems = (isEn: boolean) => [
  { 
    label: isEn ? 'Documentation' : '文档中心', 
    href: 'https://docs.newenergycoder.club/',
    description: isEn ? 'Complete documentation and guides' : '完整的文档和指南',
    external: true
  },
  { 
    label: isEn ? 'Getting Started' : '入门文档', 
    href: '/getting-started',
    description: isEn ? 'Quick start guide for beginners' : '新手指南与快速开始'
  },
  { 
    label: isEn ? 'Tech Blog' : '技术博客', 
    href: '/blog',
    description: isEn ? 'Technical articles and experience sharing' : '技术文章与经验分享'
  },
  { 
    label: isEn ? 'Open Source Repo' : '开源仓库', 
    href: 'https://gitee.com/darrenpig/new_energy_coder_club',
    description: isEn ? 'Gitee code repository' : 'Gitee 代码仓库',
    external: true
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuthStore()
  const { t, language } = useLanguage()
  const isEn = language === 'en'
  
  // 获取国际化菜单项
  const toolItems = getToolItems(isEn)
  const resourceItems = getResourceItems(isEn)
  
  // 主导航项
  const mainNavItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.team, href: '/team' },
    { label: t.nav.projects, href: '/projects' },
    { label: t.nav.events, href: '/events' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:inline">
            {isEn ? 'NEC New Energy Coder Club' : 'NEC 新能源开发者社区'}
          </span>
          <span className="text-lg font-bold tracking-tight sm:hidden">NEC</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            
            {/* 工具下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <Wrench className="h-4 w-4" />
                {isEn ? 'Tools' : '工具箱'}
                <ChevronDown className={cn("h-3 w-3 transition-transform", toolsOpen && "rotate-180")} />
              </button>
              
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-md border bg-popover p-1 shadow-lg">
                  {toolItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-0.5 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="font-medium flex items-center gap-1">
                        {item.label}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 资源下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <BookOpen className="h-4 w-4" />
                {isEn ? 'Docs' : '文档'}
                <ChevronDown className={cn("h-3 w-3 transition-transform", resourcesOpen && "rotate-180")} />
              </button>
              
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-md border bg-popover p-1 shadow-lg">
                  {resourceItems.map((item) => (
                    item.external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-0.5 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="font-medium flex items-center gap-1">
                          {item.label}
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex flex-col gap-0.5 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          
          {!isMobile && (
            <>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <LoginButton className="text-sm">
                    {t.nav.login}
                  </LoginButton>
                  <Button size="sm" asChild>
                    <Link to="/join">{t.nav.joinCollab}</Link>
                  </Button>
                </>
              )}
            </>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="border-t bg-background">
          <div className="container py-4 flex flex-col gap-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Tools Section */}
            <div className="mt-2 pt-2 border-t">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {isEn ? 'Tools' : '工具箱'}
              </p>
              {toolItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>

            {/* Mobile Resources Section */}
            <div className="mt-2 pt-2 border-t">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {isEn ? 'Resources' : '文档资源'}
              </p>
              {resourceItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t flex flex-col gap-2">
              {isAuthenticated ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    useAuthStore.getState().logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  {t.nav.logout}
                </Button>
              ) : (
                <>
                  <LoginButton 
                    className="text-sm"
                    onTriggerClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.login}
                  </LoginButton>
                  <Button size="sm" asChild>
                    <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                      {t.nav.joinCollab}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
