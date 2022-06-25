import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/sellerX/dashboard" },
  { id: "Products", icon: <InventoryIcon />, path: "/sellerX/products" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/sellerX/order_tracking" },
  { id: "Analysis", icon: <EqualizerIcon />, path: "/SIP" },
  { id: "Collabration", icon: <PeopleIcon />, path: "/SIP" },
];

export default function SellerNavigationList() {
  let navigate = useNavigate();

  return (
        <List component="nav">
          <React.Fragment>
            {categories.map(({ id, icon, path, active }) => (
            <ListItemButton sx={{color:'#ffffff'}}
                selected={active}
                key={id}
                onClick={() => navigate(path)}
              >
                <ListItemIcon sx={{color:'#ffffff'}}>
                  {icon}
                </ListItemIcon>
                <ListItemText>
                  {id}
                </ListItemText>
              </ListItemButton>
          ))}
          </React.Fragment>
        </List>
  );
}