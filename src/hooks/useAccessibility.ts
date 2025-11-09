import { useState, useCallback, useRef, useEffect } from 'react'

interface AccessibilityState {
  /** 当前焦点的过滤器索引 */
  focusedFilterIndex: number
  /** 是否启用键盘导航模式 */
  keyboardNavigationActive: boolean
  /** 屏幕阅读器公告文本 */
  announcement: string
  /** 是否显示跳过链接 */
  showSkipLink: boolean
}

interface AccessibilityActions {
  /** 处理键盘导航 */
  handleKeyNavigation: (event: KeyboardEvent, filtersLength: number) => void
  /** 设置焦点到指定过滤器 */
  setFocusToFilter: (index: number) => void
  /** 公告给屏幕阅读器 */
  announceToScreenReader: (message: string) => void
  /** 重置焦点状态 */
  resetFocus: () => void
  /** 激活键盘导航模式 */
  activateKeyboardNavigation: () => void
  /** 处理跳过链接 */
  handleSkipToContent: () => void
  /** 处理过滤器焦点 */
  handleFilterFocus: (index: number) => void
  /** 处理过滤器失焦 */
  handleFilterBlur: () => void
  /** 公告过滤器变化 */
  announceFilterChange: (filterName: string, count: number) => void
  /** 设置过滤器引用 */
  setFilterRef: (index: number) => (ref: HTMLButtonElement | null) => void
}

/**
 * 无障碍性Hook
 * 管理键盘导航、焦点管理、ARIA标签和屏幕阅读器支持
 */
export const useAccessibility = (): AccessibilityState & AccessibilityActions => {
  const [state, setState] = useState<AccessibilityState>({
    focusedFilterIndex: -1,
    keyboardNavigationActive: false,
    announcement: '',
    showSkipLink: false
  })

  const announcementTimeoutRef = useRef<NodeJS.Timeout>()
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 处理键盘导航
  const handleKeyNavigation = useCallback((event: KeyboardEvent, filtersLength: number) => {
    const { key } = event
    
    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        setState(prev => {
          const nextIndex = prev.focusedFilterIndex < filtersLength - 1 
            ? prev.focusedFilterIndex + 1 
            : 0
          return {
            ...prev,
            focusedFilterIndex: nextIndex,
            keyboardNavigationActive: true
          }
        })
        break
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        setState(prev => {
          const prevIndex = prev.focusedFilterIndex > 0 
            ? prev.focusedFilterIndex - 1 
            : filtersLength - 1
          return {
            ...prev,
            focusedFilterIndex: prevIndex,
            keyboardNavigationActive: true
          }
        })
        break
        
      case 'Home':
        event.preventDefault()
        setState(prev => ({
          ...prev,
          focusedFilterIndex: 0,
          keyboardNavigationActive: true
        }))
        break
        
      case 'End':
        event.preventDefault()
        setState(prev => ({
          ...prev,
          focusedFilterIndex: filtersLength - 1,
          keyboardNavigationActive: true
        }))
        break
        
      case 'Escape':
        setState(prev => ({
          ...prev,
          focusedFilterIndex: -1,
          keyboardNavigationActive: false
        }))
        break
    }
  }, [])

  // 设置焦点到指定过滤器
  const setFocusToFilter = useCallback((index: number) => {
    if (filterRefs.current[index]) {
      filterRefs.current[index]?.focus()
      setState(prev => ({
        ...prev,
        focusedFilterIndex: index,
        keyboardNavigationActive: true
      }))
    }
  }, [])

  // 公告给屏幕阅读器
  const announceToScreenReader = useCallback((message: string) => {
    setState(prev => ({ ...prev, announcement: message }))
    
    // 清除之前的定时器
    if (announcementTimeoutRef.current) {
      clearTimeout(announcementTimeoutRef.current)
    }
    
    // 短暂延迟后清除公告，避免重复
    announcementTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, announcement: '' }))
    }, 1000)
  }, [])

  // 重置焦点状态
  const resetFocus = useCallback(() => {
    setState(prev => ({
      ...prev,
      focusedFilterIndex: -1,
      keyboardNavigationActive: false
    }))
  }, [])

  // 激活键盘导航模式
  const activateKeyboardNavigation = useCallback(() => {
    setState(prev => ({
      ...prev,
      keyboardNavigationActive: true,
      showSkipLink: true
    }))
  }, [])

  // 处理跳过链接
  const handleSkipToContent = useCallback(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // 监听键盘事件以检测键盘导航
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        activateKeyboardNavigation()
      }
    }

    const handleMouseDown = () => {
      setState(prev => ({
        ...prev,
        keyboardNavigationActive: false,
        showSkipLink: false
      }))
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (announcementTimeoutRef.current) {
        clearTimeout(announcementTimeoutRef.current)
      }
    }
  }, [])

  // 管理过滤器引用
  const setFilterRef = useCallback((index: number) => {
    return (ref: HTMLButtonElement | null) => {
      filterRefs.current[index] = ref
    }
  }, [])

  const handleFilterFocus = useCallback((index: number) => {
    setFocusToFilter(index)
  }, [setFocusToFilter])

  const handleFilterBlur = useCallback(() => {
    resetFocus()
  }, [resetFocus])

  const announceFilterChange = useCallback((filterName: string, count: number) => {
    const message = `已选择${filterName}过滤器，显示${count}个事件`
    announceToScreenReader(message)
  }, [announceToScreenReader])

  return {
    ...state,
    handleKeyNavigation,
    setFocusToFilter,
    announceToScreenReader,
    resetFocus,
    activateKeyboardNavigation,
    handleSkipToContent,
    setFilterRef,
    handleFilterFocus,
    handleFilterBlur,
    announceFilterChange
  }
}

export default useAccessibility