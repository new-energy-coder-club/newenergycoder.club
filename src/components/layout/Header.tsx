import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Zap, Ratio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/LoginModal'
import { UserMenu } from '@/components/auth/UserMenu'
import { useAuthStore } from '@/store/auth-store'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useTranslation } from '@/contexts/LanguageContext'

// Navigation items will be translated dynamically

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuthStore()
  const t = useTranslation()
  
  // 定义导航菜单项数组
  // 每个菜单项包含标签(label)和对应的路由地址(href)
  const navItems = [
    // 首页导航项
    { label: t.nav.home, href: '/' },

    // 团队页面导航项
    { label: t.nav.team, href: '/team' },
    // 项目展示页面导航项
    { label: t.nav.projects, href: '/projects' },
    // 活动页面导航项
    { label: t.nav.events, href: '/events' },
    // 资源页面导航项
    { label: t.nav.resources, href: '/resources' },
    // 联系我们页面导航项
    { label: t.nav.contact, href: '/contact' },
  ]
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">
            New Energy Coder Club
          </span>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link to="/display-ratio">
                  <Ratio className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.displayRatio.aspectRatioLabel}</span>
                </Link>
              </Button>
              <LanguageSwitcher />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <LoginButton className="text-sm">{t.nav.login}</LoginButton>
                  <Button size="sm" asChild>
                    <Link to="/join">{t.nav.joinClub}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="container py-4 flex flex-col gap-4 pb-6 border-t bg-background">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium py-2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link to="/display-ratio" onClick={() => setMobileMenuOpen(false)}>
                <Ratio className="h-4 w-4" />
                <span>{t.displayRatio.aspectRatioLabel}</span>
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-2 mt-2">
              <Button 
                size="sm" 
                variant="destructive" 
                className="w-full"
                onClick={() => {
                  useAuthStore.getState().logout();
                  setMobileMenuOpen(false);
                }}
              >
                {t.nav.logout}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  document.querySelector('[role="dialog"]')?.classList.remove('hidden');
                  setMobileMenuOpen(false);
                }}
              >
                Log in
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link to="/join" onClick={() => setMobileMenuOpen(false)}>Join Club</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}