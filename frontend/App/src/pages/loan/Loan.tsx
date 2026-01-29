import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Pagination, CircularProgress } from '@mui/material';
import {
  PageContainer,
  CardsWrapper,
  PaginationContainer,
} from './Loan.styles';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { fetchAllBooks } from '../../redux/reducers/bookSlice';
import DropdownOption from '../../components/dropdown-option/DropdownOption';
import CategoryLists from '../../components/categories/CategoryLists';
import BookCard from '../../components/book-card/BookCard';

const Loan = () => {
  const booksReducer = useAppSelector((state) => state.bookReducer);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchAllBooks())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  // Calculate the current page's range of books
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = booksReducer.books.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <PageContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px 20px',
            }}
          >
            <CategoryLists />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flexEnd',
              alignItems: 'center',
              margin: '0 20px 5px',
            }}
          >
            <DropdownOption />
          </Box>
          <CardsWrapper>
            {currentBooks.length > 0 &&
              currentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </CardsWrapper>
        </>
      )}

      <PaginationContainer>
        <Pagination
          count={Math.ceil(booksReducer.books.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </PageContainer>
  );
};

export default Loan;
