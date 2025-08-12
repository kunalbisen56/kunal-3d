import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated floating particles
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Create simple particle system */}
      {Array.from({ length: 50 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#ec4899" : "#3b82f6"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
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
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      boxRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });
  
  return (
    <>
      {/* Floating Torus */}
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
      
      {/* Floating Sphere */}
      <mesh ref={sphereRef} position={[3, 1, -1]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          transparent
          opacity={0.6}
          emissive="#be185d"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Floating Box */}
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
      />
      
      <FloatingParticles />
      <GeometricShapes />
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
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}