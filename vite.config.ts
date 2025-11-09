import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 确保只加载单实例的 React，避免依赖中重复引入导致运行时异常
    dedupe: ["react", "react-dom"],
  },
  // 稳定依赖预打包，避免 Radix 等依赖在开发模式下出现不一致
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast"
    ],
    // 排除 Node 内置模块，防止被不必要地预打包到浏览器运行环境
    exclude: ["path", "fs", "crypto", "util"],
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
          // 简化拆分策略以对齐 2113f5d，降低运行时分块加载风险
          // React 核心拆分 - 保持不变
          if (id.includes('react-dom/client')) {
            return 'react-dom-client';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react/jsx-runtime')) {
            return 'react-jsx';
          }
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-router')) {
            return 'react-core';
          }
          
          // 移除Three.js相关细分，当前项目已移除3D动画依赖
          
          // 路由相关细分
          if (id.includes('react-router-dom')) {
            return 'router-dom';
          }
          if (id.includes('react-router')) {
            return 'router-core';
          }
          
          // UI 组件库更细分 - 解决radix过大问题
          if (id.includes('@radix-ui/react-dialog')) {
            return 'radix-dialog';
          }
          if (id.includes('@radix-ui/react-dropdown-menu')) {
            return 'radix-dropdown';
          }
          if (id.includes('@radix-ui/react-select')) {
            return 'radix-select';
          }
          if (id.includes('@radix-ui/react-tabs')) {
            return 'radix-tabs';
          }
          if (id.includes('@radix-ui/react-toast')) {
            return 'radix-toast';
          }
          if (id.includes('@radix-ui/react-tooltip')) {
            return 'radix-tooltip';
          }
          if (id.includes('@radix-ui')) {
            return 'radix-base';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // 动画和交互库
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          
          // 样式工具库细分
          if (id.includes('tailwind-merge')) {
            return 'tailwind-merge';
          }
          if (id.includes('tailwindcss-animate')) {
            return 'tailwind-animate';
          }
          if (id.includes('@tailwindcss/typography')) {
            return 'tailwind-typography';
          }
          if (id.includes('clsx') || id.includes('class-variance-authority')) {
            return 'style-utils';
          }
          
          // 状态管理
          if (id.includes('zustand')) {
            return 'state-management';
          }
          
          // Markdown 相关 - 细分
          if (id.includes('react-markdown')) {
            return 'react-markdown';
          }
          if (id.includes('remark-gfm')) {
            return 'remark-gfm';
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
          
          // 监控和分析工具分离
          if (id.includes('@vercel/analytics')) {
            return 'vercel-analytics';
          }
          if (id.includes('@vercel/speed-insights')) {
            return 'vercel-insights';
          }
          if (id.includes('@sentry/react')) {
            return 'sentry-react';
          }
          if (id.includes('@sentry/tracing')) {
            return 'sentry-tracing';
          }
          if (id.includes('@sentry')) {
            return 'sentry-core';
          }
          
          // 国际化
          if (id.includes('react-i18next')) {
            return 'react-i18next';
          }
          if (id.includes('i18next')) {
            return 'i18next-core';
          }
          
          // React 相关工具
          if (id.includes('react-helmet-async')) {
            return 'react-helmet';
          }
          
          // 按使用频率和大小分组的vendor chunks - 更细粒度拆分
          if (id.includes('node_modules')) {
            // 大型但不常变化的库
            if (id.includes('typescript') || id.includes('terser')) {
              return 'build-tools';
            }
            
            // 测试相关库
            if (id.includes('@testing-library') || id.includes('vitest') || id.includes('jsdom')) {
              return 'testing-libs';
            }
            
            // 类型定义文件
            if (id.includes('@types/')) {
              return 'type-definitions';
            }
            
            // ESLint 相关
            if (id.includes('eslint') || id.includes('globals')) {
              return 'linting-tools';
            }
            
            // PostCSS 和 Autoprefixer
            if (id.includes('postcss') || id.includes('autoprefixer')) {
              return 'css-processors';
            }
            
            // Wrangler 和 Cloudflare 相关
            if (id.includes('wrangler') || id.includes('cloudflare')) {
              return 'cloudflare-tools';
            }
            
            // 覆盖率工具
            if (id.includes('coverage') || id.includes('c8') || id.includes('v8')) {
              return 'coverage-tools';
            }
            
            // 剩余的小型工具库按功能分类
            if (id.includes('path') || id.includes('fs') || id.includes('util') || id.includes('crypto')) {
              return 'node-utils';
            }
          
            // 进一步细分大型依赖库
            if (id.includes('lodash') || id.includes('ramda') || id.includes('underscore')) {
              return 'utility-libs';
            }
            
            // 日期处理库
            if (id.includes('moment') || id.includes('dayjs') || id.includes('date-fns')) {
              return 'date-libs';
            }
            
            // HTTP 客户端
            if (id.includes('axios') || id.includes('fetch') || id.includes('request')) {
              return 'http-clients';
            }
            
            // 表单处理
            if (id.includes('formik') || id.includes('react-hook-form') || id.includes('yup')) {
              return 'form-libs';
            }
            
            // 图表库
            if (id.includes('chart') || id.includes('d3') || id.includes('recharts')) {
              return 'chart-libs';
            }
            
            // 数据处理
            if (id.includes('immutable') || id.includes('immer') || id.includes('normalizr')) {
              return 'data-libs';
            }
            
            // 其他未分类的小型依赖
             return 'vendor-misc';
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
    // 设置 chunk 大小警告限制 (KB) - 调整以适应当前文件大小
    chunkSizeWarningLimit: 1000,
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
