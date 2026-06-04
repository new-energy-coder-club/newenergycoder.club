import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Code, Heart, ArrowRight, Target, Send, Download } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { type AspectRatio } from '@/components/ui/floating-controls'
import WeChatIcon from '@/assets/wechat.png?url'
import FeishuIcon from '@/feishu.png?url'
import DarrenPigFeishu from '@/DarrenPig_Feishu.png?url'
import QrcodeNEC from '@/qrcode_NEC.jpg?url'

const roadmapSteps = [
  {
    id: 1,
    title: "了解我们",
    description: "浏览项目介绍和团队文化",
    icon: Users,
    duration: "5-10分钟"
  },
  {
    id: 2,
    title: "技术准备",
    description: "准备基础开发环境和技能",
    icon: Code,
    duration: "1-2小时"
  },
  {
    id: 3,
    title: "加入组织",
    description: "在 GitHub 上关注我们的开源组织并了解项目",
    icon: Target,
    duration: "1-5分钟"
  },
  {
    id: 4,
    title: "参与贡献",
    description: "寻找 Good First Issue，提交你的第一个 PR 或 Issue",
    icon: Send,
    duration: "1-3天"
  },
  {
    id: 5,
    title: "深入合作",
    description: "与团队成员共同开发核心模块，参加线上/线下技术会议",
    icon: Heart,
    duration: "长期"
  }
]

export function JoinPage() {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[3/4]')
  const [copied, setCopied] = useState(false)
  const t = useTranslation()

  const feishuGroupId = "WeChat ID: Pei-pei-Zhu-Pig"
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(feishuGroupId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
                {t.joinPage.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.joinPage.subtitle}
              </p>
          </div>
        </section>



        {/* Roadmap Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.joinPage.roadmap.title}</h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">
                 {t.joinPage.roadmap.description}
               </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Steps as a two-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {roadmapSteps.map((step) => (
                    <Card key={step.id} className="w-full glass-card">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <step.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-6">
                              <span className="flex-1">{t.joinPage.roadmap.steps[step.id - 1]?.title || step.title}</span>
                              <span className="font-bold text-primary ml-2">{String(step.id).padStart(2, '0')}</span>
                            </CardTitle>
                            <CardDescription>{t.joinPage.roadmap.steps[step.id - 1]?.duration || step.duration}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{t.joinPage.roadmap.steps[step.id - 1]?.description || step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 加入 GitHub 组织入口 */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t.joinPage.github.title}</CardTitle>
                  <CardDescription>
                    加入我们的 GitHub 组织，参与开源项目协作与贡献
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    size="lg" 
                    className="group"
                    onClick={() => window.open('https://github.com/new-energy-coder-club', '_blank')}
                  >
                    {t.joinPage.github.button}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>✨ 推荐：关注我们的开源仓库，提交 Issue 或 PR 参与建设</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WeChat Contact Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-card border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <img src={FeishuIcon} alt="Feishu" className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{t.joinPage.contact.title}</CardTitle>
                  <CardDescription>
                    <a
                      href="https://www.feishu.cn/invitation/page/add_contact/?token=509lcd75-d319-41ee-9748-c202b40efa48&unique_id=svYaQwpsgXlyP2H56Oyssg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      添加我们的maintainer，获取最新官方飞书群和一对一咨询
                    </a>
                  </CardDescription>
                  <p className="mt-1 font-bold text-primary">加入下载飞书并扫码哦</p>
                  <div className="mt-2 flex justify-center gap-3">
                    <a
                      href="https://www.feishu.cn/invitation/page/add_contact/?token=509lcd75-d319-41ee-9748-c202b40efa48&unique_id=svYaQwpsgXlyP2H56Oyssg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    >
                      {t.joinPage.contact.openFeishu}
                    </a>
                    <a
                      href="https://www.feishu.cn/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border border-primary/60 text-primary px-4 py-2 hover:bg-primary/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t.joinPage.contact.downloadFeishu}
                    </a>
                  </div>
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="text-center">
                      <img
                        src={DarrenPigFeishu}
                        alt="Maintainer Feishu"
                        className="h-40 w-auto rounded-md shadow-sm border border-muted"
                      />
                      <p className="mt-2 text-sm text-muted-foreground">Maintainer 飞书</p>
                    </div>
                    <div className="text-center">
                      <img
                        src={QrcodeNEC}
                        alt="NEC 二维码"
                        className="h-40 w-auto rounded-md shadow-sm border border-muted"
                      />
                      <p className="mt-2 text-sm text-muted-foreground">NEC 官方群</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-lg">
                      <img src={WeChatIcon} alt="WeChat" className="h-7 w-auto object-contain mr-2" />
                      <span className="font-mono text-lg font-bold text-primary">{feishuGroupId}</span>
                    </div>
                    <Button 
                      onClick={copyToClipboard}
                      className="w-auto"
                      variant={copied ? "secondary" : "default"}
                    >
                      {copied ? t.joinPage.contact.copied : t.joinPage.contact.copyButton}
                    </Button>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">添加时请备注：</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 姓名 + 学校/公司&班级</li>
                      <li>• 技术方向（如：前端/后端/嵌入式/算法/机械/设计）</li>
                      <li>• 加入目的（如：学习/项目/交流）</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
