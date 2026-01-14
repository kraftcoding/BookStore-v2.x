import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHook';
import { fetchAllBooks } from '../../../redux/reducers/bookSlice';
import {
  SectionContainer,
  SectionNameContainer,
  SectionName,
  BookCardsContainer,
} from './MostPopularSection.styles';
import BookCard from '../../book-card/BookCard';

const MostPopularSection = () => {
  const books = useAppSelector((state) => state.bookReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);
  return (
    <SectionContainer maxWidth={false}>
      <SectionNameContainer>
        <SectionName variant="h6">Most Popular</SectionName>
      </SectionNameContainer>
      <BookCardsContainer>
        {books.length > 0 &&
          books
            .slice(8, 14)
            .map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
      </BookCardsContainer>
    </SectionContainer>
  );
};

export default MostPopularSection;
