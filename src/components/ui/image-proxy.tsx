import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageProxyProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  className?: string;
}

/**
 * 图片代理组件，用于处理外部图片资源的ORB（Opaque Response Blocking）问题
 * 通过添加crossOrigin属性和错误处理来避免CORS问题
 */
export const ImageProxy: React.FC<ImageProxyProps> = ({
  src,
  fallbackSrc,
  className,
  alt = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // 如果有fallback图片，尝试使用fallback
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
      return;
    }
    
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
          // 移除可能导致CORS问题的参数，使用基础URL
          const baseUrl = url.split('?')[0];
          return `${baseUrl}?auto=format&fit=crop&w=400&h=250&q=80`;
        }
        return null;
      },
      // 通用图片代理服务
      (url: string) => {
        // 使用图片代理服务（注意：生产环境中应该使用自己的代理服务）
        if (url.startsWith('http') && !url.includes('localhost')) {
          return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&h=250&fit=cover&a=attention`;
        }
        return null;
      }
    ];
    
    // 尝试每个代理服务
    for (const proxyService of proxyServices) {
      const proxyUrl = proxyService(src);
      if (proxyUrl && imageSrc !== proxyUrl) {
        setImageSrc(proxyUrl);
        setHasError(false);
        setIsLoading(true);
        return;
      }
    }
  };

  if (hasError && (!fallbackSrc || imageSrc === fallbackSrc)) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400 text-sm',
          className
        )}
        {...props}
      >
        图片加载失败
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div 
          className={cn(
            'flex items-center justify-center bg-gray-100 animate-pulse',
            className
          )}
        >
          <div className="text-gray-400 text-sm">加载中...</div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={cn(className, isLoading && 'hidden')}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        {...props}
      />
    </>
  );
};

export default ImageProxy;