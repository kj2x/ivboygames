
export type Category = 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Strategy' | 'Racing' | 'Classic';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: Category;
  url: string;
  rating: number;
  plays: string;
  isHot?: boolean;
}

export interface AppSettings {
  panicUrl: string;
  panicKey: string;
  cloak: 'none' | 'google' | 'drive' | 'classroom';
}

export interface AppState {
  searchQuery: string;
  selectedCategory: Category | 'All';
  favorites: string[];
  settings: AppSettings;
}
