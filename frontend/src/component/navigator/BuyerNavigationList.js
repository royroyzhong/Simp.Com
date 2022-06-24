import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/" },
  { id: "Profile", icon: <PeopleIcon />, path: "/userX/profile" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/userX/order_tracking/" },
  { id: "Cart", icon: <ShoppingCartIcon />, path: "/userX/cart/" },
  { id: "Log out", icon: <LogoutIcon />, path: "/login" },
];

export default function BuyerNavigationList() {
  let navigate = useNavigate();
  const handeOnClick = (id, path) => {
    if (id === "Log out") {
      sessionStorage.clear();
    }
    navigate(path);
  };

  return (
    <List component="nav">
      <React.Fragment>
        {categories.map(({ id, icon, path, active }) => (
          <ListItemButton
            sx={{ color: "#ffffff" }}
            selected={active}
            onClick={() => handeOnClick(id, path)}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
            <ListItemText>{id}</ListItemText>
          </ListItemButton>
        ))}
      </React.Fragment>
    </List>
  );
}
