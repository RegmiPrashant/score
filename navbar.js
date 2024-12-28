import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider, Switch, Box, Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false); // State to open/close the drawer
  const [theme, setTheme] = useState(false); // Dark/Light theme state
  const [anchorEl, setAnchorEl] = useState(null); // State for user menu
  const open = Boolean(anchorEl); // User menu open state

  // Handle Drawer toggle
  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  // Handle Theme Change (Light/Dark)
  const handleThemeChange = () => {
    setTheme(!theme);
  };

  // Handle User Menu Open and Close
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: theme ? '#333' : '#1976d2' }}>
        <Toolbar variant="dense">
          {/* Menu Icon - Drawer Toggle */}
          <Tooltip title="Open Menu" arrow>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Title */}
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            LiveScore
          </Typography>

          {/* Search Icon */}
          <Tooltip title="Search for Matches" arrow>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* Theme Toggle Switch */}
          <Tooltip title={theme ? "Switch to Light Theme" : "Switch to Dark Theme"} arrow>
            <Switch checked={theme} onChange={handleThemeChange} color="default" />
          </Tooltip>

          {/* User Avatar */}
          <Tooltip title="Open Profile Menu" arrow>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <Avatar sx={{ width: 24, height: 24 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <Tooltip title="Go to Home" arrow>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Upcoming Matches" arrow>
              <ListItem button>
                <ListItemText primary="Upcoming Matches" />
              </ListItem>
            </Tooltip>

            <Tooltip title="View Live Scores" arrow>
              <ListItem button>
                <ListItemText primary="Live Scores" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Settings" arrow>
              <ListItem button>
                <ListItemText primary="Settings" />
              </ListItem>
            </Tooltip>
          </List>
          <Divider />
          <Tooltip title="Logout" arrow>
            <ListItem button>
              <ListItemText primary="Logout" />
            </ListItem>
          </Tooltip>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Tooltip title="View Profile" arrow>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Tooltip>
        <Tooltip title="Manage Your Account" arrow>
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
        </Tooltip>
        <Tooltip title="Logout from the Application" arrow>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Tooltip>
      </Menu>
    </>
  );
};

export default Navbar;
