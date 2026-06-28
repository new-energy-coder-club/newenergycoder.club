import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSentry } from './lib/sentry'
import { performanceMonitor, observePageVisibility } from './lib/performance'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册 GSAP 插件（仅在客户端执行）
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 初始化Sentry错误监控（防止初始化失败阻断启动）
try {
  initSentry();
} catch (e) {
  console.error('[Bootstrap] Sentry 初始化失败，继续启动：', e);
}

// 初始化性能监控（容错保护）
try {
  performanceMonitor.init();
  observePageVisibility();
} catch (e) {
  console.warn('[Bootstrap] 性能监控初始化失败：', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
