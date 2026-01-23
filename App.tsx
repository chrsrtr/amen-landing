/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, IntelligenceWebScene } from './components/AmenScene';
import { MetaDataDiagram, SpatialVisualizationDiagram, PartnerNetworkDiagram } from './components/Diagrams';
import { Sci4dView } from './components/Sci4dView';
import { ArrowDown, Menu, X, Globe, Layers, Eye, MapPin, Languages, Activity, Sparkles } from 'lucide-react';

const translations = {
  en: {
    nav: { vision: "Vision", meta: "Amen Meta", spatial: "Amen Spatial", research: "Research", contact: "Get Started" },
    hero: { tag: "Forging the Path to AGI", title: "Intelligent Architecture.", subtitle: "Amen Intelligence is redefining the relationship between humans and AGI through DSRM and spatial visualization.", scroll: "SCROLL TO EXPLORE" },
    vision: { tag: "The Mission", title: "AGI for the Modern Enterprise.", quote: "We believe AGI shouldn't just be an oracle in a black box, but a spatial companion that enhances human cognition.", focus: "The Focus", focusDesc: "Developing the DSRM framework to bridge the gap between static text and dynamic understanding.", presence: "The Presence", presenceDesc: "Operating from the historic scientific hub of Göttingen and the creative pulse of Berlin, Germany." },
    meta: { service: "SERVICE ONE", title: "Amen Meta", desc: "Big platforms thrive on data asymmetry. We break those barriers by providing the aggregated data they don't want to give away.", points: ["Data Aggregation", "Exclusive Access", "Actionable Insights"] },
    spatial: {
      service: "SERVICE TWO",
      title: "Amen Spatial",
      desc: "Stop reading chats. Start exploring them. Visualize your ChatGPT, Claude, and Gemini histories as interactive token seas.",
      card1: { title: "Token Sea", sub: "Visualization", desc: "Explore history as a fluid, interconnected sea of concepts." },
      card2: { title: "Mindly Ready", sub: "Exportable", desc: "Instant conversion to Mindly, Miro, or visual hierarchies." },
      card3: { title: "Amen Sci4d", sub: "2084 Engine", desc: "Scientific interpretation of temporal data. Deep 4D visualization of complex research sets." }
    },
    research: { tag: "Scientific Foundation", title: "The AGI Research Network", desc: "We partner with Europe's leading academic institutions to push the boundaries of Distributed State Reinforcement Models." }
  },
  de: {
    nav: { vision: "Vision", meta: "Amen Meta", spatial: "Amen Spatial", research: "Forschung", contact: "Kontakt" },
    hero: { tag: "Der Weg zur AGI", title: "Intelligente Architektur.", subtitle: "Amen Intelligence definiert die Beziehung zwischen Mensch und AGI durch DSRM und räumliche Visualisierung neu.", scroll: "ZUM ERKUNDEN SCROLLEN" },
    vision: { tag: "Die Mission", title: "AGI für moderne Unternehmen.", quote: "Wir glauben, dass AGI nicht nur ein Orakel in einer Blackbox sein sollte, sondern ein räumlicher Begleiter der Kognition.", focus: "Der Fokus", focusDesc: "Entwicklung des DSRM-Frameworks, um die Lücke zwischen statischem Text und dynamischem Verständnis zu schließen.", presence: "Präsenz", presenceDesc: "Tätig im historischen Wissenschaftszentrum Göttingen und dem kreativen Puls von Berlin." },
    meta: { service: "SERVICE EINS", title: "Amen Meta", desc: "Große Plattformen profitieren von Datenasymmetrie. Wir brechen diese Barrieren durch aggregierte Daten, die normalerweise verborgen bleiben.", points: ["Datenaggregation", "Exklusiver Zugriff", "Handlungsorientierte Erkenntnisse"] },
    spatial: {
      service: "SERVICE ZWEI",
      title: "Amen Spatial",
      desc: "Hören Sie auf, Chats nur zu lesen. Visualisieren Sie Ihre ChatGPT, Claude und Gemini Verläufe als interaktive Token-Meere.",
      card1: { title: "Token-Meer", sub: "Visualisierung", desc: "Erkunden Sie Verläufe als fluides, vernetztes Meer von Konzepten." },
      card2: { title: "Mindly-Ready", sub: "Exportierbar", desc: "Sofortige Konvertierung in Mindly, Miro oder visuelle Hierarchien." },
      card3: { title: "Amen Sci4d", sub: "2084 Engine", desc: "Wissenschaftliche Interpretation temporaler Daten. Tiefe 4D-Visualisierung komplexer Forschungssets." }
    },
    research: { tag: "Wissenschaftliche Basis", title: "Das AGI Forschungs-Netzwerk", desc: "Wir arbeiten mit führenden europäischen Institutionen zusammen, um die Grenzen von DSRM zu erweitern." }
  }
};

