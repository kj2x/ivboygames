
import React from 'react';
import { Gamepad2, Search, Heart, Home, TrendingUp } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onNavigate, currentPath }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('/')}
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-gaming tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            NOVA GAMES
          </span>
        </div>

        <div className="relative flex-1 max-w-xl w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search unblocked games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-200 placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('/')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button 
            onClick={() => onNavigate('/trending')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/trending' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </button>
          <button 
            onClick={() => onNavigate('/favorites')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/favorites' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
