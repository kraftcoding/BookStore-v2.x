import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { fetchAllBooks } from '../../../redux/reducers/bookSlice';
import {
  BookCardsContainer,
  SectionContainer,
  SectionName,
  SectionNameContainer,
} from '../new-arrivals-section/NewArrivalsSection.styles';
import BooktCard from '../../book-card/BookCard';
import { CircularProgress } from '@mui/material';

const NewArrivalsSection = () => {
  const bookReducer = useAppSelector((state) => state.bookReducer);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllBooks())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  return (
    <SectionContainer maxWidth={false}>
      <SectionNameContainer>
        <SectionName variant="h6">New Arrivals</SectionName>
      </SectionNameContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <BookCardsContainer>
          {bookReducer.books.length > 0 &&
            bookReducer.books
              .slice(0, 6)
              .map((book) => (
                <BooktCard key={book.id} book={book} />
              ))}
        </BookCardsContainer>
      )}
    </SectionContainer>
  );
};

export default NewArrivalsSection;
