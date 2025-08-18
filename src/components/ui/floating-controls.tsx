import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sun, Moon, ArrowUp, Settings, X, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'

export type AspectRatio = 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/10]' | 'aspect-[21/9]'

interface FloatingControlsProps {
  showAspectRatio?: boolean
  aspectRatio?: AspectRatio
  onAspectRatioChange?: (ratio: AspectRatio) => void
  className?: string
}

const aspectRatioOptions: { value: AspectRatio; label: string }[] = [
  { value: 'aspect-square', label: '正方形 (1:1)' },
  { value: 'aspect-video', label: '视频比例 (16:9)' },
  { value: 'aspect-[4/3]', label: '传统比例 (4:3)' },
  { value: 'aspect-[3/4]', label: '竖直比例 (3:4)' },
  { value: 'aspect-[16/10]', label: '宽屏比例 (16:10)' },
  { value: 'aspect-[21/9]', label: '超宽比例 (21:9)' }
]

export function FloatingControls({ 
  showAspectRatio = false, 
  aspectRatio = 'aspect-[3/4]', 
  onAspectRatioChange,
  className 
}: FloatingControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        const isDark = savedTheme === 'dark'
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return isDark
      }
      
      // Check browser preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        return true
      }
      
      // Default to dark mode
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      return true
    }
    return true // Default to dark mode
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  const { language, setLanguage } = useLanguage()

  // 3秒无响应自动隐藏逻辑
  const resetHideTimer = useCallback(() => {
    if (hideTimer) {
      clearTimeout(hideTimer)
    }
    
    setIsVisible(true)
    
    const timer = setTimeout(() => {
      if (!isExpanded) {
        setIsVisible(false)
      }
    }, 3000)
    
    setHideTimer(timer)
  }, [hideTimer, isExpanded])

  // 监听滚动位置，决定是否显示回到顶部按钮，并实现滑动唤醒功能
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowScrollTop(currentScrollY > 300)
      
      // 检测滑动状态
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsScrolling(true)
        setIsVisible(true) // 滑动时唤醒悬浮窗
        
        // 清除之前的滚动超时
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }
        
        // 设置新的滚动超时，500ms后认为滚动结束
        const timeout = setTimeout(() => {
          setIsScrolling(false)
          // 滚动结束后重新开始隐藏计时器
          if (!isExpanded) {
            resetHideTimer()
          }
        }, 500)
        
        setScrollTimeout(timeout)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [lastScrollY, scrollTimeout, isExpanded, resetHideTimer])

  // 鼠标进入时重置隐藏计时器
  const handleMouseEnter = useCallback(() => {
    resetHideTimer()
  }, [resetHideTimer])

  // 鼠标离开时开始隐藏计时器
  const handleMouseLeave = useCallback(() => {
    if (!isExpanded) {
      resetHideTimer()
    }
  }, [resetHideTimer, isExpanded])

  // 展开/收起时的处理
  const handleToggleExpanded = useCallback(() => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    
    if (newExpanded) {
      // 展开时清除隐藏计时器
      if (hideTimer) {
        clearTimeout(hideTimer)
        setHideTimer(null)
      }
      setIsVisible(true)
    } else {
      // 收起时重新开始隐藏计时器
      resetHideTimer()
    }
  }, [isExpanded, hideTimer, resetHideTimer])

  // 初始化隐藏计时器
  useEffect(() => {
    resetHideTimer()
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    }
  }, [])

  // 主题切换
  const toggleTheme = useCallback(() => {
    const newIsDark = !isDarkMode
    setIsDarkMode(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    resetHideTimer()
  }, [isDarkMode, resetHideTimer])

  // 回到顶部
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    resetHideTimer()
  }, [resetHideTimer])

  // 显示比例变更
  const handleAspectRatioChange = useCallback((value: AspectRatio) => {
    onAspectRatioChange?.(value)
    resetHideTimer()
  }, [onAspectRatioChange, resetHideTimer])

  // 语言切换
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'zh' : 'en'
    setLanguage(newLanguage)
    resetHideTimer()
  }, [language, setLanguage, resetHideTimer])

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center gap-3">
        {/* 回到顶部按钮 */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className={cn(
              "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              "bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:scale-110"
            )}
            size="icon"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </Button>
        )}

        {/* 展开的控制面板 */}
        {isExpanded && (
          <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-lg min-w-64">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">控制面板</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleExpanded}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* 主题切换 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">主题模式</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 h-8"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span className="text-xs">亮色</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span className="text-xs">暗色</span>
                    </>
                  )}
                </Button>
              </div>

              {/* 语言切换 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">语言</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 h-8"
                >
                  <Languages className="h-4 w-4" />
                  <span className="text-xs">{language === 'en' ? '中文' : 'English'}</span>
                </Button>
              </div>

              {/* 显示比例选择器 */}
              {showAspectRatio && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">显示比例</span>
                  <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatioOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 主控制按钮 */}
        <Button
          onClick={handleToggleExpanded}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
            "bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:scale-110",
            isExpanded && "bg-primary/10 border-primary/40"
          )}
          size="icon"
        >
          <Settings className={cn(
            "h-6 w-6 text-primary transition-transform duration-300",
            isExpanded && "rotate-90"
          )} />
        </Button>
      </div>
    </div>
  )
}