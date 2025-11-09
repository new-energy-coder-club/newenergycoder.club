import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FilterButtonProps {
  /** 按钮文本 */
  children: React.ReactNode
  /** 是否为选中状态 */
  isSelected?: boolean
  /** 事件数量，显示为徽章 */
  count?: number
  /** 点击事件处理器 */
  onClick?: () => void
  /** 鼠标进入事件处理器 */
  onMouseEnter?: () => void
  /** 鼠标离开事件处理器 */
  onMouseLeave?: () => void
  /** 失焦事件处理器 */
  onBlur?: () => void
  /** 键盘事件处理器 */
  onKeyDown?: (event: React.KeyboardEvent) => void
  /** 自定义类名 */
  className?: string
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否禁用 */
  disabled?: boolean
  /** 无障碍标签 */
  'aria-label'?: string
  /** 是否获得焦点 */
  isFocused?: boolean
  /** 按钮引用 */
  ref?: React.Ref<HTMLButtonElement>
  /** 按钮ID */
  id?: string
  /** ARIA描述ID */
  'aria-describedby'?: string
}

/**
 * 响应式过滤器按钮组件
 * 支持事件计数徽章、响应式尺寸和交互动画
 */
export const FilterButton = React.memo(React.forwardRef<HTMLButtonElement, FilterButtonProps>((
  {
    children,
    isSelected = false,
    count,
    onClick,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  onKeyDown,
    className,
    size = 'sm',
    disabled = false,
    isFocused = false,
    id,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) => {
  // 响应式尺寸配置
  const sizeClasses = {
    sm: 'text-xs sm:text-sm px-3 py-2 h-8 sm:h-9',
    md: 'text-sm sm:text-base px-4 py-2 h-9 sm:h-10',
    lg: 'text-base sm:text-lg px-5 py-3 h-10 sm:h-11'
  }

  // 徽章尺寸配置
  const badgeSizes = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm'
  }

  return (
    <Button
      ref={ref}
      id={id}
      variant={isSelected ? 'default' : 'outline'}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-describedby={ariaDescribedBy}
      role="tab"
      tabIndex={isFocused ? 0 : -1}
      className={cn(
        // 基础样式
        'filter-button relative group transition-all duration-300',
        // 响应式尺寸
        sizeClasses[size],
        // 悬停和选中效果
        'hover-lift hover:shadow-md',
        isSelected && 'shadow-sm ring-2 ring-primary/20',
        // 焦点样式
        isFocused && 'ring-2 ring-primary ring-offset-2',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        // 禁用状态
        disabled && 'opacity-50 cursor-not-allowed',
        // 自定义类名
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 relative z-10">
        {children}
        {count !== undefined && count > 0 && (
          <Badge
            variant="secondary"
            className={cn(
              'count-badge ml-1 p-0 flex items-center justify-center',
              'bg-primary/10 text-primary border-primary/20',
              'group-hover:bg-primary/20 transition-colors duration-200',
              isSelected && 'bg-primary-foreground/20 text-primary-foreground',
              badgeSizes[size]
            )}
          >
            {count > 99 ? '99+' : count}
          </Badge>
        )}
      </span>
      
      {/* 悬停光效 */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Button>
  )
}
))

FilterButton.displayName = 'FilterButton'