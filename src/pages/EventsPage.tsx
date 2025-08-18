import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Calendar, Users } from 'lucide-react';

type EventStatus = 'upcoming' | 'past';

interface Event {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  date: string;
  participants: number;
  status: EventStatus;
}

const eventsData = [
    { date: '241120', zh: { title: '团队初创会议', desc: '完成初期投票，创建群聊，首次线下会议' }, en: { title: 'Team Kick-off', desc: 'Initial vote, group chat, first offline meeting' } },
    { date: '241213', zh: { title: '项目规划讨论', desc: '讨论底盘、经费、人员、采购等议题' }, en: { title: 'Project Planning', desc: 'Discussed chassis, budget, staffing, procurement' } },
    { date: '250111', zh: { title: '寒假开发板寄送', desc: '离校前最后一次组会，寄送开发板' }, en: { title: 'Dev Board Shipping', desc: 'Final meeting before break, boards shipped' } },
    { date: '250113', zh: { title: '嵌入式开发启动', desc: '基于51单片机和RT-Thread RA6M3' }, en: { title: 'Embedded Dev Start', desc: 'Based on 51 MCU and RT-Thread RA6M3' } },
    { date: '250306', zh: { title: '机器人底盘定型', desc: '确定人形机器人底盘，A/C板下单' }, en: { title: 'Robot Chassis Done', desc: 'Humanoid robot chassis set, boards ordered' } },
    { date: '250311', zh: { title: '与江苏理工交流', desc: '展示Gitee仓库，探讨技术合作' }, en: { title: 'Jiangsu Poly Visit', desc: 'Showcased Gitee repo, discussed tech collaboration' } },
    { date: '250317', zh: { title: '星闪手柄项目推进', desc: '推进星闪手柄进度，汇总采购情况' }, en: { title: 'Handle Progress', desc: 'Advanced Nearlink handle, reviewed procurements' } },
    { date: '250321', zh: { title: '团队进程会议', desc: '讨论各组进展，确定交流安排' }, en: { title: 'Team Sync Meeting', desc: 'Discussed group progress, planned next visit' } },
    { date: '250323', zh: { title: '争取学院支持', desc: '向机械学院领导介绍团队与项目' }, en: { title: 'College Support', desc: 'Presented team and project to Mech. Eng. dept.' } },
    { date: '250323', zh: { title: '赴江苏理工交流', desc: '多层面深入切磋，聚焦开源仓库' }, en: { title: 'Visit to Jiangsu Poly', desc: 'In-depth talks on open-source repo collaboration' } },
    { date: '250324', zh: { title: '机械组新人培训', desc: '为机械组新人配置软件，深夜装配' }, en: { title: 'Mech. Team Training', desc: 'Software setup for new members, late-night assembly' } },
    { date: '250327', zh: { title: '新成员加入', desc: '迎接新面孔，节能减排小组成立' }, en: { title: 'New Members Onboard', desc: 'Welcomed new faces, energy-saving team formed' } },
    { date: '250330', zh: { title: '周末线上组会', desc: '各项目组汇报进度，讨论后续方案' }, en: { title: 'Weekend Online Sync', desc: 'Project groups reported progress, discussed plans' } },
    { date: '250402', zh: { title: '硬件问题讨论会', desc: '就硬件问题开展讨论，迎接中期考核' }, en: { title: 'Hardware Meeting', desc: 'Discussed hardware issues, prepared for mid-term' } },
    { date: '250406', zh: { title: '进度大会', desc: '明确各组方向，分配负责人' }, en: { title: 'Progress Assembly', desc: 'Clarified group directions, assigned leads' } },
    { date: '250407', zh: { title: '冲刺中期检测', desc: '安排详细计划，分工明确，通宵赶工' }, en: { title: 'Mid-term Sprint', desc: 'Detailed planning, clear roles, all-nighter' } },
    { date: '250409', zh: { title: '完成中期检测', desc: '完善小车结构，提交检测材料' }, en: { title: 'Mid-term Review Done', desc: 'Improved car structure, submitted review materials' } },
    { date: '250410', zh: { title: '提交中期检测材料', desc: '中期检测材料提交完毕。' }, en: { title: 'Mid-term Submission', desc: 'Mid-term review materials have been submitted.' } },
    { date: '250412', zh: { title: '赴杭州技术交流', desc: '参加openEuler开发者日，拜访浙理' }, en: { title: 'Hangzhou Tech Trip', desc: 'Attended openEuler Dev Day, visited ZJUT' } },
    { date: '250429', zh: { title: '项目进度汇报', desc: '汇报项目进展，强调实验室卫生' }, en: { title: 'Project Status Update', desc: 'Reported progress, stressed lab cleanliness' } },
    { date: '250430', zh: { title: 'RC人员优化', desc: '中期检测通过，根据贡献优化人员' }, en: { title: 'RC Team Optimization', desc: 'Mid-term passed, optimized team by contribution' } },
    { date: '250511', zh: { title: 'A416线下会议', desc: 'R1/R2进度汇报，讨论项目合作' }, en: { title: 'A416 Offline Meeting', desc: 'R1/R2 progress report, discussed collaborations' } },
    { date: '250531', zh: { title: '跨校交流赛', desc: '与江理工、南理工交流，判断技术差距' }, en: { title: 'Inter-University Meet', desc: 'Exchanged with JPU/NJUST, assessed tech gaps' } },
    { date: '250608', zh: { title: '南京交流赛', desc: '赴南理工参加江苏队伍交流赛' }, en: { title: 'Nanjing Exchange', desc: 'Attended exchange match at NJUST' } },
    { date: '250611', zh: { title: '技术方案选型', desc: '调通电磁阀，完成电机、电调选型' }, en: { title: 'Tech Selection', desc: 'Solenoid valve tested, motor/ESC selection done' } },
];

const mockEvents: Event[] = eventsData.map((item, index) => {
  const year = `20${item.date.substring(0, 2)}`;
  const month = item.date.substring(2, 4);
  const day = item.date.substring(4, 6);

  return {
    id: String(index + 1),
    title: {
      zh: item.zh.title.slice(0, 15),
      en: item.en.title.slice(0, 15),
    },
    description: {
      zh: item.zh.desc.slice(0, 25),
      en: item.en.desc.slice(0, 25),
    },
    date: `${year}-${month}-${day}`,
    participants: Math.floor(Math.random() * (24 - 7 + 1)) + 7,
    status: 'past' as EventStatus,
  };
});

const TimelineEvent = ({ event, isLast }: { event: Event, isLast: boolean }) => {
    const { language } = useLanguage();
    const title = event.title[language as keyof typeof event.title];
    const description = event.description[language as keyof typeof event.description];

    return (
        <div className="relative pl-8 sm:pl-12">
            {!isLast && <div className="absolute left-[11px] sm:left-[13px] top-5 h-full w-0.5 bg-border" />}
            <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                <Calendar className="h-3 w-3 text-primary-foreground" />
            </div>
            <div className="ml-4">
                <div className="flex items-baseline flex-wrap">
                    <h3 className="font-bold text-base sm:text-lg">{title}</h3>
                    <p className="ml-4 text-sm text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.participants}
                    </p>
                </div>
                <p className="mt-1 text-muted-foreground text-sm sm:text-base">{description}</p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                    {new Date(event.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    );
};


export function EventsPage() {
  const t = useTranslation();
  const events = mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
            <div className="space-y-10">
              {events.map((event, index) => (
                <TimelineEvent key={event.id} event={event} isLast={index === events.length - 1} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}