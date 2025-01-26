import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const SignupView = ({ setUser }) => {
  const [formData, setFormData] = useState({
    userName: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch(
        "https://thought-tracker-journal-4688a4169626.herokuapp.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message}`);
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userName"
                  name="userName"
                  label="Username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Email"
                  name="Email"
                  label="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Password"
                  name="Password"
                  label="Password"
                  type="password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#2c4e51",
                "&:hover": { backgroundColor: "#2c3e50" },
              }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/")}
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
              Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupView;
