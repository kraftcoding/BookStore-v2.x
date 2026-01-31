import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookContainer, BookInfoContainer } from './BookEdit.styles';
import { fetchBook, IBookInputs, updateBook } from '../../../redux/reducers/bookSlice';

const bookSchema = yup.object({
  //title: yup.string().required('Title is required'),
  //isbn: yup.string().required('ISBN is required')
});

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  var params = useParams();
  const book = useAppSelector((state) => state.bookReducer.book);
  const auth = useAppSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(
        fetchBook(params.id))
        .then(() => {
          setLoading(false);  
        })
        .catch(() => setLoading(false));
        
    }, [dispatch] );

     useEffect(() => {
         if(book != null){
            state.title = book?.title;
            state.isbn = book?.isbn;
            state.author = book?.author;
            state.description = book?.description;
            state.category = book?.category;
            state.image = book?.image;
            state.email = auth.userInfo?.email
          }     
        }
    , [book]);        

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  function handleChange(evt: { target: { value: any; name: any; }; }) {
    const value = evt.target.value; 
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const [state, setState] = useState({ 
    title: book?.title,
    isbn: book?.isbn,
    author: book?.author,
    description: book?.description,
    category: book?.category,
    image:book?.image,
    email: auth.userInfo?.email
  });

 const {    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookInputs>({
    resolver: yupResolver(bookSchema),
  });

  const onSubmit = async () => {
      try {              
        const res = await dispatch(updateBook(state)).unwrap();          
        if (res.status === undefined) {  
           navigate(`/content/book-list`);
        }         
        if (res.status === 401) {  
          console.log(res.message);
          setError(res.message);      
        }
      } catch (e) {
        console.log(e);
      }
    };

  return (    
    <BookContainer>     
      <BookInfoContainer>       
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
               
                <Box>
                  <Typography variant="h6">Edit Book</Typography>
                </Box>  
                  <span style={{ padding: '20px', color: 'red' }}>
                  {" "}
                  {error} {success}
                </span>          
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  
                    <TextField
                      variant="outlined"
                      //label="ISBN"
                      autoComplete="isbn"
                      //{...register('isbn', { required: 'Required' })}
                      {...register('isbn')}
                      error={!!errors.isbn}
                      helperText={errors.isbn ? errors.isbn.message : null}
                      sx={{ mb: 2 }}
                      type="isbn"
                      value={params.id}
                      //onChange={handleChange}   
                      disabled={isDisabled}                
                    />
                    <TextField
                      variant="outlined"
                      //label="Title"
                      autoComplete="title"
                      //{...register('title', { required: 'Required' })}
                      {...register('title')}
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                      value={state.title}
                      onChange={handleChange}   
                    />
                    <TextField
                      variant="outlined"
                      //label="author"
                      //autoComplete="author"
                      {...register('author')}
                      error={!!errors.author}
                      helperText={errors.author ? errors.author.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                      value={state.author}
                      onChange={handleChange}   
                    />
                    <TextField
                      rows={5}
                      multiline
                      variant="outlined"
                      //label="description"
                      autoComplete="description"
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                      value={state.description}
                      onChange={handleChange}   
                    />
                    <TextField
                      variant="outlined"
                      //label="author"
                      //autoComplete="author"
                      {...register('category')}
                      error={!!errors.category}
                      helperText={errors.category ? errors.category.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                      value={state.category}
                      onChange={handleChange}   
                    />
                    <TextField
                      rows={2}
                      multiline
                      variant="outlined"
                      //label="description"
                      autoComplete="image"
                      {...register('image')}
                      error={!!errors.image}
                      helperText={errors.image ? errors.image.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                      value={state.image}
                      onChange={handleChange}   
                    />

                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >             
                  </Box>
                </form>             
        </Box>     
      </BookInfoContainer>    
    </BookContainer>
  );
};

export default Profile;
