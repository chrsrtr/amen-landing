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

// --- AMEN META DIAGRAM (STAGE 1: SIMPLE SVG VERSION) ---
export const MetaDataDiagram: React.FC<{
    theme?: 'classic' | '2084',
    title: string,
    description: string,
    sourceLabel: string,
    hubLabel: string
}> = ({ theme, title, description, sourceLabel, hubLabel }) => {
    const platforms = [
        { id: 0, name: 'X', color: '#000000', angle: 0 },
        { id: 1, name: 'Google', color: '#4285F4', angle: 36 },
        { id: 2, name: 'LinkedIn', color: '#0077B5', angle: 72 },
        { id: 3, name: 'Reddit', color: '#FF4500', angle: 108 },
        { id: 4, name: 'Spotify', color: '#1DB954', angle: 144 },
        { id: 5, name: 'Insta', color: '#ee2a7b', angle: 180 },
        { id: 6, name: 'TikTok', color: '#ff0050', angle: 216 },
        { id: 7, name: 'FB', color: '#1877F2', angle: 252 },
        { id: 8, name: 'WhatsApp', color: '#25D366', angle: 288 },
        { id: 9, name: 'Snap', color: '#FFFC00', angle: 324 },
    ];

    const radius = 180; // SVG circle radius
    const centerX = 250;
    const centerY = 250;

    return (
        <div className={`flex flex-col items-center p-12 rounded-[3rem] shadow-2xl border transition-all duration-1000 my-8 overflow-hidden relative ${theme === '2084' ? 'bg-black/40 border-white/5 backdrop-blur-3xl' : 'bg-white border-stone-100 shadow-inner'
            }`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-opacity ${theme === '2084' ? 'opacity-100' : 'opacity-0'}`} />

            <div className="z-10 text-center mb-8">
                <h3 className={`text-3xl font-bold tracking-tight mb-4 transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm max-w-sm mx-auto transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-500'}`}>
                    {description}
                </p>
            </div>

            {/* SVG Diagram */}
            <svg viewBox="0 0 500 500" className="w-full max-w-lg">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill={theme === '2084' ? '#06b6d4' : '#5E5CE6'}
                        />
                    </marker>
                </defs>

                {/* Connection Lines with Arrows */}
                {platforms.map((platform) => {
                    const x = centerX + radius * Math.cos((platform.angle - 90) * Math.PI / 180);
                    const y = centerY + radius * Math.sin((platform.angle - 90) * Math.PI / 180);

                    // We draw from platform to center to show flow direction
                    // Adjust end point so arrow doesn't overlap core
                    const distToCenter = 65; // Shorten the line to point at core edge
                    const targetX = centerX + distToCenter * Math.cos((platform.angle - 90) * Math.PI / 180);
                    const targetY = centerY + distToCenter * Math.sin((platform.angle - 90) * Math.PI / 180);

                    return (
                        <g key={`flow-group-${platform.id}`}>
                            <line
                                x1={x}
                                y1={y}
                                x2={targetX}
                                y2={targetY}
                                stroke={theme === '2084' ? '#06b6d4' : '#5E5CE6'}
                                strokeWidth="1"
                                opacity="0.2"
                                markerEnd="url(#arrowhead)"
                            />

                            {/* Animated Data Particles */}
                            {[0, 1, 2].map((i) => (
                                <motion.circle
                                    key={`particle-${platform.id}-${i}`}
                                    r="2"
                                    fill={theme === '2084' ? '#06b6d4' : '#5E5CE6'}
                                    initial={{ x: x, y: y, opacity: 0 }}
                                    animate={{
                                        x: centerX,
                                        y: centerY,
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.6 + (platform.id * 0.2),
                                        ease: "linear"
                                    }}
                                />
                            ))}
                        </g>
                    );
                })}

                {/* Platform Circles */}
                {platforms.map((platform) => {
                    const x = centerX + radius * Math.cos((platform.angle - 90) * Math.PI / 180);
                    const y = centerY + radius * Math.sin((platform.angle - 90) * Math.PI / 180);

                    const circleRadius = 32;

                    return (
                        <g key={platform.id}>
                            <circle
                                cx={x}
                                cy={y}
                                r={circleRadius}
                                fill={platform.color}
                                opacity="0.8"
                            />
                            <text
                                x={x}
                                y={y + 4}
                                textAnchor="middle"
                                className="text-[10px] font-bold fill-white"
                                style={{
                                    pointerEvents: 'none',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                                }}
                            >
                                {platform.name}
                            </text>
                        </g>
                    );
                })}

                {/* Central Core */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="60"
                    fill={theme === '2084' ? '#06b6d4' : '#000000'}
                    opacity="0.2"
                />
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="50"
                    fill={theme === '2084' ? '#0e7490' : '#5E5CE6'}
                    opacity="0.6"
                />

                {/* Logo Container */}
                <foreignObject x={centerX - 30} y={centerY - 30} width="60" height="60">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex items-center justify-center bg-white/10">
                        <img src="/images/core-logo.png" alt="Core" className="w-full h-full object-cover" />
                    </div>
                </foreignObject>
            </svg>

            <div className="mt-8 flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase">
                <div className="flex items-center gap-2 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${theme === '2084' ? 'bg-cyan-400' : 'bg-nobel-gold'}`} />
                    <span className={theme === '2084' ? 'text-white/40' : 'text-stone-400'}>{sourceLabel}</span>
                </div>
                <div className="flex items-center gap-2 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${theme === '2084' ? 'bg-white' : 'bg-stone-900'}`} />
                    <span className={theme === '2084' ? 'text-white/40' : 'text-stone-400'}>{hubLabel}</span>
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
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-900 text-white rounded-[2rem]">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
                <h4 className="font-sf-pro font-bold text-xl text-nobel-gold tracking-tight">The Spatial Flow</h4>
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
        <div className="bg-white p-12 rounded-[2.5rem] border border-stone-200 shadow-inner h-full min-h-[400px] flex flex-col">
            <h3 className="font-sf-pro font-bold tracking-tight text-2xl mb-8 text-stone-900">Distributed Intelligence Network</h3>

            <div className="flex-1 relative flex items-center justify-center">
                {/* Central Circle */}
                <div className="w-48 h-48 rounded-full border border-stone-200 border-dashed flex items-center justify-center animate-spin-slow">
                    <div className="w-4 h-4 rounded-full bg-nobel-gold absolute top-0" />
                    <div className="w-4 h-4 rounded-full bg-stone-900 absolute bottom-0" />
                </div>

                {/* Core */}
                <div className="absolute w-24 h-24 bg-white shadow-2xl rounded-full flex items-center justify-center z-10 border border-stone-100 italic">
                    <span className="font-sf-pro font-black text-stone-900 text-xl tracking-tighter">AMEN</span>
                </div>

                {/* Partners Floating */}
                <div className="absolute top-0 right-0 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                    <span className="text-[10px] font-bold text-stone-400 block mb-1">AGI RESEARCH</span>
                    <span className="font-sf-pro font-bold text-sm">U Göttingen</span>
                </div>

                <div className="absolute bottom-10 left-0 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                    <span className="text-[10px] font-bold text-stone-400 block mb-1">ARCHITECTURE</span>
                    <span className="font-sf-pro font-bold text-sm">TU Berlin</span>
                </div>

                <div className="absolute top-1/2 -right-12 translate-y-[-50%] p-3 bg-stone-900 text-white rounded-xl shadow-xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-nobel-gold animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Berlin Hub</span>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200 flex justify-between items-center">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-200" />)}
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-stone-900 hover:text-nobel-gold transition-colors">
                    Join Partners <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}