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

const GratitudeView = ({ token, gratitudeList, setGratitudeList }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [newGratitude, setNewGratitude] = useState(""); // New thought name

  // Fetch thoughts when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/gratitude`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched messages:", data);
        setGratitudeList(data);
      })
      .catch((error) => {
        console.error("Error fetching thoughts:", error);
      });
  }, [token]);

  // Handle form submission to add a new thought
  const handleSubmit = (e) => {
    e.preventDefault();

    const gratitudeData = {
      message: newGratitude,
    };

    fetch(`${API_URL}/gratitude`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gratitudeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New thought added:", data);
        setGratitudeList([...gratitudeList, data]);
        setNewGratitude(""); // Clear the input field
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
          What are you grateful for?
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Add a short message to express your gratitude.
        </Typography>

        {/* Form to add a new thought */}
        <Card
          sx={{
            mt: 3,
            mb: 3,
            padding: 5,
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
            Add
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <TextField
              fullWidth
              label="New Message"
              value={newGratitude}
              onChange={(e) => setNewGratitude(e.target.value)}
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
      <Grid item xs={12} sm={6} md={4} sx={{ paddingTop: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
          List of Gratitude Messages
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Click to view and manage details
        </Typography>
        {gratitudeList.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={1}>
            {gratitudeList.map((gratitude) => (
              <Card
                key={gratitude._id}
                sx={{
                  mb: 0,
                  padding: 0,
                  boxShadow: "inherit",
                  border: "1px solid #C8E6C9",
                  wordBreak: "break-word",
                }}
              >
                <CardContent sx={{ paddingBottom: 0 }}></CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/gratitude/${gratitude._id}`}
                    // variant="outlined"
                    // color="black"
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
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        color: "black",
                      }}
                    >
                      {gratitude.message}
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Your gratitude list is empty.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default GratitudeView;
