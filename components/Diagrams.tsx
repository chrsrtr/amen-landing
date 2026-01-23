/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Share2, Layers, Search, Workflow, ChevronRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Html, Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- LIQUID PLANET COMPONENT ---
const LiquidPlanet = ({ name, color, orbit, speed, delay, theme }: any) => {
    const ref = useRef<THREE.Mesh>(null);
    const htmlRef = useRef<HTMLDivElement>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime() * speed * 0.1 + delay;
            const x = Math.cos(t) * orbit * 0.04;
            const z = Math.sin(t) * orbit * 0.04;
            ref.current.position.set(x, 0, z);

            // Subtle floating motion
            ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + delay) * 0.1;
        }
    });

    return (
        <group>
            <Sphere ref={ref} args={[0.25, 64, 64]}>
                <MeshDistortMaterial
                    color={color.replace('bg-[', '').replace(']', '')}
                    speed={2}
                    distort={0.4}
                    radius={1}
                    metalness={0.4}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
                <Html distanceFactor={10} position={[0, 0, 0]} transform occlude="blending">
                    <div
                        ref={htmlRef}
                        className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-none transition-opacity duration-500"
                        style={{ transform: 'scale(0.5)' }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
                            {name}
                        </span>
                    </div>
                </Html>
            </Sphere>
        </group>
    );
};

// --- DATA STREAM PARTICLES ---
const DataStream = ({ theme }: { theme?: 'classic' | '2084' }) => {
    const count = 1000;
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2 + Math.random() * 6;
            const theta = Math.random() * Math.PI * 2;
            p[i * 3] = Math.cos(theta) * r;
            p[i * 3 + 1] = (Math.random() - 0.5) * 5;
            p[i * 3 + 2] = Math.sin(theta) * r;
        }
        return p;
    }, []);

    const ref = useRef<any>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Points positions={positions} stride={3} ref={ref}>
            <PointMaterial
                transparent
                color={theme === '2084' ? "#06b6d4" : "#C5A059"}
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.2}
            />
        </Points>
    );
};

