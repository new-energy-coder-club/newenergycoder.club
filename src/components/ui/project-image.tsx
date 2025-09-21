import { ImageProxy } from './image-proxy'
import { ImageIcon } from 'lucide-react'

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
}

export function ProjectImage({ src, alt, className = '' }: ProjectImageProps) {
  // 备用图片列表 - 当原图片失效时使用
  const fallbackImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // 科技主题
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop', // 3D打印
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop', // 编程
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'  // 默认科技
  ]

  // 选择一个随机的备用图片作为fallback
  const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)]

  return (
    <div className={`${className} relative`}>
      <ImageProxy
        src={src}
        alt={alt}
        fallbackSrc={randomFallback}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  )
}