
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage';
import GameCard from './components/GameCard';
import { Game, AppSettings } from './types';
import { GAMES } from './constants';
// Added missing Heart icon to imports
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const CLOAK_CONFIG = {
  none: { title: 'Nova Games | Play Unblocked', icon: '/favicon.ico' },
  google: { title: 'Google', icon: 'https://www.google.com/favicon.ico' },
  drive: { title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png' },
  classroom: { title: 'Classes', icon: 'https://www.gstatic.com/classroom/favicon.png' }
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    panicUrl: 'https://classroom.google.com',
    panicKey: '`',
    cloak: 'none'
  });

  // Load persistence
  useEffect(() => {
    const storedFavs = localStorage.getItem('nova_favorites');
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    
    const storedSettings = localStorage.getItem('nova_settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('nova_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('nova_settings', JSON.stringify(settings));
    
    // Apply cloak
    const config = CLOAK_CONFIG[settings.cloak];
    document.title = config.title;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = config.icon;
  }, [settings]);

  // Global Panic Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === settings.panicKey) {
        window.location.href = settings.panicUrl;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.panicKey, settings.panicUrl]);

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

    if (currentPath === '/settings') {
      return (
        <SettingsPage 
          settings={settings} 
          updateSettings={(s) => setSettings(prev => ({ ...prev, ...s }))} 
        />
      );
    }

    if (currentPath === '/favorites') {
      const favoriteGames = GAMES.filter(g => favorites.includes(g.id));
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-gaming font-bold text-white mb-2">My Favorites</h2>
            <p className="text-slate-500">Your collection of hand-picked unblocked games.</p>
          </div>
          {favoriteGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={openGame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-800/20 rounded-3xl border border-slate-800 border-dashed">
              <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg mb-2">No favorites yet</p>
              <button 
                onClick={() => handleNavigate('/')}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Go find some games!
              </button>
            </div>
          )}
        </div>
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
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
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
                <li><button onClick={() => handleNavigate('/favorites')} className="hover:text-indigo-400 transition-colors">Favorites</button></li>
                <li><button onClick={() => handleNavigate('/settings')} className="hover:text-indigo-400 transition-colors">Settings</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><button className="hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
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
            © {new Date().getFullYear()} Nova Games. Designed for high performance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
