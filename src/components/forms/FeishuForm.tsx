import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'

interface FeishuFormProps {
  eventId: string
  eventTitle: string
  formUrl?: string
  children: React.ReactNode
  className?: string
}

const DEFAULT_FEISHU_FORM_URL = 'https://scn0bdoc8zxg.feishu.cn/share/base/form/shrcnmi2o0DhzfL6dAi2fTQYTvh'

export function FeishuForm({ eventId, eventTitle, formUrl, children, className }: FeishuFormProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore()

  // Prefer the event-specific form URL, fall back to the default Feishu form
  const feishuFormUrl = formUrl
    ? `${formUrl}?prefill_event_id=${eventId}&prefill_event_title=${encodeURIComponent(eventTitle)}&prefill_user_name=${encodeURIComponent(user?.name || '')}&prefill_user_email=${encodeURIComponent(user?.email || '')}`
    : `${DEFAULT_FEISHU_FORM_URL}?prefill_event_id=${eventId}&prefill_event_title=${encodeURIComponent(eventTitle)}&prefill_user_name=${encodeURIComponent(user?.name || '')}&prefill_user_email=${encodeURIComponent(user?.email || '')}`

  const handleFormSubmit = async () => {
    setIsLoading(true)
    try {
      // 直接打开飞书报名表单
      window.open(feishuFormUrl, '_blank')
      setOpen(false)
    } catch (error) {
      console.error('Registration failed:', error)
      alert('打开报名表失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} disabled={isLoading}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            活动注册 - {eventTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            点击下方按钮将打开飞书表单进行活动注册。请填写完整信息以确保注册成功。
          </p>
          
          {/* 内嵌飞书表单预览 */}
          <div className="border rounded-lg p-4 bg-muted/50 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm font-medium">飞书表单</span>
            </div>
            <p className="text-xs text-muted-foreground">
              表单将包含：姓名、联系方式、所属机构、参与原因等必填信息
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleFormSubmit}
              disabled={isLoading}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {isLoading ? '处理中...' : '打开注册表单'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 内嵌飞书表单组件
interface EmbeddedFeishuFormProps {
  formUrl: string
  height?: string
}

export function EmbeddedFeishuForm({ formUrl, height = '600px' }: EmbeddedFeishuFormProps) {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <iframe
        src={formUrl}
        width="100%"
        height={height}
        frameBorder="0"
        className="w-full"
        title="飞书表单"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  )
}