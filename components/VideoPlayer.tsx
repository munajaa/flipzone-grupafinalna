
import React from 'react';
import { VideoLesson } from '../types';
import { VIDEO_LESSONS } from '../constants';

interface VideoPlayerProps {
  video: VideoLesson;
  onClose: () => void;
  onSelectVideo: (video: VideoLesson) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose, onSelectVideo }) => {
  const currentIndex = VIDEO_LESSONS.findIndex(v => v.id === video.id);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" onClick={onClose}></div>
      
      <div className="relative w-full h-full flex flex-col lg:flex-row bg-[#02040a] overflow-hidden lg:m-8 lg:rounded-[3rem] border border-white/5 shadow-2xl">
        
        {/* Main Content Area (YouTube-like Feed) */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Video Holder */}
          <div className="aspect-video w-full bg-black relative group shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <video 
              key={video.videoUrl}
              controls 
              autoPlay
              className="w-full h-full object-contain"
              poster={video.thumbnail}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>
            
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 z-20 p-4 bg-slate-900/80 hover:bg-red-600 rounded-2xl text-white transition-all border border-white/5 shadow-xl group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Details Area */}
          <div className="p-8 md:p-12 space-y-8 max-w-5xl mx-auto w-full">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase text-blue-400 tracking-widest">
                  LEKCIJA {currentIndex + 1}
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  {video.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-heading italic uppercase tracking-tighter text-white leading-none">
                {video.title}
              </h1>
            </div>

            <div className="flex items-center gap-6 p-6 glass-card rounded-3xl border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-black italic text-white shadow-xl shadow-blue-600/20">
                {video.instructor.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-black italic uppercase tracking-tighter text-white">{video.instructor}</div>
                <div className="text-xs font-medium text-slate-500 italic">Elite Mentor @ Flipzone Balkan</div>
              </div>
              <button className="ml-auto px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                PRATI MENTORA
              </button>
            </div>

            <div className="p-8 glass-card rounded-[2rem] border-white/5 text-slate-400 font-medium italic leading-relaxed text-lg">
              {video.description}
            </div>
          </div>
        </div>

        {/* Sidebar (Curriculum List) */}
        <div className="w-full lg:w-[450px] h-full bg-[#05070c] border-l border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5">
            <h3 className="text-xl font-black font-heading italic uppercase tracking-widest text-white">Program <span className="text-blue-500">Akademije</span></h3>
            <div className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span>PROGRES</span>
               <span>{currentIndex + 1} / {VIDEO_LESSONS.length}</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
               <div 
                className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-1000" 
                style={{ width: `${((currentIndex + 1) / VIDEO_LESSONS.length) * 100}%` }}
               ></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {VIDEO_LESSONS.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className={`w-full text-left p-4 rounded-3xl transition-all border flex gap-4 items-center group relative overflow-hidden ${
                  v.id === video.id 
                    ? 'bg-blue-600/10 border-blue-500/40 shadow-xl' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className="relative w-28 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                  <img src={v.thumbnail} className={`w-full h-full object-cover ${v.id !== video.id && 'opacity-50 grayscale'}`} />
                  {v.id === video.id && <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center"><div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black shadow-lg shadow-white/20">▶</div></div>}
                </div>
                <div className="min-w-0 py-1">
                  <h4 className={`text-sm font-black italic uppercase tracking-tighter truncate leading-none ${v.id === video.id ? 'text-blue-400' : 'text-slate-400'}`}>
                    {v.title.split('. ')[1] || v.title}
                  </h4>
                  <p className="text-[9px] font-black text-slate-600 mt-2 uppercase tracking-widest">{v.duration} MIN • {v.category}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-8 bg-black/40 border-t border-white/5">
             <div className="flex items-center gap-4 text-slate-500">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">🤝</div>
                <div className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  TREBA TI POMOĆ? <br /> <span className="text-white">PITAJ ADMIN TIM</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
