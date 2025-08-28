export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  tags?: string[];
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface Translations {
  // Navigation
  nav: {
    home: string;
    projects: string;
    events: string;
    resources: string;
    contact: string;
    team: string;
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
    paragraph2?: string;
    paragraph3?: string;
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
    viewFullTeam: string;
    teamPhoto: string;
    maintainers: TeamMember[];
    developers: TeamMember[];
    designers: TeamMember[];
    contributors: TeamMember[];
    sponsors: TeamMember[];
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
  
  // Resources Page
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
    sortBy: string;
    sortOrder: string;
    sortByRating: string;
    sortByTitle: string;
    sortByDifficulty: string;
    sortByType: string;
    ascending: string;
    descending: string;
    totalResources: string;
  };
  
  // Contact Page
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
  
  // Dashboard
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
  
  // Footer
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
  
  // Display Ratio Page
  displayRatio: {
    title: string;
    description: string;
    aspectRatioLabel: string;
    viewDetails: string;
    noMatchingContent: string;
    aspectRatios: {
      square: string;
      video: string;
      traditional: string;
      portrait: string;
      widescreen: string;
      ultrawide: string;
    };
  };
}

export type Language = 'en' | 'zh';