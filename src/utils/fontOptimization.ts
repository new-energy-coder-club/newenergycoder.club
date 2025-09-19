// 字体优化工具

/**
 * 预加载关键字体
 */
export const preloadFonts = () => {
  const fonts = [
    // 添加项目中使用的关键字体
    {
      href: '/fonts/inter-var.woff2',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    }
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = font.href;
    link.type = font.type;
    link.crossOrigin = font.crossorigin;
    document.head.appendChild(link);
  });
};

/**
 * 字体显示优化
 */
export const optimizeFontDisplay = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* 字体显示优化 */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
    
    /* 减少布局偏移 */
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
  `;
  document.head.appendChild(style);
};

/**
 * 检测字体加载状态
 */
export const checkFontLoading = async (fontFamily: string, timeout = 3000): Promise<boolean> => {
  if (!('fonts' in document)) {
    return false;
  }

  try {
    await Promise.race([
      document.fonts.load(`1em ${fontFamily}`),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Font load timeout')), timeout)
      )
    ]);
    return document.fonts.check(`1em ${fontFamily}`);
  } catch {
    return false;
  }
};

/**
 * 字体加载性能监控
 */
export const monitorFontPerformance = () => {
  if ('fonts' in document) {
    document.fonts.addEventListener('loadingdone', () => {
      console.log('All fonts loaded');
    });

    document.fonts.addEventListener('loadingerror', (event) => {
      console.warn('Font loading error:', event);
    });
  }
};

/**
 * 初始化字体优化
 */
export const initFontOptimization = () => {
  // 预加载字体
  preloadFonts();
  
  // 优化字体显示
  optimizeFontDisplay();
  
  // 监控字体性能
  if (process.env.NODE_ENV === 'development') {
    monitorFontPerformance();
  }
};