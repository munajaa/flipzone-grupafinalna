
import React, { useState, useEffect, useMemo } from 'react';
import LiquidBackground from './components/LiquidBackground.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import VideoCard from './components/VideoCard.tsx';
import Login from './components/Login.tsx';
import { VIDEO_LESSONS, VENDORS, DOCUMENTS } from './constants';
import { VideoLesson, AppSection } from './types';

declare var netlifyIdentity: any;

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const videoCategories = useMemo(() => {
    return ['All', ...new Set(VIDEO_LESSONS.map(v => v.category))];
  }, []);

  const filteredLessons = useMemo(() => {
    return activeCategory === 'All' 
      ? VIDEO_LESSONS 
      : VIDEO_LESSONS.filter(v => v.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleIdentity = () => {
      if (typeof netlifyIdentity === 'undefined') return;
      netlifyIdentity.init();
      const currentUser = netlifyIdentity.currentUser();
      if (currentUser) setUser(currentUser);
      netlifyIdentity.on('init', (u: any) => { if (u) setUser(u); setIsLoading(false); });
      netlifyIdentity.on('login', (u: any) => { setUser(u); netlifyIdentity.close(); });
      netlifyIdentity.on('logout', () => { setUser(null); setActiveSection('dashboard'); });
      setTimeout(() => setIsLoading(false), 1200);
    };
    if (document.readyState === 'complete') handleIdentity();
    else window.addEventListener('load', handleIdentity);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-xl italic text-blue-500">F</div>
        </div>
        <div className="mt-8 text-blue-500 font-black italic uppercase tracking-[0.8em] text-[10px] animate-pulse">Initializing Elite Hub</div>
      </div>
    );
  }

  if (!user) return (
    <div className="relative min-h-screen"><LiquidBackground /><Login onLogin={() => netlifyIdentity.open()} /></div>
  );

  return (
    <div className="relative min-h-screen selection:bg-blue-600 selection:text-white bg-[#02040a]">
      <LiquidBackground />
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 py-8 px-6 md:px-12 pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between glass-card p-4 rounded-[2.5rem] border-white/10 pointer-events-auto backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button onClick={() => setActiveSection('dashboard')} className="flex items-center gap-5 pl-4 group">
             <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center font-black text-3xl group-hover:rotate-[15deg] transition-all duration-500 shadow-2xl shadow-blue-600/40 text-white">F</div>
             <div className="hidden sm:block text-left">
               <div className="text-2xl font-black font-heading italic uppercase leading-none tracking-tighter text-white">Flipzone</div>
               <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] leading-none mt-1.5 text-left">Balkan Elite</div>
             </div>
          </button>

          <nav className="hidden lg:flex items-center gap-3 bg-white/5 p-2 rounded-3xl border border-white/5">
            {[
              { id: 'lessons', label: 'Akademija', icon: '▶' },
              { id: 'suppliers', label: 'Vendori', icon: '🤝' },
              { id: 'documents', label: 'Resursi', icon: '📄' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as AppSection)}
                className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                  activeSection === item.id 
                    ? 'bg-white text-black shadow-[0_10px_25px_rgba(255,255,255,0.2)]' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5 pr-2">
             <button onClick={() => netlifyIdentity.logout()} className="hidden md:block px-6 py-3 rounded-2xl bg-white/5 text-[10px] font-black italic text-slate-400 hover:bg-red-600/20 hover:text-red-400 transition-all uppercase tracking-widest border border-white/5">LOGOUT</button>
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-[2px] hover:scale-105 transition-transform cursor-pointer shadow-lg">
                <div className="w-full h-full rounded-2xl bg-[#02040a] flex items-center justify-center text-xs font-black italic text-white uppercase">{user.email?.charAt(0)}</div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32">
        {activeSection === 'dashboard' && (
          <div className="py-24 text-center space-y-16 animate-in fade-in duration-1000">
            <div className="inline-block px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4">
              Authorized Member Only
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black font-heading italic leading-[0.85] tracking-tighter text-white">
              SISTEM <br /> <span className="animate-text-gradient uppercase">OTKLJUČAN.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Pristupaš najnaprednijoj Balkan reselling bazi. Sve lekcije i provereni vendori su ti na raspolaganju.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-32">
               {[
                 { id: 'lessons', title: 'Akademija', desc: 'Video lekcije visoke produkcije.', color: 'blue' },
                 { id: 'suppliers', title: 'Vendori', desc: 'VIP Balkan i EU izvori.', color: 'indigo' },
                 { id: 'documents', title: 'Resursi', desc: 'Tabelarni prikazi i PDF alati.', color: 'cyan' }
               ].map((card, i) => (
                 <div 
                  key={card.id} 
                  onClick={() => setActiveSection(card.id as AppSection)} 
                  className="perspective-container group cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                 >
                    <div className="card-3d-effect glass-card p-12 rounded-[3.5rem] border-white/5 text-left group-hover:border-blue-500/30">
                      <div className={`w-16 h-16 bg-${card.color}-600/20 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner`}>
                        {card.id === 'lessons' ? '▶' : card.id === 'suppliers' ? '🤝' : '📄'}
                      </div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">{card.title}</h3>
                      <p className="text-sm text-slate-500 mt-3 font-medium italic">{card.desc}</p>
                      <div className="mt-8 flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         PRISTUPI <span className="text-lg">→</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeSection === 'lessons' && (
          <div className="py-16 space-y-20 animate-in slide-in-from-bottom-10 duration-700">
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black font-heading italic uppercase tracking-tighter text-white leading-none">
                    Video <span className="text-blue-500">Feed</span>
                  </h2>
                  <p className="text-slate-500 italic font-medium max-w-xl">Pregledaj sve dostupne lekcije sortirane po kategorijama. Klikni na video za detaljan pregled i YouTube-style iskustvo.</p>
                </div>
                <div className="flex flex-wrap gap-2 bg-white/5 p-3 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                  {videoCategories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)} 
                      className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                          ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]' 
                          : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {filteredLessons.map(video => (
                 <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
               ))}
             </div>
          </div>
        )}

        {activeSection === 'suppliers' && (
          <div className="py-16 animate-in slide-in-from-right-10 duration-700">
             <h2 className="text-5xl md:text-7xl font-black font-heading italic uppercase tracking-tighter text-white mb-20 leading-none">
               VIP <span className="text-blue-500">Vendori</span>
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {VENDORS.map(v => (
                 <div key={v.id} className="perspective-container group">
                   <div className="card-3d-effect glass-card rounded-[4rem] overflow-hidden border-white/5 flex flex-col group-hover:border-blue-500/30">
                      <div className="aspect-[16/10] relative">
                         <img src={v.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000" alt={v.title} />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                         <div className="absolute bottom-8 left-10 text-left">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">{v.title}</h3>
                            <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">{v.subTitle}</span>
                         </div>
                      </div>
                      <div className="p-12 space-y-8 flex-1 flex flex-col text-left">
                         <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                               <div className="text-[9px] font-black text-slate-600 uppercase mb-2 tracking-widest">PROFIT MARŽA</div>
                               <div className="text-2xl font-black text-green-500 italic tracking-tighter">{v.metrics.profit}</div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                               <div className="text-[9px] font-black text-slate-600 uppercase mb-2 tracking-widest">RIZIK</div>
                               <div className={`text-2xl font-black italic tracking-tighter ${v.metrics.risk === 'low' ? 'text-blue-400' : 'text-orange-400'}`}>
                                 {v.metrics.risk.toUpperCase()}
                               </div>
                            </div>
                         </div>
                         <p className="text-sm text-slate-400 italic font-medium leading-relaxed line-clamp-3 opacity-80">{v.description}</p>
                         <a href={v.link} target="_blank" className="mt-auto py-6 bg-white text-slate-950 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] text-center hover:bg-blue-600 hover:text-white transition-all shadow-xl group-hover:shadow-blue-600/20">KONTAKTIRAJ VENDORA</a>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </main>

      {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} onSelectVideo={setSelectedVideo} />}
    </div>
  );
};

export default App;
