import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, Database } from 'lucide-react';

interface FactCheckSectionData {
    id: string;
    title: string;
    dotColor?: 'red' | 'green' | 'yellow' | 'blue';
    category?: 'law' | 'omni' | 'wl';
    content?: React.ReactNode;
    subsections?: FactCheckSectionData[];
}

const getDotColorClass = (color?: string) => {
    switch (color) {
        case 'red': return 'bg-[#d4564e] shadow-[0_0_5px_rgba(212,86,78,0.4)]';
        case 'green': return 'bg-[#5ab87a] shadow-[0_0_5px_rgba(90,184,122,0.4)]';
        case 'yellow': return 'bg-[#d4a84e] shadow-[0_0_5px_rgba(212,168,78,0.4)]';
        case 'blue': return 'bg-[#5a8ab8] shadow-[0_0_5px_rgba(90,138,184,0.4)]';
        default: return '';
    }
};

// Mapping exact CSS from original HTML to Tailwind
const Section: React.FC<{
    data: FactCheckSectionData;
    depth: number;
    theme: 'classic' | '2084';
    openItems: string[];
    toggleItem: (id: string) => void;
}> = ({ data, depth, theme, openItems, toggleItem }) => {
    const isOpen = openItems.includes(data.id);
    const hasSubsections = data.subsections && data.subsections.length > 0;

    // Exact mapping from original HTML CSS
    const getDepthStyles = () => {
        if (theme === '2084') {
            switch (depth) {
                case 1: return { bg: 'bg-[#1a1c24]', border: 'border-[#2a2d3a]', margin: 'mb-[0.6rem]' }; // .sh[data-d="1"]
                case 2: return { bg: 'bg-[#1f2129]', border: 'border-[#2a2d3a]', margin: 'my-[0.4rem]' }; // .sh[data-d="2"]
                case 3: return { bg: 'bg-[#24262f]', border: 'border-white/[0.04]', margin: 'my-[0.35rem]' }; // .sh[data-d="3"]
                default: return { bg: 'bg-[#2a2d37]', border: 'border-white/[0.03]', margin: 'my-[0.3rem]' }; // .sh[data-d="4"]
            }
        } else {
            switch (depth) {
                case 1: return { bg: 'bg-white', border: 'border-stone-200', margin: 'mb-[0.6rem]' };
                case 2: return { bg: 'bg-stone-50/50', border: 'border-stone-100', margin: 'my-[0.4rem]' };
                case 3: return { bg: 'bg-stone-100/30', border: 'border-stone-100/50', margin: 'my-[0.35rem]' };
                default: return { bg: 'bg-stone-200/10', border: 'border-stone-100/30', margin: 'my-[0.3rem]' };
            }
        }
    };

    // Button padding - exact from HTML: .st{padding:.85rem 1.1rem}
    const getButtonPadding = () => {
        switch (depth) {
            case 1: return 'py-[0.85rem] px-[1.1rem]'; // .sh[data-d="1"]>.st{padding:.85rem 1.1rem}
            case 2: return 'py-[0.75rem] px-[1rem]'; // .sh[data-d="2"]>.st{padding:.75rem 1rem}
            case 3: return 'py-[0.65rem] px-[0.9rem]'; // .sh[data-d="3"]>.st{padding:.65rem .9rem}
            default: return 'py-[0.55rem] px-[0.85rem]'; // .sh[data-d="4"]>.st{padding:.55rem .85rem}
        }
    };

    // Font sizes - exact from HTML
    const getFontSize = () => {
        switch (depth) {
            case 1: return 'text-[0.95rem]'; // .sh[data-d="1"]>.st{font-size:.95rem}
            case 2: return 'text-[0.88rem]'; // .sh[data-d="2"]>.st{font-size:.88rem}
            case 3: return 'text-[0.83rem]'; // .sh[data-d="3"]>.st{font-size:.83rem}
            default: return 'text-[0.78rem]'; // .sh[data-d="4"]>.st{font-size:.78rem}
        }
    };

    // Content padding - exact from HTML: .sb{padding:0 1.1rem .8rem}
    const getContentPadding = () => {
        switch (depth) {
            case 1:
            case 2: return 'pb-[0.8rem] px-[1.1rem]'; // .sb{padding:0 1.1rem .8rem}
            case 3: return 'pb-[0.7rem] px-[0.85rem]'; // .sh[data-d="3"]>.sc>.sb{padding:0 .85rem .7rem}
            default: return 'pb-[0.6rem] px-[0.8rem]'; // .sh[data-d="4"]>.sc>.sb{padding:0 .8rem .6rem}
        }
    };

    // Content font size
    const getContentFontSize = () => {
        switch (depth) {
            case 1:
            case 2: return 'text-[0.84rem]'; // .sb{font-size:.84rem}
            case 3: return 'text-[0.8rem]'; // .sh[data-d="3"]>.sc>.sb{font-size:.8rem}
            default: return 'text-[0.77rem]'; // .sh[data-d="4"]>.sc>.sb{font-size:.77rem}
        }
    };

    const styles = getDepthStyles();

    return (
        <div className={`rounded ${styles.bg} border ${styles.border} ${styles.margin} overflow-hidden transition-all duration-300`}>
            <button
                onClick={() => toggleItem(data.id)}
                className={`w-full flex items-center gap-[0.7rem] text-left group transition-all ${getButtonPadding()}`}
            >
                {data.dotColor && (
                    <div className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${getDotColorClass(data.dotColor)}`} />
                )}
                <span className={`flex-1 ${getFontSize()} ${depth <= 2 ? 'font-semibold' : 'font-normal'} leading-tight ${isOpen ? (theme === '2084' ? 'text-[#e8e6e1]' : 'text-stone-900') : 'text-[#9a97a0]'
                    }`}>
                    {data.title}
                </span>
                <div className={`w-[14px] h-[14px] flex items-center justify-center transition-transform duration-300 opacity-30 ${isOpen ? 'rotate-180 opacity-50' : ''}`}>
                    <ChevronDown size={14} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className={`${getContentPadding()}`}>
                            {data.content && (
                                <div className={`${getContentFontSize()} leading-[1.7] ${theme === '2084' ? 'text-[#9a97a0]' : 'text-stone-600'}`}>
                                    {data.content}
                                </div>
                            )}
                            {hasSubsections && (
                                <div className="pt-[0.7rem] pb-[0.7rem]"> {/* Only vertical padding, no horizontal (.ns in original doesn't indent horizontally) */}
                                    {data.subsections!.map(sub => (
                                        <Section
                                            key={sub.id}
                                            data={sub}
                                            depth={depth + 1}
                                            theme={theme}
                                            openItems={openItems}
                                            toggleItem={toggleItem}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FactCheckResearch: React.FC<{ theme: 'classic' | '2084' }> = ({ theme }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'law' | 'omni' | 'wl'>('all');

    const toggleItem = (id: string) => {
        setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const getAllIds = (sections: FactCheckSectionData[]): string[] => {
        let ids: string[] = [];
        sections.forEach(s => {
            ids.push(s.id);
            if (s.subsections) ids = [...ids, ...getAllIds(s.subsections)];
        });
        return ids;
    };

    const toggleAll = () => {
        if (openItems.length > 0) setOpenItems([]);
        else setOpenItems(getAllIds(data));
    };

    const data: FactCheckSectionData[] = [
        {
            id: '1',
            title: '1 · Die Rekordzahlen 2025: 1.456 Rechtsakte im Detail',
            dotColor: 'red',
            category: 'law',
            content: (
                <>
                    <p className="mb-[0.5rem]">Laut Gesamtmetall brachte die Kommission 2025 so viele Rechtsakte auf den Weg wie seit 2010 nicht mehr – im angeblichen „Jahr der Vereinfachung".</p>
                    <div className={`rounded-[3px] border p-[0.7rem_0.9rem] my-[0.6rem] font-mono text-[0.7rem] leading-[1.6] ${theme === '2084' ? 'bg-[#c9a84c]/[0.05] border-[#c9a84c]/[0.12] text-[#c9a84c]' : 'bg-stone-50 border-stone-100 text-stone-900'
                        }`}>
                        21 Richtlinien + 102 Verordnungen + 137 delegierte Rechtsakte + 1.196 Durchführungsrechtsakte = <strong>1.456 Rechtsakte</strong><br />
                        <span className={`text-[0.78rem] ${theme === '2084' ? 'text-[#9a97a0]' : 'text-stone-600'}`}>≈ 4 neue Rechtsakte pro Arbeitstag</span>
                    </div>
                </>
            ),
            subsections: [
                {
                    id: '1-1',
                    title: 'Die 21 Richtlinien – eine Einordnung',
                    dotColor: 'yellow',
                    content: <p>Die 21 Richtlinien umfassen ein breites Spektrum: von Nachhaltigkeit über Verteidigung bis Digitales. Ein Teil dient tatsächlich der Vereinfachung – aber viele schaffen neue oder schärfere Vorschriften.</p>,
                    subsections: [
                        {
                            id: '1-1-1',
                            title: 'Omnibus-Richtlinien (Vereinfachung) – ca. 6–8 der 21',
                            dotColor: 'green',
                            content: (
                                <div className="space-y-[0.5rem]">
                                    <p><span className={`inline-block font-mono text-[0.55rem] tracking-[0.1em] uppercase py-[0.2em] px-[0.55em] rounded-[2px] mr-[0.25rem] ${theme === '2084' ? 'bg-[#5ab87a]/[0.07] border border-[#5ab87a]/[0.22] text-[#5ab87a]' : 'bg-green-50 text-green-700'
                                        }`}>Vereinfachung</span> Diese Richtlinien gehören zu den 10 Omnibuspaketen:</p>
                                    <ul className="list-disc pl-4 space-y-[0.5rem] text-[0.77rem]">
                                        <li><strong>CSRD/CSDDD-Reform</strong> (Omnibus I): Schwelle von 250 auf 1.000 Mitarbeiter angehoben → ~85–90 % weniger Unternehmen betroffen</li>
                                        <li><strong>Stop-the-Clock-Richtlinie</strong>: Verschiebt CSRD-Fristen um 2 Jahre</li>
                                        <li><strong>CAP-Omnibus</strong> (III): Vereinfachung der Gemeinsamen Agrarpolitik</li>
                                        <li><strong>Binnenmarkt-Omnibus</strong> (IV): KMU-Erleichterungen, DSGVO-Aufbewahrung vereinfacht</li>
                                        <li><strong>Digital-Omnibus</strong> (VII): Konsolidiert Datengesetze, vereinfacht DSGVO</li>
                                        <li><strong>Umwelt-Omnibus</strong> (VIII): Schnellere Umweltverträglichkeitsprüfungen</li>
                                    </ul>
                                </div>
                            ),
                            subsections: [
                                {
                                    id: '1-1-1-1',
                                    title: 'Paradox: Vereinfachung erzeugt neue Rechtsakte',
                                    dotColor: 'yellow',
                                    content: <p>Jedes Omnibuspaket ist selbst ein Bündel neuer Rechtsakte – Richtlinien und Verordnungen, die bestehende Gesetze abändern. Die Kommission gibt selbst zu: „Um Regeln abzubauen, braucht es neue Rechtsakte" – die Ironie auf einen Blick.</p>
                                }
                            ]
                        },
                        {
                            id: '1-1-2',
                            title: 'Neue regulatorische Richtlinien – ca. 8–10 der 21',
                            dotColor: 'red',
                            content: (
                                <div className="space-y-[0.5rem]">
                                    <p><span className={`inline-block font-mono text-[0.55rem] tracking-[0.1em] uppercase py-[0.2em] px-[0.55em] rounded-[2px] mr-[0.25rem] ${theme === '2084' ? 'bg-[#d4564e]/[0.07] border border-[#d4564e]/[0.22] text-[#d4564e]' : 'bg-red-50 text-red-700'
                                        }`}>Neue Pflichten</span> Diese Richtlinien schaffen zusätzliche Vorschriften:</p>
                                    <ul className="list-disc pl-4 space-y-[0.5rem] text-[0.77rem]">
                                        <li><strong>Solvency-II-Reform</strong>: Neue Anforderungen an Versicherungen für Nachhaltigkeitsrisiken</li>
                                        <li><strong>Textilabfall-Richtlinie</strong>: Erweiterte Herstellerverantwortung, getrennte Sammlung</li>
                                        <li><strong>Verteidigungspakt-Richtlinien</strong>: Neue Beschaffungsregeln für €800 Mrd. Programm</li>
                                        <li><strong>Fluggastdaten-Richtlinien</strong>: Neue API-Daten-Pflichten für Airlines</li>
                                        <li><strong>Batterie-Sorgfaltspflicht</strong>: Grundsätzlich neue Pflicht (obwohl verschoben)</li>
                                        <li><strong>Lebensmittelsicherheits-Omnibus</strong>: Überarbeitet 9+ Verordnungen</li>
                                    </ul>
                                </div>
                            ),
                            subsections: [
                                {
                                    id: '1-1-2-1',
                                    title: 'Warum „Vereinfachung" hier relativ ist',
                                    dotColor: 'red',
                                    content: <p>Beispiel Chemie-Omnibus (VI): Spart €363 Mio./Jahr, aber verschiebt nur Fristen statt Regeln zu streichen. Beispiel Digital-Omnibus: Vereinfacht Cookie-Banner, fügt aber neue Regeln für KI-Training hinzu.</p>
                                }
                            ]
                        },
                        {
                            id: '1-1-3',
                            title: 'Übergangs-/Technische Richtlinien – ca. 3–5 der 21',
                            dotColor: 'yellow',
                            content: <p><span className={`inline-block font-mono text-[0.55rem] tracking-[0.1em] uppercase py-[0.2em] px-[0.55em] rounded-[2px] mr-[0.25rem] ${theme === '2084' ? 'bg-[#d4a84e]/[0.07] border border-[#d4a84e]/[0.22] text-[#d4a84e]' : 'bg-stone-100 text-stone-600'}`}>Neutral</span> Einige Richtlinien sind rein technischer Natur. Sie verändern den Aufwand kaum.</p>
                        }
                    ]
                },
                {
                    id: '1-2',
                    title: 'Die 1.333 „unsichtbaren" Rechtsakte (91,5 %)',
                    dotColor: 'red',
                    content: (
                        <>
                            <p className="mb-[0.5rem]">Der wahre Bürokratie-Motor sind delegierte und Durchführungsrechtsakte. Sie regeln technische Details – oft ohne Abstimmung.</p>
                            <div className={`rounded-[3px] border p-[0.7rem_0.9rem] my-[0.6rem] font-mono text-[0.7rem] leading-[1.6] ${theme === '2084' ? 'bg-[#d4564e]/[0.05] border-[#d4564e]/[0.12] text-[#d4564e]' : 'bg-red-50 border-red-100 text-red-800'
                                }`}>
                                137 delegierte + 1.196 Durchführungsrechtsakte = <strong>1.333</strong> = 91,5 % aller Rechtsakte 2025<br />
                                <span className={`text-[0.78rem] italic ${theme === '2084' ? 'text-[#9a97a0]' : 'text-stone-600'}`}>Ex-Kommissar Verheugen: „demokratisch vollkommen unkontrolliert"</span>
                            </div>
                        </>
                    )
                }
            ]
        },
        {
            id: '2',
            title: '2 · Die 10 Omnibuspakete: Vereinfachung oder Mogelpackung?',
            dotColor: 'green',
            category: 'omni',
            content: <p>Die Kommission präsentierte 2025 insgesamt 10 Omnibuspakete. Sie versprechen €11,9 Mrd. jährliche Einsparungen. Aber: Keine einzige Zahl ist bisher unabhängig verifiziert.</p>,
            subsections: [
                {
                    id: '2-1',
                    title: 'I · Nachhaltigkeit (Feb. 2025): CSRD, CSDDD, Taxonomie',
                    dotColor: 'green',
                    content: (
                        <p><span className={`inline-block font-mono text-[0.55rem] tracking-[0.1em] uppercase py-[0.2em] px-[0.55em] rounded-[2px] mr-[0.25rem] ${theme === '2084' ? 'bg-[#5ab87a]/[0.07] border border-[#5ab87a]/[0.22] text-[#5ab87a]' : 'bg-green-50 text-green-700'
                            }`}>Größtes Paket</span> Reduziert CSRD-Scope um ~85 % und CSDDD um ~70 %. Versprochene Einsparung: ~€6 Mrd./Jahr.</p>
                    ),
                    subsections: [
                        {
                            id: '2-1-1',
                            title: 'Was tatsächlich passiert',
                            dotColor: 'yellow',
                            content: <p>Statt ~50.000 Unternehmen sind jetzt nur noch ~5.000–6.000 berichtspflichtig. Klimatransitionspläne im CSDDD gestrichen. Zivilhaftung entfernt, Bußgelder auf 3 % Umsatz gesenkt.</p>
                        }
                    ]
                },
                {
                    id: '2-2',
                    title: 'II · Investitionen (Feb. 2025): InvestEU, EFSI',
                    dotColor: 'green',
                    content: <p>Vereinfacht EU-Förderprogramme. InvestEU-Garantie um €2,9 Mrd. erhöht. KMU-Definition erweitert.</p>
                }
            ]
        },
        {
            id: '3',
            title: '3 · Wer profitiert, wer verliert?',
            dotColor: 'blue',
            category: 'wl',
            content: <p>Die Verschiebung von Pflichten und die Änderung von Schwellenwerten erzeugt klare Gewinner und Verlierer.</p>,
            subsections: [
                {
                    id: '3-1',
                    title: 'Die Profiteure',
                    dotColor: 'green',
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5rem] my-[0.5rem]">
                            {[
                                { label: 'Großkonzerne', text: 'CSRD-Scope -85%. CSDDD-Haftung entfernt.' },
                                { label: 'KMU & Mittelstand', text: 'Berichtspflichtsbefreiung. Neue Mid-Cap Kat.' },
                                { label: 'Importeure (CBAM)', text: '90 % Befreiung (€1,2 Mrd. gespart).' },
                                { label: 'Verteidigung', text: 'Vereinfachte Beschaffung (€800 Mrd.).' }
                            ].map((item, i) => (
                                <div key={i} className={`rounded-[3px] border p-[0.6rem_0.8rem] text-[0.77rem] leading-[1.5] ${theme === '2084' ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-white border-stone-100'
                                    }`}>
                                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase block mb-[0.3rem] text-[#5ab87a]">{item.label}</span>
                                    <p className={theme === '2084' ? 'text-[#9a97a0]' : 'text-stone-600'}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    )
                },
                {
                    id: '3-2',
                    title: 'Die Leidtragenden',
                    dotColor: 'red',
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.5rem] my-[0.5rem]">
                            {[
                                { label: 'Globaler Süden', text: 'Weniger Kontrolle von Lieferketten.' },
                                { label: 'Umwelt & Klima', text: 'Verschlechterte Datenlage, schwächere Ziele.' },
                                { label: 'ESG-Investoren', text: 'Verlust von Vergleichbarkeit.' },
                                { label: 'Demokr. Kontrolle', text: 'Konsultationsfristen unter 24h.' }
                            ].map((item, i) => (
                                <div key={i} className={`rounded-[3px] border p-[0.6rem_0.8rem] text-[0.77rem] leading-[1.5] ${theme === '2084' ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-white border-stone-100'
                                    }`}>
                                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase block mb-[0.3rem] text-[#d4564e]">{item.label}</span>
                                    <p className={theme === '2084' ? 'text-[#9a97a0]' : 'text-stone-600'}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
            ]
        },
        {
            id: '4',
            title: '4 · Der Stresstest: Versprechen vs. Realität',
            dotColor: 'red',
            category: 'law',
            content: <p>Die Kommission behauptet, ~30 % der geplanten delegierten Rechtsakte zurückgestellt zu haben.</p>,
            subsections: [
                {
                    id: '4-1',
                    title: 'Zurückgestellt ≠ Gestrichen',
                    dotColor: 'red',
                    content: <p>„Zurückgestellt" bedeutet: Aufgeschoben auf unbestimmte Zeit. Es ist keine Garantie für Abschaffung.</p>,
                    subsections: [
                        {
                            id: '4-1-1',
                            title: 'Der Blindflug: 40 % ohne Folgenabschätzung',
                            dotColor: 'red',
                            content: <p>Vier von zehn Gesetzen wurden erlassen, ohne die Konsequenzen zu kennen. EU-Ombudsmann prüft Verfahrensmängel.</p>
                        }
                    ]
                }
            ]
        }
    ];

    const filteredData = activeFilter === 'all' ? data : data.filter(d => d.category === activeFilter);

    return (
        <div className={`rounded-[2rem] border transition-all duration-1000 overflow-hidden max-w-[860px] mx-auto ${theme === '2084' ? 'bg-[#0e0f13] border-white/10 text-[#e8e6e1]' : 'bg-white border-stone-200 text-stone-900 shadow-2xl'
            }`}>
            <div className="p-[2.5rem_1.5rem_4rem]"> {/* .c{padding:2.5rem 1.5rem 4rem} */}
                <header className="text-center mb-[2.5rem] pb-[2rem] border-b border-[#2a2d3a]">
                    <div className={`inline-block font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-[1.2rem] py-[0.3em] px-[1em] rounded-[2px] ${theme === '2084' ? 'bg-[#c9a84c]/[0.15] border border-[#c9a84c]/[0.2] text-[#c9a84c]' : 'border border-stone-200 text-stone-500 bg-stone-50'
                        }`}>
                        Faktencheck · Matroschka-Tiefenanalyse · Erweiterte Recherche
                    </div>
                    <h3 className="font-['Playfair_Display',serif] text-[clamp(1.5rem,3.5vw,2.1rem)] font-bold leading-[1.3] mb-[1rem]">
                        EU-Bürokratie 2025: Die 1.456 Rechtsakte unter der Lupe
                    </h3>

                    <div className={`text-left rounded-[0_4px_4px_0] border border-l-[3px] p-[1.1rem_1.3rem] mt-[1.2rem] ${theme === '2084' ? 'bg-[#16171d] border-[#c9a84c] border-y-[#2a2d3a] border-r-[#2a2d3a]' : 'bg-stone-50 border-stone-900 border-y-stone-100 border-r-stone-100'
                        }`}>
                        <p className="font-['Playfair_Display',serif] italic text-[0.98rem] leading-[1.6] opacity-70">
                            „Zudem zielt ein erheblicher Teil der im aktuellen Mandat von Präsidentin von der Leyen angenommenen Gesetzgebung ausdrücklich darauf ab, den Verwaltungsaufwand zu verringern."
                        </p>
                        <span className="block mt-[0.6rem] font-mono text-[0.6rem] opacity-40 tracking-[0.05em]">
                            — Sprecher der EU-Kommission, zitiert in WELT AM SONNTAG, Jan. 2026
                        </span>
                    </div>
                </header>

                <div className="flex flex-wrap gap-[0.5rem] mb-[1.5rem]">
                    {[
                        { id: 'all', label: 'Alle öffnen' },
                        { id: 'law', label: 'Nur Gesetze' },
                        { id: 'omni', label: 'Nur Omnibus' },
                        { id: 'wl', label: 'Nur Profiteure/Leidtragende' }
                    ].map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => filter.id === 'all' ? toggleAll() : setActiveFilter(filter.id as any)}
                            className={`inline-flex items-center gap-[0.4rem] font-mono text-[0.6rem] tracking-[0.1em] uppercase py-[0.45em] px-[0.9em] rounded-[3px] border transition-all ${(filter.id === 'all' || activeFilter === filter.id)
                                ? (theme === '2084' ? 'border-[#c9a84c] text-[#c9a84c]' : 'border-stone-900 text-stone-900')
                                : (theme === '2084' ? 'border-[#2a2d3a] text-[#6b687a] hover:border-[#c9a84c] hover:text-[#c9a84c]' : 'border-stone-100 text-stone-400')
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div>
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((section) => (
                            <motion.div
                                key={section.id}
                                layout
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Section
                                    data={section}
                                    depth={1}
                                    theme={theme}
                                    openItems={openItems}
                                    toggleItem={toggleItem}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <footer className={`mt-[2rem] pt-[1.5rem] border-t border-[#2a2d3a]`}>
                    <h3 className="font-['Playfair_Display',serif] text-[1.1rem] mb-[0.8rem]">Gesamtbewertung nach Tiefenrecherche</h3>
                    <p className="text-[0.87rem] leading-[1.7] mb-[0.7rem] opacity-70">
                        Die Aussage des Kommissionssprechers enthält einen realen Kern: Die 10 Omnibuspakete 2025 sind das umfangreichste Vereinfachungsprogramm in der EU-Geschichte. Aber die Aussage ist <strong>irreführend</strong>, weil 91,5 % der Rechtsakte außerhalb jeder Vereinfachungsdebatte bleiben.
                    </p>

                    <div className="flex items-center gap-[0.5rem] my-[1.2rem]">
                        <span className="font-mono text-[0.6rem] text-[#6b687a] tracking-[0.1em] uppercase">Falsch</span>
                        <div className="flex-1 h-[5px] bg-[#1d1f27] rounded-[3px] relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '30%' }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`absolute left-0 top-0 h-full rounded-[3px] ${theme === '2084' ? 'bg-gradient-to-r from-[#d4564e] to-[#d4a84e]' : 'bg-gradient-to-r from-red-500 to-yellow-500'
                                    }`}
                            />
                        </div>
                        <span className="font-mono text-[0.6rem] text-[#6b687a] tracking-[0.1em] uppercase">Wahr</span>
                    </div>
                    <div className="text-center">
                        <span className={`font-mono text-[0.75rem] font-semibold ${theme === '2084' ? 'text-[#d4a84e]' : 'text-yellow-600'}`}>
                            ~30 % Wahrheitsgehalt – Überwiegend irreführend
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
};
