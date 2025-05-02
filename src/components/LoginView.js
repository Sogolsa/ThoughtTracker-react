import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const LoginView = ({ onLoggedIn }) => {
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
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
    console.log("Login form submitted:", formData);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          navigate("/thoughts");
          enqueueSnackbar("Login successful", { variant: "success" });
        } else {
          enqueueSnackbar("No such user", { variant: "error" });
        }
      } else {
        // Handle non-OK response
        const errorData = await response.json();
        enqueueSnackbar(
          `Login failed: ${errorData.message || "Unknown error"}`,
          { variant: "error" }
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("An error occurred during login. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Log In
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
                  id="Email"
                  name="Email"
                  label="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  variant="filled"
                  color="secondary"
                  margin="dense"
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
                  variant="filled"
                  color="secondary"
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#2c4e51",
                "&:hover": { backgroundColor: "#2c3e50" },
              }}
            >
              Log In
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

export default LoginView;
