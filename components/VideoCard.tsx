
import React from 'react';
import { VideoLesson } from '../types';

interface VideoCardProps {
  video: VideoLesson;
  onClick: (video: VideoLesson) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      onClick={() => onClick(video)}
      className="perspective-container group"
    >
      <div className="card-3d-effect glass-card relative rounded-[2.5rem] overflow-hidden cursor-pointer group-hover:border-blue-500/30 transition-all duration-500">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          {/* Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          {/* Play Badge */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>

          <div className="absolute top-6 left-6 flex gap-2">
            <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
              {video.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-8 right-8">
            <h3 className="text-xl md:text-2xl font-black font-heading italic uppercase tracking-tighter text-white leading-tight drop-shadow-lg group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed italic font-medium line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
            {video.description}
          </p>
          
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black italic text-white shadow-lg">
                {video.instructor.charAt(0)}
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{video.instructor}</span>
            </div>
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-lg">
              {video.duration} MIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
