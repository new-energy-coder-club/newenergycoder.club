import { TeamMember } from '../types/translations';

// 赞助商等级类型
export type SponsorLevel = 'strategic' | 'gold' | 'silver' | 'bronze' | 'partner' | 'personal';

// 赞助商支持内容
export interface SponsorSupport {
  item: string;
  quantity?: string;
}

// 扩展赞助商类型
export interface Sponsor extends TeamMember {
  level: SponsorLevel;
  supports: SponsorSupport[];
  website?: string;
}

export const maintainers: TeamMember[] = [
  {
    name: 'DarrenPig',
    role: 'Club Founder & BSP 嵌软工程师',
    bio: '小系统专家，AI 在新能源行业的应用。',
    image: '/image/maintainer/DarrenPig.jpg',
    tags: ['AI', 'BSP', '嵌入式', 'ROBOCON', '能源监测', 'openEuler'],
    gitee: 'https://gitee.com/darrenpig',
    github: 'https://github.com/Darrenpig',
    bonjour: 'https://bonjour.bio/darrenpig',
    email: '22230635@czu.cn'
  },
  {
    name: '殷统创',
    role: 'Club Founder & BSP Expert',
    bio: '新能源背景的嵌入式 Linux 工程师。',
    image: '/image/maintainer/殷统创.jpg',
    tags: ['AI', 'BSP', '能源优化', '可再生能源', '华为云AI'],
    github: 'https://github.com/yintongchuang'
  },
  {
    name: '许珑译',
    role: '机器人算法工程师',
    bio: '专注于机器人算法研发部署以及业务逻辑设计。',
    image: '/image/maintainer/许珑译.jpg',
    tags: ['机器人算法', 'ROBOCON', '人形机器人', '算法部署', 'ROS'],
    github: 'https://github.com/xulongyi'
  },
  {
    name: '张旺旺',
    role: '机器人运行时工程师',
    bio: '新能源背景的光伏追踪支架研究者，专注于 ESP 和电缸驱动。',
    image: '/image/maintainer/张旺旺.png',
    tags: ['电控系统', '运行时', 'ROBOCON', '嵌入式', '系统稳定性'],
    github: 'https://github.com/zhangwangwang'
  }
];

export const developers: TeamMember[] = [
  {
    name: '刘英琪',
    role: '嵌入式工程师',
    bio: 'ROBOCON 24-25 赛季队长。',
    image: '/image/developer/刘英琪.png',
    tags: ['STM32', 'RTOS', 'C/C++'],
    github: 'https://github.com/liuyingqi'
  },

  {
    name: '周志',
    role: '全栈开发',
    bio: '负责项目工具链开发与维护。',
    image: '/image/developer/周志.png',
    tags: ['Python', 'JavaScript', 'Node.js'],
    github: 'https://github.com/zhouzhi'
  },
  {
    name: '李硕',
    role: '硬件开发',
    bio: '负责电路设计与硬件调试。',
    image: '/image/developer/李硕.png',
    tags: ['PCB设计', '电路调试', 'Altium Designer'],
    github: 'https://github.com/lishuo'
  },
  {
    name: '牛良旭',
    role: '电池管理开发',
    bio: '负责电池管理系统开发与测试。',
    image: '/image/developer/牛良旭.jpg',
    tags: ['BMS', '电池测试', 'C/C++'],
    github: 'https://github.com/niuliangxu'
  },
  {
    name: '郑钦文',
    role: '机电设计',
    bio: '负责机械结构设计与装配。',
    image: '/image/developer/郑钦文.jpg',
    tags: ['SolidWorks', '机械设计', '3D打印'],
    github: 'https://github.com/zhengqinwen'
  },
  {
    name: '杨力滔',
    role: '嵌入式开发',
    bio: '负责星闪手柄固件开发，熟悉 STM32 与 RTOS。',
    image: '/image/developer/杨力滔.JPG',
    tags: ['STM32', 'RTOS', 'C语言'],
    github: 'https://github.com/yanglitao'
  },
  {
    name: '彭柯颖',
    role: '机械设计',
    bio: '参与机械结构设计与制作。',
    image: '/image/developer/彭柯颖.jpg',
    tags: ['SolidWorks', '机械加工'],
    github: 'https://github.com/pengkeying'
  },
  {
    name: '孟洁',
    role: '嵌入式软件工程师',
    bio: '专注于 STM32、RTOS 与驱动开发，擅长 C/C++。',
    image: '/image/developer/孟洁.jpg',
    tags: ['STM32', 'RTOS', 'C/C++', '驱动开发']
  },
  {
    name: '文钰婷',
    role: '嵌入式软件工程师',
    bio: '熟悉实时操作系统与驱动开发，聚焦 C/C++ 与 STM32。',
    image: '/image/developer/文钰婷.jpg',
    tags: ['STM32', 'RTOS', 'C/C++', '驱动开发']
  },
  {
    name: '张龚轩',
    role: '物流自动化系统工程师',
    bio: '聚焦 PLC、机器视觉与智能分拣系统的工程实现与优化。',
    image: '/image/developer/张龚轩.jpg',
    tags: ['物流自动化', 'PLC', '机器视觉', '分拣系统', '工业控制']
  },
  {
    name: '徐康',
    role: '3D打印',
    bio: '负责3D打印建模与航模电机驱动调试。',
    image: '/image/researcher/徐康.jpg',
    tags: ['3D打印', 'SolidWorks', '航模']
  },
  {
    name: '陆宇豪',
    role: '化工模拟',
    bio: '负责化工流程模拟与数据分析。',
    image: '/image/researcher/陆宇豪.jpg',
    tags: ['Aspen', '化工模拟', '数据分析']
  }
];

