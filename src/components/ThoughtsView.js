import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

import { Link } from "react-router-dom";
import "../index.css";

const ThoughtsView = ({ token, thoughts, setThoughts }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [newThought, setNewThought] = useState(""); // New thought name

  // Fetch thoughts when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/thoughts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched thoughts:", data);
        setThoughts(data);
      })
      .catch((error) => {
        console.error("Error fetching thoughts:", error);
      });
  }, [token]);

  // Handle form submission to add a new thought
  const handleSubmit = (e) => {
    e.preventDefault();

    const thoughtData = {
      thoughtName: newThought,
    };

    fetch(`${API_URL}/thoughts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thoughtData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New thought added:", data);
        setThoughts([...thoughts, data]); // Add the new thought to the list
        setNewThought(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error adding new thought:", error);
      });
  };

  return (
    <Grid
      container
      // spacing={3}
      width="100%"
      sx={{
        padding: 3,
        margin: "0 auto", // Centers the box horizontally
        textAlign: "center",

        alignItems: "flex-start",
        justifyContent: "space-around",
      }}
    >
      {/* Title */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h3" gutterBottom>
          Your Thoughts
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Add a new thought using the form below. Once added, click on a thought
          to update its details or delete it.
        </Typography>

        {/* Form to add a new thought */}
        <Card
          sx={{
            mt: 3,
            mb: 3,
            padding: 5,
            // backgroundColor: '#C8E6C9',
            backgroundColor: "#F2FCFC",
            boxShadow: "none",
            border: "1px solid #C8E6C9",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add a New Thought
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <TextField
              fullWidth
              label="New Thought Name"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              required
              sx={{ mb: 2 }}
              multiline
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                // mt: 3,
                mb: 2,
                // backgroundColor: '#2c4e51',
                backgroundColor: "#194d5c",
                // '&:hover': { backgroundColor: '#2c3e50' },
                "&:hover": { backgroundColor: "salmon" },
              }}
              fullWidth
            >
              Add
            </Button>
          </Box>
        </Card>
      </Grid>

      {/* List of thoughts */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" gutterBottom>
          Your Thoughts List
        </Typography>
        {thoughts.length > 0 ? (
          <List>
            {thoughts.map((thought) => (
              <Card
                key={thought._id}
                sx={{
                  mb: 2,
                  padding: 2,
                  boxShadow: "none",
                  border: "1px solid #C8E6C9",
                  borderRadius: "50%",
                  wordBreak: "break-word",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {thought.thoughtName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Click to view and manage details
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/thoughts/${thought._id}`}
                    variant="outlined"
                    color="primary"
                    sx={{
                      mb: 2,
                      borderColor: "#2c4e51",
                      color: "#2c4e51",
                      "&:hover": {
                        borderColor: "#2c3e50",
                        backgroundColor: "rgba(44, 62, 80, 0.1)",
                      },
                    }}
                  >
                    Manage Thought
                  </Button>
                </CardActions>
              </Card>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            You have no thoughts yet. Start by adding a new thought.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ThoughtsView;
