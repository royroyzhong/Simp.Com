import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/seller/dashboard" },
  { id: "Products", icon: <InventoryIcon />, path: "/seller/products" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/seller/order_tracking" },
];

export default function SellerNavigationList() {
  let navigate = useNavigate();
  return (
    <List component="nav">
      <React.Fragment>
        {categories.map(({ id, icon, path, active }) => (
          <ListItemButton
            sx={{ color: "#ffffff" }}
            selected={active}
            key={id}
            onClick={() => navigate(path)}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
            <ListItemText>{id}</ListItemText>
          </ListItemButton>
        ))}
      </React.Fragment>
    </List>
  );
}
