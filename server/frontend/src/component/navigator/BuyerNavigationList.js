import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAsync } from "../../controller/login/thunks";
const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/" },
  { id: "Profile", icon: <PeopleIcon />, path: "/user/profile" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/user/order_tracking" },
  { id: "Cart", icon: <ShoppingCartIcon />, path: "/user/cart" },
];

export default function BuyerNavigationList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handeOnClick = (id, path) => {
    return dispatch(getUserAsync()).then((result) => {
      let statusCode = result.payload.statusCode;
      if (path === "/" || path === "/user/cart") {
        navigate(path);
      } else if (statusCode !== 200) {
        setOpenAlert(true);
      } else {
        navigate(path);
      }
    });
  };
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    navigate("/login");
  };
  return (
    <List component="nav">
      <React.Fragment>
        {categories.map(({ id, icon, path, active }) => (
          <ListItemButton
            sx={{ color: "#ffffff" }}
            selected={active}
            key={id}
            onClick={() => handeOnClick(id, path)}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
            <ListItemText>{id}</ListItemText>
          </ListItemButton>
        ))}
      </React.Fragment>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please Log in to continue.
        </Alert>
      </Snackbar>
    </List>
  );
}
