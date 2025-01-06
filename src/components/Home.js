import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import NavigationBar from './NavigationBar';
import SignupView from './SignupView';
import WelcomePage from './WelcomePage';
import LoginView from './LoginView';
import ThoughtsView from './ThoughtsView';
import ThoughtDetails from './ThoughtDetails';

const Home = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [thoughts, setThoughts] = useState([]);

  // Define the onLogout function
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Box>
      {user && <NavigationBar onLogout={onLogout} />}
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<WelcomePage />} />
        <Route
          path='/thoughts'
          element={
            <ThoughtsView
              token={token}
              thoughts={thoughts}
              setThoughts={setThoughts}
            />
          }
        />
        <Route path='/signup' element={<SignupView setUser={setUser} />} />
        <Route path='/thoughts/:thoughtId' element={<ThoughtDetails />} />

        <Route
          path='/login'
          element={
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          }
        />
      </Routes>
    </Box>
  );
};

export default Home;
