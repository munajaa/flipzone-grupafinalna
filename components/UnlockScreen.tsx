
import React from 'react';

interface UnlockScreenProps {
  userEmail: string;
  onLogout: () => void;
  onPay: () => void;
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({ userEmail, onLogout, onPay }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-20 overflow-y-auto">
      <div className="w-full max-w-5xl text-center space-y-16 animate-in fade-in zoom-in duration-700">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-blue-600/20 border border-blue-500/30 px-6 py-3 rounded-full backdrop-blur-xl mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-400">Prijavljeni: {userEmail}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-heading italic leading-tight tracking-tighter text-white">
            AKTIVIRAJ <span className="animate-text-gradient uppercase">VIP PRISTUP</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium italic leading-relaxed">
            Trenutno nemate aktivnu rolu. Otključajte cijelu bazu znanja, video lekcije i VIP listu dobavljača jednokratnom uplatom.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="card-3d glass-card p-12 rounded-[4rem] border-blue-500/50 relative overflow-hidden group bg-blue-600/5 transition-all text-left">
            <div className="absolute top-0 right-0 p-8">
               <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Lifetime Access</span>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-black font-heading italic uppercase tracking-tighter text-white">Elite Lifetime</h3>
                <p className="text-white font-black text-5xl italic">99€ <span className="text-lg text-blue-400/50 not-italic">jednokratno</span></p>
              </div>
              
              <ul className="space-y-5 text-slate-300 font-medium italic text-sm">
                {[
                  "Sve video lekcije (Akademija)",
                  "Ekskluzivna VIP lista dobavljača",
                  "Pristup resursima i PDF-ovima",
                  "Zatvorena Balkan reselling zajednica",
                  "Lifetime ažuriranja sadržaja"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onPay}
                className="w-full py-7 bg-blue-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/40 relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Kupi Pristup Putem Stripe-a</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
           <button onClick={onLogout} className="text-slate-700 font-black text-[9px] uppercase tracking-[0.8em] hover:text-white transition-colors">Odjava sa naloga</button>
           <div className="flex gap-4 opacity-20">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
