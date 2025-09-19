import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Points } from 'three';
import { OrbitControls } from '@react-three/drei';
import { Eye, EyeOff, Zap, Settings } from 'lucide-react';

/**
 * 旋转的几何体组件
 * 包含三个不同的3D几何体：立方体、球体和环形体
 * 每个几何体都有独立的旋转动画
 */
function RotatingGeometry() {
  // 创建三个几何体的引用，用于控制动画
  const meshRef = useRef<Mesh>(null!);    // 中心立方体引用
  const sphereRef = useRef<Mesh>(null!);  // 左侧球体引用
  const torusRef = useRef<Mesh>(null!);   // 右侧环形体引用

  // 使用useFrame钩子在每一帧更新几何体的旋转
  // delta是上一帧到当前帧的时间差，确保动画流畅
  useFrame((state, delta) => {
    // 立方体绕X轴和Y轴旋转
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;  // X轴旋转速度
      meshRef.current.rotation.y += delta * 0.3;  // Y轴旋转速度
    }
    // 球体绕X轴和Z轴旋转
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.2;  // 较慢的X轴旋转
      sphereRef.current.rotation.z += delta * 0.4;  // Z轴旋转
    }
    // 环形体绕Y轴和Z轴旋转
    if (torusRef.current) {
      torusRef.current.rotation.y += delta * 0.6;  // 较快的Y轴旋转
      torusRef.current.rotation.z += delta * 0.2;  // 慢速Z轴旋转
    }
  });

  return (
    <>
      {/* 中心立方体 - 蓝色线框立方体，位于场景中心 */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />  {/* 1x1x1的立方体几何 */}
        <meshStandardMaterial color="#3b82f6" wireframe />  {/* 蓝色线框材质 */}
      </mesh>
      
      {/* 左侧球体 - 绿色实心球体，位于左侧 */}
      <mesh ref={sphereRef} position={[-3, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />  {/* 半径0.5，32段精度的球体 */}
        <meshStandardMaterial color="#10b981" />  {/* 绿色实心材质 */}
      </mesh>
      
      {/* 右侧环形体 - 橙色环形几何体，位于右侧 */}
      <mesh ref={torusRef} position={[3, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />  {/* 外径0.6，管径0.2的环形体 */}
        <meshStandardMaterial color="#f59e0b" />  {/* 橙色实心材质 */}
      </mesh>
    </>
  );
}

/**
 * 粒子效果组件
 * 创建200个随机分布的粒子，形成星空效果
 * 整个粒子场会缓慢旋转
 */
function ParticleField() {
  const particlesRef = useRef<Points>(null!);  // 粒子系统的引用
  
  // 粒子场的旋转动画，基于时间缓慢旋转
  useFrame((state) => {
    if (particlesRef.current) {
      // 使用时间来控制Y轴旋转，创建缓慢的旋转效果
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // 使用useMemo优化性能，只在组件初始化时创建粒子位置
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(200 * 3);  // 200个粒子，每个粒子3个坐标(x,y,z)
    for (let i = 0; i < 200; i++) {
      // 在3D空间中随机分布粒子
      positions[i * 3] = (Math.random() - 0.5) * 20;      // X坐标：-10到10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;  // Y坐标：-5到5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;  // Z坐标：-10到10
    }
    return positions;
  }, []);  // 空依赖数组，确保只计算一次

  return (
    <points ref={particlesRef}>
      {/* 缓冲几何体，用于高效渲染大量粒子 */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"  // 将位置数据附加到几何体
          count={200}                   // 粒子数量
          array={particlePositions}     // 位置数据数组
          itemSize={3}                  // 每个粒子3个坐标值
        />
      </bufferGeometry>
      {/* 粒子材质：紫色，小尺寸 */}
      <pointsMaterial size={0.05} color="#8b5cf6" />
    </points>
  );
}

/**
 * 主要的Three.js动画组件
 * 集成了旋转几何体和粒子效果，提供完整的3D动画场景
 * 支持显示/隐藏控制和加载状态管理
 */
export default function ThreeJsAnimation() {
  // 控制动画显示/隐藏的状态
  const [isVisible, setIsVisible] = useState(true);
  // 控制加载状态
  const [isLoading, setIsLoading] = useState(true);
  // 控制错误状态
  const [hasError, setHasError] = useState(false);
  // 控制简化模式
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  // 模拟加载过程
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 错误边界处理
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

/**
 * 简化版本的静态替代方案
 * 使用CSS动画和SVG图形创建轻量级的视觉效果
 */
function SimpleStaticVersion() {
  return (
    <div className="w-full h-[200px] bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-lg relative overflow-hidden flex items-center justify-center">
      {/* 背景动画效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-6 left-12 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      </div>
      
      {/* 中心内容 */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {/* 简化的几何图形 */}
          <div className="w-8 h-8 border-2 border-blue-400 rotate-45 animate-spin" style={{animationDuration: '3s'}}></div>
          <div className="w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-8 h-4 border-2 border-orange-400 rounded-full animate-pulse"></div>
        </div>
        <div className="text-white/80 text-sm font-medium">
          <Zap className="inline-block w-4 h-4 mr-1 text-yellow-400" />
          新能源技术创新展示
        </div>
        <div className="text-white/60 text-xs mt-1">
          简化模式 - 轻量级视觉效果
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="container_distortion-T_UT23 w-full">
      <div className="content-rrUxd3">
        <div className="h-full overflow-hidden mx-auto w-full max-w-[1600px]">
          {/* 控制按钮区域 */}
          <div className="flex justify-end mb-2 space-x-2">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-md transition-colors"
              title={isVisible ? '隐藏3D动画' : '显示3D动画'}
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              {isVisible ? '隐藏动画' : '显示动画'}
            </button>
            
            {/* 简化模式切换按钮 */}
            <button
              onClick={() => setIsSimpleMode(!isSimpleMode)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-md transition-colors"
              title={isSimpleMode ? '切换到完整模式' : '切换到简化模式'}
            >
              {isSimpleMode ? <Settings size={16} /> : <Zap size={16} />}
              {isSimpleMode ? '完整模式' : '简化模式'}
            </button>
          </div>

          <div className="w-full h-[200px] bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-lg relative">
            {/* 加载状态 */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                <div className="text-white text-sm">加载3D场景中...</div>
              </div>
            )}

            {/* 错误状态 */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 rounded-lg">
                <div className="text-red-300 text-sm">3D场景加载失败</div>
              </div>
            )}

            {/* 隐藏状态的占位符 */}
            {!isVisible && !isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30 rounded-lg">
                <div className="text-gray-400 text-sm">3D动画已隐藏</div>
              </div>
            )}

            {/* Three.js Canvas - 只在可见且无错误时渲染 */}
            {isVisible && !isLoading && !hasError && (
              isSimpleMode ? (
                // 简化模式 - 显示静态替代方案
                <SimpleStaticVersion />
              ) : (
                // 完整模式 - 显示Three.js动画
                <Canvas
                  camera={{ position: [0, 0, 8], fov: 60 }}  // 相机位置和视野角度
                  style={{ width: '100%', height: '100%' }}
                  onError={handleError}  // 错误处理
                >
                  {/* 环境光 - 提供基础照明 */}
                  <ambientLight intensity={0.3} />
                  
                  {/* 定向光 - 主要光源，模拟太阳光 */}
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  
                  {/* 点光源 - 蓝色辅助光源 */}
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                  
                  {/* 旋转几何体组件 */}
                  <RotatingGeometry />
                  
                  {/* 粒子效果组件 */}
                  <ParticleField />
                  
                  {/* 轨道控制器 - 允许用户交互，自动旋转 */}
                  <OrbitControls 
                    enableZoom={false}      // 禁用缩放
                    enablePan={false}       // 禁用平移
                    autoRotate              // 启用自动旋转
                    autoRotateSpeed={0.5}   // 自动旋转速度
                  />
                </Canvas>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}