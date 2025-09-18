import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Cpu,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Zap,
  Code,
  Download
} from 'lucide-react';

// 学习阶段接口
interface LearningStage {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  projects: string[];
  resources: {
    videos: number;
    documents: number;
    exercises: number;
  };
}

// 项目案例接口
interface ProjectCase {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  techStack: string[];
  highlights: string[];
}

// 学习阶段数据
const learningStages: LearningStage[] = [
  {
    id: 'foundation',
    title: '基础入门',
    description: '掌握嵌入式开发的基础知识和核心概念',
    duration: '4-6周',
    difficulty: 'beginner',
    skills: ['C语言编程', '数字电路基础', '微控制器原理', 'GPIO操作'],
    projects: ['LED闪烁控制', '按键检测', '数码管显示', '蜂鸣器控制'],
    resources: {
      videos: 25,
      documents: 15,
      exercises: 30
    }
  },
  {
    id: 'intermediate',
    title: '进阶开发',
    description: '学习高级外设和通信协议的使用',
    duration: '6-8周',
    difficulty: 'intermediate',
    skills: ['定时器/计数器', 'ADC/DAC', 'UART/SPI/I2C', '中断处理'],
    projects: ['温度监控系统', '数据采集器', '无线通信模块', 'LCD显示系统'],
    resources: {
      videos: 35,
      documents: 25,
      exercises: 40
    }
  },
  {
    id: 'advanced',
    title: '高级应用',
    description: '掌握实时操作系统和复杂项目开发',
    duration: '8-10周',
    difficulty: 'advanced',
    skills: ['FreeRTOS', '低功耗设计', '硬件调试', '产品化开发'],
    projects: ['智能家居控制器', '工业监控系统', '物联网网关', '嵌入式AI应用'],
    resources: {
      videos: 45,
      documents: 35,
      exercises: 50
    }
  }
];

// 项目案例数据
const projectCases: ProjectCase[] = [
  {
    id: 'smart-home',
    title: '智能家居控制系统',
    description: '基于STM32的智能家居控制系统，支持远程控制和自动化场景',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20home%20control%20system%20with%20STM32%20microcontroller%20modern%20interface&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '3-4周',
    techStack: ['STM32', 'FreeRTOS', 'WiFi', 'MQTT'],
    highlights: [
      '支持多种传感器接入',
      '实现远程APP控制',
      '自动化场景编程',
      '低功耗设计'
    ]
  },
  {
    id: 'iot-gateway',
    title: '物联网数据网关',
    description: '工业级物联网数据采集和传输网关，支持多协议通信',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20IoT%20gateway%20device%20with%20multiple%20communication%20protocols&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '4-5周',
    techStack: ['ARM Cortex-M', 'Ethernet', 'Modbus', 'LoRa'],
    highlights: [
      '多协议数据采集',
      '边缘计算处理',
      '云端数据同步',
      '故障自诊断'
    ]
  },
  {
    id: 'wearable-device',
    title: '可穿戴健康监测设备',
    description: '基于低功耗MCU的健康监测设备，实时监测生理指标',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wearable%20health%20monitoring%20device%20with%20sensors%20modern%20design&image_size=landscape_4_3',
    difficulty: 'intermediate',
    duration: '2-3周',
    techStack: ['nRF52', 'BLE', '传感器融合', '低功耗算法'],
    highlights: [
      '多生理参数监测',
      '超低功耗设计',
      '蓝牙数据传输',
      '移动APP配套'
    ]
  }
];

const EmbeddedDetailPage: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('foundation');
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门';
      case 'intermediate': return '进阶';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                <Cpu className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              嵌入式开发
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              从零开始学习嵌入式系统开发，掌握硬件与软件结合的核心技术，
              成为物联网时代的技术专家
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4" />
                18-24周完整学习
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Users className="mr-2 h-4 w-4" />
                1200+ 学员
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Star className="mr-2 h-4 w-4" />
                4.8/5.0 评分
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Play className="mr-2 h-5 w-5" />
                开始学习
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                <Download className="mr-2 h-5 w-5" />
                下载大纲
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">学习路径</h2>
            <p className="text-lg text-muted-foreground">
              循序渐进的学习计划，从基础到高级应用
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {learningStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedStage === stage.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedStage(stage.id)}
              >
                <Card className={`h-full ${
                  selectedStage === stage.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                      <Badge className={getDifficultyColor(stage.difficulty)}>
                        {getDifficultyText(stage.difficulty)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{stage.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {stage.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">核心技能</h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">实战项目</h4>
                        <ul className="space-y-1">
                          {stage.projects.slice(0, 2).map((project, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {project}
                            </li>
                          ))}
                        </ul>
                        {stage.projects.length > 2 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            +{stage.projects.length - 2} 个项目
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-semibold text-blue-600">
                            {stage.resources.videos}
                          </div>
                          <div className="text-xs text-muted-foreground">视频</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-green-600">
                            {stage.resources.documents}
                          </div>
                          <div className="text-xs text-muted-foreground">文档</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-purple-600">
                            {stage.resources.exercises}
                          </div>
                          <div className="text-xs text-muted-foreground">练习</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 项目案例 */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">项目案例</h2>
            <p className="text-lg text-muted-foreground">
              通过实际项目掌握嵌入式开发的核心技能
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectCases.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {getDifficultyText(project.difficulty)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {project.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">技术栈</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">项目亮点</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center">
                              <Target className="h-3 w-3 mr-2 text-blue-500" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" variant="outline">
                        查看详情
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备开始你的嵌入式开发之旅？
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              加入我们的学习社区，获得专业指导和项目实战机会
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Zap className="mr-2 h-5 w-5" />
                立即报名
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                <BookOpen className="mr-2 h-5 w-5" />
                了解更多
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EmbeddedDetailPage;