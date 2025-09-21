// 学习路径和技术路线相关的国际化翻译
// 支持中英文双语

export const learningTranslations = {
  zh: {
    // 页面标题和导航
    pageTitle: '技术路线',
    pageSubtitle: '选择适合你的技术发展方向',
    navigation: {
      overview: '路线概览',
      embedded: '嵌入式开发',
      mechanical: '机械算法',
      design: '设计师技能',
      resources: '学习资源',
      quickStart: '快速上手'
    },

    // 技术方向
    directions: {
      embedded: {
        title: '嵌入式开发',
        subtitle: '硬件与软件的完美结合',
        description: '掌握嵌入式系统开发，从单片机到复杂的实时系统',
        keySkills: '核心技能',
        careerPath: '职业发展',
        salaryRange: '薪资范围'
      },
      mechanical: {
        title: '机械算法',
        subtitle: '工程计算与仿真分析',
        description: '运用数值方法解决复杂的工程问题',
        keySkills: '核心技能',
        careerPath: '职业发展',
        salaryRange: '薪资范围'
      },
      design: {
        title: '设计师技能',
        subtitle: '用户体验与界面设计',
        description: '创造优秀的用户体验和视觉设计',
        keySkills: '核心技能',
        careerPath: '职业发展',
        salaryRange: '薪资范围'
      }
    },

    // 学习阶段
    phases: {
      foundation: {
        title: '基础阶段',
        description: '建立扎实的理论基础',
        duration: '预计时长',
        objectives: '学习目标'
      },
      intermediate: {
        title: '进阶阶段',
        description: '深入学习核心技术',
        duration: '预计时长',
        objectives: '学习目标'
      },
      advanced: {
        title: '高级阶段',
        description: '掌握高级技术和最佳实践',
        duration: '预计时长',
        objectives: '学习目标'
      },
      expert: {
        title: '专家阶段',
        description: '成为领域专家',
        duration: '预计时长',
        objectives: '学习目标'
      }
    },

    // 学习步骤
    steps: {
      theory: '理论学习',
      practice: '实践练习',
      project: '项目实战',
      review: '复习巩固',
      assessment: '能力评估'
    },

    // 难度等级
    difficulty: {
      easy: '入门',
      medium: '中级',
      hard: '高级',
      expert: '专家'
    },

    // 资源类型
    resourceTypes: {
      documentation: '文档教程',
      video: '视频教程',
      book: '推荐书籍',
      course: '在线课程',
      practice: '实践项目',
      tool: '开发工具',
      community: '社区资源'
    },

    // 学习资源
    resources: {
      title: '学习资源',
      subtitle: '精选的高质量学习材料',
      filterBy: '筛选条件',
      filterByType: '按类型筛选',
      filterByDifficulty: '按难度筛选',
      filterByLanguage: '按语言筛选',
      filterByDirection: '按方向筛选',
      showFreeOnly: '仅显示免费资源',
      estimatedTime: '预计学习时间',
      difficulty: '难度等级',
      language: '语言',
      lastUpdated: '最后更新',
      viewResource: '查看资源',
      addToLearningPlan: '加入学习计划',
      recommended: '推荐',
      free: '免费',
      paid: '付费'
    },

    // 快速上手
    quickStart: {
      title: '快速上手指南',
      subtitle: '30分钟快速体验技术方向',
      chooseDirection: '选择技术方向',
      requirements: '环境要求',
      operatingSystem: '操作系统',
      software: '必需软件',
      hardware: '硬件要求',
      steps: '操作步骤',
      step: '步骤',
      estimatedTime: '预计时间',
      minutes: '分钟',
      firstProject: '第一个项目建议',
      projectDifficulty: '项目难度',
      projectTime: '项目时长',
      hours: '小时',
      viewOnGitHub: '在GitHub上查看',
      startNow: '立即开始',
      nextSteps: '下一步建议'
    },

    // 学习计划
    learningPlan: {
      title: '我的学习计划',
      subtitle: '个性化的学习路径规划',
      createPlan: '创建学习计划',
      editPlan: '编辑计划',
      deletePlan: '删除计划',
      planName: '计划名称',
      targetDirection: '目标方向',
      currentLevel: '当前水平',
      targetLevel: '目标水平',
      timeCommitment: '时间投入',
      hoursPerWeek: '每周小时数',
      estimatedCompletion: '预计完成时间',
      progress: '学习进度',
      completed: '已完成',
      inProgress: '进行中',
      notStarted: '未开始',
      markAsCompleted: '标记为完成',
      addNote: '添加笔记',
      viewDetails: '查看详情'
    },

    // 技能评估
    assessment: {
      title: '技能评估',
      subtitle: '了解你的当前技术水平',
      startAssessment: '开始评估',
      question: '问题',
      of: '共',
      next: '下一题',
      previous: '上一题',
      submit: '提交评估',
      results: '评估结果',
      yourLevel: '你的水平',
      recommendations: '学习建议',
      retakeAssessment: '重新评估',
      shareResults: '分享结果'
    },

    // 通用按钮和操作
    common: {
      viewMore: '查看更多',
      viewLess: '收起',
      learnMore: '了解更多',
      getStarted: '开始学习',
      download: '下载',
      share: '分享',
      bookmark: '收藏',
      unbookmark: '取消收藏',
      copy: '复制',
      copied: '已复制',
      loading: '加载中...',
      error: '加载失败',
      retry: '重试',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      reset: '重置'
    },

    // 状态和提示信息
    messages: {
      noResourcesFound: '未找到相关资源',
      noPlansFound: '暂无学习计划',
      planSaved: '学习计划已保存',
      planDeleted: '学习计划已删除',
      resourceAdded: '资源已添加到学习计划',
      resourceRemoved: '资源已从学习计划中移除',
      assessmentCompleted: '技能评估已完成',
      progressUpdated: '学习进度已更新',
      networkError: '网络连接错误，请检查网络设置',
      serverError: '服务器错误，请稍后重试'
    }
  },

  en: {
    // Page titles and navigation
    pageTitle: 'Tech Roadmaps',
    pageSubtitle: 'Choose your technical development path',
    navigation: {
      overview: 'Overview',
      embedded: 'Embedded Development',
      mechanical: 'Mechanical Algorithms',
      design: 'Designer Skills',
      resources: 'Learning Resources',
      quickStart: 'Quick Start'
    },

    // Technical directions
    directions: {
      embedded: {
        title: 'Embedded Development',
        subtitle: 'Perfect combination of hardware and software',
        description: 'Master embedded system development, from microcontrollers to complex real-time systems',
        keySkills: 'Key Skills',
        careerPath: 'Career Path',
        salaryRange: 'Salary Range'
      },
      mechanical: {
        title: 'Mechanical Algorithms',
        subtitle: 'Engineering computation and simulation analysis',
        description: 'Apply numerical methods to solve complex engineering problems',
        keySkills: 'Key Skills',
        careerPath: 'Career Path',
        salaryRange: 'Salary Range'
      },
      design: {
        title: 'Designer Skills',
        subtitle: 'User experience and interface design',
        description: 'Create excellent user experiences and visual designs',
        keySkills: 'Key Skills',
        careerPath: 'Career Path',
        salaryRange: 'Salary Range'
      }
    },

    // Learning phases
    phases: {
      foundation: {
        title: 'Foundation Phase',
        description: 'Build solid theoretical foundation',
        duration: 'Estimated Duration',
        objectives: 'Learning Objectives'
      },
      intermediate: {
        title: 'Intermediate Phase',
        description: 'Deep dive into core technologies',
        duration: 'Estimated Duration',
        objectives: 'Learning Objectives'
      },
      advanced: {
        title: 'Advanced Phase',
        description: 'Master advanced techniques and best practices',
        duration: 'Estimated Duration',
        objectives: 'Learning Objectives'
      },
      expert: {
        title: 'Expert Phase',
        description: 'Become a domain expert',
        duration: 'Estimated Duration',
        objectives: 'Learning Objectives'
      }
    },

    // Learning steps
    steps: {
      theory: 'Theoretical Learning',
      practice: 'Practical Exercises',
      project: 'Project Practice',
      review: 'Review and Consolidation',
      assessment: 'Skill Assessment'
    },

    // Difficulty levels
    difficulty: {
      easy: 'Beginner',
      medium: 'Intermediate',
      hard: 'Advanced',
      expert: 'Expert'
    },

    // Resource types
    resourceTypes: {
      documentation: 'Documentation',
      video: 'Video Tutorials',
      book: 'Recommended Books',
      course: 'Online Courses',
      practice: 'Practice Projects',
      tool: 'Development Tools',
      community: 'Community Resources'
    },

    // Learning resources
    resources: {
      title: 'Learning Resources',
      subtitle: 'Curated high-quality learning materials',
      filterBy: 'Filter By',
      filterByType: 'Filter by Type',
      filterByDifficulty: 'Filter by Difficulty',
      filterByLanguage: 'Filter by Language',
      filterByDirection: 'Filter by Direction',
      showFreeOnly: 'Show Free Resources Only',
      estimatedTime: 'Estimated Learning Time',
      difficulty: 'Difficulty Level',
      language: 'Language',
      lastUpdated: 'Last Updated',
      viewResource: 'View Resource',
      addToLearningPlan: 'Add to Learning Plan',
      recommended: 'Recommended',
      free: 'Free',
      paid: 'Paid'
    },

    // Quick start
    quickStart: {
      title: 'Quick Start Guide',
      subtitle: 'Experience the tech direction in 30 minutes',
      chooseDirection: 'Choose Technical Direction',
      requirements: 'Requirements',
      operatingSystem: 'Operating System',
      software: 'Required Software',
      hardware: 'Hardware Requirements',
      steps: 'Steps',
      step: 'Step',
      estimatedTime: 'Estimated Time',
      minutes: 'minutes',
      firstProject: 'First Project Suggestion',
      projectDifficulty: 'Project Difficulty',
      projectTime: 'Project Duration',
      hours: 'hours',
      viewOnGitHub: 'View on GitHub',
      startNow: 'Start Now',
      nextSteps: 'Next Steps'
    },

    // Learning plan
    learningPlan: {
      title: 'My Learning Plan',
      subtitle: 'Personalized learning path planning',
      createPlan: 'Create Learning Plan',
      editPlan: 'Edit Plan',
      deletePlan: 'Delete Plan',
      planName: 'Plan Name',
      targetDirection: 'Target Direction',
      currentLevel: 'Current Level',
      targetLevel: 'Target Level',
      timeCommitment: 'Time Commitment',
      hoursPerWeek: 'Hours per Week',
      estimatedCompletion: 'Estimated Completion',
      progress: 'Learning Progress',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      markAsCompleted: 'Mark as Completed',
      addNote: 'Add Note',
      viewDetails: 'View Details'
    },

    // Skill assessment
    assessment: {
      title: 'Skill Assessment',
      subtitle: 'Understand your current technical level',
      startAssessment: 'Start Assessment',
      question: 'Question',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Assessment',
      results: 'Assessment Results',
      yourLevel: 'Your Level',
      recommendations: 'Learning Recommendations',
      retakeAssessment: 'Retake Assessment',
      shareResults: 'Share Results'
    },

    // Common buttons and actions
    common: {
      viewMore: 'View More',
      viewLess: 'View Less',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      download: 'Download',
      share: 'Share',
      bookmark: 'Bookmark',
      unbookmark: 'Remove Bookmark',
      copy: 'Copy',
      copied: 'Copied',
      loading: 'Loading...',
      error: 'Loading Failed',
      retry: 'Retry',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      reset: 'Reset'
    },

    // Status and notification messages
    messages: {
      noResourcesFound: 'No resources found',
      noPlansFound: 'No learning plans found',
      planSaved: 'Learning plan saved',
      planDeleted: 'Learning plan deleted',
      resourceAdded: 'Resource added to learning plan',
      resourceRemoved: 'Resource removed from learning plan',
      assessmentCompleted: 'Skill assessment completed',
      progressUpdated: 'Learning progress updated',
      networkError: 'Network connection error, please check your network settings',
      serverError: 'Server error, please try again later'
    }
  }
};

// 导出默认的学习路径翻译
export default learningTranslations;