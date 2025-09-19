/**
 * 懒加载链接检测组件
 * 实现性能优化的链接检测功能
 */

import React, { Suspense, lazy, memo } from 'react';
import { LinkDetectorProps } from '../types/LinkDetection';

// 懒加载链接检测组件
const LinkDetectorComponent = lazy(() => 
  import('./LinkDetectorComponent').then(module => ({
    default: module.LinkDetectorComponent
  }))
);

/**
 * 加载中组件
 */
const LoadingFallback: React.FC = memo(() => (
  <div className="link-detector link-detector--loading">
    <div className="link-detector__title">
      <div className="loading-spinner" />
      正在加载链接检测...
    </div>
    <div className="link-stats">
      <div className="link-stats__item">
        <span className="link-stats__value">-</span>
        <span className="link-stats__label">总链接</span>
      </div>
      <div className="link-stats__item">
        <span className="link-stats__value">-</span>
        <span className="link-stats__label">有效</span>
      </div>
      <div className="link-stats__item">
        <span className="link-stats__value">-</span>
        <span className="link-stats__label">无效</span>
      </div>
      <div className="link-stats__item">
        <span className="link-stats__value">-</span>
        <span className="link-stats__label">检查中</span>
      </div>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

/**
 * 错误边界组件
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class LinkDetectorErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LinkDetector Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="link-detector">
          <div className="error-message">
            <strong>链接检测组件加载失败</strong>
            <br />
            {this.state.error?.message || '未知错误'}
            <br />
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{
                marginTop: '8px',
                padding: '4px 8px',
                background: 'transparent',
                border: '1px solid currentColor',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              重试
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 懒加载链接检测器属性
 */
export interface LazyLinkDetectorProps extends LinkDetectorProps {
  /** 是否启用懒加载 */
  enableLazyLoading?: boolean;
  /** 自定义加载组件 */
  fallback?: React.ComponentType;
  /** 错误处理回调 */
  onError?: (error: Error) => void;
}

/**
 * 懒加载链接检测器组件
 * 
 * @example
 * ```tsx
 * <LazyLinkDetector 
 *   content="这是包含链接的内容"
 *   enableLazyLoading={true}
 * />
 * ```
 */
export const LazyLinkDetector: React.FC<LazyLinkDetectorProps> = memo(({
  enableLazyLoading = true,
  fallback: CustomFallback,
  onError,
  ...props
}) => {
  // 如果禁用懒加载，直接渲染组件
  if (!enableLazyLoading) {
    return (
      <LinkDetectorErrorBoundary>
        <LinkDetectorComponent {...props} />
      </LinkDetectorErrorBoundary>
    );
  }

  const FallbackComponent = CustomFallback || LoadingFallback;

  return (
    <LinkDetectorErrorBoundary>
      <Suspense fallback={<FallbackComponent />}>
        <LinkDetectorComponent {...props} />
      </Suspense>
    </LinkDetectorErrorBoundary>
  );
});

LazyLinkDetector.displayName = 'LazyLinkDetector';

/**
 * 使用Intersection Observer的可视区域懒加载组件
 */
export interface ViewportLazyLinkDetectorProps extends LazyLinkDetectorProps {
  /** 根边距 */
  rootMargin?: string;
  /** 阈值 */
  threshold?: number;
  /** 是否只加载一次 */
  once?: boolean;
}

/**
 * 可视区域懒加载链接检测器
 * 只有当组件进入可视区域时才开始加载
 */
export const ViewportLazyLinkDetector: React.FC<ViewportLazyLinkDetectorProps> = memo(({
  rootMargin = '50px',
  threshold = 0.1,
  once = true,
  ...props
}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 如果已经加载过且设置了只加载一次，则不再监听
    if (hasLoaded && once) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasLoaded(true);
          
          // 如果设置了只加载一次，则停止观察
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, once, hasLoaded]);

  return (
    <div ref={ref} className="viewport-lazy-link-detector">
      {(isIntersecting || hasLoaded) ? (
        <LazyLinkDetector {...props} />
      ) : (
        <div className="link-detector">
          <div className="empty-state">
            <div className="empty-state__title">链接检测</div>
            <div className="empty-state__description">
              滚动到此处以加载链接检测功能
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ViewportLazyLinkDetector.displayName = 'ViewportLazyLinkDetector';

// 导出类型
export type { LinkDetectorProps } from '../types/LinkDetection';

// 默认导出
export default LazyLinkDetector;