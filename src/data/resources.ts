// 培训资源数据定义
// 包含各种类型的学习资源和培训材料

import {
  TrainingCategory,
  LearningResource,
  ResourceType,
  DifficultyLevel,
  TechDirection,
  QuickStartGuide
} from '../types/learning';

/**
 * 文档教程资源分类
 */
const documentationCategory: TrainingCategory = {
  id: 'documentation',
  name: '文档教程',
  description: '系统性的文档教程和技术指南',
  icon: 'FileText',
  recommendationLevel: 5,
  resources: [
    {
      id: 'embedded-c-guide',
      title: '嵌入式C语言编程指南',
      description: '专为嵌入式开发设计的C语言教程',
      type: ResourceType.DOCUMENTATION,
      url: 'https://www.embedded.com/c-programming-for-embedded-systems/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 25,
      isFree: true,
      language: 'en',
      tags: ['C语言', '嵌入式', '编程基础'],
      techStack: ['C', '嵌入式系统'],
      lastUpdated: '2024-02-01'
    },
    {
      id: 'qt-documentation',
      title: 'Qt官方开发文档',
      description: 'Qt框架完整的API文档和开发指南',
      type: ResourceType.DOCUMENTATION,
      url: 'https://doc.qt.io/qt-6/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 40,
      isFree: true,
      language: 'en',
      tags: ['Qt', 'GUI', 'C++', '跨平台'],
      techStack: ['Qt', 'C++'],
      lastUpdated: '2024-03-01'
    },
    {
      id: 'matlab-simulink-docs',
      title: 'MATLAB/Simulink官方文档',
      description: 'MATLAB和Simulink的完整技术文档',
      type: ResourceType.DOCUMENTATION,
      url: 'https://www.mathworks.com/help/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 50,
      isFree: false,
      language: 'en',
      tags: ['MATLAB', 'Simulink', '数值计算', '仿真'],
      techStack: ['MATLAB', 'Simulink'],
      lastUpdated: '2024-02-15'
    },
    {
      id: 'design-system-guide',
      title: '设计系统构建指南',
      description: '如何构建和维护设计系统的完整指南',
      type: ResourceType.DOCUMENTATION,
      url: 'https://www.designsystems.com/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 20,
      isFree: true,
      language: 'en',
      tags: ['设计系统', 'UI设计', '组件库'],
      techStack: ['Figma', 'React', 'CSS'],
      lastUpdated: '2024-02-20'
    }
  ]
};

/**
 * 视频教程资源分类
 */
const videoCategory: TrainingCategory = {
  id: 'video-tutorials',
  name: '视频教程',
  description: '高质量的视频教学内容',
  icon: 'Play',
  recommendationLevel: 5,
  resources: [
    {
      id: 'freertos-video-series',
      title: 'FreeRTOS实战视频教程',
      description: '从基础到高级的FreeRTOS完整视频课程',
      type: ResourceType.VIDEO,
      url: 'https://www.bilibili.com/video/BV1bh411S7E3',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 45,
      isFree: true,
      language: 'zh',
      tags: ['FreeRTOS', 'RTOS', '实时系统', '嵌入式'],
      techStack: ['FreeRTOS', 'STM32', 'C'],
      lastUpdated: '2024-02-10'
    },
    {
      id: 'ansys-simulation',
      title: 'ANSYS仿真分析教程',
      description: 'ANSYS Workbench结构仿真完整教程',
      type: ResourceType.VIDEO,
      url: 'https://www.bilibili.com/video/BV1Jh411n7kj',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 60,
      isFree: true,
      language: 'zh',
      tags: ['ANSYS', '有限元', '仿真分析', '结构力学'],
      techStack: ['ANSYS', 'CAD'],
      lastUpdated: '2024-02-05'
    },
    {
      id: 'ui-ux-masterclass',
      title: 'UI/UX设计大师课',
      description: '从设计理论到实战项目的完整UI/UX课程',
      type: ResourceType.VIDEO,
      url: 'https://www.bilibili.com/video/BV1Gh411n7VK',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 35,
      isFree: true,
      language: 'zh',
      tags: ['UI设计', 'UX设计', 'Figma', '用户体验'],
      techStack: ['Figma', 'Sketch', 'Adobe XD'],
      lastUpdated: '2024-02-12'
    },
    {
      id: 'winform-development',
      title: 'C# WinForm桌面开发',
      description: 'Windows桌面应用程序开发完整教程',
      type: ResourceType.VIDEO,
      url: 'https://www.bilibili.com/video/BV1FJ411W7e5',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 40,
      isFree: true,
      language: 'zh',
      tags: ['C#', 'WinForm', 'Windows', '桌面应用'],
      techStack: ['C#', '.NET Framework', 'Visual Studio'],
      lastUpdated: '2024-02-08'
    }
  ]
};

