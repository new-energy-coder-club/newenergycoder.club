import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';
import { learningTranslations } from '../constants/learning';

export const enTranslations: Translations = {
  join: {
    form: {
      title: 'Join New Energy Coder Club',
      subtitle: 'Fill out this form to become a member of our community',
      basicInfo: {
        title: 'Basic Information',
        description: 'Please provide your basic contact information',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        organization: 'Organization/Company',
        namePlaceholder: 'Enter your full name',
        emailPlaceholder: 'Enter your email address',
        phonePlaceholder: 'Enter your phone number',
        organizationPlaceholder: 'Enter your organization or company'
      },
      roleInfo: {
        title: 'Role Information',
        description: 'Tell us about your professional background',
        role: 'Role',
        rolePlaceholder: 'Enter your role',
        experience: 'Experience',
        experiencePlaceholder: 'Describe your experience',
        identityLabel: 'Identity',
        student: 'Student',
        professional: 'Professional',
        freelancer: 'Freelancer',
        other: 'Other'
      },
      techStack: {
        title: 'Technical Skills',
        description: 'Select your areas of expertise',
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        embedded: 'Embedded Systems',
        ai: 'AI/Machine Learning',
        other: 'Other',
        otherPlaceholder: 'Specify other skills',
        options: ['Frontend', 'Backend', 'Mobile', 'AI/ML', 'DevOps', 'Data Science']
      },
      experience: {
        title: 'Experience & Motivation',
        description: 'Share your background and goals',
        motivation: 'Motivation',
        motivationPlaceholder: 'Why do you want to join?',
        experienceLabel: 'Technical Experience',
        motivationLabel: 'Motivation',
        contributionLabel: 'Expected Contribution',
        experiencePlaceholder: 'Describe your technical background',
        contributionPlaceholder: 'How do you plan to contribute?'
      },
      timeExpectation: {
        title: 'Time Commitment',
        description: 'Help us understand your availability',
        expectationsLabel: 'Expectations',
        expectationsPlaceholder: 'What do you expect from the club?',
        availabilityLabel: 'Weekly Availability (hours)',
        selectPlaceholder: 'Select your availability',
        option1to2: '1-2 hours',
        option3to5: '3-5 hours',
        option6to10: '6-10 hours',
        option10plus: '10+ hours'
      },
      submit: {
        button: 'Submit Application',
        submitting: 'Submitting...',
        success: 'Application Submitted',
        successMessage: 'Thank you for your application! We will review it and get back to you soon.',
        error: 'Submission Failed',
        errorMessage: 'There was an error submitting your application. Please try again.'
      }
    }
  },
  nav: {
    home: 'Home',
    team: 'Team',
    projects: 'Projects',
    innovation: 'Innovation Results',
    events: 'Events',
    resources: 'Resources',
    contact: 'Contact Us',
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
    title: 'About Our Club',
    paragraph1: 'The New Energy Coder Club was founded in 2024 by a group of passionate developers and engineers who wanted to combine their love for coding with their commitment to sustainability and renewable energy. Our mission is to build a community that develops open-source software solutions for renewable energy applications, smart grid technologies, energy efficiency, and sustainability. Through workshops, hackathons, collaborative projects, and partnerships with energy companies, we aim to create a platform where technology meets sustainability for a better future.',
    learnMore: 'Learn More About Us',
    projectOrigin: {
      title: 'Project Origin Story',
      content: 'Project Source: A promise with @haolei, 2024 we have to do a good project! We hit it off right away, prepared the materials on the same day, and had the enrollment form ready by the end of the night. However, the reality is incredibly cruel, our one-two punch could not defeat our past selves, and the chemical design materials we made were handed in intact, and according to our teacher\'s words, we flopped... Thanks to Ms. Dai Orchid (the teacher who taught me my introduction to new energy science and engineering in my freshman year), we didn\'t give up under her encouragement, and after many contacts and discussions with our instructors and teammates, we decided to compete for the recommended place in the national competition directly --- to reach the top 15 in the school competition. Then, we just went all out. That 20 hours on May 12th, we never stopped. The light in the all-night laboratory seemed to never go out, and time crawled on the ground like ants. We persevered through the spirit, and it seemed like there was only me, a lamp, and a laptop in the world. After drawing all the diagrams and writing most of the content, dawn quietly drowned in the darkness before dawn...'
    },
    phase2: {
      title: 'Phase 2 Development',
      description: 'Future enhancements and expanded features coming soon',
      content: '一群做开源项目养机器人的开发者&设计师们'
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
    contributors,
    sponsors
  },
  cta: {
    title: 'Ready to Make an Impact?',
    description: 'Join our community of developers creating sustainable technology solutions.',
    getStarted: 'Get Started Today'
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
          title: 'Submit Application',
          description: 'Fill out the join application form',
          duration: '10-15 minutes'
        },
        {
          title: 'Wait for Review',
          description: 'Team reviews your application',
          duration: '1-3 business days'
        },
        {
          title: 'Welcome Aboard',
          description: 'Receive invitation and start collaboration journey',
          duration: 'Instant'
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
    title: 'Our Projects',
    description: 'Explore open-source projects focused on renewable energy and sustainability',
    filterTitle: 'Filter Projects',
    expandFilters: 'Expand Filters',
    collapseFilters: 'Collapse Filters',
    filterAll: 'All',
    filterAI: 'AI & Machine Learning',
    filterIoT: 'Internet of Things',
    filterEmbedded: 'Embedded Systems',
    filterRobotics: 'Robotics',
    filterResearch: 'Research',
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
    title: 'Future / 未来',
    description: 'Join our upcoming events and workshops on sustainable technology',
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
    title: 'Contact Us',
    description: 'Get in touch with our team for questions, collaborations, or partnerships',
    getInTouch: 'Get In Touch',
    contactInfo: 'Contact Information',
    followUs: 'Follow Us',
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
      messageError: 'Failed to send message. Please try again.'
    },
    info: {
      address: 'No. 666, Liaohai Road, Xinbei District, Changzhou City, Jiangsu Province',
      phone: '+86 15896000818',
      email: '22230635@czu.cn',
      hours: 'Monday - Friday: 9AM - 6PM'
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
    gettingStarted: 'Getting Started',
    techRoadmap: {
      title: 'Tech Roadmap',
      description: 'Explore our technology learning paths'
    },
    address: 'Yuheng A416 Warehouse Laboratory, Liaohai Road Campus, Changzhou Institute of Technology, No. 666, Liaohai Road, Xinbei District, Changzhou City, Jiangsu Province',
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