// --- AMEN META DIAGRAM (THREE.JS VERSION) ---
export const MetaDataDiagram: React.FC<{ theme?: 'classic' | '2084' }> = ({ theme }) => {
    const platforms = [
        { id: 0, name: 'X', color: '#000000', orbit: 110, speed: 20 },
        { id: 1, name: 'Google', color: '#4285F4', orbit: 165, speed: 25 },
        { id: 2, name: 'LinkedIn', color: '#0077B5', orbit: 140, speed: 18 },
        { id: 3, name: 'Reddit', color: '#FF4500', orbit: 185, speed: 30 },
        { id: 4, name: 'Spotify', color: '#1DB954', orbit: 130, speed: 22 },
        { id: 5, name: 'Insta', color: '#ee2a7b', orbit: 175, speed: 28 },
        { id: 8, name: 'TikTok', color: '#ff0050', orbit: 210, speed: 24 },
        { id: 9, name: 'FB', color: '#1877F2', orbit: 145, speed: 32 },
        { id: 10, name: 'App', color: '#25D366', orbit: 125, speed: 19 },
        { id: 11, name: 'Snap', color: '#FFFC00', orbit: 155, speed: 21 },
    ];

    return (
        <div className={`flex flex-col items-center p-12 rounded-[3rem] shadow-2xl border transition-all duration-1000 my-8 overflow-hidden relative group h-[700px] ${theme === '2084' ? 'bg-black/40 border-white/5 backdrop-blur-3xl' : 'bg-white border-stone-100 shadow-inner'
            }`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-opacity ${theme === '2084' ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`} />

            <div className="z-10 text-center mb-8 pointer-events-none">
                <h3 className={`font-serif text-3xl mb-4 transition-colors ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>
                    Core Data Horizon
                </h3>
                <p className={`text-sm max-w-sm mx-auto transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-500'}`}>
                    Aggregating fragmented digital identities into a unified intelligence structure.
                </p>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
                    <ambientLight intensity={theme === '2084' ? 0.2 : 0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color={theme === '2084' ? "#06b6d4" : "#ffffff"} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

                    {/* Central Core Bubble */}
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <Sphere args={[1.2, 64, 64]}>
                            <MeshDistortMaterial
                                color={theme === '2084' ? "#06b6d4" : "#000000"}
                                speed={3}
                                distort={0.5}
                                radius={1}
                                metalness={0.8}
                                roughness={0.1}
                                transparent
                                opacity={0.6}
                            />
                            <Html center position={[0, 0, 0]}>
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    <img src="/images/core-logo.png" alt="Core" className="w-full h-full object-cover" />
                                </div>
                            </Html>
                        </Sphere>
                    </Float>

                    {/* Orbital Bubbles */}
                    {platforms.map((p, i) => (
                        <LiquidPlanet
                            key={p.id}
                            {...p}
                            delay={i * 1.5}
                            theme={theme}
                        />
                    ))}

                    <DataStream theme={theme} />
                    <Environment preset={theme === '2084' ? "night" : "apartment"} />
                </Canvas>
            </div>

            <div className="absolute bottom-12 z-10 flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase pointer-events-none">
                <div className="flex items-center gap-2 transition-colors">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${theme === '2084' ? 'bg-cyan-400' : 'bg-nobel-gold'}`} />
                    <span className={theme === '2084' ? 'text-white/40' : 'text-stone-400'}>Neural Stream</span>
                </div>
                <div className="flex items-center gap-2 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${theme === '2084' ? 'bg-white' : 'bg-stone-900'}`} />
                    <span className={theme === '2084' ? 'text-white/40' : 'text-stone-400'}>Active Synthesis</span>
                </div>
            </div>
        </div>
    );
};

// --- AMEN SPATIAL DIAGRAM ---
export const SpatialVisualizationDiagram: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setPhase(p => (p + 1) % 3), 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { title: "Ingestion", desc: "Parsing chat JSON logs" },
        { title: "Analysis", desc: "Mapping context nodes" },
        { title: "Rendering", desc: "Generating Spatial Seas" }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-900 text-white">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
                <h4 className="font-serif text-xl text-nobel-gold">The Spatial Flow</h4>
                <div className="flex gap-2">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${phase === i ? 'w-12 bg-nobel-gold' : 'w-4 bg-white/10'}`} />
                    ))}
                </div>
            </div>

            <div className="relative w-full max-w-md h-40 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
                            {phase === 0 && <Workflow className="text-nobel-gold" size={32} />}
                            {phase === 1 && <Search className="text-nobel-gold" size={32} />}
                            {phase === 2 && <Layers className="text-nobel-gold" size={32} />}
                        </div>
                        <h5 className="font-bold text-sm tracking-widest uppercase mb-1">{steps[phase].title}</h5>
                        <p className="text-xs text-stone-500">{steps[phase].desc}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-1 w-24">
                {[...Array(9)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="w-full aspect-square bg-nobel-gold/50 rounded-sm"
                    />
                ))}
            </div>
        </div>
    );
};

// --- PARTNER NETWORK DIAGRAM ---
export const PartnerNetworkDiagram: React.FC = () => {
    return (
        <div className="bg-[#F9F8F4] p-12 rounded-[2.5rem] border border-stone-200 shadow-inner h-full min-h-[400px] flex flex-col">
            <h3 className="font-serif text-2xl mb-8 text-stone-900">Distributed Intelligence Network</h3>

            <div className="flex-1 relative flex items-center justify-center">
                {/* Central Circle */}
                <div className="w-48 h-48 rounded-full border border-stone-200 border-dashed flex items-center justify-center animate-spin-slow">
                    <div className="w-4 h-4 rounded-full bg-nobel-gold absolute top-0" />
                    <div className="w-4 h-4 rounded-full bg-stone-900 absolute bottom-0" />
                </div>

                {/* Core */}
                <div className="absolute w-24 h-24 bg-white shadow-2xl rounded-full flex items-center justify-center z-10 border border-stone-100">
                    <span className="font-serif font-bold text-stone-900 text-xl">AMEN</span>
                </div>

                {/* Partners Floating */}
                <div className="absolute top-0 right-0 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                    <span className="text-[10px] font-bold text-stone-400 block mb-1">AGI RESEARCH</span>
                    <span className="font-serif text-sm">U Göttingen</span>
                </div>

                <div className="absolute bottom-10 left-0 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                    <span className="text-[10px] font-bold text-stone-400 block mb-1">ARCHITECTURE</span>
                    <span className="font-serif text-sm">TU Berlin</span>
                </div>

                <div className="absolute top-1/2 -right-12 translate-y-[-50%] p-3 bg-stone-900 text-white rounded-xl shadow-xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-nobel-gold animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Berlin Hub</span>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200 flex justify-between items-center">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F9F8F4] bg-stone-200" />)}
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-stone-900 hover:text-nobel-gold transition-colors">
                    Join Partners <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}