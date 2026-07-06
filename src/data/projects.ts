export type ProjectCategory =
  | 'all'
  | 'web'
  | 'mobile'
  | 'ai'
  | 'iot'
  | 'embedded'
  | 'robotics'
  | 'research'
  | 'aerospace'
  | 'system'
  | 'other'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: ProjectCategory
  technologies: string[]
  author: string
  date: string
  projectUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: '20250319流体工作站',
    description:
      '流体工作站监控系统，实现对流体设备的实时监控和数据采集，提供高精度的流体参数测量和控制功能。',
    image:
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center',
    category: 'ai',
    technologies: ['嵌入式系统', '传感器技术', 'C/C++', '数据采集', 'SCADA'],
    author: '新能源编程俱乐部',
    date: '2025-03-19',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/ai/energy-monitoring/20250319流体工作站',
  },
  {
    id: '2',
    title: '20250426星闪手柄',
    description:
      '基于WS63的星闪手柄开发项目，采用星闪技术实现低延迟、高可靠性的无线通信，为游戏和控制应用提供优质体验。',
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop&crop=center',
    category: 'embedded',
    technologies: ['WS63', '星闪技术', 'NearLink', '嵌入式开发', '无线通信'],
    author: '新能源编程俱乐部',
    date: '2025-04-26',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/embedded/nearlink/20250426星闪手柄',
  },
  {
    id: '3',
    title: '20241201人形机器人主线',
    description:
      '人形机器人核心开发项目，涵盖机器人运动控制、感知系统、决策算法等关键技术，致力于打造智能化的人形机器人平台。项目配套白皮书详细介绍了 NEC 机器人社区的技术路线与协作模式。',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center',
    category: 'robotics',
    technologies: ['ROS', '运动控制', '计算机视觉', '深度学习', '传感器融合'],
    author: '新能源编程俱乐部',
    date: '2024-12-01',
    projectUrl: '/whitepapers/NEC新能源开发者社区-机器人.pdf',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/humanoid-robot/人形机器人主线',
  },
  {
    id: '4',
    title: '20241115飞控通讯（飞行汽车项目组）',
    description:
      '飞行汽车项目的核心飞控通讯模块，实现飞行器与地面站之间的可靠数据传输和控制指令交互。',
    image:
      'https://camo.githubusercontent.com/f28cc104ea4a3debc18eb8132e9e6e4d925d08a51a9af332119c642db75c2499/68747470733a2f2f64726f6e65636f64652e6f72672f77702d636f6e74656e742f75706c6f6164732f73697465732f32342f323032302f30382f64726f6e65636f64655f6c6f676f5f646661756c742d312e706e67',
    category: 'aerospace',
    technologies: ['飞控系统', '无线通信', '实时控制', '嵌入式系统', '航空电子'],
    author: '新能源编程俱乐部',
    date: '2024-11-15',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/aerospace/flight-control-comm',
  },
  {
    id: '5',
    title: 'NEC 横向项目（真实需求企业级命题）',
    description:
      '产学研合作项目，与企业和科研院所合作开展技术研发，将理论研究与实际应用相结合，推动科技成果转化。',
    image: 'https://picsum.photos/800/600?random=5',
    category: 'research',
    technologies: ['产学研合作', '技术转化', '项目管理', '创新研发'],
    author: '新能源编程俱乐部',
    date: '2024-10-01',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」',
  },
  {
    id: '6',
    title: '人形机器人UMI低成本灵巧手',
    description:
      'UMI（Universal Manipulation Interface）人形机器人低成本灵巧手的设计与实现，提供精确的抓取和操作能力。',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center',
    category: 'robotics',
    technologies: ['机器人学', '灵巧手', '运动控制', '传感器融合', '机械设计'],
    author: '新能源编程俱乐部',
    date: '2024-09-15',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/robotics/umi-dexterous-hand',
  },
  {
    id: '7',
    title: 'MICA混合关键系统验证',
    description:
      'MICA（Mixed-Criticality Architecture）混合关键系统的设计与验证，确保系统在不同关键级别下的可靠性和安全性。',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center',
    category: 'system',
    technologies: ['混合关键系统', '系统验证', '安全关键', '实时系统', '形式化验证'],
    author: '新能源编程俱乐部',
    date: '2024-10-20',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/system/mica-verification',
  },
  {
    id: '8',
    title: '3D打印成型SIG',
    description:
      '专业3D打印服务团队，提供从设计到成型的一站式3D打印解决方案，支持多种材料和复杂结构的打印需求。',
    image:
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center',
    category: 'research',
    technologies: ['3D打印', 'CAD设计', '材料科学', '快速成型', '后处理工艺'],
    author: '新能源编程俱乐部',
    date: '2024-07-10',
    githubUrl:
      'https://gitee.com/darrenpig/new_energy_coder_club/tree/master/projects/科研「横向项目」/3d-printing-team',
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
