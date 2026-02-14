
import React, { useState } from 'react';
import { ArrowLeft, Maximize2, RotateCcw, Heart, Share2, MessageSquare } from 'lucide-react';
import { Game } from '../types';

interface GamePageProps {
  game: Game;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const GamePage: React.FC<GamePageProps> = ({ game, onBack, isFavorite, onToggleFavorite }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to games
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group">
            <iframe
              id="game-iframe"
              src={game.url}
              className="w-full h-full border-none"
              title={game.title}
              allowFullScreen
            />
            
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { window.location.reload(); }}
                className="p-3 bg-slate-900/80 backdrop-blur rounded-full text-white hover:bg-slate-800"
                title="Restart"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 shadow-lg"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Online
                  </span>
                  <span>•</span>
                  <span>{game.category}</span>
                  <span>•</span>
                  <span>{game.plays} total plays</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onToggleFavorite(game.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    isFavorite 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : 'border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </button>
                <button className="p-2 border border-slate-700 text-slate-300 hover:bg-slate-700 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6">
              {game.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-700">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Developer</p>
                <p className="text-sm font-medium text-slate-200">Community Choice</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Release Date</p>
                <p className="text-sm font-medium text-slate-200">Jan 2024</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Controls</p>
                <p className="text-sm font-medium text-slate-200">Mouse / Keyboard</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Compatibility</p>
                <p className="text-sm font-medium text-slate-200">Desktop / Mobile</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Community Tips
            </h3>
            <div className="space-y-4">
              <div className="text-sm border-l-2 border-indigo-500 pl-3 py-1">
                <p className="text-slate-200 font-medium">"Try using spacebar for power-ups!"</p>
                <p className="text-slate-500 text-xs mt-1">— GamerPro99</p>
              </div>
              <div className="text-sm border-l-2 border-indigo-500 pl-3 py-1">
                <p className="text-slate-200 font-medium">"Level 15 is much easier if you stay on the left."</p>
                <p className="text-slate-500 text-xs mt-1">— PixelQueen</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Want more?</h3>
            <p className="text-slate-300 text-sm mb-4">Subscribe to our newsletter for weekly unblocked releases!</p>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-2"
            />
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-2 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
