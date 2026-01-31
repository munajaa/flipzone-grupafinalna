
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
      className="group relative flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-slate-950/80 text-xs px-2 py-1 rounded-md text-slate-200">
          {video.duration}
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">
            {video.category}
          </span>
          <span className="text-xs text-slate-500">{video.dateAdded}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 line-clamp-1 leading-tight group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {video.description}
        </p>
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800">
          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
            {video.instructor.charAt(0)}
          </div>
          <span className="text-xs text-slate-400">{video.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
