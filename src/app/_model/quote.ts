export interface Quote {
    id: string;
    text: string;
    author: string;
    source: string;
    categories: string;
    mood: 'Vidám' | 'Szomorú' | 'Közömbös' | 'Nyugodt' | 'Elmélkedő';
  }