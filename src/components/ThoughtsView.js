import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.css';

const ThoughtsView = ({ token, thoughts, setThoughts }) => {
  const [newThought, setNewThought] = useState(''); // New thought name

  // Fetch thoughts when the component mounts
  useEffect(() => {
    fetch(
      'https://thought-tracker-journal-4688a4169626.herokuapp.com/thoughts',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched thoughts:', data);
        setThoughts(data);
      })
      .catch((error) => {
        console.error('Error fetching thoughts:', error);
      });
  }, [token]);

  // Handle form submission to add a new thought
  const handleSubmit = (e) => {
    e.preventDefault();

    const thoughtData = {
      thoughtName: newThought,
    };

    fetch(
      'https://thought-tracker-journal-4688a4169626.herokuapp.com/thoughts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(thoughtData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('New thought added:', data);
        setThoughts([...thoughts, data]); // Add the new thought to the list
        setNewThought(''); // Clear the input field
      })
      .catch((error) => {
        console.error('Error adding new thought:', error);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Title */}
      <Typography variant='h4' gutterBottom>
        Your Thoughts
      </Typography>
      <Typography variant='body1' color='textSecondary' sx={{ mb: 2 }}>
        Add a new thought using the form below. Once added, click on a thought
        to update its details or delete it.
      </Typography>

      {/* Form to add a new thought */}
      <Card
        sx={{
          mb: 3,
          padding: 2,
          backgroundColor: 'white',
          boxShadow: 'none',
          border: '1px solid #C8E6C9',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Add a New Thought
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='New Thought Name'
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{
              // mt: 3,
              mb: 2,
              backgroundColor: '#2c4e51',
              '&:hover': { backgroundColor: '#2c3e50' },
            }}
            fullWidth
          >
            Add
          </Button>
        </Box>
      </Card>

      {/* List of thoughts */}
      <Typography variant='h6' gutterBottom>
        Your Thoughts List
      </Typography>
      {thoughts.length > 0 ? (
        <List>
          {thoughts.map((thought) => (
            <Card
              key={thought._id}
              sx={{
                mb: 2,
                // backgroundColor: '#E8F5E9',
                backgroundColor: 'white',
                padding: 2,
                boxShadow: 'none',
                border: '1px solid #C8E6C9',
              }}
            >
              <CardContent>
                <Typography variant='h6'>{thought.thoughtName}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  Click to view and manage details
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  component={Link}
                  to={`/thoughts/${thought._id}`}
                  variant='outlined'
                  color='primary'
                  sx={{
                    mb: 2,
                    borderColor: '#2c4e51',
                    color: '#2c4e51',
                    '&:hover': {
                      borderColor: '#2c3e50',
                      backgroundColor: 'rgba(44, 62, 80, 0.1)',
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
        <Typography variant='body1' color='textSecondary'>
          You have no thoughts yet. Start by adding a new thought above.
        </Typography>
      )}
    </Box>
  );
};

export default ThoughtsView;
