import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 检测WebP支持
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const dataURL = canvas.toDataURL('image/webp');
        setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
      }
    };
    checkWebPSupport();
  }, []);

  // 懒加载逻辑
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px'
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // 尝试多种图片代理服务来解决ORB问题
    const proxyServices = [
      // GitHub raw链接的CDN替代方案
      (url: string) => {
        if (url.includes('raw.githubusercontent.com')) {
          return url
            .replace('raw.githubusercontent.com', 'cdn.jsdelivr.net/gh')
            .replace('/main/', '@main/');
        }
        return null;
      },
      // Unsplash图片的优化
      (url: string) => {
        if (url.includes('images.unsplash.com')) {
          const baseUrl = url.split('?')[0];
          return `${baseUrl}?auto=format&fit=crop&w=400&h=250&q=80`;
        }
        return null;
      },
      // 通用图片代理服务
      (url: string) => {
        if (url.startsWith('http') && !url.includes('localhost') && retryCount < 2) {
          return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&h=250&fit=cover&a=attention`;
        }
        return null;
      }
    ];
    
    // 如果还有重试机会，尝试代理服务
    if (retryCount < proxyServices.length) {
      const proxyService = proxyServices[retryCount];
      const proxyUrl = proxyService(src);
      
      if (proxyUrl && currentSrc !== proxyUrl) {
        setCurrentSrc(proxyUrl);
        setRetryCount(retryCount + 1);
        setHasError(false);
        setIsLoaded(false);
        return;
      }
    }
    
    // 所有重试都失败了
    setHasError(true);
    onError?.();
  };

  // 生成优化的图片URL
  const getOptimizedSrc = (originalSrc: string) => {
    // 如果是外部URL或已经是优化格式，直接返回
    if (originalSrc.startsWith('http') || originalSrc.includes('.webp')) {
      return originalSrc;
    }

    // 对于本地图片，尝试使用WebP格式
    if (supportsWebP && !originalSrc.includes('.svg')) {
      const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return webpSrc;
    }

    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(currentSrc);
  
  // 重置状态当src改变时
  useEffect(() => {
    setCurrentSrc(src);
    setRetryCount(0);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  return (
    <div 
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {/* 占位符 */}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      
      {/* 主图片 */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      )}
      
      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;