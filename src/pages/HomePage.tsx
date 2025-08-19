import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { TeamSection } from '@/components/home/TeamSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { CTASection } from '@/components/home/CTASection'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { useEffect, useState } from 'react'

function HomePage() {
  // 显示比例状态管理 - 控制页面中卡片图片的宽高比显示
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TeamSection selectedRatio={selectedRatio} />
      <ProjectsSection selectedRatio={selectedRatio} />
      <CTASection />
    </PageLayout>
  )
}

export default HomePage