
import React from 'react';

declare var netlifyIdentity: any;

interface LoginProps {
  onLogin: () => void;
  onPay: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onPay }) => {
  const handleOpenLogin = () => {
    netlifyIdentity.open();
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-blue-500 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-6 py-3 rounded-2xl border-white/5">
          <div className="font-black italic text-xl tracking-tighter uppercase">Flipzone <span className="text-blue-500">Balkan</span></div>
          <button onClick={handleOpenLogin} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Prijava</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
            Najveća reselling zajednica na balkanu
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-heading italic leading-[0.9] tracking-tighter">
            PRESTANI SAMO <br /> <span className="animate-text-gradient uppercase">GLEDATI.</span> <br /> POČNI ZARAĐIVATI.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Sve što ti treba za profitabilan reselling na jednom mjestu. Provjereni dobavljači, video edukacija i mentorstvo 24/7.
          </p>
          <div className="pt-8">
            <button 
              onClick={onPay}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Kupi pristup – 29,99 €
            </button>
            <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-widest font-bold italic">Jednokratna uplata • Trajni pristup</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6 text-left">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Što je zapravo <br /><span className="text-blue-500">Flipzone Balkan?</span></h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Nismo samo "još jedna grupa". Mi smo ekosustav dizajniran da te od nule dovede do ozbiljne zarade. Balkan je specifično tržište, a mi imamo ključeve koji otključavaju profit koji drugi ne vide.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              Od sneakersa i elektronike do naprednih metoda posredovanja – pokrivamo sve.
            </p>
          </div>
          <div className="glass-card aspect-video rounded-[3rem] border-white/5 flex items-center justify-center p-10 bg-blue-600/5">
             <div className="text-center space-y-4">
                <div className="text-6xl">🚀</div>
                <div className="text-2xl font-black italic uppercase">1200+ Članova</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Aktivno trguje svakog dana</div>
             </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Sve što dobivaš <br /><span className="text-blue-500">ulaskom u grupu</span></h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "VIP VENDOR LISTA", desc: "Direktni kontakti provjerenih dobavljača za iPhone, AirPods, Sneakers i luksuzne brendove.", icon: "💎" },
            { title: "VIDEO AKADEMIJA", desc: "Više od 20 lekcija koje te uče od osnova do naprednih prodajnih psihologija i marketinga.", icon: "📺" },
            { title: "MENTORSTVO 24/7", desc: "Naš tim admina je tu da odgovori na svako tvoje pitanje i pomogne ti oko prve prodaje.", icon: "🤝" },
            { title: "ZALEDNINA & LOGISTIKA", desc: "Ugovori, tablice za praćenje profita i savjeti za sigurnu dostavu i plaćanje.", icon: "📦" },
            { title: "ZATVORENA ZAJEDNICA", desc: "Pristup Balkan Reselling Hub-u gdje se razmjenjuju info o 'hot' artiklima prije svih.", icon: "🔐" },
            { title: "METODE POSREDOVANJA", desc: "Kako prodavati robu koju uopće ne posjeduješ fizički. Čisti profit bez rizika.", icon: "📈" }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-blue-500/20 transition-all text-left group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Placeholder Section */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">Rezultati <span className="text-blue-500">Naših Članova</span></h2>
          <p className="text-slate-500 mt-4 font-bold uppercase text-xs tracking-widest">Samo dokazi, bez praznih priča</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Uredite ove putanje kasnije sa stvarnim slikama */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[3/4] glass-card rounded-3xl overflow-hidden border-white/5 relative bg-slate-900 flex items-center justify-center text-slate-800 font-black">
              <img src={`/images/testimonials/t${i}.jpg`} alt={`Rezultat ${i}`} className="w-full h-full object-cover opacity-0 transition-opacity" onLoad={(e) => (e.currentTarget.style.opacity = '1')} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] uppercase">Slika Rezultata {i}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Qualification Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card p-12 rounded-[3.5rem] border-red-500/10 bg-red-500/5 text-left">
            <h3 className="text-2xl font-black italic uppercase text-red-500 mb-6">Ovo NIJE za tebe ako:</h3>
            <ul className="space-y-4 text-slate-400 text-sm italic font-medium">
              <li>- Tražiš zaradu preko noći bez rada</li>
              <li>- Nisi spreman uložiti barem sat vremena dnevno</li>
              <li>- Bojiš se komunikacije s ljudima</li>
              <li>- Odustaješ kod prve prepreke</li>
            </ul>
          </div>
          <div className="glass-card p-12 rounded-[3.5rem] border-green-500/10 bg-green-500/5 text-left">
            <h3 className="text-2xl font-black italic uppercase text-green-500 mb-6">Ovo JE za tebe ako:</h3>
            <ul className="space-y-4 text-slate-300 text-sm italic font-medium">
              <li>- Želiš financijsku slobodu i dodatni prihod</li>
              <li>- Razumiješ da je reselling biznis, a ne hobi</li>
              <li>- Spreman si pratiti upute iskusnih mentora</li>
              <li>- Želiš biti dio pobjedničke zajednice</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-blue-600/20 blur-[120px] -z-10"></div>
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            TVOJA <span className="text-blue-500">PRILIKA</span> JE <br /> UPRAVO SADA.
          </h2>
          <div className="space-y-4">
             <div className="text-4xl font-black italic">29,99 €</div>
             <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Cijena raste nakon svakih 100 novih članova</p>
          </div>
          <button 
            onClick={onPay}
            className="px-16 py-8 bg-white text-slate-950 rounded-[2.5rem] font-black text-lg uppercase tracking-widest shadow-2xl transition-all hover:bg-blue-600 hover:text-white hover:scale-105"
          >
            Postani Član Grupe
          </button>
          <div className="pt-10 flex flex-col items-center gap-6">
            <div className="flex gap-4 opacity-30">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-5" alt="Stripe" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-[10px] text-slate-700 font-bold uppercase tracking-[0.5em]">
          Flipzone Balkan © 2026 • Sva prava pridržana
        </div>
      </footer>
    </div>
  );
};

export default Login;
