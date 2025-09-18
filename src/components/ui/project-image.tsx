import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
}

export function ProjectImage({ src, alt, className = '' }: ProjectImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  // 备用图片列表 - 当原图片失效时使用
  const fallbackImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // 科技主题
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop', // 3D打印
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop', // 编程
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'  // 默认科技
  ]

  const handleImageLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    
    // 尝试使用备用图片
    const currentIndex = fallbackImages.indexOf(imgSrc)
    const nextIndex = currentIndex + 1
    
    if (nextIndex < fallbackImages.length) {
      setImgSrc(fallbackImages[nextIndex])
      setIsLoading(true)
    } else {
      setHasError(true)
    }
  }

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted/50`}>
        <div className="text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">图片加载失败</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 animate-pulse">
          <div className="text-center text-muted-foreground">
            <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-primary/20 animate-spin border-2 border-primary/30 border-t-primary"></div>
            <p className="text-sm">加载中...</p>
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  )
}