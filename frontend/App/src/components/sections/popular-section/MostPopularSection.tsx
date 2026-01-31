import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHook';
import {
  SectionContainer,
  SectionNameContainer,
  SectionName,
  BookCardsContainer,
} from './MostPopularSection.styles';
import BookCard from '../../book-card/BookCard';

const MostPopularSection = () => {
  const books = useAppSelector((state) => state.bookReducer);  

  return (
    <SectionContainer maxWidth={false}>
      <SectionNameContainer>
        <SectionName variant="h6">Most Popular</SectionName>
      </SectionNameContainer>
      <BookCardsContainer>
        {books.books.length > 0 &&
          books.books
            .slice(2, 4)
            .map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
      </BookCardsContainer>
    </SectionContainer>
  );
};

export default MostPopularSection;
