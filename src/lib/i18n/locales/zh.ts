import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';

export const zhTranslations: Translations = {
  joinPage: {
    title: '加入我们的俱乐部',
    subtitle: '成为我们可持续编程社区的一员',
    wechat: {
      title: '微信群',
      description: '加入我们的微信群，了解最新更新、项目讨论和社区活动',
      id: '新能源编程俱乐部',
      copyButton: '复制群名',
      copied: '已复制！',
      addTips: '如何加入：',
      addTipsList: [
        '复制上面的群名',
        '打开微信',
        '搜索群名',
        '申请加入'
      ]
    },
    roadmap: {
      title: '您的旅程',
      description: '从申请到成为我们社区活跃成员的路径',
      steps: [
        {
          title: '提交申请',
          description: '填写我们的会员申请表，告诉我们您的兴趣、技能和动机',
          duration: '5-10分钟'
        },
        {
          title: '初步联系',
          description: '我们的团队成员将在24小时内通过电子邮件与您联系，安排介绍会议',
          duration: '24小时内'
        },
        {
          title: '介绍会议',
          description: '参加介绍会议，了解我们的项目、社区准则以及如何开始',
          duration: '30-45分钟'
        },
        {
          title: '项目分配',
          description: '根据您的兴趣和技能，我们将为您分配一个适合的项目团队',
          duration: '1-2天'
        },
        {
          title: '开始贡献',
          description: '开始参与您的项目团队，参加每周会议，并开始为开源项目做贡献',
          duration: '立即开始'
        }
      ]
    },
    cta: {
      title: '准备好加入了吗？',
      description: '迈出第一步，成为我们致力于可持续技术的充满活力的社区的一部分',
      addWechat: '添加微信群',
      viewProject: '查看我们的项目',
      tip: '我们迫不及待地想见到您！'
    }
  },
  join: {
    form: {
      title: '加入新能源编程俱乐部',
      subtitle: '填写此表格成为我们社区的一员',
      basicInfo: {
        title: '基本信息',
        description: '请提供您的基本联系信息',
        name: '姓名',
        email: '邮箱地址',
        phone: '电话号码',
        organization: '组织/公司',
        namePlaceholder: '请输入您的姓名',
        emailPlaceholder: '请输入您的邮箱地址',
        phonePlaceholder: '请输入您的电话号码',
        organizationPlaceholder: '请输入您的组织或公司'
      },
      roleInfo: {
        title: '角色信息',
        description: '告诉我们您的专业背景',
        role: '角色',
        rolePlaceholder: '请输入您的角色',
        experience: '经验',
        experiencePlaceholder: '描述您的经验',
        identityLabel: '身份',
        student: '学生',
        professional: '专业人士',
        freelancer: '自由职业者',
        other: '其他'
      },
      techStack: {
        title: '技术技能',
        description: '选择您的专业领域',
        frontend: '前端开发',
        backend: '后端开发',
        embedded: '嵌入式系统',
        ai: 'AI/机器学习',
        other: '其他',
        otherPlaceholder: '请说明其他技能',
        options: ['前端', '后端', '移动端', 'AI/ML', 'DevOps', '数据科学']
      },
      experience: {
        title: '经验与动机',
        description: '分享您的背景和目标',
        motivation: '动机',
        motivationPlaceholder: '您为什么想加入？',
        experienceLabel: '技术经验',
        motivationLabel: '动机',
        contributionLabel: '预期贡献',
        experiencePlaceholder: '描述您的技术背景',
        contributionPlaceholder: '您计划如何贡献？'
      },
      timeExpectation: {
        title: '时间投入',
        description: '帮助我们了解您的可用时间',
        expectationsLabel: '期望',
        expectationsPlaceholder: '您对俱乐部有什么期望？',
        availabilityLabel: '每周可用时间（小时）',
        selectPlaceholder: '选择您的可用时间',
        option1to2: '1-2小时',
        option3to5: '3-5小时',
        option6to10: '6-10小时',
        option10plus: '10+小时'
      },
      submit: {
        button: '提交申请',
        submitting: '提交中...',
        success: '申请已提交',
        successMessage: '感谢您的申请！我们将审核并尽快回复您。',
        error: '提交失败',
        errorMessage: '提交申请时出现错误，请重试。'
      }
    }
  },
  nav: {
    home: '首页',
    projects: '项目',
    events: '活动',
    resources: '资源',
    contact: '联系我们',
    team: '团队',
    login: '登录',
    logout: '退出',
    joinClub: '加入俱乐部',
    dashboard: '控制台'
  },
  hero: {
    tagline: '欢迎来到新能源编程俱乐部',
    title: '构建可持续',
    titleHighlight: '未来',
    description: '加入我们的社区，通过开源项目、技术研讨会和协作学习，推动可再生能源和可持续技术的发展。',
    joinCommunity: '加入社区',
    viewGithub: '查看Gitee',
    codingWorkshops: '编程工作坊',
    codingWorkshopsDesc: '每周动手编程工作坊',
    innovationProjects: '创新项目',
    innovationProjectsDesc: '可再生能源开源项目',
    industryConnections: '行业联系',
    industryConnectionsDesc: '与可持续技术领导者建立联系'
  },
  about: {
    title: '关于我们',
    paragraph1: '新能源编程俱乐部是一个由学生主导的技术社区，致力于通过开源项目和协作学习推动可持续技术的发展。我们的使命是弥合可再生能源与软件开发之间的差距。',
    paragraph2: '成立于2024年，我们已经从一个小型学习小组发展成为一个充满活力的社区，拥有来自不同学科的活跃贡献者，包括计算机科学、电气工程、环境科学等。',
    paragraph3: '我们的项目涵盖人工智能、物联网、嵌入式系统和数据分析，所有这些都专注于解决可再生能源、能源效率和可持续技术方面的现实挑战。',
    learnMore: '了解更多',
    projectOrigin: {
      title: '项目起源',
      content: '我们的俱乐部最初是一个专注于太阳能预测的小型项目，现已发展成为一个综合性的可持续技术社区。我们的成长是由学生、教育工作者和行业专业人士的协作努力推动的。'
    },
    phase2: {
      title: '第二阶段：社区扩展',
      description: '超越初始项目',
      content: '随着我们早期项目的成功，我们将范围扩展到包括风能优化、智能电网技术和可持续交通解决方案，同时保持对开源开发的强烈关注。'
    },
    contributing: {
      title: '贡献',
      description: '我们如何构建社区',
      howToContribute: '如何贡献',
      steps: [
        '通过我们的Gitee仓库加入',
        '参加每周工作坊',
        '参与开源项目',
        '与团队成员协作',
        '分享知识和最佳实践'
      ],
      codeOfConduct: '行为准则',
      reportIssues: '报告问题',
      submitPR: '提交拉取请求'
    },
    license: {
      title: '许可证',
      description: '开源承诺',
      openSource: '我们所有的项目都在MIT许可证下开源',
      permissions: ['商业使用', '修改', '分发', '私人使用'],
      limitations: ['责任', '担保'],
      conditions: ['许可证和版权声明']
    }
  },
  features: {
    title: '俱乐部特色',
    subtitle: '加入我们的社区，享受这些独特的好处',
    weeklyWorkshops: '每周工作坊',
    weeklyWorkshopsDesc: '定期举办编程和技术研讨会',
    openSource: '开源项目',
    openSourceDesc: '为真实的可持续技术项目做贡献',
    hackathons: '黑客马拉松',
    hackathonsDesc: '参加专注的编码挑战',
    guestSpeakers: '客座演讲者',
    guestSpeakersDesc: '向行业专家学习',
    networking: '网络交流',
    networkingDesc: '与志同道合的人建立联系',
    conferences: '会议',
    conferencesDesc: '参加可持续技术活动'
  },
  team: {
    title: '我们的团队',
    description: '认识我们多元化团队的学生、开发者和可持续技术爱好者',
    maintainerTitle: '维护者',
    developerTitle: '开发者',
    designerTitle: '设计师',
    contributorTitle: '贡献者',
    sponsorTitle: '赞助商',
    viewFullTeam: '查看完整团队',
    teamPhoto: '团队照片',
    analytics: {
      title: '团队分析',
      description: '我们社区增长的详细统计',
      totalMembers: '总成员',
      activeContributors: '活跃贡献者',
      giteeReference: 'Gitee参考',
      lastUpdated: '最后更新',
      roleDistribution: '角色分布',
      contributionStats: '贡献统计',
      mainResponsibilities: '主要职责'
    },
    maintainers: [
      {
        name: 'DarrenPig',
        role: 'Club Founder & BSP 嵌软工程师',
        bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/maintainer/DarrenPig.jpg',
        tags: ['AI', 'BSP', '嵌入式', 'ROBOCON', '能源监测', 'openEuler'],
        github: 'https://github.com/Darrenpig',
        email: '22230635@czu.cn'
      },
      {
        name: '殷统创',
        role: 'Club Founder & BSP Expert',
        bio: '专注于AI在能源优化应用的可再生能源研究员。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/maintainer/殷统创.jpg',
        tags: ['AI', 'BSP', '能源优化', '可再生能源', '华为云AI'],
        github: 'https://github.com/yintongchuang'
      },
      {
        name: '许珑译',
        role: '机器人算法工程师',
        bio: '专注于机器人算法研发部署以及业务逻辑设计。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/maintainer/许珑译.jpg',
        tags: ['机器人算法', 'ROBOCON', '人形机器人', '算法部署', 'ROS'],
        github: 'https://github.com/xulongyi'
      },
      {
        name: '张旺旺',
        role: '机器人运行时工程师',
        bio: '负责项目的核心技术攻坚，保障电控系统的稳定运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/maintainer/张旺旺.jpg',
        tags: ['电控系统', '运行时', 'ROBOCON', '嵌入式', '系统稳定性'],
        github: 'https://github.com/zhangwangwang'
      }
    ],
    developers: [
      {
        name: '刘英琪',
        role: '嵌入式开发工程师',
        bio: '专注于现代机器人技术栈，致力于构建高性能的机器人界面。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/刘英琪.png',
        tags: ['React', 'TypeScript', 'Vue', '前端架构', 'UI/UX', 'Vite'],
        github: 'https://github.com/liuyingqi'
      },
      {
        name: '单广志',
        role: '嵌入式开发工程师',
        bio: '机器人行业电控驱动开发以及硬件电路设计。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/单广志.png',
        tags: ['嵌入式开发', '电控驱动', '硬件电路设计', '机器人', 'STM32', 'PCB设计'],
        github: 'https://github.com/shanguangzhi'
      },
      {
        name: '周志',
        role: '全栈开发工程师',
        bio: '具备前后端开发能力，致力于端到端的解决方案开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/周志.png',
        tags: ['全栈开发', 'JavaScript', 'Python', 'React', 'Node.js', '项目管理'],
        github: 'https://github.com/zhouzhi'
      },
      {
        name: '李硕',
        role: '硬件系统架构师',
        bio: '专注于硬件系统架构设计和技术选型，为项目提供技术指导。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/李硕.png',
        tags: ['系统架构', '技术选型', '分布式系统', '性能优化', '云原生', 'Kubernetes'],
        github: 'https://github.com/lishuo'
      },
      {
        name: '牛良旭',
        role: 'DevOps电池管理工程师',
        bio: '负责项目的持续集成和部署，保障开发流程的高效运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/牛良旭.jpg',
        tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'GitHub Actions', '自动化部署'],
        github: 'https://github.com/niuliangxu'
      },
      {
        name: '郑钦文',
        role: '机电一体化开发工程师',
        bio: '专注于机电设计开发，为用户提供优质的移动端体验。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/郑钦文.jpg',
        tags: ['React Native', 'Flutter', 'iOS', 'Android', '移动端优化', '跨平台开发'],
        github: 'https://github.com/zhengqinwen'
      },
      {
        name: '杨力滔',
        role: '星闪手柄开发工程师',
        bio: '星闪手柄开发专家，熟悉STM32+RTOS C语言开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/杨力滔.JPG',
        tags: ['星闪手柄', 'STM32', 'RTOS', 'C语言', '嵌入式开发', '硬件控制'],
        github: 'https://github.com/yanglitao'
      },
      {
        name: '彭柯颖',
        role: '机械R1机器人开发者',
        bio: '新加入的开发团队成员，积极参与机器人项目开发，学习新技术。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/彭柯颖.jpg',
        tags: ['新成员', '项目开发', '学习成长', 'Web开发', 'JavaScript', '团队协作'],
        github: 'https://github.com/pengkeying'
      }
    ],
    designers: [
      {
        name: 'Xiux',
        role: 'UI/UX设计师 & 仓库PM',
        bio: '专注于开发者体验设计和界面优化，为可持续仓库创造美观易用的界面。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/xiux.jpg',
        tags: ['UI设计', 'UX设计', 'Figma', 'Sketch', '原型设计', '用户研究']
      },
      {
        name: 'ikkOoOo',
        role: '工业/产品设计师',
        bio: '专注于创意设计和视觉表达，为项目提供独特的设计视角。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/ikkOoOo.jpg',
        tags: ['创意设计', '视觉表达', '设计创新', '艺术指导', '品牌设计', '视觉传达']
      },
      {
        name: '张若璐',
        role: '视觉设计师&财务分析师',
        bio: '专注于品牌落地和财务分析，为项目提供专业的财务视角可行性落地设计。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/张若璐.jpg',
        tags: ['品牌设计', 'Power BI', 'Logo设计', '色彩搭配']
      },
      {
        name: '韦彩日',
        role: '工业产品设计师',
        bio: '负责对接需求，专注于工业产品设计，为项目提供专业的设计解决方案。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/韦彩日.jpg',
        tags: ['工业设计', '产品设计', '需求对接', '设计解决方案', '用户体验', '产品规划']
      },
      {
        name: '李一楠',
        role: '运营组长',
        bio: '为NEC小队宣传以及主持，负责团队运营和对外宣传工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/李一楠.jpg',
        tags: ['团队运营', '宣传策划', '活动主持', 'NEC小队', '对外联络', '品牌推广']
      },
      {
        name: '李想',
        role: 'UX设计师',
        bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/李想.jpg',
        tags: ['UX设计', '用户体验', '设计思维', 'Figma', '用户旅程', '信息架构']
      }
    ],
    contributors: [
      {
        name: '卢永杰',
        role: '嵌入式&运控算法专家',
        bio: '专注算法部署优化及BSP逻辑协同设计，在嵌入式和运控算法领域有深入研究。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/卢永杰.jpg',
        tags: ['嵌入式开发', '运控算法', '算法部署', '协同设计', '算法优化'],
        github: 'https://github.com/luyongjie'
      },
      {
        name: '卢王淳',
        role: '25RC项管&机械&电控小白',
        bio: '25RC项目管理，机械和电控领域的学习者，负责项目协调工作。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/卢王淳.jpg',
        tags: ['项目管理', '机械设计', '电控学习', 'ROBOCON', '团队协调', '25RC'],
        github: 'https://github.com/luwangchun'
      },
      {
        name: '崔正阳',
        role: '上位机测试工程师',
        bio: '专注于上位机软件质量保证，确保项目的稳定性和可靠性。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/崔正阳.jpg',
        tags: ['海鸥派', 'Liunx', 'openEuler', '自动化测试', '性能测试'],
        github: 'https://github.com/cuizhengyang'
      },
      {
        name: '闻志伟',
        role: 'Bronze Sponsor',
        bio: '致力于推动可持续技术发展的个人赞助者。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/闻志伟.jpg',
        tags: ['技术赞助', '项目支持', '可持续发展', '创新资助', '社区建设', '人才培养']
      },
      {
        name: '张旺旺',
        role: '新能源运维工程师',
        bio: '负责核心项目的真机部署和运维工作，保障系统的稳定运行。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/张旺旺.jpg',
        tags: ['运维部署', 'Linux', '服务器管理', '监控告警', '故障排查', '系统优化'],
        github: 'https://github.com/zhangwangwang'
      },
      {
        name: '吴洛斌',
        role: '开源贡献者&气动自动化专家',
        bio: '积极参与开源项目，为社区贡献代码商业化文档。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/吴洛斌.jpg',
        tags: ['气动自动化', '开源贡献', '工业控制', 'PLC', '自动化系统'],
        github: 'https://github.com/wuluobin'
      },
      {
        name: '余浩铭',
        role: '机器人日志运营编辑',
        bio: '专注于宣传和文字，让NEC的每一份理念都能被看见。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/developer/余浩铭.jpg',
        tags: ['文艺工作', '运营编辑', '宣传策划', '文字编辑', 'NEC理念', '内容创作'],
        github: 'https://github.com/yuhaoming'
      },
      {
        name: '许子涵',
        role: '产品经理',
        bio: '负责产品规划和需求分析，推动项目向正确方向发展。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/许子涵.png',
        tags: ['产品规划', '需求分析', '用户研究', 'Axure', '原型设计', '数据分析'],
        github: 'https://github.com/xuzihan'
      },
      {
        name: '卞乐凌',
        role: '嵌入式学习贡献者',
        bio: '嵌入式学习中，积极参与开源项目和社区建设。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/卞乐凌.jpg',
        tags: ['嵌入式学习', '开源贡献', '社区建设', 'STM32', '硬件开发'],
        github: 'https://github.com/bianleiling'
      },
      {
        name: '王彦君',
        role: '工业/产品设计师',
        bio: '致力于通过设计解决实际问题，以更开放的态度寻找更多可能性。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/王彦君.jpg',
        tags: ['工业设计', '产品设计', 'SolidWorks', 'Rhino', '3D建模', '材料工艺']
      },
      {
        name: '徐海婷',
        role: '财务管理专员',
        bio: '聚焦财务流程优化与数据支撑，通过合理预算、风险防控，助力技术实践、行稳致远。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/徐海婷.jpg',
        tags: ['财务管理', '预算控制', '风险防控', '数据分析', '流程优化', '成本管控']
      },
      {
        name: '张岩皓',
        role: '摄影&数据可视化&设计师&运营博主',
        bio: '会摄影，学艺术设计，做漂亮餐，专注于摄影、数据可视化设计和运营推广。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/designer/张岩皓.jpg',
        tags: ['摄影', '数据可视化', '艺术设计', '运营博主', '视觉传达', '内容创作']
      },
      {
        name: '郑绍恺',
        role: '算法竞赛选手',
        bio: '专注于算法研究以及最优化问题',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/郑绍恺.jpg',
        tags: ['算法研究', '最优化', '竞赛选手', '问题求解', '算法优化', '数学建模'],
        github: 'https://github.com/zhengshaokai'
      },
      {
        name: '杨鑫海',
        role: 'Developer',
        bio: '专注于Arduino和ESP32等开发板的代码例程开发。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/杨鑫海.jpg',
        tags: ['Arduino', 'ESP32', '代码例程', '嵌入式开发', '物联网', '开发板'],
        github: 'https://github.com/yangxinhai'
      },
      {
        name: '殷子豪',
        role: 'Developer&文艺工作者',
        bio: '运营宣传与文字编辑，负责团队内容创作和对外传播。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/殷子豪.jpg',
        tags: ['运营宣传', '文字编辑', '内容创作', '团队传播', '文案策划', '品牌建设'],
        github: 'https://github.com/yinzihao'
      },
      {
        name: '孙如婕',
        role: '灵巧手横向开发贡献者',
        bio: '专注于灵巧手的横向开发，为项目提供创新的技术解决方案和开发支持。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/contributer/孙如婕.jpg',
        tags: ['灵巧手开发', '横向开发', '技术创新', '开发支持', '项目贡献', '技术解决方案'],
        github: 'https://github.com/sunrujie'
      }
    ],
    sponsors: [
      {
        name: '开源之夏',
        role: 'Gold Sponsor - ¥12,000',
        bio: '中国科学院软件研究所、华为技术有限公司、中科南京软件技术研究院联合主办的开源活动。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/sponsor/开源之夏Logo.png',
        tags: ['开源软件', '供应链点亮', '学生项目', '技术孵化', '创新推动', '人才培养'],
        github: 'https://summer-ospp.ac.cn/'
      },
      {
        name: '立创开源硬件平台',
        role: 'Silver Sponsor - ¥8,000',
        bio: '专业的开源硬件开发平台，提供丰富的开发板和技术资源。',
        image: 'https://raw.githubusercontent.com/Darrenpig/Energy-Coder-Club-Website/main/src/image/sponsor/立创开源广场.png',
        tags: ['开源硬件', '开发板', '技术资源', '硬件开发', '创客平台', '技术支持'],
        github: 'https://oshwhub.com/explore'
      }
    ]
  },
  cta: {
    title: '准备好开始了吗？',
    description: '加入我们的社区，参与可持续技术项目',
    getStarted: '立即开始'
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
    description: '您寻找的页面不存在。',
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
    title: 'Future / 未来',
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
    rating: '评分',
    sortBy: '排序方式',
    sortOrder: '排序',
    sortByRating: '评分',
    sortByTitle: '标题',
    sortByDifficulty: '难度',
    sortByType: '类型',
    ascending: '升序',
    descending: '降序',
    totalResources: '共 {count} 个资源'
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
      address: '新北区辽河路666号，东一门，玉衡楼 A416',
      phone: '+86 158 9600 0818',
      email: '22230635@czu.cn',
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
      viewGithub: '查看Gitee'
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
    joinClub: '加入NEC仓库实验室',
    address: '江苏省常州市新北区辽河路666号常州工学院辽河路校区玉衡A416仓库实验室',
    copyright: '© 2025 新能源编程俱乐部。保留所有权利。'
  },
  displayRatio: {
    title: '显示比例调整器',
    description: '调整卡片显示比例，查看不同比例下的视觉效果',
    aspectRatioLabel: '显示比例',
    viewDetails: '查看详情',
    noMatchingContent: '没有找到匹配的内容',
    aspectRatios: {
      square: '正方形 (1:1)',
      video: '视频比例 (16:9)',
      traditional: '传统比例 (4:3)',
      portrait: '竖直比例 (3:4)',
      widescreen: '宽屏比例 (16:10)',
      ultrawide: '超宽比例 (21:9)'
    }
  }
};