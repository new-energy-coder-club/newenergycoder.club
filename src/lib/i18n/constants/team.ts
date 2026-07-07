import { TeamMember } from '../types/translations';

export type SponsorLevel = 'strategic' | 'gold' | 'silver' | 'bronze' | 'partner';

export interface SponsorSupport {
  item: string;
  quantity?: string;
}

export interface Sponsor extends TeamMember {
  level: SponsorLevel;
  supports: SponsorSupport[];
  website?: string;
}

export const maintainers: TeamMember[] = [
  {
    name: 'DarrenPig',
    role: 'Club Founder & BSP 嵌软工程师',
    bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
    image: 'https://cdn.newenergycoder.club/images/src/image/maintainer/DarrenPig.jpg',
    tags: ['AI', 'BSP', '嵌入式', 'ROBOCON', '能源监测', 'openEuler'],
    skills: [
  { name: 'AI', level: 92 },
  { name: 'BSP', level: 88 },
  { name: '嵌入式', level: 85 },
  { name: '能源监测', level: 90 }
    ],
    projects: [
  { id: '3', name: '20241201人形机器人主线', role: '项目发起人', url: '/whitepapers/NEC新能源开发者社区-机器人.pdf' },
  { id: '1', name: '20250319流体工作站', role: '技术负责人', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring/20250319流体工作站' }
    ],
    gitee: 'https://gitee.com/darrenpig',
    github: 'https://github.com/Darrenpig',
    bonjour: 'https://bonjour.bio/darrenpig',
    email: '22230635@czu.cn'
  },
  {
    name: '殷统创',
    role: 'Club Founder & BSP Expert',
    bio: '专注于AI在能源优化应用的可再生能源研究员。',
    image: 'https://cdn.newenergycoder.club/images/src/image/maintainer/殷统创.jpg',
    tags: ['AI', 'BSP', '能源优化', '可再生能源', '华为云AI'],
    skills: [
  { name: 'AI', level: 90 },
  { name: 'BSP', level: 95 },
  { name: '能源优化', level: 93 },
  { name: '华为云AI', level: 85 }
    ],
    projects: [
  { id: '1', name: '20250319流体工作站', role: 'BSP 顾问', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring/20250319流体工作站' },
  { id: '7', name: 'MICA混合关键系统验证', role: '系统验证', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/system/mica-verification' }
    ],
    github: 'https://github.com/yintongchuang'
  },
  {
    name: '许珑译',
    role: '机器人算法工程师',
    bio: '专注于机器人算法研发部署以及业务逻辑设计。',
    image: 'https://cdn.newenergycoder.club/images/src/image/maintainer/许珑译.jpg',
    tags: ['机器人算法', 'ROBOCON', '人形机器人', '算法部署', 'ROS'],
    skills: [
  { name: '机器人算法', level: 94 },
  { name: 'ROS', level: 88 },
  { name: '算法部署', level: 90 },
  { name: 'ROBOCON', level: 86 }
    ],
    projects: [
  { id: '3', name: '20241201人形机器人主线', role: '算法负责人', url: '/whitepapers/NEC新能源开发者社区-机器人.pdf' },
  { id: '6', name: '人形机器人UMI低成本灵巧手', role: '算法部署', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/umi-dexterous-hand' }
    ],
    github: 'https://github.com/xulongyi'
  },
  {
    name: '张旺旺',
    role: '机器人运行时工程师',
    bio: '负责项目的核心技术攻坚，保障电控系统的稳定运行。',
    image: 'https://cdn.newenergycoder.club/images/src/image/maintainer/张旺旺.png',
    tags: ['电控系统', '运行时', 'ROBOCON', '嵌入式', '系统稳定性'],
    skills: [
  { name: '电控系统', level: 93 },
  { name: '运行时', level: 91 },
  { name: '嵌入式', level: 87 },
  { name: '系统稳定性', level: 92 }
    ],
    projects: [
  { id: '3', name: '20241201人形机器人主线', role: '电控/运行时', url: '/whitepapers/NEC新能源开发者社区-机器人.pdf' },
  { id: '4', name: '20241115飞控通讯', role: '飞控通讯开发', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/aerospace/flight-control-comm' }
    ],
    github: 'https://github.com/zhangwangwang'
  },
];

export const developers: TeamMember[] = [
  {
    name: '卞乐凌',
    role: '嵌入式学习贡献者',
    bio: '嵌入式学习中',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/卞乐凌.jpg',
    tags: ['嵌入式学习', '开源贡献', '社区建设', 'STM32', '硬件开发'],
    github: 'https://github.com/bianleiling'
  },
  {
    name: '卢永杰',
    role: '嵌入式&运控算法专家',
    bio: '目前专注算法部署优化及硬件底层逻辑协同设计',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/卢永杰.jpg',
    tags: ['嵌入式开发', '运控算法', '算法部署', '协同设计', '算法优化'],
    github: 'https://github.com/luyongjie'
  },
  {
    name: '卢王淳',
    role: '25RC项管&机械&电控小白',
    bio: '25RC项管 机械 电控小白',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/卢王淳.jpeg',
    tags: ['项目管理', '机械设计', '电控学习', 'ROBOCON', '团队协调', '25RC'],
    github: 'https://github.com/luwangchun'
  },
  {
    name: '孙诗睿',
    role: 'Contributor',
    bio: '准备AIC',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/孙诗睿.jpeg',
    tags: ['嵌入式硬件', '单片机', 'AIC', '工业视觉', 'SIG', '硬件开发'],
    github: 'https://github.com/sunshirui'
  },
  { name: '孟洁', role: '嵌入式开发工程师', bio: '嵌入式开发工程师', image: 'https://cdn.newenergycoder.club/images/src/image/developers/孟洁.jpg' },
  { name: '张娈馨', role: '嵌入式开发工程师', bio: '学习嵌入式开发，专注于stm32，同时熟练使用sw等软件。', image: 'https://cdn.newenergycoder.club/images/src/image/developers/张娈馨.jpg' },
  {
    name: '彭柯尹',
    role: '机械R1机器人开发者',
    bio: '画过图，拧过螺丝',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/彭柯尹.jpg',
    tags: ['新成员', '项目开发', '学习成长', 'Web开发', 'JavaScript', '团队协作'],
    avatarStyle: 'bilevel',
    projects: [
  { id: '3', name: '20241201人形机器人主线', role: '机械开发', url: '/whitepapers/NEC新能源开发者社区-机器人.pdf' }
    ],
    github: 'https://github.com/pengkeying'
  },
  { name: '文钰婷', role: '嵌入式开发工程师', bio: '嵌入式开发工程师', image: 'https://cdn.newenergycoder.club/images/src/image/developers/文钰婷.jpeg' },
  { name: '李畅畅', role: '嵌入式开发工程师', bio: '电控，场地', image: 'https://cdn.newenergycoder.club/images/src/image/developers/李畅畅.jpg' },
  {
    name: '李硕',
    role: '硬件系统架构师',
    bio: '专注于硬件系统架构设计和技术选型，为项目提供技术指导。',
    image: 'https://cdn.newenergycoder.club/images/src/image/developer/李硕.png',
    tags: ['系统架构', '技术选型', '分布式系统', '性能优化', '云原生', 'Kubernetes'],
    projects: [
      { id: '6', name: '人形机器人UMI低成本灵巧手', role: '硬件架构', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/umi-dexterous-hand' }
    ],
    github: 'https://github.com/lishuo'
  },
  { name: '汪奕希', role: '视觉开发工程师', bio: '目前在视觉岗位', image: 'https://cdn.newenergycoder.club/images/src/image/developers/汪奕希.jpeg' },
  { name: '王欣怡', role: '嵌入式开发工程师', bio: '学习过51，32单片机以及sw建模', image: 'https://cdn.newenergycoder.club/images/src/image/developers/王欣怡.jpg' },
  {
    name: '郭童童',
    role: '场控FD',
    bio: '专注于嵌入式、机器视觉与硬件研发。',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/郭童童.jpg',
    tags: ['场控FD', '嵌入式', '机器视觉', '硬件'],
    gitee: 'https://gitee.com/guo--tongtong'
  },
  {
    name: '闻志伟',
    role: 'Bronze Sponsor',
    bio: '做的比较杂，除了机械，其他基本都做',
    image: 'https://cdn.newenergycoder.club/images/src/image/developers/闻志伟.jpg',
    tags: ['技术赞助', '项目支持', '可持续发展', '创新资助', '社区建设', '人才培养']
  },
  { name: '陈春林', role: '视觉算法工程师', bio: '高二拿过奥林匹克化学广西赛区市级二等奖', image: 'https://cdn.newenergycoder.club/images/src/image/developers/陈春林.jpeg' },
  { name: '魏卫', role: '全栈开发工程师', bio: '野心大的半吊子全栈(不碰硬件版)', image: 'https://cdn.newenergycoder.club/images/src/image/developers/魏卫.jpg' },
];

export const designers: TeamMember[] = [
  {
    name: 'Xiux',
    role: 'UI/UX设计师 & 仓库PM',
    bio: '专注于开发者体验设计和界面优化，为可持续仓库创造美观易用的界面。',
    image: 'https://cdn.newenergycoder.club/images/src/image/designer/xiux.jpg',
    tags: ['UI设计', 'UX设计', 'Figma', 'Sketch', '原型设计', '用户研究']
  },
  {
    name: 'ikkOoOo',
    role: '工业/产品设计师',
    bio: '专注于创意设计和视觉表达，为项目提供独特的设计视角。',
    image: 'https://cdn.newenergycoder.club/images/src/image/designer/ikkOoOo.jpg',
    tags: ['创意设计', '视觉表达', '设计创新', '艺术指导', '品牌设计', '视觉传达']
  },
  { name: '印书瑶', role: '工业/产品设计师', bio: 'solidworks建模', image: 'https://cdn.newenergycoder.club/images/src/image/designers/印书瑶.jpg' },
  { name: '孙雯艳', role: '工业/产品设计师', bio: '对机械方面了解较多，熟练sw建模参加过3d设计大赛和农业智能装备大赛，目前在准备机创赛，自学单片机', image: 'https://cdn.newenergycoder.club/images/src/image/designers/孙雯艳.jpg' },
  {
    name: '张岩皓',
    role: '摄影&数据可视化&设计师&运营博主',
    bio: '会摄影，学艺术设计，做漂亮餐',
    image: 'https://cdn.newenergycoder.club/images/src/image/designers/张岩皓.jpeg',
    tags: ['摄影', '数据可视化', '艺术设计', '运营博主', '视觉传达', '内容创作']
  },
  {
    name: '张若璐',
    role: '视觉设计师&财务分析师',
    bio: '专注于品牌落地和财务分析，为项目提供专业的财务视角可行性落地设计。',
    image: 'https://cdn.newenergycoder.club/images/src/image/designer/张若璐.jpg',
    tags: ['品牌设计', 'Power BI', 'Logo设计', '色彩搭配']
  },
  {
    name: '李一楠',
    role: '运营组长',
    bio: '为NEC小队宣传以及主持，负责团队运营和对外宣传工作。',
    image: 'https://cdn.newenergycoder.club/images/src/image/designer/李一楠.jpg',
    tags: ['团队运营', '宣传策划', '活动主持', 'NEC小队', '对外联络', '品牌推广']
  },
  {
    name: '李想',
    role: 'UX设计师',
    bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
    image: 'https://cdn.newenergycoder.club/images/src/image/designer/李想.jpg',
    tags: ['UX设计', '用户体验', '设计思维', 'Figma', '用户旅程', '信息架构']
  },
  {
    name: '王彦君',
    role: '工业/产品设计师',
    bio: '致力于通过设计解决实际问题，以更开放的态度寻找更多可能性。',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/王彦君.jpg',
    tags: ['工业设计', '产品设计', 'SolidWorks', 'Rhino', '3D建模', '材料工艺']
  },
  {
    name: '韦彩日',
    role: '工业产品设计师',
    bio: '负责对接需求',
    image: 'https://cdn.newenergycoder.club/images/src/image/designers/韦彩日.jpeg',
    tags: ['工业设计', '产品设计', '需求对接', '设计解决方案', '用户体验', '产品规划']
  },
];

export const contributors: TeamMember[] = [
  { name: '严文颖', role: 'Contributor', bio: '数据库，运营', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/严文颖.jpg' },
  {
    name: '余浩铭',
    role: '机器人日志运营编辑',
    bio: '专注于宣传和文字编辑，让NEC的每一份理念都能被看见',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/余浩铭.jpg',
    tags: ['文艺工作', '运营编辑', '宣传策划', '文字编辑', 'NEC理念', '内容创作'],
    github: 'https://github.com/yuhaoming'
  },
  {
    name: '凌敏菲',
    role: 'Contributor',
    bio: '硬件组成员',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/凌敏菲.jpeg',
    tags: ['硬件组', 'Contributor', 'NEC社区', '项目贡献']
  },
  {
    name: '刘英琪',
    role: '嵌入式开发工程师',
    bio: '专注于现代机器人技术栈，致力于构建高性能的机器人界面。',
    image: 'https://cdn.newenergycoder.club/images/src/image/developer/刘英琪.png',
    tags: ['React', 'TypeScript', 'Vue', '前端架构', 'UI/UX', 'Vite'],
    github: 'https://github.com/liuyingqi'
  },
  {
    name: '单广志',
    role: '嵌入式开发工程师',
    bio: '嵌入式开发工程师 机器人行业电控驱动开发以及硬件电路设计',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/单广志.jpeg',
    tags: ['嵌入式开发', '电控驱动', '硬件电路设计', '机器人', 'STM32', 'PCB设计'],
    avatarStyle: 'bilevel',
    projects: [
  { id: '2', name: '20250426星闪手柄', role: '电控驱动开发', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink/20250426星闪手柄' }
    ],
    github: 'https://github.com/shanguangzhi'
  },
  { name: '吴梦婷', role: 'Contributor', bio: '在做大创的汽车发动机初创项目', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/吴梦婷.jpg' },
  {
    name: '吴洛斌',
    role: '开源贡献者&气动自动化专家',
    bio: '积极参与开源项目，为社区贡献代码商业化文档。',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/吴洛斌.jpg',
    tags: ['气动自动化', '开源贡献', '工业控制', 'PLC', '自动化系统'],
    github: 'https://github.com/wuluobin'
  },
  {
    name: '周志',
    role: '全栈开发工程师',
    bio: '具备前后端开发能力，致力于端到端的解决方案开发。',
    image: 'https://cdn.newenergycoder.club/images/src/image/developer/周志.png',
    tags: ['全栈开发', 'JavaScript', 'Python', 'React', 'Node.js', '项目管理'],
    projects: [
  { id: '5', name: 'NEC 横向项目', role: '全栈开发', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」' }
    ],
    github: 'https://github.com/zhouzhi'
  },
  {
    name: '孙如婕',
    role: '灵巧手横向开发贡献者',
    bio: '灵巧手的横向开发',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/孙如婕.jpeg',
    tags: ['灵巧手开发', '横向开发', '技术创新', '开发支持', '项目贡献', '技术解决方案'],
    github: 'https://github.com/sunrujie'
  },
  { name: '岳添俊', role: 'C/Contributor', bio: 'c语言', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/岳添俊.jpg' },
  {
    name: '崇瑶',
    role: 'Contributor',
    bio: '正在学习机械相关知识',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/崇瑶.jpg',
    tags: ['NEC新人', 'Contributor', '学习成长', '可持续能源']
  },
  {
    name: '崔正阳',
    role: 'Developer/Sponsor',
    bio: '24年华为云iot大赛加入实验室，24RC全国机器人大赛正式接触机器人，25RC全程参与备赛 主要技能掌握为上位机控制，算法，仿真模型，',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/崔正阳.jpg',
    tags: ['上位机控制', '算法开发', '仿真模型', 'ROBOCON', '华为云IoT', '机器人竞赛'],
    github: 'https://github.com/cuizhengyang'
  },
  { name: '庄皓钧', role: '机械结构设计贡献者', bio: '负责机械结构设计与装配', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/庄皓钧.jpg' },
  {
    name: '张旺旺',
    role: '新能源运维工程师',
    bio: '负责核心项目的真机部署和运维工作，保障系统的稳定运行。',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/张旺旺.jpg',
    tags: ['运维部署', 'Linux', '服务器管理', '监控告警', '故障排查', '系统优化'],
    github: 'https://github.com/zhangwangwang'
  },
  { name: '徐康', role: '3D打印与建模贡献者', bio: '3D打印，建模', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/徐康.jpg' },
  {
    name: '徐海婷',
    role: '财务管理专员',
    bio: '聚焦财务流程、数据支撑，助力团队行稳致远',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/徐海婷.jpg',
    tags: ['财务管理', '预算控制', '风险防控', '数据分析', '流程优化', '成本管控']
  },
  { name: '朱靓颖', role: '数据分析贡献者', bio: '数据预测，数据分析，数学建模', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/朱靓颖.jpeg' },
  { name: '李嘉涵', role: '机械设计贡献者', bio: '获得过国家奖学金，会solidworks，CATIA等软件，目前在做大创', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/李嘉涵.jpg' },
  {
    name: '杨力滔',
    role: '星闪手柄开发工程师',
    bio: '做过星闪手柄，熟悉stm32+rtos 和c语言编程',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/杨力滔.jpg',
    tags: ['星闪手柄', 'STM32', 'RTOS', 'C语言', '嵌入式开发', '硬件控制'],
    avatarStyle: 'bilevel',
    projects: [
  { id: '2', name: '20250426星闪手柄', role: '核心开发', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink/20250426星闪手柄' }
    ],
    github: 'https://github.com/yanglitao'
  },
  {
    name: '杨彩妮',
    role: 'Contributor',
    bio: 'AIC工业视觉',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/杨彩妮.jpg',
    tags: ['工业视觉', 'AIC', 'SIG', 'pre-sponsor', '视觉技术', '技术研究'],
    github: 'https://github.com/yangcaini'
  },
  {
    name: '杨鑫海',
    role: 'Developer',
    bio: 'ardiuno，esp32等代码',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/杨鑫海.jpg',
    tags: ['Arduino', 'ESP32', '代码例程', '嵌入式开发', '物联网', '开发板'],
    avatarStyle: 'bilevel',
    github: 'https://github.com/yangxinhai'
  },
  { name: '梁新雷', role: '队员', bio: '毫无经验的一只小白', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/梁新雷.jpeg' },
  {
    name: '殷子豪',
    role: 'Developer&文艺工作者',
    bio: '运营宣传与文字编辑',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/殷子豪.jpeg',
    tags: ['运营宣传', '文字编辑', '内容创作', '团队传播', '文案策划', '品牌建设'],
    github: 'https://github.com/yinzihao'
  },
  {
    name: '牛良旭',
    role: 'DevOps电池管理工程师',
    bio: '负责项目的持续集成和部署，保障开发流程的高效运行。',
    image: 'https://cdn.newenergycoder.club/images/src/image/developer/牛良旭.jpg',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '自动化部署'],
    projects: [
  { id: '7', name: 'MICA混合关键系统验证', role: 'DevOps/验证', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/system/mica-verification' }
    ],
    github: 'https://github.com/niuliangxu'
  },
  {
    name: '王于豪',
    role: '成型组组长',
    bio: '调试3D打印机帮助团队打印物品',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/王于豪.jpg',
    tags: ['3D打印', '成型技术', '团队管理', '技术支持', '设备调试', '物品制作'],
    github: 'https://github.com/wangyuhao'
  },
  { name: '王浩', role: 'Contributor', bio: 'FA社团，睿抗社团在职队员，熟练运用sw', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/王浩.jpg' },
  { name: '白逸鸣', role: '机器人竞赛贡献者', bio: 'RC 全国机器人大赛', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/白逸鸣.jpg' },
  {
    name: '许子涵',
    role: '产品经理',
    bio: '负责产品规划和需求分析，推动项目向正确方向发展。',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/许子涵.png',
    tags: ['产品规划', '需求分析', '用户研究', 'Axure', '原型设计', '数据分析'],
    github: 'https://github.com/xuzihan'
  },
  {
    name: '郑绍恺',
    role: '算法竞赛选手',
    bio: '专注于算法研究以及最优化问题',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributer/郑邵凯.png',
    tags: ['算法研究', '最优化', '竞赛选手', '问题求解', '算法优化', '数学建模'],
    github: 'https://github.com/zhengshaokai'
  },
  {
    name: '郑钦文',
    role: '机电一体化开发工程师',
    bio: '专注于机电设计开发，为用户提供优质的移动端体验。',
    image: 'https://cdn.newenergycoder.club/images/src/image/developer/郑钦文.jpg',
    tags: ['React Native', 'Flutter', 'iOS', 'Android', '移动端优化', '跨平台开发'],
    avatarStyle: 'bilevel',
    projects: [
  { id: '6', name: '人形机器人UMI低成本灵巧手', role: '机电一体化', url: 'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/umi-dexterous-hand' }
    ],
    github: 'https://github.com/zhengqinwen'
  },
  { name: '陆宇豪', role: '学生', bio: '读研', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/陆宇豪.jpeg' },
  {
    name: '韩祺冉',
    role: 'Contributor',
    bio: '数据分析师',
    image: 'https://cdn.newenergycoder.club/images/src/image/contributors/韩祺冉.jpg',
    tags: ['数据分析', '数据处理', '统计分析', '数据可视化', '业务分析'],
    github: 'https://gitee.com/han-qiran'
  },
  { name: '顾佳欣', role: 'Contributor', bio: '数据库与unity传导', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/顾佳欣.jpg' },
  { name: '魏鹏程', role: '研究生贡献者', bio: '正在参与rc赛事', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/魏鹏程.jpeg' },
  { name: '黄奕', role: '数据分析贡献者', bio: '数据分析、数学建模等。', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/黄奕.jpeg' },
  { name: '黄宇雯', role: '三维建模贡献者', bio: '运用三维建模软件进行机构设计、动画演示', image: 'https://cdn.newenergycoder.club/images/src/image/contributors/黄宇雯.jpg' },
];

export const sponsors: Sponsor[] = [
  {
    name: 'CubeMars',
    role: 'Motor Partner',
    level: 'gold',
    bio: '专业电机解决方案提供商，专注高性能无刷电机及驱动系统。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/CubeMars.png',
    tags: ['电机', '驱动系统'],
    supports: [
      { item: 'AK系列电机', quantity: '竞赛项目支持' },
      { item: '驱动器套件' },
      { item: '技术咨询支持' }
    ],
    website: 'https://www.cubemars.com/'
  },
  {
    name: 'GPUfree 算力自由',
    role: 'Computing Partner',
    level: 'partner',
    bio: '提供GPU算力资源，助力AI模型训练与科研探索。',
    image: 'https://cdn.newenergycoder.club/images/src/image/logo_GPU_Free.png',
    tags: ['GPU算力', 'AI训练'],
    supports: [
      { item: 'GPU算力代金券', quantity: '1000元额度' },
      { item: '模型训练资源' },
      { item: '科研算力支持' }
    ],
    website: 'https://gpufree.org/'
  },
  {
    name: '华为云',
    role: 'Cloud Partner',
    level: 'partner',
    bio: '华为云提供开发板及云计算资源支持，助力嵌入式开发与边缘计算。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/华为云.png',
    tags: ['开发板', '云计算'],
    supports: [
      { item: '香橙派开发板', quantity: '项目支持' },
      { item: '云服务器资源' },
      { item: '技术文档支持' }
    ],
    website: 'https://www.huaweicloud.com/'
  },
  {
    name: '华艺塑业',
    role: 'Hardware Partner',
    level: 'bronze',
    bio: '专业碳纤维及工程塑料加工，提供机器人结构件定制服务。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/华艺塑业.png',
    tags: ['碳纤维', '结构加工'],
    supports: [
      { item: '碳纤维板加工' },
      { item: '亚克力切割' },
      { item: '结构件打样' }
    ],
    website: 'https://m.tb.cn/h.7C6uKBnRQ1NxAMB'
  },
  {
    name: '开源之夏',
    role: '战略合作伙伴',
    level: 'strategic',
    bio: '中国科学院软件研究所、华为技术有限公司、中科南京软件技术研究院联合主办，专注开源人才培养。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/开源之夏Logo.png',
    tags: ['学生项目', '技术孵化'],
    supports: [
      { item: '开源项目资助', quantity: '年度项目名额' },
      { item: '导师资源对接' },
      { item: '社区活动支持' }
    ],
    website: 'https://summer-ospp.ac.cn/'
  },
  {
    name: '留形科技',
    role: 'Gold Sponsor',
    level: 'gold',
    bio: '专注于智能空间感知与三维重建技术的研发与应用。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/留形科技.png',
    tags: ['3D打印', '创新科技'],
    supports: [
      { item: '空间记忆模组' },
      { item: '技术咨询支持' }
    ],
    website: 'https://www.manifoldtech.cn/'
  },
  {
    name: '立创开源硬件平台',
    role: 'Gold Sponsor',
    level: 'gold',
    bio: '专业开源硬件开发平台，提供PCB打样、元器件采购一站式服务。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/立创开源广场.png',
    tags: ['开源硬件', 'PCB打样'],
    supports: [
      { item: 'PCB打样券', quantity: '年度额度' },
      { item: '元器件采购支持' },
      { item: '开源广场曝光推荐' }
    ],
    website: 'https://oshwhub.com/explore'
  },
  {
    name: '脉塔智能',
    role: 'Motor Partner',
    level: 'silver',
    bio: '专业RMD电机及驱动解决方案提供商，专注高性能伺服系统。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/麦塔智能.png',
    tags: ['RMD电机', '伺服系统'],
    supports: [
      { item: 'RMD电机采购额度', quantity: '1万元' },
      { item: '驱动器技术支持' },
      { item: '批量采购优惠' }
    ],
    website: '#'
  },
  {
    name: '萝卜小酱',
    role: 'Tool Partner',
    level: 'silver',
    bio: '专业精密工具品牌，专注电子维修与机器人组装工具。',
    image: 'https://cdn.newenergycoder.club/images/src/image/sponsor/萝卜小酱.png',
    tags: ['精密工具', '螺丝刀'],
    supports: [
      { item: '精密螺丝刀套装', quantity: '团队标配' },
      { item: '焊接工具套件' },
      { item: '维修工作台' }
    ],
    website: '#'
  },
];

// NEC Home GIF 资源引用