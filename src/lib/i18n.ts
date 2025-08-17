export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    projects: string;
    events: string;
    resources: string;
    contact: string;
    login: string;
    logout: string;
    joinClub: string;
    dashboard: string;
  };
  
  // Hero Section
  hero: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    joinCommunity: string;
    viewGithub: string;
    codingWorkshops: string;
    codingWorkshopsDesc: string;
    innovationProjects: string;
    innovationProjectsDesc: string;
    industryConnections: string;
    industryConnectionsDesc: string;
  };
  
  // About Section
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    learnMore: string;
    projectOrigin: {
      title: string;
      content: string;
    };
    phase2: {
      title: string;
      description: string;
      content: string;
    };
    contributing: {
      title: string;
      description: string;
      howToContribute: string;
      steps: string[];
      codeOfConduct: string;
      reportIssues: string;
      submitPR: string;
    };
    license: {
      title: string;
      description: string;
      openSource: string;
      permissions: string[];
      limitations: string[];
      conditions: string[];
    };
  };
  
  // Features Section
  features: {
    title: string;
    subtitle: string;
    weeklyWorkshops: string;
    weeklyWorkshopsDesc: string;
    openSource: string;
    openSourceDesc: string;
    hackathons: string;
    hackathonsDesc: string;
    guestSpeakers: string;
    guestSpeakersDesc: string;
    networking: string;
    networkingDesc: string;
    conferences: string;
    conferencesDesc: string;
  };
  
  // Team Section
  team: {
    title: string;
    description: string;
    maintainerTitle: string;
    developerTitle: string;
    designerTitle: string;
    contributorTitle: string;
    sponsorTitle: string;
    maintainers: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
    developers: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
    designers: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
    contributors: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
    sponsors: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    getStarted: string;
  };
  
  // Join Page
  join: {
    title: string;
    subtitle: string;
    benefits: string;
    benefitsList: string[];
    requirements: string;
    requirementsList: string[];
    howToJoin: string;
    steps: string[];
    joinNow: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
  };
  
  // 404 Page
  notFound: {
    title: string;
    description: string;
    returnHome: string;
  };
  
  // Projects Page
  projects: {
    title: string;
    description: string;
    filterTitle: string;
    expandFilters: string;
    collapseFilters: string;
    filterAll: string;
    filterAI: string;
    filterIoT: string;
    filterEmbedded: string;
    filterRobotics: string;
    filterResearch: string;
    filterWeb: string;
    filterMobile: string;
    filterOther: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
    author: string;
    date: string;
  };
  
  // Events Page
  events: {
    title: string;
    description: string;
    filterTitle: string;
    expandFilters: string;
    collapseFilters: string;
    upcoming: string;
    past: string;
    noUpcoming: string;
    noPast: string;
    registerNow: string;
    learnMore: string;
    viewDetails: string;
    eventDate: string;
    location: string;
    participants: string;
    category: string;
    filterAll: string;
    filterWorkshop: string;
    filterHackathon: string;
    filterSeminar: string;
    filterCompetition: string;
    filterNetworking: string;
  };
  resources: {
    title: string;
    description: string;
    filterTitle: string;
    expandFilters: string;
    collapseFilters: string;
    searchPlaceholder: string;
    filterAll: string;
    filterTutorials: string;
    filterTools: string;
    filterBooks: string;
    filterCourses: string;
    filterDocumentation: string;
    noResults: string;
    viewResource: string;
    downloadResource: string;
    freeResource: string;
    paidResource: string;
    difficulty: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    category: string;
    author: string;
    rating: string;
  };
  contact: {
    title: string;
    description: string;
    getInTouch: string;
    contactInfo: string;
    followUs: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      sendMessage: string;
      sending: string;
      messageSent: string;
      messageError: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  dashboard: {
    title: string;
    welcome: string;
    memberSince: string;
    logout: string;
    myProjects: {
      title: string;
      description: string;
      noProjects: string;
      viewGithub: string;
    };
    upcomingEvents: {
      title: string;
      description: string;
      noEvents: string;
      viewAll: string;
    };
    myActivity: {
      title: string;
      description: string;
      contributions: string;
      eventsAttended: string;
      projectsCompleted: string;
    };
    quickActions: {
      title: string;
      submitProject: string;
      registerEvent: string;
      viewResources: string;
      contactUs: string;
    };
  };
  footer: {
    clubName: string;
    description: string;
    navigation: string;
    resources: string;
    contact: string;
    learningMaterials: string;
    joinClub: string;
    address: string;
    copyright: string;
  };
}