export const designers: TeamMember[] = [
  {
    name: 'Xiux',
    role: 'UI设计',
    bio: '负责社区官网界面设计。',
    image: '/image/designer/xiux.jpg',
    tags: ['Figma', 'UI设计', '界面设计']
  },
  {
    name: 'ikkOoOo',
    role: '产品设计',
    bio: '负责产品外观与结构设计。',
    image: '/image/designer/ikkOoOo.jpg',
    tags: ['Rhino', 'KeyShot', '产品设计']
  },
  {
    name: '张若璐',
    role: '视觉设计',
    bio: '负责品牌设计与数据可视化。',
    image: '/image/designer/张若璐.jpg',
    tags: ['品牌设计', '数据可视化', 'Power BI']
  },
  {
    name: '韦彩日',
    role: '工业设计',
    bio: '负责机械结构外观设计与需求对接。',
    image: '/image/designer/韦彩日.jpg',
    tags: ['SolidWorks', '外观设计', '结构设计']
  },
  {
    name: '张岩皓',
    role: '摄影/数据可视化',
    bio: '负责活动摄影记录与数据分析可视化。',
    image: '/image/designer/张岩皓.jpg',
    tags: ['摄影', '数据可视化', 'PR/达芬奇']
  },
  {
    name: '李想',
    role: 'UX设计',
    bio: '负责交互设计与用户研究。',
    image: '/image/designer/李想.jpg',
    tags: ['Figma', '交互设计', '用户研究']
  },
  {
    name: '李一楠',
    role: '运营',
    bio: '负责社群运营与活动组织。',
    image: '/image/designer/李一楠.jpg',
    tags: ['社群运营', '活动策划']
  },
  {
    name: '王彦君',
    role: '产品设计',
    bio: '负责产品建模与渲染。',
    image: '/image/contributer/王彦君.jpg',
    tags: ['SolidWorks', 'Rhino', 'KeyShot']
  }
];

export const preMaintainers: TeamMember[] = [
  {
    name: '卢王淳',
    role: '项目管理',
    bio: '负责2025 ROBOCON项目协调，参与机械与电控开发。',
    image: '/image/preMaintainer/卢王淳.jpg',
    tags: ['项目管理', '机械设计', '电控'],
    github: 'https://github.com/luwangchun'
  },
  {
    name: '徐海婷',
    role: '财务管理',
    bio: '负责团队预算管理与费用报销。',
    image: '/image/preMaintainer/徐海婷.jpg',
    tags: ['财务管理', '预算']
  },
  {
    name: '单广志',
    role: '嵌入式开发',
    bio: '负责电机驱动开发与电路调试。',
    image: '/image/preMaintainer/单广志.jpg',
    tags: ['STM32', '电机驱动', 'PCB'],
    github: 'https://github.com/shanguangzhi'
  },
  {
    name: '许子涵',
    role: '产品助理',
    bio: '协助需求整理与文档撰写。',
    image: '/image/preMaintainer/许子涵.png',
    tags: ['需求分析', '文档'],
    github: 'https://github.com/xuzihan'
  }
];

