/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene, IntelligenceWebScene } from '@/components/canvas/AmenScene';
import { MetaDataDiagram, SpatialVisualizationDiagram, PartnerNetworkDiagram } from '@/components/ui/Diagrams';
import { FactCheckResearch } from '@/components/ui/FactCheckResearch';
import { Sci4dView } from '@/components/ui/Sci4dView';
import { SoulOrbit } from '@/components/ui/SoulOrbit';
import { ArrowDown, Menu, X, Globe, Layers, Eye, MapPin, Languages, Activity, Sparkles, ChevronDown, User } from 'lucide-react';

const translations = {
  en: {
    nav: { vision: "Vision", meta: "Amen Meta", spatial: "Amen Spatial", research: "Research", contact: "Get Started" },
    hero: { tag: "Forging the Path to AGI", title: "Intelligent Architecture", subtitle: "Amen Intelligence is redefining the relationship between humans and AGI through Design Science Research (DSR) and spatial visualization.", scroll: "SCROLL TO EXPLORE" },
    vision: { tag: "The Mission", title: "AGI for the Modern Enterprise.", quote: "We believe AGI shouldn't just be an oracle in a black box, but a spatial companion that enhances human cognition.", focus: "The Focus", focusDesc: "Developing the Design Science Research (DSR) framework to bridge the gap between static text and dynamic understanding.", presence: "The Presence", presenceDesc: "Operating from the historic scientific hub of Göttingen and the creative pulse of Berlin, Germany." },
    meta: {
      service: "01", title: "Amen Meta", desc: "Big platforms thrive on data asymmetry. We break those barriers by providing the aggregated data they don't want to give away.", points: [
        { title: "Data Aggregation", desc: "We ingest fragmented logs from TikTok, WhatsApp, and Google to build your primary digital twin." },
        { title: "Exclusive Access", desc: "Gain deep historical insights into your interaction patterns that platforms keep hidden." },
        { title: "Actionable Insights", desc: "Convert raw neural data into topological maps for personal AGI growth." }
      ]
    },
    spatial: {
      service: "02",
      title: "Amen Spatial",
      desc: "Stop reading chats. Start exploring them. Visualize your ChatGPT, Claude, and Gemini histories as interactive token seas.",
      card1: { title: "Token Sea", sub: "Visualization", desc: "Explore history as a fluid, interconnected sea of concepts." },
      card2: { title: "Mindly Ready", sub: "Exportable", desc: "Instant conversion to Mindly, Miro, or visual hierarchies." },
      card3: { title: "Amen Sci4d", sub: "2084 Engine", desc: "Scientific interpretation of temporal data. Deep 4D visualization of complex research sets." },
      card4: { title: "Soul Orbit", sub: "Identity Interface", desc: "Real-time attention gravitation field. Based on YouTube and neural archives." }
    },
    metaDiagram: {
      title: "Core Data Horizon",
      desc: "Aggregating fragmented digital identities into a unified intelligence structure.",
      sourceLabel: "Data Sources",
      hubLabel: "Core Hub"
    },
    research: { tag: "Scientific Foundation", title: "The AGI Research Network", desc: "We partner with Europe's leading academic institutions to push the boundaries of Distributed State Reinforcement Models." }
  },
  de: {
    nav: { vision: "Vision", meta: "Amen Meta", spatial: "Amen Spatial", research: "Forschung", contact: "Kontakt" },
    hero: { tag: "Der Weg zur AGI", title: "Intelligente Architektur", subtitle: "Amen Intelligence definiert die Beziehung zwischen Mensch und AGI durch Design Science Research (DSR) und räumliche Visualisierung neu.", scroll: "ZUM ERKUNDEN SCROLLEN" },
    vision: { tag: "Die Mission", title: "AGI für moderne Unternehmen.", quote: "Wir glauben, dass AGI nicht nur ein Orakel in einer Blackbox sein sollte, sondern ein räumlicher Begleiter der Kognition.", focus: "Der Fokus", focusDesc: "Entwicklung des Design Science Research (DSR)-Frameworks, um die Lücke zwischen statischem Text und dynamischem Verständnis zu schließen.", presence: "Präsenz", presenceDesc: "Tätig im historischen Wissenschaftszentrum Göttingen und dem kreativen Puls von Berlin." },
    meta: {
      service: "01", title: "Amen Meta", desc: "Große Plattformen profitieren von Datenasymmetrie. Wir brechen diese Barrieren durch aggregierte Daten, die normalerweise verborgen bleiben.", points: [
        { title: "Datenaggregation", desc: "Wir führen fragmentierte Logs von TikTok, WhatsApp und Google zusammen, um deinen digitalen Zwilling zu erstellen." },
        { title: "Exklusiver Zugriff", desc: "Erhalte tiefe Einblicke in deine Interaktionsmuster, die Plattformen normalerweise verbergen." },
        { title: "Handlungsorientierte Erkenntnisse", desc: "Verwandle neuronale Rohdaten in topologische Karten für dein persönliches AGI-Wachstum." }
      ]
    },
    spatial: {
      service: "02",
      title: "Amen Spatial",
      desc: "Hören Sie auf, Chats nur zu lesen. Visualisieren Sie Ihre ChatGPT, Claude und Gemini Verläufe als interaktive Token-Meere.",
      card1: { title: "Token-Meer", sub: "Visualisierung", desc: "Erkunden Sie Verläufe als fluides, vernetztes Meer von Konzepten." },
      card2: { title: "Mindly-Ready", sub: "Exportierbar", desc: "Sofortige Konvertierung in Mindly, Miro oder visuelle Hierarchien." },
      card3: { title: "Amen Sci4d", sub: "2084 Engine", desc: "Wissenschaftliche Interpretation temporaler Daten. Tiefe 4D-Visualisierung komplexer Forschungssets." },
      card4: { title: "Soul Orbit", sub: "Identitäts-Interface", desc: "Echtzeit-Aufmerksamkeitsfeld. Basierend auf YouTube- und neuralen Archiven." }
    },
    metaDiagram: {
      title: "Kern-Datenhorizont",
      desc: "Aggregation fragmentierter digitaler Identitäten zu einer einheitlichen Intelligenzstruktur.",
      sourceLabel: "Datenquellen",
      hubLabel: "Kern-Hub"
    },
    research: { tag: "Wissenschaftliche Basis", title: "Das AGI Forschungs-Netzwerk", desc: "Wir arbeiten mit führenden europäischen Institutionen zusammen, um die Grenzen von Design Science Research (DSR) zu erweitern." }
  }
};

