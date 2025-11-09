import { useState, useCallback } from 'react'

/**
 * 过滤器动画状态管理Hook
 * 提供动画触发和状态管理功能
 */
interface FilterAnimationState {
  animationClass: string
  triggerAnimation: () => void
  isAnimating: boolean
}

export const useFilterAnimation = (): FilterAnimationState => {
  const [animationClass, setAnimationClass] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return // 防止重复触发

    setIsAnimating(true)
    setAnimationClass('filter-changing')

    // 清除动画类和状态
    setTimeout(() => {
      setAnimationClass('')
      setIsAnimating(false)
    }, 300)
  }, [isAnimating])

  return {
    animationClass,
    triggerAnimation,
    isAnimating
  }
}

export default useFilterAnimation