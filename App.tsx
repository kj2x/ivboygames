
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import { Game, AppState } from './types';
import { GAMES } from './constants';
import { Github, Twitter, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  // Load favorites from local storage
  useEffect(() => {
    const stored = localStorage.getItem('nova_favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('nova_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent | string, id?: string) => {
    const gameId = typeof e === 'string' ? e : id!;
    if (typeof e !== 'string') e.stopPropagation();
    
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(fid => fid !== gameId) 
        : [...prev, gameId]
    );
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setActiveGameId(null);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const openGame = (id: string) => {
    setActiveGameId(id);
    setCurrentPath('/game');
    window.scrollTo(0, 0);
  };

  const activeGame = activeGameId ? GAMES.find(g => g.id === activeGameId) : null;

  const renderContent = () => {
    if (currentPath === '/game' && activeGame) {
      return (
        <GamePage 
          game={activeGame} 
          onBack={() => handleNavigate('/')} 
          isFavorite={favorites.includes(activeGame.id)}
          onToggleFavorite={(id) => toggleFavorite(id)}
        />
      );
    }

    if (currentPath === '/favorites') {
      const favoriteGames = GAMES.filter(g => favorites.includes(g.id));
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-gaming font-bold text-white mb-8">My Favorites</h2>
          {favoriteGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteGames.map(game => (
                <HomePage 
                  key={game.id}
                  searchQuery={''}
                  selectedCategory={'All'}
                  setSelectedCategory={() => {}}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onGameSelect={openGame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700">
              <p className="text-slate-400">You haven't added any favorites yet.</p>
            </div>
          )}
        </div>
      );
    }

    if (currentPath === '/trending') {
      const trendingGames = [...GAMES].sort((a, b) => b.rating - a.rating);
      return (
        <HomePage 
          searchQuery={''}
          selectedCategory={'All'}
          setSelectedCategory={setSelectedCategory}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onGameSelect={openGame}
        />
      );
    }

    return (
      <HomePage 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onGameSelect={openGame}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onNavigate={handleNavigate}
        currentPath={currentPath}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <span className="text-2xl font-bold font-gaming tracking-wider text-white">
                NOVA GAMES
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              The ultimate destination for unblocked web games. Play at school, at work, or anywhere! No downloads required.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><button onClick={() => handleNavigate('/')} className="hover:text-indigo-400 transition-colors">Browse</button></li>
                <li><button onClick={() => handleNavigate('/trending')} className="hover:text-indigo-400 transition-colors">Trending</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">New Releases</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><button className="hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-indigo-400 transition-colors">Contact Us</button></li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Nova Games. All rights reserved. Some content may be property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
