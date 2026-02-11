import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';

interface Interest {
    id: string;
    name: string;
    weight: number; // 0.5 to 1.5 for scaling
    category: string;
    color: string;
    textColor: string;
    keywords: string[];
    // Position offsets from center (%)
    x: number;
    y: number;
}

const INTERESTS: Interest[] = [
    { id: '1', name: 'Tech/AI', weight: 1.4, category: 'Innovation', color: '#06b6d4', textColor: '#ffffff', keywords: ['GPT-5', 'LLMs', 'Neural Arch'], x: -28, y: -35 },
    { id: '2', name: 'Wellness', weight: 1.1, category: 'Self-Care', color: '#10b981', textColor: '#ffffff', keywords: ['Meditation', 'Sleep', 'Biohacking'], x: -35, y: 15 },
    { id: '3', name: 'Politics', weight: 1.2, category: 'News', color: '#ef4444', textColor: '#ffffff', keywords: ['Elections', 'Policy', 'Debate'], x: 32, y: -30 },
    { id: '4', name: 'Gaming', weight: 1.3, category: 'Fun', color: '#8b5cf6', textColor: '#ffffff', keywords: ['Unreal Engine', 'FPS', 'Stream'], x: 38, y: 10 },
    { id: '5', name: 'Nature', weight: 0.9, category: 'Outdoors', color: '#f59e0b', textColor: '#ffffff', keywords: ['Hiking', 'Climate', 'Forest'], x: 25, y: 35 },
    { id: '6', name: 'Science', weight: 1.1, category: 'Knowledge', color: '#3b82f6', textColor: '#ffffff', keywords: ['Physics', 'Space', 'Biology'], x: -15, y: -45 },
    { id: '7', name: 'Music', weight: 0.8, category: 'Art', color: '#ec4899', textColor: '#ffffff', keywords: ['Techno', 'Lofi', 'Vinyl'], x: -42, y: -10 },
    { id: '8', name: 'Cooking', weight: 1.0, category: 'Lifestyle', color: '#78350f', textColor: '#ffffff', keywords: ['Recipes', 'Vegan', 'Chef'], x: 15, y: -40 },
    { id: '9', name: 'Design', weight: 0.7, category: 'Creative', color: '#ffffff', textColor: '#000000', keywords: ['UI/UX', 'Layout', 'Figma'], x: -20, y: 40 },
];

export const SoulOrbit: React.FC<{ theme: 'classic' | '2084' }> = ({ theme }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const selectedInterest = useMemo(() =>
        INTERESTS.find(i => i.id === selectedId), [selectedId]
    );

    return (
        <div className="relative w-full aspect-square md:aspect-video max-h-[800px] bg-stone-950 rounded-[3rem] overflow-hidden flex items-center justify-center p-8 border border-white/10 shadow-3xl group">

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            {/* Title Overlay */}
            <div className="absolute top-12 left-12 z-20">
                <h3 className="font-serif text-5xl text-white mb-2 italic">Soul Orbit</h3>
                <p className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase opacity-60">Identity Feedback Loop</p>
            </div>

            {/* central Avatar */}
            <motion.div
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/20 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img
                    src="/assets/avatar_base.png"
                    alt="Avatar"
                    className="w-full h-full object-cover grayscale brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent mix-blend-overlay" />
            </motion.div>

            {/* Interest Bubbles */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {INTERESTS.map((interest) => (
                    <motion.div
                        key={interest.id}
                        className="absolute left-1/2 top-1/2 pointer-events-auto cursor-pointer"
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            scale: 1,
                            x: `calc(${interest.x}vw - 50%)`,
                            y: `calc(${interest.y}vh - 50%)`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 20,
                            delay: parseInt(interest.id) * 0.1
                        }}
                        onMouseEnter={() => setHoveredId(interest.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedId(interest.id)}
                    >
                        <motion.div
                            className="relative flex items-center justify-center rounded-full shadow-2xl"
                            style={{
                                width: interest.weight * 80,
                                height: interest.weight * 80,
                                backgroundColor: interest.color,
                                border: '2px solid rgba(255,255,255,0.1)'
                            }}
                            animate={{
                                y: [0, -10, 0],
                                scale: hoveredId === interest.id ? 1.1 : 1
                            }}
                            transition={{
                                y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 0.3 }
                            }}
                        >
                            <span
                                className="font-bold text-[10px] md:text-xs uppercase tracking-tighter"
                                style={{ color: interest.textColor }}
                            >
                                {interest.name}
                            </span>

                            {/* Hover Keywords */}
                            <AnimatePresence>
                                {hoveredId === interest.id && !selectedId && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: -20 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full mb-2 bg-black/80 backdrop-blur-xl p-2 rounded-lg border border-white/20 flex gap-2 whitespace-nowrap shadow-2xl"
                                    >
                                        {interest.keywords.map(k => (
                                            <span key={k} className="text-[10px] text-cyan-400 font-black uppercase">#{k}</span>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Control Panel Overlay */}
            <AnimatePresence>
                {selectedInterest && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            className="bg-stone-900 border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-4xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-6 mb-8">
                                <div
                                    className="w-16 h-16 rounded-3xl"
                                    style={{ backgroundColor: selectedInterest.color }}
                                />
                                <div>
                                    <h4 className="text-3xl font-serif text-white">{selectedInterest.name}</h4>
                                    <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">{selectedInterest.category}</p>
                                </div>
                            </div>

                            <p className="text-white/40 text-sm leading-relaxed mb-10">
                                This cluster represents {selectedInterest.weight * 100}% of your attention gravitation in the "{selectedInterest.category}" sector. Use the controls below to refine your neural feedback.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all group">
                                    <Plus className="mb-2 group-hover:rotate-90 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Reinforce</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group">
                                    <Minus className="mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Legend */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end pointer-events-none text-[10px] font-bold uppercase tracking-[0.3em]">
                <div className="text-white/20">
                    Neural Prototype v2.0 // Loved by Generations // Crafted by You
                </div>
                <div className="flex gap-4 items-center">
                    <span className="text-cyan-400 animate-pulse">Live Resonance</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-1 h-3 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="w-full h-full bg-cyan-500"
                                    animate={{ height: ["20%", "80%", "20%"] }}
                                    transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
