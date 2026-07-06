import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ImageProxyProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  className?: string;
}

/**
 * 对图片 URL 进行安全编码，避免中文/特殊字符路径导致 400 Bad Request
 * 仅编码 pathname 中的每一段，保留协议、域名、查询参数
 */
function encodeImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname
      .split('/')
      .map((segment) => {
        if (!segment) return segment;
        // 如果段已经包含 percent-encoding，跳过避免双重编码
        if (/%[0-9A-Fa-f]{2}/.test(segment)) return segment;
        return encodeURIComponent(segment);
      })
      .join('/');
    return parsed.toString();
  } catch {
    return url;
  }
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
  const encodedSrc = useMemo(() => encodeImageUrl(src), [src]);
  const [imageSrc, setImageSrc] = useState(encodedSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [triedEncoded, setTriedEncoded] = useState(false);

  useEffect(() => {
    const nextSrc = encodeImageUrl(src);
    setImageSrc(nextSrc);
    setIsLoading(true);
    setHasError(false);
    setTriedEncoded(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);

    // 首次出错且当前不是编码后的 URL，尝试编码后重试
    // 这对 R2 + Cloudflare 场景特别重要：中文路径未编码会返回 400
    if (!triedEncoded && imageSrc === src) {
      const encoded = encodeImageUrl(src);
      if (encoded !== imageSrc) {
        setImageSrc(encoded);
        setHasError(false);
        setIsLoading(true);
        setTriedEncoded(true);
        return;
      }
    }

    // 如果有 fallback 图片，尝试使用 fallback
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
      return;
    }

    // 尝试多种图片代理服务来解决 ORB 问题
    const proxyServices = [
      // GitHub raw 链接的 CDN 替代方案
      (url: string) => {
        if (url.includes('raw.githubusercontent.com')) {
          return url
            .replace('raw.githubusercontent.com', 'cdn.jsdelivr.net/gh')
            .replace('/main/', '@main/');
        }
        return null;
      },
      // Unsplash 图片的优化
      (url: string) => {
        if (url.includes('images.unsplash.com')) {
          // 移除可能导致 CORS 问题的参数，使用基础 URL
          const baseUrl = url.split('?')[0];
          return `${baseUrl}?auto=format&fit=crop&w=400&h=250&q=80`;
        }
        return null;
      },
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
        loading={props.loading ?? 'lazy'}
        decoding={props.decoding ?? 'async'}
        {...props}
      />
    </>
  );
};

export default ImageProxy;