/**
 * 实践项目资源分类
 */
const practiceCategory: TrainingCategory = {
  id: 'practice-projects',
  name: '实践项目',
  description: '动手实践的项目和代码示例',
  icon: 'Code',
  recommendationLevel: 5,
  resources: [
    {
      id: 'iot-weather-station',
      title: 'IoT智能气象站项目',
      description: '基于ESP32的完整IoT项目，包含传感器、云端和移动应用',
      type: ResourceType.PRACTICE,
      url: 'https://github.com/newenergycoder/iot-weather-station',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 30,
      isFree: true,
      language: 'zh',
      tags: ['IoT', 'ESP32', 'MQTT', '传感器', '云平台'],
      techStack: ['ESP32', 'Arduino', 'MQTT', 'React'],
      lastUpdated: '2024-03-01'
    },
    {
      id: 'fem-solver',
      title: '简单有限元求解器',
      description: '用Python实现的2D有限元求解器项目',
      type: ResourceType.PRACTICE,
      url: 'https://github.com/newenergycoder/simple-fem-solver',
      difficulty: DifficultyLevel.HARD,
      estimatedHours: 50,
      isFree: true,
      language: 'en',
      tags: ['有限元', 'Python', '数值计算', '科学计算'],
      techStack: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
      lastUpdated: '2024-02-25'
    },
    {
      id: 'qt-media-player',
      title: 'Qt多媒体播放器',
      description: '使用Qt开发的跨平台多媒体播放器',
      type: ResourceType.PRACTICE,
      url: 'https://github.com/newenergycoder/qt-media-player',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 25,
      isFree: true,
      language: 'zh',
      tags: ['Qt', 'C++', '多媒体', 'GUI', '跨平台'],
      techStack: ['Qt', 'C++', 'Qt Multimedia'],
      lastUpdated: '2024-02-18'
    },
    {
      id: 'design-portfolio',
      title: '设计师作品集网站',
      description: '响应式设计师作品集网站模板',
      type: ResourceType.PRACTICE,
      url: 'https://github.com/newenergycoder/designer-portfolio',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 20,
      isFree: true,
      language: 'zh',
      tags: ['Web设计', 'HTML', 'CSS', 'JavaScript', '响应式'],
      techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
      lastUpdated: '2024-02-22'
    }
  ]
};

/**
 * 开发工具资源分类
 */
const toolsCategory: TrainingCategory = {
  id: 'development-tools',
  name: '开发工具',
  description: '提高开发效率的工具和软件',
  icon: 'Wrench',
  recommendationLevel: 4,
  resources: [
    {
      id: 'stm32cubeide',
      title: 'STM32CubeIDE开发环境',
      description: 'STM32官方集成开发环境',
      type: ResourceType.TOOL,
      url: 'https://www.st.com/en/development-tools/stm32cubeide.html',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 5,
      isFree: true,
      language: 'en',
      tags: ['STM32', 'IDE', '嵌入式开发', '调试'],
      techStack: ['STM32', 'C', 'Eclipse'],
      lastUpdated: '2024-03-01'
    },
    {
      id: 'qt-creator',
      title: 'Qt Creator IDE',
      description: 'Qt官方集成开发环境',
      type: ResourceType.TOOL,
      url: 'https://www.qt.io/product/development-tools',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 3,
      isFree: true,
      language: 'en',
      tags: ['Qt', 'IDE', 'C++', 'GUI开发'],
      techStack: ['Qt', 'C++'],
      lastUpdated: '2024-02-28'
    },
    {
      id: 'visual-studio',
      title: 'Visual Studio Community',
      description: 'Microsoft免费的集成开发环境',
      type: ResourceType.TOOL,
      url: 'https://visualstudio.microsoft.com/vs/community/',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 4,
      isFree: true,
      language: 'en',
      tags: ['Visual Studio', 'C#', 'C++', 'Windows开发'],
      techStack: ['C#', 'C++', '.NET', 'MFC'],
      lastUpdated: '2024-03-01'
    },
    {
      id: 'figma-design-tool',
      title: 'Figma设计工具',
      description: '现代化的协作设计工具',
      type: ResourceType.TOOL,
      url: 'https://www.figma.com/',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 2,
      isFree: true,
      language: 'en',
      tags: ['Figma', 'UI设计', '原型设计', '协作'],
      techStack: ['设计工具'],
      lastUpdated: '2024-02-25'
    }
  ]
};

