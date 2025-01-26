import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const ProfileView = ({ user, setUser, token }) => {
  const [formData, setFormData] = useState({
    userName: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://thought-tracker-journal-4688a4169626.herokuapp.com/users/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            userName: data.userName || "",
            Email: data.Email || "",
            Password: "",
          });
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [token]);

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
        "https://thought-tracker-journal-4688a4169626.herokuapp.com/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert("Profile updated successfully");
      } else if (response.status === 422) {
        const errorData = await response.json();
        // Extract and display error messages
        const errorMessages = errorData.errors
          .map((err) => `${err.path}: ${err.msg}`)
          .join("\n");
        alert(`Validation failed:\n${errorMessages}`);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      const response = await fetch(
        "https://thought-tracker-journal-4688a4169626.herokuapp.com/users/me",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Account deleted successfully");
        localStorage.clear();
        navigate("/signup");
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
        Profile
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box component="form" onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            margin="normal"
            type="password"
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
                Update Profile
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleDelete}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileView;
