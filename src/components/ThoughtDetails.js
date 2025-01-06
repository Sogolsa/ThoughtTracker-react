import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ThoughtDetails = () => {
  const { thoughtId } = useParams();
  const navigate = useNavigate();
  const [thought, setThought] = useState(null);
  const [formData, setFormData] = useState({
    Description: '',
    Emotions: [],
    Problems: [],
    possibleSolutions: [],
    Affirmation: '',
  });
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    // Fetch thought details
    const fetchThought = async () => {
      try {
        const response = await fetch(
          `https://thought-tracker-journal-4688a4169626.herokuapp.com/thoughts/${thoughtId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setThought(data);
          setFormData({
            Description: data.Description || '',
            Emotions: data.Emotions || [],
            Problems: data.Problems || [],
            possibleSolutions: data.possibleSolutions || [],
            Affirmation: data.Affirmation || '',
          });
        } else {
          console.error('Failed to fetch thought:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching thought:', error);
      }
    };

    fetchThought();
  }, [thoughtId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://thought-tracker-journal-4688a4169626.herokuapp.com/thoughts/${thoughtId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedThought = await response.json();
        setThought(updatedThought);
        alert('Thought updated successfully');
      } else {
        alert('Failed to update thought');
      }
    } catch (error) {
      console.error('Error updating thought:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://thought-tracker-journal-4688a4169626.herokuapp.com/thoughts/${thoughtId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert('Thought deleted successfully');
        navigate('/thoughts');
      } else {
        alert('Failed to delete thought');
      }
    } catch (error) {
      console.error('Error deleting thought:', error);
    }
  };

  if (!thought) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Thought Details
      </Typography>

      {/* Display the thought name and created date */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h6'>
          Thought Name: {thought.thoughtName}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Created on: {new Date(thought.created_date).toLocaleString()}
        </Typography>
      </Box>

      {/* Form for updating thought details */}
      <Box component='form' onSubmit={handleUpdate}>
        <TextField
          fullWidth
          label='Description'
          name='Description'
          value={formData.Description}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Emotions'
          name='Emotions'
          value={formData.Emotions}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Problems'
          name='Problems'
          value={formData.Problems}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Possible Solutions'
          name='possibleSolutions'
          value={formData.possibleSolutions}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Affirmation'
          name='Affirmation'
          value={formData.Affirmation}
          onChange={handleChange}
          margin='normal'
        />

        {/* Buttons for updating and deleting */}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Update Thought
        </Button>
        <Button
          variant='outlined'
          color='error'
          sx={{ mt: 2, ml: 2 }}
          onClick={handleDelete}
        >
          Delete Thought
        </Button>
      </Box>
    </Container>
  );
};

export default ThoughtDetails;
