import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = ({ userId, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: '#2c4e51' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link
            to='/thoughts'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Thought Tracker
          </Link>
        </Typography>
        <Box>
          <Button color='inherit' component={Link} to={`/user/${userId}`}>
            Profile
          </Button>
          <Button color='inherit' component={Link} to='/thoughts'>
            Thoughts
          </Button>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
