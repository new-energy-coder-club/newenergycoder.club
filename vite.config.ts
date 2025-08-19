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
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖分离到单独的 chunk
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
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
    // 设置 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  // GitHub Pages 部署配置
  base: process.env.NODE_ENV === 'production' ? '/Energy-Coder-Club-Website/' : '/'
})
