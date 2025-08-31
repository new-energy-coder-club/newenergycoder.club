// 导入React核心hooks
import { useState, useEffect, useCallback } from 'react'

// 导入UI组件
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// 导入图标组件
import { Sun, Moon, ArrowUp, Settings, X, Languages } from 'lucide-react'

// 导入工具函数
import { cn } from '@/lib/utils'

// 导入语言上下文
import { useLanguage, useTranslation } from '@/contexts/LanguageContext'

export type AspectRatio = 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/10]' | 'aspect-[21/9]'

// 用于展示卡片内容的接口定义
export interface DisplayItem {
  id: string                                          // 唯一标识符
  title: string                                       // 卡片标题
  description: string                                 // 卡片描述
  image: string                                       // 卡片图片URL
  type: 'team' | 'project' | 'resource' | 'event'    // 卡片类型：团队/项目/资源/活动
  category?: string                                   // 可选：分类信息
  role?: string                                       // 可选：角色信息（仅用于团队类型）
}

// 类型颜色配置
export const typeColors = {
  team: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  project: 'bg-green-500/10 text-green-600 border-green-500/20',
  resource: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  event: 'bg-orange-500/10 text-orange-600 border-orange-500/20'
}

// FloatingControls组件的属性接口
interface FloatingControlsProps {
  showAspectRatio?: boolean    // 是否显示宽高比选择器
  aspectRatio?: AspectRatio    // 当前选择的宽高比
  onAspectRatioChange?: (ratio: AspectRatio) => void  // 宽高比改变时的回调函数
  className?: string           // 自定义样式类名
}


/**
 * 宽高比选项配置函数 - 显示比例选择器的核心数据源
 * 
 * 调用逻辑说明：
 * 1. 数据结构：每个选项包含 value（CSS类名）和 label（显示文本）
 * 2. 使用位置：在 AspectRatioSelector 组件中通过 map() 方法遍历生成选项
 * 3. 状态管理：value 值用于与 selectedAspectRatio 状态进行比较和更新
 * 4. 样式应用：选中的 value 会被添加到页面根容器的 className 中
 * 5. 持久化：选中状态通过 localStorage 保存，页面刷新后保持用户选择
 * 
 * 调用流程：
 * getAspectRatioOptions(t) → map渲染 → 用户点击 → setSelectedAspectRatio → 
 * → localStorage存储 → 应用到document.documentElement.className
 */
export const getAspectRatioOptions = (t: any): { value: AspectRatio; label: string }[] => [
  // 正方形比例 - 适用于头像、图标等需要等宽高的元素
  { value: 'aspect-square', label: t.displayRatio.aspectRatios.square },
  
  // 标准视频比例 - 现代显示器和视频内容的主流比例
  { value: 'aspect-video', label: t.displayRatio.aspectRatios.video },
  
  // 传统显示器比例 - 经典的4:3比例，适合传统内容展示
  { value: 'aspect-[4/3]', label: t.displayRatio.aspectRatios.traditional },
  
  // 竖直比例 - 适合移动端竖屏浏览和纵向内容展示
  { value: 'aspect-[3/4]', label: t.displayRatio.aspectRatios.portrait },
  
  // 宽屏比例 - 笔记本电脑常见比例，平衡宽度和高度
  { value: 'aspect-[16/10]', label: t.displayRatio.aspectRatios.widescreen },
  
  // 超宽比例 - 电影院线比例，适合沉浸式宽屏体验
  { value: 'aspect-[21/9]', label: t.displayRatio.aspectRatios.ultrawide }
]

// DisplayRatioPage 组件
// ├── useState 管理 selectedRatio 状态（默认：'aspect-[3/4]'）
// ├── 通过 PageLayout 传递属性
// │   ├── showAspectRatio={true}
// │   ├── aspectRatio={selectedRatio}
// │   └── onAspectRatioChange={setSelectedRatio}
// └── 在展示卡片中应用：className={`${selectedRatio} overflow-hidden relative`}

/**
 * FloatingControls 悬浮控制组件 - 提供主题切换、语言切换、显示比例调整等功能
 * 
 * Props 参数说明：
 * @param showAspectRatio - 是否显示宽高比选择器（默认false）
 * @param aspectRatio - 当前选择的宽高比（默认'aspect-[3/4]'）
 * @param onAspectRatioChange - 宽高比改变时的回调函数
 * @param className - 自定义样式类名
 */
