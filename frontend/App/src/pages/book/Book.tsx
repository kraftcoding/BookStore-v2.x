import { Button, Tab, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { addToCart } from '../../redux/reducers/cartSlice';
import {
  CardImage,
  DetailsBox,
  PageContainer,
  BookDetailsBox,
  BookDetailsContainer,
  SingleBookContainer,
} from './Book.styles';
import { useEffect, useState } from 'react';

const Product = () => {
  const authInfo = useAppSelector((state) => state.auth);
  const booksReducer = useAppSelector((state) => state.bookReducer);
  const dispatch = useAppDispatch();
  const { name } = useParams();
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false); // Added state variable

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setButtonClicked(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PageContainer>
      <Tab label="BACK" onClick={() => navigate(-1)} />
      <SingleBookContainer>
        {booksReducer.books
          .filter((item) => item.title === name)
          .map((item) => (
            <BookDetailsContainer key={item.id}>
              <BookDetailsBox>
                <CardImage image={item.image} />
              </BookDetailsBox>
              <BookDetailsBox>
                <DetailsBox>
                  <Typography variant="h5">{item.title}</Typography>
                </DetailsBox>
                <DetailsBox>
                  <Typography variant="h6">ISBN:{item.isbn}</Typography>
                </DetailsBox>
                <DetailsBox>
                  <Typography variant="subtitle1" gutterBottom>
                    {item.description}
                  </Typography>
                </DetailsBox>
                <DetailsBox
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)} // Use handleAddToCart function
                    sx={{
                      backgroundColor: buttonClicked ? 'green' : 'lightBlue',
                    }}
                  >
                    <Typography>
                      {buttonClicked ? 'ADDED TO CART' : 'ADD TO CART'}
                    </Typography>
                  </Button>                     
                </DetailsBox>
              </BookDetailsBox>
            </BookDetailsContainer>
          ))}
      </SingleBookContainer>
    </PageContainer>
  );
};

export default Product;