export const translations: Record<'en' | 'zh', Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      events: 'Events',
      resources: 'Resources',
      contact: 'Contact',
      login: 'Log in',
      logout: 'Log out',
      joinClub: 'Join Club',
      dashboard: 'Dashboard',
    },
    hero: {
      tagline: 'Where Code Meets Clean Energy',
      title: 'Coding for a',
      titleHighlight: 'Sustainable',
      description: 'Join a community of developers passionate about creating innovative software solutions for renewable energy, sustainability, and a greener tomorrow.',
      joinCommunity: 'Join Our Community',
      viewGithub: 'View on GitHub',
      codingWorkshops: 'Coding Workshops',
      codingWorkshopsDesc: 'Weekly sessions to learn sustainable tech development',
      innovationProjects: 'Innovation Projects',
      innovationProjectsDesc: 'Collaborate on open-source green energy solutions',
      industryConnections: 'Industry Connections',
      industryConnectionsDesc: 'Network with leading energy sector professionals',
    },
    about: {
      title: 'About Our Club',
      paragraph1: 'The New Energy Coder Club was founded in 2023 by a group of passionate developers and engineers who wanted to combine their love for coding with their commitment to sustainability and renewable energy.',
      paragraph2: 'Our mission is to build a community that develops open-source software solutions for renewable energy applications, smart grid technologies, energy efficiency, and sustainability.',
      paragraph3: 'Through workshops, hackathons, collaborative projects, and partnerships with energy companies, we aim to create a platform where technology meets sustainability for a better future.',
      learnMore: 'Learn More About Us',
      projectOrigin: {
        title: 'Project Origin Story',
        content: 'Project Source: A promise with @haolei, 2024 we have to do a good project! We hit it off right away, prepared the materials on the same day, and had the enrollment form ready by the end of the night. However, the reality is incredibly cruel, our one-two punch could not defeat our past selves, and the chemical design materials we made were handed in intact, and according to our teacher\'s words, we flopped... Thanks to Ms. Dai Orchid (the teacher who taught me my introduction to new energy science and engineering in my freshman year), we didn\'t give up under her encouragement, and after many contacts and discussions with our instructors and teammates, we decided to compete for the recommended place in the national competition directly --- to reach the top 15 in the school competition. Then, we just went all out. That 20 hours on May 12th, we never stopped. The light in the all-night laboratory seemed to never go out, and time crawled on the ground like ants. We persevered through the spirit, and it seemed like there was only me, a lamp, and a laptop in the world. After drawing all the diagrams and writing most of the content, dawn quietly drowned in the darkness before dawn...'
      },
      phase2: {
        title: 'Phase 2 Development',
        description: 'Future enhancements and expanded features coming soon',
        content: 'This page will be implemented in Phase 2 of the project. We are continuously working to enhance our platform with new features, improved user experience, and expanded functionality. Phase 2 will include advanced project management tools, enhanced collaboration features, integrated development environments, and comprehensive learning resources. Stay tuned for exciting updates as we continue to build and improve our community platform.'
      },
      contributing: {
        title: 'Contributing Guidelines',
        description: 'We welcome contributions from developers of all skill levels who share our passion for sustainable technology.',
        howToContribute: 'How to Contribute',
        steps: [
          'Fork the repository and create a new branch for your feature',
          'Follow our coding standards and best practices',
          'Write comprehensive tests for your code',
          'Submit a pull request with a clear description',
          'Participate in code review discussions'
        ],
        codeOfConduct: 'Please follow our Code of Conduct to maintain a welcoming environment for all contributors.',
        reportIssues: 'Report bugs and suggest features through our issue tracker.',
        submitPR: 'Submit pull requests following our contribution workflow.'
      },
      license: {
        title: 'Open Source License',
        description: 'Our projects are released under open source licenses to promote collaboration and innovation.',
        openSource: 'We believe in the power of open source to drive sustainable technology forward.',
        permissions: [
          'Commercial use',
          'Modification',
          'Distribution',
          'Private use'
        ],
        limitations: [
          'Liability',
          'Warranty'
        ],
        conditions: [
          'License and copyright notice',
          'State changes',
          'Disclose source'
        ]
      }
    },
    features: {
      title: 'Why Join Our Community?',
      subtitle: 'Discover the benefits of being part of our sustainable coding community',
      weeklyWorkshops: 'Weekly Coding Workshops',
      weeklyWorkshopsDesc: 'Hands-on sessions covering sustainable tech development and green coding practices',
      openSource: 'Open Source Projects',
      openSourceDesc: 'Collaborate on real-world projects that make a positive environmental impact',
      hackathons: 'Green Tech Hackathons',
      hackathonsDesc: 'Participate in exciting competitions focused on solving environmental challenges',
      guestSpeakers: 'Industry Guest Speakers',
      guestSpeakersDesc: 'Learn from experts in renewable energy and sustainable technology sectors',
      networking: 'Professional Networking',
      networkingDesc: 'Connect with like-minded developers and industry professionals',
      conferences: 'Tech Conferences',
      conferencesDesc: 'Attend exclusive events and conferences on sustainable technology trends',
    },
    team: {
      title: 'Meet Our Team',
      description: 'The passionate individuals driving our mission forward',
      maintainerTitle: 'Maintainer',
      developerTitle: 'Developer',
      designerTitle: 'Designer',
      contributorTitle: 'Contributor',
      sponsorTitle: 'Sponsor',
      maintainers: [
        {
          name: 'DarrenPig',
          role: 'Club Founder & BSP 嵌软工程师',
          bio: 'Renewable energy researcher with a focus on AI applications for energy optimization.',
          image: 'src/image/maintainer/DarrenPig.jpeg'
        },
        {
          name: '殷统创',
          role: 'Club Founder & BSP Expert',
          bio: '专注于AI在能源优化应用的可再生能源研究员。',
          image: 'src/image/maintainer/殷统创.png'
        },
        {
          name: '许珑译',
          role: '机器人算法工程师',
          bio: '专注于机器人算法研发部署以及业务逻辑设计。',
          image: 'src/image/maintainer/许珑译.jpg'
        }
      ],
      developers: [
        {
          name: '刘英琪',
          role: '前端开发工程师',
          bio: '专注于现代前端技术栈，致力于构建高性能的用户界面。',
          image: 'src/image/developer/刘英琪.png'
        },
        {
          name: '单广志',
          role: '后端开发工程师',
          bio: '专注于服务端架构设计和API开发，为项目提供稳定的后端支持。',
          image: 'src/image/developer/单广志.png'
        },
        {
          name: '周志',
          role: '全栈开发工程师',
          bio: '具备前后端开发能力，致力于端到端的解决方案开发。',
          image: 'src/image/developer/周志.png'
        },
        {
          name: '李硕',
          role: '系统架构师',
          bio: '专注于系统架构设计和技术选型，为项目提供技术指导。',
          image: 'src/image/developer/李硕.png'
        },
        {
          name: '牛良旭',
          role: 'DevOps工程师',
          bio: '负责项目的持续集成和部署，保障开发流程的高效运行。',
          image: 'src/image/developer/牛良旭.png'
        },
        {
          name: '郑钦文',
          role: '移动端开发工程师',
          bio: '专注于移动应用开发，为用户提供优质的移动端体验。',
          image: 'src/image/developer/郑钦文.jpg'
        }
      ],
      designers: [
        {
          name: 'Xiux',
          role: 'UI/UX设计师',
          bio: '专注于用户体验设计和界面优化，为可持续技术产品创造美观易用的界面。',
          image: 'src/image/designer/xiux.jpg'
        },
        {
          name: '张若璐',
          role: '视觉设计师',
          bio: '专注于品牌视觉设计和图形创意，为项目提供专业的视觉解决方案。',
          image: 'src/image/designer/张若璐.jpg'
        },
        {
          name: '徐海婷',
          role: '交互设计师',
          bio: '专注于交互设计和用户研究，致力于提升产品的用户体验。',
          image: 'src/image/designer/徐海婷.jpg'
        },
        {
          name: '李一楠',
          role: '产品设计师',
          bio: '负责产品设计和用户体验优化，推动设计与技术的完美结合。',
          image: 'src/image/designer/李一楠.jpg'
        },
        {
          name: '李想',
          role: 'UX设计师',
          bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
          image: 'src/image/designer/李想.jpg'
        }
      ],
      contributors: [
        {
          name: '卢永杰',
          role: '开源贡献者',
          bio: '积极参与开源项目，为社区贡献代码和文档。',
          image: 'src/image/contributer/卢永杰.jpg'
        },
        {
          name: '卢王淳',
          role: '赛期管理',
          bio: '24新能源班，负责比赛期间的管理和协调工作。',
          image: 'src/image/contributer/卢王淳.png'
        },
        {
          name: '崔正阳',
          role: '测试工程师',
          bio: '专注于软件质量保证，确保项目的稳定性和可靠性。',
          image: 'src/image/contributer/崔正阳.png'
        },
        {
          name: '张旺旺',
          role: '运维工程师',
          bio: '负责项目的部署和运维工作，保障系统的稳定运行。',
          image: 'src/image/contributer/张旺旺.jpg'
        },
        {
          name: '许子涵',
          role: '产品经理',
          bio: '负责产品规划和需求分析，推动项目向正确方向发展。',
          image: 'src/image/contributer/许子涵 2.png'
        }
      ],
      sponsors: [
        {
          name: 'Green Tech Foundation',
          role: 'Gold Sponsor',
          bio: 'Non-profit organization dedicated to supporting sustainable technology development.',
          image: 'src/image/sponsor/杨立涛.png'
        }
      ]
    },
    cta: {
      title: 'Ready to Make a Difference?',
      description: 'Join our community today and start building the sustainable future with code.',
      getStarted: 'Get Started Now',
    },
    join: {
      title: 'Join the New Energy Coder Club',
      subtitle: 'Become part of a community that\'s coding for a sustainable future',
      benefits: 'Member Benefits',
      benefitsList: [
        'Access to exclusive workshops and training sessions',
        'Collaboration opportunities on real-world projects',
        'Networking with industry professionals',
        'Career development and mentorship programs',
        'Priority access to events and conferences',
      ],
      requirements: 'Requirements',
      requirementsList: [
        'Basic programming knowledge in any language',
        'Passion for sustainability and clean energy',
        'Commitment to collaborative learning',
        'Willingness to contribute to open-source projects',
      ],
      howToJoin: 'How to Join',
      steps: [
        'Fill out the membership application form',
        'Attend an orientation session',
        'Complete a small coding challenge',
        'Get matched with a mentor',
        'Start contributing to projects!',
      ],
      joinNow: 'Join Now',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    },
    notFound: {
      title: '404',
      description: 'Page not found',
      returnHome: 'Return Home',
    },
    projects: {
      title: 'Member Projects',
      description: 'Explore innovative projects created by our talented club members',
      filterTitle: 'Project Filters',
      expandFilters: 'Expand Filters',
      collapseFilters: 'Collapse Filters',
      filterAll: 'All Projects',
      filterAI: 'AI/ML',
      filterIoT: 'IoT',
      filterEmbedded: 'Embedded Systems',
      filterRobotics: 'Robotics',
      filterResearch: 'Research Projects',
      filterWeb: 'Web Development',
      filterMobile: 'Mobile Apps',
      filterOther: 'Other',
      viewProject: 'View Project',
      viewCode: 'View Code',
      technologies: 'Technologies',
      author: 'Author',
      date: 'Date'
    },
    events: {
      title: 'Events & Activities',
      description: 'Join our exciting events, workshops, and competitions designed to enhance your coding skills and connect with fellow developers.',
      filterTitle: 'Event Filters',
      expandFilters: 'Show Filters',
      collapseFilters: 'Hide Filters',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noUpcoming: 'No upcoming events at the moment.',
      noPast: 'No past events to display.',
      registerNow: 'Register Now',
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      eventDate: 'Event Date',
      location: 'Location',
      participants: 'Participants',
      category: 'Category',
      filterAll: 'All Events',
      filterWorkshop: 'Workshops',
      filterHackathon: 'Hackathons',
      filterSeminar: 'Seminars',
      filterCompetition: 'Competitions',
      filterNetworking: 'Networking'
   },
   resources: {
     title: 'Learning Resources',
     description: 'Discover curated learning materials, tools, and resources to enhance your coding skills and stay updated with the latest technologies.',
     filterTitle: 'Resource Filters',
     expandFilters: 'Show Filters',
     collapseFilters: 'Hide Filters',
     searchPlaceholder: 'Search resources...',
     filterAll: 'All Resources',
     filterTutorials: 'Tutorials',
     filterTools: 'Tools',
     filterBooks: 'Books',
     filterCourses: 'Courses',
     filterDocumentation: 'Documentation',
     noResults: 'No resources found matching your criteria.',
     viewResource: 'View Resource',
     downloadResource: 'Download',
     freeResource: 'Free',
     paidResource: 'Paid',
     difficulty: 'Difficulty',
     beginner: 'Beginner',
     intermediate: 'Intermediate',
     advanced: 'Advanced',
     category: 'Category',
     author: 'Author',
     rating: 'Rating'
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with us for any questions, suggestions, or collaboration opportunities. We\'d love to hear from you!',
      getInTouch: 'Get in Touch',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your.email@example.com',
        subjectPlaceholder: 'What is this about?',
        messagePlaceholder: 'Tell us more about your inquiry...',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        messageSent: 'Message sent successfully!',
        messageError: 'Failed to send message. Please try again.'
      },
      info: {
        address: 'University Campus, Building A, Room 201',
        phone: '+1 (555) 123-4567',
        email: 'contact@energycoderclub.edu',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
      }
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      memberSince: 'Member since',
      logout: 'Logout',
      myProjects: {
        title: 'My Projects',
        description: 'Your recent coding projects and contributions',
        noProjects: 'No projects yet. Start by creating your first project!',
        viewGithub: 'View on GitHub'
      },
      upcomingEvents: {
        title: 'Upcoming Events',
        description: 'Events you\'re registered for',
        noEvents: 'No upcoming events. Check out our events page!',
        viewAll: 'View All Events'
      },
      myActivity: {
        title: 'My Activity',
        description: 'Your club participation summary',
        contributions: 'Contributions',
        eventsAttended: 'Events Attended',
        projectsCompleted: 'Projects Completed'
      },
      quickActions: {
        title: 'Quick Actions',
        submitProject: 'Submit Project',
        registerEvent: 'Register for Event',
        viewResources: 'Browse Resources',
        contactUs: 'Contact Support'
       }
     },
    footer: {
      clubName: 'New Energy Coder Club',
      description: 'Empowering the next generation of coders to build sustainable energy solutions',
      navigation: 'Navigation',
      resources: 'Resources',
      contact: 'Contact',
      learningMaterials: 'Learning Materials',
      joinClub: 'Join Club',
      address: 'Changzhou Institute of Technology, No.666 Liaohe Road, Changzhou, Jiangsu Province, P.R.China',
      copyright: 'New Energy Coder Club. All rights reserved.'
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      projects: '项目',
      events: '活动',
      resources: '资源',
      contact: '联系我们',
      login: '登录',
      logout: '退出登录',
      joinClub: '加入俱乐部',
      dashboard: '仪表板',
    },
    hero: {
      tagline: '代码与清洁能源的完美结合',
      title: '为',
      titleHighlight: '可持续',
      description: '加入一个充满激情的开发者社区，致力于为可再生能源、可持续发展和更绿色的未来创造创新的软件解决方案。',
      joinCommunity: '加入我们的社区',
      viewGithub: '查看 GitHub',
      codingWorkshops: '编程工作坊',
      codingWorkshopsDesc: '每周学习可持续技术开发的课程',
      innovationProjects: '创新项目',
      innovationProjectsDesc: '协作开发开源绿色能源解决方案',
      industryConnections: '行业联系',
      industryConnectionsDesc: '与领先的能源行业专业人士建立联系',
    },
    about: {
      title: '关于我们的俱乐部',
      paragraph1: '新能源编程俱乐部成立于2023年，由一群热衷于编程并致力于可持续发展和可再生能源的开发者和工程师创立。',
      paragraph2: '我们的使命是建立一个社区，开发用于可再生能源应用、智能电网技术、能源效率和可持续发展的开源软件解决方案。',
      paragraph3: '通过工作坊、黑客马拉松、协作项目以及与能源公司的合作伙伴关系，我们致力于创建一个技术与可持续发展相结合的平台，为更美好的未来而努力。',
      learnMore: '了解更多关于我们',
      projectOrigin: {
        title: '项目来源故事',
        content: '项目来源：一次与 @郝磊 的约定，2024 我们要做好一个项目。我们一拍即合，当天准备材料，当晚前准备好了报名表。然而现实是无比残酷的，我们的一拍即合，并不能打败我们过去的自己，做的化工设计材料我们原封不动的交了上去，按老师的话来讲，扑街……非常感谢代兰花老师（大一时曾教过我我入门新能源科学与工程概论的老师），在她的鼓励下，我们并没有放弃，经过多方的联系，与指导老师、队友们的讨论，我们决定直接争抢国赛推荐名额————达到校赛前15名。然后，我们就玩命去做。那5月12日的20个小时，我们未曾停歇。灯光，在通宵的实验室里似乎永远不会熄灭，时间如同蚂蚁一般在地上艰难爬行。强撑着精神，似乎世界上就只有我一个人，一盏灯，一个笔记本电脑了。画好所有的图，写好了大部分的内容，夜幕悄悄的淹没在黎明之前……'
      },
      phase2: {
        title: '第二阶段开发',
        description: '即将推出的未来增强功能和扩展特性',
        content: '此页面将在项目的第二阶段实施。我们正在持续努力，通过新功能、改进的用户体验和扩展的功能来增强我们的平台。第二阶段将包括高级项目管理工具、增强的协作功能、集成开发环境和全面的学习资源。请继续关注我们在构建和改进社区平台过程中的精彩更新。'
      },
      contributing: {
        title: '贡献指南',
        description: '我们欢迎所有技能水平的开发者为我们的可持续技术项目做出贡献。',
        howToContribute: '如何贡献',
        steps: [
          'Fork 仓库并为您的功能创建新分支',
          '遵循我们的编码标准和最佳实践',
          '为您的代码编写全面的测试',
          '提交带有清晰描述的拉取请求',
          '参与代码审查讨论'
        ],
        codeOfConduct: '请遵循我们的行为准则，为所有贡献者维护一个友好的环境。',
        reportIssues: '通过我们的问题跟踪器报告错误和建议功能。',
        submitPR: '按照我们的贡献工作流程提交拉取请求。'
      },
      license: {
        title: '开源许可证',
        description: '我们的项目采用开源许可证发布，以促进协作和创新。',
        openSource: '我们相信开源的力量能够推动可持续技术的发展。',
        permissions: [
          '商业使用',
          '修改',
          '分发',
          '私人使用'
        ],
        limitations: [
          '责任',
          '保修'
        ],
        conditions: [
          '许可证和版权声明',
          '声明更改',
          '公开源代码'
        ]
      }
    },
    features: {
      title: '为什么加入我们的社区？',
      subtitle: '发现成为我们可持续编程社区一员的好处',
      weeklyWorkshops: '每周编程工作坊',
      weeklyWorkshopsDesc: '涵盖可持续技术开发和绿色编程实践的实践课程',
      openSource: '开源项目',
      openSourceDesc: '协作开发对环境产生积极影响的真实世界项目',
      hackathons: '绿色科技黑客马拉松',
      hackathonsDesc: '参与专注于解决环境挑战的激动人心的竞赛',
      guestSpeakers: '行业嘉宾演讲',
      guestSpeakersDesc: '向可再生能源和可持续技术领域的专家学习',
      networking: '专业网络',
      networkingDesc: '与志同道合的开发者和行业专业人士建立联系',
      conferences: '技术会议',
      conferencesDesc: '参加关于可持续技术趋势的独家活动和会议',
    },
    team: {
      title: '认识我们的团队',
      description: '推动我们使命前进的充满激情的团队成员',
      maintainerTitle: 'Maintainer',
      developerTitle: 'Developer', 
      designerTitle: 'Designer',
      contributorTitle: 'Contributor',
      sponsorTitle: 'Sponsor',
      maintainers: [
        {
          name: '殷统创',
          role: 'Club Founder & BSP Expert',
          bio: '专注于AI在能源优化应用的可再生能源工程师。',
          image: 'src/image/maintainer/殷统创.png'
        },
        {
          name: 'DarrenPig',
          role: '嵌入式 BSP 工程师 & AGL 智驾开发者',
          bio: '专注于openEuler 和 RT-Thread 国产操作系统开源开发。',
          image: 'src/image/maintainer/DarrenPig.jpeg'
        },
        {
          name: '许珑译',
          role: '机器人算法工程师',
          bio: '专注于机器人算法研发部署以及业务逻辑设计。',
          image: 'src/image/maintainer/许珑译.jpg'
        }
      ],
      developers: [
        {
          name: '刘英琪',
          role: '机器人端边开发工程师',
          bio: '专注于端边架构设计和API开发，为项目提供稳定的裸机支持。',
          image: 'src/image/developer/刘英琪.png'
        },
        {
          name: '单广志',
          role: '嵌入式硬件开发工程师',
          bio: '机器人行业电控驱动开发以及硬件电路设计。',
          image: 'src/image/developer/单广志.png'
        },
        {
          name: '周志',
          role: '全栈机械工程师',
          bio: '具备前后端机械开发能力，致力于端到端的解决方案开发。',
          image: 'src/image/developer/周志.png'
        },
        {
          name: '李硕',
          role: '硬件架构师&嵌入式硬件开发',
          bio: '专注于系统架构设计和技术选型，为项目提供技术指导。',
          image: 'src/image/developer/李硕.png'
        },
        {
          name: '牛良旭',
          role: 'DevOps电源管理工程师',
          bio: '负责项目的持续集成和部署，保障开发流程的高效运行。',
          image: 'src/image/developer/牛良旭.png'
        },
        {
          name: '郑钦文',
          role: '机电开发工程师',
          bio: '专注于机电系统开发，为项目提供专业的机电解决方案。',
          image: 'src/image/developer/郑钦文.jpg'
        }
      ],
      designers: [
        {
          name: 'Xiux',
          role: '仓库团队需求分析',
          bio: '专注于用户体验设计和界面优化，为可持续技术产品创造美观易用的界面。',
          image: 'src/image/designer/xiux.jpg'
        },
        {
          name: '张若璐',
          role: '视觉设计师&财务分析',
          bio: '专注于品牌视觉设计和图形创意，为项目提供专业的视觉解决方案。',
          image: 'src/image/designer/张若璐.jpg'
        },
        {
          name: '徐海婷',
          role: '交互设计师',
          bio: '专注于交互设计和用户研究，致力于提升产品的用户体验。',
          image: 'src/image/designer/徐海婷.jpg'
        },
        {
          name: '李一楠',
          role: '运营组长&产品设计师',
          bio: '负责宣传触点设计和主持开发者会议，推动设计与技术的完美结合。',
          image: 'src/image/designer/李一楠.jpg'
        },
        {
          name: '李想',
          role: 'UX设计师',
          bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
          image: 'src/image/designer/李想.jpg'
        }
      ],
      contributors: [
        {
          name: '卢永杰',
          role: '机器人运控算法工程师',
          bio: '专注算法部署优化及硬件底层逻辑协同设计。',
          image: 'src/image/contributer/卢永杰.jpg'
        },
        {
          name: '卢王淳',
          role: '赛期管理',
          bio: '24新能源班，负责比赛期间的 R1 管理和协调工作。',
          image: 'src/image/contributer/卢王淳.png'
        },
        {
          name: '崔正阳',
          role: '测试工程师',
          bio: '专注于软件质量保证，确保项目的稳定性和可靠性。',
          image: 'src/image/contributer/崔正阳.png'
        },
        {
          name: '张旺旺',
          role: '系统运维工程师',
          bio: '负责项目的部署和高转电机和控制系统运维工作，保障系统的稳定运行。',
          image: 'src/image/contributer/张旺旺.jpg'
        },
        {
          name: '许子涵',
          role: '产品经理 PM',
          bio: '负责产品规划和需求分析，推动 R2 项目向正确方向发展。',
          image: 'src/image/contributer/许子涵 2.png'
        }
      ],
      sponsors: [
        {
          name: '开发原子基金会',
          role: '金牌赞助商',
          bio: '致力于支持可持续技术发展的非营利组织。',
          image: 'src/assets/openatom-logo.svg'
        },
        {
          name: '中国科学院计算技术研究所',
          role: '银牌赞助商',
          bio: '中国科学院计算技术研究所是中国科学院的一个研究机构，专注于计算技术的研究和应用。',
          image: 'src/assets/ict-cas-logo.svg'
        },
        {
          name: 'openEuler社区',
          role: '铜牌赞助商',
          bio: 'openEuler是一个开源的Linux发行版，专注于国产操作系统。',
          image: 'src/assets/openeuler-logo.svg'
        },
        {
          name: '嘉立创开源社区',
          role: '铜牌赞助商',
          bio: '国内顶尖的硬件社区，专注于硬件开源项目。',
          image: 'src/assets/jlc-logo.svg'
        },
        {
          name: '闻志伟',
          role: '个人赞助商',
          bio: '为项目提供资金支持，助力团队发展和技术创新。',
          image: 'src/image/sponsor/闻志伟.png'
        }
      ]
    },
    cta: {
      title: '准备好做出改变了吗？',
      description: '今天就加入我们的社区，开始用代码构建可持续的未来。',
      getStarted: '立即开始',
    },
    join: {
      title: '加入新能源编程俱乐部',
      subtitle: '成为为可持续未来编程的社区的一员',
      benefits: '会员福利',
      benefitsList: [
        '参加独家工作坊和培训课程',
        '参与真实世界项目的协作机会',
        '与行业专业人士建立网络',
        '职业发展和导师计划',
        '优先参加活动和会议',
      ],
      requirements: '要求',
      requirementsList: [
        '任何编程语言的基础知识',
        '对可持续发展和清洁能源的热情',
        '致力于协作学习',
        '愿意为开源项目做出贡献',
      ],
      howToJoin: '如何加入',
      steps: [
        '填写会员申请表',
        '参加迎新会议',
        '完成一个小的编程挑战',
        '匹配导师',
        '开始为项目做贡献！',
      ],
      joinNow: '立即加入',
    },
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      back: '返回',
      next: '下一步',
      previous: '上一步',
    },
    notFound: {
      title: '404',
      description: '页面未找到',
      returnHome: '返回首页',
    },
    projects: {
      title: '会员项目',
      description: '探索我们才华横溢的俱乐部成员创建的创新项目',
      filterTitle: '项目筛选',
      expandFilters: '展开筛选器',
      collapseFilters: '收起筛选器',
      filterAll: '所有项目',
      filterAI: 'AI/ML',
      filterIoT: '物联网',
      filterEmbedded: '嵌入式系统',
      filterRobotics: '机器人技术',
      filterResearch: '科研项目',
      filterWeb: 'Web开发',
      filterMobile: '移动应用',
      filterOther: '其他',
      viewProject: '查看项目',
      viewCode: '查看代码',
      technologies: '技术栈',
      author: '作者',
      date: '日期'
    },
    events: {
      title: '活动与赛事',
      description: '参加我们精彩的活动、工作坊和竞赛，提升您的编程技能并与其他开发者建立联系。',
      filterTitle: '活动筛选',
      expandFilters: '展开筛选',
      collapseFilters: '收起筛选',
      upcoming: '即将举行的活动',
      past: '往期活动',
      noUpcoming: '目前没有即将举行的活动。',
      noPast: '没有往期活动可显示。',
      registerNow: '立即报名',
      learnMore: '了解更多',
      viewDetails: '查看详情',
      eventDate: '活动日期',
      location: '地点',
      participants: '参与者',
      category: '类别',
      filterAll: '所有活动',
      filterWorkshop: '工作坊',
      filterHackathon: '黑客马拉松',
      filterSeminar: '研讨会',
      filterCompetition: '竞赛',
      filterNetworking: '交流活动'
   },
   resources: {
     title: '学习资源',
     description: '发现精选的学习材料、工具和资源，提升您的编程技能并了解最新技术动态。',
     filterTitle: '资源筛选',
     expandFilters: '展开筛选',
     collapseFilters: '收起筛选',
     searchPlaceholder: '搜索资源...',
     filterAll: '所有资源',
     filterTutorials: '教程',
     filterTools: '工具',
     filterBooks: '书籍',
     filterCourses: '课程',
     filterDocumentation: '文档',
     noResults: '未找到符合条件的资源。',
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
      description: '如有任何问题、建议或合作机会，请与我们联系。我们很乐意听到您的声音！',
      getInTouch: '联系我们',
      contactInfo: '联系信息',
      followUs: '关注我们',
      form: {
        name: '姓名',
        email: '邮箱',
        subject: '主题',
        message: '消息',
        namePlaceholder: '您的全名',
        emailPlaceholder: 'your.email@example.com',
        subjectPlaceholder: '这是关于什么的？',
        messagePlaceholder: '告诉我们更多关于您的询问...',
        sendMessage: '发送消息',
        sending: '发送中...',
        messageSent: '消息发送成功！',
        messageError: '发送消息失败，请重试。'
      },
      info: {
        address: '江苏省常州市新北区辽河路666号常州工学院，玉衡楼A栋 ，416仓库实验室',
        phone: '+86 15896000818',
        email: 'contact@energycoderclub.edu',
        hours: '周一至周五：上午9:00 - 下午6:00'
      }
    },
    dashboard: {
      title: '仪表板',
      welcome: '欢迎回来',
      memberSince: '会员自',
      logout: '退出登录',
      myProjects: {
        title: '我的项目',
        description: '您最近的编程项目和贡献',
        noProjects: '还没有项目。开始创建您的第一个项目吧！',
        viewGithub: '在GitHub上查看'
      },
      upcomingEvents: {
        title: '即将举行的活动',
        description: '您已报名的活动',
        noEvents: '没有即将举行的活动。查看我们的活动页面！',
        viewAll: '查看所有活动'
      },
      myActivity: {
        title: '我的活动',
        description: '您的俱乐部参与总结',
        contributions: '贡献',
        eventsAttended: '参加的活动',
        projectsCompleted: '完成的项目'
      },
      quickActions: {
        title: '快速操作',
        submitProject: '提交项目',
        registerEvent: '报名活动',
        viewResources: '浏览资源',
        contactUs: '联系支持'
      }
    },
    footer: {
      clubName: '新能源编程俱乐部',
      description: '赋能下一代程序员构建可持续能源解决方案',
      navigation: '导航',
      resources: '资源',
      contact: '联系我们',
      learningMaterials: '学习资料',
      joinClub: '加入俱乐部',
      address: '江苏省常州市新北区辽河路666号常州工学院，玉衡楼A栋，416仓库实验室（213032）',
      copyright: '新能源编程俱乐部。保留所有权利。'
    }
   }
 };

export type Language = 'en' | 'zh';

export const defaultLanguage: Language = 'en';