/**
 * 书籍资源分类
 */
const booksCategory: TrainingCategory = {
  id: 'books',
  name: '推荐书籍',
  description: '经典技术书籍和参考资料',
  icon: 'Book',
  recommendationLevel: 4,
  resources: [
    {
      id: 'embedded-c-book',
      title: '嵌入式C语言程序设计',
      description: '嵌入式C语言编程经典教材',
      type: ResourceType.BOOK,
      url: 'https://book.douban.com/subject/1418906/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 80,
      isFree: false,
      language: 'zh',
      tags: ['C语言', '嵌入式', '程序设计'],
      techStack: ['C', '嵌入式系统'],
      lastUpdated: '2024-01-01'
    },
    {
      id: 'ucos-ii-book',
      title: 'uC/OS-II实时内核',
      description: 'Jean J. Labrosse的经典RTOS著作',
      type: ResourceType.BOOK,
      url: 'https://book.douban.com/subject/1229913/',
      difficulty: DifficultyLevel.HARD,
      estimatedHours: 100,
      isFree: false,
      language: 'zh',
      tags: ['uC/OS-II', 'RTOS', '实时系统', '经典教材'],
      techStack: ['uC/OS-II', 'C'],
      lastUpdated: '2024-01-01'
    },
    {
      id: 'fem-book',
      title: '有限元方法基础',
      description: '有限元理论与工程应用',
      type: ResourceType.BOOK,
      url: 'https://book.douban.com/subject/1052425/',
      difficulty: DifficultyLevel.HARD,
      estimatedHours: 120,
      isFree: false,
      language: 'zh',
      tags: ['有限元', '数值分析', '工程计算'],
      techStack: ['数学', '力学', 'MATLAB'],
      lastUpdated: '2024-01-01'
    },
    {
      id: 'design-patterns-book',
      title: '设计模式：可复用面向对象软件的基础',
      description: 'GoF经典设计模式书籍',
      type: ResourceType.BOOK,
      url: 'https://book.douban.com/subject/1052241/',
      difficulty: DifficultyLevel.HARD,
      estimatedHours: 90,
      isFree: false,
      language: 'zh',
      tags: ['设计模式', '面向对象', '软件架构'],
      techStack: ['C++', 'Java', '软件设计'],
      lastUpdated: '2024-01-01'
    }
  ]
};

/**
 * 在线课程资源分类
 */
const coursesCategory: TrainingCategory = {
  id: 'online-courses',
  name: '在线课程',
  description: '系统性的在线学习课程',
  icon: 'GraduationCap',
  recommendationLevel: 4,
  resources: [
    {
      id: 'coursera-embedded',
      title: 'Coursera嵌入式系统专项课程',
      description: '科罗拉多大学的嵌入式系统专项课程',
      type: ResourceType.COURSE,
      url: 'https://www.coursera.org/specializations/embedded-systems',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 120,
      isFree: false,
      language: 'en',
      tags: ['嵌入式系统', 'Coursera', '大学课程'],
      techStack: ['C', '嵌入式系统', 'ARM'],
      lastUpdated: '2024-02-01'
    },
    {
      id: 'udemy-qt-course',
      title: 'Udemy Qt开发完整课程',
      description: 'Qt从入门到高级的完整在线课程',
      type: ResourceType.COURSE,
      url: 'https://www.udemy.com/course/qt-c-gui-development-for-beginners/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 80,
      isFree: false,
      language: 'en',
      tags: ['Qt', 'C++', 'GUI', 'Udemy'],
      techStack: ['Qt', 'C++'],
      lastUpdated: '2024-02-10'
    },
    {
      id: 'google-ux-course',
      title: 'Google UX设计证书课程',
      description: 'Google官方的UX设计专业证书课程',
      type: ResourceType.COURSE,
      url: 'https://www.coursera.org/professional-certificates/google-ux-design',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 150,
      isFree: false,
      language: 'en',
      tags: ['UX设计', 'Google', '证书课程', 'Coursera'],
      techStack: ['Figma', 'Adobe XD', '用户研究'],
      lastUpdated: '2024-02-15'
    }
  ]
};

