import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type AspectRatio = 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/10]' | 'aspect-[21/9]'

interface AspectRatioSelectorProps {
  value: AspectRatio
  onValueChange: (value: AspectRatio) => void
  className?: string
}

const aspectRatioOptions: { value: AspectRatio; label: string }[] = [
  { value: 'aspect-square', label: '正方形 (1:1)' },
  { value: 'aspect-video', label: '视频比例 (16:9)' },
  { value: 'aspect-[4/3]', label: '传统比例 (4:3)' },
  { value: 'aspect-[3/4]', label: '竖直比例 (3:4)' },
  { value: 'aspect-[16/10]', label: '宽屏比例 (16:10)' },
  { value: 'aspect-[21/9]', label: '超宽比例 (21:9)' }
]

export function AspectRatioSelector({ value, onValueChange, className }: AspectRatioSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <label className="text-sm font-medium whitespace-nowrap">显示比例:</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {aspectRatioOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { aspectRatioOptions }