
import React from 'react';
import GameCard from '../components/GameCard';
import CategoryFilter from '../components/CategoryFilter';
import { Game } from '../types';
import { GAMES } from '../constants';

interface HomePageProps {
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  favorites: string[];
  toggleFavorite: (e: React.MouseEvent, id: string) => void;
  onGameSelect: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  favorites, 
  toggleFavorite, 
  onGameSelect 
}) => {
  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGames = GAMES.filter(g => g.isHot).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!searchQuery && selectedCategory === 'All' && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-gaming font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full inline-block"></span>
              Featured Games
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGames.map(game => (
              <div 
                key={game.id} 
                onClick={() => onGameSelect(game.id)}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-indigo-500 transition-all"
              >
                <img src={game.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={game.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-bold uppercase text-indigo-400 tracking-widest bg-indigo-950/50 px-2 py-1 rounded">Trending</span>
                  <h3 className="text-2xl font-bold text-white mt-2">{game.title}</h3>
                  <p className="text-slate-300 text-sm mt-1 line-clamp-1">{game.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mb-8">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Games`}
            <span className="ml-3 text-slate-500 text-sm font-normal">({filteredGames.length} available)</span>
          </h2>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
                onClick={onGameSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-dashed border-slate-700">
            <p className="text-slate-400 text-lg mb-2">No games found matching your criteria.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); }}
              className="text-indigo-400 hover:underline font-medium"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