export const researchers: TeamMember[] = [
  {
    name: '徐康',
    role: 'Researcher',
    bio: '擅长3D打印建模/航模电机驱动，专注于学术研究。',
    image: '/image/researcher/徐康.jpg',
    tags: ['3D打印', '建模', 'SolidWorks', '学术研究']
  },
  {
    name: '陆宇豪',
    role: 'Researcher',
    bio: '在读研究生，专注于学术与Aspen V8与AI技术研究。',
    image: '/image/researcher/陆宇豪.jpg',
    tags: ['研究生', '学术研究', '技术探索']
  },
  {
    name: '魏鹏程',
    role: 'Researcher',
    bio: '研究生，正在参与 RC 赛事，关注学术研究与工程实践。',
    image: '/image/researcher/魏鹏程.jpg',
    tags: ['研究生', 'RC赛事', '学术研究']
  }
];

export const contributors: TeamMember[] = [
  {
    name: '卢永杰',
    role: '嵌入式开发',
    bio: '负责算法部署与BSP开发。',
    image: '/image/contributer/卢永杰.jpg',
    tags: ['STM32', '运控算法', 'C/C++'],
    github: 'https://github.com/luyongjie'
  },
  {
    name: '韩祺冉',
    role: '数据分析',
    bio: '负责数据处理与可视化。',
    image: '/image/contributer/韩祺冉.jpg',
    tags: ['Python', '数据分析', '可视化'],
    github: 'https://gitee.com/han-qiran'
  },
  {
    name: '崔正阳',
    role: '上位机开发',
    bio: '负责上位机控制软件开发与仿真。',
    image: '/image/contributer/崔正阳.jpg',
    tags: ['Python', '上位机', '仿真'],
    github: 'https://github.com/cuizhengyang'
  },
  {
    name: '王于豪',
    role: '成型组',
    bio: '负责3D打印与设备维护。',
    image: '/image/contributer/王于豪.jpg',
    tags: ['3D打印', '设备维护'],
    github: 'https://github.com/wangyuhao'
  },
  {
    name: '张旺旺',
    role: '机器人运行时工程师',
    bio: '新能源背景的光伏追踪支架研究者，专注于 ESP 和电缸驱动。',
    image: '/image/contributer/张旺旺.jpg',
    tags: ['ESP32', '电缸驱动', '光伏'],
    github: 'https://github.com/zhangwangwang'
  },
  {
    name: '吴洛斌',
    role: '气动控制',
    bio: '负责气动系统设计与PLC编程。',
    image: '/image/contributer/吴洛斌.jpg',
    tags: ['气动控制', 'PLC', '工业自动化'],
    github: 'https://github.com/wuluobin'
  },
  {
    name: '余浩铭',
    role: '内容运营',
    bio: '负责宣传文案与内容编辑。',
    image: '/image/developer/余浩铭.jpg',
    tags: ['文案', '内容运营'],
    github: 'https://github.com/yuhaoming'
  },
  {
    name: '卞乐凌',
    role: '嵌入式学习',
    bio: '嵌入式方向学习者。',
    image: '/image/contributer/卞乐凌.jpg',
    tags: ['STM32', '嵌入式学习'],
    github: 'https://github.com/bianleiling'
  },
  {
    name: '郑绍恺',
    role: '算法开发',
    bio: '负责算法优化与实现。',
    image: '/image/contributer/郑绍恺.png',
    tags: ['算法', 'C/C++'],
    github: 'https://github.com/zhengshaokai'
  },
  {
    name: '郭童童',
    role: '现场执行',
    bio: '负责比赛现场协调与设备管理。',
    image: '/image/contributer/郭童童.jpg',
    tags: ['现场执行', '设备管理'],
    gitee: 'https://gitee.com/guo--tongtong'
  },
  {
    name: '杨鑫海',
    role: '嵌入式开发',
    bio: '负责Arduino与ESP32开发。',
    image: '/image/contributer/杨鑫海.jpg',
    tags: ['Arduino', 'ESP32'],
    github: 'https://github.com/yangxinhai'
  },
  {
    name: '殷子豪',
    role: '内容运营',
    bio: '负责宣传与文案撰写。',
    image: '/image/contributer/殷子豪.jpg',
    tags: ['文案', '运营'],
    github: 'https://github.com/yinzihao'
  },
  {
    name: '孙如婕',
    role: '机械设计',
    bio: '负责灵巧手结构设计与制作。',
    image: '/image/contributer/孙如婕.jpg',
    tags: ['SolidWorks', '机械设计'],
    github: 'https://github.com/sunrujie'
  },
  {
    name: '杨彩妮',
    role: '视觉开发',
    bio: '负责工业视觉算法开发。',
    image: '/image/contributer/杨彩妮.jpg',
    tags: ['机器视觉', 'OpenCV'],
    github: 'https://github.com/yangcaini'
  },
  {
    name: '孙诗睿',
    role: '嵌入式硬件',
    bio: '负责嵌入式硬件设计与调试。',
    image: '/image/contributer/孙诗睿.jpg',
    tags: ['单片机', '硬件设计'],
    github: 'https://github.com/sunshirui'
  },
  {
    name: '梁新雷',
    role: '嵌入式学徒',
    bio: '嵌入式系统开发学习者，专注电控技术。',
    image: '/image/contributer/梁新雷.jpg',
    tags: ['STM32', '电控']
  },
  {
    name: '顾佳欣',
    role: 'Unity开发',
    bio: '负责Unity应用开发与数据库。',
    image: '/image/contributer/顾佳欣.jpg',
    tags: ['Unity', 'C#']
  },
  {
    name: '王欣怡',
    role: '电控',
    bio: '负责电控开发与调试。',
    image: '/image/contributer/王欣怡.jpg',
    tags: ['STM32', '电控']
  },
  {
    name: '汪奕希',
    role: '视觉算法',
    bio: '负责计算机视觉算法开发。',
    image: '/image/contributer/汪奕希.jpg',
    tags: ['OpenCV', 'Python']
  },
  {
    name: '岳添俊',
    role: '软件开发',
    bio: '负责嵌入式软件开发。',
    image: '/image/contributer/岳添俊.jpg',
    tags: ['C语言', '嵌入式']
  },
  {
    name: '李畅畅',
    role: '电控/场地',
    bio: '负责电控调试与场地维护。',
    image: '/image/contributer/李畅畅.jpg',
    tags: ['电控', '场地']
  },
  {
    name: '孙雯艳',
    role: '机械设计',
    bio: '负责机械建模与设计。',
    image: '/image/contributer/孙雯艳.jpg',
    tags: ['SolidWorks', '机械设计']
  },
  {
    name: '吴梦婷',
    role: '电机控制',
    bio: '负责电机控制系统开发。',
    image: '/image/contributer/吴梦婷.jpg',
    tags: ['电机控制', '电力电子']
  },
  {
    name: '陈春林',
    role: '视觉算法',
    bio: '负责视觉算法开发与调试。',
    image: '/image/contributer/陈春林.jpg',
    tags: ['OpenCV', 'Python']
  },
  {
    name: '白逸鸣',
    role: '全栈开发',
    bio: '负责飞书应用开发与数字化。',
    image: '/image/contributer/白逸鸣.jpg',
    tags: ['JavaScript', '飞书开发']
  },
  {
    name: '严文颖',
    role: '数据管理',
    bio: '负责数据库管理与维护。',
    image: '/image/contributer/严文颖.jpg',
    tags: ['MySQL', '数据库']
  },
  {
    name: '李嘉涵',
    role: '机械设计',
    bio: '负责机械结构设计与建模。',
    image: '/image/contributer/李嘉涵.jpg',
    tags: ['SolidWorks', 'CATIA']
  },
  {
    name: '黄宇雯',
    role: '机械设计',
    bio: '负责机构设计与动画制作。',
    image: '/image/contributer/黄宇雯.jpg',
    tags: ['SolidWorks', '动画']
  },
  {
    name: '魏卫',
    role: '软件开发',
    bio: '负责前后端开发。',
    image: '/image/contributer/魏卫.jpg',
    tags: ['Python', 'JavaScript']
  },
  {
    name: '张娈馨',
    role: '嵌入式学习',
    bio: '学习嵌入式开发，专注于 STM32，同时熟练使用 SolidWorks 等软件。',
    image: '/image/contributer/张娈馨.jpg',
    tags: ['STM32', 'SolidWorks', '嵌入式学习']
  },
  {
    name: '庄皓钧',
    role: '机械设计',
    bio: '负责机械结构设计与装配。',
    image: '/image/contributer/庄皓钧.jpg',
    tags: ['机械设计', '装配']
  },
  {
    name: '朱靓颖',
    role: 'Contributer',
    bio: '数据预测，数据分析，数学建模',
    image: '/image/contributer/朱靓颖.jpg',
    tags: ['数据预测', '数据分析', '数学建模']
  },
  {
    name: '黄奕',
    role: 'Contributer',
    bio: '数据分析、数学建模等',
    image: '/image/contributer/黄奕.jpg',
    tags: ['数据分析', '数学建模']
  }
];

