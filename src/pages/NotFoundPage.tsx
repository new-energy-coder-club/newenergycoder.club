import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { useTranslation } from '@/contexts/LanguageContext'
import { type FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

function NotFoundPage() {
  const navigate = useNavigate()
  const t = useTranslation()
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 gradient-text">{t.notFound.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{t.notFound.description}</p>
          <Button onClick={() => navigate('/')} size="lg" className="glass-card hover-lift">
            {t.notFound.returnHome}
          </Button>
        </div>
      </div>

    </PageLayout>
  )
}

export default NotFoundPage