import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ExternalLink, Download, Search, Star, BookOpen, Code, Wrench, GraduationCap, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { ImageProxy } from '@/components/ui/image-proxy'

type ResourceCategory = 'all' | 'tutorials' | 'tools' | 'books' | 'courses' | 'documentation'
type ResourceDifficulty = 'beginner' | 'intermediate' | 'advanced'
type ResourceType = 'free' | 'paid'

interface Resource {
  id: string
  title: string
  description: string
  image: string
  category: ResourceCategory
  difficulty: ResourceDifficulty
  type: ResourceType
  author: string
  rating: number
  url: string
  downloadUrl?: string
  tags: string[]
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: '上海交通大学生存手册',
    description: '上海交通大学学生生存指南，包含学习、生活、选课等各方面实用建议和经验分享。',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'beginner',
    type: 'free',
    author: 'SurviveSJTU',
    rating: 4.9,
    url: 'https://github.com/SurviveSJTU/SurviveSJTUManual',
    tags: ['大学生活', '学习指南', '上海交大', '生存手册']
  },
  {
    id: '2',
    title: 'NWPU计算机生存指南',
    description: '西北工业大学计算机学院学生生存指南，涵盖专业课程、实习就业、学术研究等方面的经验总结。',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'beginner',
    type: 'free',
    author: 'npu-cs',
    rating: 4.8,
    url: 'https://github.com/npu-cs/SurviveNWPU-CSManual?tab=readme-ov-file',
    tags: ['计算机专业', '学习指南', '西工大', '生存手册']
  },
  {
    id: '3',
    title: 'UESTC课程资源共享',
    description: '电子科技大学课程资源共享平台，包含各专业课程资料、考试真题、学习笔记等丰富资源。',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Xovee',
    rating: 4.7,
    url: 'https://github.com/Xovee/uestc-course',
    tags: ['电子科大', '课程资源', '学习资料', '考试真题']
  },
  {
    id: '4',
    title: 'ZJU课程攻略共享计划',
    description: '浙江大学课程攻略共享计划，收录浙大学生在学习过程中收集到的各类课程资料。',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'intermediate',
    type: 'free',
    author: 'QSCTech',
    rating: 4.9,
    url: 'https://github.com/QSCTech/zju-icicles',
    tags: ['浙江大学', '课程攻略', '学习资料', '课程资源']
  },
  {
    id: '5',
    title: 'NEC全部开发资料',
    description: 'NEC俱乐部完整的开发资料集合，包含项目文档、技术指南和开发工具。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'NEC俱乐部',
    rating: 4.8,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    downloadUrl: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['NEC', '开发资料', '技术文档', '工具集']
  },
  {
    id: '6',
    title: 'Git Version Control Tutorial',
    description: 'Step-by-step guide to mastering Git for version control and collaborative development.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'beginner',
    type: 'free',
    author: 'Git Masters',
    rating: 4.5,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Git', 'Version Control', 'Collaboration', 'DevOps']
  },
  {
    id: '7',
    title: '清华大学飞跃手册',
    description: '清华大学学生出国留学、升学就业的完整指南和经验分享。',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: '清华大学',
    rating: 4.9,
    url: 'https://feiyue.online/',
    tags: ['留学指南', '升学就业', '经验分享', '清华大学']
  },
  {
    id: '8',
    title: 'Full Stack Web Development',
    description: 'Complete course covering frontend, backend, databases, and deployment strategies.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    category: 'courses',
    difficulty: 'advanced',
    type: 'paid',
    author: 'Web Dev Academy',
    rating: 4.8,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/issues/IC9NDX',
    tags: ['Full Stack', 'Web Development', 'React', 'Node.js', 'MongoDB']
  },
  // 新增开发板和硬件资源
  {
    id: '9',
    title: 'ROS驱动板开发资料',
    description: 'ROS驱动板完整开发资料包，包含STM32开发板相关教程和代码示例。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.6,
    url: 'https://www.yahboom.com/study/ROS-Driver-Board',
    downloadUrl: 'https://pan.baidu.com/s/1Lb-6-qHJWfZHe0Xt7gENZA?pwd=qqqw',
    tags: ['ROS', 'STM32', '开发板', '硬件开发']
  },
  {
    id: '10',
    title: 'USB转PS2适配器资料',
    description: 'USB转PS2适配器开发资料，包含硬件设计和驱动程序。',
    image: 'https://images.unsplash.com/photo-1587614295999-6c1c13675117?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Yahboom',
    rating: 4.3,
    url: 'https://www.yahboom.com/study/USB-PS2',
    downloadUrl: 'https://pan.baidu.com/s/1tcdy3Pal2nWJrMsk9uTvZg?pwd=8888',
    tags: ['USB', 'PS2', '适配器', '硬件']
  },
  {
    id: '11',
    title: 'MicroROS Pi5开发套件',
    description: '基于树莓派5的MicroROS开发套件，包含ESP32小车完整开发资料。',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'Yahboom',
    rating: 4.7,
    url: 'https://www.yahboom.com/study/MicroROS-Pi5',
    downloadUrl: 'https://pan.baidu.com/s/1ev6YT357j8gE5YqN-pSvKw?pwd=8888',
    tags: ['MicroROS', '树莓派5', 'ESP32', '智能小车']
  },
  {
    id: '12',
    title: '树莓派5开发教程',
    description: '树莓派5完整开发教程，从基础入门到高级应用。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.8,
    url: 'https://www.yahboom.com/study/raspberry5',
    downloadUrl: 'https://pan.baidu.com/s/1fjMW7g9zQfWwaDRmbepnww?pwd=8888',
    tags: ['树莓派5', 'Pi5', 'Linux', '嵌入式开发']
  },
  {
    id: '13',
    title: 'MicroROS开发板资料',
    description: 'MicroROS开发板完整资料包，包含开发环境搭建和项目实例。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.5,
    url: 'https://www.yahboom.com/study/MicroROS-Board',
    downloadUrl: 'https://pan.baidu.com/s/1q5CYWZu2qm4OTV5Cb_3F8Q?pwd=8888',
    tags: ['MicroROS', '开发板', 'ROS2', '机器人开发']
  },
  {
    id: '14',
    title: 'MD520开发资料',
    description: 'MD520开发板完整资料包，包含硬件原理图和软件开发指南。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.4,
    url: 'https://www.yahboom.com/study/MD520',
    downloadUrl: 'https://pan.baidu.com/s/1fU57t5LUnv7MZXY-dB0FKA?pwd=6666',
    tags: ['MD520', '开发板', '嵌入式', '硬件开发']
  },
  {
    id: '15',
    title: 'MicroROS ESP32小车',
    description: '基于ESP32的MicroROS智能小车开发资料，无需树莓派。',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'Yahboom',
    rating: 4.6,
    url: 'https://www.yahboom.com/study/MicroROS-ESP32',
    downloadUrl: 'https://pan.baidu.com/s/1Br8vvkiS3YGGjmcoN2HSVA?pwd=2222',
    tags: ['MicroROS', 'ESP32', '智能小车', '无线控制']
  },
  {
    id: '16',
    title: 'PS2手柄模块资料',
    description: 'PS2无线手柄模块开发资料，包含通信协议和控制程序。',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Yahboom',
    rating: 4.2,
    url: 'http://www.yahboom.com/study_module/PS2',
    downloadUrl: 'https://pan.baidu.com/s/1Uh7PgGlxNxghdW2g_wh8oA?pwd=8888',
    tags: ['PS2', '手柄', '无线控制', '游戏控制器']
  },
  {
    id: '17',
    title: '欧标铝方设计软件',
    description: '专业的2020、4040欧标铝方设计软件，用于机械结构设计。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: '机械设计工具',
    rating: 4.3,
    url: 'https://pan.baidu.com/s/1NcGkC6xRrA6sJ226mdPGIA?pwd=6yq5',
    downloadUrl: 'https://pan.baidu.com/s/1GyOpvLqisBan5XhT6dwzzg?pwd=8888',
    tags: ['CAD', '机械设计', '铝方', '结构设计']
  },
  {
    id: '18',
    title: 'MD310开发板资料',
    description: 'MD310开发板完整开发资料，包含硬件设计和软件开发指南。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.5,
    url: 'https://www.yahboom.com/study/MD310',
    downloadUrl: 'https://www.bilibili.com/video/BV1SKyWYAE1L?vd_source=ada169d3e86c0743d314286c50fbabc1',
    tags: ['MD310', '开发板', '嵌入式开发', '教学视频']
  },
  {
    id: '19',
    title: 'ESP32-Lite开发模块',
    description: 'ESP32-Lite轻量级开发模块资料，适合物联网项目开发。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Yahboom',
    rating: 4.4,
    url: 'https://www.yahboom.com/study_module/ESP32-Lite',
    downloadUrl: 'https://product.abrobot.club/',
    tags: ['ESP32', 'IoT', '物联网', '无线开发']
  },
  {
    id: '20',
    title: '2.4G遥控模块',
    description: '2.4G无线遥控模块开发资料，支持多通道遥控功能。',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.3,
    url: 'http://www.yahboom.com/study_module/2.4G_RC',
    downloadUrl: 'https://pan.baidu.com/s/1EIyMZMTXlu3bg6m3UhKaQg',
    tags: ['2.4G', '遥控', '无线通信', 'RC控制']
  },
  {
    id: '21',
    title: 'ROSMASTER-X3智能车',
    description: 'ROSMASTER-X3 ROS拓展板智能车开发资料，支持ROS机器人开发。',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'Yahboom',
    rating: 4.7,
    url: 'https://www.yahboom.com/study/ROSMASTER-X3',
    tags: ['ROS', '智能车', '机器人', 'ROSMASTER']
  },
  {
    id: '22',
    title: 'ROSMASTER-R2机器人',
    description: 'ROSMASTER-R2机器人开发平台，完整的ROS机器人解决方案。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'Yahboom',
    rating: 4.8,
    url: 'https://www.yahboom.com/study/ROSMASTER-R2',
    tags: ['ROS', '机器人', 'ROSMASTER', '人工智能']
  },
  {
    id: '23',
    title: 'EEMaker开发文档',
    description: 'EEMaker开发平台完整文档，包含硬件开发和软件编程指南。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'EEMaker',
    rating: 4.5,
    url: 'https://www.yuque.com/eemaker/wiki',
    downloadUrl: 'https://pan.baidu.com/s/1myz-iuHV1eZ2cZETUGVP-g?pwd=68yo',
    tags: ['EEMaker', '开发文档', '硬件开发', '编程指南']
  },
  {
    id: '24',
    title: '24通道舵机驱动板',
    description: '24通道舵机驱动板开发资料，支持多舵机同时控制。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Yahboom',
    rating: 4.4,
    url: 'https://www.yahboom.com/study_module/24-channel-servo-driver',
    downloadUrl: 'https://www.bilibili.com/opus/1010608867079356423',
    tags: ['舵机', '驱动板', '多通道控制', '机器人控制']
  },
  {
    id: '25',
    title: 'EmakeFun智能手柄',
    description: 'EmakeFun ESP32智能手柄开发资料，支持无线控制和编程。',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'EmakeFun',
    rating: 4.6,
    url: 'https://emakefun.github.io/emakefun-docsify/#/zh-cn/esp32/maker_esp32/maker_esp32',
    downloadUrl: 'https://pan.baidu.com/s/1fZm-3bHHgeZ2bd9IzNDN1g?pwd=xp7j',
    tags: ['智能手柄', 'ESP32', '无线控制', 'EmakeFun']
  },
  {
    id: '26',
    title: '开发软件下载合集',
    description: '常用开发软件下载合集，包含各种开发工具和环境配置。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: '开发工具集',
    rating: 4.7,
    url: 'https://mp.weixin.qq.com/s/TMdeXU_FnC2hX054ixtj0g',
    tags: ['开发软件', '工具下载', 'IDE', '开发环境']
  },
  {
    id: '27',
    title: 'NEC Logo设计资源',
    description: 'New Energy Coder俱乐部官方Logo设计资源文件。',
    image: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/Image/Logo.png',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'New Energy Coder',
    rating: 4.9,
    url: 'https://gitee.com/darrenpig/new_energy_coder_club/raw/master/Image/Logo.png',
    tags: ['Logo', '设计资源', 'NEC', '品牌标识']
  },
  // 从书签文件添加的资源
  {
    id: '28',
    title: 'ROS2 Foxy 官方文档',
    description: 'ROS2 Foxy版本的官方文档，包含完整的API参考和教程。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'ROS Foundation',
    rating: 4.8,
    url: 'https://docs.ros.org/en/foxy/index.html',
    tags: ['ROS2', 'Foxy', '机器人', '文档']
  },
  {
    id: '29',
    title: 'URDF 教程',
    description: 'ROS机器人描述文件URDF的完整教程和实例。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'ROS Wiki',
    rating: 4.6,
    url: 'https://wiki.ros.org/urdf/Tutorials',
    tags: ['URDF', 'ROS', '机器人建模', '教程']
  },
  {
    id: '30',
    title: 'Isaac Lab 中文文档',
    description: 'NVIDIA Isaac Lab的中文文档，机器人仿真开发指南。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: 'Robots Fan',
    rating: 4.7,
    url: 'https://docs.robotsfan.com/isaaclab/index.html',
    tags: ['Isaac Lab', 'NVIDIA', '仿真', '机器人']
  },
  {
    id: '31',
    title: 'Isaac Sim 官方文档',
    description: 'NVIDIA Isaac Sim官方文档，机器人仿真平台完整指南。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: 'NVIDIA',
    rating: 4.8,
    url: 'https://docs.isaacsim.omniverse.nvidia.com/latest/index.html',
    tags: ['Isaac Sim', 'NVIDIA', '仿真', 'Omniverse']
  },
  {
    id: '32',
    title: 'RoboDK 中文文档',
    description: 'RoboDK工业机器人仿真软件的中文使用指南。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'RoboDK',
    rating: 4.5,
    url: 'https://robodk.com.cn/doc/cn/Getting-Started.html',
    tags: ['RoboDK', '工业机器人', '仿真', '中文文档']
  },
  {
    id: '33',
    title: 'Rhino 学习中心',
    description: 'Rhino 3D建模软件的官方学习资源和教程。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Rhino3D',
    rating: 4.6,
    url: 'https://www.rhino3d.com/learn/',
    tags: ['Rhino', '3D建模', 'CAD', '设计']
  },
  {
    id: '34',
    title: 'Blender 中文社区',
    description: 'Blender 3D建模和动画软件的中文学习社区。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Blender Magic',
    rating: 4.7,
    url: 'https://www.blendermagic.cn/',
    tags: ['Blender', '3D建模', '动画', '中文社区']
  },
  {
    id: '35',
    title: 'Figma 设计工具',
    description: 'Figma在线协作设计工具，UI/UX设计的首选平台。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Figma Inc.',
    rating: 4.9,
    url: 'https://www.figma.com/',
    tags: ['Figma', 'UI设计', 'UX设计', '协作工具']
  },
  {
    id: '36',
    title: 'Overleaf LaTeX 编辑器',
    description: 'Overleaf在线LaTeX编辑器，学术论文写作的最佳选择。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Overleaf',
    rating: 4.8,
    url: 'https://www.overleaf.com/',
    tags: ['LaTeX', '论文写作', '学术', '在线编辑器']
  },
  {
    id: '37',
    title: 'LaTeX 简明手册',
    description: 'LaTeX入门和进阶的中文简明手册，PDF格式。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'books',
    difficulty: 'beginner',
    type: 'free',
    author: 'LaTeX Community',
    rating: 4.7,
    url: 'https://texdoc.org/serve/lshort-zh-cn.pdf/0',
    tags: ['LaTeX', '手册', '中文', 'PDF']
  },
  {
    id: '38',
    title: 'LaTeX 工作室',
    description: 'LaTeX中文社区，提供模板、教程和技术支持。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'intermediate',
    type: 'free',
    author: 'LaTeX Studio',
    rating: 4.6,
    url: 'https://www.latexstudio.net/',
    tags: ['LaTeX', '中文社区', '模板', '教程']
  },
  {
    id: '39',
    title: 'Zotero 中文插件',
    description: 'Zotero文献管理软件的中文插件和扩展工具。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Zotero Chinese',
    rating: 4.5,
    url: 'https://zotero-chinese.com/plugins/',
    tags: ['Zotero', '文献管理', '插件', '中文']
  },
  {
    id: '40',
    title: 'ZoteroBib 快速引用',
    description: 'ZoteroBib在线快速生成文献引用格式的工具。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Zotero',
    rating: 4.4,
    url: 'https://zbib.org/',
    tags: ['引用格式', '文献', '在线工具', 'Zotero']
  },
  {
    id: '41',
    title: 'Google Scholar',
    description: 'Google学术搜索，查找学术文献和引用的最佳平台。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Google',
    rating: 4.9,
    url: 'https://scholar.google.com/',
    tags: ['学术搜索', '文献检索', 'Google', '研究']
  },
  {
    id: '42',
    title: 'Web of Science',
    description: 'Web of Science学术数据库，高质量学术文献检索平台。',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'paid',
    author: 'Clarivate',
    rating: 4.7,
    url: 'https://webofscience.clarivate.cn/',
    tags: ['学术数据库', '文献检索', 'SCI', '研究']
  },
  {
    id: '43',
    title: 'Papers with Code',
    description: 'Papers with Code，机器学习论文与代码实现的结合平台。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Papers with Code',
    rating: 4.8,
    url: 'https://paperswithcode.com/',
    tags: ['机器学习', '论文', '代码', 'AI']
  },
  {
    id: '44',
    title: 'Devv AI 搜索',
    description: 'Devv AI智能搜索引擎，专为开发者设计的AI问答平台。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Devv AI',
    rating: 4.6,
    url: 'https://devv.ai/zh',
    tags: ['AI搜索', '开发者工具', '智能问答', '编程']
  },
  {
    id: '45',
    title: 'Kimi Chat',
    description: 'Kimi Chat智能对话助手，支持长文本理解和多轮对话。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Moonshot AI',
    rating: 4.7,
    url: 'https://kimi.moonshot.cn/',
    tags: ['AI助手', '对话', '长文本', '智能']
  },
  {
    id: '46',
    title: 'Stack Overflow',
    description: 'Stack Overflow程序员问答社区，解决编程问题的最佳平台。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Stack Overflow',
    rating: 4.8,
    url: 'https://stackoverflow.com/',
    tags: ['编程问答', '开发者社区', '技术支持', '编程']
  },
  {
    id: '47',
    title: 'AllToAll 格式转换',
    description: 'AllToAll在线格式转换工具，支持多种文件格式互转。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'AllToAll',
    rating: 4.3,
    url: 'https://www.alltoall.net/',
    tags: ['格式转换', '在线工具', '文件转换', '实用工具']
  },
  {
    id: '48',
    title: '宇树电机SDK指南',
    description: '宇树科技电机SDK开发指南，包含完整的API文档和示例。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: '宇树科技',
    rating: 4.6,
    url: 'https://support.unitree.com/home/zh/Motor_SDK_Dev_Guide',
    tags: ['宇树电机', 'SDK', '机器人', '电机控制']
  },
  {
    id: '49',
    title: 'RS485 驱动示例',
    description: '宇树电机RS485驱动代码示例，包含完整的通信协议实现。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'advanced',
    type: 'free',
    author: 'Gitee用户',
    rating: 4.5,
    url: 'https://gitee.com/jsoahxao/yushu-motor-driver-code',
    tags: ['RS485', '宇树电机', '驱动代码', '通信协议']
  },
  {
    id: '50',
    title: '树莓派官方屏幕文档',
    description: '树莓派官方显示屏配件的完整使用文档和配置指南。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Raspberry Pi',
    rating: 4.4,
    url: 'https://pidoc.cn/docs/accessories/display',
    tags: ['树莓派', '显示屏', '硬件配置', '官方文档']
  },
  {
    id: '51',
    title: 'uni-app 官网',
    description: 'uni-app跨端开发框架官网，一套代码多端运行。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'DCloud',
    rating: 4.7,
    url: 'https://uniapp.dcloud.net.cn/',
    tags: ['uni-app', '跨端开发', '小程序', '移动开发']
  },
  {
    id: '52',
    title: 'HBuilderX 入门教程',
    description: 'HBuilderX开发工具的入门教程和使用指南。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'beginner',
    type: 'free',
    author: 'DCloud',
    rating: 4.5,
    url: 'https://hx.dcloud.net.cn/Tutorial/StartedTutorial',
    tags: ['HBuilderX', 'IDE', '开发工具', '教程']
  },
  {
    id: '53',
    title: '微信小程序开发文档',
    description: '微信小程序官方开发文档，包含完整的API和组件说明。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: '微信团队',
    rating: 4.8,
    url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
    tags: ['微信小程序', '官方文档', 'API', '移动开发']
  },
  {
    id: '54',
    title: 'openEuler 社区官网',
    description: 'openEuler开源操作系统社区官网，包含文档、下载和社区资源。',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: 'openEuler社区',
    rating: 4.7,
    url: 'https://www.openeuler.org/zh/',
    tags: ['openEuler', 'Linux', '操作系统', '开源']
  },
  {
    id: '55',
    title: 'HCIA-openEuler 认证课程',
    description: 'HCIA-openEuler认证培训课程，系统学习openEuler操作系统。',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'courses',
    difficulty: 'intermediate',
    type: 'free',
    author: 'openEuler社区',
    rating: 4.6,
    url: 'https://www.openeuler.org/zh/learn/mooc/detail/',
    tags: ['HCIA', 'openEuler', '认证', '在线课程']
  },
  {
    id: '56',
    title: 'openEuler 文档中心',
    description: 'openEuler操作系统完整的技术文档和使用指南。',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: 'openEuler社区',
    rating: 4.7,
    url: 'https://docs.openeuler.org/zh/',
    tags: ['openEuler', '技术文档', 'Linux', '系统管理']
  },
  {
    id: '57',
    title: 'Git 教程 - 廖雪峰',
    description: '廖雪峰的Git教程，从入门到精通的完整Git学习路径。',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'beginner',
    type: 'free',
    author: '廖雪峰',
    rating: 4.9,
    url: 'https://www.liaoxuefeng.com/wiki/896043488029600',
    tags: ['Git', '版本控制', '教程', '廖雪峰']
  },
  {
    id: '58',
    title: 'SSH 入门教程',
    description: '阮一峰的SSH入门教程，详细介绍SSH的使用和配置。',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop',
    category: 'tutorials',
    difficulty: 'beginner',
    type: 'free',
    author: '阮一峰',
    rating: 4.7,
    url: 'https://www.ruanyifeng.com/blog/2020/12/ssh-tutorial.html',
    tags: ['SSH', '网络', '教程', '阮一峰']
  },
  {
    id: '59',
    title: 'PlatformIO 开发平台',
    description: 'PlatformIO嵌入式开发平台，支持多种开发板和框架。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'PlatformIO',
    rating: 4.8,
    url: 'https://platformio.org/',
    tags: ['PlatformIO', '嵌入式开发', 'IoT', '开发平台']
  },
  {
    id: '60',
    title: 'Marlin 3D打印机固件',
    description: 'Marlin开源3D打印机固件，基于Arduino平台优化。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'MarlinFirmware',
    rating: 4.6,
    url: 'https://github.com/MarlinFirmware/Marlin',
    tags: ['Marlin', '3D打印', '固件', 'Arduino']
  },
  {
    id: '61',
    title: 'Fish Audio - AI语音合成',
    description: 'Fish Audio免费AI文本转语音和语音克隆平台，支持多种语言和音色。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Fish Audio',
    rating: 4.5,
    url: 'https://fish.audio/zh-CN/',
    tags: ['AI语音', '文本转语音', '语音克隆', '人工智能']
  },
  {
    id: '62',
    title: 'Hailuo AI - 视觉创作',
    description: 'Hailuo AI视觉创作平台，将创意转化为视觉内容的AI工具。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Hailuo AI',
    rating: 4.4,
    url: 'https://hailuoai.video/',
    tags: ['AI视觉', '创意设计', '视频生成', '人工智能']
  },
  {
    id: '63',
    title: 'Figma中文社区',
    description: 'Figma软件汉化版下载和中文社区，提供设计资源和教程。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Figma中文社区',
    rating: 4.3,
    url: 'https://www.figma.cool/cn',
    tags: ['Figma', '设计工具', '中文版', 'UI设计']
  },
  {
    id: '64',
    title: 'FigmaEX 增强插件',
    description: 'FigmaEX是Figma的增强插件，提供更多设计功能和工具。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Moonvy',
    rating: 4.4,
    url: 'https://moonvy.com/figmaEX/',
    tags: ['Figma', '插件', '设计增强', 'UI工具']
  },
  {
    id: '65',
    title: 'Smallpdf - PDF工具',
    description: 'Smallpdf在线PDF工具集，支持PDF解锁、转换、编辑等功能。',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Smallpdf',
    rating: 4.5,
    url: 'https://smallpdf.com/unlock-pdf',
    tags: ['PDF工具', '文档处理', '在线工具', '文件转换']
  },
  {
    id: '66',
    title: 'Stack Overflow',
    description: '全球最大的程序员问答社区，解决编程问题的首选平台。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'beginner',
    type: 'free',
    author: 'Stack Overflow',
    rating: 4.8,
    url: 'https://stackoverflow.com/',
    tags: ['编程问答', '开发社区', '技术支持', '编程学习']
  },
  {
    id: '67',
    title: 'Code-Nav 编程导航',
    description: 'Code-Nav编程导航，汇集优质编程资源和工具的导航网站。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'beginner',
    type: 'free',
    author: 'Code-Nav',
    rating: 4.4,
    url: 'https://www.code-nav.cn/',
    tags: ['编程导航', '资源汇总', '开发工具', '学习资源']
  },
  {
    id: '68',
    title: 'ESP32官方文档',
    description: 'ESP32微控制器官方文档，包含完整的开发指南和API参考。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Espressif',
    rating: 4.7,
    url: 'https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/',
    tags: ['ESP32', '嵌入式开发', '物联网', '微控制器']
  },
  {
    id: '69',
    title: 'STM32CubeMX',
    description: 'STM32CubeMX图形化配置工具，简化STM32微控制器的初始化代码生成。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'STMicroelectronics',
    rating: 4.5,
    url: 'https://www.st.com/en/development-tools/stm32cubemx.html',
    tags: ['STM32', '嵌入式开发', '代码生成', '微控制器']
  },
  {
    id: '70',
    title: 'Google Scholar',
    description: 'Google学术搜索，查找学术文献、论文和引用的专业搜索引擎。',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'beginner',
    type: 'free',
    author: 'Google',
    rating: 4.6,
    url: 'https://scholar.google.com/',
    tags: ['学术搜索', '论文查找', '文献检索', '研究工具']
  },
  {
    id: '71',
    title: 'RT-Thread 实时操作系统',
    description: 'RT-Thread是一个开源的实时操作系统，专为物联网设备设计。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'RT-Thread',
    rating: 4.5,
    url: 'https://www.rt-thread.org/',
    tags: ['实时操作系统', '物联网', '嵌入式', 'RTOS']
  },
  {
    id: '72',
    title: 'Keil MDK',
    description: 'Keil MDK是ARM微控制器的专业开发环境，提供完整的开发工具链。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'paid',
    author: 'ARM',
    rating: 4.4,
    url: 'https://www.keil.com/',
    tags: ['Keil', 'ARM开发', '嵌入式IDE', '微控制器']
  },
  {
    id: '73',
    title: 'PlatformIO',
    description: 'PlatformIO是跨平台的嵌入式开发环境，支持多种微控制器和开发板。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'PlatformIO',
    rating: 4.6,
    url: 'https://platformio.org/',
    tags: ['PlatformIO', '嵌入式开发', '跨平台', 'IoT开发']
  },
  {
    id: '74',
    title: 'CLion IDE',
    description: 'JetBrains CLion是专业的C/C++集成开发环境，提供智能代码辅助。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'paid',
    author: 'JetBrains',
    rating: 4.7,
    url: 'https://www.jetbrains.com/clion/',
    tags: ['CLion', 'C++开发', 'IDE', 'JetBrains']
  },
  {
    id: '75',
    title: 'MicroPython',
    description: 'MicroPython是Python 3的精简实现，专为微控制器和嵌入式系统设计。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'MicroPython',
    rating: 4.5,
    url: 'https://micropython.org/',
    tags: ['MicroPython', 'Python', '嵌入式编程', '微控制器']
  },
  {
    id: '76',
    title: 'GitHub Skills',
    description: 'GitHub官方技能学习平台，通过实践项目学习Git和GitHub的使用。',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'beginner',
    type: 'free',
    author: 'GitHub',
    rating: 4.6,
    url: 'https://skills.github.com/',
    tags: ['GitHub', 'Git学习', '版本控制', '实践教程']
  },
  {
    id: '77',
    title: 'HBuilderX',
    description: 'HBuilderX是DCloud推出的HTML5开发工具，支持uni-app和5+App开发。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'DCloud',
    rating: 4.3,
    url: 'https://www.dcloud.io/hbuilderx.html',
    tags: ['HBuilderX', 'HTML5开发', 'uni-app', '移动开发']
  },
  {
    id: '78',
    title: 'uni-app 跨平台框架',
    description: 'uni-app是使用Vue.js开发跨平台应用的前端框架，一套代码多端运行。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'DCloud',
    rating: 4.4,
    url: 'https://uniapp.dcloud.net.cn/',
    tags: ['uni-app', 'Vue.js', '跨平台开发', '小程序开发']
  },
  {
    id: '79',
    title: 'F2C Design to Code',
    description: 'F2C是Figma设计稿转代码的工具，自动将设计转换为前端代码。',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Moonvy',
    rating: 4.2,
    url: 'https://f2c.moonvy.com/',
    tags: ['设计转代码', 'Figma', '自动化', '前端工具']
  },
  {
    id: '80',
    title: 'Web of Science',
    description: 'Web of Science是全球权威的学术文献数据库，提供高质量的研究资源。',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'paid',
    author: 'Clarivate',
    rating: 4.5,
    url: 'https://www.webofscience.com/',
    tags: ['学术数据库', '文献检索', '科研工具', 'SCI论文']
  },
  {
    id: '81',
    title: 'Apple Developer',
    description: 'Apple开发者官网，提供iOS、macOS等平台的开发资源和文档。',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'intermediate',
    type: 'free',
    author: 'Apple',
    rating: 4.7,
    url: 'https://developer.apple.com/',
    tags: ['Apple开发', 'iOS开发', 'macOS开发', '移动开发']
  },
  {
    id: '82',
    title: 'iCloud',
    description: 'Apple iCloud云服务，提供数据同步、备份和存储功能。',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'beginner',
    type: 'free',
    author: 'Apple',
    rating: 4.4,
    url: 'https://www.icloud.com/',
    tags: ['iCloud', '云存储', '数据同步', 'Apple服务']
  },
  {
    id: '83',
    title: 'LaTeX Studio',
    description: 'LaTeX Studio在线LaTeX编辑器，支持实时预览和协作编辑。',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'intermediate',
    type: 'free',
    author: 'LaTeX Studio',
    rating: 4.3,
    url: 'https://www.latexstudio.net/',
    tags: ['LaTeX', '学术写作', '论文排版', '在线编辑']
  },
  {
    id: '84',
    title: 'Zephyr Project',
    description: 'Zephyr是Linux基金会的开源实时操作系统，专为物联网设备设计。',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'tools',
    difficulty: 'advanced',
    type: 'free',
    author: 'Linux Foundation',
    rating: 4.4,
    url: 'https://www.zephyrproject.org/',
    tags: ['Zephyr', 'RTOS', '物联网', '嵌入式系统']
  },
  {
    id: '85',
    title: 'Rust 编程语言',
    description: 'Rust是一种系统编程语言，专注于安全性、速度和并发性。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    category: 'documentation',
    difficulty: 'advanced',
    type: 'free',
    author: 'Rust Foundation',
    rating: 4.6,
    url: 'https://www.rust-lang.org/',
    tags: ['Rust', '系统编程', '内存安全', '并发编程']
  }
]

