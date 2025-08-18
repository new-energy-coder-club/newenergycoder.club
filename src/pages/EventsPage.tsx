import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { FeishuForm } from '@/components/forms/FeishuForm'
import { type AspectRatio } from '@/components/ui/floating-controls'

type EventCategory = 'all' | 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'networking'
type EventStatus = 'upcoming' | 'past'

interface Event {
  id: string
  title: string
  description: string
  image: string
  category: EventCategory
  date: string
  time: string
  location: string
  participants: number
  maxParticipants?: number
  status: EventStatus
  registrationUrl?: string
  detailsUrl?: string
}

const timeline = `
241120 完成初期团队投票，创建群聊，进行了第一次线下成员会议
241213 团队不断扩大，逐步进行底盘结构、战队经费、人员安排、采购环节等一系列问题的讨论 @7. 进行主持，@DarrenPig @Pony17 明确近期成果和下阶段任务，@郑绍恺 采购环节明确
250111 离校前最后一次线下组会，完成开发板寄送
250113 在手一块51单片机，一块RT-THREAD的RA6M3芯片 @Pony17
250306 人形机器人底盘确定，A板和C板下单
250311 接待江苏理工队长，系统展示Gitee仓库和实验室项目，江苏理工队长结合去年实战经验与今年技术进度提出创新解法，双方围绕技术互补、资源共享达成协作共识，共探赛事备战最优路径
250317 416实验室线下组会，推进星闪手柄进度，采购情况汇总，讨论接下来与江理工的交流，机械组情况讨论，Gitee使用教学。冲刺接下来的RC中期检测
250321 416实验室线下组会，讨论团队各组进程，汇报硬件采购情况，确定去江理工交流讨论的安排与人员，汇报软件代码运行进程
250323 向机械学院老师和相关企业领导介绍了我们的产品并一同分析了发展趋势和风险，随后与机械学院彭柯尹等人详细的介绍了我们团队组成，任务与发展目标，争取机械学院的资金和人力支持、与其取得合作关系
250323 赴江苏理工学院机器人团队交流，聚焦开源仓库设立，从机械、电控、上位机至运营多层面深入切磋
250324 @DarrenPig @单广志 给机械组新人们配好了软件，硬件和机械的大家伙们一起赶时间深夜拧螺丝装底座
250327 416实验室线下组会，迎接新面孔，交通NEC省赛完载，节能减排七人小组应召组成
250330 周末线上组会，节能减排分支准备完赛，灵巧手方案调研，机械组发球机构讨论优化，与泰翔科技合作项目汇报，各组长进行进度汇报。
250402 416实验室线下组会，就硬件问题开展讨论会，中期检测机械迎接4.10阶段性考核
250406 进度大会，明确各组方向，分出供电负责人 @牛良旭 ，手柄负责人@崔正阳，电焊 @杨鑫海 ，运球实现
250407 赶工中， @DarrenPig 安排详细计划，分工明确。
250409 通宵赶工，完善小车结构，基本实现移动和发球功能。安排运营小组进行10号中期检测材料收集汇总，视频剪辑，准备材料提交。
250410 中期检测材料提交完毕。
250412-13 朱佩韦带队前往浙江杭州，参加了于萧山万怡酒店召开的openEuler Developer Day2025，期间拜访参观了浙江理工大学的团队@杨鑫海，收获颇丰
250429 416线下组会进行项目进度的汇报， @单广志 提出实验室需要保持卫生整洁，物品使用后及时归位。同时提议大家在五一期间进行复习。
250430 RC中期检测顺利通过！ @单广志 @Pony17 根据贡献点进行RC人员优化。 @DarrenPig 对各小组进行学习任务分配。
250511 A416线下会议，人员区分优化 @Pony17 ，R1进度汇报 @彭柯尹 @郑钦文 ，R2介绍、苏州飞控项目合作介绍、项目推进思路，争取21日前完成R2机器人模型实物 @DarrenPig ，机械院会议陈述 @崔正阳
250531 江理工、南理工交流 刘英琪带队判断【气动方案】需要独立出RC队伍，卢王淳带队判断【舵轮、气动方案、电控方案】有较大的差距，需要追赶进度；当晚完成小组会，确定【选型从采购任务中分离】领队确认【只添加Sponsor和财务同学】
250608 南理工（南京）校区江苏队伍交流赛，进行设计交流，王加安院长带队和 @DarrenPig 主要就江理工和南理工方案进行调试与设计
250611 A416 @吴洛斌 调通电磁阀气泵控制方案，当晚 @Pony17 组织选型组会，完成775高转选型，电调由 @许子涵涵 选择 ,电控方案C板(DJI) 由 @单广志 做选型 中较为重要的活动并替换
`;

const mockEvents: Event[] = timeline
  .trim()
  .split('\n')
  .map((line, index) => {
    const [date, ...rest] = line.trim().split(' ');
    const title = rest.join(' ');
    const year = "20" + date.substring(0, 2);
    const month = date.substring(2, 4);
    const day = date.substring(4, 6);

    return {
      id: String(index + 1),
      title: title,
      description: title,
      image: `https://source.unsplash.com/random/400x250?sig=${index}`,
      category: 'workshop' as EventCategory,
      date: `${year}-${month}-${day}`,
      time: 'N/A',
      location: 'N/A',
      participants: 0,
      status: 'past' as EventStatus,
    };
  });

const categoryFilters = [
  { key: 'all' as EventCategory, labelKey: 'filterAll' },
  { key: 'workshop' as EventCategory, labelKey: 'filterWorkshop' },
  { key: 'hackathon' as EventCategory, labelKey: 'filterHackathon' },
  { key: 'seminar' as EventCategory, labelKey: 'filterSeminar' },
  { key: 'competition' as EventCategory, labelKey: 'filterCompetition' },
  { key: 'networking' as EventCategory, labelKey: 'filterNetworking' }
]

const getCategoryColor = (category: EventCategory) => {
  const colors = {
    workshop: 'bg-blue-500/10 text-blue-700 border-blue-200',
    hackathon: 'bg-purple-500/10 text-purple-700 border-purple-200',
    seminar: 'bg-green-500/10 text-green-700 border-green-200',
    competition: 'bg-red-500/10 text-red-700 border-red-200',
    networking: 'bg-orange-500/10 text-orange-700 border-orange-200',
    all: 'bg-gray-500/10 text-gray-700 border-gray-200'
  }
  return colors[category] || colors.all
}

export function EventsPage() {
  const t = useTranslation()
  const events = mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const TimelineEvent = ({ event, isLast }: { event: Event, isLast: boolean }) => (
    <div className="relative pl-6 sm:pl-10">
      {!isLast && <div className="absolute left-[9px] sm:left-[11px] top-4 h-full w-0.5 bg-border" />}
      <div className="absolute left-0 top-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:h-3 text-primary-foreground" />
      </div>
      <div className="ml-4">
        <div className="font-bold text-base sm:text-lg">
          {new Date(event.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <p className="mt-1 text-muted-foreground text-sm sm:text-base">{event.title}</p>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              {t.events.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.events.description}
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 sm:py-24">
          <div className="container max-w-3xl">
            <div className="space-y-8">
              {events.map((event, index) => (
                <TimelineEvent key={event.id} event={event} isLast={index === events.length - 1} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}