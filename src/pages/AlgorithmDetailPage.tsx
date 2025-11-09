import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calculator,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Target,
  Zap,
  Code,
  Download
} from 'lucide-react';

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

const learningStages: LearningStage[] = [
  {
    id: 'foundation',
    title: '基础入门',
    description: '构建算法与数据结构的核心基础，掌握复杂度与基本结构',
    duration: '4-6周',
    difficulty: 'beginner',
    skills: ['时间/空间复杂度', '数组与链表', '栈与队列', '哈希表'],
    projects: ['LRU缓存', '表达式求值器', '哈希冲突解决', '链表操作库'],
    resources: { videos: 25, documents: 18, exercises: 40 }
  },
  {
    id: 'intermediate',
    title: '进阶设计',
    description: '掌握经典算法范式与树、图结构的应用',
    duration: '6-8周',
    difficulty: 'intermediate',
    skills: ['排序与搜索', '二叉树/AVL', '图遍历', '动态规划'],
    projects: ['图最短路工具', '区间DP求解器', '二叉搜索树库', '启发式搜索'],
    resources: { videos: 35, documents: 25, exercises: 50 }
  },
  {
    id: 'advanced',
    title: '高级应用',
    description: '优化与工程落地，掌握并行化与高性能数据结构',
    duration: '8-10周',
    difficulty: 'advanced',
    skills: ['并行算法', '缓存优化', '索引结构', '图算法优化'],
    projects: ['并行排序库', '图分析平台', '高性能索引', '调度优化器'],
    resources: { videos: 45, documents: 32, exercises: 60 }
  }
];

const projectCases: ProjectCase[] = [
  {
    id: 'graph-analyzer',
    title: '图分析平台',
    description: '支持大规模图数据分析，提供常用图算法与可视化',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=graph%20analysis%20platform%20with%20data%20structures%20visualization%20modern%20UI&image_size=landscape_4_3',
    difficulty: 'advanced',
    duration: '3-4周',
    techStack: ['TypeScript', 'WebAssembly', 'Graph Library'],
    highlights: ['高性能遍历', '社区检测', '路径分析', '交互式可视化']
  },
  {
    id: 'dp-solver',
    title: '动态规划求解器',
    description: '可配置的DP问题求解框架，支持多种优化策略',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dynamic%20programming%20solver%20software%20interface%20modern%20UI&image_size=landscape_4_3',
    difficulty: 'intermediate',
    duration: '2-3周',
    techStack: ['TypeScript', 'Node.js', '算法库'],
    highlights: ['记忆化/状态压缩', '可视化递推', '测试用例套件', '结果导出']
  },
  {
    id: 'cache-lib',
    title: '高性能缓存库',
    description: '提供LRU/LFU等策略的缓存组件，针对工程场景优化',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=high%20performance%20cache%20library%20software%20modern%20UI&image_size=landscape_4_3',
    difficulty: 'beginner',
    duration: '1-2周',
    techStack: ['TypeScript', 'Rust (可选)', 'Benchmark'],
    highlights: ['并发安全', '可插拔策略', '压测报告', '易集成']
  }
];

const AlgorithmDetailPage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                <Calculator className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              算法与数据结构
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              深入算法设计与优化，提升工程问题的建模与求解能力
            </p>
            <div className="flex flex-wrap items中心 justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4" />
                18-24周完整学习
              </Badge>
              <Badge className="px-4 py-2 text-sm">
                <Users className="mr-2 h-4 w-4" />
                1000+ 学员
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
          <h2 className="text-3xl font-bold mb-8">学习路径</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {learningStages.map((stage) => (
              <Card key={stage.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{stage.title}</CardTitle>
                    <Badge className={getDifficultyColor(stage.difficulty)}>{getDifficultyText(stage.difficulty)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{stage.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{stage.duration}</span>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-sm font-medium mb-1">核心技能</h4>
                    <div className="flex flex-wrap gap-1">
                      {stage.skills.map((s, i) => (<Badge key={i} variant="secondary" className="text-xs">{s}</Badge>))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">项目案例</h4>
                    <ul className="text-sm list-disc pl-5 text-muted-foreground">
                      {stage.projects.map((p) => (<li key={p}>{p}</li>))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 项目案例 */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">项目案例</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projectCases.map((proj) => (
              <Card key={proj.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{proj.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={proj.image} alt={proj.title} className="rounded-lg mb-3" />
                  <p className="text-muted-foreground mb-3">{proj.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{proj.duration}</span>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-sm font-medium mb-1">技术栈</h4>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((s, i) => (<Badge key={i} variant="secondary" className="text-xs">{s}</Badge>))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">亮点</h4>
                    <ul className="text-sm list-disc pl-5 text-muted-foreground">
                      {proj.highlights.map((h) => (<li key={h}>{h}</li>))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 报名与进度 */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>报名与进度</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">报名开始后可查看个人学习进度与阶段目标完成情况</p>
              <div className="flex items-center gap-4">
                <Progress value={enrollmentProgress} className="w-full" />
                <Badge variant="secondary">{enrollmentProgress}%</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  立即报名
                </Button>
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  查看课程
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AlgorithmDetailPage;