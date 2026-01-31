
import React, { useState, useEffect, useMemo } from 'react';
import LiquidBackground from './components/LiquidBackground.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import Login from './components/Login.tsx';
import UnlockScreen from './components/UnlockScreen.tsx';
import { VIDEO_LESSONS, VENDORS, DOCUMENTS } from './constants';
import { VideoLesson, AppSection } from './types';

declare var netlifyIdentity: any;

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const isPaid = useMemo(() => {
    if (!user) return false;
    const roles = user.app_metadata?.roles || [];
    return roles.includes('paid');
  }, [user]);

  const videoCategories = useMemo(() => {
    return ['All', ...new Set(VIDEO_LESSONS.map(v => v.category))];
  }, []);

  const filteredLessons = useMemo(() => {
    return activeCategory === 'All' 
      ? VIDEO_LESSONS 
      : VIDEO_LESSONS.filter(v => v.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Inicijalizacija Netlify Identity
    if (typeof netlifyIdentity !== 'undefined') {
      netlifyIdentity.init();
      
      console.log("Identity Hub Initialized");

      // Provjera tokena u URL-u (Invite/Recovery)
      const hash = window.location.hash;
      if (hash && (hash.includes('invite_token') || hash.includes('recovery_token') || hash.includes('confirmation_token'))) {
        console.log("Identity Token detektiran. Otvaram widget...");
        setTimeout(() => netlifyIdentity.open(), 500);
      }

      const currentUser = netlifyIdentity.currentUser();
      if (currentUser) {
        setUser(currentUser);
      }

      netlifyIdentity.on('login', (u: any) => {
        console.log('Login success:', u.email);
        setUser(u);
        netlifyIdentity.close();
      });

      netlifyIdentity.on('logout', () => {
        setUser(null);
        setActiveSection('dashboard');
      });

      netlifyIdentity.on('error', (err: any) => console.error('Identity Error:', err));
    }
    
    setIsLoading(false);
  }, []);

  const handleLogout = () => netlifyIdentity.logout();

  const handleStartPayment = async () => {
    try {
      const payload = user ? { userId: user.id, email: user.email } : { email: '' };
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const session = await response.json();
      if (session.url) window.location.href = session.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Greška kod plaćanja. Pokušajte ponovo.");
    }
  };

  if (isLoading) return null;

  // Render logika bazirana na statusu korisnika
  if (!user) {
    return (
      <div className="relative min-h-screen">
        <LiquidBackground />
        <Login onLogin={() => netlifyIdentity.open()} onPay={handleStartPayment} />
      </div>
    );
  }

  if (!isPaid) {
    return (
      <div className="relative min-h-screen">
        <LiquidBackground />
        <UnlockScreen userEmail={user.email} onLogout={handleLogout} onPay={handleStartPayment} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-blue-500 selection:text-white bg-[#02040a]">
      <LiquidBackground />
      
      <header className="sticky top-0 z-50 py-6 px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card p-4 rounded-[2.5rem] border-white/10">
          <button onClick={() => setActiveSection('dashboard')} className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:rotate-12 transition-transform shadow-xl shadow-blue-600/20 text-white">F</div>
             <div className="hidden sm:block text-left">
               <div className="text-xl font-black font-heading italic uppercase leading-none tracking-tighter text-white">Flipzone</div>
               <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.5em] leading-none mt-1 text-left">Balkan Elite</div>
             </div>
          </button>

          <nav className="flex items-center gap-2">
            {['lessons', 'suppliers', 'documents'].map(id => (
              <button
                key={id}
                onClick={() => setActiveSection(id as AppSection)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeSection === id ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {id === 'lessons' ? 'Akademija' : id === 'suppliers' ? 'Vendori' : 'Resursi'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <button onClick={handleLogout} className="px-6 py-3 rounded-2xl bg-slate-900 border border-white/5 text-[10px] font-black italic text-slate-400 hover:text-white transition-colors">LOGOUT</button>
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px] hover:scale-105 transition-transform cursor-pointer">
                <div className="w-full h-full rounded-2xl bg-[#02040a] flex items-center justify-center text-[10px] font-black italic text-white uppercase">{user.email?.charAt(0)}</div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-10 pb-20">
        {activeSection === 'dashboard' && (
          <div className="py-20 text-center space-y-12 animate-in fade-in duration-1000">
            <h1 className="text-6xl md:text-8xl font-black font-heading italic leading-tight tracking-tighter text-white">ELITNI <span className="animate-text-gradient uppercase">PRISTUP</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium italic">Dobrodošli u komandni centar. Svi resursi su otključani.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
               <div onClick={() => setActiveSection('lessons')} className="glass-card p-10 rounded-[3rem] border-white/5 cursor-pointer hover:border-blue-500/50 transition-all text-left">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">▶</div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Lekcije</h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Nauči proces od početka.</p>
               </div>
               <div onClick={() => setActiveSection('suppliers')} className="glass-card p-10 rounded-[3rem] border-white/5 cursor-pointer hover:border-blue-500/50 transition-all text-left">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">🤝</div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Vendori</h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Provereni Balkan izvori.</p>
               </div>
               <div onClick={() => setActiveSection('documents')} className="glass-card p-10 rounded-[3rem] border-white/5 cursor-pointer hover:border-blue-500/50 transition-all text-left">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">📄</div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Resursi</h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium italic">Sve što ti treba za rast.</p>
               </div>
            </div>
          </div>
        )}

        {activeSection === 'lessons' && (
          <div className="py-10 space-y-16 animate-in slide-in-from-bottom-10 duration-700">
             <div className="flex justify-between items-end">
                <h2 className="text-4xl font-black font-heading italic uppercase tracking-tighter text-white">Video <span className="text-blue-500">Akademija</span></h2>
                <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/5">
                  {videoCategories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>{cat}</button>
                  ))}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {filteredLessons.map(video => (
                 <div key={video.id} onClick={() => setSelectedVideo(video)} className="card-3d glass-card group rounded-[3rem] overflow-hidden cursor-pointer border-white/5">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={video.thumbnail} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={video.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-8 right-8 text-left">
                         <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">{video.title}</h4>
                      </div>
                    </div>
                    <div className="p-8 space-y-4 text-left">
                       <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-2">{video.description}</p>
                       <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-[10px] font-black text-slate-600 italic">{video.duration} MIN</span>
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">PUSTI →</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeSection === 'suppliers' && (
          <div className="py-10 animate-in slide-in-from-right-10 duration-700">
             <h2 className="text-4xl font-black font-heading italic uppercase tracking-tighter text-white mb-12">VIP <span className="text-blue-500">Vendor</span> Hub</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {VENDORS.map(v => (
                 <div key={v.id} className="card-3d glass-card group rounded-[3.5rem] overflow-hidden border-white/5 flex flex-col">
                    <div className="aspect-[16/10] relative">
                       <img src={v.image} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt={v.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                       <div className="absolute bottom-6 left-8 text-left">
                          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">{v.title}</h3>
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{v.subTitle}</span>
                       </div>
                    </div>
                    <div className="p-10 space-y-6 flex-1 flex flex-col text-left">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                             <div className="text-[8px] font-black text-slate-600 uppercase mb-1">Profit</div>
                             <div className="text-lg font-black text-green-500 italic">{v.metrics.profit}</div>
                          </div>
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                             <div className="text-[8px] font-black text-slate-600 uppercase mb-1">Status</div>
                             <div className="text-lg font-black text-blue-400 italic">LIVE</div>
                          </div>
                       </div>
                       <p className="text-xs text-slate-500 italic font-medium leading-relaxed line-clamp-3">{v.description}</p>
                       <a href={v.link} target="_blank" className="mt-auto py-5 bg-white text-slate-950 rounded-3xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-blue-600 hover:text-white transition-all">Pristupi Kanalu</a>
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
