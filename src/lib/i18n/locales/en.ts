import { maintainers, developers, designers, preMaintainers, researchers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const enTranslations: Translations = {
  nav: {
    home: 'Home',
    team: 'Team',
    projects: 'Projects',
    innovation: 'Innovation Results',
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
    titleHighlight: 'Sustainable Future',
    description: 'Join a community of developers passionate about creating innovative software solutions for renewable energy, sustainability, and a greener tomorrow.',
    joinCommunity: 'Join Our Community',
    viewGithub: 'View on Gitee',
    codingWorkshops: 'Coding Workshops',
    codingWorkshopsDesc: 'Weekly sessions to learn sustainable tech development',
    innovationProjects: 'Innovation Projects',
    innovationProjectsDesc: 'Collaborate on open-source green energy solutions',
    industryConnections: 'Industry Connections',
    industryConnectionsDesc: 'Network with leading energy sector professionals',
  },
  about: {
    title: 'About Us',
    paragraph1: 'NEC (New Energy Coder Club) is an open-source technology community for ROBOCON robotics competition and new energy engineering. We provide battle-tested modular codebases, hardware solutions, and collaboration tools. We also have the following professional capabilities:',
    core_competencies: [
      {
        category: 'Processing & Manufacturing',
        skills: '3D Printing / SMT Welding / Laser Engraving & Cutting',
        icon: 'Wrench'
      },
      {
        category: 'Motor & Drive',
        skills: 'M3508 DC Brushless Motor / DM3519 Linear Guide Rail',
        icon: 'RotateCw'
      },
      {
        category: 'Electronic Control Development',
        skills: 'ESP32 Embedded (with HXC-A board) / DAPLink Wireless Flashing/Debugging',
        icon: 'Cpu'
      },
      {
        category: 'Vision',
        skills: 'Odin1 Vision Navigation Module / Raspberry Pi',
        icon: 'Camera'
      },
      {
        category: 'Software Tools',
        skills: 'PlatformIO + VS Code / ROS2 + Docker',
        icon: 'TerminalSquare'
      },
      {
        category: 'AI Development',
        skills: 'Vibe coding',
        icon: 'Sparkles'
      }
    ]
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
    title: 'Who Are We?',
    description: "What makes us attractive isn't 'perfection' — it's the grit to keep debugging with a smile at our darkest moments. The stubbornness to finish the competition with 1/10 of others' budget. It's people passing tools around while lying on the lab floor, collaborating across time zones on Gitee, desperately trying to make it work. That's the soul of NEC.",
    maintainerTitle: 'Maintainer',
    developerTitle: 'Developer',
    designerTitle: 'Designer',
    preMaintainerTitle: 'Pre-Maintainer',
    researcherTitle: 'Researcher',
    contributorTitle: 'Contributor',
    sponsorTitle: 'Sponsor',
    viewFullTeam: 'View Full Team',
    teamPhoto: 'Team Photo',
    analytics: {
      title: 'Team Analytics',
      description: 'Team composition analysis based on Gitee project contributor data',
      totalMembers: 'Total Members',
      activeContributors: 'Active Contributors',
      giteeReference: 'Reference: Gitee project contributor page',
      lastUpdated: 'Last Updated',
      roleDistribution: 'Role Distribution',
      contributionStats: 'Contribution Statistics',
      mainResponsibilities: 'Main Responsibilities',
      maintainerResponsibilities: 'Project management, code review, technical decisions',
      developerResponsibilities: 'Feature development, bug fixes, technical implementation',
      designerResponsibilities: 'Interface design, user experience, visual standards',
      contributorResponsibilities: 'Documentation, testing feedback, community support'
    },
    teamPhotoDescription: 'Precious photos of team members during project development, recording our collaborative efforts and wonderful times together.',
    maintainers,
    developers,
    designers,
    preMaintainers,
    researchers,
    contributors,
    sponsors
  },
  cta: {
    title: "Come On, Don't Just Watch",
    description: "If we can build robots on 200 RMB, what's stopping you? Broken boards are normal — that moment when it finally works is the real high.",
    getStarted: 'Join the Chaos'
  },
  joinPage: {
    title: 'Join Our Club',
    subtitle: 'Become part of our sustainable coding community',
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      experience: 'Experience',
      interests: 'Interests',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Submitted successfully',
      error: 'Submission failed'
    },
    benefits: {
      title: 'Member Benefits',
      networking: 'Networking',
      learning: 'Learning Opportunities',
      projects: 'Project Participation',
      career: 'Career Development'
    },
    wechat: {
      title: 'WeChat Group',
      description: 'Join our WeChat group for the latest updates, project discussions, and community activities',
      id: 'New Energy Programming Club',
      copyButton: 'Copy Group Name',
      copied: 'Copied!',
      addTips: 'How to join:',
      addTipsList: [
        'Copy the group name above',
        'Open WeChat',
        'Search for the group name',
        'Apply to join'
      ]
    },
    roadmap: {
      title: 'Joining Process',
      description: 'Follow these simple steps to become part of our community',
      steps: [
        {
          title: 'Get to Know Us',
          description: 'Browse project introductions and team culture',
          duration: '5-10 minutes'
        },
        {
          title: 'Technical Preparation',
          description: 'Prepare basic development environment and skills',
          duration: '1-2 hours'
        },
        {
          title: 'Join Organization',
          description: 'Follow our open-source organization on GitHub and explore projects',
          duration: '1-5 minutes'
        },
        {
          title: 'Start Contributing',
          description: 'Find a Good First Issue and submit your first PR or Issue',
          duration: '1-3 days'
        },
        {
          title: 'Deepen Collaboration',
          description: 'Develop core modules with the team and join technical meetings',
          duration: 'Long-term'
        }
      ]
    },
    cta: {
      title: 'Ready to Start?',
      description: 'Take the first step towards innovation and collaboration',
      addWechat: 'Add WeChat Contact',
      viewProject: 'View Our Projects',
      tip: '💡 Pro tip: Adding our WeChat contact is the fastest way to get started!'
    }
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous'
  },

  notFound: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist.',
    returnHome: 'Return to Home'
  },
  projects: {
    title: 'ROBOCON & Robotics Projects',
    description: 'Open-source hardware and software for the National College Robot Competition (ROBOCON)',
    filterTitle: 'Filter by Category',
    expandFilters: 'Expand',
    collapseFilters: 'Collapse',
    filterAll: 'All Projects',
    filterAI: 'AI & Machine Learning',
    filterIoT: 'IoT',
    filterEmbedded: 'Embedded Systems',
    filterRobotics: 'Robotics',
    filterResearch: 'Research',
    filterWeb: 'Web',
    filterMobile: 'Mobile',
    filterOther: 'Other',
    viewProject: 'View Project',
    viewCode: 'View Code',
    technologies: 'Tech Stack',
    author: 'Team',
    date: 'Year'
  },
  events: {
    title: 'Events',
    description: 'Tech sharing, workshops, and ROBOCON preparation activities',
    filterTitle: 'Filter Events',
    expandFilters: 'Expand Filters',
    collapseFilters: 'Collapse Filters',
    upcoming: 'Upcoming',
    past: 'Past',
    noUpcoming: 'No upcoming events',
    noPast: 'No past events',
    registerNow: 'Register Now',
    learnMore: 'Learn More',
    viewDetails: 'View Details',
    eventDate: 'Date',
    location: 'Location',
    participants: 'Participants',
    category: 'Category',
    filterAll: 'All',
    filterWorkshop: 'Workshop',
    filterHackathon: 'Hackathon',
    filterSeminar: 'Seminar',
    filterCompetition: 'Competition',
    filterNetworking: 'Networking'
  },
  resources: {
    title: 'Learning Resources',
    description: 'Access curated resources for sustainable technology development',
    filterTitle: 'Filter Resources',
    expandFilters: 'Expand Filters',
    collapseFilters: 'Collapse Filters',
    searchPlaceholder: 'Search resources...',
    filterAll: 'All',
    filterTutorials: 'Tutorials',
    filterTools: 'Tools',
    filterBooks: 'Books',
    filterCourses: 'Courses',
    filterDocumentation: 'Documentation',
    noResults: 'No resources found',
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
    rating: 'Rating',
    sortBy: 'Sort By',
    sortOrder: 'Sort Order',
    sortByRating: 'Rating',
    sortByTitle: 'Title',
    sortByDifficulty: 'Difficulty',
    sortByType: 'Type',
    ascending: 'Ascending',
    descending: 'Descending',
    totalResources: '{count} resources total'
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with our team for questions, collaborations, or partnerships',
    getInTouch: 'Get In Touch',
    contactInfo: 'Contact Information',
    followUs: 'Follow Us',
    channelsDescription: 'You can also reach us through the following channels.',
    followUsDescription: 'Stay connected with us on social media for updates and news.',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'How can we help?',
      messagePlaceholder: 'Tell us more about your inquiry...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message sent successfully!',
      messageError: 'Failed to send message. Please try again.',
      introText: "Fill out the form below and we'll get back to you as soon as possible.",
      toastSuccessDescription: "We'll get back to you as soon as possible.",
      toastErrorDescription: 'Please check your connection and try again.'
    },
    info: {
      address: 'No. 666, Liaohai Road, Xinbei District, Changzhou City, Jiangsu Province',
      phone: '+86 15896000818',
      email: '22230635@czu.cn',
      hours: 'Monday - Friday: 9AM - 6PM'
    },
    infoLabels: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Office Hours'
    },
    social: {
      gitee: 'Gitee',
      wechat: 'WeChat',
      email: 'Email'
    },
    application: {
      title: 'NEC Site Listing Application',
      description: 'Apply to be listed on the NEC official site to showcase your projects and achievements.',
      applyNow: 'Apply Now'
    }
  },
  // Getting Started page translations
  gettingStarted: {
    hero: {
      title: 'New Energy Coder Club',
      description: 'Explore the possibilities of new energy technology. Start changing the world with code.',
      buttons: {
        joinClub: 'Join Club',
        viewProjects: 'View Projects',
        visitSite: 'Visit Official Site'
      }
    },
    stats: {
      learnersTitle: 'Learners',
      learnersDesc: 'Active learners',
      completedProjectsTitle: 'Projects Completed',
      completedProjectsDesc: 'Completed projects',
      averageRatingTitle: 'Average Rating',
      averageRatingDesc: 'Learner satisfaction',
      successRateTitle: 'Success Rate',
      successRateDesc: 'Learning success rate'
    },
    directions: {
      title: 'Choose Your Tech Direction',
      description: 'Select the learning path that best matches your interests and career plan.',
      coreSkills: 'Core Skills',
      projectsSuffix: ' projects',
      startLearning: 'Start Learning',
      embedded: {
        title: 'Embedded Development',
        description: 'Learn embedded systems development and master core technologies that combine hardware and software.',
        skills: ['C/C++', 'FreeRTOS', 'Hardware Debugging', 'Communication Protocols'],
        duration: '6-8 months'
      },
      gui: {
        title: 'GUI Development',
        description: 'Master cross-platform graphical interface development to build beautiful and practical desktop applications.',
        skills: ['Qt/QML', 'UI Design', 'Cross-Platform Development', 'User Experience'],
        duration: '4-6 months'
      },
      algorithm: {
        title: 'Algorithms & Data Structures',
        description: 'Dive deep into algorithm design and optimization to enhance problem-solving and programming thinking.',
        skills: ['Algorithm Design', 'Data Structures', 'Performance Optimization', 'Mathematical Modeling'],
        duration: '8-12 months'
      },
      structurePrint: {
        title: 'Structural Printing Development',
        description: 'Design, slicing, and control development for 3D structural printing',
        skills: ['CAD Modeling', 'Slicing Software', 'Material Process', 'G-code/Control'],
        duration: '5-7 months'
      }
    },
    quickGuides: {
      title: 'Quick Start Guides',
      description: 'Follow our guides to quickly begin your journey in new energy programming.',
      stepsLabel: 'Steps:',
      items: {
        setup: {
          title: 'Environment Setup',
          description: 'Quickly set up your development environment and start coding.',
          steps: [
            'Choose suitable development tools',
            'Install required packages',
            'Configure your environment',
            'Run your first program'
          ],
          estimatedTime: '30 minutes'
        },
        firstGoodIssue: {
          title: 'Your First Good Issue',
          description: 'Find and resolve your first Good Issue to start contributing to open-source projects.',
          steps: [
            'Browse the project issue list',
            'Filter by Good First Issue label',
            'Understand the problem description and requirements',
            'Fork the project and create a branch',
            'Implement the solution',
            'Submit a Pull Request'
          ],
          estimatedTime: '25 minutes'
        },
        firstProject: {
          title: 'First Project',
          description: 'Get hands-on with a real project and learn core development flow.',
          steps: [
            'Choose a starter project',
            'Understand the project structure',
            'Write core code',
            'Test and debug',
            'Deploy the project'
          ],
          estimatedTime: '2 hours'
        },
        community: {
          title: 'Join the Community',
          description: 'Engage with the learning community to get more support and exchange ideas.',
          steps: [
            'Register a club account',
            'Complete your profile',
            'Join a study group',
            'Participate in discussions'
          ],
          estimatedTime: '15 minutes'
        }
      }
    },
    baseTutorials: {
      title: 'Basic Tutorials',
      description: 'Start from zero to learn programming basics and core concepts.',
      introTitle: 'Introduction to Programming',
      introDesc: 'Basic concepts and mindset; explore application areas and prospects of energy programming.',
      fundamentalsTitle: 'Programming Fundamentals',
      fundamentalsDesc: 'Variables, functions, control structures; master core concepts and syntax.',
      startLearning: 'Start Learning'
    },
    trainingResources: {
      title: 'Training Resources',
      description: 'Rich resources to help you improve skills quickly.',
      githubRepoTitle: 'GitHub Repository',
      githubRepoDesc: 'View project source code and contribute.',
      visitGithub: 'Visit GitHub',
      docsTitle: 'Technical Documentation',
      docsDesc: 'Detailed technical docs and API references.',
      viewDocs: 'View Docs',
      videosTitle: 'Video Tutorials',
      videosDesc: 'Watch hands-on project video tutorials.',
      watchVideos: 'Watch Videos',
      communityTitle: 'Community Discussions',
      communityDesc: 'Join community discussions and exchanges.',
      joinDiscussion: 'Join Discussion'
    }
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back,',
    memberSince: 'Member since',
    logout: 'Log out',
    myProjects: {
      title: 'My Projects',
      description: 'Manage and track your contributions to our open-source projects',
      noProjects: 'No projects yet',
      viewGithub: 'View on Gitee'
    },
    upcomingEvents: {
      title: 'Upcoming Events',
      description: 'Stay updated with upcoming workshops and events',
      noEvents: 'No upcoming events',
      viewAll: 'View All Events'
    },
    myActivity: {
      title: 'My Activity',
      description: 'Track your contributions and engagement with the community',
      contributions: 'Contributions',
      eventsAttended: 'Events Attended',
      projectsCompleted: 'Projects Completed'
    },
    quickActions: {
      title: 'Quick Actions',
      submitProject: 'Submit New Project',
      registerEvent: 'Register for Event',
      viewResources: 'View Resources',
      contactUs: 'Contact Us'
    }
  },
  footer: {
    clubName: 'New Energy Coder Club',
    description: 'Building sustainable technology through collaborative development',
    navigation: 'Navigation',
    resources: 'Resources',
    contact: 'Contact',
    learningMaterials: 'Learning Materials',
    joinClub: 'Join Club',
    documentation: 'Documentation',
    gettingStarted: 'Getting Started',
    techRoadmap: {
      title: 'Tech Roadmap',
      description: 'Explore our technology learning paths'
    },
    address: 'No. 666, Liaohai Road, Xinbei District, Changzhou City, Jiangsu Province',
    copyright: '© 2025 New Energy Coder Club. All rights reserved.'
  },
  displayRatio: {
    title: 'Display Ratio Adjuster',
    description: 'Adjust card display ratios and view visual effects under different ratios',
    aspectRatioLabel: 'Display Ratio',
    viewDetails: 'View Details',
    noMatchingContent: 'No matching content found',
    aspectRatios: {
      square: 'Square (1:1)',
      video: 'Video Ratio (16:9)',
      traditional: 'Traditional Ratio (4:3)',
      portrait: 'Portrait Ratio (3:4)',
      widescreen: 'Widescreen Ratio (16:10)',
      ultrawide: 'Ultrawide Ratio (21:9)'
    }
  },
  
  // Learning path and tech roadmap translations
  learning: learningTranslations.en
};