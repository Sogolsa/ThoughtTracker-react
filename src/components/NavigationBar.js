import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = ({ userId, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Profile', link: `/user/${userId}` },
    { text: 'Thoughts', link: '/thoughts' },
    { text: 'Logout', action: handleLogout },
  ];

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
        {/* Hamburger menu for mobile */}
        <IconButton
          color='inherit'
          edge='start'
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color='inherit' component={Link} to={'/users/me'}>
            Profile
          </Button>
          <Button color='inherit' component={Link} to='/thoughts'>
            Thoughts
          </Button>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        {/* Drawer (sliding menu for mobile) */}
        <Drawer anchor='top' open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  component={item.link ? Link : 'div'}
                  to={item.link ? item.link : undefined}
                  onClick={item.action ? item.action : undefined}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