const ProjectCard = ({ title, subtitle, description, icon: Icon, onClick, isSci4d }: { title: string, subtitle: string, description: string, icon: any, onClick?: (e: any) => void, isSci4d?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={(e) => onClick?.(e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative p-10 rounded-[2.5rem] transition-all duration-700 cursor-pointer overflow-hidden border ${hovered ? 'scale-[1.02] shadow-2xl' : 'shadow-lg'
        } ${isSci4d
          ? 'bg-black text-white border-white/10'
          : 'bg-white/70 backdrop-blur-md border-stone-200/60'
        }`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${isSci4d ? 'bg-cyan-500/20 text-cyan-400' : 'bg-stone-100 text-stone-900 group-hover:bg-stone-900 group-hover:text-white'
        }`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${isSci4d ? 'text-cyan-400' : 'text-stone-400'}`}>{subtitle}</div>
      <h3 className={`text-3xl font-bold tracking-tight mb-4 ${isSci4d ? 'text-white' : 'text-stone-900'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed mb-8 ${isSci4d ? 'text-white/60' : 'text-stone-500'}`}>{description}</p>

      {onClick && (
        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${isSci4d ? 'text-cyan-400 opacity-60 group-hover:opacity-100' : 'text-stone-900 opacity-0 group-hover:opacity-100'
          }`}>
          Launch Platform <ArrowDown className="-rotate-90" size={12} />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoVariant, setLogoVariant] = useState(false);
  const [view, setView] = useState<'landing' | 'sci4d'>('landing');
  const [theme, setTheme] = useState<'classic' | '2084'>('classic');
  const [openMetaPoint, setOpenMetaPoint] = useState<number | null>(0);
  const [spatialNavOpen, setSpatialNavOpen] = useState(false);
  const [researchNavOpen, setResearchNavOpen] = useState(false);
  const [showFactCheck, setShowFactCheck] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'en' ? 'de' : 'en');

  const toggleTheme = () => {
    setTheme(theme === 'classic' ? '2084' : 'classic');
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (view === 'sci4d') {
    return <Sci4dView onBack={() => setView('landing')} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${theme === '2084' ? 'bg-black text-white selection:bg-cyan-500 selection:text-black' : 'bg-white text-stone-800 selection:bg-nobel-gold selection:text-white font-sf-pro'}`}>

      {/* Navigation */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl rounded-2xl border ${scrolled || theme === '2084'
        ? (theme === '2084' ? 'bg-black/70 backdrop-blur-2xl border-white/10' : 'bg-white/70 backdrop-blur-2xl border-stone-200/50 shadow-lg shadow-black/[0.03]')
        : 'bg-transparent border-transparent'
        } py-3`}>
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              toggleTheme();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-500 ${theme === '2084' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-black text-white shadow-sm hover:scale-105'}`}>
              {theme === '2084' ? '84' : 'A'}
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight leading-none transition-colors ${theme === '2084' ? 'text-white' : 'text-black'}`}>amen</span>
              <span className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-stone-400'}`}>Intelligence</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
            <a href="#vision" onClick={scrollToSection('vision')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.vision}</a>
            <a href="#meta" onClick={scrollToSection('meta')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.meta}</a>

            <div
              className="relative group/nav"
              onMouseEnter={() => setSpatialNavOpen(true)}
              onMouseLeave={() => setSpatialNavOpen(false)}
            >
              <a href="#spatial" onClick={scrollToSection('spatial')} className={`flex items-center gap-1 transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>
                {t.nav.spatial} <ChevronDown size={12} className={`transition-transform duration-300 ${spatialNavOpen ? 'rotate-180' : ''}`} />
              </a>
              <AnimatePresence>
                {spatialNavOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-0 mt-2 w-48 p-2 rounded-xl border shadow-xl backdrop-blur-xl z-50 ${theme === '2084' ? 'bg-black/90 border-white/10' : 'bg-white/90 border-stone-100'}`}
                  >
                    <a href="#spatial" onClick={scrollToSection('spatial')} className={`block p-3 rounded-lg text-[9px] hover:bg-stone-500/10 transition-colors ${theme === '2084' ? 'text-white/60 hover:text-cyan-400' : 'text-stone-600 hover:text-nobel-gold'}`}>Overview</a>
                    <a href="#soul-orbit" onClick={scrollToSection('soul-orbit')} className={`block p-3 rounded-lg text-[9px] hover:bg-stone-500/10 transition-colors ${theme === '2084' ? 'text-white/60 hover:text-cyan-400' : 'text-stone-600 hover:text-nobel-gold'}`}>Soul Orbit</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('sci4d'); }} className={`block p-3 rounded-lg text-[9px] hover:bg-stone-500/10 transition-colors ${theme === '2084' ? 'text-white/60 hover:text-cyan-400' : 'text-stone-600 hover:text-nobel-gold'}`}>Sci4d Engine</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative group/nav"
              onMouseEnter={() => setResearchNavOpen(true)}
              onMouseLeave={() => setResearchNavOpen(false)}
            >
              <a href="#research" onClick={scrollToSection('research')} className={`flex items-center gap-1 transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>
                {t.nav.research} <ChevronDown size={12} className={`transition-transform duration-300 ${researchNavOpen ? 'rotate-180' : ''}`} />
              </a>
              <AnimatePresence>
                {researchNavOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-0 mt-2 w-48 p-2 rounded-xl border shadow-xl backdrop-blur-xl z-50 ${theme === '2084' ? 'bg-black/90 border-white/10' : 'bg-white/90 border-stone-100'}`}
                  >
                    <a href="#research" onClick={scrollToSection('research')} className={`block p-3 rounded-lg text-[9px] hover:bg-stone-500/10 transition-colors ${theme === '2084' ? 'text-white/60 hover:text-cyan-400' : 'text-stone-600 hover:text-nobel-gold'}`}>Overview</a>
                    <a href="#research" onClick={(e) => {
                      scrollToSection('research')(e);
                      setShowFactCheck(true);
                    }} className={`block p-3 rounded-lg text-[9px] hover:bg-stone-500/10 transition-colors ${theme === '2084' ? 'text-white/60 hover:text-cyan-400' : 'text-stone-600 hover:text-nobel-gold'}`}>Deep Analysis</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={toggleLang} className={`flex items-center gap-2 transition-colors ${theme === '2084' ? 'text-cyan-400 hover:text-white' : 'text-nobel-gold hover:text-stone-900'}`}>
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>

            <a href="#contact" className={`px-6 py-2.5 rounded-full transition-all hover:px-8 ${theme === '2084' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>{t.nav.contact}</a>
          </div>

          <button className={`md:hidden p-2 ${theme === '2084' ? 'text-white' : 'text-stone-900'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${theme === '2084' ? 'bg-black border-white/10' : 'bg-white border-stone-100'}`}
            >
              <div className="container mx-auto px-8 py-8 flex flex-col gap-6 text-[11px] font-bold tracking-[0.2em] uppercase">
                <a href="#vision" onClick={scrollToSection('vision')} className={theme === '2084' ? 'text-white/60' : 'text-stone-500'}>{t.nav.vision}</a>
                <a href="#meta" onClick={scrollToSection('meta')} className={theme === '2084' ? 'text-white/60' : 'text-stone-500'}>{t.nav.meta}</a>
                <div className="flex flex-col gap-4 pl-4 border-l border-cyan-500/30">
                  <a href="#spatial" onClick={scrollToSection('spatial')} className={theme === '2084' ? 'text-cyan-400' : 'text-nobel-gold'}>{t.nav.spatial}</a>
                  <a href="#soul-orbit" onClick={scrollToSection('soul-orbit')} className="text-white/40">Soul Orbit</a>
                  <button onClick={() => setView('sci4d')} className="text-left text-white/40 uppercase">Sci4d Engine</button>
                </div>
                <div className="flex flex-col gap-4 pl-4 border-l border-cyan-500/30">
                  <a href="#research" onClick={scrollToSection('research')} className={theme === '2084' ? 'text-cyan-400' : 'text-nobel-gold'}>{t.nav.research}</a>
                  <a href="#research" onClick={(e) => {
                    scrollToSection('research')(e);
                    setShowFactCheck(true);
                  }} className="text-white/40 italic">Deep Analysis</a>
                </div>
                <a href="#contact" onClick={scrollToSection('contact')} className={`inline-block w-fit px-6 py-2.5 rounded-full ${theme === '2084' ? 'bg-cyan-500 text-black' : 'bg-stone-900 text-white'}`}>{t.nav.contact}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene theme={theme} />
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${theme === '2084' ? 'opacity-0' : 'opacity-100'} bg-gradient-to-b from-white/20 via-transparent to-white`} />
        {theme === '2084' && (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />
        )}

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className={`inline-block mb-6 px-4 py-1.5 border text-[10px] tracking-[0.4em] uppercase font-bold rounded-full backdrop-blur-sm transition-all duration-700 ${theme === '2084' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' : 'border-nobel-gold/30 text-nobel-gold bg-white/40'}`}>
            {theme === '2084' ? 'Neural Protocol Alpha-9' : t.hero.tag}
          </div>
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-10 transition-all duration-700 ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>
            {theme === '2084' ? 'Future' : t.hero.title.split(' ')[0]} <br />
            <span className={`${theme === '2084' ? 'italic font-normal text-cyan-400' : 'text-apple-gradient'}`}>
              {theme === '2084' ? 'Hub' : t.hero.title.split(' ')[1]}
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-14 px-4 text-balance transition-colors duration-700 ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>
            {theme === '2084' ? 'Your personal gateway to Topological Epistemology. Manage your neural archive or explore new dimensions.' : t.hero.subtitle}
          </p>

          <div className="flex justify-center">
            <a href="#vision" onClick={scrollToSection('vision')} className={`group flex flex-col items-center gap-4 text-[10px] font-bold tracking-[0.3em] transition-colors ${theme === '2084' ? 'text-white/20 hover:text-cyan-400' : 'text-stone-400 hover:text-stone-900'}`}>
              <span>{t.hero.scroll}</span>
              <div className={`w-px h-16 relative overflow-hidden transition-colors ${theme === '2084' ? 'bg-white/10' : 'bg-stone-200'}`}>
                <div className={`absolute top-0 left-0 w-full h-full animate-pulse ${theme === '2084' ? 'bg-cyan-500' : 'bg-nobel-gold'}`} />
              </div>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Vision */}
        <section id="vision" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-black' : 'bg-white'}`}>
          <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-nobel-gold'}`}>{t.vision.tag}</span>
              <h2 className={`font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>{t.vision.title}</h2>
              <div className={`w-20 h-1.5 transition-colors ${theme === '2084' ? 'bg-cyan-500' : 'bg-nobel-gold'} mb-8`}></div>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <p className={`text-xl leading-relaxed transition-colors ${theme === '2084' ? 'font-serif italic text-white/60' : 'font-sf-pro font-medium text-stone-700'}`}>
                "{t.vision.quote}"
              </p>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t transition-colors ${theme === '2084' ? 'border-white/10' : 'border-stone-100'}`}>
                <div className="space-y-4">
                  <h4 className={`font-bold text-sm tracking-widest uppercase transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-stone-900'}`}>{t.vision.focus}</h4>
                  <p className={`text-sm leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-500'}`}>{t.vision.focusDesc}</p>
                </div>
                <div className="space-y-4">
                  <h4 className={`font-bold text-sm tracking-widest uppercase transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-stone-900'}`}>{t.vision.presence}</h4>
                  <p className={`text-sm leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-500'}`}>{t.vision.presenceDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amen Meta */}
        <section id="meta" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-[#050505]' : 'bg-white'}`}>
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <MetaDataDiagram
                  theme={theme}
                  title={t.metaDiagram.title}
                  description={t.metaDiagram.desc}
                  sourceLabel={t.metaDiagram.sourceLabel}
                  hubLabel={t.metaDiagram.hubLabel}
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className={`inline-flex items-center gap-3 px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-8 transition-all ${theme === '2084' ? 'bg-cyan-500 text-black shadow-lg' : 'bg-stone-100 text-stone-500 border border-stone-200/50'}`}>
                  <Globe size={14} /> {t.meta.service}
                </div>
                <h2 className={`text-5xl md:text-6xl font-bold tracking-tight mb-8 transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>{t.meta.title}</h2>
                <p className={`text-lg mb-8 leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>{t.meta.desc}</p>
                <div className="space-y-4">
                  {t.meta.points.map((point: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group ${openMetaPoint === idx
                        ? (theme === '2084' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-nobel-gold/5 border-nobel-gold/20')
                        : (theme === '2084' ? 'bg-transparent border-white/5 hover:border-white/20' : 'bg-transparent border-stone-100 hover:border-stone-200')
                        }`}
                      onClick={() => setOpenMetaPoint(openMetaPoint === idx ? null : idx)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full transition-all ${openMetaPoint === idx
                          ? (theme === '2084' ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-nobel-gold scale-125')
                          : (theme === '2084' ? 'bg-white/20' : 'bg-stone-300')
                          }`} />
                        <h5 className={`font-bold text-xs tracking-widest uppercase transition-colors ${openMetaPoint === idx ? (theme === '2084' ? 'text-white' : 'text-stone-900') : (theme === '2084' ? 'text-white/40' : 'text-stone-500')
                          }`}>{point.title}</h5>
                      </div>

                      <AnimatePresence>
                        {openMetaPoint === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className={`pt-4 text-sm leading-relaxed transition-colors ${theme === '2084' ? 'text-white/60' : 'text-stone-600'}`}>
                              {point.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amen Spatial */}
        <section id="spatial" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-black' : 'bg-stone-900'} text-stone-100 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-1/2 h-full blur-[120px] pointer-events-none transition-colors ${theme === '2084' ? 'bg-cyan-500/10' : 'bg-nobel-gold/5'}`} />
          <div className="container mx-auto px-8 relative z-10">
            <div className="mb-16">
              <div className={`inline-flex items-center gap-3 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full mb-8 border backdrop-blur-md transition-all ${theme === '2084' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-white/10 text-nobel-gold border-white/5'}`}>
                <Layers size={14} /> {t.spatial.service}
              </div>
              <h2 className="font-serif text-5xl md:text-6xl mb-8 text-white">{t.spatial.title}</h2>
              <p className={`max-w-2xl text-lg mb-10 leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-400'}`}>{t.spatial.desc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  icon={Eye}
                  title={t.spatial.card1.title}
                  subtitle={t.spatial.card1.sub}
                  description={t.spatial.card1.desc}
                />
                <ProjectCard
                  icon={Globe}
                  title={t.spatial.card2.title}
                  subtitle={t.spatial.card2.sub}
                  description={t.spatial.card2.desc}
                />
                <ProjectCard
                  icon={Activity}
                  title={t.spatial.card3.title}
                  subtitle={t.spatial.card3.sub}
                  description={t.spatial.card3.desc}
                  onClick={() => setView('sci4d')}
                  isSci4d
                />
                <ProjectCard
                  icon={User}
                  title={t.spatial.card4.title}
                  subtitle={t.spatial.card4.sub}
                  description={t.spatial.card4.desc}
                  onClick={scrollToSection('soul-orbit')}
                />
              </div>
              <div className="lg:col-span-4 h-[500px] lg:h-auto relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <SpatialVisualizationDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Soul Orbit Section */}
        <section id="soul-orbit" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-[#050505]' : 'bg-white'}`}>
          <div className="container mx-auto px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
              <div className="lg:w-1/2">
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-stone-400'}`}>Pro-Feature Interface</span>
                <h2 className={`text-5xl md:text-6xl font-bold tracking-tight mb-8 transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>Soul Orbit</h2>
                <div className={`w-20 h-1.5 transition-colors ${theme === '2084' ? 'bg-cyan-500' : 'bg-nobel-gold'} mb-8`}></div>
                <p className={`text-lg leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>
                  Experience your digital identity as a gravitational field. The Soul Orbit visualizes your attention patterns by clustering historical data into an interactive, embodied feedback loop.
                </p>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl border transition-colors ${theme === '2084' ? 'bg-white/5 border-white/10' : 'bg-white border-stone-100'}`}>
                  <h5 className={`font-bold text-[10px] tracking-widest uppercase mb-2 ${theme === '2084' ? 'text-cyan-400' : 'text-stone-900'}`}>Adaptive Avatar</h5>
                  <p className="text-[11px] text-stone-500 leading-relaxed">Appearance shifts based on dominant interest clusters (Tech, Nature, Gaming).</p>
                </div>
                <div className={`p-6 rounded-2xl border transition-colors ${theme === '2084' ? 'bg-white/5 border-white/10' : 'bg-white border-stone-100'}`}>
                  <h5 className={`font-bold text-[10px] tracking-widest uppercase mb-2 ${theme === '2084' ? 'text-cyan-400' : 'text-stone-900'}`}>Real-time Orbit</h5>
                  <p className="text-[11px] text-stone-500 leading-relaxed">Rotation speed and node distance reflect current activity levels and recency.</p>
                </div>
              </div>
            </div>

            <SoulOrbit theme={theme} />
          </div>
        </section>

        {/* Research */}
        <section id="research" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-black' : 'bg-white'}`}>
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-stone-400'}`}>{t.research.tag}</span>
              <h2 className={`text-5xl md:text-6xl font-bold tracking-tight mb-8 transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>{t.research.title}</h2>
              <p className={`text-lg leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>{t.research.desc}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-12">
                <div className="p-8 border-l-4 border-nobel-gold bg-white rounded-r-2xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
                  <h4 className={`text-2xl font-bold tracking-tight mb-2 ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>University of Göttingen</h4>
                  <p className="text-stone-500 text-sm">Collaborative research on neural architecture and spatial state modeling.</p>
                </div>
                <div className="p-8 border-l-4 border-stone-200 bg-white rounded-r-2xl">
                  <h4 className={`text-2xl font-bold tracking-tight mb-2 ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-stone-900'}`}>TU Berlin</h4>
                  <p className="text-stone-500 text-sm">Focusing on ethical AGI frameworks and Distributed State Reinforcement Models.</p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <PartnerNetworkDiagram />
              </div>
            </div>

            <div className="mt-24 flex flex-col items-center">
              {!showFactCheck && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFactCheck(true)}
                  className={`px-10 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-[10px] border-2 transition-all ${theme === '2084'
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                    : 'bg-stone-900 border-stone-900 text-white hover:bg-stone-800'
                    }`}
                >
                  Deep Analysis: EU-Bürokratie 2025
                </motion.button>
              )}

              <AnimatePresence>
                {showFactCheck && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full relative"
                  >
                    <button
                      onClick={() => setShowFactCheck(false)}
                      className={`absolute -top-12 right-0 text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${theme === '2084' ? 'text-white' : 'text-stone-900'
                        }`}
                    >
                      [ Analyse schließen ]
                    </button>
                    <FactCheckResearch theme={theme} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-24 transition-colors duration-1000 ${theme === '2084' ? 'bg-[#050505] text-white/40 border-t border-white/5' : 'bg-stone-900 text-stone-500'}`}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-sm">
            <div className="col-span-2">
              <div className={`font-bold text-3xl mb-4 transition-colors ${theme === '2084' ? 'font-serif text-white' : 'font-sf-pro text-white italic tracking-tighter'}`}>Amen Intelligence</div>
              <p className={`max-w-sm mb-8 leading-relaxed transition-colors ${theme === '2084' ? 'text-cyan-400/60' : 'text-stone-400'}`}>Göttingen | Berlin</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase font-bold text-[10px] tracking-widest">Göttingen HQ</span>
              <span>Kurze Str. 3<br />37170 Göttingen</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase font-bold text-[10px] tracking-widest">Berlin Studio</span>
              <span>Spreeufer 4<br />10178 Berlin</span>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>© 2026 Amen Intelligence. All Rights Reserved.</span>
            <button onClick={toggleLang} className="text-nobel-gold border border-nobel-gold/30 px-4 py-1 rounded-full">
              {lang === 'en' ? 'DEUTSCH' : 'ENGLISH'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
