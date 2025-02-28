import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
const ThoughtDetails = ({ token }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const { thoughtId } = useParams();
  const navigate = useNavigate();
  const [thought, setThought] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    Description: "",
    Emotions: [],
    Problems: [],
    possibleSolutions: [],
    Affirmation: "",
  });

  useEffect(() => {
    // Fetch thought details
    const fetchThought = async () => {
      try {
        const response = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setThought(data);
          setFormData({
            Description: data.Description || "",
            Emotions: data.Emotions || [],
            Problems: data.Problems || [],
            possibleSolutions: data.possibleSolutions || [],
            Affirmation: data.Affirmation || "",
          });
          if (data.thoughtName) {
            setShowDetails(true);
          }
        } else {
          console.error("Failed to fetch thought:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching thought:", error);
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
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedThought = await response.json();
        setThought(updatedThought);
        setShowDetails(true);

        alert("Thought updated successfully");
        // navigate("/thoughts");
      } else {
        alert("Failed to update thought");
      }
    } catch (error) {
      console.error("Error updating thought:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Thought deleted successfully");
        navigate("/thoughts");
      } else {
        alert("Failed to delete thought");
      }
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  if (!thought) return <Typography>Loading...</Typography>;

  //   return (
  //     <Container maxWidth="md" sx={{ textAlign: "center" }}>
  //       <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
  //         Thought Details
  //       </Typography>

  //       {/* Display the thought name and created date */}
  //       <Box
  //         sx={{
  //           backgroundColor: "#fff",
  //           padding: 4,
  //           borderRadius: 2,
  //           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  //         }}
  //       >
  //         <Box sx={{ mb: 3 }}>
  //           <Typography variant="h6">
  //             Thought Name: {thought.thoughtName}
  //           </Typography>
  //           <Typography variant="body2" color="textSecondary">
  //             Created on: {new Date(thought.created_date).toLocaleString()}
  //           </Typography>
  //         </Box>

  //         {/* Form for updating thought details */}
  //         <Box component="form" onSubmit={handleUpdate}>
  //           <TextField
  //             fullWidth
  //             label="Edit Thought Name"
  //             name="thoughtName"
  //             value={formData.thoughtName}
  //             multiline
  //             onChange={handleChange}
  //             margin="normal"
  //           />
  //           <TextField
  //             fullWidth
  //             label="Description"
  //             name="Description"
  //             value={formData.Description}
  //             multiline
  //             // minRows={10}
  //             onChange={handleChange}
  //             margin="normal"
  //           />
  //           <TextField
  //             fullWidth
  //             label="Emotions"
  //             name="Emotions"
  //             value={formData.Emotions}
  //             onChange={handleChange}
  //             margin="normal"
  //             multiline
  //           />
  //           <TextField
  //             fullWidth
  //             label="Problems"
  //             name="Problems"
  //             value={formData.Problems}
  //             onChange={handleChange}
  //             margin="normal"
  //             multiline
  //           />
  //           <TextField
  //             fullWidth
  //             label="Possible Solutions"
  //             name="possibleSolutions"
  //             value={formData.possibleSolutions}
  //             onChange={handleChange}
  //             margin="normal"
  //             multiline
  //           />
  //           <TextField
  //             fullWidth
  //             label="Affirmation"
  //             name="Affirmation"
  //             value={formData.Affirmation}
  //             onChange={handleChange}
  //             margin="normal"
  //             multiline
  //           />

  //           {/* Buttons for updating and deleting */}
  //           <Grid
  //             container
  //             spacing={1}
  //             sx={{ mt: 2, justifyContent: "flex-end" }}
  //           >
  //             <Grid item>
  //               <Button
  //                 type="submit"
  //                 variant="contained"
  //                 color="primary"
  //                 sx={{
  //                   mt: 2,
  //                   backgroundColor: "#2c4e51",
  //                   "&:hover": { backgroundColor: "#2c3e50" },
  //                 }}
  //               >
  //                 Update Thought
  //               </Button>
  //             </Grid>
  //             <Grid item>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 sx={{ mt: 2 }}
  //                 onClick={handleDelete}
  //               >
  //                 Delete Thought
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //     </Container>
  //   );

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={4}
        textAlign="center"
        alignItems="flex-start"
        justifyContent={showDetails ? "flex-start" : "center"}
      >
        <Grid item xs={12} md={showDetails ? 6 : 12}>
          <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
            Thought Details
          </Typography>
          {/* Display the thought name and created date */}
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">
                Thought Name: {thought.thoughtName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Date(thought.created_date).toLocaleString()}
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleUpdate}>
              <TextField
                fullWidth
                label="Edit Thought Name"
                name="thoughtName"
                value={formData.thoughtName}
                multiline
                onChange={handleChange}
                margin="dense"
                variant="filled"
              />
              <TextField
                fullWidth
                label="Description"
                name="Description"
                value={formData.Description}
                multiline
                onChange={handleChange}
                margin="dense"
                variant="filled"
              />
              <TextField
                fullWidth
                label="Emotions"
                name="Emotions"
                value={formData.Emotions}
                onChange={handleChange}
                margin="dense"
                multiline
                variant="filled"
              />
              <TextField
                fullWidth
                label="Problems"
                name="Problems"
                value={formData.Problems}
                onChange={handleChange}
                margin="dense"
                multiline
                variant="filled"
              />
              <TextField
                fullWidth
                label="Possible Solutions"
                name="possibleSolutions"
                value={formData.possibleSolutions}
                onChange={handleChange}
                margin="dense"
                multiline
                variant="filled"
              />
              <TextField
                fullWidth
                label="Affirmation"
                name="Affirmation"
                value={formData.Affirmation}
                onChange={handleChange}
                margin="dense"
                multiline
                variant="filled"
              />
              <Grid
                container
                spacing={1}
                sx={{ mt: 2, justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      backgroundColor: "#2c4e51",
                      "&:hover": { backgroundColor: "#2c3e50" },
                    }}
                  >
                    Add Details
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={handleDelete}
                  >
                    Delete Thought
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {showDetails && (
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
              Added Details
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                padding: 4,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">
                <strong>Thought Name:</strong> {thought.thoughtName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Date(thought.created_date).toLocaleString()}
              </Typography>
              <Box sx={{ textAlign: "left" }}>
                {thought.Description && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Description:</strong> {thought.Description}
                  </Typography>
                )}
                {thought.Emotions.length > 0 && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Emotions:</strong> {thought.Emotions.join(", ")}
                  </Typography>
                )}
                {thought.Problems.length > 0 && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Problems:</strong> {thought.Problems.join(", ")}
                  </Typography>
                )}
                {thought.possibleSolutions.length > 0 && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Possible Solutions:</strong>{" "}
                    {thought.possibleSolutions.join(", ")}
                  </Typography>
                )}
                {thought.Affirmation && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Affirmation:</strong> {thought.Affirmation}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ThoughtDetails;
