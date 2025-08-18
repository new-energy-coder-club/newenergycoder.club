import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';

export const zhTranslations: Translations = {
  nav: {
    home: '首页',
    about: '关于我们',
    team: '团队',
    projects: '项目',
    events: '活动',
    resources: '资源',
    contact: '联系我们',
    login: '登录',
    logout: '退出',
    joinClub: '加入俱乐部',
    dashboard: '控制台',
  },
  hero: {
    tagline: '代码与清洁能源的交汇点',
    title: '为',
    titleHighlight: '可持续',
    description: '加入我们，与一群热衷于为可再生能源、可持续发展和绿色明天创造创新软件解决方案的开发者们共同努力。',
    joinCommunity: '加入我们的社区',
    viewGithub: '查看GitHub',
    codingWorkshops: '编程工作坊',
    codingWorkshopsDesc: '每周学习可持续技术开发的课程',
    innovationProjects: '创新项目',
    innovationProjectsDesc: '合作开发开源绿色能源解决方案',
    industryConnections: '行业连接',
    industryConnectionsDesc: '与领先的能源行业专业人士建立联系',
  },
  about: {
    title: '关于我们的俱乐部',
    paragraph1: '新能源编程俱乐部由一群充满热情的开发者和工程师于2023年创立，他们希望将编码技能与对可持续发展和可再生能源的承诺相结合。',
    paragraph2: '我们的使命是建立一个社区，为可再生能源应用、智能电网技术、能源效率和可持续发展开发开源软件解决方案。',
    paragraph3: '通过工作坊、黑客马拉松、合作项目以及与能源公司的合作，我们旨在创建一个技术与可持续发展相结合的平台，为更美好的未来而努力。',
    learnMore: '了解更多关于我们',
    projectOrigin: {
      title: '项目起源故事',
      content: '项目来源：和@haolei的一个承诺，2024年我们必须做一个好项目！我们一拍即合，当天就准备好了材料，晚上就做好了报名表。然而，现实极其残酷，我们的一二连击无法战胜过去的自己，我们制作的化学设计材料原封不动地上交了，按照我们老师的话说，我们翻车了...感谢戴兰老师（大一教我新能源科学与工程入门的老师），在她的鼓励下我们没有放弃，经过与导师和队友的多次联系和讨论，我们决定直接竞逐国赛推荐名额——在校赛中进入前15名。然后，我们就全力以赴了。5月12日那20个小时，我们从未停歇。通宵实验室的灯光似乎从未熄灭，时间像蚂蚁一样在地上爬行。我们凭着毅力坚持下来，仿佛世界上只有我一个人、一盏灯和一台笔记本电脑。在绘制了所有图表并撰写了大部分内容后，黎明悄然淹没在黎明前的黑暗中...'
    },
    phase2: {
      title: '第二阶段开发',
      description: '即将推出的未来增强和扩展功能',
      content: '此页面将在项目的第二阶段实现。我们正在不断努力通过新功能、改进的用户体验和扩展功能来增强我们的平台。第二阶段将包括高级项目管理工具、增强的协作功能、集成开发环境和全面的学习资源。敬请期待令人兴奋的更新，我们将继续构建和改进我们的社区平台。'
    },
    contributing: {
      title: '贡献指南',
      description: '我们欢迎所有技能水平的开发者贡献，只要他们与我们一样对可持续技术充满热情。',
      howToContribute: '如何贡献',
      steps: [
        'Fork仓库并为你的功能创建一个新分支',
        '遵循我们的编码标准和最佳实践',
        '为你的代码编写全面的测试',
        '提交带有清晰描述的拉取请求',
        '参与代码审查讨论'
      ],
      codeOfConduct: '请遵守我们的行为准则，为所有贡献者维护一个友好的环境。',
      reportIssues: '通过我们的问题跟踪器报告错误和建议功能。',
      submitPR: '按照我们的贡献工作流程提交拉取请求。'
    },
    license: {
      title: '开源许可证',
      description: '我们的项目根据开源许可证发布，以促进协作和创新。',
      openSource: '我们相信开源的力量能够推动可持续技术的发展。',
      permissions: [
        '商业用途',
        '修改',
        '分发',
        '私人使用'
      ],
      limitations: [
        '责任',
        '保证'
      ],
      conditions: [
        '许可证和版权声明',
        '声明变更',
        '披露源代码'
      ]
    }
  },
  features: {
    title: '为什么要加入我们的社区？',
    subtitle: '发现成为我们可持续编码社区一员的好处',
    weeklyWorkshops: '每周编程工作坊',
    weeklyWorkshopsDesc: '涵盖可持续技术开发和绿色编码实践的实践课程',
    openSource: '开源项目',
    openSourceDesc: '合作开展对环境产生积极影响的现实世界项目',
    hackathons: '绿色科技黑客马拉松',
    hackathonsDesc: '参加专注于解决环境挑战的激动人心的竞赛',
    guestSpeakers: '行业特邀演讲者',
    guestSpeakersDesc: '向可再生能源和可持续技术领域的专家学习',
    networking: '专业网络',
    networkingDesc: '与志同道合的开发者和行业专业人士建立联系',
    conferences: '技术会议',
    conferencesDesc: '参加关于可持续技术趋势的独家活动和会议',
  },
  team: {
    title: '认识我们的团队',
    description: '推动我们使命前进的热情个人',
    maintainerTitle: '维护者',
    developerTitle: '开发者',
    designerTitle: '设计师',
    contributorTitle: '贡献者',
    sponsorTitle: '赞助商',
    viewFullTeam: '查看完整团队',
    maintainers,
    developers,
    designers,
    contributors,
    sponsors
  },
  cta: {
    title: '准备好产生影响了吗？',
    description: '加入我们创建可持续技术解决方案的开发者社区。',
    getStarted: '立即开始'
  },
  join: {
    title: '加入我们的俱乐部',
    subtitle: '成为为可持续未来编码的社区的一部分',
    benefits: '会员福利',
    benefitsList: [
      '参加独家编程工作坊和培训课程',
      '合作开展开源可再生能源项目',
      '与行业专业人士和专家建立联系',
      '参加绿色科技黑客马拉松和竞赛',
      '获得经验丰富的开发者的指导',
      '获得优质学习资源和工具'
    ],
    requirements: '会员要求',
    requirementsList: [
      '基本编程知识（任何语言）',
      '对可持续发展和可再生能源的热情',
      '协作开发的承诺',
      '愿意学习和分享知识'
    ],
    howToJoin: '如何加入',
    steps: [
      '填写我们的会员申请表',
      '完成简短的技术评估',
      '参加迎新会议',
      '开始为项目和活动做出贡献'
    ],
    joinNow: '立即申请'
  },
  common: {
    loading: '加载中...',
    error: '发生错误',
    success: '成功！',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    back: '返回',
    next: '下一步',
    previous: '上一步'
  },
  notFound: {
    title: '页面未找到',
    description: '您查找的页面不存在。',
    returnHome: '返回首页'
  },
  projects: {
    title: '我们的项目',
    description: '探索专注于可再生能源和可持续发展的开源项目',
    filterTitle: '筛选项目',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    filterAll: '全部',
    filterAI: '人工智能与机器学习',
    filterIoT: '物联网',
    filterEmbedded: '嵌入式系统',
    filterRobotics: '机器人技术',
    filterResearch: '研究',
    filterWeb: 'Web开发',
    filterMobile: '移动应用',
    filterOther: '其他',
    viewProject: '查看项目',
    viewCode: '查看代码',
    technologies: '技术',
    author: '作者',
    date: '日期'
  },
  events: {
    title: '活动与工作坊',
    description: '参加我们即将举行的可持续技术活动和研讨会',
    filterTitle: '筛选活动',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    upcoming: '即将开始',
    past: '已结束',
    noUpcoming: '暂无即将开始的活动',
    noPast: '暂无已结束的活动',
    registerNow: '立即注册',
    learnMore: '了解更多',
    viewDetails: '查看详情',
    eventDate: '日期',
    location: '地点',
    participants: '参与者',
    category: '类别',
    filterAll: '全部',
    filterWorkshop: '工作坊',
    filterHackathon: '黑客马拉松',
    filterSeminar: '研讨会',
    filterCompetition: '竞赛',
    filterNetworking: '网络活动'
  },
  resources: {
    title: '学习资源',
    description: '获取可持续技术开发的精选资源',
    filterTitle: '筛选资源',
    expandFilters: '展开筛选',
    collapseFilters: '收起筛选',
    searchPlaceholder: '搜索资源...',
    filterAll: '全部',
    filterTutorials: '教程',
    filterTools: '工具',
    filterBooks: '书籍',
    filterCourses: '课程',
    filterDocumentation: '文档',
    noResults: '未找到资源',
    viewResource: '查看资源',
    downloadResource: '下载',
    freeResource: '免费',
    paidResource: '付费',
    difficulty: '难度',
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    category: '类别',
    author: '作者',
    rating: '评分'
  },
  contact: {
    title: '联系我们',
    description: '如有疑问、合作或伙伴关系，请与我们的团队联系',
    getInTouch: '联系我们',
    contactInfo: '联系信息',
    followUs: '关注我们',
    form: {
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '消息',
      namePlaceholder: '您的姓名',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: '我们如何帮助您？',
      messagePlaceholder: '请详细说明您的询问...',
      sendMessage: '发送消息',
      sending: '发送中...',
      messageSent: '消息发送成功！',
      messageError: '发送消息失败。请重试。'
    },
    info: {
      address: '创新街123号，科技城市，TC 12345',
      phone: '+86 (555) 123-4567',
      email: 'hello@energycoder.club',
      hours: '周一至周五：上午9点 - 下午6点'
    }
  },
  dashboard: {
    title: '控制台',
    welcome: '欢迎回来，',
    memberSince: '会员自',
    logout: '退出',
    myProjects: {
      title: '我的项目',
      description: '管理和跟踪您对我们开源项目的贡献',
      noProjects: '暂无项目',
      viewGithub: '查看GitHub'
    },
    upcomingEvents: {
      title: '即将开始的活动',
      description: '及时了解即将开始的工作坊和活动',
      noEvents: '暂无即将开始的活动',
      viewAll: '查看所有活动'
    },
    myActivity: {
      title: '我的活动',
      description: '跟踪您的贡献和社区参与度',
      contributions: '贡献',
      eventsAttended: '参加的活动',
      projectsCompleted: '完成的项目'
    },
    quickActions: {
      title: '快捷操作',
      submitProject: '提交新项目',
      registerEvent: '注册活动',
      viewResources: '查看资源',
      contactUs: '联系我们'
    }
  },
  footer: {
    clubName: '新能源编程俱乐部',
    description: '通过协作开发构建可持续技术',
    navigation: '导航',
    resources: '资源',
    contact: '联系',
    learningMaterials: '学习资料',
    joinClub: '加入俱乐部',
    address: '江苏省常州市新北区辽河路666号常州工学院辽河路校区玉衡A416仓库实验室',
    copyright: '© 2024 新能源编程俱乐部。保留所有权利。'
  }
};