const ProjectCard = ({ title, subtitle, description, icon: Icon, onClick, isSci4d }: { title: string, subtitle: string, description: string, icon: any, onClick?: () => void, isSci4d?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-8 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group relative ${onClick ? 'cursor-pointer' : ''}`}
    >
      {isSci4d && hovered && (
        <div className="absolute -top-32 left-0 right-0 h-40 bg-black/90 backdrop-blur-xl rounded-2xl border border-nobel-gold/30 p-4 z-50 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4">
          <div className="w-12 h-12 bg-nobel-gold/10 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="text-nobel-gold animate-pulse" size={20} />
          </div>
          <span className="text-[10px] font-black uppercase text-nobel-gold tracking-widest">Previewing 2084 Hub</span>
          <span className="text-[8px] text-white/50 uppercase mt-1">Click to Launch Interface</span>
        </div>
      )}

      <div className="w-12 h-12 bg-[#F9F8F4] rounded-xl flex items-center justify-center text-nobel-gold mb-6 group-hover:bg-nobel-gold group-hover:text-white transition-colors duration-500">
        <Icon size={24} />
      </div>
      <h3 className="font-serif text-2xl text-stone-900 mb-2">{title}</h3>
      <p className="text-xs font-bold tracking-widest text-nobel-gold uppercase mb-4">{subtitle}</p>
      <p className="text-stone-600 leading-relaxed text-sm">{description}</p>

      {onClick && (
        <div className="mt-6 flex items-center gap-2 text-nobel-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
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
    <div className={`min-h-screen transition-colors duration-1000 ${theme === '2084' ? 'bg-black text-white selection:bg-cyan-500 selection:text-black' : 'bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white'} font-sans`}>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || theme === '2084' ? (theme === '2084' ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm') : 'bg-transparent'} py-4`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer group [perspective:1000px]"
            onClick={() => {
              toggleTheme();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={() => setLogoVariant(true)}
            onMouseLeave={() => setLogoVariant(false)}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-black text-2xl transition-all duration-500 [transform-style:preserve-3d] ${logoVariant || theme === '2084' ? (theme === '2084' ? 'bg-cyan-500 text-black shadow-[0_0_25px_rgba(6,182,212,0.6)]' : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white [transform:rotate3d(1,1,1,720deg)] scale-110 shadow-lg') : 'bg-stone-900 text-nobel-gold'}`}>
              {theme === '2084' ? '84' : (logoVariant ? 'F' : 'A')}
            </div>
            <div className="flex flex-col relative">
              <span
                data-text={logoVariant || theme === '2084' ? "AMEN FUTURE" : "AMEN"}
                className={`font-serif font-bold text-lg tracking-tight leading-none transition-all duration-500 ${logoVariant || theme === '2084' ? 'text-3d-future' : 'text-stone-900'}`}
              >
                {logoVariant || theme === '2084' ? "AMEN FUTURE" : "AMEN"}
              </span>
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 ${theme === '2084' ? 'text-cyan-400/60' : (logoVariant ? 'text-cyan-600' : 'text-nobel-gold')}`}>
                {theme === '2084' ? 'Neural Protocol Alpha-9' : 'Intelligence'}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
            <a href="#vision" onClick={scrollToSection('vision')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.vision}</a>
            <a href="#meta" onClick={scrollToSection('meta')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.meta}</a>
            <a href="#spatial" onClick={scrollToSection('spatial')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.spatial}</a>
            <a href="#research" onClick={scrollToSection('research')} className={`transition-colors ${theme === '2084' ? 'text-white/40 hover:text-cyan-400' : 'text-stone-500 hover:text-nobel-gold'}`}>{t.nav.research}</a>

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
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene theme={theme} />
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${theme === '2084' ? 'opacity-0' : 'opacity-100'} bg-gradient-to-b from-[#F9F8F4]/20 via-transparent to-[#F9F8F4]`} />
        {theme === '2084' && (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />
        )}

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className={`inline-block mb-6 px-4 py-1.5 border text-[10px] tracking-[0.4em] uppercase font-bold rounded-full backdrop-blur-sm transition-all duration-700 ${theme === '2084' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' : 'border-nobel-gold/30 text-nobel-gold bg-white/40'}`}>
            {theme === '2084' ? 'Neural Protocol Alpha-9' : t.hero.tag}
          </div>
          <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] mb-10 transition-colors duration-700 ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>
            {theme === '2084' ? 'Future' : t.hero.title.split(' ')[0]} <br />
            <span className={`italic font-normal transition-colors duration-700 ${theme === '2084' ? 'text-cyan-400' : 'text-nobel-gold'}`}>
              {theme === '2084' ? 'Hub' : t.hero.title.split(' ')[1]}
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-14 px-4 transition-colors duration-700 ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>
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
              <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] transition-colors ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>{t.vision.title}</h2>
              <div className={`w-20 h-1.5 transition-colors ${theme === '2084' ? 'bg-cyan-500' : 'bg-nobel-gold'} mb-8`}></div>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <p className={`text-xl font-serif italic leading-relaxed transition-colors ${theme === '2084' ? 'text-white/60' : 'text-stone-700'}`}>
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
        <section id="meta" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-[#050505]' : 'bg-[#F9F8F4]'}`}>
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <MetaDataDiagram theme={theme} />
              </div>
              <div className="order-1 lg:order-2">
                <div className={`inline-flex items-center gap-3 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full mb-8 shadow-lg transition-all ${theme === '2084' ? 'bg-cyan-500 text-black' : 'bg-stone-900 text-white'}`}>
                  <Globe size={14} /> {t.meta.service}
                </div>
                <h2 className={`font-serif text-5xl md:text-6xl mb-8 transition-colors ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>{t.meta.title}</h2>
                <p className={`text-lg mb-8 leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>{t.meta.desc}</p>
                <div className="space-y-6">
                  {t.meta.points.map((point, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className={`mt-1 w-2 h-2 rounded-full transition-all group-hover:scale-150 ${theme === '2084' ? 'bg-cyan-500' : 'bg-nobel-gold'}`} />
                      <h5 className={`font-bold text-xs tracking-widest uppercase transition-colors ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>{point}</h5>
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
              </div>
              <div className="lg:col-span-4 h-[500px] lg:h-auto relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <SpatialVisualizationDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className={`py-32 transition-colors duration-1000 ${theme === '2084' ? 'bg-black' : 'bg-white'}`}>
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block transition-colors ${theme === '2084' ? 'text-cyan-400' : 'text-nobel-gold'}`}>{t.research.tag}</span>
              <h2 className={`font-serif text-5xl md:text-6xl mb-8 transition-colors ${theme === '2084' ? 'text-white' : 'text-stone-900'}`}>{t.research.title}</h2>
              <p className={`text-lg leading-relaxed transition-colors ${theme === '2084' ? 'text-white/40' : 'text-stone-600'}`}>{t.research.desc}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-12">
                <div className="p-8 border-l-4 border-nobel-gold bg-[#F9F8F4] rounded-r-2xl">
                  <h4 className="font-serif text-2xl text-stone-900 mb-2">University of Göttingen</h4>
                  <p className="text-stone-500 text-sm">Collaborative research on neural architecture and spatial state modeling.</p>
                </div>
                <div className="p-8 border-l-4 border-stone-200 bg-white rounded-r-2xl">
                  <h4 className="font-serif text-2xl text-stone-900 mb-2">TU Berlin</h4>
                  <p className="text-stone-500 text-sm">Focusing on ethical AGI frameworks and Distributed State Reinforcement Models.</p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <PartnerNetworkDiagram />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-24 transition-colors duration-1000 ${theme === '2084' ? 'bg-[#050505] text-white/40 border-t border-white/5' : 'bg-stone-900 text-stone-500'}`}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-sm">
            <div className="col-span-2">
              <div className="text-white font-serif font-bold text-3xl mb-4">Amen Intelligence</div>
              <p className={`max-w-sm mb-8 leading-relaxed transition-colors ${theme === '2084' ? 'text-cyan-400/60' : 'text-stone-400'}`}>Göttingen | Berlin</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase font-bold text-[10px] tracking-widest">Göttingen HQ</span>
              <span>Wissenschaftspark 1<br />37077 Göttingen</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase font-bold text-[10px] tracking-widest">Berlin Studio</span>
              <span>Spreeufer 4<br />10178 Berlin</span>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>© 2024 Amen Intelligence. All Rights Reserved.</span>
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