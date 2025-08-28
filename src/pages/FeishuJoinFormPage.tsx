import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/contexts/LanguageContext'
import { Send, User, Mail, Phone, School, Briefcase, Code, Heart } from 'lucide-react'
import { type FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'

interface FormData {
  name: string
  email: string
  phone: string
  organization: string
  role: string
  techStack: string[]
  experience: string
  motivation: string
  availability: string
  contribution: string
  expectations: string
}

const techOptions = [
  "前端开发", "后端开发", "移动开发", "嵌入式系统", "人工智能", "数据科学", 
  "云计算", "DevOps", "UI/UX设计", "项目管理", "硬件设计", "测试工程师"
]

export function FeishuJoinFormPage() {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    techStack: [],
    experience: '',
    motivation: '',
    availability: '',
    contribution: '',
    expectations: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const t = useTranslation()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTechStackChange = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 模拟发送到飞书多维表
      const response = await fetch('https://hooks.feishu.cn/your-webhook-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: '新能源极客俱乐部官网'
        })
      })

      if (response.ok) {
        toast({
          title: t.join.form.submit.success,
          description: t.join.form.submit.successMessage,
          duration: 5000
        })
        
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          role: '',
          techStack: [],
          experience: '',
          motivation: '',
          availability: '',
          contribution: '',
          expectations: ''
        })
      } else {
        throw new Error('提交失败')
      }
    } catch (error) {
      toast({
          title: t.join.form.submit.error,
          description: t.join.form.submit.errorMessage,
          variant: "destructive"
        })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 py-8">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">{t.join.form.title}</h1>
            <p className="text-lg text-muted-foreground">
              {t.join.form.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本信息 */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.join.form.basicInfo.title}
                </CardTitle>
                <CardDescription>{t.join.form.basicInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.join.form.basicInfo.name} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t.join.form.basicInfo.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.join.form.basicInfo.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t.join.form.basicInfo.emailPlaceholder}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.join.form.basicInfo.phone} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={t.join.form.basicInfo.phonePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">{t.join.form.basicInfo.organization} *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      placeholder={t.join.form.basicInfo.organizationPlaceholder}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 角色信息 */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t.join.form.roleInfo.title}
                </CardTitle>
                <CardDescription>{t.join.form.roleInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.join.form.roleInfo.identityLabel}</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">{t.join.form.roleInfo.student}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional">{t.join.form.roleInfo.professional}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="freelancer" id="freelancer" />
                      <Label htmlFor="freelancer">{t.join.form.roleInfo.freelancer}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">{t.join.form.roleInfo.other}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* 技术栈 */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {t.join.form.techStack.title}
                </CardTitle>
                <CardDescription>{t.join.form.techStack.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {techOptions.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <Checkbox
                        id={tech}
                        checked={formData.techStack.includes(tech)}
                        onCheckedChange={() => handleTechStackChange(tech)}
                      />
                      <Label htmlFor={tech} className="text-sm cursor-pointer">
                        {tech}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 经验与动机 */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  {t.join.form.experience.title}
                </CardTitle>
                <CardDescription>{t.join.form.experience.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">{t.join.form.experience.experienceLabel}</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder={t.join.form.experience.experiencePlaceholder}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">{t.join.form.experience.motivationLabel} *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder={t.join.form.experience.motivationPlaceholder}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contribution">{t.join.form.experience.contributionLabel} *</Label>
                  <Textarea
                    id="contribution"
                    value={formData.contribution}
                    onChange={(e) => handleInputChange('contribution', e.target.value)}
                    placeholder={t.join.form.experience.contributionPlaceholder}
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* 时间与期望 */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t.join.form.timeExpectation.title}</CardTitle>
                <CardDescription>{t.join.form.timeExpectation.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">{t.join.form.timeExpectation.availabilityLabel} *</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => handleInputChange('availability', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.join.form.timeExpectation.selectPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">{t.join.form.timeExpectation.option1to2}</SelectItem>
                      <SelectItem value="3-5">{t.join.form.timeExpectation.option3to5}</SelectItem>
                      <SelectItem value="6-10">{t.join.form.timeExpectation.option6to10}</SelectItem>
                      <SelectItem value="10+">{t.join.form.timeExpectation.option10plus}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectations">{t.join.form.timeExpectation.expectationsLabel}</Label>
                  <Textarea
                    id="expectations"
                    value={formData.expectations}
                    onChange={(e) => handleInputChange('expectations', e.target.value)}
                    placeholder={t.join.form.timeExpectation.expectationsPlaceholder}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 提交按钮 */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    {t.join.form.submit.submitting}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {t.join.form.submit.button}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}