/**
 * 社区资源分类
 */
const communityCategory: TrainingCategory = {
  id: 'community-resources',
  name: '社区资源',
  description: '开发者社区和论坛资源',
  icon: 'Users',
  recommendationLevel: 3,
  resources: [
    {
      id: 'freertos-forum',
      title: 'FreeRTOS官方论坛',
      description: 'FreeRTOS开发者社区和技术支持',
      type: ResourceType.COMMUNITY,
      url: 'https://forums.freertos.org/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 10,
      isFree: true,
      language: 'en',
      tags: ['FreeRTOS', '论坛', '技术支持', '社区'],
      techStack: ['FreeRTOS'],
      lastUpdated: '2024-03-01'
    },
    {
      id: 'qt-forum',
      title: 'Qt开发者论坛',
      description: 'Qt官方开发者社区',
      type: ResourceType.COMMUNITY,
      url: 'https://forum.qt.io/',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 8,
      isFree: true,
      language: 'en',
      tags: ['Qt', '论坛', '开发者社区'],
      techStack: ['Qt', 'C++'],
      lastUpdated: '2024-02-28'
    },
    {
      id: 'designer-hangout',
      title: 'Designer Hangout Slack',
      description: '全球设计师交流社区',
      type: ResourceType.COMMUNITY,
      url: 'https://designerhangout.co/',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 5,
      isFree: true,
      language: 'en',
      tags: ['设计师', 'Slack', '社区', '交流'],
      techStack: ['设计工具'],
      lastUpdated: '2024-02-20'
    },
    {
      id: 'csdn-embedded',
      title: 'CSDN嵌入式开发社区',
      description: '中文嵌入式开发技术社区',
      type: ResourceType.COMMUNITY,
      url: 'https://blog.csdn.net/nav/embedded',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 6,
      isFree: true,
      language: 'zh',
      tags: ['CSDN', '嵌入式', '中文社区', '技术博客'],
      techStack: ['嵌入式系统', 'C', 'STM32'],
      lastUpdated: '2024-02-25'
    }
  ]
};

// 导出所有培训资源分类
export const trainingCategories: TrainingCategory[] = [
  documentationCategory,
  videoCategory,
  practiceCategory,
  toolsCategory,
  booksCategory,
  coursesCategory,
  communityCategory
];

/**
 * 快速上手指南数据
 */
