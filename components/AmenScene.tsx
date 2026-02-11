/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix JSX intrinsic element errors by aliasing to any
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const CylinderGeometry = 'cylinderGeometry' as any;

const ParticleWave = ({ theme }: { theme?: 'classic' | '2084' }) => {
  const points = useMemo(() => {
    const p = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, []);

  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <Points positions={points} stride={3} ref={ref}>
      <PointMaterial
        transparent
        color={theme === '2084' ? "#06b6d4" : "#5E5CE6"}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={theme === '2084' ? 0.6 : 0.4}
      />
    </Points>
  );
};

const AmenCore = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1 + position[0]) * 0.1;
      ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.2}
        roughness={0.1}
        distort={0.4}
        speed={1.5}
        transparent={true}
        opacity={0.5}
      />
    </Sphere>
  );
};

export const HeroScene: React.FC<{ theme?: 'classic' | '2084' }> = ({ theme }) => {
  return (
    <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${theme === '2084' ? 'opacity-100' : 'opacity-80'} pointer-events-none`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <AmbientLight intensity={theme === '2084' ? 0.2 : 0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={theme === '2084' ? 5 : 2} color={theme === '2084' ? "#06b6d4" : "#ffffff"} />
        <PointLight position={[-10, -10, -10]} intensity={theme === '2084' ? 2 : 1} color={theme === '2084' ? "#0891b2" : "#5E5CE6"} />

        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
          <AmenCore position={[0, 0, 0]} color={theme === '2084' ? "#0e7490" : "#E0F2FE"} scale={2.2} />
          <ParticleWave theme={theme} />
        </Float>

        <Environment preset={theme === '2084' ? "night" : "city"} />
        {theme === '2084' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      </Canvas>
    </div>
  );
};

export const IntelligenceWebScene: React.FC<{ theme?: 'classic' | '2084' }> = ({ theme }) => {
  return (
    <div className={`w-full h-full absolute inset-0 transition-colors duration-1000 ${theme === '2084' ? 'bg-black' : 'bg-[#F5F4F0]'}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <AmbientLight intensity={theme === '2084' ? 0.3 : 0.8} />
        <PointLight position={[5, 5, 5]} intensity={1.5} color={theme === '2084' ? "#06b6d4" : "#5E5CE6"} />
        <Environment preset={theme === '2084' ? "night" : "studio"} />

        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
          {/* Abstract connection web nodes */}
          {[-1.5, 0, 1.5].map((x, i) => (
            <Mesh key={i} position={[x, Math.sin(x) * 0.5, 0]}>
              <SphereGeometry args={[0.08, 32, 32]} />
              <MeshStandardMaterial color={theme === '2084' ? "#06b6d4" : "#5E5CE6"} metalness={1} roughness={0.1} />
            </Mesh>
          ))}

          {/* Abstract Lines */}
          <Mesh rotation={[0, 0, Math.PI / 4]}>
            <CylinderGeometry args={[0.005, 0.005, 4, 8]} />
            <MeshStandardMaterial color={theme === '2084' ? "#0e7490" : "#E5E7EB"} transparent opacity={0.5} />
          </Mesh>
          <Mesh rotation={[0, 0, -Math.PI / 4]}>
            <CylinderGeometry args={[0.005, 0.005, 4, 8]} />
            <MeshStandardMaterial color={theme === '2084' ? "#0e7490" : "#E5E7EB"} transparent opacity={0.5} />
          </Mesh>
        </Float>

        <Stars radius={50} depth={20} count={theme === '2084' ? 2000 : 500} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}