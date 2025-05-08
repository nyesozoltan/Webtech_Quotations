export type Mood = 'Vidám' | 'Szomorú' | 'Közömbös' | 'Nyugodt' | 'Elmélkedő';
export type Category = 'Inspiráció' | 'Élet' | 'Humor' | 'Motiváció' | 'Szerelem' | 'Elmélkedés';

export const MOOD_OPTIONS: Mood[] = ['Vidám', 'Szomorú', 'Közömbös', 'Nyugodt', 'Elmélkedő'];

export const CATEGORY_OPTIONS: Category[] = [
  'Inspiráció',
  'Élet',
  'Humor',
  'Motiváció',
  'Szerelem',
  'Elmélkedés'
];
export interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
  categories: Category;
  mood: Mood;
}