export const quickStartGuides: QuickStartGuide[] = [
  {
    id: 'embedded-quick-start',
    direction: TechDirection.EMBEDDED,
    title: '嵌入式开发快速上手',
    description: '30分钟快速体验嵌入式开发流程',
    quickSteps: [
      {
        title: '安装开发环境',
        description: '下载并安装STM32CubeIDE开发环境',
        estimatedMinutes: 10,
        links: [
          {
            title: 'STM32CubeIDE下载',
            url: 'https://www.st.com/en/development-tools/stm32cubeide.html'
          }
        ]
      },
      {
        title: '创建第一个项目',
        description: '使用CubeMX创建LED闪烁项目',
        estimatedMinutes: 8,
        links: [
          {
            title: 'STM32CubeMX教程',
            url: 'https://wiki.st.com/stm32mcu/wiki/STM32CubeMX_introduction'
          }
        ]
      },
      {
        title: '编译和下载',
        description: '编译代码并下载到开发板',
        estimatedMinutes: 5,
      },
      {
        title: '调试和验证',
        description: '使用调试器验证程序运行',
        estimatedMinutes: 7,
      }
    ],
    requirements: {
      os: ['Windows 10+', 'macOS 10.14+', 'Ubuntu 18.04+'],
      software: ['STM32CubeIDE', 'ST-Link驱动'],
      hardware: ['STM32开发板', 'ST-Link调试器', 'USB线']
    },
    firstProjectSuggestion: {
      title: 'LED流水灯控制',
      description: '通过定时器控制多个LED按顺序闪烁',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 2,
      githubUrl: 'https://github.com/newenergycoder/stm32-led-demo'
    }
  },
  {
    id: 'mechanical-quick-start',
    direction: TechDirection.MECHANICAL,
    title: '机械算法快速入门',
    description: '45分钟体验MATLAB数值计算',
    quickSteps: [
      {
        title: '安装MATLAB',
        description: '安装MATLAB软件和必要工具箱',
        estimatedMinutes: 15,
        links: [
          {
            title: 'MATLAB学生版',
            url: 'https://www.mathworks.com/products/matlab/student.html'
          }
        ]
      },
      {
        title: '学习基本语法',
        description: '掌握MATLAB基本操作和矩阵运算',
        estimatedMinutes: 15,
      },
      {
        title: '简单仿真实例',
        description: '创建简单的弹簧-质量-阻尼系统仿真',
        estimatedMinutes: 10,
      },
      {
        title: '结果可视化',
        description: '使用plot函数绘制仿真结果',
        estimatedMinutes: 5,
      }
    ],
    requirements: {
      os: ['Windows 10+', 'macOS 10.15+', 'Linux'],
      software: ['MATLAB R2020b+', 'Simulink'],
      hardware: ['4GB+ RAM', '足够的磁盘空间']
    },
    firstProjectSuggestion: {
      title: '悬臂梁振动分析',
      description: '使用有限元方法分析悬臂梁的自由振动',
      difficulty: DifficultyLevel.MEDIUM,
      estimatedHours: 4,
      githubUrl: 'https://github.com/newenergycoder/beam-vibration-analysis'
    }
  },
  {
    id: 'design-quick-start',
    direction: TechDirection.DESIGN,
    title: '设计师技能快速体验',
    description: '20分钟创建你的第一个界面设计',
    quickSteps: [
      {
        title: '注册Figma账号',
        description: '创建免费的Figma账号并熟悉界面',
        estimatedMinutes: 5,
        links: [
          {
            title: 'Figma注册',
            url: 'https://www.figma.com/signup'
          }
        ]
      },
      {
        title: '学习基本工具',
        description: '掌握矩形、文本、颜色等基本设计工具',
        estimatedMinutes: 8,
      },
      {
        title: '创建移动应用界面',
        description: '设计一个简单的登录界面',
        estimatedMinutes: 5,
      },
      {
        title: '添加交互原型',
        description: '为界面添加简单的点击交互',
        estimatedMinutes: 2,
      }
    ],
    requirements: {
      os: ['任何支持现代浏览器的系统'],
      software: ['Chrome/Firefox/Safari浏览器', 'Figma桌面应用(可选)'],
      hardware: ['稳定的网络连接']
    },
    firstProjectSuggestion: {
      title: '天气应用界面设计',
      description: '设计一个现代化的天气预报应用界面',
      difficulty: DifficultyLevel.EASY,
      estimatedHours: 3,
      githubUrl: 'https://github.com/newenergycoder/weather-app-design'
    }
  }
];

// 工具函数：根据技术方向获取相关资源
export const getResourcesByDirection = (direction: TechDirection): LearningResource[] => {
  const allResources = trainingCategories.flatMap(category => category.resources);
  return allResources.filter(resource => 
    resource.tags.some(tag => {
      switch (direction) {
        case TechDirection.EMBEDDED:
          return ['嵌入式', 'STM32', 'FreeRTOS', 'uC/OS-II', 'C语言', 'IoT'].includes(tag);
        case TechDirection.MECHANICAL:
          return ['MATLAB', 'ANSYS', '有限元', 'CAD', '仿真', '数值计算'].includes(tag);
        case TechDirection.DESIGN:
          return ['UI设计', 'UX设计', 'Figma', 'Qt', 'WinForm', 'MFC'].includes(tag);
        default:
          return false;
      }
    })
  );
};

// 工具函数：根据资源类型获取资源
export const getResourcesByType = (type: ResourceType): LearningResource[] => {
  const allResources = trainingCategories.flatMap(category => category.resources);
  return allResources.filter(resource => resource.type === type);
};

// 工具函数：根据难度获取资源
export const getResourcesByDifficulty = (difficulty: DifficultyLevel): LearningResource[] => {
  const allResources = trainingCategories.flatMap(category => category.resources);
  return allResources.filter(resource => resource.difficulty === difficulty);
};

// 工具函数：获取免费资源
export const getFreeResources = (): LearningResource[] => {
  const allResources = trainingCategories.flatMap(category => category.resources);
  return allResources.filter(resource => resource.isFree);
};

// 工具函数：根据语言获取资源
export const getResourcesByLanguage = (language: 'zh' | 'en' | 'both'): LearningResource[] => {
  const allResources = trainingCategories.flatMap(category => category.resources);
  return allResources.filter(resource => 
    language === 'both' || resource.language === language
  );
};