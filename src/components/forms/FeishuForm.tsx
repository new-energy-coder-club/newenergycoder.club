import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar } from 'lucide-react'
import { eventApi, feishuApi } from '@/services/api'
import { useAuthStore } from '@/store/auth-store'

interface FeishuFormProps {
  eventId: string
  eventTitle: string
  children: React.ReactNode
  className?: string
}

export function FeishuForm({ eventId, eventTitle, children, className }: FeishuFormProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore()

  // 飞书表单URL - 这里使用示例URL，实际使用时需要替换为真实的飞书表单链接
  const feishuFormUrl = `https://scn0bdoc8zxg.feishu.cn/share/base/form/shrcnmi2o0DhzfL6dAi2fTQYTvh?prefill_event_id=${eventId}&prefill_event_title=${encodeURIComponent(eventTitle)}&prefill_user_name=${user?.name || ''}&prefill_user_email=${user?.email || ''}`

  const handleFormSubmit = async () => {
    setIsLoading(true)
    try {
      // 使用API服务记录注册信息
      const registrationResult = await eventApi.registerEvent({
        eventId,
        eventTitle,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        timestamp: new Date().toISOString(),
      })
      
      if (registrationResult.success) {
        // 获取飞书表单配置
        const formConfig = await feishuApi.getFormConfig(eventId)
        
        if (formConfig.success && formConfig.data) {
          // 打开飞书表单
          window.open(formConfig.data.formUrl || feishuFormUrl, '_blank')
        } else {
          // 使用默认表单URL
          window.open(feishuFormUrl, '_blank')
        }
        
        setOpen(false)
      } else {
        throw new Error(registrationResult.error || '注册失败')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert('注册失败，请稍后重试')
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