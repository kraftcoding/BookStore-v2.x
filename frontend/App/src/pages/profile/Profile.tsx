import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { logout, updateProfile } from '../../redux/reducers/authSlice';
import { useState } from 'react';

import React from 'react';
import { useForm } from 'react-hook-form';
import {  } from '../../redux/reducers/authSlice';
import { IUserRegister } from '../../types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageContainer, RegisterContainer, UserInfoContainer } from './Profile.styles';

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
    } = useForm<IUserRegister>({
      resolver: yupResolver(registerSchema),
    });

  const onSubmit = handleSubmit((data) => {
    dispatch(updateProfile(data));
    navigate('/home');
  });

  return (
    <PageContainer>
      <UserInfoContainer>
        <Box
          sx={{
            width: '500px',
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            border: '1px solid gray',
          }}
        >
          {authInfo.loggedIn ? (
            <Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p>Welcome, you are logged in {authInfo.userInfo?.name}!</p>
                <Box>
                  <Typography variant="h5">User Information</Typography>
                </Box>
              </Box>
              <form onSubmit={onSubmit}>
                <Box
                  maxWidth="lg"
                  key={authInfo.userInfo?.id}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    mb: 1,
                    p: 1,
                  }}
                >
                  <TextField
                    id="outlined"
                    label="NAME"                  
                    sx={{ mb: 2 }}
                    type="text"                  
                    value={state.name}
                    name="name"
                    onChange={handleChange}                    
                  />
                  <TextField
                    id="outlined"
                    label="EMAIL"
                    sx={{ mb: 2 }}
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={handleChange}
                  />
                  <TextField
                    id="outlined"
                    label="PASSWORD"
                    sx={{ mb: 2 }}
                    type="password"
                    value={state.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <Button variant="contained">Edit</Button>
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
          ) : (
            ''
          )}
        </Box>
      </UserInfoContainer>
    </PageContainer>
  );
};

export default Profile;
