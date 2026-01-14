import { Category } from './category';

export interface Book {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  image: string;
}

export interface SearchResultsProps {
  filteredBooks: Book[];
  searchTerm: string;
  onItemClick: () => void;
  showSearchResults: boolean;
}

export interface BookCardProps {
  book: {
    id: number;
    image: string;
    categoryName: string;
    name: string;
    price: number;
    description: string;
  };
}
