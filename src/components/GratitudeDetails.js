import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
const GratitudeDetails = ({ token }) => {
  const { enqueueSnackbar } = useSnackbar();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const { gratitudeId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    details: "",
  });

  useEffect(() => {
    // Fetch thought details
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/gratitude/${gratitudeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data);
          setFormData({
            Message: data.message || "",
            Details: data.detials || [],
          });
          if (data.message) {
            setShowDetails(true);
          }
        } else {
          console.error("Failed to fetch the message:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching the messaage:", error);
      }
    };

    fetchMessage();
  }, [gratitudeId, token]);

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
      const response = await fetch(`${API_URL}/gratitude/${gratitudeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessage(updatedMessage);
        setShowDetails(true);
        enqueueSnackbar("Message updated successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to update message", { variant: "error" });
      }
    } catch (error) {
      console.error("Error updating message:", error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/gratitude/${gratitudeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        enqueueSnackbar("Message deleted successfully", { variant: "success" });
        navigate("/gratitude");
      } else {
        enqueueSnackbar("Failed to delete message", { variant: "error" });
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  if (!message) return <Typography>Loading...</Typography>;

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
            Gratitude Details
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
                Gratitude Name: {message.message}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Date(message.created_date).toLocaleString()}
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleUpdate}>
              <TextField
                fullWidth
                label="Edit Gratitude Message"
                name="message"
                value={formData.message}
                multiline
                onChange={handleChange}
                margin="dense"
                variant="filled"
              />
              <TextField
                fullWidth
                label="Details"
                name="details"
                value={formData.details}
                multiline
                onChange={handleChange}
                margin="dense"
                variant="filled"
              />

              <Button
                fullWidth
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

              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
                onClick={handleDelete}
              >
                Delete Gratitude Message
              </Button>
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
                mb: 4,
              }}
            >
              <Typography variant="h6">
                <strong>Gratitude Message:</strong> {message.message}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Date(message.created_date).toLocaleString()}
              </Typography>
              <Box sx={{ textAlign: "left" }}>
                {message.details && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Detials:</strong> {message.details}
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

export default GratitudeDetails;
