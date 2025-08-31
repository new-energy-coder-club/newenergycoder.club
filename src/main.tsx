import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSentry } from './lib/sentry'
import { performanceMonitor, observePageVisibility } from './lib/performance'

// 初始化Sentry错误监控
initSentry();

// 初始化性能监控
performanceMonitor.init();
observePageVisibility();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