export function FloatingControls({ 
  showAspectRatio = false, 
  aspectRatio = 'aspect-[3/4]', 
  onAspectRatioChange,
  className 
}: FloatingControlsProps) {
  // 控制面板展开/收起状态 - 用于显示/隐藏详细控制选项
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 控制面板可见性状态 - 用于实现3秒无操作自动隐藏功能
  const [isVisible, setIsVisible] = useState(true)
  
  /**
   * 深色模式状态管理 - 复杂的初始化逻辑
   * 
   * 优先级顺序：
   * 1. localStorage中的用户设置（最高优先级）
   * 2. 浏览器系统偏好设置
   * 3. 默认深色模式（兜底方案）
   * 
   * 初始化流程：
   * - 检查是否在浏览器环境（避免SSR问题）
   * - 读取localStorage中的主题设置
   * - 如果有保存的设置，应用到DOM并返回状态
   * - 如果没有保存的设置，检查系统偏好
   * - 最终默认使用深色模式
   */
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // 第一优先级：检查localStorage中的用户保存设置
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        const isDark = savedTheme === 'dark'
        // 立即应用主题到DOM元素
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return isDark
      }
      
      // 第二优先级：检查浏览器系统偏好设置
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        return true
      }
      
      // 第三优先级：默认使用深色模式（兜底方案）
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      return true
    }
    return true // SSR环境默认深色模式
  })
  
  // 回到顶部按钮显示状态 - 当页面滚动超过300px时显示
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // 自动隐藏定时器 - 用于3秒无操作后隐藏控制面板
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null)
  
  // 上次滚动位置记录 - 用于检测滚动方向和距离
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // 滚动状态标识 - 用于检测用户是否正在滚动页面
  const [isScrolling, setIsScrolling] = useState(false)
  
  // 滚动检测定时器 - 用于延迟判断滚动结束状态
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // 语言上下文 - 获取当前语言和语言切换函数
  const { language, setLanguage } = useLanguage()
  const t = useTranslation()

  /**
   * 3秒无响应自动隐藏逻辑 - 核心交互体验函数
   * 
   * 功能说明：
   * - 实现悬浮控制面板的智能隐藏机制
   * - 用户无操作3秒后自动隐藏面板，提升页面整洁度
   * - 当面板展开时不会自动隐藏，保持用户操作连续性
   * 
   * 执行流程：
   * 1. 清除之前的隐藏定时器（避免重复计时）
   * 2. 立即显示控制面板
   * 3. 设置3秒延迟定时器
   * 4. 定时器触发时检查面板是否展开
   * 5. 如果未展开则隐藏面板
   * 
   * 依赖项说明：
   * - hideTimer: 当前的隐藏定时器引用
   * - isExpanded: 面板展开状态，展开时不会自动隐藏
   */
  const resetHideTimer = useCallback(() => {
    // 清除之前的定时器，防止多个定时器同时运行
    if (hideTimer) {
      clearTimeout(hideTimer)
    }
    
    // 立即显示控制面板
    setIsVisible(true)
    
    // 设置3秒后的自动隐藏定时器
    const timer = setTimeout(() => {
      // 只有在面板未展开时才隐藏
      if (!isExpanded) {
        setIsVisible(false)
      }
    }, 3000)
    
    // 保存定时器引用，用于后续清除
    setHideTimer(timer)
  }, [hideTimer, isExpanded])

  /**
   * 滚动监听效果 - 实现多重滚动交互功能
   * 
   * 主要功能：
   * 1. 回到顶部按钮控制：滚动超过300px时显示
   * 2. 滑动唤醒功能：用户滚动时立即显示控制面板
   * 3. 滚动状态检测：区分滚动中和滚动结束状态
   * 4. 智能隐藏重启：滚动结束后重新开始自动隐藏计时
   * 
   * 性能优化：
   * - 使用防抖机制避免频繁状态更新
   * - 滚动阈值设置为5px，过滤微小滚动
   * - 500ms延迟判断滚动结束，平衡响应性和稳定性
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 控制回到顶部按钮显示：滚动超过300px时显示
      setShowScrollTop(currentScrollY > 300)
      
      // 滚动距离检测：超过5px阈值才认为是有效滚动
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        // 标记为滚动状态
        setIsScrolling(true)
        
        // 滑动唤醒：滚动时立即显示悬浮控制面板
        setIsVisible(true)
        
        // 清除之前的滚动结束检测定时器
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }
        
        // 设置新的滚动结束检测：500ms后认为滚动结束
        const timeout = setTimeout(() => {
          // 标记滚动结束
          setIsScrolling(false)
          
          // 滚动结束后重新启动自动隐藏计时器（仅在面板未展开时）
          if (!isExpanded) {
            resetHideTimer()
          }
        }, 500)
        
        // 保存定时器引用
        setScrollTimeout(timeout)
      }
      
      // 更新滚动位置记录，用于下次滚动距离计算
      setLastScrollY(currentScrollY)
    }

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll)
    
    // 清理函数：移除事件监听器和清除定时器
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [lastScrollY, scrollTimeout, isExpanded, resetHideTimer])

  /**
   * 鼠标进入事件处理 - 用户交互响应
   * 
   * 功能说明：
   * - 当用户鼠标悬停在控制面板上时触发
   * - 重置自动隐藏计时器，确保用户有足够时间操作
   * - 提升用户体验，避免操作过程中面板突然消失
   */
  const handleMouseEnter = useCallback(() => {
    resetHideTimer()
  }, [resetHideTimer])

  /**
   * 鼠标离开事件处理 - 智能隐藏逻辑
   * 
   * 功能说明：
   * - 当用户鼠标离开控制面板时触发
   * - 只有在面板未展开状态下才重新开始隐藏计时
   * - 如果面板已展开，则保持显示状态，等待用户主动收起
   * 
   * 逻辑判断：
   * - 面板收起状态：重新启动3秒隐藏计时器
   * - 面板展开状态：保持显示，不启动隐藏计时器
   */
  const handleMouseLeave = useCallback(() => {
    if (!isExpanded) {
      resetHideTimer()
    }
  }, [resetHideTimer, isExpanded])

  /**
   * 面板展开/收起切换处理 - 核心交互控制
   * 
   * 功能说明：
   * - 控制详细设置面板的显示/隐藏状态
   * - 管理自动隐藏计时器的启停
   * - 确保展开状态下面板始终可见
   * 
   * 执行逻辑：
   * 展开时：
   * 1. 清除所有隐藏计时器
   * 2. 强制显示面板
   * 3. 保持显示状态直到用户主动收起
   * 
   * 收起时：
   * 1. 重新启动自动隐藏计时器
   * 2. 恢复正常的3秒自动隐藏逻辑
   */
  const handleToggleExpanded = useCallback(() => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    
    if (newExpanded) {
      // 展开时：清除隐藏计时器，确保面板持续显示
      if (hideTimer) {
        clearTimeout(hideTimer)
        setHideTimer(null)
      }
      setIsVisible(true)
    } else {
      // 收起时：重新开始自动隐藏计时器
      resetHideTimer()
    }
  }, [isExpanded, hideTimer, resetHideTimer])

  /**
   * 组件初始化效果 - 启动自动隐藏机制
   * 
   * 功能说明：
   * - 组件挂载时立即启动自动隐藏计时器
   * - 确保用户首次访问时有3秒时间注意到控制面板
   * - 组件卸载时清理定时器，防止内存泄漏
   * 
   * 生命周期：
   * - 挂载时：启动隐藏计时器
   * - 卸载时：清除所有定时器
   */
  useEffect(() => {
    resetHideTimer()
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    }
  }, [])

  /**
   * 主题切换功能 - 深色/浅色模式切换
   * 
   * 功能说明：
   * - 在深色模式和浅色模式之间切换
   * - 同步更新DOM类名和localStorage存储
   * - 确保主题设置在页面刷新后保持
   * 
   * 执行流程：
   * 1. 切换isDarkMode状态
   * 2. 更新document.documentElement的dark类名
   * 3. 保存主题设置到localStorage
   * 4. 重置隐藏计时器保持面板可见
   * 
   * 存储格式：
   * - 深色模式：localStorage.theme = 'dark'
   * - 浅色模式：localStorage.theme = 'light'
   */
  const toggleTheme = useCallback(() => {
    const newIsDark = !isDarkMode
    setIsDarkMode(newIsDark)
    
    if (newIsDark) {
      // 切换到深色模式
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      // 切换到浅色模式
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    
    // 操作后重置隐藏计时器
    resetHideTimer()
  }, [isDarkMode, resetHideTimer])

  /**
   * 回到顶部功能 - 平滑滚动到页面顶部
   * 
   * 功能说明：
   * - 使用平滑滚动动画回到页面顶部
   * - 提供良好的用户体验，避免突兀的跳转
   * - 操作后重置隐藏计时器
   * 
   * 滚动配置：
   * - top: 0 - 滚动到页面最顶部
   * - behavior: 'smooth' - 使用平滑滚动动画
   */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    resetHideTimer()
  }, [resetHideTimer])

  /**
   * 显示比例变更处理函数 - 宽高比选择器回调
   * 
   * 功能说明：
   * - 处理用户选择新的显示比例
   * - 通过父组件传入的回调函数向上传递变更
   * - 实现组件间的数据流通信
   * 
   * 调用链路：
   * 1. 用户在Select组件中选择新比例
   * 2. Select触发onValueChange事件
   * 3. 调用此handleAspectRatioChange函数
   * 4. 通过onAspectRatioChange回调通知父组件
   * 5. 父组件更新状态并重新渲染
   * 
   * 参数说明：
   * @param value - 新选择的宽高比值（AspectRatio类型）
   */
  const handleAspectRatioChange = useCallback((value: AspectRatio) => {
    // 调用父组件传入的回调函数，将新的宽高比值传递给父组件
    onAspectRatioChange?.(value)
    
    // 重置隐藏计时器，保持控制面板可见
    resetHideTimer()
  }, [onAspectRatioChange, resetHideTimer])

  /**
   * 语言切换功能 - 中英文切换
   * 
   * 功能说明：
   * - 在中文(zh)和英文(en)之间切换
   * - 使用LanguageContext提供的全局语言状态
   * - 切换后立即应用到整个应用
   * 
   * 切换逻辑：
   * - 当前为英文(en) → 切换到中文(zh)
   * - 当前为中文(zh) → 切换到英文(en)
   * 
   * 状态管理：
   * - 通过useLanguage hook获取当前语言和设置函数
   * - 语言状态存储在LanguageContext中
   * - 全局组件都会响应语言变化
   */
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
              {/* 亮、暗主题切换 */}
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

              {/* 显示比例控制组件 - 完整的数据传递和UI展示流程
                  
                  【数据传递流程】:
                  1. Props传入:
                     - showAspectRatio: boolean - 从父组件传入，控制此组件的显示/隐藏状态
                     - aspectRatio: AspectRatio - 当前选中的宽高比值（如 '16:9', '4:3' 等）
                     - handleAspectRatioChange: (value: AspectRatio) => void - 宽高比变更时的回调函数
                     - aspectRatioOptions: Array<{value: string, label: string}> - 所有可选的宽高比选项数组
                  
                  2. 数据流向:
                     父组件状态 → Props → 子组件渲染 → 用户交互 → 回调函数 → 父组件状态更新 → 重新渲染
                  
                  【UI展示逻辑】:
                  1. 条件渲染: showAspectRatio为true时才显示整个组件
                  2. 布局结构: 垂直排列的标题和选择器（space-y-2间距）
                  3. 标题显示: "显示比例"文本，使用muted-foreground颜色
                  4. 选择器组件: Shadcn/ui的Select组件，支持下拉选择
                  5. 选项渲染: 遍历aspectRatioOptions数组，为每个选项创建SelectItem
                  
                  【交互机制】:
                  - 用户点击SelectTrigger → 展开下拉菜单
                  - 用户选择某个选项 → 触发onValueChange事件
                  - handleAspectRatioChange被调用 → 传递新的value值给父组件
                  - 父组件更新aspectRatio状态 → 重新渲染显示新的选中值
                  
                  【样式说明】:
                  - SelectTrigger: h-8高度，text-xs小字体
                  - SelectItem: text-xs小字体，保持一致的视觉风格
                  - 整体采用紧凑设计，适合浮动控制面板的空间限制
              */}
              {showAspectRatio && (
                <div className="space-y-2">
                  {/* 组件标题 - 使用次要文本颜色，提供用户友好的标识 */}
                  <span className="text-sm text-muted-foreground">{t.displayRatio.aspectRatioLabel}</span>
                  
                  {/* Select选择器 - Shadcn/ui组件，受控组件模式
                      - value: 当前选中的宽高比值，与父组件状态同步
                      - onValueChange: 选项变更时的回调，将新值传递给父组件
                  */}
                  <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                    {/* 选择器触发器 - 显示当前选中值，点击展开下拉菜单
                        - h-8: 固定高度8个单位，保持紧凑布局
                        - text-xs: 小字体，节省空间
                    */}
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    
                    {/* 下拉菜单内容容器 */}
                    <SelectContent>
                      {/* 动态渲染所有宽高比选项
                        数据来源: getAspectRatioOptions函数（第48-56行定义）
                        渲染逻辑: 遍历数组，为每个option创建一个SelectItem
                        key属性: 使用option.value确保React列表渲染的唯一性
                        value属性: 选项的实际值，用于状态管理和回调传递
                        显示内容: option.label，用户看到的友好文本
                    */}
                    {getAspectRatioOptions(t).map((option) => (
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