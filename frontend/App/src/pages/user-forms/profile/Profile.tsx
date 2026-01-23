import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { IProfileInputs, logout, updateProfile } from '../../../redux/reducers/authSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageContainer, UserInfoContainer } from './Profile.styles';


const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .required('Password is required'),
});

const Profile = () => {
  const authInfo = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  
  function handleChange(evt: { target: { value: any; name: any; }; }) {
    const value = evt.target.value; 
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const [state, setState] = useState({
    password: authInfo.userInfo?.password,
    name: authInfo.userInfo?.name,
    email: authInfo.userInfo?.email
  });

 const {    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileInputs>({
    resolver: yupResolver(loginSchema),
  });

   useEffect(() => {
      //if (!authInfo.loggedIn && !authInfo.error) {
      if (!authInfo.loggedIn && !authInfo.error) {
        navigate('/login');
      }
    }, [
      authInfo.loggedIn,
      authInfo.error,
      authInfo.userInfo,
      dispatch,
      navigate,
    ]);

  const onSubmit = async (data: IProfileInputs) => {
      try {      
        const res = await dispatch(updateProfile(data)).unwrap();  
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
    <PageContainer>
      {!authInfo.loggedIn ? (
        <p>You are not logged in!</p>
      ) : (
      <UserInfoContainer>
       
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <p>Welcome, you are logged in {authInfo.userInfo?.name}!</p>
                <Box>
                  <Typography variant="h5">User Information</Typography>
                </Box>  
                <span>
                  {" "}
                  {error} {success}
                </span>          
                <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                variant="outlined"
                label="Name"
                autoComplete="name"
                {...register('name', { required: 'Required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : null}
                sx={{ mb: 2 }}
                type="name"
                value={state.name}
                onChange={handleChange}   
              />
              <TextField
                variant="outlined"
                label="Email Address"
                autoComplete="email"
                {...register('email', { required: 'Required' })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
                sx={{ mb: 2 }}
                type="email"
                value={state.email}
                //onChange={handleChange}   
                disabled={isDisabled}
                
              />
              <TextField
                variant="outlined"
                label="Password"
                {...register('password', { required: 'Required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
                sx={{ mb: 2 }}
                type="password"
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
              <Typography variant="h6">Don't have an account yet?</Typography>
              <Button variant="text" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Box>
          </form>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleLogout}
                >
                  log out
                </Button>
              </Box>
            </Box>
         
        
      </UserInfoContainer>
      )}
    </PageContainer>
  );
};

export default Profile;
