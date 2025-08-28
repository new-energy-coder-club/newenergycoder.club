import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from '@/contexts/LanguageContext'

export type AspectRatio = 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[16/10]' | 'aspect-[21/9]'

interface AspectRatioSelectorProps {
  value: AspectRatio
  onValueChange: (value: AspectRatio) => void
  className?: string
}

const getAspectRatioOptions = (t: any): { value: AspectRatio; label: string }[] => [
  { value: 'aspect-square', label: t.displayRatio.aspectRatios.square },
  { value: 'aspect-video', label: t.displayRatio.aspectRatios.video },
  { value: 'aspect-[4/3]', label: t.displayRatio.aspectRatios.traditional },
  { value: 'aspect-[3/4]', label: t.displayRatio.aspectRatios.portrait },
  { value: 'aspect-[16/10]', label: t.displayRatio.aspectRatios.widescreen },
  { value: 'aspect-[21/9]', label: t.displayRatio.aspectRatios.ultrawide }
]

export function AspectRatioSelector({ value, onValueChange, className }: AspectRatioSelectorProps) {
  const t = useTranslation()
  const aspectRatioOptions = getAspectRatioOptions(t)
  
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <label className="text-sm font-medium whitespace-nowrap">{t.displayRatio.aspectRatioLabel}:</label>
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

export { getAspectRatioOptions }