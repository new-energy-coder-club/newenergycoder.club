import { maintainers, developers, designers, preMaintainers, researchers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const zhTranslations: Translations = {
  joinPage: {
    title: '加入我们的编程俱乐部',
    subtitle: '成为我们可持续编程社区的一员？',
    wechat: {
      title: '微信群',
      description: '加入我们的技术群，了解最新更新、项目计划和社区活动',
      id: 'NEC 新能源开发者社区',
      copyButton: '复制群名',
      copied: '已复制！',
      addTips: '如何加入？',
      addTipsList: [
        '复制上面的群名',
        '打开微信',
        '搜索群名',
        '申请加入'
      ]
    },
    roadmap: {
      title: '你的路线',
      description: '从关注到成为我们社区活跃贡献者的路径：',
      steps: [
        {
          title: '了解我们',
          description: '浏览项目介绍和团队文化',
          duration: '5-10分钟'
        },
        {
          title: '技术准备',
          description: '准备基础开发环境和技能',
          duration: '1-2小时'
        },
        {
          title: '加入组织',
          description: '在 GitHub 上关注我们的开源组织并了解项目',
          duration: '1-5分钟'
        },
        {
          title: '参与贡献',
          description: '寻找 Good First Issue，提交你的第一个 PR 或 Issue',
          duration: '1-3天'
        },
        {
          title: '深入合作',
          description: '与团队成员共同开发核心模块，参加线上/线下技术会议',
          duration: '长期'
        }
      ]
    },
    cta: {
      title: '想入坑？',
      description: '我们不收简历，只看你能不能熬夜调板子',
      addWechat: '加群吹水',
      viewProject: '先看项目',
      tip: '💡 提示：加群后记得自我介绍，说说你烧过几块板子'
    },
    github: {
      title: '加入 GitHub 组织',
      button: '前往 GitHub'
    },
    contact: {
      title: '联系加入我们',
      openFeishu: '打开飞书邀请',
      downloadFeishu: '下载飞书',
      copied: '已复制 ✓',
      copyButton: '复制 maintainer 微信'
    },
    form: {
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      experience: '经验',
      interests: '兴趣',
      submit: '提交',
      submitting: '提交中...',
      success: '提交成功',
      error: '提交失败'
    },
    benefits: {
      title: '会员福利',
      networking: '人脉拓展',
      learning: '学习机会',
      projects: '项目参与',
      career: '职业发展'
    }
  },
  nav: {
    home: '首页',
    projects: '项目',
    innovation: '创新成果',
    events: '活动',
    resources: '资源',
    contact: '联系我们',
    team: '团队',
    login: '登录',
    logout: '退出',
    joinClub: '加入俱乐部',
    joinCollab: '加入协作',
    dashboard: '控制台'
  },
  hero: {
    tagline: '面向 ROBOCON 与新能源工程的开源技术社区',
    title: '提供经过真实竞赛验证的',
    titleHighlight: '成本敏感开源方案',
    description: '模块化代码基线、硬件方案与协作工具。NEC 新能源开发者社区 出品，服务多所高校 ROBOCON 竞赛队伍。',
    joinCommunity: '查看开源项目',
    viewGithub: '加入协作',
    codingWorkshops: '模块化代码库',
    codingWorkshopsDesc: '嵌入式、视觉、控制算法',
    innovationProjects: '硬件方案开源',
    innovationProjectsDesc: '机械、电路、PCB 完全开源',
    industryConnections: '线上线下协作',
    industryConnectionsDesc: 'A416 实验室实体开发环境'
  },
  about: {
    title: '关于我们',
    paragraph1: 'NEC (New Energy Coder Club) 是一个面向 ROBOCON 机器人竞赛与新能源工程的开源技术社区，我们提供经过真实竞赛验证的模块化代码基线、硬件方案与协作工具，同时我们具备以下专业能力：',
    coreAbilities: [
      {
        icon: 'Wrench',
        title: '加工制造',
        description: '3D 打印 / SMT 焊接贴片 / 激光雕刻机切割',
      },
      {
        icon: 'Cpu',
        title: '电机与驱动',
        description: 'M3508 直流无刷电机 / DM3519 直线导轨',
      },
      {
        icon: 'CircuitBoard',
        title: '电控开发',
        description: 'ESP32 嵌入式（配套 HXC-A 板）/ DAPLink 无线烧录与调试',
      },
      {
        icon: 'Camera',
        title: '视觉',
        description: 'Odin1 视觉导航模组 / 树莓派',
      },
      {
        icon: 'Codepen',
        title: '软件工具',
        description: 'PlatformIO + VS Code / ROS2 + Docker',
      },
      {
        icon: 'BrainCircuit',
        title: 'AI 开发',
        description: 'Vibe coding',
      },
    ],
    learnMore: '了解更多',
    projectOrigin: {
      title: '第一阶段：项目起源',
      subtitle: '解锁我们的故事，从这里开始',
      content: 'NEC 编程俱乐部最初是一个专注于太阳能监测的小型组织，现已发展成为一个综合性的可持续技术社区。我们的成长离不开团队成员、教育工作者和行业专业人士的共同推动。'
    },
    phase2: {
      title: '当前阶段：社区扩展',
      description: '超越初始项目',
      content: '随着我们早期项目的成功，我们将扩展到包括风能优化、智能电网技术和可持续交通解决方案，同时保持对开源开发的热情关注。'
    },
    coreAdvantages: {
      title: '我们有什么？',
      subtitle: '不是 polished 的演示，是沾满松香和焊锡膏的真实资产',
      dualTrack: {
        title: '比赛 + 项目双轨',
        description: 'competitions/ 是血泪赛场，projects/ 是长期沉淀。每个文件夹里都有 README 记录着当时为什么踩了这个坑。不是「赛题仓库」，是「错题本」。'
      },
      fullProcess: {
        title: '过程全记录',
        description: '不是只有「最终版」。v0.1 到 v2.0 的全部 commit 都留着，包括那些「哎呀这个方案不行」的 revert。失败的路径和成功的一样有价值。'
      },
      onboarding: {
        title: '入坑有路',
        description: '我们写了「踩坑手册」，记录了每一块板子是怎么烧的。不看也没事，反正你来了我们也会再带你踩一遍（笑）。'
      },
      base: {
        title: 'A416 据点',
        description: '不是「创客空间」，是个堆满板子、线材、还有泡面味儿的实验室。来这你能闻到松香，看到我们是怎么把 200 块活成 2000 块的效果。'
      },
      knowledgeBase: {
        title: '知识库',
        description: '飞书知识库里有我们整理的「失败案例集」，比成功案例厚三倍。官网和仓库只是入口，真正的血泪史都在文档里。'
      },
      feishuLink: '飞书知识库',
      escapeManualLink: '踩坑手册'
    },
    contributing: {
      title: '贡献',
      description: '我们如何构建社区',
      howToContribute: '如何贡献',
      steps: [
        '通过我们的 Gitee 仓库加入',
        '参加每周工作坊',
        '参与开源项目',
        '与团队成员合作',
        '分享知识和最佳实践'
      ],
      codeOfConduct: '行为准则',
      reportIssues: '报告问题',
      submitPR: '提交拉取请求'
    },
    license: {
      title: '许可证',
      description: '开源许可',
      openSource: '我们所有的项目都在 MIT 许可证下开源',
      permissions: ['商业使用', '修改', '分发', '个人使用'],
      limitations: ['责任', '担保'],
      conditions: ['许可证和版权声明'],
      permissionsTitle: '许可',
      limitationsTitle: '限制',
      conditionsTitle: '条件'
    }
  },
  features: {
    title: '开源工程基础设施',
    subtitle: '不是「社团活动」，而是可复用的工程方案',
    weeklyWorkshops: '模块化代码库',
    weeklyWorkshopsDesc: '经过竞赛验证的嵌入式、视觉、控制算法',
    openSource: '硬件方案开源',
    openSourceDesc: '机械结构、电路原理图、PCB 布局完全开源',
    hackathons: '协作工具链',
    hackathonsDesc: '光伏排布、型材计算等工程辅助工具',
    guestSpeakers: '分层贡献体系',
    guestSpeakersDesc: '从 Good First Issue 到核心模块维护的清晰路径',
    networking: '线上线下结合',
    networkingDesc: 'A416 实验室提供实体开发环境',
    conferences: '技术文档中心',
    conferencesDesc: '详细的 API 文档、赛题解析、开发笔记'
  },
  team: {
    title: '我们是谁？',
    description: '我们最吸引人的从来不是「完美」，而是「在至暗时刻还能笑着调板子的那股劲」。预算只有其他团队 1/10 却敢坚持到赛场并完赛的那口劲；是一群人躺在实验室地面上，醒来的人紧张忙碌着传递工具，用 Gitee 跨时区远程协作，拼命要把项目弄好的那口劲。这才是 NEC 开源社区的灵魂。',
    maintainerTitle: '维护者',
    developerTitle: '开发者',
    designerTitle: '设计师',
    preMaintainerTitle: '预备维护者',
    researcherTitle: '研究员',
    contributorTitle: '贡献者',
    sponsorTitle: '赞助商',
    viewFullTeam: '查看完整团队',
    teamPhoto: '团队照片',
    brochure: {
      viewButton: '查看招商手册',
      title: '招商手册',
      pageAlt: '招商手册第 {n} 页'
    },
    analytics: {
      title: '团队分析',
      description: '我们社区成长的详细统计',
      totalMembers: '总成员',
      activeContributors: '活跃贡献者',
      giteeReference: 'Gitee 参考',
      lastUpdated: '最后更新',
      roleDistribution: '角色分布',
      contributionStats: '贡献统计',
      mainResponsibilities: '主要职责',
      maintainerResponsibilities: '项目管理、代码审查、技术决策',
      developerResponsibilities: '功能开发、Bug 修复、技术实现',
      designerResponsibilities: '界面设计、用户体验、视觉规范',
      contributorResponsibilities: '文档编写、测试反馈、社区支持'
    },
    teamPhotoDescription: '团队成员在项目开发过程中的合影，记录了我们共同努力和合作的美好时光。',
    researchers,
    preMaintainers,
    maintainers,
    developers,
    designers,
    contributors,
    sponsors
  },
  cta: {
    title: '来吧，别光看',
    description: '200 块都能玩机器人，你还怕啥？ broken board 是常态，调通的那一刻才是高潮',
    getStarted: '入坑指南'
  },
  common: {
    loading: '加载中...',
    error: '出现错误',
    success: '成功',
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
    title: 'ROBOCON 与机器人项目',
    description: '全国大学生机器人大赛（ROBOCON）参赛项目与机器人技术研究',
    filterTitle: '项目分类',
    expandFilters: '展开',
    collapseFilters: '收起',
    filterAll: '全部项目',
    filterAI: '人工智能',
    filterIoT: '物联网',
    filterEmbedded: '嵌入式系统',
    filterRobotics: '机器人技术',
    filterResearch: '研究',
    filterWeb: 'Web 开发',
    filterMobile: '移动应用',
    filterOther: '其他',
    viewProject: '查看项目',
    viewCode: '查看代码',
    technologies: '技术栈',
    author: '开发团队',
    date: '年份'
  },
  events: {
    title: '活动',
    description: '技术分享、工作坊与 ROBOCON 备赛活动',
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
    description: '获取可持续技术开发的优质资源',
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
    rating: '评分',
    sortBy: '排序方式',
    sortOrder: '排序',
    sortByRating: '评分',
    sortByTitle: '标题',
    sortByDifficulty: '难度',
    sortByType: '类型',
    ascending: '升序',
    descending: '降序',
    totalResources: '共{count} 个资源'
  },
  contact: {
    title: '联系我们',
    description: '如有问题、合作或咨询，请与我们的团队联系',
    getInTouch: '联系我们',
    contactInfo: '联系信息',
    followUs: '关注我们',
    channelsDescription: '您也可以通过以下方式与我们取得联系：',
    followUsDescription: '在社交媒体关注我们，获取最新动态与新闻。',
    form: {
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '消息',
      namePlaceholder: '您的姓名',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: '我们如何帮助您？',
      messagePlaceholder: '请详细说明您的问题...',
      sendMessage: '发送消息',
      sending: '发送中...',
      messageSent: '消息发送成功！',
      messageError: '消息发送失败。请重试。',
      introText: '请填写下方表单，我们将尽快与您联系。',
      toastSuccessDescription: '我们将尽快与您取得联系。',
      toastErrorDescription: '请检查您的网络连接并重试。'
    },
    info: {
      address: '江苏省常州市新北区辽河路666号玉衡楼 A416',
      phone: '+86 158 9600 0818',
      email: '22230635@czu.cn',
      hours: '周一至周六：上午9点- 下午6点'
    },
    infoLabels: {
      address: '地址',
      phone: '电话',
      email: '邮箱',
      hours: '工作时间'
    },
    social: {
      gitee: 'Gitee',
      wechat: '微信',
      email: '邮箱'
    },
    application: {
      title: 'NEC 官网上线申请',
      description: '申请加入 NEC 官网，展示您的项目与成果。',
      applyNow: '立即申请'
    }
  },
  dashboard: {
    title: '控制台',
    welcome: '欢迎回来！',
    memberSince: '会员自',
    logout: '退出',
    myProjects: {
      title: '我的项目',
      description: '管理和跟踪您对我们开源项目的贡献',
      noProjects: '无项目',
      viewGithub: '查看 Gitee'
    },
    upcomingEvents: {
      title: '即将开始的活动',
      description: '及时了解即将开始的工作坊和活动',
      noEvents: '无即将开始的活动',
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
    clubName: 'NEC 新能源开发者社区',
    description: '通过合作开发构建可持续技术',
    navigation: '导航',
    resources: '资源',
    contact: '联系',
    learningMaterials: '学习材料',
    joinClub: '加入 NEC 仓库实验室',
    documentation: '文档中心',
    gettingStarted: '入门文档',
    giteeRobotRepo: 'Gitee No.24 机器人开源仓库',
    techRoadmap: {
      title: '技术路线',
      description: '专业的技术发展指导'
    },
    address: '江苏省常州市新北区辽河路666号',
    copyright: '© 2025 NEC 新能源开发者社区。保留所有权利。'
  },
  displayRatio: {
    title: '显示比例调整器',
    description: '调整屏幕显示比例，查看不同比例下的视觉效果',
    aspectRatioLabel: '显示比例',
    viewDetails: '查看详情',
    noMatchingContent: '没有找到匹配的内容',
    aspectRatios: {
      square: '正方形 (1:1)',
      video: '视频比例 (16:9)',
      traditional: '传统比例 (4:3)',
      portrait: '竖屏比例 (3:4)',
      widescreen: '宽屏比例 (16:10)',
      ultrawide: '超宽比例 (21:9)'
    }
  },
  // Getting Started 页面翻译
  gettingStarted: {
    hero: {
      title: '新能源编程俱乐部',
      description: '探索新能源技术的无限可能，从编程开始改变世界',
      buttons: {
        joinClub: '加入俱乐部',
        viewProjects: '查看项目',
        visitSite: '访问官网'
      }
    },
    stats: {
      learnersTitle: '学习者',
      learnersDesc: '活跃学习者',
      completedProjectsTitle: '完成项目',
      completedProjectsDesc: '项目完成数',
      averageRatingTitle: '平均评分',
      averageRatingDesc: '学员满意度',
      successRateTitle: '成功率',
      successRateDesc: '学习成功率',
      csdnVisitsTitle: 'CSDN 访问量',
      csdnVisitsDesc: '博客总访问次数'
    },
    directions: {
      title: '选择您的技术方向',
      description: '根据您的兴趣和职业规划，选择最适合的学习路径',
      coreSkills: '核心技能',
      projectsSuffix: '个项目',
      startLearning: '开始学习',
      embedded: {
        title: '嵌入式开发',
        description: '学习嵌入式系统开发，掌握硬件与软件结合的核心技术',
        skills: ['C/C++', 'FreeRTOS', '硬件测试', '通信协议'],
        duration: '6-8个月'
      },
      gui: {
        title: 'GUI 界面开发',
        description: '掌握跨平台图形界面开发，创建美观实用的桌面应用',
        skills: ['Qt/QML', 'UI 设计', '跨平台开发', '用户体验'],
        duration: '4-6个月'
      },
      algorithm: {
        title: '算法与数据结构',
        description: '深入学习算法设计与优化，提升编程思维和解决问题的能力',
        skills: ['算法设计', '数据结构', '性能优化', '数学建模'],
        duration: '8-12个月'
      },
      structurePrint: {
        title: '结构打印开发',
        description: '面向 3D 结构打印的设计、切片与控制开发',
        skills: ['CAD 建模', '切片软件', '材料工艺', 'G-code/控制'],
        duration: '5-7个月'
      }
    },
    quickGuides: {
      title: '快速上手指南',
      description: '跟随我们的指南，快速开始您的编程之旅',
      stepsLabel: '步骤：',
      items: {
        setup: {
          title: '环境搭建',
          description: '快速搭建开发环境，开始您的编程之时',
          steps: [
            '选择合适的开发工具',
            '安装必要的依赖包',
            '配置开发环境',
            '运行第一个程序'
          ],
          estimatedTime: '30分钟'
        },
        firstGoodIssue: {
          title: '第一个好的问题',
          description: '寻找并解决您的第一个 Good Issue，开始为开源项目做贡献',
          steps: [
            '浏览项目 Issue 列表',
            '筛选 Good First Issue 标签',
            '理解问题描述和要求',
            'Fork 项目并创建分支',
            '实现解决方案',
            '提交 Pull Request'
          ],
          estimatedTime: '25分钟'
        },
        firstProject: {
          title: '第一个项目',
          description: '通过实际项目快速上手，掌握完整开发流程',
          steps: [
            '选择开源项目',
            '理解项目结构',
            '编写核心代码',
            '测试和调试',
            '项目部署'
          ],
          estimatedTime: '2小时'
        },
        community: {
          title: '加入社区',
          description: '融入学习社区，获得更多支持和交流机会',
          steps: [
            '注册社区账号',
            '加入相关讨论组',
            '参与线上活动',
            '分享您的知识',
            '与其他开发者交流'
          ],
          estimatedTime: '15分钟'
        }
      }
    },
    baseTutorials: {
      title: '基础教程',
      description: '从零开始学习编程基础知识和核心概念',
      introTitle: '编程入门',
      introDesc: '编程基础概念和思维方式，了解新能源编程的应用领域和发展前景',
      fundamentalsTitle: '编程基础',
      fundamentalsDesc: '变量、函数、控制结构等基础知识，掌握编程的核心概念和语法',
      startLearning: '开始学习'
    },
    trainingResources: {
      title: '培训资源',
      description: '丰富的学习资源，助你快速提升技能',
      githubRepoTitle: 'GitHub 仓库',
      githubRepoDesc: '查看项目源码和贡献代码',
      visitGithub: '访问 GitHub',
      docsTitle: '技术文档',
      docsDesc: '详细的技术文档和 API 参考',
      viewDocs: '查看文档',
      videosTitle: '视频教程',
      videosDesc: '观看实战项目视频教程',
      watchVideos: '观看视频',
      communityTitle: '社区交流',
      communityDesc: '加入社区讨论和交流',
      joinDiscussion: '加入讨论'
    }
  },
  learning: learningTranslations.zh
};
