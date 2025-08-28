import { maintainers, developers, designers, contributors, sponsors } from '../constants/team';
import { Translations } from '../types/translations';

export const enTranslations: Translations = {
  nav: {
    home: 'Home',
    team: 'Team',
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
  join: {
    title: 'Join Our Club',
    subtitle: 'Become part of a community that\'s coding for a sustainable future',
    benefits: 'Benefits of Membership',
    benefitsList: [
      'Access to exclusive coding workshops and training sessions',
      'Collaborate on open-source renewable energy projects',
      'Network with industry professionals and experts',
      'Participate in green tech hackathons and competitions',
      'Get mentorship from experienced developers',
      'Access to premium learning resources and tools'
    ],
    requirements: 'Membership Requirements',
    requirementsList: [
      'Basic programming knowledge (any language)',
      'Passion for sustainability and renewable energy',
      'Commitment to collaborative development',
      'Willingness to learn and share knowledge'
    ],
    howToJoin: 'How to Join',
    steps: [
      'Fill out our membership application form',
      'Complete a brief technical assessment',
      'Attend an orientation session',
      'Start contributing to projects and events'
    ],
    joinNow: 'Apply Now'
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
  }
};