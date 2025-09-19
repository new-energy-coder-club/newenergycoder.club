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
          // React 核心库
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // 路由相关
          if (id.includes('react-router')) {
            return 'router';
          }
          // UI 组件库
          if (id.includes('@radix-ui') || id.includes('framer-motion')) {
            return 'ui-vendor';
          }
          // 图标库
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Markdown 相关
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
            return 'markdown';
          }
          // 代码高亮
          if (id.includes('react-syntax-highlighter') || id.includes('prismjs')) {
            return 'syntax-highlighter';
          }
          // 3D 库
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          // 状态管理
          if (id.includes('zustand')) {
            return 'state-management';
          }
          // Vercel 分析工具
          if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
            return 'vercel-analytics';
          }
          // 其他 node_modules 依赖
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
    chunkSizeWarningLimit: 500,
    // 优化构建性能
    target: 'esnext',
    sourcemap: false,
  }
})
