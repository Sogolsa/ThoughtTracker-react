import React, { useState, useEffect } from "react";
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

const ProfileView = ({ user, setUser, token }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    userName: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered with token:", token);
    if (!token) {
      console.warn("No token found, redirecting to login.");
      navigate("/login");
      return;
    }

    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data:", data);

          if (
            data.userName !== formData.userName ||
            data.Email !== formData.Email
          ) {
            setUser(data);
            setFormData({
              userName: data.userName || "",
              Email: data.Email || "",
              Password: "",
            });
          }
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
      const response = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        enqueueSnackbar("Profile updated successfully", {
          variant: "success",
        });
      } else if (response.status === 422) {
        const errorData = await response.json();
        // Extract and display error messages
        const errorMessages = errorData.errors
          .map((err) => `${err.path}: ${err.msg}`)
          .join("\n");
        // alert(`Validation failed:\n${errorMessages}`);
        enqueueSnackbar(`Validation failed:\n${errorMessages}`, {
          variant: "error",
        });
      } else {
        // alert("Failed to update profile");
        enqueueSnackbar("Failed to update profile", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete your account?")) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`${API_URL}/users/me`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       enqueueSnackbar("Account deleted successfully", { variant: "success" });
  //       localStorage.clear();
  //       navigate("/signup");
  //     } else {
  //       enqueueSnackbar("Failed to delete account", { variant: "error" });
  //     }
  //   } catch (error) {
  //     console.error("Error deleting account:", error);
  //   }
  // };

  const handleDelete = () => {
    const confirmDelete = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          enqueueSnackbar("Account deleted successfully", {
            variant: "success",
          });
          localStorage.clear();
          navigate("/signup");
        } else {
          enqueueSnackbar("Failed to delete account", { variant: "error" });
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    };

    const key = enqueueSnackbar(
      "Are you sure you want to delete your account?",
      {
        variant: "default",
        style: { backgroundColor: "white", color: "black" },
        persist: true,
        action: () => (
          <>
            <Button
              color="error"
              size="small"
              onClick={() => {
                confirmDelete();
                closeSnackbar(key);
              }}
            >
              Delete
            </Button>
            <Button size="small" onClick={() => closeSnackbar(key)}>
              Cancel
            </Button>
          </>
        ),
      }
    );
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
            margin="dense"
            variant="filled"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="Email"
            value={formData.Email || ""}
            onChange={handleChange}
            margin="dense"
            variant="filled"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="Password"
            value={formData.Password || ""}
            onChange={handleChange}
            margin="dense"
            variant="filled"
            type="password"
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
            Update Profile
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mt: 1 }}
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileView;
