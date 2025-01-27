import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import NavigationBar from "./NavigationBar";
import SignupView from "./SignupView";
import WelcomePage from "./WelcomePage";
import LoginView from "./LoginView";
import ThoughtsView from "./ThoughtsView";
import ThoughtDetails from "./ThoughtDetails";
import ProfileView from "./ProfileView";

const Home = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [thoughts, setThoughts] = useState([]);

  // Define the onLogout function
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Box>
      {user && <NavigationBar onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<WelcomePage />} />
        <Route
          path="/thoughts"
          element={
            token ? (
              <ThoughtsView
                token={token}
                thoughts={thoughts}
                setThoughts={setThoughts}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<SignupView />} />
        <Route
          path="/thoughts/:thoughtId"
          element={
            token ? <ThoughtDetails token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/users/me"
          element={
            token ? (
              <ProfileView token={token} user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
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
