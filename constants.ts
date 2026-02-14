
import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=400',
    category: 'Puzzle',
    url: 'https://play2048.co/',
    rating: 4.8,
    plays: '2.5M',
    isHot: true
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'A fast-paced puzzle game inspired by Tetris.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    category: 'Arcade',
    url: 'https://hextris.io/',
    rating: 4.5,
    plays: '800K'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Lite',
    description: 'Jump and fly your way through danger in this rhythm-based platformer.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
    category: 'Action',
    url: 'https://geometry-dash.io/',
    rating: 4.9,
    plays: '10M',
    isHot: true
  },
  {
    id: 'tetris',
    title: 'Classic Tetris',
    description: 'The world-famous puzzle game that everyone knows and loves.',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400',
    category: 'Classic',
    url: 'https://tetris.com/play-tetris',
    rating: 4.7,
    plays: '5M'
  },
  {
    id: 'paper-io',
    title: 'Paper.io 2',
    description: 'Capture as much territory as possible and beat the competition.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
    category: 'Strategy',
    url: 'https://paper-io.com/',
    rating: 4.4,
    plays: '12M',
    isHot: true
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Drive a ball in the 3D running game in Slope Game.',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=400',
    category: 'Racing',
    url: 'https://slopegame.online/',
    rating: 4.6,
    plays: '3.2M'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The original idle game about making cookies!',
    thumbnail: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
    category: 'Arcade',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    rating: 4.8,
    plays: '15M',
    isHot: true
  },
  {
    id: 'cut-the-rope',
    title: 'Cut The Rope',
    description: 'Feed Om Nom with candy in this physics-based puzzle.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
    category: 'Puzzle',
    url: 'https://www.cuttherope.ie/',
    rating: 4.7,
    plays: '4.1M'
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    description: 'Live your best (or worst) life in this text-based simulator.',
    thumbnail: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=400',
    category: 'Strategy',
    url: 'https://bitlifeonline.com/',
    rating: 4.5,
    plays: '7.8M'
  }
];

export const CATEGORIES: (string)[] = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy', 'Racing', 'Classic'];
