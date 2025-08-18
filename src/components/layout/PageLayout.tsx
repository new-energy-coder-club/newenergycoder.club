import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

interface PageLayoutProps {
  children: ReactNode
  showAspectRatio?: boolean
  aspectRatio?: AspectRatio
  onAspectRatioChange?: (ratio: AspectRatio) => void
}

export function PageLayout({ 
  children, 
  showAspectRatio = false, 
  aspectRatio, 
  onAspectRatioChange 
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingControls 
        showAspectRatio={showAspectRatio}
        aspectRatio={aspectRatio}
        onAspectRatioChange={onAspectRatioChange}
      />
    </div>
  )
}