const categoryFilters = [
  { key: 'all' as ResourceCategory, labelKey: 'filterAll', icon: Search },
  { key: 'tutorials' as ResourceCategory, labelKey: 'filterTutorials', icon: BookOpen },
  { key: 'tools' as ResourceCategory, labelKey: 'filterTools', icon: Wrench },
  { key: 'books' as ResourceCategory, labelKey: 'filterBooks', icon: FileText },
  { key: 'courses' as ResourceCategory, labelKey: 'filterCourses', icon: GraduationCap },
  { key: 'documentation' as ResourceCategory, labelKey: 'filterDocumentation', icon: Code }
]

const getDifficultyColor = (difficulty: ResourceDifficulty) => {
  const colors = {
    beginner: 'bg-green-500/10 text-green-700 border-green-200',
    intermediate: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-500/10 text-red-700 border-red-200'
  }
  return colors[difficulty]
}

const getTypeColor = (type: ResourceType) => {
  const colors = {
    free: 'bg-blue-500/10 text-blue-700 border-blue-200',
    paid: 'bg-purple-500/10 text-purple-700 border-purple-200'
  }
  return colors[type]
}

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)
  // 显示比例状态管理 - 控制资源卡片图片的宽高比显示
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('aspect-[21/9]')
  // 排序状态管理
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'difficulty' | 'type'>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  // 筛选框显示/隐藏状态管理
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const filterRef = useRef<HTMLElement>(null)
  const t = useTranslation()

  const filteredResources = mockResources
    .filter(resource => {
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 }
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // 滚动监听效果
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDifference = currentScrollY - lastScrollY
          
          // 只有在滚动距离超过阈值时才触发隐藏/显示
          if (Math.abs(scrollDifference) > 15) {
            if (scrollDifference > 0 && currentScrollY > 150) {
              // 向下滚动且超过150px时隐藏
              setIsFilterVisible(false)
            } else if (scrollDifference < 0 || currentScrollY <= 100) {
              // 向上滚动或接近顶部时显示
              setIsFilterVisible(true)
            }
            setLastScrollY(currentScrollY)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // 添加防抖处理
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') return;
    
    // 安全地添加事件监听器
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('scroll', debouncedHandleScroll, { passive: true })
    }
    
    return () => {
      if (window && typeof window.removeEventListener === 'function') {
        window.removeEventListener('scroll', debouncedHandleScroll)
      }
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <PageLayout 
      showAspectRatio={true}
      aspectRatio={selectedRatio}
      onAspectRatioChange={setSelectedRatio}
    >
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-accent/5 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="container relative text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              {t.resources.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.resources.description}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 border-b bg-background/95 backdrop-blur-sm sticky top-16 z-40">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t.resources.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
                />
              </div>
              <Badge variant="secondary" className="text-xs">
                {filteredResources.length} 个资源
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {categoryFilters.map((filter) => {
                const Icon = filter.icon
                const isActive = selectedCategory === filter.key
                return (
                  <Button
                    key={filter.key}
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`transition-all duration-200 flex items-center justify-center gap-2 h-10 text-xs ${
                      isActive ? 'shadow-lg' : ''
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{t.resources[filter.labelKey]}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="container">
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-card hover-lift glow-hover group overflow-hidden h-full flex flex-col">
                    <div className="p-4 border-b border-border/50">
                      {/* Top Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`${getDifficultyColor(resource.difficulty)} border text-xs`}>
                          {t.resources[resource.difficulty]}
                        </Badge>
                        <Badge className={`${getTypeColor(resource.type)} border text-xs`}>
                          {t.resources[`${resource.type}Resource`]}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          ⭐ {resource.rating}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="flex-1 flex flex-col p-4">
                      {/* Title and Description */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                          {resource.description}
                        </p>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Author and Rating */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{resource.author}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(resource.rating)}
                            <span className="text-muted-foreground text-xs ml-1">({resource.rating})</span>
                          </div>
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex gap-2 ml-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3 opacity-60 hover:opacity-100 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(resource.url, '_blank')
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            查看
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3 opacity-60 hover:opacity-100 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(resource.downloadUrl || resource.url, '_blank')
                            }}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            下载
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {t.resources.noResults}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      

    </PageLayout>
  )
}