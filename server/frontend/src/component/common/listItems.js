import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton sx={{ color:"#ffffff"}}>
      <ListItemIcon sx={{ color:"#ffffff"}}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton sx={{ color:"#ffffff"}}>
      <ListItemIcon sx={{ color:"#ffffff"}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton sx={{ color:"#ffffff"}}>
      <ListItemIcon sx={{ color:"#ffffff"}}>
        <LightbulbIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton sx={{ color:"#ffffff"}}>
      <ListItemIcon sx={{ color:"#ffffff"}}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
    <ListItemButton sx={{ color:"#ffffff"}}>
      <ListItemIcon sx={{ color:"#ffffff"}}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);