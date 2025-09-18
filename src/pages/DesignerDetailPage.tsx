import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Palette,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Zap,
  Brush,
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
    title: '设计基础',
    description: '掌握设计理论和基础工具的使用',
    duration: '4-6周',
    difficulty: 'beginner',
    skills: ['设计原理', 'Photoshop', 'Illustrator', '色彩理论'],
    projects: ['品牌标志设计', '海报设计', '名片设计', '图标设计'],
    resources: {
      videos: 35,
      documents: 25,
      exercises: 45
    }
  },
  {
    id: 'ui_ux',
    title: 'UI/UX设计',
    description: '学习用户界面和用户体验设计',
    duration: '8-10周',
    difficulty: 'intermediate',
    skills: ['用户研究', 'Figma', '原型设计', '交互设计'],
    projects: ['移动应用界面', '网站设计', '用户体验优化', '设计系统构建'],
    resources: {
      videos: 45,
      documents: 35,
      exercises: 55
    }
  },
  {
    id: 'advanced',
    title: '高级设计',
    description: '掌握品牌设计和创意策略',
    duration: '6-8周',
    difficulty: 'advanced',
    skills: ['品牌策略', '创意思维', '项目管理', '商业设计'],
    projects: ['品牌全案设计', '创意广告', '包装设计', '展示设计'],
    resources: {
      videos: 40,
      documents: 30,
      exercises: 35
    }
  }
];

// 项目案例数据
const projectCases: ProjectCase[] = [
  {
    id: 'brand-identity',
    title: '科技公司品牌全案设计',
    description: '从品牌策略到视觉识别系统的完整品牌设计项目',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tech%20company%20brand%20identity%20design%20logo%20business%20cards%20stationery&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '4-6周',
    techStack: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
    highlights: [
      '品牌策略制定',
      '视觉识别系统',
      '应用系统设计',
      '品牌手册制作'
    ]
  },
  {
    id: 'mobile-app',
    title: '电商移动应用UI设计',
    description: '现代化电商应用的完整用户界面和体验设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20e-commerce%20mobile%20app%20UI%20design%20interface%20screens&image_size=landscape_4_3',
    difficulty: 'intermediate',
    duration: '3-4周',
    techStack: ['Figma', 'Sketch', 'Principle', 'Zeplin'],
    highlights: [
      '用户体验研究',
      '界面设计系统',
      '交互原型制作',
      '设计规范输出'
    ]
  },
  {
    id: 'web-design',
    title: '企业官网响应式设计',
    description: '多终端适配的企业官网设计和前端实现',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=responsive%20corporate%20website%20design%20multiple%20devices%20modern%20layout&image_size=landscape_4_3',
    difficulty: 'intermediate',
    duration: '3-4周',
    techStack: ['Figma', 'HTML/CSS', 'JavaScript', 'Webflow'],
    highlights: [
      '响应式布局设计',
      '视觉层次构建',
      '前端代码实现',
      '性能优化考虑'
    ]
  }
];

const DesignerDetailPage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Palette className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              设计师
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              从平面设计到用户体验，掌握现代设计的全栈技能，
              成为数字时代的创意专家
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4" />
                18-24周完整学习
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Users className="mr-2 h-4 w-4" />
                1500+ 学员
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
              从设计基础到高级创意的系统化学习路径
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
                    ? 'ring-2 ring-purple-500 shadow-lg' 
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
                          <div className="text-lg font-semibold text-purple-600">
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
                          <div className="text-lg font-semibold text-pink-600">
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
              通过真实商业项目提升设计实战能力
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
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg">
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
                              <Target className="h-3 w-3 mr-2 text-purple-500" />
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
              准备开启你的设计师之路？
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              加入我们的创意社区，与优秀设计师一起成长
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

export default DesignerDetailPage;