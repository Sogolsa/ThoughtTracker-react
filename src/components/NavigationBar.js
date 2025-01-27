import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavigationBar = ({ userId, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Profile", link: `/users/me` },
    { text: "Thoughts", link: "/thoughts" },
    { text: "Logout", action: handleLogout },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#194d5c" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/thoughts"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "white" }}>Thought</span>{" "}
            <span style={{ color: "salmon" }}>Tracker</span>{" "}
          </Link>
        </Typography>
        {/* Hamburger menu for mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button
            color="inherit"
            component={Link}
            to="/thoughts"
            sx={{
              // color: 'black',
              fontWeight: isActive("/thoughts") ? "bold" : "normal",
              borderBottom: isActive("/thoughts") ? "2px solid salmon" : "none",
            }}
          >
            Thoughts
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={"/users/me"}
            sx={{
              // color: 'black',
              fontWeight: isActive("/users/me") ? "bold" : "normal",
              borderBottom: isActive("/users/me") ? "2px solid salmon" : "none",
            }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            // sx={{ color: 'black' }}
          >
            Logout
          </Button>
        </Box>
        {/* Drawer (sliding menu for mobile) */}
        <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  component={item.link ? Link : "div"}
                  to={item.link ? item.link : undefined}
                  onClick={item.action ? item.action : undefined}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
