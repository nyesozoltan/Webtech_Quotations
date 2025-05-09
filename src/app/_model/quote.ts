export type Mood = 'Vidám' | 'Szomorú' | 'Közömbös' | 'Nyugodt' | 'Elmélkedő';
export type Category = 'Inspiráció' | 'Munka' | 'Siker' | 'Kudarc' | 'Élet' | 'Idő' | 'Tudás' | 'Humor' | 'Motiváció' | 'Szerelem' |'Barátság' | 'Elmélkedés';

export const MOOD_OPTIONS: Mood[] = [
   'Vidám',
   'Szomorú',
   'Közömbös',
   'Nyugodt',
   'Elmélkedő'];

export const CATEGORY_OPTIONS: Category[] = [
  'Inspiráció',
  'Munka',
  'Siker',
  'Kudarc',
  'Élet',
  'Idő',
  'Tudás',
  'Humor',
  'Motiváció',
  'Szerelem',
  'Barátság',
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