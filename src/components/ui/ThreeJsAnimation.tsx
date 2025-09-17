import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Points } from 'three';
import { OrbitControls } from '@react-three/drei';

// 旋转的几何体组件
function RotatingGeometry() {
  const meshRef = useRef<Mesh>(null!);
  const sphereRef = useRef<Mesh>(null!);
  const torusRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.2;
      sphereRef.current.rotation.z += delta * 0.4;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y += delta * 0.6;
      torusRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <>
      {/* 中心立方体 */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" wireframe />
      </mesh>
      
      {/* 左侧球体 */}
      <mesh ref={sphereRef} position={[-3, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* 右侧环形 */}
      <mesh ref={torusRef} position={[3, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </>
  );
}

// 粒子效果组件
function ParticleField() {
  const particlesRef = useRef<Points>(null!);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // 创建粒子位置
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" />
    </points>
  );
}

// 主要的Three.js动画组件
export default function ThreeJsAnimation() {
  return (
    <div className="container_distortion-T_UT23 w-full">
      <div className="content-rrUxd3">
        <div className="h-full overflow-hidden mx-auto w-full max-w-[1600px]">
          <div className="w-full h-[200px] bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-lg">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              style={{ width: '100%', height: '100%' }}
            >
              {/* 环境光 */}
              <ambientLight intensity={0.3} />
              
              {/* 定向光 */}
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              {/* 点光源 */}
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
              
              {/* 旋转几何体 */}
              <RotatingGeometry />
              
              {/* 粒子效果 */}
              <ParticleField />
              
              {/* 轨道控制器（可选，允许用户交互） */}
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}