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
    filterAll: string;
    filterWeb: string;
    filterMobile: string;
    filterAI: string;
    filterIoT: string;
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
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: '殷统创',
          role: 'Club Founder & BSP Expert',
          bio: '专注于AI在能源优化应用的可再生能源研究员。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: '许珑译',
          role: '机器人算法工程师',
          bio: '专注于机器人算法研发部署以及业务逻辑设计。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        }
      ],
      developers: [
        {
          name: 'Li Ming',
          role: 'Technical Lead & Full-stack Developer',
          bio: 'Passionate about creating software solutions for smart grid technologies and energy efficiency.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: 'Sarah Johnson',
          role: 'Education Coordinator',
          bio: 'Former teacher bringing technical education to sustainability enthusiasts and new coders.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        }
      ],
      designers: [
        {
          name: 'Alex Zhang',
          role: 'UI/UX Designer',
          bio: 'Experience in designing user-friendly interfaces for renewable energy applications.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: '李想',
          role: 'UX设计师',
          bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        }
      ],
      contributors: [
        {
          name: 'Xiux',
          role: 'Open Source Contributor',
          bio: 'Active contributor to open source projects and community documentation.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: 'Michael Chen',
          role: 'Documentation Maintainer',
          bio: 'Responsible for maintaining project documentation and helping new members.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        }
      ],
      sponsors: [
        {
          name: 'Green Tech Foundation',
          role: 'Gold Sponsor',
          bio: 'Non-profit organization dedicated to supporting sustainable technology development.',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
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
      filterAll: 'All Projects',
      filterWeb: 'Web Development',
      filterMobile: 'Mobile Apps',
      filterAI: 'AI/ML',
      filterIoT: 'IoT',
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
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E6%AE%B7%E7%BB%9F%E5%88%9B.png?raw=true'
        },
        {
          name: 'DarrenPig',
          role: '嵌入式 BSP 工程师 & AGL 智驾开发者',
          bio: '专注于openEuler 和 RT-Thread 国产操作系统开源开发。',
          image: 'https://darrenpig.github.io/files/photo/DarrenPig_Pho5to.jpg?raw=true'
        },
        {
          name: '许珑译',
          role: '机器人算法工程师',
          bio: '专注于机器人算法研发部署以及业务逻辑设计。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E8%AE%B8%E7%8F%91%E8%AF%91.jpg?raw=true'
        }
      ],
      developers: [
        {
          name: '闻志伟',
          role: '技术顾问 & 全栈开发者',
          bio: '热衷于为智能电网技术和能源效率创建软件解决方案。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: 'Xiux',
          role: '技术项管 & 仓库PM',
          bio: '前研发工程师，为ROBOCON2024和2025-R2带来技术管理。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/xiux.jpg?raw=true'
        },
        {
          name: '卢王淳',
          role: '技术项管 & 仓库PM',
          bio: '工程师，为ROBOCON2025和R1机器人项目基线带来技术管理。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/xiux.jpg?raw=true'
        }
      ],
      designers: [
        {
          name: '张若璐',
          role: 'UI/UX设计师',
          bio: '专注于用户体验设计和界面优化，为可持续技术产品创造美观易用的界面。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E5%BC%A0%E8%8B%A5%E7%92%90.jpg?raw=true'
        },
        {
          name: '李想',
          role: 'UX设计师',
          bio: '一直在探索技术与设计边界的路上，以用户为中心，以体验为驱动。',
          image: 'https://github.com/Darrenpig/Darrenpig/blob/main/image/%E6%9D%8E%E6%83%B3.jpg?raw=true'
        }
      ],
      contributors: [
        {
          name: '单广志',
          role: '开源贡献者',
          bio: '积极参与开源项目，为社区贡献代码和文档。',
          image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Logo.png?raw=true'
        },
        {
          name: '李一楠',
          role: '运营文档维护者',
          bio: '负责项目文档的编写和维护，帮助新成员快速上手。',
          image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/shared/images/Image/Logo.png?raw=true'
        }
      ],
      sponsors: [
        {
          name: '开发原子基金会',
          role: '金牌赞助商',
          bio: '致力于支持可持续技术发展的非营利组织。',
          //image: 'https://res.oafimg.cn/openatom-www/home/assets/logo-with-title-white-Cehlgp_O.svg/?raw=true'
        },
        {
          name: '中国科学院计算技术研究所',
          role: '银牌赞助商',
          bio: '中国科学院计算技术研究所是中国科学院的一个研究机构，专注于计算技术的研究和应用。',
          //image: 'https://www.ict.ac.cn/images/header_ict.png？raw=true'
        },
        {
          name: 'openEuler社区',
          role: '铜牌赞助商',
          bio: 'openEuler是一个开源的Linux发行版，专注于国产操作系统。',
          //image: 'https://www.openeuler.org/assets/logo.XeUCiAZu.svg?raw=true'
        },
        {
          name: '嘉立创开源社区',
          role: '铜牌赞助商',
          bio: '国内顶尖的硬件社区，专注于硬件开源项目。',
          //image: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="icon-logo_svg__\u56FE\u5C42_1" x="0" y="0" viewBox="0 0 1226 306" fill="#fff" alt="立创开源硬件平台"><style>.icon-logo_svg__st0{fill:#fff}</style><path d="M415.3 277.4v10.7h-66.8v-10.7h35.8c3.4-8.6 6.9-20.9 8.5-31l11.9 2.4c-2.5 10.2-5.9 20.6-9 28.6zm-3.2-32.3h-60.3v-10.7h25.6c-.6-3.3-2.1-7.8-3.3-11.2l10.6-2.6c1.5 3.7 3.1 8.5 4 11.7l-7.5 2.1H412v10.7zm-46.2 31.3c-.8-7.5-3.3-19-5.6-27.7l10.6-2.6c2.6 8.8 5.1 19.8 6.3 27.3zM492.7 280.5c2.7 0 3.3-1.4 3.7-8.6 2.2 1.6 6.2 3.2 9 3.8-1.1 10.4-3.8 13.6-11.8 13.6H483c-9.4 0-12.3-2.7-12.3-12.3v-24l-1.1.8c-1.6-2.2-5.2-6.2-7.4-7.9 8.6-5.6 16.2-15.2 20-24.4l9.6 3c-.4 1-.9 2-1.4 3 5.1 5.6 11.4 12.4 14.5 17.3v-14.9H515v41.8h-10v-26l-4.6 4.4-.1 1.2c-.4 11.8-1.2 17.3-2.9 19.4-1.5 1.8-3.3 2.5-5.3 2.8-1.9.3-4.8.4-8.1.3-.1-2.7-1.2-6.4-2.5-8.8 2.2.3 4.1.3 5.2.3.9 0 1.5-.1 2.1-.8s.9-2.9 1.3-7.7h-9.2v19.9c0 3.2.5 3.6 3.6 3.6h8.2zm2-32.5c-2.6-3.6-5.9-7.8-9.1-11.6-2.7 4.3-5.8 8.2-9.2 11.6zm34.4-24.7v55.6c0 5.7-1.1 8.3-4.5 9.9s-8.5 1.9-15.3 1.9c-.4-2.9-2-7.4-3.5-10.2 4.3.2 9.3.2 10.8.2 1.4-.1 2-.5 2-1.9v-55.5zM646.7 261.8h-14.2v28.9h-11.1v-28.9h-15.2c-1.4 10.7-5.7 21.5-17.9 29.2-1.9-2.4-5.9-6.2-8.6-7.9 9.8-5.9 13.7-13.5 15.3-21.3h-14.9v-10.1H596v-16.1h-13.6v-9.9h62.2v9.9h-12.2v16.1h14.2v10.1zm-25.3-10.1v-16.1h-14.5v16.1zM706.1 256.6c-2.5-2-8-5.1-11.6-7.3l6-7.6c3.5 1.7 9 4.6 11.9 6.4zm7.3 9.8c-2.6 7.9-5.6 16-8.7 23.4l-9.6-5.6c2.8-5.7 6.7-14.8 9.7-23.5zm-3.8-29.1c-2.5-2-8.1-5.3-11.7-7.5l6.1-7.5c3.5 1.8 9.2 4.8 12 6.7zm39.3 29.8V281c0 4.3-.6 6.7-3.5 8.1-2.8 1.4-6.3 1.5-10.6 1.5-.3-2.3-1.2-5.4-2.1-7.8-.9 1.6-1.8 3-2.6 4.3-2-1.5-5.9-3.8-8.2-5 2.5-3.3 5.2-8.4 6.8-12.8l9.3 2.7c-1.2 3.1-3 6.6-4.7 9.6 1.9.1 3.9.1 4.6.1.8 0 1.1-.2 1.1-.9v-13.6h-10.6v-27h9c.6-1.7 1.2-3.5 1.5-5h-12.1V246c0 13.1-1.4 32.9-10.1 45-1.9-1.7-6.4-4.5-8.9-5.6 8.1-11.1 8.8-27.7 8.8-39.4v-20.2h46.1v9.4H745l5.9 1c-.9 1.4-1.8 2.8-2.7 4h12.7v27h-12zm2.3-19.6h-13.7v2.6h13.7zm-13.7 12.2h13.7V257h-13.7zm20.9 8.6c2.1 4.4 5 10.3 6.3 13.9l-9.7 4.1c-1.1-3.8-3.7-9.9-5.7-14.6zM862.9 266.1c-.6 4.1-1.7 7.9-3.7 11.4 5.3 2.3 12.1 3.6 20.5 4.1-2.1 2.2-4.7 6.4-5.9 9.1-8.7-1-15.5-2.9-21-5.9-2.9 2.3-6.6 4.3-11.1 5.8-1.2-2.2-4.3-6.2-6.3-8.2.8-.1 1.5-.3 2.2-.5H824v5.2h-8.8v-20c-.7.9-1.3 1.7-2 2.5-.4-2.9-2.1-10-3.5-13.1 4.2-5.7 7-13.7 8.8-22.5h-7.8v-9.5h26.8v9.5h-9c-.9 4.4-2.1 8.9-3.5 13.3h12.7v34.6q4.5-1.2 7.5-3c-2.5-2.8-4.7-6-6.6-9.8l9-1.9c1 1.8 2.2 3.5 3.6 4.9.9-1.9 1.4-3.9 1.7-6H840v-28.6h13.2v-3.6H839v-9.4h39.4v9.4h-15.3v3.6H877v28.6zm-33.8-9.6H824v16.3h5.1zm20.1-8.3h4.1v-2.9h-4.1zm0 10.2h4.1v-3h-4.1zm14.1-10.2h4.1v-2.9h-4.1zm4.1 7.2h-4.1v3h4.1zM950.8 225.1c-1.9 5.1-4.3 10.4-7 15.4v50h-10v-34.7c-1 1.3-2.1 2.5-3.1 3.6-.9-2.6-3.8-8.5-5.5-11.1 6.2-6.3 12.2-16.3 15.7-26.3zm44 41.5h-18v24h-10.6v-24h-19v-10.3h19v-10.6h-7.4c-1.3 3.3-2.7 6.2-4 8.6-2.1-1.5-6.7-3.9-9.2-5 3.8-5.5 6.8-14.7 8.4-23.3l10.1 2.1c-.5 2.4-1.1 4.9-1.8 7.3h3.9v-12.7h10.6v12.7h14.4v10.3h-14.4v10.6h18zM1109.6 267.4h-27.8v23.2h-11v-23.2h-27.6v-10.7h27.6v-20.2h-23.7V226h58.3v10.4h-23.6v20.2h27.8zm-48.9-29.3c2.2 4.4 4.6 10 5.3 13.9l-10.3 3.2c-.6-3.7-2.5-9.7-4.6-14.3zm25.7 14.2c2-4 4.3-9.8 5.4-14.3l11.3 2.8c-2.5 5.4-5.3 10.7-7.5 14.1zM1215.6 255.5c-.9-1.5-2-3.3-3.4-5.2-36.9 1.6-42.6 1.7-46.9 3.2-.5-2-2.2-7.3-3.5-10.1 2.2-.5 3.8-1.8 6.1-4.1 2.5-2.2 10.1-10.9 14.6-19.4l10.6 4.6c-4.1 6-9.2 12-14.3 17l25.7-.7c-2.5-2.8-4.9-5.5-7.2-7.9l8.2-5.5c6.4 6.3 15.1 15.3 19 21.5zm-48.8 2.2h50.5v32.9h-11.4V287h-28.4v3.6h-10.8v-32.9zm10.8 19.2h28.4v-9.1h-28.4zM348.5 109.4c0-41.3 23.4-64.7 57.8-64.7s57.8 23.5 57.8 64.7c0 41.3-23.4 66-57.8 66-34.4.1-57.8-24.6-57.8-66m84.8 0c0-24.4-10.3-38.8-27-38.8s-26.8 14.4-26.8 38.8c0 24.6 10.2 40 26.8 40s27-15.4 27-40M479.6 157.4l17.1-20.8c9 7.6 20.7 12.9 30.7 12.9 11.2 0 16.4-4.2 16.4-11 0-7.3-7-9.7-17.8-14.2l-16.1-6.8c-13.2-5.2-25.6-16.3-25.6-34.5 0-21.2 19-38.1 45.8-38.1 14.6 0 30 5.6 41 16.6l-15.1 19c-8.3-6.3-16.1-9.7-25.9-9.7-9.3 0-15.1 3.7-15.1 10.5 0 6.9 8 9.7 19.2 14.1l15.8 6.3c15.6 6.3 24.9 16.8 24.9 34.5 0 21-17.6 39.5-48.2 39.5-16.4-.2-34.1-6.3-47.1-18.3M595.9 47.1h30.3V95h41.6V47.1h30v126h-30v-51.8h-41.6v51.8h-30.3zM714.9 47.1h31l8 57.4 5.1 40h.7c2.4-13.4 4.9-26.9 7.5-40L780 47.1h25.4l13.2 57.4c2.5 12.9 4.7 26.4 7.3 40h.8c1.5-13.5 3.2-26.9 4.7-40l8.1-57.4h28.8l-21.9 126h-38.2l-11.4-54.9c-2-9.7-3.7-19.8-4.9-29.3h-.8c-1.5 9.5-3.1 19.6-4.9 29.3l-11 54.9H738zM1165.4 102.9c-5.1 0-9.3 2.3-14.1 7.4v34.8c4.3 3.9 9 5.1 13.2 5.1 8.4 0 15.2-7 15.2-24.6 0-15.4-4.5-22.7-14.3-22.7" class="icon-logo_svg__st0"></path><path d="M1207.1 15H906.8c-9.6 0-17.4 7.8-17.4 17.3v151.3c0 9.5 7.8 17.3 17.4 17.3h300.4c9.6 0 17.4-7.8 17.4-17.3V32.3c-.1-9.5-7.9-17.3-17.5-17.3m-196.4 158h-30v-51.8h-41.5V173h-30.4V47h30.4v48h41.5V47.1h30zm96.1-2.3h-22.5l-2-12.1h-.6c-7.3 8.7-15.5 14.2-27.6 14.2-19.2 0-27.4-13.8-27.4-35.7V82.7h27.6v51c0 12.2 3.3 15.6 10.2 15.6 6.2 0 10.1-2.5 14.7-9V82.7h27.6zm64.2 2.1c-7.7 0-15.8-3.9-22.8-11.6h-.6l-2.2 9.4h-21.5V47.1h27.4v29.7l-.6 13.1c6.5-5.9 14.7-9.4 22.8-9.4 21.1 0 34.5 17.6 34.5 44.5 0 30.5-18.1 47.8-37 47.8M134 0 1.5 76.5v153L134 306l132.5-76.5v-153zm0 297.3L9 225.2V80.8L59 52v144.3l50 28.9V178h50v104.9zm125-72.1L209 254V109.7l-50-28.9V128h-50V23.1l25-14.4 125 72.2z" class="icon-logo_svg__st0"></path></svg>'
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
      filterAll: '所有项目',
      filterWeb: 'Web开发',
      filterMobile: '移动应用',
      filterAI: 'AI/ML',
      filterIoT: '物联网',
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