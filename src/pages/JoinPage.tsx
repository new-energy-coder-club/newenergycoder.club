import { useEffect } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Loader2 } from 'lucide-react'

export function JoinPage() {
  useEffect(() => {
    // Redirect to the join application page
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://gitee.com/darrenpig/new_energy_coder_club/issues'
    }, 1500)
    
    return () => clearTimeout(redirectTimer)
  }, [])
  
  return (
    <PageLayout>
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Redirecting to Membership Application...</h1>
          <div className="flex justify-center my-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <p className="text-lg text-muted-foreground">
            If you are not automatically redirected, please{' '}
            <a 
              href="https://gitee.com/darrenpig/new_energy_coder_club/issues" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}