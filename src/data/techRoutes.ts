// 技术路线数据定义
// 包含嵌入式、机械算法、设计师三个方向的完整学习路径

import {
  TechRoute,
  TechDirection,
  LearningStage,
  ResourceType,
  DifficultyLevel,
  LearningStep,
  LearningResource
} from '../types/learning';

/**
 * 嵌入式系统学习路线
 * 包含FreeRTOS和uC/OS-II实时操作系统的完整学习路径
 * 参考Linux系统学习路线结构，提供系统性的阶段化学习
 */
const embeddedRoute: TechRoute = {
  id: 'embedded-systems',
  direction: TechDirection.EMBEDDED,
  title: '嵌入式系统开发',
  description: '从基础硬件到实时操作系统的完整嵌入式开发学习路径',
  detailedDescription: '本路线将带你从嵌入式基础知识开始，逐步掌握ARM Cortex架构、实时操作系统(FreeRTOS/uC/OS-II)、IoT开发等核心技能。课程设计参考了Linux系统学习的渐进式结构，确保学习的系统性和连贯性。适合想要进入嵌入式行业或提升相关技能的开发者。',
  icon: 'Cpu',
  color: 'text-blue-600',
  totalEstimatedMonths: 10,
  coreTechnologies: ['C/C++', 'ARM Cortex', 'FreeRTOS', 'uC/OS-II', 'UART/SPI/I2C', 'IoT协议', 'RTOS内核', '嵌入式Linux'],
  careerPaths: ['嵌入式软件工程师', 'IoT开发工程师', '固件工程师', 'RTOS系统工程师', '嵌入式系统架构师'],
  salaryRange: {
    min: 10000,
    max: 35000,
    currency: 'CNY'
  },
  marketDemand: 5,
  learningDifficulty: 4,
  targetAudience: ['计算机专业学生', '电子工程师', '想转型的软件工程师', '物联网开发者'],
  steps: [
    {
      id: 'embedded-basics',
      title: 'C语言基础与硬件入门',
      description: '掌握C语言编程和基础硬件知识',
      stage: LearningStage.BEGINNER,
      order: 1,
      estimatedDays: 21,
      objectives: [
        '熟练掌握C语言指针和内存管理',
        '理解数字电路和模拟电路基础',
        '掌握基本的调试技巧'
      ],
      resources: [
        {
          id: 'c-programming-guide',
          title: 'C语言程序设计',
          description: '嵌入式C语言编程基础教程',
          type: ResourceType.DOCUMENTATION,
          url: 'https://www.runoob.com/cprogramming/c-tutorial.html',
          difficulty: DifficultyLevel.EASY,
          estimatedHours: 40,
          isFree: true,
          language: 'zh',
          tags: ['C语言', '基础编程'],
          techStack: ['C'],
          lastUpdated: '2024-01-15'
        }
      ],
      checkpoints: [
        '能够编写基本的C程序',
        '理解指针和内存分配',
        '掌握基本的硬件接口概念'
      ],
      isOptional: false
    },
    {
      id: 'microcontroller-basics',
      title: '单片机基础开发',
      description: '学习STM32等主流单片机的基础开发',
      stage: LearningStage.BEGINNER,
      order: 2,
      estimatedDays: 28,
      objectives: [
        '掌握STM32开发环境搭建',
        '理解GPIO、定时器、中断等基础外设',
        '能够完成简单的硬件控制项目'
      ],
      resources: [
        {
          id: 'stm32-tutorial',
          title: 'STM32入门教程',
          description: 'STM32单片机从入门到精通',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1th411z7sn',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 60,
          isFree: true,
          language: 'zh',
          tags: ['STM32', '单片机', 'HAL库'],
          techStack: ['STM32', 'C'],
          lastUpdated: '2024-02-01'
        }
      ],
      checkpoints: [
        '能够配置STM32开发环境',
        '掌握基本外设的使用',
        '完成LED控制、按键检测等基础项目'
      ],
      prerequisites: ['embedded-basics'],
      isOptional: false
    },
    {
      id: 'communication-protocols',
      title: '通信协议与接口',
      description: '掌握UART、SPI、I2C等常用通信协议',
      stage: LearningStage.INTERMEDIATE,
      order: 3,
      estimatedDays: 21,
      objectives: [
        '理解串行通信原理',
        '掌握UART、SPI、I2C协议的使用',
        '能够进行多设备通信开发'
      ],
      resources: [
        {
          id: 'communication-protocols-guide',
          title: '嵌入式通信协议详解',
          description: '详细讲解各种通信协议的原理和应用',
          type: ResourceType.DOCUMENTATION,
          url: 'https://blog.csdn.net/weixin_42031299/article/details/123456789',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 30,
          isFree: true,
          language: 'zh',
          tags: ['UART', 'SPI', 'I2C', '通信协议'],
          techStack: ['STM32', 'C'],
          lastUpdated: '2024-01-20'
        }
      ],
      checkpoints: [
        '理解各种通信协议的特点',
        '能够配置和使用UART、SPI、I2C',
        '完成传感器数据采集项目'
      ],
      prerequisites: ['microcontroller-basics'],
      isOptional: false
    },
    {
      id: 'freertos-basics',
      title: 'FreeRTOS实时操作系统基础',
      description: '深入学习FreeRTOS实时操作系统的核心概念和基础应用',
      stage: LearningStage.INTERMEDIATE,
      order: 4,
      estimatedDays: 42,
      objectives: [
        '理解实时操作系统的概念、特性和应用场景',
        '掌握FreeRTOS的任务管理、调度算法和优先级机制',
        '学会使用信号量、互斥量、队列等同步通信机制',
        '掌握FreeRTOS的内存管理和定时器使用',
        '能够进行FreeRTOS的配置和移植'
      ],
      resources: [
        {
          id: 'freertos-tutorial',
          title: 'FreeRTOS实战教程',
          description: 'FreeRTOS从基础到高级应用的完整视频教程',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1bh411S7E3',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 60,
          isFree: true,
          language: 'zh',
          tags: ['FreeRTOS', 'RTOS', '实时系统', '任务管理'],
          techStack: ['FreeRTOS', 'STM32', 'C'],
          lastUpdated: '2024-02-15'
        },
        {
          id: 'freertos-official-docs',
          title: 'FreeRTOS官方文档',
          description: 'FreeRTOS官方开发文档和完整API参考手册',
          type: ResourceType.DOCUMENTATION,
          url: 'https://www.freertos.org/Documentation/RTOS_book.html',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 50,
          isFree: true,
          language: 'en',
          tags: ['FreeRTOS', '官方文档', 'API', '参考手册'],
          techStack: ['FreeRTOS'],
          lastUpdated: '2024-03-01'
        },
        {
          id: 'freertos-kernel-guide',
          title: 'FreeRTOS内核开发指南',
          description: 'FreeRTOS内核原理和高级特性详解',
          type: ResourceType.BOOK,
          url: 'https://www.freertos.org/fr-content-src/uploads/2018/07/161204_Mastering_the_FreeRTOS_Real_Time_Kernel-A_Hands-On_Tutorial_Guide.pdf',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 80,
          isFree: true,
          language: 'en',
          tags: ['FreeRTOS', '内核原理', '高级特性', '官方教程'],
          techStack: ['FreeRTOS', 'C'],
          lastUpdated: '2024-03-10'
        },
        {
          id: 'freertos-stm32-practice',
          title: 'STM32+FreeRTOS实践项目',
          description: '基于STM32的FreeRTOS实际项目开发案例',
          type: ResourceType.PRACTICE,
          url: 'https://github.com/FreeRTOS/FreeRTOS-Kernel',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 40,
          isFree: true,
          language: 'en',
          tags: ['FreeRTOS', 'STM32', '实践项目', '源码'],
          techStack: ['FreeRTOS', 'STM32', 'C', 'CubeMX'],
          lastUpdated: '2024-03-15'
        }
      ],
      practiceProjects: [
        '多任务LED控制系统',
        '基于队列的传感器数据采集',
        '信号量控制的资源共享系统',
        '软件定时器应用项目'
      ],
      checkpoints: [
        '理解RTOS的基本概念和调度原理',
        '能够创建、删除和管理FreeRTOS任务',
        '掌握任务间通信和同步机制的使用',
        '理解FreeRTOS的内存管理策略',
        '能够配置FreeRTOS并移植到不同平台',
        '完成多任务协作的嵌入式项目'
      ],
      prerequisites: ['communication-protocols'],
      isOptional: false
    },
    {
      id: 'ucos-ii-advanced',
      title: 'uC/OS-II实时操作系统深入应用',
      description: '深入学习uC/OS-II实时操作系统的高级特性和企业级应用',
      stage: LearningStage.ADVANCED,
      order: 5,
      estimatedDays: 35,
      objectives: [
        '深入理解uC/OS-II的内核架构和设计哲学',
        '掌握uC/OS-II的移植方法和平台适配',
        '学会uC/OS-II的高级调试和性能优化技巧',
        '理解uC/OS-II与FreeRTOS的技术差异和应用选择',
        '掌握uC/OS-II在商业项目中的应用实践'
      ],
      resources: [
        {
          id: 'ucos-ii-book',
          title: 'uC/OS-II实时内核',
          description: 'Jean J. Labrosse经典著作中文版 - RTOS领域的权威教材',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/1229913/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 100,
          isFree: false,
          language: 'zh',
          tags: ['uC/OS-II', 'RTOS', '经典教材', '内核设计'],
          techStack: ['uC/OS-II', 'C'],
          lastUpdated: '2024-01-01'
        },
        {
          id: 'ucos-ii-porting',
          title: 'uC/OS-II移植实战',
          description: 'uC/OS-II在ARM、x86等不同平台的移植方法和实践',
          type: ResourceType.PRACTICE,
          url: 'https://github.com/weston-embedded/uC-OS2',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 70,
          isFree: true,
          language: 'en',
          tags: ['uC/OS-II', '移植', '实战', '多平台'],
          techStack: ['uC/OS-II', 'ARM', 'x86'],
          lastUpdated: '2024-02-20'
        },
        {
          id: 'ucos-ii-vs-freertos',
          title: 'uC/OS-II与FreeRTOS对比分析',
          description: '两大主流RTOS的技术对比和应用场景分析',
          type: ResourceType.DOCUMENTATION,
          url: 'https://www.embedded.com/rtos-comparison-freertos-vs-ucos/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 20,
          isFree: true,
          language: 'en',
          tags: ['uC/OS-II', 'FreeRTOS', '对比分析', 'RTOS选型'],
          techStack: ['uC/OS-II', 'FreeRTOS'],
          lastUpdated: '2024-03-01'
        },
        {
          id: 'ucos-ii-commercial-projects',
          title: 'uC/OS-II商业项目案例',
          description: 'uC/OS-II在工业控制、医疗设备等领域的应用案例',
          type: ResourceType.PRACTICE,
          url: 'https://www.micrium.com/rtos/kernels/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 50,
          isFree: false,
          language: 'en',
          tags: ['uC/OS-II', '商业应用', '工业控制', '案例分析'],
          techStack: ['uC/OS-II', 'C', '工业协议'],
          lastUpdated: '2024-03-10'
        }
      ],
      practiceProjects: [
        'uC/OS-II内核移植到STM32项目',
        '基于uC/OS-II的工业数据采集系统',
        'uC/OS-II性能测试和优化项目',
        '多任务实时控制系统设计'
      ],
      checkpoints: [
        '深入理解uC/OS-II的内核架构和调度机制',
        '能够独立完成uC/OS-II的平台移植',
        '掌握uC/OS-II的高级调试和性能分析技巧',
        '理解uC/OS-II与FreeRTOS的技术差异和选择标准',
        '能够在商业项目中合理应用uC/OS-II',
        '完成复杂的多任务实时系统项目'
      ],
      prerequisites: ['freertos-basics'],
      isOptional: true
    },
    {
      id: 'iot-development',
      title: 'IoT物联网开发',
      description: '学习物联网协议和云端连接',
      stage: LearningStage.ADVANCED,
      order: 6,
      estimatedDays: 42,
      objectives: [
        '掌握WiFi、蓝牙等无线通信',
        '学习MQTT、CoAP等IoT协议',
        '实现设备与云平台的连接'
      ],
      resources: [
        {
          id: 'esp32-iot-tutorial',
          title: 'ESP32物联网开发',
          description: '基于ESP32的IoT项目开发教程',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1Lh411D7hP',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 45,
          isFree: true,
          language: 'zh',
          tags: ['ESP32', 'IoT', 'WiFi', 'MQTT'],
          techStack: ['ESP32', 'Arduino', 'C++'],
          lastUpdated: '2024-03-10'
        }
      ],
      checkpoints: [
        '能够使用ESP32进行WiFi连接',
        '掌握MQTT协议的使用',
        '完成端到端的IoT项目',
        '理解IoT安全基础'
      ],
      prerequisites: ['freertos-basics'],
      isOptional: false
    }
  ],
  lastUpdated: '2024-03-15'
};

