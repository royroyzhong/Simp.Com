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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/" },
  { id: "Profile", icon: <PeopleIcon />, path: "/userX/profile" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/userX/order_tracking/" },
  { id: "Cart", icon: <ShoppingCartIcon />, path: "/userX/cart/" },
  { id: "Log out", icon: <LogoutIcon />, path: "/login" },
];

export default function BuyerNavigationList() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const handeOnClick = (id, path) => {
    let token = sessionStorage.getItem("jwtToken");
    if (id === "Log out") {
      sessionStorage.clear();
      navigate(path);
    }
    if (!token) {
      console.log(123);
      handleClickOpen();
    } else {
      navigate(path);
    }
  };

  return (
    <List component="nav">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Doge Commerce service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please sign in to explore more.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            autoFocus
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

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
