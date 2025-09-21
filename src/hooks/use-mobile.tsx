/* 
  IMPORTANT: Do not modify this file.
  This is a core hook for mobile detection and should remain unchanged.
*/

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') return
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }
    
    // 安全地添加事件监听器
    if (mql && typeof mql.addEventListener === 'function') {
      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    return () => {
      if (mql && typeof mql.removeEventListener === 'function') {
        mql.removeEventListener("change", onChange)
      }
    }
  }, [])

  return !!isMobile
}