/**
 * 机械算法学习路线
 * 包含有限元分析、CAD算法、控制系统等
 */
const mechanicalRoute: TechRoute = {
  id: 'mechanical-algorithms',
  direction: TechDirection.MECHANICAL,
  title: '机械算法工程',
  description: '掌握机械工程中的算法设计、数值计算和仿真技术',
  detailedDescription: '本路线专注于机械工程领域的算法应用，包括有限元分析、CAD算法开发、控制系统设计、仿真建模等核心技能。适合机械工程专业学生和想要提升算法能力的工程师。',
  icon: 'Settings',
  color: 'text-green-600',
  totalEstimatedMonths: 10,
  coreTechnologies: ['MATLAB', 'Python', 'C++', 'SolidWorks API', 'ANSYS', '控制理论'],
  careerPaths: ['算法工程师', 'CAD开发工程师', '仿真工程师', '控制系统工程师'],
  salaryRange: {
    min: 10000,
    max: 30000,
    currency: 'CNY'
  },
  marketDemand: 3,
  learningDifficulty: 4,
  targetAudience: ['机械工程专业学生', 'CAD软件开发者', '仿真工程师'],
  steps: [
    {
      id: 'math-foundations',
      title: '数学基础与编程入门',
      description: '掌握线性代数、微积分和编程基础',
      stage: LearningStage.BEGINNER,
      order: 1,
      estimatedDays: 35,
      objectives: [
        '掌握线性代数和微积分基础',
        '学会MATLAB/Python编程',
        '理解数值计算方法'
      ],
      resources: [
        {
          id: 'matlab-basics',
          title: 'MATLAB基础教程',
          description: 'MATLAB编程从入门到精通',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1DA411Y7bN',
          difficulty: DifficultyLevel.EASY,
          estimatedHours: 30,
          isFree: true,
          language: 'zh',
          tags: ['MATLAB', '编程基础', '数值计算'],
          techStack: ['MATLAB'],
          lastUpdated: '2024-01-10'
        }
      ],
      checkpoints: [
        '能够使用MATLAB进行基本计算',
        '掌握矩阵运算和函数编写',
        '理解数值方法的基本概念'
      ],
      isOptional: false
    },
    {
      id: 'cad-algorithms',
      title: 'CAD算法基础',
      description: '学习几何建模和CAD算法原理',
      stage: LearningStage.INTERMEDIATE,
      order: 2,
      estimatedDays: 42,
      objectives: [
        '理解几何建模的数学原理',
        '掌握NURBS曲线曲面算法',
        '学会CAD软件二次开发'
      ],
      resources: [
        {
          id: 'cad-algorithm-book',
          title: '计算机辅助几何设计',
          description: 'CAD几何算法经典教材',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/1418906/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 100,
          isFree: false,
          language: 'zh',
          tags: ['CAD', '几何算法', 'NURBS'],
          techStack: ['数学', '算法'],
          lastUpdated: '2024-01-01'
        },
        {
          id: 'solidworks-api',
          title: 'SolidWorks API开发',
          description: 'SolidWorks二次开发教程',
          type: ResourceType.PRACTICE,
          url: 'https://help.solidworks.com/2024/english/api/sldworksapi/Welcome.html',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 60,
          isFree: true,
          language: 'en',
          tags: ['SolidWorks', 'API', '二次开发'],
          techStack: ['C#', 'VB.NET', 'C++'],
          lastUpdated: '2024-02-01'
        }
      ],
      checkpoints: [
        '理解NURBS数学原理',
        '能够实现基本的几何算法',
        '掌握CAD软件API使用',
        '完成简单的CAD插件开发'
      ],
      prerequisites: ['math-foundations'],
      isOptional: false
    },
    {
      id: 'fem-analysis',
      title: '有限元分析方法',
      description: '学习有限元理论和ANSYS仿真',
      stage: LearningStage.ADVANCED,
      order: 3,
      estimatedDays: 49,
      objectives: [
        '掌握有限元理论基础',
        '学会使用ANSYS进行仿真',
        '能够编写有限元求解程序'
      ],
      resources: [
        {
          id: 'fem-theory',
          title: '有限元方法基础',
          description: '有限元理论与应用',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/1052425/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 120,
          isFree: false,
          language: 'zh',
          tags: ['有限元', '数值分析', '理论'],
          techStack: ['数学', '力学'],
          lastUpdated: '2024-01-01'
        },
        {
          id: 'ansys-tutorial',
          title: 'ANSYS仿真教程',
          description: 'ANSYS Workbench从入门到精通',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1Jh411n7kj',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 80,
          isFree: true,
          language: 'zh',
          tags: ['ANSYS', '仿真', 'Workbench'],
          techStack: ['ANSYS'],
          lastUpdated: '2024-02-15'
        }
      ],
      checkpoints: [
        '理解有限元基本原理',
        '能够使用ANSYS进行结构分析',
        '掌握网格划分和边界条件设置',
        '完成复杂的仿真项目'
      ],
      prerequisites: ['cad-algorithms'],
      isOptional: false
    },
    {
      id: 'control-systems',
      title: '控制系统设计',
      description: '学习控制理论和系统设计',
      stage: LearningStage.ADVANCED,
      order: 4,
      estimatedDays: 35,
      objectives: [
        '掌握经典控制理论',
        '学会现代控制方法',
        '能够设计控制系统'
      ],
      resources: [
        {
          id: 'control-theory',
          title: '自动控制原理',
          description: '控制理论基础教程',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/2034925/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 90,
          isFree: false,
          language: 'zh',
          tags: ['控制理论', '自动控制', '系统设计'],
          techStack: ['MATLAB', 'Simulink'],
          lastUpdated: '2024-01-01'
        }
      ],
      checkpoints: [
        '理解控制系统基本概念',
        '掌握PID控制器设计',
        '能够进行系统稳定性分析',
        '完成控制系统仿真项目'
      ],
      prerequisites: ['fem-analysis'],
      isOptional: false
    }
  ],
  lastUpdated: '2024-03-15'
};

