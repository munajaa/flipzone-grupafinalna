
import React, { useState } from 'react';
import { ACCESS_CODE } from '../constants';

interface AccessGateProps {
  onSuccess: () => void;
}

const AccessGate: React.FC<AccessGateProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === ACCESS_CODE) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-700"></div>
        
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-xl shadow-blue-600/30 transform transition-transform group-hover:rotate-12">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Flipzone Balkan</h1>
          <p className="text-slate-400 font-medium">Privatni pristup za članove zajednice</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Pristupni Kod</label>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Unesite kod..."
              className={`w-full bg-slate-950/50 border ${error ? 'border-red-500 shadow-red-500/20 shadow-lg' : 'border-slate-800 focus:border-blue-500'} rounded-2xl p-4 text-center text-xl font-bold tracking-widest text-white outline-none transition-all duration-300`}
            />
            {error && <p className="text-red-400 text-xs text-center mt-2 font-bold animate-pulse">Netačan kod. Molimo pokušajte ponovo.</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-extrabold shadow-lg shadow-blue-600/25 transform active:scale-95 transition-all duration-300"
          >
            Otključaj Platformu
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 text-xs">
          Nemaš kod? Kontaktiraj Flipzone admin tim na Discordu.
        </div>
      </div>
    </div>
  );
};

export default AccessGate;
