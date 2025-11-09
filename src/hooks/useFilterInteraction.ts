import { useState, useCallback, useRef, useEffect } from 'react'

interface FilterInteractionState {
  /** 是否正在执行过滤动画 */
  isFiltering: boolean
  /** 当前悬停的过滤器 */
  hoveredFilter: string | null
  /** 过滤器切换动画状态 */
  switchAnimation: boolean
  /** 事件列表淡入动画状态 */
  listFadeIn: boolean
}

interface FilterInteractionActions {
  /** 触发过滤器切换动画 */
  triggerFilterSwitch: () => void
  /** 设置悬停的过滤器 */
  setHoveredFilter: (filterId: string | null) => void
  /** 触发事件列表重新渲染动画 */
  triggerListRefresh: () => void
  /** 重置所有动画状态 */
  resetAnimations: () => void
}

/**
 * 过滤器交互动画Hook
 * 管理过滤器切换、悬停效果和事件列表更新的动画状态
 */
export const useFilterInteraction = (): FilterInteractionState & FilterInteractionActions => {
  const [state, setState] = useState<FilterInteractionState>({
    isFiltering: false,
    hoveredFilter: null,
    switchAnimation: false,
    listFadeIn: true
  })

  const filterTimeoutRef = useRef<NodeJS.Timeout>()
  const listTimeoutRef = useRef<NodeJS.Timeout>()

  // 触发过滤器切换动画
  const triggerFilterSwitch = useCallback(() => {
    setState(prev => ({ ...prev, isFiltering: true, switchAnimation: true }))
    
    // 清除之前的定时器
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current)
    }
    
    // 动画持续时间后重置状态
    filterTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isFiltering: false, switchAnimation: false }))
    }, 300)
  }, [])

  // 设置悬停的过滤器
  const setHoveredFilter = useCallback((filterId: string | null) => {
    setState(prev => ({ ...prev, hoveredFilter: filterId }))
  }, [])

  // 触发事件列表刷新动画
  const triggerListRefresh = useCallback(() => {
    setState(prev => ({ ...prev, listFadeIn: false }))
    
    // 清除之前的定时器
    if (listTimeoutRef.current) {
      clearTimeout(listTimeoutRef.current)
    }
    
    // 短暂延迟后触发淡入动画
    listTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, listFadeIn: true }))
    }, 50)
  }, [])

  // 重置所有动画状态
  const resetAnimations = useCallback(() => {
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current)
    }
    if (listTimeoutRef.current) {
      clearTimeout(listTimeoutRef.current)
    }
    
    setState({
      isFiltering: false,
      hoveredFilter: null,
      switchAnimation: false,
      listFadeIn: true
    })
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current)
      }
      if (listTimeoutRef.current) {
        clearTimeout(listTimeoutRef.current)
      }
    }
  }, [])

  return {
    ...state,
    triggerFilterSwitch,
    setHoveredFilter,
    triggerListRefresh,
    resetAnimations
  }
}

export default useFilterInteraction