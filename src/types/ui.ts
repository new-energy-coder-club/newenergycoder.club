// UI相关的类型定义

// 通用UI组件属性
export interface BaseUIProps {
  className?: string
  children?: React.ReactNode
}

// 按钮变体类型
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

// 按钮尺寸类型
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

// 卡片变体类型
export type CardVariant = 'default' | 'outline' | 'filled'

// 徽章变体类型
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

// 输入框类型
export interface InputProps extends BaseUIProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

// 模态框属性
export interface ModalProps extends BaseUIProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
}

// 下拉菜单项
export interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
}

// 表格列定义
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: number | string
  align?: 'left' | 'center' | 'right'
}

// 分页属性
export interface PaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (page: number, pageSize: number) => void
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}

// 加载状态
export interface LoadingState {
  loading: boolean
  error?: string | null
}

// 主题相关
export type ThemeMode = 'light' | 'dark' | 'system'

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 动画类型
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'none'

// 位置类型
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center'

// 对齐方式
export type Alignment = 'start' | 'center' | 'end' | 'stretch'

// 方向类型
export type Direction = 'horizontal' | 'vertical'

// 宽高比类型
export type AspectRatio = 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/10]' | 'aspect-[21/9]'

// 尺寸类型
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 状态类型
export type Status = 'success' | 'warning' | 'error' | 'info' | 'default'

// 颜色类型
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default'

// 间距类型
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64

// 圆角类型
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

// 阴影类型
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 过渡效果
export type Transition = 'none' | 'all' | 'colors' | 'opacity' | 'shadow' | 'transform'

// 通用事件处理器
export type EventHandler<T = any> = (event: T) => void

// 通用回调函数
export type Callback<T = void> = () => T

// 异步回调函数
export type AsyncCallback<T = void> = () => Promise<T>

// 可选的异步回调
export type OptionalAsyncCallback<T = void> = AsyncCallback<T> | undefined

// 渲染函数类型
export type RenderFunction<T = any> = (props: T) => React.ReactNode

// 条件渲染类型
export type ConditionalRender = boolean | (() => boolean)

// 样式对象类型
export type StyleObject = React.CSSProperties

// 类名类型
export type ClassName = string | string[] | Record<string, boolean> | undefined

// 组件引用类型
export type ComponentRef<T = HTMLElement> = React.RefObject<T> | React.MutableRefObject<T>

// 表单字段类型
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    custom?: (value: any) => boolean | string
  }
}

// 表单数据类型
export type FormData = Record<string, any>

// 表单错误类型
export type FormErrors = Record<string, string>

// 导出所有类型的联合类型，便于批量导入
export type UITypes = 
  | BaseUIProps
  | ButtonVariant
  | ButtonSize
  | CardVariant
  | BadgeVariant
  | InputProps
  | ModalProps
  | DropdownItem
  | TableColumn
  | PaginationProps
  | LoadingState
  | ThemeMode
  | Breakpoint
  | AnimationType
  | Position
  | Alignment
  | Direction
  | Size
  | Status
  | Color
  | Spacing
  | BorderRadius
  | Shadow
  | Transition