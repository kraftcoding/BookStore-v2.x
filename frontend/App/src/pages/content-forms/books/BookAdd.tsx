import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookContainer, BookInfoContainer } from './BookEdit.styles';
import { IBookInputs, addBook } from '../../../redux/reducers/bookSlice';
import { useState } from 'react';
import { Padding } from '@mui/icons-material';

const bookSchema = yup.object({
  title: yup.string().required('Title is required'),
  isbn: yup.string().required('ISBN is required')
});

const BookAdd: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const authInfo = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookInputs>({
    resolver: yupResolver(bookSchema),
  }); 

    const onSubmit = async (data: IBookInputs) => {
        try {              
          const res = await dispatch(addBook(data)).unwrap();          
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
                }}>
               
                <Box>
                  <Typography variant="h5">Add Book</Typography>
                </Box>          
                 <span style={{ padding: '20px', color: 'red' }}>
                  {" "}
                  {error} {success}
                </span>                
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                    <div style={{ display: 'none' }}>                      
                      <TextField
                        variant="outlined"
                        label="email"
                        autoComplete="email"
                        {...register('email')}
                        sx={{ mb: 2 }}
                        type="email"   
                        value={authInfo.userInfo?.email}   
                        disabled                                                
                      />     
                    </div>     
                    <TextField
                      variant="outlined"
                      label="ISBN"
                      autoComplete="isbn"
                      {...register('isbn', { required: 'Required' })}                     
                      error={!!errors.isbn}
                      helperText={errors.isbn ? errors.isbn.message : null}
                      sx={{ mb: 2 }}
                      type="isbn"           
                    />
                    <TextField
                      variant="outlined"
                      label="Title"
                      autoComplete="title"
                      {...register('title', { required: 'Required' })}
                      {...register('title')}
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                    />
                    <TextField
                      variant="outlined"
                      label="author"
                      autoComplete="author"
                      {...register('author')}
                      error={!!errors.author}
                      helperText={errors.author ? errors.author.message : null}
                      sx={{ mb: 2 }}
                      type="name" 
                    />
                    <TextField
                      rows={5}
                      multiline
                      variant="outlined"
                      label="description"
                      autoComplete="description"
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                    />
                    <TextField
                      variant="outlined"
                      label="category"
                      autoComplete="category"
                      {...register('category')}
                      error={!!errors.category}
                      helperText={errors.category ? errors.category.message : null}
                      sx={{ mb: 2 }}
                      type="name"
                    />
                    <TextField
                      rows={2}
                      multiline
                      variant="outlined"
                      label="image"
                      autoComplete="image"
                      {...register('image')}
                      error={!!errors.image}
                      helperText={errors.image ? errors.image.message : null}
                      sx={{ mb: 2 }}
                      type="name"  
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

export default BookAdd;
