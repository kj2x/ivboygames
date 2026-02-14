
import React from 'react';
import { Star, Play, Heart, Flame } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onClick: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game.id)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer border border-slate-700 hover:border-indigo-500 transition-all hover:-translate-y-1 duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60" />
        
        {game.isHot && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
            <Flame className="w-3 h-3 fill-current" />
            Hot
          </div>
        )}

        <button 
          onClick={(e) => onToggleFavorite(e, game.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 text-white hover:bg-red-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-indigo-600 p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>{game.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase font-semibold text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
            {game.category}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            {game.plays} plays
          </span>
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