export const sponsors: Sponsor[] = [
  {
    name: '开源之夏',
    role: '战略合作伙伴',
    level: 'strategic',
    bio: '中国科学院软件研究所、华为、中科南京软件技术研究院联合主办，专注开源人才培养。',
    image: '/image/sponsor/开源之夏Logo.png',
    tags: ['学生项目', '技术孵化'],
    supports: [
      { item: '开源项目资助', quantity: '年度项目名额' },
      { item: '导师资源对接' },
      { item: '社区活动支持' }
    ],
    website: 'https://summer-ospp.ac.cn/'
  },
  {
    name: '立创开源硬件平台',
    role: 'Gold Sponsor',
    level: 'gold',
    bio: '专业开源硬件开发平台，提供PCB打样、元器件采购一站式服务。',
    image: '/image/sponsor/立创开源广场.png',
    tags: ['开源硬件', 'PCB打样'],
    supports: [
      { item: 'PCB打样券', quantity: '年度额度' },
      { item: '元器件采购支持' },
      { item: '开源广场曝光推荐' }
    ],
    website: 'https://oshwhub.com/explore'
  },
  {
    name: 'CubeMars',
    role: 'Motor Partner',
    level: 'gold',
    bio: '专业电机解决方案提供商，专注高性能无刷电机及驱动系统。',
    image: '/image/sponsor/CubeMars.png',
    tags: ['电机', '驱动系统'],
    supports: [
      { item: 'AK系列电机', quantity: '竞赛项目支持' },
      { item: '驱动器套件' },
      { item: '技术咨询支持' }
    ],
    website: 'https://www.cubemars.com/'
  },
  {
    name: '留形科技',
    role: 'Gold Sponsor',
    level: 'gold',
    bio: '专注于智能空间感知与三维重建技术的研发与应用',
    image: '/image/sponsor/留形科技.png',
    tags: ['3D打印', '创新科技'],
    supports: [
      { item: '空间记忆模组' },
      { item: '技术咨询支持' },
    ],
    website: 'https://www.manifoldtech.cn/'
  },
  {
    name: '萝卜小酱',
    role: 'Tool Partner',
    level: 'silver',
    bio: '专业精密工具品牌，专注电子维修与机器人组装工具。',
    image: '/image/sponsor/萝卜小酱.png',
    tags: ['精密工具', '螺丝刀'],
    supports: [
      { item: '精密螺丝刀套装', quantity: '团队标配' },
      { item: '焊接工具套件' },
      { item: '维修工作台' }
    ],
    website: '#'
  },
  {
    name: '华艺塑业',
    role: 'Hardware Partner',
    level: 'bronze',
    bio: '专业碳纤维及工程塑料加工，提供机器人结构件定制服务。',
    image: '/image/sponsor/华艺塑业.png',
    tags: ['碳纤维', '结构加工'],
    supports: [
      { item: '碳纤维板加工' },
      { item: '亚克力切割' },
      { item: '结构件打样' }
    ],
    website: 'https://m.tb.cn/h.7C6uKBnRQ1NxAMB'
  },
  {
    name: 'GPUfree 算力自由',
    role: 'Computing Partner',
    level: 'partner',
    bio: '提供GPU算力资源，助力AI模型训练与科研探索。',
    image: '/assets/logo_GPU_Free.png',
    tags: ['GPU算力', 'AI训练'],
    supports: [
      { item: 'GPU算力代金券', quantity: '1000元额度' },
      { item: '模型训练资源' },
      { item: '科研算力支持' }
    ],
    website: 'https://gpufree.org/'
  },
  {
    name: '脉塔智能',
    role: 'Motor Partner',
    level: 'silver',
    bio: '专业RMD电机及驱动解决方案提供商，专注高性能伺服系统。',
    image: '/image/sponsor/麦塔智能.png',
    tags: ['RMD电机', '伺服系统'],
    supports: [
      { item: 'RMD电机采购额度', quantity: '1万元' },
      { item: '驱动器技术支持' },
      { item: '批量采购优惠' }
    ],
    website: '#'
  },
  {
    name: '华为云',
    role: 'Cloud Partner',
    level: 'partner',
    bio: '华为云提供开发板及云计算资源支持，助力嵌入式开发与边缘计算。',
    image: '/image/sponsor/华为云.png',
    tags: ['开发板', '云计算'],
    supports: [
      { item: '香橙派开发板', quantity: '项目支持' },
      { item: '云服务器资源' },
      { item: '技术文档支持' }
    ],
    website: 'https://www.huaweicloud.com/'
  },
  {
    name: '王浩',
    role: '赞助商',
    level: 'personal',
    bio: 'FA社团，睿抗社团在职队员，熟练运用sw',
    image: '/image/sponsor/王浩.jpg',
    tags: ['SolidWorks'],
    supports: [],
    website: '#'
  }
];

// NEC Home GIF 资源引用
export const necHomeGif = '/src/NEC-home.gif';
