import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { TeamSection } from '@/components/home/TeamSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { CTASection } from '@/components/home/CTASection'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TeamSection />
      <ProjectsSection />
      <CTASection />
    </PageLayout>
  )
}

export default HomePage