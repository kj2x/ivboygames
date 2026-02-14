
import React from 'react';
import { Gamepad2, Search, Heart, Home, TrendingUp, Settings } from 'lucide-react';

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
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_25px_rgba(79,70,229,0.6)]">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-gaming tracking-wider bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
            NOVA GAMES
          </span>
        </div>

        <div className="relative flex-1 max-w-xl w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Find your next favorite game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder-slate-500 backdrop-blur-sm"
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => onNavigate('/')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button 
            onClick={() => onNavigate('/favorites')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/favorites' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Favorites</span>
          </button>
          <button 
            onClick={() => onNavigate('/settings')}
            className={`flex items-center gap-1.5 transition-colors ${currentPath === '/settings' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
