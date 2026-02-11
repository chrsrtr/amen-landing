/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Line, Text, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PaperAnalysis } from '@/lib/geminiService';

// Fix JSX intrinsic element errors by aliasing to any
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Group = 'group' as any;

const Node = ({ concept, position }: { concept: any, position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  const color = useMemo(() => {
    switch (concept.category) {
      case 'methodology': return '#4F46E5';
      case 'theory': return '#EC4899';
      case 'result': return '#14B8A6';
      default: return '#F59E0B';
    }
  }, [concept.category]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={ref} position={position} args={[0.2 * (concept.weight + 0.5), 32, 32]}>
        <MeshDistortMaterial color={color} distort={0.3} speed={2} metalness={0.8} roughness={0.2} />
      </Sphere>
      <Text
        position={[position[0], position[1] + 0.4, position[2]]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
      >
        {concept.label.toUpperCase()}
      </Text>
    </Float>
  );
};

const Connection = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  return (
    <Line
      points={[start, end]}
      color="#ffffff"
      lineWidth={0.5}
      transparent
      opacity={0.2}
    />
  );
};

export const Visualizer4D: React.FC<{ analysis: PaperAnalysis }> = ({ analysis }) => {
  const nodes = useMemo(() => {
    return analysis.keyConcepts.map((c, i) => {
      const angle = (i / analysis.keyConcepts.length) * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      return {
        ...c,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius
        ] as [number, number, number]
      };
    });
  }, [analysis]);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
      {/* Fix JSX intrinsic element errors */}
      <AmbientLight intensity={0.5} />
      {/* Fix JSX intrinsic element errors */}
      <PointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      {/* Fix JSX intrinsic element errors */}
      <Group>
        {nodes.map((node) => (
          <Node key={node.id} concept={node} position={node.position} />
        ))}
        {nodes.map((node) => 
          node.connections.map((targetId) => {
            const targetNode = nodes.find(n => n.id === targetId);
            if (targetNode) {
              return <Connection key={`${node.id}-${targetId}`} start={node.position} end={targetNode.position} />;
            }
            return null;
          })
        )}
      </Group>
    </Canvas>
  );
};
