import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import BannerImage from '../images/hero-image.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
      }}
    >
      {/* Left section: Hero Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${BannerImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></Box>

      {/* Right Section: Welcome Message and Buttons */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Typography variant='h3' component='h1' gutterBottom>
          Easier Way to Journaling!
        </Typography>
        <Typography variant='h4' component='h1' gutterBottom>
          Welcome to Thought Tracker
        </Typography>
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#455D54',
              '&:hover': { backgroundColor: '#374B43' },
            }}
            onClick={handleSignupClick}
          >
            Sign Up
          </Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#455D54',
              '&:hover': { backgroundColor: '#374B43' },
            }}
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default WelcomePage;
