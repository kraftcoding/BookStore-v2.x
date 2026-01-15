import { Box, Typography } from '@mui/material';
import {
  BkCard,
  BookCardButton,
  BookCardContent,
  BookCardName,
  BookCardIsbn,
  CardImageContainer,
} from './BookCard.styles';
import { useAppDispatch } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import { BookCardProps } from '../../types/book';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/reducers/favoriteSlice';
import { useState } from 'react';

const BookCard = ({ book }: BookCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(book.id));
    } else {
      dispatch(addToFavorites(book));
    }

    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const handleImageClick = () => {
    navigate(`/category/${book.title}`);
  };

  return (
    <BkCard key={book.id}>
      <CardImageContainer onClick={handleImageClick}>
        {/* <CardMedia component="img" height="200" image={book.image} /> */}
        <LazyLoadImage
          effect="blur"
          src={book.image}
          alt={book.title}
          height={200}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '8px',
              textTransform: 'uppercase',
              color: 'white',
              padding: '2px',
              background: '#32CD32',
              width: '100px',
              height: '20px',

              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {book.category}
          </Typography>
          <Box
            onClick={handleAddToFavorites}
            sx={{
              fontSize: '8px',
              padding: '2px',
              height: '20px',
              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isFavorite ? (
              <FavoriteOutlinedIcon sx={{ color: 'red', cursor: 'pointer' }} />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ color: 'black', cursor: 'pointer' }}
              />
            )}
          </Box>
        </Box>
      </CardImageContainer>

      <BookCardContent>
        <BookCardButton
          variant="outlined"
          color="inherit"
          onClick={() => dispatch(addToCart(book))}
        >
          ADD TO CART
        </BookCardButton>
        <BookCardName
          sx={{
            textTransform: 'uppercase',
          }}
        >
          {book.title}
        </BookCardName>
        <BookCardIsbn>ISBN: {book.isbn}</BookCardIsbn>
      </BookCardContent>
    </BkCard>
  );
};

export default BookCard;
