import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // 配置静态文件服务，允许访问docs目录
    fs: {
      allow: ['..', 'docs']
    },
    proxy: {
      // 高德地图API代理配置
      '/_AMapService': {
        target: 'https://restapi.amap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_AMapService/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // 添加安全密钥到请求参数
            const url = new URL(proxyReq.path || '', 'https://restapi.amap.com')
            url.searchParams.append('jscode', '56b9003040769f3afb14593ca6c4a8ae')
            proxyReq.path = url.pathname + url.search
          })
        }
      }
    }
  },
  // 配置静态文件服务
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React 核心拆分
          if (id.includes('react-dom/client')) {
            return 'react-dom-client';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react/jsx-runtime')) {
            return 'react-jsx';
          }
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-router') && !id.includes('@react-three')) {
            return 'react-core';
          }
          
          // Three.js 细粒度拆分
          if (id.includes('three/examples/jsm')) {
            return 'three-examples';
          }
          if (id.includes('@react-three/fiber')) {
            return 'r3f-fiber';
          }
          if (id.includes('@react-three/drei')) {
            return 'r3f-drei';
          }
          if (id.includes('three') && !id.includes('@react-three') && !id.includes('three/examples')) {
            return 'three-core';
          }
          
          // 路由相关细分
          if (id.includes('react-router-dom')) {
            return 'router-dom';
          }
          if (id.includes('react-router')) {
            return 'router-core';
          }
          
          // UI 组件库细分
          if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-dropdown-menu')) {
            return 'radix-overlays';
          }
          if (id.includes('@radix-ui')) {
            return 'radix-core';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // 动画和交互库
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          
          // 工具库细分
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          if (id.includes('clsx') || id.includes('class-variance-authority')) {
            return 'style-utils';
          }
          
          // 状态管理
          if (id.includes('zustand') || id.includes('jotai')) {
            return 'state-management';
          }
          
          // 网络请求
          if (id.includes('axios') || id.includes('ky')) {
            return 'http-client';
          }
          
          // Markdown 相关 - 细分
          if (id.includes('react-markdown')) {
            return 'react-markdown';
          }
          if (id.includes('remark') || id.includes('rehype')) {
            return 'markdown-processors';
          }
          
          // 代码高亮 - 细分
          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-highlighter';
          }
          if (id.includes('prismjs')) {
            return 'prism';
          }
          
          // Vercel 分析工具
          if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
            return 'vercel-analytics';
          }
          
          // Tailwind 相关
          if (id.includes('tailwind')) {
            return 'tailwind-utils';
          }
          
          // 国际化
          if (id.includes('react-i18next') || id.includes('i18next')) {
            return 'i18n';
          }
          
          // 监控和错误追踪
          if (id.includes('@sentry')) {
            return 'sentry';
          }
          
          // 其他工具库
          if (id.includes('react-helmet')) {
            return 'react-helmet';
          }
          
          // 其他较小的依赖
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // 启用压缩
    minify: 'terser',
    // 移除 console 和 debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 启用 gzip 压缩提示
    reportCompressedSize: true,
    // 设置 chunk 大小警告限制 (KB)
    chunkSizeWarningLimit: 300,
    // 优化构建性能
    target: 'esnext',
    sourcemap: false,
    // CSS 代码分割
    cssCodeSplit: true,
    // 预加载模块
    modulePreload: {
      polyfill: true
    },
    // 资源内联阈值
    assetsInlineLimit: 4096,
  }
})
