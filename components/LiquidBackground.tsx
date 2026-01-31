
import React from 'react';

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#02040a]">
      {/* Primary Neon Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/15 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[150px] animate-bounce" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-[30%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-900/15 blur-[150px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
      
      {/* Floating Accent Orbs */}
      <div className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-blue-400/20 blur-[50px] animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[10%] w-64 h-64 rounded-full bg-blue-700/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Modern Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}></div>
      
      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#02040a_100%)]"></div>
    </div>
  );
};

export default LiquidBackground;
