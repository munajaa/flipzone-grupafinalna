
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
  const nextVideo = currentIndex < VIDEO_LESSONS.length - 1 ? VIDEO_LESSONS[currentIndex + 1] : null;
  const prevVideo = currentIndex > 0 ? VIDEO_LESSONS[currentIndex - 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 lg:p-8 animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-[1800px] h-full flex flex-col lg:flex-row bg-slate-900 shadow-2xl overflow-hidden md:rounded-[2rem] border border-white/5">
        
        {/* Main Player Section */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button 
              onClick={onClose}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 rounded-2xl text-white transition-all border border-white/5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative group">
            <video 
              key={video.videoUrl}
              controls 
              autoPlay
              className="w-full h-full object-contain"
              poster={video.thumbnail}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>
            
            {/* Quick Navigation Overlay (only shows on hover) */}
            <div className="absolute inset-x-0 bottom-20 px-8 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <button 
                disabled={!prevVideo}
                onClick={() => prevVideo && onSelectVideo(prevVideo)}
                className={`pointer-events-auto p-4 rounded-full bg-slate-900/80 text-white border border-white/10 transition-all ${!prevVideo ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                disabled={!nextVideo}
                onClick={() => nextVideo && onSelectVideo(nextVideo)}
                className={`pointer-events-auto p-4 rounded-full bg-slate-900/80 text-white border border-white/10 transition-all ${!nextVideo ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          {/* Player Footer / Navigation Info */}
          <div className="p-6 bg-slate-900/50 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white line-clamp-1">{video.title}</h2>
              <p className="text-sm text-slate-400">Instruktor: {video.instructor} • {video.dateAdded}</p>
            </div>
            <div className="flex gap-3">
               <button 
                disabled={!prevVideo}
                onClick={() => prevVideo && onSelectVideo(prevVideo)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all disabled:opacity-30"
               >
                 Prethodna
               </button>
               <button 
                disabled={!nextVideo}
                onClick={() => nextVideo && onSelectVideo(nextVideo)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-30 shadow-lg shadow-blue-600/20"
               >
                 Sledeća Lekcija
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </button>
            </div>
          </div>
        </div>

        {/* Sidebar Curriculum List */}
        <div className="w-full lg:w-[400px] h-full bg-slate-900 border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-black text-white uppercase tracking-widest">Plan Programa</h3>
            <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
               <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${((currentIndex + 1) / VIDEO_LESSONS.length) * 100}%` }}
               ></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">
              Završeno: {currentIndex + 1} od {VIDEO_LESSONS.length} lekcija
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {VIDEO_LESSONS.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className={`w-full text-left p-4 rounded-2xl transition-all border flex gap-4 items-center group ${
                  v.id === video.id 
                    ? 'bg-blue-600/10 border-blue-500/50' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center font-black text-sm ${
                  v.id === video.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                }`}>
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-sm font-bold truncate ${v.id === video.id ? 'text-blue-400' : 'text-slate-300'}`}>
                    {v.title.split('. ')[1] || v.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">{v.duration} • {v.category}</p>
                </div>
                {idx < currentIndex && (
                  <svg className="w-5 h-5 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-950/40 border-t border-white/5">
             <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Detalji Lekcije</h4>
             <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">
               {video.description}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
