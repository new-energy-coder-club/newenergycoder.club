import { useState, useEffect, useCallback } from 'react'

/**
 * 动态计算Header高度的Hook
 * 支持窗口大小变化和Header内容变化的自动更新
 */
export const useHeaderHeight = (): number => {
  const [headerHeight, setHeaderHeight] = useState(64) // 默认值

  const updateHeaderHeight = useCallback(() => {
    const header = document.querySelector('header')
    if (header) {
      const height = header.getBoundingClientRect().height
      setHeaderHeight(height)
    }
  }, [])

  useEffect(() => {
    // 节流函数，限制更新频率
    let timeoutId: NodeJS.Timeout
    const throttledUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateHeaderHeight, 100)
    }

    // 初始计算
    updateHeaderHeight()

    // 监听窗口大小变化
    window.addEventListener('resize', throttledUpdate)

    // 监听Header DOM变化
    const observer = new ResizeObserver(throttledUpdate)
    const header = document.querySelector('header')
    if (header) {
      observer.observe(header)
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', throttledUpdate)
      observer.disconnect()
    }
  }, [updateHeaderHeight])

  return headerHeight
}

export default useHeaderHeight