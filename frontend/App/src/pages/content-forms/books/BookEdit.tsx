import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
//import { IProfileInputs, logout, updateProfile } from '../../../redux/reducers/authSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookContainer, BookInfoContainer } from './BookEdit.styles';
import { fetchBook, IBookInputs, updateBook } from '../../../redux/reducers/bookSlice';


/*const loginSchema = yup.object({
  isbn: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});*/

const bookSchema = yup.object({
  title: yup.string().required('Title is required'),
});

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  var params = useParams();
  const booksReducer = useAppSelector((state) => state.bookReducer);

  console.log(params.id); 

  //const authInfo = useAppSelector((state) => state.auth);

    useEffect(() => {
      dispatch(
        fetchBook(params.id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }, [dispatch]);

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
    title: booksReducer.bookInfo?.title,
    isbn: booksReducer.bookInfo?.isbn
  });

 const {    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookInputs>({
    resolver: yupResolver(bookSchema),
  });


  const onSubmit = async (data: IBookInputs) => {
      try {      
        const res = await dispatch(updateBook(data)).unwrap();  
        if (res.status === "Success") {          
          console.log(res.message);
          setSuccess(res.message);
        }         
        if (res.status === "Error") {  
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
                  <Typography variant="h5">Edit Book</Typography>
                </Box>  
                <span>
                  {" "}
                  {error} {success}
                </span>          
                <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                variant="outlined"
                label="Title"
                autoComplete="title"
                {...register('title', { required: 'Required' })}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : null}
                sx={{ mb: 2 }}
                type="name"
                value={state.title}
                onChange={handleChange}   
              />
              <TextField
                variant="outlined"
                label="ISBN"
                autoComplete="isbn"
                {...register('isbn', { required: 'Required' })}
                error={!!errors.isbn}
                helperText={errors.isbn ? errors.isbn.message : null}
                sx={{ mb: 2 }}
                type="isbn"
                value={params.id}
                //onChange={handleChange}   
                disabled={isDisabled}
                
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
