import React from 'react';
import { SearchResultsProps } from '../../types/book';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const SearchResults: React.FC<SearchResultsProps> = ({
  filteredBooks,
  searchTerm,
  onItemClick,
  showSearchResults,
}) => {
  const navigate = useNavigate();

  const handleClick = (bookTitle: string) => {
    navigate(`/book/${bookTitle}`);
    onItemClick();
  };

  const startsWithResults = filteredBooks.filter((book) =>
    book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const exactMatchResults = filteredBooks.filter(
    (book) => book.title.toLowerCase() === searchTerm.toLowerCase()
  );

  const results = [...startsWithResults, ...exactMatchResults];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 5,
        width: '300px',
        color: 'black',
        display: showSearchResults ? 'block' : 'none',
      }}
    >
      {results.map((book) => (
        <div key={book.id}>
          <div onClick={() => handleClick(book.title)}>
            <Box sx={{ px: 1, mx: 2, border: 'none' }}>{book.title}</Box>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default SearchResults;
