export interface ToyItem {
  id: string;
  name: string;
  category: 'hotwheels' | 'lego' | 'superhero' | 'boardgames';
  categoryLabel: string;
  image: string;
  badge: string;
  rating: number; // out of 5
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  description: string;
  story: string;
  favoriteFeature: string;
  color: string;
}

export interface MathQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'arithmetic' | 'shapes' | 'word-problem' | 'patterns';
  difficulty: 'Rookie' | 'Explorer' | 'Master Whiz';
}

export interface MathRiddle {
  id: string;
  title: string;
  riddle: string;
  hint: string;
  answer: string;
  category: string;
}

export interface EVSFact {
  id: string;
  title: string;
  category: 'space' | 'animals' | 'plants' | 'planet-hero';
  iconName: string;
  summary: string;
  coolFact: string;
  avikNotes: string;
  badge: string;
  color: string;
}

export interface Hobby {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  skillLevel: string;
  favoriteGear: string;
  funStat: string;
  bgGradient: string;
  accentColor: string;
  badges: string[];
}

export interface SocietySpot {
  id: string;
  name: string;
  tagline: string;
  x: number; // percentage on map
  y: number;
  icon: string;
  color: string;
  bestTime: string;
  avikTip: string;
  activity: string;
  secretCode: string;
}

export interface GuestbookEntry {
  id: string;
  senderName: string;
  relation: 'Classmate' | 'Best Friend' | 'Cousin / Family' | 'Neighbor' | 'Teacher / Coach';
  activity: string;
  message: string;
  timestamp: string;
  avatarColor: string;
  favoriteEmoji: string;
}