/**
 * 设计师学习路线
 * 包含Qt、WinForm、MFC等图形界面技术
 */
const designRoute: TechRoute = {
  id: 'ui-ux-design',
  direction: TechDirection.DESIGN,
  title: '设计师技术路线',
  description: '学习UI/UX设计和现代图形界面开发技术',
  detailedDescription: '本路线结合设计理论与技术实现，涵盖UI/UX设计原则、Qt跨平台开发、Windows桌面应用开发(WinForm/MFC)等技能。适合想要成为全栈设计师或掌握界面开发技术的学习者。',
  icon: 'Palette',
  color: 'text-purple-600',
  totalEstimatedMonths: 7,
  coreTechnologies: ['Figma', 'Qt', 'C#', 'WinForm', 'MFC', 'HTML/CSS', 'JavaScript'],
  careerPaths: ['UI/UX设计师', '前端开发工程师', '桌面应用开发工程师', '产品设计师'],
  salaryRange: {
    min: 8000,
    max: 28000,
    currency: 'CNY'
  },
  marketDemand: 5,
  learningDifficulty: 3,
  targetAudience: ['设计专业学生', '前端开发者', '想转型的程序员'],
  steps: [
    {
      id: 'design-fundamentals',
      title: 'UI/UX设计基础',
      description: '学习设计原理和用户体验基础',
      stage: LearningStage.BEGINNER,
      order: 1,
      estimatedDays: 28,
      objectives: [
        '掌握设计基本原理和色彩理论',
        '理解用户体验设计流程',
        '学会使用Figma等设计工具'
      ],
      resources: [
        {
          id: 'ui-ux-basics',
          title: 'UI/UX设计入门',
          description: '从零开始学习UI/UX设计',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1Gh411n7VK',
          difficulty: DifficultyLevel.EASY,
          estimatedHours: 40,
          isFree: true,
          language: 'zh',
          tags: ['UI设计', 'UX设计', 'Figma'],
          techStack: ['Figma', 'Sketch'],
          lastUpdated: '2024-02-01'
        },
        {
          id: 'figma-tutorial',
          title: 'Figma完全指南',
          description: 'Figma从基础到高级应用',
          type: ResourceType.COURSE,
          url: 'https://www.figma.com/academy/',
          difficulty: DifficultyLevel.EASY,
          estimatedHours: 25,
          isFree: true,
          language: 'en',
          tags: ['Figma', '设计工具', '原型设计'],
          techStack: ['Figma'],
          lastUpdated: '2024-03-01'
        }
      ],
      checkpoints: [
        '理解设计基本原理',
        '能够使用Figma创建界面设计',
        '掌握用户研究基础方法',
        '完成移动应用界面设计'
      ],
      isOptional: false
    },
    {
      id: 'web-frontend',
      title: 'Web前端开发',
      description: '学习HTML、CSS、JavaScript基础',
      stage: LearningStage.BEGINNER,
      order: 2,
      estimatedDays: 35,
      objectives: [
        '掌握HTML5和CSS3',
        '学会JavaScript编程',
        '理解响应式设计原理'
      ],
      resources: [
        {
          id: 'html-css-js',
          title: 'Web前端三剑客',
          description: 'HTML、CSS、JavaScript从入门到精通',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1Kg411T7t9',
          difficulty: DifficultyLevel.EASY,
          estimatedHours: 60,
          isFree: true,
          language: 'zh',
          tags: ['HTML', 'CSS', 'JavaScript', '前端'],
          techStack: ['HTML', 'CSS', 'JavaScript'],
          lastUpdated: '2024-02-10'
        }
      ],
      checkpoints: [
        '能够编写语义化的HTML',
        '掌握CSS布局和动画',
        '理解JavaScript基础语法',
        '完成响应式网页项目'
      ],
      prerequisites: ['design-fundamentals'],
      isOptional: false
    },
    {
      id: 'qt-development',
      title: 'Qt跨平台GUI开发框架',
      description: '深入学习Qt框架进行跨平台GUI应用开发，掌握现代C++图形界面编程',
      stage: LearningStage.INTERMEDIATE,
      order: 3,
      estimatedDays: 42,
      objectives: [
        '深入理解Qt框架的架构和设计模式',
        '掌握Qt Creator IDE和Qt Designer的使用',
        '学会Qt信号槽机制和事件处理系统',
        '掌握Qt的MVC架构和数据绑定',
        '学会Qt网络编程和多线程开发',
        '理解Qt在不同平台的部署和打包'
      ],
      resources: [
        {
          id: 'qt-tutorial',
          title: 'Qt开发教程',
          description: 'Qt从入门到实战项目开发',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1g4411H78N',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 80,
          isFree: true,
          language: 'zh',
          tags: ['Qt', 'C++', 'GUI', '跨平台'],
          techStack: ['Qt', 'C++'],
          lastUpdated: '2024-02-20'
        },
        {
          id: 'qt-official-docs',
          title: 'Qt官方文档',
          description: 'Qt框架官方开发文档',
          type: ResourceType.DOCUMENTATION,
          url: 'https://doc.qt.io/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 50,
          isFree: true,
          language: 'en',
          tags: ['Qt', '官方文档', 'API'],
          techStack: ['Qt'],
          lastUpdated: '2024-03-01'
        },
        {
          id: 'qt-book-chinese',
          title: 'Qt 6 C++开发指南',
          description: '全面介绍Qt 6框架的中文权威教材',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/35194517/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 80,
          isFree: false,
          language: 'zh',
          tags: ['Qt', 'C++', '中文教材', 'Qt6'],
          techStack: ['Qt', 'C++'],
          lastUpdated: '2024-02-01'
        },
        {
          id: 'qt-practical-projects',
          title: 'Qt实战项目集合',
          description: 'Qt开发的实际项目案例和源码分析',
          type: ResourceType.PRACTICE,
          url: 'https://github.com/topics/qt-application',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 60,
          isFree: true,
          language: 'en',
          tags: ['Qt', '实战项目', '开源项目', '案例分析'],
          techStack: ['Qt', 'C++', 'QML'],
          lastUpdated: '2024-03-01'
        }
      ],
      practiceProjects: [
        'Qt文本编辑器开发',
        '基于Qt的数据库管理工具',
        'Qt网络聊天应用程序',
        '跨平台媒体播放器开发'
      ],
      checkpoints: [
        '熟练使用Qt Creator和Qt Designer',
        '深入理解Qt信号槽机制和事件系统',
        '能够创建复杂的用户界面和自定义控件',
        '掌握Qt的MVC模式和数据处理',
        '实现Qt网络编程和多线程应用',
        '完成跨平台Qt应用的部署和发布'
      ],
      prerequisites: ['web-frontend'],
      isOptional: false
    },
    {
      id: 'winform-development',
      title: 'WinForm Windows桌面应用开发',
      description: '深入学习Windows Forms桌面应用开发，掌握.NET平台的传统GUI编程技术',
      stage: LearningStage.INTERMEDIATE,
      order: 4,
      estimatedDays: 35,
      objectives: [
        '深入理解WinForm框架架构和生命周期',
        '掌握WinForm丰富控件库的使用和自定义',
        '学会事件驱动编程和委托机制',
        '掌握WinForm数据绑定和ADO.NET集成',
        '学会WinForm多线程编程和异步操作',
        '理解WinForm与现代.NET技术的集成'
      ],
      resources: [
        {
          id: 'csharp-winform',
          title: 'C# WinForm开发',
          description: 'C# WinForm从基础到高级应用',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1FJ411W7e5',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 50,
          isFree: true,
          language: 'zh',
          tags: ['C#', 'WinForm', 'Windows', '桌面应用'],
          techStack: ['C#', '.NET Framework'],
          lastUpdated: '2024-02-15'
        },
        {
          id: 'winform-best-practices',
          title: 'WinForm最佳实践',
          description: 'WinForm开发的设计模式和最佳实践',
          type: ResourceType.DOCUMENTATION,
          url: 'https://docs.microsoft.com/en-us/dotnet/desktop/winforms/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 30,
          isFree: true,
          language: 'en',
          tags: ['WinForm', '最佳实践', 'Microsoft'],
          techStack: ['C#', 'WinForm'],
          lastUpdated: '2024-03-01'
        },
        {
          id: 'winform-book-chinese',
          title: 'C# WinForm应用程序设计',
          description: 'WinForm桌面应用开发的中文权威教材',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/26916804/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 70,
          isFree: false,
          language: 'zh',
          tags: ['WinForm', 'C#', '中文教材', '桌面开发'],
          techStack: ['C#', '.NET', 'WinForm'],
          lastUpdated: '2024-01-20'
        },
        {
          id: 'winform-advanced-techniques',
          title: 'WinForm高级编程技巧',
          description: 'WinForm自定义控件、GDI+绘图和高级特性',
          type: ResourceType.PRACTICE,
          url: 'https://github.com/topics/winforms',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 50,
          isFree: true,
          language: 'en',
          tags: ['WinForm', '高级编程', '自定义控件', 'GDI+'],
          techStack: ['C#', '.NET', 'GDI+'],
          lastUpdated: '2024-03-05'
        },
        {
          id: 'winform-database-integration',
          title: 'WinForm数据库应用开发',
          description: 'WinForm与SQL Server、Entity Framework的集成开发',
          type: ResourceType.PRACTICE,
          url: 'https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 40,
          isFree: true,
          language: 'en',
          tags: ['WinForm', '数据库', 'ADO.NET', 'Entity Framework'],
          techStack: ['C#', '.NET', 'SQL Server'],
          lastUpdated: '2024-02-28'
        }
      ],
      practiceProjects: [
        'WinForm文件管理器开发',
        '基于WinForm的进销存管理系统',
        'WinForm图像处理工具',
        '多线程下载管理器开发'
      ],
      checkpoints: [
        '深入理解WinForm框架架构和控件体系',
        '熟练使用WinForm常用控件和布局管理',
        '掌握事件处理、委托和多线程编程',
        '能够开发自定义控件和进行GDI+绘图',
        '掌握WinForm数据绑定和数据库集成',
        '完成复杂的企业级桌面应用项目'
      ],
      prerequisites: ['qt-development'],
      isOptional: false
    },
    {
      id: 'mfc-development',
      title: 'MFC Windows原生应用程序开发',
      description: '深入学习Microsoft Foundation Classes框架，掌握Windows原生C++桌面应用开发',
      stage: LearningStage.ADVANCED,
      order: 5,
      estimatedDays: 42,
      objectives: [
        '深入理解MFC框架架构和设计模式',
        '掌握MFC文档/视图架构和消息映射机制',
        '学会MFC界面设计和自定义控件开发',
        '掌握MFC多线程编程和COM组件集成',
        '学会MFC网络编程和数据库访问',
        '理解MFC与现代C++标准的结合使用'
      ],
      resources: [
        {
          id: 'mfc-tutorial',
          title: 'MFC编程教程',
          description: 'Microsoft官方Foundation Classes开发完整指南',
          type: ResourceType.DOCUMENTATION,
          url: 'https://docs.microsoft.com/en-us/cpp/mfc/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 60,
          isFree: true,
          language: 'en',
          tags: ['MFC', 'C++', 'Windows', '官方教程'],
          techStack: ['C++', 'MFC'],
          lastUpdated: '2024-03-10'
        },
        {
          id: 'mfc-book-chinese',
          title: 'Visual C++ MFC编程实例',
          description: 'MFC应用程序开发的中文权威教材和实例集合',
          type: ResourceType.BOOK,
          url: 'https://book.douban.com/subject/1231194/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 90,
          isFree: false,
          language: 'zh',
          tags: ['MFC', 'Visual C++', '中文教材', '实例教程'],
          techStack: ['C++', 'MFC', 'Visual Studio'],
          lastUpdated: '2024-01-15'
        },
        {
          id: 'mfc-advanced-programming',
          title: 'MFC高级编程技术',
          description: 'MFC高级特性、COM集成和性能优化技术',
          type: ResourceType.PRACTICE,
          url: 'https://github.com/Microsoft/VCSamples',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 70,
          isFree: true,
          language: 'en',
          tags: ['MFC', '高级编程', 'COM', '性能优化'],
          techStack: ['C++', 'MFC', 'COM', 'ATL'],
          lastUpdated: '2024-02-20'
        },
        {
          id: 'mfc-modern-cpp',
          title: 'MFC与现代C++结合开发',
          description: 'MFC框架与C++11/14/17新特性的结合使用',
          type: ResourceType.DOCUMENTATION,
          url: 'https://docs.microsoft.com/en-us/cpp/cpp/',
          difficulty: DifficultyLevel.HARD,
          estimatedHours: 40,
          isFree: true,
          language: 'en',
          tags: ['MFC', '现代C++', 'C++11', 'C++17'],
          techStack: ['C++', 'MFC', 'STL'],
          lastUpdated: '2024-03-01'
        }
      ],
      practiceProjects: [
        'MFC文本编辑器开发',
        '基于MFC的图像处理应用',
        'MFC多媒体播放器开发',
        '企业级MFC数据管理系统'
      ],
      checkpoints: [
        '深入理解MFC框架架构和文档/视图模式',
        '熟练掌握MFC消息映射和事件处理机制',
        '能够开发复杂的MFC用户界面和自定义控件',
        '掌握MFC多线程编程和COM组件集成',
        '实现MFC网络通信和数据库访问功能',
        '完成高性能的企业级MFC桌面应用项目'
      ],
      prerequisites: ['winform-development'],
      isOptional: true
    },
    {
      id: 'advanced-ui-frameworks',
      title: '现代UI框架应用',
      description: '学习React、Vue等现代前端框架',
      stage: LearningStage.ADVANCED,
      order: 6,
      estimatedDays: 35,
      objectives: [
        '掌握React或Vue框架',
        '学会组件化开发思想',
        '能够开发现代Web应用'
      ],
      resources: [
        {
          id: 'react-tutorial',
          title: 'React开发教程',
          description: 'React从基础到高级应用',
          type: ResourceType.VIDEO,
          url: 'https://www.bilibili.com/video/BV1wy4y1D7JT',
          difficulty: DifficultyLevel.MEDIUM,
          estimatedHours: 60,
          isFree: true,
          language: 'zh',
          tags: ['React', 'JavaScript', '前端框架'],
          techStack: ['React', 'JavaScript', 'Node.js'],
          lastUpdated: '2024-03-01'
        }
      ],
      checkpoints: [
        '理解组件化开发思想',
        '掌握React Hooks使用',
        '能够进行状态管理',
        '完成全栈Web应用项目'
      ],
      prerequisites: ['winform-development'],
      isOptional: false
    }
  ],
  lastUpdated: '2024-03-15'
};

// 导出所有技术路线
export const techRoutes: TechRoute[] = [
  embeddedRoute,
  mechanicalRoute,
  designRoute
];

// 根据方向获取技术路线
export const getTechRouteByDirection = (direction: TechDirection): TechRoute | undefined => {
  return techRoutes.find(route => route.direction === direction);
};

// 获取所有技术方向
export const getAllTechDirections = (): TechDirection[] => {
  return techRoutes.map(route => route.direction);
};

// 根据ID获取技术路线
export const getTechRouteById = (id: string): TechRoute | undefined => {
  return techRoutes.find(route => route.id === id);
};