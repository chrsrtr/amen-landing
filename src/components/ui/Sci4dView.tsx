/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Upload, FileText, Brain, ArrowLeft, Sparkles, Terminal, Activity } from 'lucide-react';
import { analyzeScientificPaper, PaperAnalysis } from '@/lib/geminiService';
import { Visualizer4D } from '@/components/canvas/Visualizer4D';

export const Sci4dView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PaperAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const result = await analyzeScientificPaper(text);
      setAnalysis(result);
    } catch (err) {
      setError("NEURAL LINK FAILURE: DOCUMENT DATA CORRUPTED 🧬");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">SCI4D <span className="text-nobel-gold/50">.84</span></h1>
            <p className="text-[8px] font-bold tracking-[0.3em] text-white/40 uppercase">Ament Intelligence // Core Engine</p>
          </div>
        </div>
        <div className="flex gap-4">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase text-nobel-gold">Neural Status</span>
                <span className="text-[8px] mono text-white/30">Stable / Sync Active</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-nobel-gold/20 flex items-center justify-center animate-pulse">
                <Activity size={18} className="text-nobel-gold" />
            </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {!analysis && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="max-w-xl w-full p-12 bg-white/5 border border-white/10 rounded-[3rem] text-center space-y-8 backdrop-blur-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-nobel-gold/20 text-nobel-gold rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={12} /> Neural Interface Ready
                </div>
                <h2 className="text-4xl font-serif">Project Your Knowledge</h2>
                <p className="text-white/40">Synthesize 4D topological structures from any scientific manuscript.</p>
              </div>

              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-[2rem] cursor-pointer hover:border-nobel-gold hover:bg-white/5 transition-all group">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-nobel-gold" />
                  </div>
                  <p className="font-bold text-sm tracking-widest uppercase">Drop Paper Here</p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileUpload} />
              </label>
              {error && <p className="text-red-400 text-xs font-bold animate-pulse">{error}</p>}
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-3xl z-50">
            <div className="w-24 h-24 border-4 border-nobel-gold/20 border-t-nobel-gold rounded-full animate-spin mb-8" />
            <h3 className="text-xl font-bold tracking-widest uppercase text-nobel-gold">Parsing Logical Topology...</h3>
          </div>
        )}

        {analysis && (
          <div className="w-full h-full relative">
            <Visualizer4D analysis={analysis} />
            
            {/* Analysis Overlay */}
            <div className="absolute bottom-12 left-12 max-w-sm space-y-6">
                <div className="p-8 bg-black/60 border border-white/10 rounded-[2.5rem] backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-nobel-gold">Knowledge Profile</span>
                        <Brain size={16} className="text-nobel-gold" />
                    </div>
                    <div className="space-y-4">
                        {Object.entries(analysis.dimensions).map(([key, val]) => (
                            <div key={key} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-white/50">{key}</span>
                                    <span>{Math.round(val * 100)}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-nobel-gold transition-all duration-1000" style={{ width: `${val * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => setAnalysis(null)} className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all">
                    <Terminal size={14} /> Reset Simulation
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
