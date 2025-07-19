import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating particles
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Purple/blue/pink color palette
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.5; // R
        colors[i * 3 + 1] = 0.2; // G
        colors[i * 3 + 2] = 1; // B (Purple)
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.2; // R
        colors[i * 3 + 1] = 0.5; // G
        colors[i * 3 + 2] = 1; // B (Blue)
      } else {
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 0.2; // G
        colors[i * 3 + 2] = 0.8; // B (Pink)
      }
    }
    
    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
      </points>
    </group>
  );
}

// Animated geometric shapes
function GeometricShapes() {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      sphereRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      boxRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });
  
  return (
    <>
      {/* Floating Torus */}
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={torusRef} position={[-3, 0, -2]}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.7}
            wireframe
            emissive="#4c1d95"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      
      {/* Floating Sphere */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[3, 1, -1]}>
          <meshStandardMaterial
            color="#ec4899"
            transparent
            opacity={0.6}
            emissive="#be185d"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
      
      {/* Floating Box */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <mesh ref={boxRef} position={[0, -1, -3]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.5}
            wireframe
            emissive="#1d4ed8"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
      <spotLight
        position={[0, 20, 0]}
        intensity={0.8}
        color="#3b82f6"
        angle={0.3}
        penumbra={1}
        castShadow
      />
      
      <FloatingParticles />
      <GeometricShapes />
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}