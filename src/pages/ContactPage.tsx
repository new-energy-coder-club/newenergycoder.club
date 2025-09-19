import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { type FloatingControls, type AspectRatio } from '@/components/ui/floating-controls'
import { AmapLocation } from '@/components/ui/amap-location'
import NECApplicationForm from '@/image/NEC官网上线申请表.png?url'
import TeamPhoto1 from '@/image/校门合照.jpg?url'
import TeamPhoto2 from '@/image/横向项目合照.jpg?url'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Custom icon components for social media
const GiteeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.593h6.815c.327 0 .593.265.593.593v3.408a4 4 0 0 1-4 4H8.222a4 4 0 0 1-4-4v-5.63a4 4 0 0 1 4-4h9.852z" fill="#C71D23"/>
  </svg>
)

const WechatIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.81-5.722-6.04C10.138 2.462 9.420 2.188 8.691 2.188z" fill="#07C160"/>
    <path d="M23.999 14.6c0-3.573-3.248-6.425-7.249-6.425S9.5 11.027 9.5 14.6c0 3.564 3.249 6.426 7.25 6.426a8.863 8.863 0 0 0 2.5-.361c.21-.059.427-.027.617.086l1.332.78c.055.033.109.044.162.044.118 0 .214-.093.214-.207a.199.199 0 0 0-.035-.109l-.273-1.094a.436.436 0 0 1 .157-.492C22.819 18.918 23.999 16.82 23.999 14.6z" fill="#07C160"/>
    <circle cx="6.827" cy="9.53" r=".951" fill="white"/>
    <circle cx="10.559" cy="9.53" r=".951" fill="white"/>
    <circle cx="14.75" cy="14.6" r=".794" fill="white"/>
    <circle cx="18.999" cy="14.6" r=".794" fill="white"/>
  </svg>
)

const socialLinks = [
  { icon: GiteeIcon, href: 'https://gitee.com/darrenpig/new_energy_coder_club', label: 'Gitee' },
  { icon: WechatIcon, href: '#', label: 'WeChat' },
  { icon: Mail, href: 'mailto:22230635@czu.cn', label: 'Email' }
]

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const t = useTranslation()
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      toast({
        title: t.contact.form.messageSent,
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      toast({
        title: t.contact.form.messageError,
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="space-y-6 lg:space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <h2 className="text-2xl font-bold mb-2">{t.contact.getInTouch}</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.form.name}</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={t.contact.form.namePlaceholder}
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.form.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t.contact.form.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t.contact.form.subject}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder={t.contact.form.subjectPlaceholder}
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t.contact.form.messagePlaceholder}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full hover-lift transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {t.contact.form.sendMessage}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* NEC官网上线申请表 */}
                <Card className="glass-card">
                  <CardHeader>
                    <h2 className="text-2xl font-bold mb-2">NEC官网上线申请</h2>
                    <p className="text-muted-foreground">
                      申请加入NEC官网，展示您的项目和成果。
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`${selectedRatio} overflow-hidden relative w-full max-w-md`}>
                        <img 
                          src={NECApplicationForm} 
                          alt="NEC官网上线申请表" 
                          className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        />
                      </div>
                      <a
                        href="https://scn0bdoc8zxg.feishu.cn/share/base/form/shrcnmi2o0DhzfL6dAi2fTQYTvh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-200 hover-lift font-medium"
                      >
                        立即申请
                      </a>
                    </div>
                  </CardContent>
                </Card>
                </div>

              {/* Contact Information */}
              <div className="space-y-6 lg:space-y-8">
                {/* Contact Info Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <h2 className="text-2xl font-bold mb-2">{t.contact.contactInfo}</h2>
                    <p className="text-muted-foreground">
                      You can also reach us through the following channels.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-muted-foreground">{t.contact.info.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground">{t.contact.info.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">{t.contact.info.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">{t.contact.info.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <h2 className="text-2xl font-bold mb-2">{t.contact.followUs}</h2>
                    <p className="text-muted-foreground">
                      Stay connected with us on social media for updates and news.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-all duration-200 hover-lift group"
                          >
                            <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">{social.label}</span>
                          </a>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Map */}
                <AmapLocation />


              </div>
            </div>
          </div>
        </section>
      </div>
      

    </PageLayout>
  )
}