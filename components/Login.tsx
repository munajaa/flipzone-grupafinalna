
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-1000">
        
        {/* Logo Mark */}
        <div className="inline-flex flex-col items-center gap-4">
           <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center font-black text-5xl shadow-2xl shadow-blue-600/40 text-white animate-bounce" style={{ animationDuration: '3s' }}>F</div>
           <div className="text-[10px] font-black tracking-[0.8em] uppercase text-blue-500 italic">Balkan Elite Community</div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6">
           <h1 className="text-6xl md:text-8xl font-black font-heading italic uppercase tracking-tighter leading-[0.85] text-white">
             DOBRODOŠLI U <br /> <span className="animate-text-gradient">FLIPZONE.</span>
           </h1>
           <p className="text-slate-400 max-w-xl mx-auto font-medium italic text-lg">
             Ekskluzivna platforma za članove zajednice. <br /> Prijavite se da pristupite bazi znanja i lekcijama.
           </p>
        </div>

        {/* Action Button */}
        <div className="pt-8">
           <button 
             onClick={onLogin}
             className="px-16 py-8 bg-blue-600 hover:bg-blue-500 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group"
           >
             Prijavi se u Grupu
             <span className="block text-[8px] opacity-50 mt-1 font-bold tracking-widest">Samo za verificirane članove</span>
           </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-12 border-t border-white/5 opacity-50">
           {['20+ LEKCIJA', 'VIP VENDORI', 'Balkan HUB', '24/7 SUPPORT'].map((item, idx) => (
             <div key={idx} className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item}</div>
           ))}
        </div>
      </div>
      
      {/* Footer info */}
      <div className="absolute bottom-10 text-[9px] text-slate-700 font-bold uppercase tracking-[0.5em]">
        FLIPZONE BALKAN • PRIVATE ACCESS ONLY
      </div>
    </div>
  );
};

export default Login;
