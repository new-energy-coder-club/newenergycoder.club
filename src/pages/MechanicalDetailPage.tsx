import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Cog,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Zap,
  Calculator,
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
    title: '数学基础',
    description: '掌握机械工程和算法设计的数学基础',
    duration: '6-8周',
    difficulty: 'beginner',
    skills: ['线性代数', '微积分', '概率统计', '数值分析'],
    projects: ['矩阵运算器', '数值积分计算', '统计分析工具', '插值算法实现'],
    resources: {
      videos: 30,
      documents: 20,
      exercises: 40
    }
  },
  {
    id: 'mechanics',
    title: '力学建模',
    description: '学习机械系统的数学建模和仿真分析',
    duration: '8-10周',
    difficulty: 'intermediate',
    skills: ['刚体力学', '有限元分析', 'MATLAB/Simulink', '动力学仿真'],
    projects: ['机械臂运动学', '振动分析系统', '结构优化算法', '动态仿真平台'],
    resources: {
      videos: 40,
      documents: 30,
      exercises: 50
    }
  },
  {
    id: 'algorithms',
    title: '智能算法',
    description: '掌握机械设计中的优化算法和智能控制',
    duration: '10-12周',
    difficulty: 'advanced',
    skills: ['遗传算法', '神经网络', '模糊控制', '机器学习'],
    projects: ['智能控制系统', '参数优化平台', '故障诊断算法', 'AI辅助设计'],
    resources: {
      videos: 50,
      documents: 40,
      exercises: 60
    }
  }
];

// 项目案例数据
const projectCases: ProjectCase[] = [
  {
    id: 'robot-arm',
    title: '六自由度机械臂控制系统',
    description: '基于运动学和动力学建模的机械臂精确控制算法',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=six%20axis%20robotic%20arm%20with%20control%20system%20industrial%20setting&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '4-5周',
    techStack: ['MATLAB', 'Simulink', 'ROS', 'C++'],
    highlights: [
      '正逆运动学求解',
      '轨迹规划算法',
      '动力学补偿控制',
      '实时仿真验证'
    ]
  },
  {
    id: 'vibration-analysis',
    title: '机械振动分析与控制',
    description: '大型机械设备的振动监测、分析和主动控制系统',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mechanical%20vibration%20analysis%20system%20with%20sensors%20and%20monitoring&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '3-4周',
    techStack: ['Python', 'SciPy', 'LabVIEW', '信号处理'],
    highlights: [
      '频域分析算法',
      '模态参数识别',
      '主动振动控制',
      '故障预警系统'
    ]
  },
  {
    id: 'optimization',
    title: '机械结构优化设计',
    description: '基于多目标优化算法的机械结构轻量化设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mechanical%20structure%20optimization%20design%20CAD%20software%20interface&image_size=landscape_4_3',
    difficulty: 'intermediate',
    duration: '3-4周',
    techStack: ['Python', 'ANSYS', '遗传算法', 'SolidWorks API'],
    highlights: [
      '多目标优化算法',
      '拓扑优化设计',
      'CAD参数化建模',
      '性能评估系统'
    ]
  }
];

const MechanicalDetailPage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                <Cog className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              机械算法
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              融合机械工程与算法设计，掌握现代制造业的核心技术，
              成为智能制造时代的复合型人才
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4" />
                24-30周完整学习
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Users className="mr-2 h-4 w-4" />
                800+ 学员
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Star className="mr-2 h-4 w-4" />
                4.9/5.0 评分
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
              从数学基础到智能算法的完整学习体系
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
                    ? 'ring-2 ring-orange-500 shadow-lg' 
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
                          <div className="text-lg font-semibold text-orange-600">
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
              通过实际工程项目掌握机械算法的应用
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
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg">
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
                              <Target className="h-3 w-3 mr-2 text-orange-500" />
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
              准备成为机械算法专家？
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              掌握现代制造业的核心技术，开启智能制造职业生涯
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

export default MechanicalDetailPage;