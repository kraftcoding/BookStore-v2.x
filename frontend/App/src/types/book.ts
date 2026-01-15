import { Category } from './category';

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: number;
  category: string;
  image: string;
  author: string;
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
    title: string;
    description: string;
    isbn: number;
    category: string;
    image: string;
    author: string;
  };
}
